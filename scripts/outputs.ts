// Step 4: deterministic outputs from rules + addresses. No model calls.
//   npx tsx scripts/outputs.ts
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { parseAddressesCsv } from "../src/lib/engine/addresses";
import { runChangeTest, type ChangeTest } from "../src/lib/engine/changes";
import { DISCLAIMER, lookupAddress } from "../src/lib/engine/lookup";
import type { RuleRecord } from "../src/lib/engine/types";
import { audit, sha } from "./lib/audit";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const AS_OF = "2026-10-01";

const rules: RuleRecord[] = JSON.parse(readFileSync(path.join(OUT, "rules.json"), "utf8")).rules;
const addrs = parseAddressesCsv(readFileSync(path.join(ROOT, "data", "addresses_resolved.csv"), "utf8"));
const tests: ChangeTest[] = JSON.parse(readFileSync(path.join(ROOT, "data", "starter", "dev", "change_tests.json"), "utf8"));
const extraTests = path.join(ROOT, "data", "change_tests_extra.json");
if (existsSync(extraTests)) tests.push(...JSON.parse(readFileSync(extraTests, "utf8")));

const lookups: Record<string, { team_rule_id: string; result: string; explanation: string; conflict_flag: boolean }[]> = {};
for (const f of addrs) {
  lookups[f.address_id] = lookupAddress(rules, f, AS_OF).map((r) => ({
    team_rule_id: r.team_rule_id,
    result: r.result,
    explanation: r.explanation,
    conflict_flag: r.conflict_flag,
  }));
}

const changes: Record<string, unknown> = {};
const changesFull: Record<string, unknown> = {};
for (const t of tests) {
  const c = runChangeTest(t, rules, addrs);
  // The submission covers the organizers' change tests (T1 to T6); other runs stay in changes_full.
  if (/^T\d+$/.test(t.test_id)) changes[t.test_id] = { affected_address_ids: c.affected_address_ids, conflict_flag_address_ids: c.conflict_flag_address_ids, notes: c.notes };
  changesFull[t.test_id] = { ...t, ...c };
}

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, "lookups.json"), JSON.stringify({ as_of: AS_OF, disclaimer: DISCLAIMER, lookups }, null, 2));
writeFileSync(path.join(OUT, "changes.json"), JSON.stringify(changes, null, 2));
writeFileSync(path.join(OUT, "pipeline", "changes_full.json"), JSON.stringify(changesFull, null, 2));

const counts: Record<string, number> = {};
for (const rs of Object.values(lookups)) for (const r of rs) counts[r.result] = (counts[r.result] ?? 0) + 1;
audit("outputs", { rules_sha: sha(JSON.stringify(rules)), addresses: addrs.length, as_of: AS_OF }, {
  lookups_sha: sha(JSON.stringify(lookups)),
  changes_sha: sha(JSON.stringify(changes)),
  counts,
});
console.log(`lookups: ${addrs.length} addresses`, counts);
for (const [id, c] of Object.entries(changes) as [string, any][]) {
  console.log(`${id}: affected=${c.affected_address_ids.length} conflicts=${c.conflict_flag_address_ids.length}`);
}
