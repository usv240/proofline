// Three-valued (Kleene) evaluation of coverage conditions.
// Missing facts give "U" (unknown), never "F". Year built is treated as an approximation of the
// certificate-of-occupancy date: a building completed in the cutoff year is "U".

import type { AddressFacts, Cond, Coverage, FactName, Tri } from "./types";

export const and = (xs: Tri[]): Tri => (xs.includes("F") ? "F" : xs.includes("U") ? "U" : "T");
export const or = (xs: Tri[]): Tri => (xs.includes("T") ? "T" : xs.includes("U") ? "U" : "F");
export const not = (x: Tri): Tri => (x === "T" ? "F" : x === "F" ? "T" : "U");
const tri = (b: boolean): Tri => (b ? "T" : "F");

function parseDate(v: string): { y: number; m: number; d: number } | null {
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(v.trim());
  if (!m) return null;
  return { y: +m[1], m: m[2] ? +m[2] : 1, d: m[3] ? +m[3] : 1 };
}

/** Compare a completion year against a date cutoff. */
function yearVsDate(year: number, cutoff: string, op: "co_before" | "co_on_or_before" | "co_after"): Tri {
  const c = parseDate(cutoff);
  if (!c) return "U";
  const janFirst = c.m === 1 && c.d === 1;
  if (op === "co_after") return not(yearVsDate(year, cutoff, "co_on_or_before"));
  if (year < c.y) return "T";
  if (year > c.y) return "F";
  // Same year as the cutoff.
  if (op === "co_before" && janFirst) return "F";
  return "U";
}

/** Numeric comparison against an interval [min, max] of possible values. */
function compareRange(min: number | null, max: number | null, op: string, v: number): Tri {
  const lo = min ?? -Infinity;
  const hi = max ?? Infinity;
  const test = (x: number) => {
    switch (op) {
      case "lt": return x < v;
      case "lte": return x <= v;
      case "gt": return x > v;
      case "gte": return x >= v;
      case "eq": return x === v;
      case "neq": return x !== v;
      default: return false;
    }
  };
  if (op === "eq" || op === "neq") {
    if (lo === hi) return tri(test(lo));
    const inside = v >= lo && v <= hi;
    if (!inside) return op === "eq" ? "F" : "T";
    return "U";
  }
  const a = test(lo);
  const b = test(hi);
  if (a && b) return "T";
  if (!a && !b) return "F";
  return "U";
}

function userValue(f: AddressFacts, name: FactName): string | number | boolean | undefined {
  return f.user?.[name];
}

function asBool(v: string): boolean | null {
  const s = v.trim().toLowerCase();
  if (["true", "yes", "1"].includes(s)) return true;
  if (["false", "no", "0"].includes(s)) return false;
  return null;
}

export function evalCond(c: Cond, f: AddressFacts, asOf: string): Tri {
  const u = userValue(f, c.fact);
  switch (c.fact) {
    case "units": {
      const n = Number(c.value);
      if (Number.isNaN(n)) return "U";
      if (typeof u === "number") return compareRange(u, u, c.op, n);
      if (f.units.min === null && f.units.max === null) return "U";
      return compareRange(f.units.min, f.units.max, c.op, n);
    }
    case "year_built": {
      const y = typeof u === "number" ? u : f.year_built;
      if (y === null || y === undefined) return "U";
      if (c.op === "co_before" || c.op === "co_on_or_before" || c.op === "co_after") {
        return yearVsDate(y, c.value, c.op);
      }
      if (c.op === "age_under_years") {
        // Built within N years of the as-of date (rolling exemptions such as California's 15-year rule).
        const n = Number(c.value);
        const asof = parseDate(asOf)!;
        const cutoffYear = asof.y - n;
        if (y > cutoffYear) return "T";
        if (y < cutoffYear) return "F";
        return "U";
      }
      const n = Number(c.value);
      return Number.isNaN(n) ? "U" : compareRange(y, y, c.op, n);
    }
    case "building_type": {
      const bt = typeof u === "string" ? u : f.building_type;
      if (!bt || bt === "unknown") return "U";
      const want = c.value.trim().toLowerCase();
      if (c.op === "eq") return tri(bt === want);
      if (c.op === "neq") return tri(bt !== want);
      return "U";
    }
    case "government_subsidized": {
      const v = typeof u === "boolean" ? u : f.government_subsidized;
      const want = asBool(c.value);
      if (v === null || v === undefined || want === null) return "U";
      return c.op === "neq" ? tri(v !== want) : tri(v === want);
    }
    case "tenancy_months":
    case "owner_rental_property_count": {
      if (typeof u !== "number") return "U";
      const n = Number(c.value);
      return Number.isNaN(n) ? "U" : compareRange(u, u, c.op, n);
    }
    case "owner_occupied":
    case "owner_is_corporation": {
      if (typeof u !== "boolean") return "U";
      const want = asBool(c.value);
      if (want === null) return "U";
      return c.op === "neq" ? tri(u !== want) : tri(u === want);
    }
  }
  return "U";
}

/** Facts about a tenancy, not a building. A building-level lookup reports them as conditions on the
 * answer ("for tenants of 12 months or more") instead of letting them make the building "unknown". */
export const TENANT_FACTS: FactName[] = ["tenancy_months"];
export const isTenantCond = (c: Cond, f: AddressFacts) => TENANT_FACTS.includes(c.fact) && f.user?.[c.fact] === undefined;

export function tenantConditions(cov: Coverage, f: AddressFacts): string[] {
  return cov.all.filter((c) => isTenantCond(c, f)).map((c) =>
    c.fact === "tenancy_months" ? `for tenancies of at least ${c.value} months` : `${c.fact} ${c.op} ${c.value}`);
}

export function evalCoverage(cov: Coverage, f: AddressFacts, asOf: string): Tri {
  const base = and(cov.all.filter((c) => !isTenantCond(c, f)).map((c) => evalCond(c, f, asOf)));
  const exempt = or(cov.exempt_if_any.map((g) => and(g.map((c) => evalCond(c, f, asOf)))));
  return and([base, not(exempt)]);
}

/** Facts referenced by a coverage test that are currently unknown for this address. */
export function unknownFacts(cov: Coverage, f: AddressFacts, asOf: string): FactName[] {
  const out = new Set<FactName>();
  for (const c of [...cov.all.filter((x) => !isTenantCond(x, f)), ...cov.exempt_if_any.flat()]) {
    if (evalCond(c, f, asOf) === "U") out.add(c.fact);
  }
  return [...out];
}
