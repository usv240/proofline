// Step 3c: re-anchor proofs to the official pack. Organizers confirmed that only quotes found in the
// supplied corpus count for the citation metric. For each rule whose proof comes from a page Proofline
// fetched itself, look for a sentence in the official pack (same place, or its state) that states the
// same rule. A quote is accepted only if code finds it word for word and a second pass confirms it
// supports the rule. Otherwise the rule keeps its fetched source, labeled as such.
//   npx tsx scripts/reanchor.ts
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as z from "zod/v4";
import { findSpan } from "../src/lib/engine/span";
import type { RuleRecord } from "../src/lib/engine/types";
import { audit } from "./lib/audit";
import { loadCorpus } from "./lib/corpus";
import { mapLimit, MODEL, parseStructured } from "./lib/llm";

const OUT = path.join(process.cwd(), "out", "pipeline", "anchors.json");

const Find = z.object({
  found: z.boolean(),
  doc_id: z.string().nullable(),
  quote: z.string().nullable().describe("Exact text copied character for character from the official document, 1 to 3 sentences."),
  reason: z.string(),
});
const Check = z.object({ supports: z.boolean(), reason: z.string() });

const FIND_SYSTEM = `You look for official-source support for a housing-law rule. You get one rule (already extracted from a secondary page) and several official documents. If an official document itself states this same rule for this same place (the same requirement, not just the same topic), return found=true, the document id and an exact quote of the sentence(s) that state it. A summary page restating the rule counts if it states the rule for this place. If no official document states it, return found=false. Never paraphrase the quote.`;
const CHECK_SYSTEM = `Answer strictly: does the quoted official text, by itself, state the given rule for the given place? Topic overlap is not enough.`;

async function main() {
  const out: RuleRecord[] = JSON.parse(readFileSync(path.join(process.cwd(), "out", "rules_all.json"), "utf8")).rules;
  const corpus = loadCorpus().filter((d) => d.kind === "official_corpus");
  const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
  // Keep earlier anchors: an anchored rule is no longer a target, but its anchor must survive the rewrite.
  const result: Record<string, unknown> = { ...prev };
  const targets = out.filter((r) => r.x_source_kind !== "official_corpus" && r.x_lifecycle.kind === "enacted");

  await mapLimit(targets, 6, async (r) => {
    const key = `${r.jurisdiction}|${r.category}|${r.citation}`;
    const state = r.jurisdiction.includes(",") ? r.jurisdiction.split(",")[1].trim() : r.jurisdiction;
    const docs = corpus.filter((d) => d.jurisdiction === r.jurisdiction || d.jurisdiction === state);
    const hash = createHash("sha256").update(JSON.stringify([r.requirement, r.citation, docs.map((d) => d.sha256), FIND_SYSTEM, CHECK_SYSTEM, MODEL])).digest("hex").slice(0, 16);
    if (prev[key]?.hash === hash) { result[key] = prev[key]; return; }
    const user = `RULE (${r.jurisdiction}, ${r.category}): ${r.title}\nCitation: ${r.citation}\nRequirement: ${r.requirement}\nKey value: ${r.key_value ?? "none"}\n\nOFFICIAL DOCUMENTS:\n${docs.map((d) => `<document id="${d.doc_id}" jurisdiction="${d.jurisdiction}">\n${d.text}\n</document>`).join("\n\n")}`;
    const f = await parseStructured({ schema: Find, system: FIND_SYSTEM, user, effort: "medium", maxTokens: 6000 });
    let anchor: { doc_id: string; quote: string; start: number; end: number } | null = null;
    let note = f.data?.reason ?? "no answer";
    if (f.data?.found && f.data.doc_id && f.data.quote) {
      const doc = docs.find((d) => d.doc_id === f.data!.doc_id);
      const m = doc ? findSpan(doc.text, f.data.quote) : null;
      if (doc && m) {
        const c = await parseStructured({ schema: Check, system: CHECK_SYSTEM, user: `PLACE: ${r.jurisdiction}\nRULE: ${r.requirement}\n\nOFFICIAL TEXT (${doc.doc_id}): "${m.text}"`, effort: "medium", maxTokens: 2000 });
        if (c.data?.supports) anchor = { doc_id: doc.doc_id, quote: m.text, start: m.start, end: m.end };
        note = c.data?.reason ?? note;
      } else note = "quote not found word for word in the official document";
    }
    result[key] = { hash, rule: r.team_rule_id, anchor, note };
    console.log(`${r.team_rule_id.padEnd(13)} ${anchor ? `anchored to ${anchor.doc_id}` : "no official text states it"} | ${note.slice(0, 110)}`);
  });

  writeFileSync(OUT, JSON.stringify(result, null, 2));
  audit("reanchor", { rules: targets.map((r) => r.team_rule_id) }, { anchored: Object.values(result).filter((x: any) => x.anchor).length });
}

main();
