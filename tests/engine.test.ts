import { describe, expect, it } from "vitest";
import { unitsFromDescription, buildFacts } from "../src/lib/engine/facts";
import { evalCond, evalCoverage } from "../src/lib/engine/predicate";
import { findSpan } from "../src/lib/engine/span";
import { lookupAddress, statusAt } from "../src/lib/engine/lookup";
import type { AddressFacts, RuleRecord } from "../src/lib/engine/types";

const base: AddressFacts = {
  address_id: "T1", street_address: "1 Test St", postal_city: "Los Angeles", state: "CA", city: "Los Angeles", zip: "",
  year_built: 1978, units: { min: 10, max: 10, source: "assessor" }, building_type: "multifamily",
  government_subsidized: null, use_description: "", resolution_method: "test", resolution_confidence: 1,
};

function rule(p: Partial<RuleRecord>): RuleRecord {
  return {
    team_rule_id: "X-01", jurisdiction: "CA", level: "state", category: "rent_increase_limits", status: "in_force",
    title: "t", requirement: "r.", key_value: null, coverage_conditions: null, exemptions: null, overrides: [],
    interaction: null, effective_date: null, citation: "Cite", source_doc_id: "D000", source_url: "u",
    quoted_span: "quoted span long enough", confidence: 1, conflict_flag: false, conflict_note: null,
    x_lifecycle: { kind: "enacted", enacted_date: null, effective_date: null, ended_date: null },
    x_coverage: { all: [], exempt_if_any: [] }, x_yields_to_local: false, x_may_conflict_with_local: false,
    x_details: [], x_plain: "", x_retrieved_at: null, x_source_kind: "official_corpus", x_span: null, x_challenge: null,
    ...p,
  };
}

describe("certificate-of-occupancy cutoffs from year built", () => {
  it("built in the cutoff year is unknown", () => {
    expect(evalCond({ fact: "year_built", op: "co_on_or_before", value: "1978-10-01" }, base, "2026-10-01")).toBe("U");
  });
  it("built before is covered, after is not", () => {
    expect(evalCond({ fact: "year_built", op: "co_on_or_before", value: "1978-10-01" }, { ...base, year_built: 1960 }, "2026-10-01")).toBe("T");
    expect(evalCond({ fact: "year_built", op: "co_on_or_before", value: "1978-10-01" }, { ...base, year_built: 1990 }, "2026-10-01")).toBe("F");
  });
  it("missing year built is unknown, never no", () => {
    expect(evalCond({ fact: "year_built", op: "co_on_or_before", value: "1979-06-13" }, { ...base, year_built: null }, "2026-10-01")).toBe("U");
  });
  it("rolling 15-year exemption is relative to the as-of date", () => {
    const c = { fact: "year_built" as const, op: "age_under_years" as const, value: "15" };
    expect(evalCond(c, { ...base, year_built: 2015 }, "2026-10-01")).toBe("T");
    expect(evalCond(c, { ...base, year_built: 2000 }, "2026-10-01")).toBe("F");
    expect(evalCond(c, { ...base, year_built: 2011 }, "2026-10-01")).toBe("U");
  });
});

describe("unit ranges and three-valued logic", () => {
  it("a range fully above a threshold decides", () => {
    const f = { ...base, units: { min: 7, max: 30, source: "use_band" as const } };
    expect(evalCond({ fact: "units", op: "gte", value: "5" }, f, "2026-10-01")).toBe("T");
    expect(evalCond({ fact: "units", op: "lte", value: "4" }, f, "2026-10-01")).toBe("F");
  });
  it("an exemption that is definitely false settles coverage despite other unknowns", () => {
    const cov = { all: [], exempt_if_any: [[{ fact: "owner_occupied" as const, op: "eq" as const, value: "true" }, { fact: "units" as const, op: "lte" as const, value: "2" }]] };
    expect(evalCoverage(cov, base, "2026-10-01")).toBe("T");
  });
  it("an unresolvable exemption leaves coverage unknown", () => {
    const cov = { all: [], exempt_if_any: [[{ fact: "owner_occupied" as const, op: "eq" as const, value: "true" }]] };
    expect(evalCoverage(cov, base, "2026-10-01")).toBe("U");
  });
});

