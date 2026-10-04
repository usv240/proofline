// Copies pipeline outputs into src/generated for the web app, and computes the metrics shown on the
// How it works page. Every number on the site comes from here, not from hand-typed copy.
//   npx tsx scripts/publish.ts
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseAddressesCsv } from "../src/lib/engine/addresses";
import { findSpan } from "../src/lib/engine/span";
import type { RuleRecord } from "../src/lib/engine/types";
import { verifyChain } from "./lib/audit";
import { loadCorpus, loadManifest } from "./lib/corpus";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const GEN = path.join(ROOT, "src", "generated");
const PUB = path.join(ROOT, "public", "data");
mkdirSync(GEN, { recursive: true });
mkdirSync(PUB, { recursive: true });

// The site shows every place, including ones added after the brief (rules_all.json).
const rulesFile = existsSync(path.join(OUT, "rules_all.json")) ? "rules_all.json" : "rules.json";
const rules: (RuleRecord & { x_params?: unknown })[] = JSON.parse(readFileSync(path.join(OUT, rulesFile), "utf8")).rules;
// Pre-Flight parameters (from scripts/params.ts) are attached by rule identity.
const paramsFile = path.join(OUT, "pipeline", "params.json");
if (existsSync(paramsFile)) {
  const params = JSON.parse(readFileSync(paramsFile, "utf8"));
  for (const r of rules) r.x_params = params[`${r.jurisdiction}|${r.category}|${r.citation}`]?.params ?? null;
}
const esFile = path.join(OUT, "pipeline", "plain_es.json");
if (existsSync(esFile)) {
  const es = JSON.parse(readFileSync(esFile, "utf8"));
  for (const r of rules as (RuleRecord & { x_plain_es?: string })[]) r.x_plain_es = es[r.team_rule_id]?.en === r.x_plain ? es[r.team_rule_id].es : undefined;
}
const noRule = JSON.parse(readFileSync(path.join(OUT, existsSync(path.join(OUT, "no_rule_findings_all.json")) ? "no_rule_findings_all.json" : "no_rule_findings.json"), "utf8"));
const changesFull = JSON.parse(readFileSync(path.join(OUT, "pipeline", "changes_full.json"), "utf8"));
const addrs = parseAddressesCsv(readFileSync(path.join(ROOT, "data", "addresses_resolved.csv"), "utf8"));
const corpus = loadCorpus();
const manifest = loadManifest();

// Quote verification against the source documents, recomputed at publish time.
let verified = 0;
const quoteCheck = rules.map((r) => {
  const doc = corpus.find((d) => d.doc_id === r.source_doc_id);
  const ok = !!doc && !!findSpan(doc.text, r.quoted_span);
  if (ok) verified++;
  return { id: r.team_rule_id, ok };
});

const extractDir = path.join(OUT, "pipeline", "extract");
let candidates = 0;
let rejectedTotal = 0;
for (const m of manifest) {
  const f = path.join(extractDir, `${m.doc_id}.json`);
  if (!existsSync(f)) continue;
  const j = JSON.parse(readFileSync(f, "utf8"));
  candidates += j.candidates;
  rejectedTotal += j.rejected.length;
}

const lookups = JSON.parse(readFileSync(path.join(OUT, "lookups.json"), "utf8")).lookups;
const resultCounts: Record<string, number> = {};
const unknownByCity: Record<string, { unknown: number; total: number }> = {};
for (const a of addrs) {
  for (const r of lookups[a.address_id]) {
    resultCounts[r.result] = (resultCounts[r.result] ?? 0) + 1;
    const k = `${a.city}, ${a.state}`;
    unknownByCity[k] ??= { unknown: 0, total: 0 };
    unknownByCity[k].total++;
    if (r.result === "unknown") unknownByCity[k].unknown++;
  }
}

