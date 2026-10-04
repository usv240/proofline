// Change tracking: which addresses a law change affects, before and after, with conflict flags.
import { lookupAddress } from "./lookup";
import type { AddressFacts, Category, Result, RuleRecord } from "./types";

export interface ChangeTest {
  test_id: string;
  title: string;
  type: "as_of" | "boundary" | "pending" | "negative" | "new_document";
  rule_ids: string[];
  as_of?: string;
  as_of_before?: string;
  as_of_after?: string;
  states?: string[];
  conflict_with?: string[];
  expected_behavior?: string;
  source_doc_ids?: string[];
}

export interface ChangeOutput {
  affected_address_ids: string[];
  conflict_flag_address_ids: string[];
  notes: string;
  rules: string[];
  before_after?: { address_id: string; rule: string; before: Result | "none"; after: Result | "none" }[];
}

const KEY_PLACE: Record<string, string> = {
  CA: "CA", NJ: "NJ", MA: "MA", LA: "Los Angeles, CA", SF: "San Francisco, CA", SD: "San Diego, CA", BK: "Berkeley, CA",
  SA: "Santa Ana, CA", JC: "Jersey City, NJ", HOB: "Hoboken, NJ", NWK: "Newark, NJ", BOS: "Boston, MA", CAM: "Cambridge, MA",
};
const KEY_CAT: Record<string, Category> = {
  ALG: "algorithmic_rent_setting", RENT: "rent_increase_limits", EVICT: "just_cause_eviction", JC: "just_cause_eviction",
  DEP: "security_deposits", FEE: "application_screening_fees", SCREEN: "screening_restrictions",
};

/** Maps an answer-key style id ("HOB-ALG-01", "MA-ALG-P1") to our rules by place, category and lifecycle. */
export function resolveKeyRule(keyId: string, rules: RuleRecord[]): RuleRecord[] {
  const [place, cat, n] = keyId.split("-");
  const jur = KEY_PLACE[place];
  const category = KEY_CAT[cat];
  const wantProposal = n?.startsWith("P");
  return rules.filter(
    (r) => r.jurisdiction === jur && r.category === category && (wantProposal ? r.x_lifecycle.kind !== "enacted" : r.x_lifecycle.kind === "enacted"),
  );
}

function resultFor(rules: RuleRecord[], f: AddressFacts, asOf: string, ids: Set<string>) {
  return lookupAddress(rules, f, asOf).filter((r) => ids.has(r.team_rule_id));
}

export function runChangeTest(t: ChangeTest, rules: RuleRecord[], addrs: AddressFacts[]): ChangeOutput {
  const targets = [
    ...t.rule_ids.flatMap((id) => resolveKeyRule(id, rules)),
    ...rules.filter((r) => r.source_doc_id && t.source_doc_ids?.includes(r.source_doc_id)),
  ];
  const ids = new Set(targets.map((r) => r.team_rule_id));
  const conflictTargets = (t.conflict_with ?? []).flatMap((id) => resolveKeyRule(id, rules));
  const conflictJur = new Set(conflictTargets.map((r) => r.jurisdiction));
  const affected = new Set<string>();
  const conflicts = new Set<string>();
  const before_after: ChangeOutput["before_after"] = [];

  if (t.type === "as_of") {
    for (const f of addrs) {
      const b = resultFor(rules, f, t.as_of_before!, ids);
      const a = resultFor(rules, f, t.as_of_after!, ids);
      for (const id of ids) {
        const rb = b.find((x) => x.team_rule_id === id)?.result ?? "none";
        const ra = a.find((x) => x.team_rule_id === id)?.result ?? "none";
        if (rb !== ra && (ra === "applies" || ra === "unknown")) {
          affected.add(f.address_id);
          before_after.push({ address_id: f.address_id, rule: id, before: rb, after: ra });
        }
      }
      if (affected.has(f.address_id) && conflictJur.has(`${f.city}, ${f.state}`)) conflicts.add(f.address_id);
    }
  } else if (t.type === "boundary" || t.type === "new_document") {
    const asOf = t.as_of ?? t.as_of_after ?? "2026-10-01";
    for (const f of addrs) {
      for (const r of resultFor(rules, f, asOf, ids)) {
        if (r.result === "applies" || r.result === "unknown" || r.result === "not_yet_effective") {
          affected.add(f.address_id);
          before_after.push({ address_id: f.address_id, rule: r.team_rule_id, before: "none", after: r.result });
          if (r.conflict_flag) conflicts.add(f.address_id);
        }
      }
    }
  } else if (t.type === "pending") {
    for (const f of addrs) {
      for (const r of resultFor(rules, f, t.as_of ?? "2026-10-01", ids)) {
        if (r.result === "pending") {
          affected.add(f.address_id);
          before_after.push({ address_id: f.address_id, rule: r.team_rule_id, before: "none", after: "pending" });
        }
      }
    }
  } else if (t.type === "negative") {
    // Failed or struck measures never apply. Any hit here is a bug, and is reported as such.
    for (const f of addrs) {
      for (const r of resultFor(rules, f, t.as_of ?? "2026-10-01", ids)) {
        if (r.result === "applies") affected.add(f.address_id);
      }
    }
  }

  const cites = targets.map((r) => `${r.team_rule_id} (${r.citation}, ${r.x_lifecycle.kind}${r.x_lifecycle.effective_date ? `, effective ${r.x_lifecycle.effective_date}` : ""})`).join("; ");
  const notes =
    t.type === "as_of"
      ? `${cites}. Before ${t.as_of_before}: not yet effective. After ${t.as_of_after}: applies to ${affected.size} addresses.${conflicts.size ? ` ${conflicts.size} addresses also carry a conflict flag with local rules (${[...conflictJur].join(", ")}) for human review.` : ""}`
      : t.type === "boundary"
        ? `${cites}. Each local rule applies only inside its own city: ${targets.map((r) => `${r.jurisdiction} ${[...affected].filter((id) => addrs.find((a) => a.address_id === id && `${a.city}, ${a.state}` === r.jurisdiction)).length}`).join(", ")}. Addresses in other cities are not affected.`
        : t.type === "pending"
          ? `${cites}. Pending, not in force on ${t.as_of ?? "2026-10-01"}. These ${affected.size} addresses would be covered if enacted.`
          : t.type === "negative"
            ? `${cites || "No matching rule"}. Not in force: affected set is empty. No rent cap is reported for any address in this jurisdiction.`
            : `${cites}. ${affected.size} addresses affected.`;

  return {
    affected_address_ids: [...affected].sort(),
    conflict_flag_address_ids: [...conflicts].sort(),
    notes,
    rules: [...ids],
    before_after,
  };
}
