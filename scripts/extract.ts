// Step 1 and 2 of the pipeline: read every corpus document with Claude, verify quotes, then have a
// second pass challenge every candidate rule against its source. Results are cached per document hash.
//   npx tsx scripts/extract.ts [--only D024,D069] [--force]
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as z from "zod/v4";
import { findSpan } from "../src/lib/engine/span";
import { audit } from "./lib/audit";
import { loadCorpus, type CorpusDoc } from "./lib/corpus";
import { mapLimit, MODEL, parseStructured } from "./lib/llm";
import { EXTRACT_SYSTEM, ExtractionOutput, VERIFY_SYSTEM, VerifyOutput } from "./lib/prompts";

const OUT = path.join(process.cwd(), "out", "pipeline", "extract");
mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const force = args.includes("--force");
const PROMPT_HASH = createHash("sha256")
  .update(EXTRACT_SYSTEM + VERIFY_SYSTEM + MODEL + JSON.stringify(z.toJSONSchema(ExtractionOutput)))
  .digest("hex")
  .slice(0, 12);

function allowedJurisdictions(d: CorpusDoc) {
  return d.level === "state" ? [d.state] : [d.jurisdiction, d.state];
}

async function processDoc(d: CorpusDoc) {
  const file = path.join(OUT, `${d.doc_id}.json`);
  if (!force && existsSync(file)) {
    const prev = JSON.parse(readFileSync(file, "utf8"));
    if (prev.sha256 === d.sha256 && prev.prompt_hash === PROMPT_HASH) return prev;
  }
  const t0 = Date.now();
  const header = `DOCUMENT ${d.doc_id}\nSource URL: ${d.url}\nPrimary jurisdiction: ${d.jurisdiction}\nAllowed jurisdictions: ${allowedJurisdictions(d).join(" | ")}\nRetrieved: ${d.retrieved_at ?? "unknown"}\n\n<document>\n${d.text}\n</document>`;

  const ex = await parseStructured({ schema: ExtractionOutput, system: EXTRACT_SYSTEM, user: header, effort: "high" });
  const raw = ex.data ?? { rules: [], no_rule_findings: [] };

  // Code check: every quote must exist in the source. Replace it with the exact source substring.
  const rejected: { title: string; reason: string }[] = [];
  const kept = raw.rules.flatMap((r) => {
    if (!allowedJurisdictions(d).includes(r.jurisdiction)) {
      rejected.push({ title: r.title, reason: `jurisdiction ${r.jurisdiction} not allowed for this document` });
      return [];
    }
    const m = findSpan(d.text, r.quoted_span);
    if (!m) {
      rejected.push({ title: r.title, reason: "quoted span not found in source" });
      return [];
    }
    const details = r.details.flatMap((x) => {
      const dm = findSpan(d.text, x.quoted_span);
      return dm ? [{ text: x.text, quoted_span: dm.text }] : [];
    });
    return [{ ...r, quoted_span: m.text, details, span: { start: m.start, end: m.end, match: m.match } }];
  });

  const noRules = raw.no_rule_findings.flatMap((n) => {
    const m = findSpan(d.text, n.quoted_span);
    return m && allowedJurisdictions(d).includes(n.jurisdiction) ? [{ ...n, quoted_span: m.text }] : [];
  });

  // Model check: a second, independent pass tries to refute each kept rule from the document alone.
  let verdicts: { index: number; verdict: string; note: string; corrected_effective_date: string | null; corrected_lifecycle_kind: string | null; corrected_key_value: string | null }[] = [];
  if (kept.length) {
    const listing = kept
      .map((r, i) => `#${i} [${r.jurisdiction} | ${r.category} | ${r.lifecycle_kind} | effective ${r.effective_date ?? "null"}]\nTitle: ${r.title}\nCitation: ${r.citation}\nRequirement: ${r.requirement}\nKey value: ${r.key_value ?? "null"}\nQuote: "${r.quoted_span}"`)
      .join("\n\n");
    const ver = await parseStructured({
      schema: VerifyOutput,
      system: VERIFY_SYSTEM,
      user: `<document id="${d.doc_id}" jurisdiction="${d.jurisdiction}">\n${d.text}\n</document>\n\nCANDIDATE RECORDS:\n\n${listing}`,
      effort: "high",
    });
    verdicts = ver.data?.verdicts ?? [];
  }

  const final = kept.flatMap((r, i) => {
    const v = verdicts.find((x) => x.index === i);
    if (v?.verdict === "contradict") {
      rejected.push({ title: r.title, reason: `verifier: ${v.note}` });
      return [];
    }
    return [{
      ...r,
      effective_date: v?.corrected_effective_date ?? r.effective_date,
      lifecycle_kind: (v?.corrected_lifecycle_kind as typeof r.lifecycle_kind) ?? r.lifecycle_kind,
      key_value: v?.corrected_key_value ?? r.key_value,
      confidence: v?.verdict === "partial" ? Math.min(r.confidence, 0.7) : r.confidence,
      challenge: v ? { verdict: v.verdict, note: v.note } : null,
    }];
  });

  const result = {
    doc_id: d.doc_id,
    jurisdiction: d.jurisdiction,
    url: d.url,
    retrieved_at: d.retrieved_at,
    kind: d.kind,
    sha256: d.sha256,
    prompt_hash: PROMPT_HASH,
    model: MODEL,
    candidates: raw.rules.length,
    rules: final,
    no_rule_findings: noRules,
    rejected,
    ms: Date.now() - t0,
    usage: ex.meta,
  };
  writeFileSync(file, JSON.stringify(result, null, 2));
  audit("extract", { doc_id: d.doc_id, sha256: d.sha256, model: MODEL, prompt_hash: PROMPT_HASH }, {
    kept: final.length,
    rejected: rejected.length,
    no_rule: noRules.length,
  });
  console.log(`${d.doc_id} ${d.jurisdiction.padEnd(18)} candidates=${raw.rules.length} kept=${final.length} rejected=${rejected.length} no_rule=${noRules.length} ${(result.ms / 1000).toFixed(0)}s`);
  return result;
}

async function main() {
  let docs = loadCorpus();
  if (only) docs = docs.filter((d) => only.includes(d.doc_id));
  console.log(`Extracting ${docs.length} documents with ${MODEL}`);
  await mapLimit(docs, 8, async (d) => {
    try {
      return await processDoc(d);
    } catch (e) {
      console.error(`${d.doc_id} FAILED`, e instanceof Error ? e.message : e);
      return null;
    }
  });
}

main();
