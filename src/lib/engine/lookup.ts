// Address lookup: jurisdiction stack + every rule's result as of a date.
// Pure function of (rules, facts, date). No model calls happen here.

import { evalCoverage, unknownFacts } from "./predicate";
import type {
  AddressFacts,
  Category,
  Cond,
  DecidingFact,
  FactName,
  Result,
  RuleRecord,
  RuleResult,
  Status,
} from "./types";

export const DISCLAIMER = "Not legal advice.";

export interface LookupOptions {
  /** How a yielding state rule is reported when the local rule's coverage is unknown. */
  unknownLocalMeans?: "unknown" | "applies";
}

export function statusAt(rule: RuleRecord, asOf: string): Status {
  const lc = rule.x_lifecycle;
  if (lc.kind === "failed") return "failed";
  if (lc.kind === "pending") return "pending";
  if (lc.ended_date && asOf >= lc.ended_date) return "failed";
  if (lc.effective_date && asOf < lc.effective_date) return "not_yet_effective";
  return "in_force";
}

export function rulesForAddress(rules: RuleRecord[], f: AddressFacts): RuleRecord[] {
  const cityKey = `${f.city}, ${f.state}`;
  return rules.filter((r) =>
    r.level === "state" ? r.jurisdiction === f.state : r.jurisdiction === cityKey,
  );
}

export function jurisdictionStack(f: AddressFacts): string[] {
  return [f.state, `${f.city}, ${f.state}`];
}

const FACT_QUESTIONS: Record<FactName, (c?: Cond) => { question: string; how_to_find: string }> = {
  units: (c) => ({
    question: `How many homes are in the building${c ? ` (the rule turns on ${c.value})` : ""}?`,
    how_to_find: "Count the mailboxes or doorbells, or look up the property on the county assessor website.",
  }),
  year_built: (c) => ({
    question:
      c && c.op.startsWith("co_")
        ? `Was the building first approved for people to live in ${c.op === "co_after" ? "after" : "on or before"} ${c.value}?`
        : "When was the building finished?",
    how_to_find:
      "Ask the city building department for the certificate of occupancy, or use the city rent program's property lookup. Your landlord can also tell you.",
  }),
  building_type: () => ({
    question: "Is the home a single-family house, a condo, or an apartment in a larger building?",
    how_to_find: "Check your lease or the county assessor record.",
  }),
  owner_occupied: () => ({
    question: "Does the owner live in the building?",
    how_to_find: "Ask your landlord.",
  }),
  owner_is_corporation: () => ({
    question: "Is the owner a company (such as a corporation or REIT) or a person?",
    how_to_find:
      "Check your lease. In California, a home exempt from the state rent cap must have a written exemption notice in the lease.",
  }),
  owner_rental_property_count: () => ({
    question: "How many rental properties does the owner have?",
    how_to_find: "Ask your landlord.",
  }),
  tenancy_months: () => ({
    question: "How long have you lived in the home?",
    how_to_find: "Check the start date on your lease.",
  }),
  government_subsidized: () => ({
    question: "Is the rent subsidized, for example with a housing voucher or a public program?",
    how_to_find: "Check your lease or letters from the housing authority.",
  }),
};

function decidingFor(rules: RuleRecord[], f: AddressFacts, asOf: string): DecidingFact | null {
  const tally = new Map<FactName, { n: number; cond?: Cond }>();
  for (const r of rules) {
    for (const fact of unknownFacts(r.x_coverage, f, asOf)) {
      const cond = [...r.x_coverage.all, ...r.x_coverage.exempt_if_any.flat()].find((c) => c.fact === fact);
      const t = tally.get(fact) ?? { n: 0, cond };
      t.n += 1;
      tally.set(fact, t);
    }
  }
  const best = [...tally.entries()].sort((a, b) => b[1].n - a[1].n)[0];
  if (!best) return null;
  const q = FACT_QUESTIONS[best[0]](best[1].cond);
  return { fact: best[0], ...q };
}

