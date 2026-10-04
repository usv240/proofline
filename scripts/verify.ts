// npm run verify: re-checks everything a judge might doubt, from the files in the repo.
// 1. The audit log hash chain is intact.
// 2. Every rule's quote is found word for word in its source document.
// 3. Re-running the engine reproduces lookups.json exactly (no hidden hand edits).
// 4. The negative control holds: failed and pending measures never produce "applies".
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseAddressesCsv } from "../src/lib/engine/addresses";
import { lookupAddress } from "../src/lib/engine/lookup";
import { findSpan } from "../src/lib/engine/span";
import type { RuleRecord } from "../src/lib/engine/types";
import { AUDIT_FILE, verifyChain } from "./lib/audit";
import { loadCorpus } from "./lib/corpus";

const ROOT = process.cwd();
// out/ is written by the pipeline and not committed; a fresh clone (and CI) checks the published copies in public/data.
const OUT = existsSync(path.join(ROOT, "out", "rules.json")) ? path.join(ROOT, "out") : path.join(ROOT, "public", "data");
const rules: RuleRecord[] = JSON.parse(readFileSync(path.join(OUT, "rules.json"), "utf8")).rules;
const saved = JSON.parse(readFileSync(path.join(OUT, "lookups.json"), "utf8"));
const addrs = parseAddressesCsv(readFileSync(path.join(ROOT, "data", "addresses_resolved.csv"), "utf8"));
const corpus = loadCorpus();
let ok = true;
const line = (pass: boolean, msg: string) => { console.log(`${pass ? "PASS" : "FAIL"}  ${msg}`); ok &&= pass; };

const chain = verifyChain(readFileSync(existsSync(AUDIT_FILE) ? AUDIT_FILE : path.join(OUT, "audit.log.jsonl"), "utf8"));
line(chain.ok, `audit log chain intact (${chain.entries} entries${chain.brokenAt ? `, broken at line ${chain.brokenAt}` : ""})`);

const bad = rules.filter((r) => { const d = corpus.find((x) => x.doc_id === r.source_doc_id); return !d || !findSpan(d.text, r.quoted_span); });
line(bad.length === 0, `quotes found in source: ${rules.length - bad.length}/${rules.length}${bad.length ? ` (missing: ${bad.map((r) => r.team_rule_id).join(", ")})` : ""}`);

let diffs = 0;
for (const a of addrs) {
  const now = lookupAddress(rules, a, saved.as_of).map((r) => `${r.team_rule_id}:${r.result}`).sort().join("|");
  const was = saved.lookups[a.address_id].map((r: { team_rule_id: string; result: string }) => `${r.team_rule_id}:${r.result}`).sort().join("|");
  if (now !== was) diffs++;
}
line(diffs === 0, `engine reproduces lookups.json for ${addrs.length} addresses (${diffs} differences)`);

const notLaw = new Set(rules.filter((r) => r.x_lifecycle.kind !== "enacted").map((r) => r.team_rule_id));
let invented = 0;
for (const a of addrs) for (const r of saved.lookups[a.address_id]) if (notLaw.has(r.team_rule_id) && r.result === "applies") invented++;
line(invented === 0, `failed or pending measures reported as "applies": ${invented}`);

console.log(ok ? "\nAll checks passed. Not legal advice." : "\nSome checks failed.");
process.exit(ok ? 0 : 1);
