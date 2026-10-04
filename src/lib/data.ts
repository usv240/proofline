// Server-side access to the published pipeline outputs. Pages pass small slices to client components.
import "server-only";
import addressesJson from "@/generated/addresses.json";
import changesJson from "@/generated/changes.json";
import metricsJson from "@/generated/metrics.json";
import noRuleJson from "@/generated/no_rule.json";
import rulesJson from "@/generated/rules.json";
import sourcesJson from "@/generated/sources.json";
import { rulesForAddress } from "@/lib/engine/lookup";
import type { AddressFacts, NoRuleFinding, RuleRecord } from "@/lib/engine/types";

export const RULES = rulesJson as unknown as RuleRecord[];
export const ADDRESSES = addressesJson as unknown as AddressFacts[];
export const NO_RULE = noRuleJson as unknown as NoRuleFinding[];
export const CHANGES = changesJson as unknown as Record<string, ChangeEntry>;
export const METRICS = metricsJson as unknown as Metrics;
export const SOURCES = sourcesJson as unknown as SourceEntry[];

export interface ChangeEntry {
  test_id: string;
  title: string;
  type: string;
  as_of?: string;
  as_of_before?: string;
  as_of_after?: string;
  expected_behavior?: string;
  affected_address_ids: string[];
  conflict_flag_address_ids: string[];
  notes: string;
  rules: string[];
  before_after: { address_id: string; rule: string; before: string; after: string }[];
}

export interface SourceEntry {
  doc_id: string;
  jurisdiction: string;
  url: string;
  source_type: string;
  kind: string;
  retrieved_at: string | null;
  rules: string[];
}

export interface Metrics {
  generated_at: string;
  as_of: string;
  documents: { manifest: number; with_text: number; official: number; fetched: number };
  extraction: { candidates: number; rejected: number; rules: number; quotes_verified: number; quote_rate: number };
  addresses: { total: number; geocoded: number; fallback: number };
  results: Record<string, number>;
  unknown_by_city: Record<string, { unknown: number; total: number }>;
  negative_control: { checks: number; invented_applies: number; no_rule_cells: number };
  audit: { ok: boolean; entries: number; brokenAt: number | null } | null;
  change_tests: Record<string, { affected: number; conflicts: number }>;
}

export const PLACES = [
  "CA", "Los Angeles, CA", "San Francisco, CA", "San Diego, CA", "Berkeley, CA", "Santa Ana, CA",
  "NJ", "Jersey City, NJ", "Hoboken, NJ", "Newark, NJ", "MA", "Boston, MA", "Cambridge, MA",
];

export function addressById(id: string) {
  return ADDRESSES.find((a) => a.address_id === id) ?? null;
}

/** Everything the address page needs, and nothing more. */
export function addressBundle(id: string) {
  const a = addressById(id);
  if (!a) return null;
  const rules = rulesForAddress(RULES, a);
  const noRule = NO_RULE.filter((n) => n.jurisdiction === a.state || n.jurisdiction === `${a.city}, ${a.state}`);
  return { address: a, rules, noRule };
}

/** Light-weight list for address search. */
export function addressIndex() {
  return ADDRESSES.map((a) => ({
    id: a.address_id,
    street: a.street_address,
    city: a.city,
    state: a.state,
    postal: a.postal_city,
  }));
}
