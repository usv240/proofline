// Prompts and output schemas for the extraction and verification steps.
import * as z from "zod/v4";
import { CATEGORIES, FACT_NAMES, OPS } from "../engine/types";

const Cond = z.object({
  fact: z.enum(FACT_NAMES),
  op: z.enum(OPS),
  value: z.string(),
});

export const ExtractedRule = z.object({
  jurisdiction: z.string().describe('State code ("CA", "NJ", "MA") or "City, ST" exactly as given in the allowed list.'),
  category: z.enum(CATEGORIES),
  title: z.string(),
  citation: z.string().describe("Official cite, e.g. 'Cal. Civ. Code § 1947.12', 'N.J.S.A. 46:8-21.2', 'S.F. Admin. Code § 37.10C'."),
  requirement: z.string().describe("One or two plain-language sentences stating what the rule requires or forbids."),
  key_value: z.string().nullable().describe("Headline number or formula, e.g. '1 month's rent', 'lesser of 5% + CPI or 10%'. Null if none."),
  coverage_conditions: z.string().nullable().describe("Who and what is covered, in words."),
  exemptions: z.string().nullable().describe("Exemptions, in words."),
  penalty: z.string().nullable(),
  lifecycle_kind: z.enum(["enacted", "pending", "failed"]).describe("enacted = law passed (in force or with a future effective date); pending = bill or proposal not enacted; failed = struck, vetoed, defeated or withdrawn."),
  enacted_date: z.string().nullable().describe("YYYY-MM-DD, YYYY-MM or YYYY if stated."),
  effective_date: z.string().nullable().describe("Date the rule starts to apply, YYYY-MM-DD, YYYY-MM or YYYY. Null if not stated or long in force."),
  ended_date: z.string().nullable().describe("Date the rule stopped applying or was struck, if stated."),
  quoted_span: z.string().describe("EXACT text copied character for character from the document that states the rule. 1 to 3 sentences, at least 20 characters. No ellipses, no paraphrase."),
  coverage: z.object({
    all: z.array(Cond).describe("Conditions that must ALL hold for the rule to cover a building. Empty if the rule covers all residential rentals in the jurisdiction."),
    exempt_if_any: z.array(z.object({ conds: z.array(Cond) })).describe("Each group is one exemption; the building is exempt if every condition in any group holds."),
  }),
  yields_to_local: z.boolean().describe("True only if this STATE rule says it does not apply, or that the local rule governs instead, where a local ordinance on the same topic covers the unit (e.g. a state rent cap that exempts units under local rent control, or a state just-cause law that defers to a more protective local ordinance)."),
  may_conflict_with_local: z.boolean().describe("True ONLY if this STATE rule expressly preempts local ordinances or prohibits municipalities from enacting conflicting ordinances on the same topic. False when the state rule defers to, coexists with, or sets a floor beneath local rules. False for city rules."),
  details: z.array(z.object({ text: z.string(), quoted_span: z.string() })).describe("Secondary obligations of the same rule (notice periods, return deadlines, relocation amounts), each with an exact quote."),
  plain_language: z.string().describe("One sentence a renter can understand, grade 6 reading level, starting with 'You' or 'Your' where natural."),
  confidence: z.number().describe("0 to 1: how sure you are the rule, dates and status are read correctly from this document."),
});
export type ExtractedRule = z.infer<typeof ExtractedRule>;

export const NoRule = z.object({
  jurisdiction: z.string(),
  category: z.enum(CATEGORIES),
  reason: z.string(),
  citation: z.string().nullable(),
  quoted_span: z.string().describe("Exact text from the document establishing that no rule exists at this level."),
});

export const ExtractionOutput = z.object({
  rules: z.array(ExtractedRule),
  no_rule_findings: z.array(NoRule),
});

