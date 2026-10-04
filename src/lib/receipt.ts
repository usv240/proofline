// Proof receipt: a small, hash-sealed record of one answer. It names the rule set version, the building
// facts used (including any the renter added), the date, and every result. Anyone can post it back to
// /api/receipt/verify, which recomputes the answer from the published rules and compares. Shared by the
// browser (Web Crypto) and the server (node:crypto) through `hashHex`.
import type { AddressFacts, Result } from "./engine/types";

export interface Receipt {
  v: 1;
  issued_at: string;
  rules_sha256: string;
  as_of: string;
  address: { id: string; street: string; city: string; state: string };
  facts_used: { year_built: number | null; units: { min: number | null; max: number | null; source: string }; building_type: string; government_subsidized: boolean | null; user: Record<string, string | number | boolean> };
  results: { rule: string; result: Result }[];
  sha256: string;
  disclaimer: "Not legal advice.";
}

export function canonical(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonical).join(",")}]`;
  if (v && typeof v === "object") return `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`).join(",")}}`;
  return JSON.stringify(v);
}

export function receiptBody(f: AddressFacts, asOf: string, results: { team_rule_id: string; result: Result }[], rulesSha: string, issuedAt: string): Omit<Receipt, "sha256"> {
  return {
    v: 1,
    issued_at: issuedAt,
    rules_sha256: rulesSha,
    as_of: asOf,
    address: { id: f.address_id, street: f.street_address, city: f.city, state: f.state },
    facts_used: { year_built: f.year_built, units: { min: f.units.min, max: f.units.max, source: f.units.source }, building_type: f.building_type, government_subsidized: f.government_subsidized, user: (f.user ?? {}) as Record<string, string | number | boolean> },
    results: results.map((r) => ({ rule: r.team_rule_id, result: r.result })).sort((a, b) => a.rule.localeCompare(b.rule)),
    disclaimer: "Not legal advice.",
  };
}

export async function hashHex(text: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(text).digest("hex");
}

export async function seal(body: Omit<Receipt, "sha256">): Promise<Receipt> {
  return { ...body, sha256: await hashHex(canonical(body)) };
}
