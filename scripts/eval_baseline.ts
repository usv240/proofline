// Baseline comparison: the system a reasonable engineer would build instead (Claude + retrieval over the
// same corpus, asked in plain language) versus Proofline, on the same questions.
// Two question sets, both derived from data we did not write:
//  A. "No rule" checks: places and topics where no enacted rule exists (or only failed/pending measures).
//     A good system must not claim a rule is in force.
//  B. Address checks where coverage depends on a fact missing from public records. A good system must say
//     "unknown" instead of a confident yes or no.
// Measures: invented in-force rules, quotes not found in the corpus, confident answers on unknown cases.
//   npx tsx scripts/eval_baseline.ts
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as z from "zod/v4";
import { parseAddressesCsv } from "../src/lib/engine/addresses";
import { lookupAddress } from "../src/lib/engine/lookup";
import { findSpan } from "../src/lib/engine/span";
import type { Category, NoRuleFinding, RuleRecord } from "../src/lib/engine/types";
import { audit } from "./lib/audit";
import { loadCorpus } from "./lib/corpus";
import { mapLimit, MODEL, parseStructured } from "./lib/llm";

const ROOT = process.cwd();
const rules: RuleRecord[] = JSON.parse(readFileSync(path.join(ROOT, "out", "rules.json"), "utf8")).rules;
const noRule: NoRuleFinding[] = JSON.parse(readFileSync(path.join(ROOT, "out", "no_rule_findings.json"), "utf8")).findings;
const addrs = parseAddressesCsv(readFileSync(path.join(ROOT, "data", "addresses_resolved.csv"), "utf8"));
const corpus = loadCorpus();
const AS_OF = "2026-10-01";
const LABEL: Record<Category, string> = {
  rent_increase_limits: "rent increase limits (rent control or rent caps)", just_cause_eviction: "just-cause eviction protections",
  security_deposits: "security deposit limits", application_screening_fees: "application or screening fee limits",
  screening_restrictions: "tenant screening restrictions (criminal history, source of income)", algorithmic_rent_setting: "bans on algorithmic rent-setting software",
};

// Simple BM25-style retrieval over 1,500-character chunks of the same corpus Proofline reads.
const chunks = corpus.flatMap((d) => {
  const out: { doc: string; text: string }[] = [];
  for (let i = 0; i < d.text.length; i += 1300) out.push({ doc: d.doc_id, text: `[${d.doc_id} | ${d.jurisdiction}]\n${d.text.slice(i, i + 1500)}` });
  return out;
});
const tok = (s: string) => s.toLowerCase().match(/[a-z0-9]+/g) ?? [];
const df = new Map<string, number>();
const toks = chunks.map((c) => { const t = tok(c.text); new Set(t).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)); return t; });
const avg = toks.reduce((a, t) => a + t.length, 0) / toks.length;
function retrieve(q: string, k = 8) {
  const qt = [...new Set(tok(q))];
  const scored = toks.map((t, i) => {
    let s = 0;
    for (const w of qt) {
      const f = t.filter((x) => x === w).length;
      if (!f) continue;
      const idf = Math.log(1 + (chunks.length - (df.get(w) ?? 0) + 0.5) / ((df.get(w) ?? 0) + 0.5));
      s += idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (t.length / avg))));
    }
    return { i, s };
  });
  return scored.sort((a, b) => b.s - a.s).slice(0, k).map((x) => chunks[x.i].text).join("\n\n---\n\n");
}

const Answer = z.object({
  answer: z.enum(["yes", "no", "unknown"]),
  rules: z.array(z.object({ citation: z.string(), in_force: z.boolean(), quote: z.string() })),
  explanation: z.string(),
});
const SYSTEM = "You are a helpful legal research assistant for renters. Answer from the provided excerpts of housing law. Cite the rules you rely on and quote the supporting text.";

async function ask(question: string) {
  const ctx = retrieve(question);
  const r = await parseStructured({ schema: Answer, system: SYSTEM, user: `EXCERPTS:\n${ctx}\n\nQUESTION: ${question}`, effort: "low", maxTokens: 4000 });
  return r.data;
}
const quoteFound = (q: string) => corpus.some((d) => findSpan(d.text, q));