function explain(rule: RuleRecord, result: Result, f: AddressFacts, asOf: string, note?: string): string {
  const where = `${f.city}, ${f.state}`;
  switch (result) {
    case "applies":
      return `${rule.requirement} Covers this ${where} building as of ${asOf}. Source: ${rule.citation}.`;
    case "unknown": {
      const facts = unknownFacts(rule.x_coverage, f, asOf);
      const what = facts.length ? facts.map((x) => x.replace(/_/g, " ")).join(", ") : "a fact";
      return `${note ?? `Coverage depends on ${what}, which the public records do not include.`} Source: ${rule.citation}.`;
    }
    case "superseded":
      return `A stricter local rule governs this building instead. ${note ?? ""} Source: ${rule.citation}.`.replace(/\s+/g, " ");
    case "not_yet_effective":
      return `Enacted, but takes effect ${rule.x_lifecycle.effective_date}, after ${asOf}. Source: ${rule.citation}.`;
    case "pending":
      return `Proposed, not law. Would cover this building if enacted. Source: ${rule.citation}.`;
  }
}

export interface LookupRow extends RuleRecord {
  r: RuleResult;
}

export function lookupAddress(
  rules: RuleRecord[],
  f: AddressFacts,
  asOf: string,
  opts: LookupOptions = {},
): RuleResult[] {
  const unknownLocalMeans = opts.unknownLocalMeans ?? "unknown";
  const cand = rulesForAddress(rules, f);
  const prelim: { rule: RuleRecord; result: Result }[] = [];

  for (const rule of cand) {
    const status = statusAt(rule, asOf);
    if (status === "failed") continue;
    const cov = evalCoverage(rule.x_coverage, f, asOf);
    if (cov === "F") continue;
    let result: Result;
    if (status === "pending") result = "pending";
    else if (status === "not_yet_effective") result = "not_yet_effective";
    else result = cov === "U" ? "unknown" : "applies";
    prelim.push({ rule, result });
  }

  const localByCat = new Map<Category, Result[]>();
  for (const p of prelim) {
    if (p.rule.level !== "city") continue;
    const arr = localByCat.get(p.rule.category) ?? [];
    arr.push(p.result);
    localByCat.set(p.rule.category, arr);
  }

  const out: RuleResult[] = [];
  const conflictCats = new Set<Category>();

  for (const p of prelim) {
    let result = p.result;
    let note: string | undefined;
    const local = localByCat.get(p.rule.category) ?? [];

    if (p.rule.level === "state" && p.rule.x_yields_to_local && result === "applies") {
      if (local.includes("applies")) {
        result = "superseded";
        note = `The ${f.city} rule on this topic covers this building.`;
      } else if (local.includes("unknown") && unknownLocalMeans === "unknown") {
        result = "unknown";
        note = `This state rule yields to the ${f.city} rule if that rule covers the building, which depends on facts not in the records.`;
      }
    }

    let conflict = false;
    let conflict_note: string | undefined;
    if (
      p.rule.level === "state" &&
      p.rule.x_may_conflict_with_local &&
      (result === "applies" || result === "not_yet_effective") &&
      local.some((x) => x === "applies" || x === "not_yet_effective")
    ) {
      conflict = true;
      conflictCats.add(p.rule.category);
      conflict_note = `May conflict with the ${f.city} rule on the same topic. Flagged for human review.`;
    }

    const rr: RuleResult = {
      team_rule_id: p.rule.team_rule_id,
      result,
      explanation: explain(p.rule, result, f, asOf, note),
      conflict_flag: conflict || p.rule.conflict_flag,
      conflict_note: conflict_note ?? p.rule.conflict_note ?? undefined,
    };
    if (result === "unknown") rr.deciding = decidingFor([p.rule], f, asOf);
    out.push(rr);
  }

  // Local rules that a state rule may conflict with carry the flag too.
  for (const rr of out) {
    const rule = cand.find((x) => x.team_rule_id === rr.team_rule_id)!;
    if (rule.level === "city" && conflictCats.has(rule.category) && (rr.result === "applies" || rr.result === "not_yet_effective")) {
      rr.conflict_flag = true;
      rr.conflict_note = rr.conflict_note ?? "A state law on the same topic may conflict with this local rule. Flagged for human review.";
    }
  }
  return out;
}

/** The single missing fact that would settle the most "unknown" answers at an address. */
export function decidingFactForAddress(rules: RuleRecord[], f: AddressFacts, asOf: string, results: RuleResult[]) {
  const unknownRules = results
    .filter((r) => r.result === "unknown")
    .map((r) => rules.find((x) => x.team_rule_id === r.team_rule_id)!)
    .filter(Boolean);
  return decidingFor(unknownRules, f, asOf);
}
