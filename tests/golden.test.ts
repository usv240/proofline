// Golden checks built only from facts the organizers stated (challenge brief "Illustrative output",
// participant README sections 4.1 and 7, dev/change_tests.json). They test the published outputs, so a
// pipeline or engine regression fails the build. We did not write these answers; the brief did.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { RuleRecord } from "../src/lib/engine/types";

const OUT = path.join(process.cwd(), "out");
const rules: RuleRecord[] = JSON.parse(readFileSync(path.join(OUT, "rules.json"), "utf8")).rules;
const lookups: Record<string, { team_rule_id: string; result: string; conflict_flag: boolean }[]> = JSON.parse(readFileSync(path.join(OUT, "lookups.json"), "utf8")).lookups;
const changes = JSON.parse(readFileSync(path.join(OUT, "changes.json"), "utf8"));
const addresses: { address_id: string; city: string; state: string }[] = JSON.parse(readFileSync(path.join(process.cwd(), "src", "generated", "addresses.json"), "utf8"));

/** Results at an address for rules of a place and category, e.g. ("A0001", "Los Angeles, CA", "rent_increase_limits"). */
function results(id: string, jur: string, cat: string) {
  return lookups[id].filter((r) => { const x = rules.find((y) => y.team_rule_id === r.team_rule_id)!; return x.jurisdiction === jur && x.category === cat; }).map((r) => r.result);
}
const ids = (city: string) => addresses.filter((a) => a.city === city).map((a) => a.address_id);

describe("brief: illustrative San Francisco output (20 units, built 1962)", () => {
  const A = "A0382"; // San Francisco, built 1964, 10 units
  it("SF Rent Ordinance applies and the AB 1482 state cap yields to it", () => {
    expect(results(A, "San Francisco, CA", "rent_increase_limits")).toContain("applies");
    expect(results(A, "CA", "rent_increase_limits")).toContain("superseded");
  });
  it("just cause: local ordinance applies", () => expect(results(A, "San Francisco, CA", "just_cause_eviction")).toContain("applies"));
  it("deposit: state one-month rule reported", () => expect(results(A, "CA", "security_deposits").length).toBeGreaterThan(0));
  it("screening fee: Cal. Civ. Code 1950.6 applies", () => expect(results(A, "CA", "application_screening_fees")).toContain("applies"));
  it("algorithmic pricing: local ban and state law both apply", () => {
    expect(results(A, "San Francisco, CA", "algorithmic_rent_setting")).toContain("applies");
    expect(results(A, "CA", "algorithmic_rent_setting")).toContain("applies");
  });
});

describe("README 4.1: certificate-of-occupancy cutoffs", () => {
  it("Los Angeles RSO applies to buildings well before 1978-10-01", () => {
    for (const a of ["A0001", "A0004", "A0007"]) expect(results(a, "Los Angeles, CA", "rent_increase_limits")).toContain("applies");
  });
  it("Los Angeles buildings finished in 1978 are unknown", () => {
    for (const a of ["A0107", "A0432"]) expect(results(a, "Los Angeles, CA", "rent_increase_limits")).toContain("unknown");
  });
  it("Los Angeles RSO does not cover buildings from the late 1980s on", () => {
    for (const a of ["A0023", "A0035", "A0037"]) expect(results(a, "Los Angeles, CA", "rent_increase_limits")).not.toContain("applies");
  });
  it("San Francisco rent limits do not cover buildings first occupied after 1979", () => {
    for (const a of ["A0050", "A0081", "A0105"]) expect(results(a, "San Francisco, CA", "rent_increase_limits")).not.toContain("applies");
  });
});

describe("README 7 and change_tests.json", () => {
  it("T1: every California address", () => expect(changes.T1.affected_address_ids.length).toBe(addresses.filter((a) => a.state === "CA").length));
  it("T2: each local ban only in its own city, neither in Newark", () => {
    const jc = new Set(ids("Jersey City")), hob = new Set(ids("Hoboken")), nwk = new Set(ids("Newark"));
    const hit: string[] = changes.T2.affected_address_ids;
    expect(hit.some((x) => nwk.has(x))).toBe(false);
    expect(hit.filter((x) => jc.has(x)).length).toBe(jc.size);
    expect(hit.filter((x) => hob.has(x)).length).toBe(hob.size);
  });
  it("T3: every NJ address, conflict flags on Jersey City and Hoboken only", () => {
    expect(changes.T3.affected_address_ids.length).toBe(addresses.filter((a) => a.state === "NJ").length);
    const flagged = new Set<string>(changes.T3.conflict_flag_address_ids);
    expect(ids("Newark").some((x) => flagged.has(x))).toBe(false);
    expect([...ids("Jersey City"), ...ids("Hoboken")].every((x) => flagged.has(x))).toBe(true);
  });
  it("T4: pending for every Massachusetts address, never in force", () => {
    expect(changes.T4.affected_address_ids.length).toBe(addresses.filter((a) => a.state === "MA").length);
    for (const a of addresses.filter((x) => x.state === "MA")) expect(results(a.address_id, "MA", "algorithmic_rent_setting")).not.toContain("applies");
  });
  it("T5: no rent cap for any Boston or Cambridge address", () => {
    expect(changes.T5.affected_address_ids).toEqual([]);
    for (const a of addresses.filter((x) => x.state === "MA")) {
      for (const j of ["MA", `${a.city}, MA`]) expect(results(a.address_id, j, "rent_increase_limits")).not.toContain("applies");
    }
  });
  it("lookups cover all 500 addresses", () => expect(Object.keys(lookups).length).toBe(500));
  it("every rule meets the official schema's required fields", () => {
    for (const r of rules) {
      for (const k of ["team_rule_id", "jurisdiction", "level", "category", "status", "title", "requirement", "citation", "source_url", "quoted_span"] as const) expect(r[k], `${r.team_rule_id}.${k}`).toBeTruthy();
      expect(r.quoted_span.length).toBeGreaterThanOrEqual(20);
    }
  });
});