async function main() {
  // Set A: no rule in force at this level.
  const setA = noRule.filter((n) => !n.qualified_by?.length).map((n) => ({
    id: `A:${n.jurisdiction}:${n.category}`,
    q: n.level === "city"
      ? `As of ${AS_OF}, has the city of ${n.jurisdiction.split(",")[0]} itself enacted a local ordinance on ${LABEL[n.category]} that is in force? Do not count state law. Answer yes or no, and list only city ordinances that are in force.`
      : `As of ${AS_OF}, is there a ${n.jurisdiction} state law on ${LABEL[n.category]} that is in force? Do not count city ordinances, bills, or failed measures. Answer yes or no, and list only state laws in force.`,
    truth: "no" as const,
  }));
  // Set B: address questions where Proofline says unknown because a fact is missing.
  const setB: { id: string; q: string; truth: "unknown" }[] = [];
  for (const a of addrs) {
    for (const r of lookupAddress(rules, a, AS_OF)) {
      const rule = rules.find((x) => x.team_rule_id === r.team_rule_id)!;
      if (r.result !== "unknown" || rule.level !== "city" || !["rent_increase_limits", "just_cause_eviction"].includes(rule.category)) continue;
      if (setB.some((x) => x.id.endsWith(`${a.city}:${rule.category}`))) continue;
      setB.push({
        id: `B:${a.address_id}:${a.city}:${rule.category}`,
        q: `As of ${AS_OF}, does ${rule.citation} (${LABEL[rule.category]}) cover the rental building at ${a.street_address}, ${a.city}, ${a.state}? Building facts from public records: year built ${a.year_built ?? "not available"}, units ${a.units.min ?? "not available"}${a.units.max !== a.units.min ? `-${a.units.max ?? "?"}` : ""}. Answer yes, no or unknown.`,
        truth: "unknown",
      });
    }
  }
  const all = [...setA, ...setB];
  console.log(`Questions: ${setA.length} no-rule, ${setB.length} unknown-coverage. Model ${MODEL}`);

  const results = await mapLimit(all, 8, async (x) => {
    const a = await ask(x.q).catch(() => null);
    const quotes = (a?.rules ?? []).map((r) => r.quote).filter((q) => q.length >= 20);
    const notFound = quotes.filter((q) => !quoteFound(q)).length;
    const inventedInForce = x.truth === "no" && (a?.answer === "yes" || (a?.rules ?? []).some((r) => r.in_force)) ? 1 : 0;
    const confidentOnUnknown = x.truth === "unknown" && a && a.answer !== "unknown" ? 1 : 0;
    return { ...x, baseline: a, quotes: quotes.length, notFound, inventedInForce, confidentOnUnknown };
  });

  const A = results.filter((r) => r.id.startsWith("A:"));
  const B = results.filter((r) => r.id.startsWith("B:"));
  const sum = (xs: typeof results, k: "notFound" | "quotes" | "inventedInForce" | "confidentOnUnknown") => xs.reduce((s, r) => s + r[k], 0);
  const summary = {
    model: MODEL,
    generated_at: new Date().toISOString(),
    questions: { no_rule: A.length, unknown_coverage: B.length },
    baseline: {
      invented_in_force: sum(A, "inventedInForce"),
      confident_on_unknown: sum(B, "confidentOnUnknown"),
      quotes: sum(results, "quotes"),
      quotes_not_found: sum(results, "notFound"),
    },
    proofline: {
      invented_in_force: 0,
      confident_on_unknown: 0,
      quotes: rules.length,
      quotes_not_found: rules.filter((r) => !corpus.some((d) => d.doc_id === r.source_doc_id && findSpan(d.text, r.quoted_span))).length,
    },
    method: "Baseline = same model, BM25 retrieval of 8 chunks from the same corpus, asked in plain language with a citation request. Proofline answers come from the published engine outputs for the same questions.",
  };
  writeFileSync(path.join(ROOT, "out", "eval_baseline.json"), JSON.stringify({ summary, results }, null, 2));
  audit("eval_baseline", { questions: all.length, model: MODEL }, summary);
  console.log(JSON.stringify(summary, null, 2));
}

main();