export const EXTRACT_SYSTEM = `You extract structured housing-law rules from official legal text for an address-level lookup system used by renters, legal aid workers and housing providers. Accuracy and traceability matter more than coverage: never invent a rule, a date or a number that the document does not state.

SCOPE: residential rental housing rules in exactly six categories:
- rent_increase_limits: caps on rent increases (rent control, rent stabilization, statewide caps), covered buildings, exemptions, local vs state precedence.
- just_cause_eviction: lists of allowed reasons to end a tenancy, notice, relocation assistance, coverage.
- security_deposits: maximum deposit, exceptions, return timelines, interest.
- application_screening_fees: fee caps, allowed upfront charges, receipts and refunds, broker fees charged to tenants.
- screening_restrictions: limits on using criminal history, source of income (including vouchers), credit or other screening; timing rules.
- algorithmic_rent_setting: bans or restrictions on software or coordinators that set or recommend rents using competitor data; penalties; effective dates.
Ignore everything else (habitability, utilities, condo conversion, employment, etc.).

GRANULARITY: produce ONE record per distinct legal rule per category: typically one statute section or one ordinance (or ordinance section) per category. Put secondary obligations of the same rule (notice periods, deposit return days, interest, relocation dollar amounts, receipts) in "details", not as separate records. Pending bills and failed or struck measures ARE records (lifecycle_kind pending or failed), because users must see that they are not law. A document that summarizes another level's law (e.g. a city page restating state law) may yield a state record if the document actually states that state rule.

JURISDICTION: use only jurisdictions from the allowed list given with the document. Use the state code for state law and "City, ST" for city law.

DATES: effective_date is the date the rule starts to apply. For a law long in force with no stated date, use null. For enacted laws whose effective date is in the future relative to the document, still set lifecycle_kind "enacted" with that date. If two dates are published, use the one in the operative text and mention the other in requirement or details.

COVERAGE AS TESTS: translate coverage and exemptions into conditions over these facts only:
- units (number of dwelling units in the building): ops eq, neq, lt, lte, gt, gte with numeric value.
- year_built: use co_on_or_before / co_before / co_after with a YYYY-MM-DD value for certificate-of-occupancy or construction cutoffs (e.g. San Francisco "on or before June 13, 1979" -> co_on_or_before 1979-06-13); use age_under_years with a number for rolling exemptions (e.g. "issued within the previous 15 years" -> age_under_years 15).
- building_type: eq or neq with one of multifamily, condo, single_family, elderly.
- owner_occupied, owner_is_corporation, government_subsidized: eq true or eq false.
- owner_rental_property_count, tenancy_months: numeric ops.
Only encode conditions that decide whether the rule covers a typical rental building. If a condition cannot be expressed with these facts, describe it in words only. Do not encode conditions about the tenant's conduct.

QUOTES: quoted_span and every details[].quoted_span must be copied exactly from the document text, character for character, including punctuation. Pick the sentence that states the operative rule. Never stitch separate sentences with ellipses.

NO-RULE FINDINGS: when the document explicitly establishes that no rule exists at a level (for example a state law barring local rent control, or a statement that the state has no rent control law), record a no_rule_finding with an exact quote.

If the document has no rules in scope, return empty arrays.`;

export const VerifyOutput = z.object({
  verdicts: z.array(
    z.object({
      index: z.number(),
      verdict: z.enum(["support", "partial", "contradict"]),
      corrected_effective_date: z.string().nullable(),
      corrected_lifecycle_kind: z.enum(["enacted", "pending", "failed"]).nullable(),
      corrected_key_value: z.string().nullable(),
      note: z.string(),
    }),
  ),
});

export const VERIFY_SYSTEM = `You are an adversarial legal reviewer. You receive a legal source document and candidate rule records extracted from it. For each record, decide strictly from the document text whether it is supported:
- support: the quoted span exists in substance, and the requirement, key value, category, effective date and lifecycle (enacted / pending / failed) are correct.
- partial: the rule exists but a field is wrong or overstated; give the corrected value when the document states it.
- contradict: the document does not establish this rule, it belongs to another jurisdiction, or it is outside the six categories.
Do not use outside knowledge. A rule restated in a secondary summary is supported only if this document states it. Be brief in notes.`;
