// Core types shared by the pipeline, the API and the browser.
// The official rule_record.schema.json fields are kept as-is; Proofline-only fields start with x_.

export const CATEGORIES = [
  "rent_increase_limits",
  "just_cause_eviction",
  "security_deposits",
  "application_screening_fees",
  "screening_restrictions",
  "algorithmic_rent_setting",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Tri = "T" | "F" | "U";

export const FACT_NAMES = [
  "units",
  "year_built",
  "building_type",
  "owner_occupied",
  "owner_is_corporation",
  "owner_rental_property_count",
  "tenancy_months",
  "government_subsidized",
] as const;
export type FactName = (typeof FACT_NAMES)[number];

export const OPS = [
  "eq",
  "neq",
  "lt",
  "lte",
  "gt",
  "gte",
  "co_before",
  "co_on_or_before",
  "co_after",
  "age_under_years",
] as const;
export type Op = (typeof OPS)[number];

export interface Cond {
  fact: FactName;
  op: Op;
  value: string;
}

/** Rule covers a building when every `all` condition holds and no exemption group holds. */
export interface Coverage {
  all: Cond[];
  exempt_if_any: Cond[][];
}

export type LifecycleKind = "enacted" | "pending" | "failed";
export interface Lifecycle {
  kind: LifecycleKind;
  enacted_date: string | null;
  effective_date: string | null;
  ended_date: string | null;
}

export type Status = "in_force" | "not_yet_effective" | "pending" | "failed";
export type Result = "applies" | "unknown" | "superseded" | "not_yet_effective" | "pending";

export interface Detail {
  text: string;
  quoted_span: string;
}

export interface RuleRecord {
  team_rule_id: string;
  jurisdiction: string;
  level: "state" | "city";
  category: Category;
  status: Status;
  title: string;
  requirement: string;
  key_value: string | null;
  coverage_conditions: string | null;
  exemptions: string | null;
  overrides: string[];
  interaction: string | null;
  effective_date: string | null;
  citation: string;
  x_citation_full?: string;
  source_doc_id: string | null;
  source_url: string;
  quoted_span: string;
  confidence: number | null;
  conflict_flag: boolean;
  conflict_note: string | null;
  x_lifecycle: Lifecycle;
  x_coverage: Coverage;
  x_yields_to_local: boolean;
  x_may_conflict_with_local: boolean;
  x_details: Detail[];
  x_plain: string;
  x_retrieved_at: string | null;
  x_source_kind: "official_corpus" | "fetched_link_only";
  x_span: { start: number; end: number; match: "exact" | "normalized" } | null;
  x_challenge: { verdict: "support" | "partial" | "contradict"; note: string } | null;
}

export interface NoRuleFinding {
  jurisdiction: string;
  level: "state" | "city";
  category: Category;
  reason: string;
  citation: string | null;
  source_doc_id: string | null;
  quoted_span: string | null;
  qualified_by?: string[];
}

export interface UnitsFact {
  min: number | null;
  max: number | null;
  source: "assessor" | "description" | "use_band" | "user" | "missing";
}

export interface AddressFacts {
  address_id: string;
  street_address: string;
  postal_city: string;
  state: "CA" | "NJ" | "MA";
  city: string;
  zip: string;
  year_built: number | null;
  units: UnitsFact;
  building_type: "multifamily" | "condo" | "single_family" | "elderly" | "unknown";
  government_subsidized: boolean | null;
  use_description: string;
  resolution_method: string;
  resolution_confidence: number;
  /** Facts never in public data, but a user may supply them in Pre-Flight. */
  user?: Partial<Record<FactName, string | number | boolean>>;
}

export interface RuleResult {
  team_rule_id: string;
  result: Result;
  explanation: string;
  conflict_flag: boolean;
  conflict_note?: string;
  deciding?: DecidingFact | null;
}

export interface DecidingFact {
  fact: FactName;
  question: string;
  how_to_find: string;
}