describe("unit counts from property descriptions", () => {
  it("parses New Jersey MOD-IV descriptions", () => {
    expect(unitsFromDescription("3S-F-D-6U-NH")).toMatchObject({ min: 6, max: 6 });
    expect(unitsFromDescription("10S-B-A-151U-HE")).toMatchObject({ min: 151 });
    expect(unitsFromDescription("2F-4U/2F-2U")).toMatchObject({ min: 4, max: 6 });
  });
  it("parses official use bands", () => {
    expect(unitsFromDescription("APT 7-30 UNITS")).toMatchObject({ min: 7, max: 30 });
    expect(unitsFromDescription("Alameda County use code (5+ units)")).toMatchObject({ min: 5, max: null });
    expect(unitsFromDescription("Apartment 5 to 14 Units")).toMatchObject({ min: 5, max: 14 });
  });
  it("prefers the assessor unit column", () => {
    const f = buildFacts({ address_id: "A", street_address: "", postal_city: "", state: "NJ", zip: "", year_built: "", units: "12", use_code: "4C", use_description: "3S-F-6U", legal_city: "Jersey City", resolution_method: "", resolution_confidence: "1" });
    expect(f.units).toMatchObject({ min: 12, source: "assessor" });
  });
});

describe("quote verification", () => {
  const src = "Section 1. A landlord shall not  charge more than one month’s rent as a deposit.";
  it("matches exactly", () => expect(findSpan(src, "A landlord shall not  charge")?.match).toBe("exact"));
  it("matches after normalizing spaces and curly quotes, returning source text", () => {
    const m = findSpan(src, "shall not charge more than one month's rent as a deposit");
    expect(m?.match).toBe("normalized");
    expect(src.slice(m!.start, m!.end)).toBe(m!.text);
  });
  it("rejects text that is not in the source", () => expect(findSpan(src, "A landlord may charge two months rent")).toBeNull());
});

describe("time and precedence", () => {
  const alg = rule({ category: "algorithmic_rent_setting", x_lifecycle: { kind: "enacted", enacted_date: "2025-10-06", effective_date: "2026-01-01", ended_date: null } });
  it("not yet effective before the date, in force on and after", () => {
    expect(statusAt(alg, "2025-12-31")).toBe("not_yet_effective");
    expect(statusAt(alg, "2026-01-02")).toBe("in_force");
  });
  it("failed measures never apply", () => {
    const failed = rule({ x_lifecycle: { kind: "failed", enacted_date: null, effective_date: null, ended_date: "2026-06-23" } });
    expect(lookupAddress([failed], base, "2026-10-01")).toEqual([]);
  });
  it("state cap is superseded where local rent control applies, unknown where local coverage is unknown", () => {
    const state = rule({ team_rule_id: "CA-RENT-01", x_yields_to_local: true });
    const local = rule({ team_rule_id: "LA-RENT-01", level: "city", jurisdiction: "Los Angeles, CA", x_coverage: { all: [{ fact: "year_built", op: "co_on_or_before", value: "1978-10-01" }], exempt_if_any: [] } });
    const covered = lookupAddress([state, local], { ...base, year_built: 1960 }, "2026-10-01");
    expect(covered.find((r) => r.team_rule_id === "CA-RENT-01")?.result).toBe("superseded");
    const edge = lookupAddress([state, local], base, "2026-10-01");
    expect(edge.find((r) => r.team_rule_id === "LA-RENT-01")?.result).toBe("unknown");
    expect(edge.find((r) => r.team_rule_id === "CA-RENT-01")?.result).toBe("unknown");
    expect(edge.find((r) => r.team_rule_id === "LA-RENT-01")?.deciding?.fact).toBe("year_built");
  });
});
