// "What if" analysis: for every fact the public record is missing, which values are worth asking about,
// and how each value changes the answers at this address. Pure function of (rules, facts, date).
import { lookupAddress, rulesForAddress } from "./lookup";
import { unknownFacts } from "./predicate";
import type { AddressFacts, Cond, FactName, Result, RuleRecord } from "./types";

export interface Option {
  label: string;
  /** How to apply this answer to the facts. */
  patch: Partial<Pick<AddressFacts, "year_built" | "units" | "building_type" | "government_subsidized">> & { user?: AddressFacts["user"] };
  /** Rules whose result changes, with before and after. */
  changes: { team_rule_id: string; before: Result | "none"; after: Result | "none" }[];
}

export interface WhatIf {
  fact: FactName;
  question: string;
  options: Option[];
}

const Q: Record<FactName, string> = {
  units: "How many homes are in the building?",
  year_built: "When was the building first approved for people to live in?",
  building_type: "What kind of home is it?",
  owner_occupied: "Does the owner live in the building?",
  owner_is_corporation: "Is the owner a company?",
  owner_rental_property_count: "How many rental properties does the owner have?",
  tenancy_months: "How long have you lived there?",
  government_subsidized: "Is the rent subsidized (for example a housing voucher)?",
};

function resultsMap(rules: RuleRecord[], f: AddressFacts, asOf: string) {
  return new Map(lookupAddress(rules, f, asOf).map((r) => [r.team_rule_id, r.result]));
}

function diff(a: Map<string, Result>, b: Map<string, Result>) {
  const ids = new Set([...a.keys(), ...b.keys()]);
  const out: Option["changes"] = [];
  for (const id of ids) {
    const x = a.get(id) ?? "none";
    const y = b.get(id) ?? "none";
    if (x !== y) out.push({ team_rule_id: id, before: x, after: y });
  }
  return out;
}

export function whatIf(allRules: RuleRecord[], f: AddressFacts, asOf: string): WhatIf[] {
  const rules = rulesForAddress(allRules, f);
  const base = resultsMap(rules, f, asOf);
  const conds = new Map<FactName, Cond[]>();
  for (const r of rules) {
    const missing = unknownFacts(r.x_coverage, f, asOf);
    for (const c of [...r.x_coverage.all, ...r.x_coverage.exempt_if_any.flat()]) {
      if (missing.includes(c.fact)) conds.set(c.fact, [...(conds.get(c.fact) ?? []), c]);
    }
  }
  const out: WhatIf[] = [];
  for (const [fact, cs] of conds) {
    const candidates: { label: string; patch: Option["patch"] }[] = [];
    if (fact === "units") {
      const ts = [...new Set(cs.map((c) => Number(c.value)).filter((n) => !Number.isNaN(n)))].sort((a, b) => a - b);
      const vals = new Set<number>();
      for (const t of ts) { vals.add(Math.max(1, t - 1)); vals.add(t); vals.add(t + 1); }
      for (const v of [...vals].sort((a, b) => a - b)) candidates.push({ label: `${v} home${v === 1 ? "" : "s"}`, patch: { units: { min: v, max: v, source: "user" } } });
    } else if (fact === "year_built") {
      const years = new Set<number>();
      for (const c of cs) {
        if (c.op === "age_under_years") { const y = Number(asOf.slice(0, 4)) - Number(c.value); years.add(y - 1); years.add(y + 1); }
        else { const y = Number(c.value.slice(0, 4)); if (y) { years.add(y - 1); years.add(y + 1); } }
      }
      for (const y of [...years].sort((a, b) => a - b)) candidates.push({ label: `Around ${y}`, patch: { year_built: y } });
    } else if (fact === "building_type") {
      for (const v of ["multifamily", "single_family", "condo"] as const) candidates.push({ label: v.replace("_", " "), patch: { building_type: v } });
    } else if (fact === "government_subsidized") {
      candidates.push({ label: "Yes", patch: { government_subsidized: true } }, { label: "No", patch: { government_subsidized: false } });
    } else if (fact === "owner_occupied" || fact === "owner_is_corporation") {
      candidates.push({ label: "Yes", patch: { user: { [fact]: true } } }, { label: "No", patch: { user: { [fact]: false } } });
    } else if (fact === "owner_rental_property_count" || fact === "tenancy_months") {
      const ts = [...new Set(cs.map((c) => Number(c.value)).filter((n) => !Number.isNaN(n)))].sort((a, b) => a - b);
      for (const t of ts) candidates.push({ label: `Fewer than ${t}`, patch: { user: { [fact]: Math.max(0, t - 1) } } }, { label: `${t} or more`, patch: { user: { [fact]: t } } });
    }
    const options: Option[] = [];
    for (const c of candidates) {
      const g: AddressFacts = { ...f, ...c.patch, user: { ...(f.user ?? {}), ...(c.patch.user ?? {}) } };
      const changes = diff(base, resultsMap(rules, g, asOf));
      options.push({ label: c.label, patch: c.patch, changes });
    }
    // Keep only answers that change something, and collapse answers with identical effects.
    const seen = new Set<string>();
    const kept = options.filter((o) => {
      const k = JSON.stringify(o.changes);
      if (!o.changes.length || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    if (kept.length) out.push({ fact, question: Q[fact], options: kept });
  }
  // Most consequential fact first.
  return out.sort((a, b) => Math.max(...b.options.map((o) => o.changes.length)) - Math.max(...a.options.map((o) => o.changes.length)));
}

export function applyPatch(f: AddressFacts, patch: Option["patch"]): AddressFacts {
  return { ...f, ...patch, user: { ...(f.user ?? {}), ...(patch.user ?? {}) } };
}