// Negative control: no failed or pending measure, and no "no rule" cell, may ever produce "applies".
const failedOrPending = new Set(rules.filter((r) => r.x_lifecycle.kind !== "enacted").map((r) => r.team_rule_id));
let falseApplies = 0;
let negChecks = 0;
for (const a of addrs) for (const r of lookups[a.address_id]) {
  if (failedOrPending.has(r.team_rule_id)) { negChecks++; if (r.result === "applies") falseApplies++; }
}
const noRuleCells = (noRule.findings as { jurisdiction: string; category: string; qualified_by?: string[] }[]).filter((n) => !n.qualified_by?.length);
for (const a of addrs) for (const n of noRuleCells) {
  if (n.jurisdiction !== a.state && n.jurisdiction !== `${a.city}, ${a.state}`) continue;
  negChecks++;
  const hit = lookups[a.address_id].some((r: any) => {
    const rule = rules.find((x) => x.team_rule_id === r.team_rule_id)!;
    return rule.jurisdiction === n.jurisdiction && rule.category === n.category && r.result === "applies";
  });
  if (hit) falseApplies++;
}

const audit = existsSync(path.join(OUT, "audit.log.jsonl")) ? verifyChain(readFileSync(path.join(OUT, "audit.log.jsonl"), "utf8")) : null;

const baselineFile = path.join(OUT, "eval_baseline.json");
const baseline = existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, "utf8")).summary : null;

const metrics = {
  baseline,
  generated_at: new Date().toISOString(),
  as_of: "2026-10-01",
  documents: { manifest: manifest.length, with_text: corpus.length, official: corpus.filter((d) => d.kind === "official_corpus").length, fetched: corpus.filter((d) => d.kind === "fetched_link_only").length },
  extraction: { candidates, rejected: rejectedTotal, rules: rules.length, quotes_verified: verified, quote_rate: verified / rules.length },
  addresses: {
    total: addrs.length,
    geocoded: addrs.filter((a) => a.resolution_method === "census_geocoder").length,
    fallback: addrs.filter((a) => a.resolution_method !== "census_geocoder").length,
  },
  results: resultCounts,
  unknown_by_city: unknownByCity,
  negative_control: { checks: negChecks, invented_applies: falseApplies, no_rule_cells: noRuleCells.length },
  audit,
  change_tests: Object.fromEntries(Object.entries<any>(changesFull).map(([k, v]) => [k, { affected: v.affected_address_ids.length, conflicts: v.conflict_flag_address_ids.length }])),
};

const sources = manifest.map((m) => {
  const d = corpus.find((x) => x.doc_id === m.doc_id);
  return {
    doc_id: m.doc_id, jurisdiction: m.jurisdictions, url: m.url, source_type: m.source_type,
    kind: d?.kind ?? "unavailable", retrieved_at: d?.retrieved_at ?? null,
    rules: rules.filter((r) => r.source_doc_id === m.doc_id).map((r) => r.team_rule_id),
  };
});

// Source texts for the proof panel: only the documents cited by a rule.
// Cited sources, plus the bill-history snapshots Law Watch compares against.
const cited = new Set([...rules.map((r) => r.source_doc_id), "D045", "D046", "D047"]);
const texts = Object.fromEntries(corpus.filter((d) => cited.has(d.doc_id)).map((d) => [d.doc_id, d.text]));

writeFileSync(path.join(GEN, "rules.json"), JSON.stringify(rules));
writeFileSync(path.join(GEN, "addresses.json"), JSON.stringify(addrs));
writeFileSync(path.join(GEN, "no_rule.json"), JSON.stringify(noRule.findings));
writeFileSync(path.join(GEN, "changes.json"), JSON.stringify(changesFull));
writeFileSync(path.join(GEN, "metrics.json"), JSON.stringify(metrics, null, 2));
writeFileSync(path.join(GEN, "sources.json"), JSON.stringify(sources));
writeFileSync(path.join(PUB, "source_texts.json"), JSON.stringify(texts));
for (const f of ["rules.json", "lookups.json", "changes.json", "no_rule_findings.json", "audit.log.jsonl"]) {
  if (existsSync(path.join(OUT, f))) copyFileSync(path.join(OUT, f), path.join(PUB, f));
}
console.log(JSON.stringify({ ...metrics, unknown_by_city: undefined }, null, 1));
console.log("quote check failures:", quoteCheck.filter((q) => !q.ok).map((q) => q.id));
