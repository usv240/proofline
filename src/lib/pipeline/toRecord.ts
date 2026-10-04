// Turns extracted rules into engine RuleRecords (used for new documents: Bring Your Own and Law Watch).
import { statusAt } from "../engine/lookup";
import type { RuleRecord } from "../engine/types";
import type { KeptRule } from "./extractDoc";

function normDate(d: string | null | undefined): string | null {
  if (!d) return null;
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(d.trim());
  return m ? [m[1], m[2], m[3]].filter(Boolean).join("-") : null;
}

export function toRuleRecords(
  rules: KeptRule[],
  src: { doc_id: string; url: string; retrieved_at: string | null; kind: RuleRecord["x_source_kind"] },
  idPrefix: string,
  asOf = "2026-10-01",
): RuleRecord[] {
  return rules.map((r, i) => {
    const lifecycle = {
      kind: r.lifecycle_kind,
      enacted_date: normDate(r.enacted_date),
      effective_date: normDate(r.effective_date),
      ended_date: normDate(r.ended_date),
    } as RuleRecord["x_lifecycle"];
    const rec: RuleRecord = {
      team_rule_id: `${idPrefix}-${String(i + 1).padStart(2, "0")}`,
      jurisdiction: r.jurisdiction,
      level: r.jurisdiction.includes(",") ? "city" : "state",
      category: r.category,
      status: "in_force",
      title: r.title,
      requirement: r.requirement,
      key_value: r.key_value ?? null,
      coverage_conditions: r.coverage_conditions ?? null,
      exemptions: r.exemptions ?? null,
      overrides: [],
      interaction: null,
      effective_date: lifecycle.effective_date,
      citation: r.citation,
      source_doc_id: src.doc_id,
      source_url: src.url,
      quoted_span: r.quoted_span,
      confidence: r.confidence ?? null,
      conflict_flag: false,
      conflict_note: null,
      x_lifecycle: lifecycle,
      x_coverage: { all: r.coverage.all, exempt_if_any: r.coverage.exempt_if_any.map((g) => g.conds) },
      x_yields_to_local: !!r.yields_to_local,
      x_may_conflict_with_local: !!r.may_conflict_with_local && !r.yields_to_local,
      x_details: r.details,
      x_plain: r.plain_language,
      x_retrieved_at: src.retrieved_at,
      x_source_kind: src.kind,
      x_span: r.span,
      x_challenge: r.challenge as RuleRecord["x_challenge"],
    };
    rec.status = statusAt(rec, asOf);
    return rec;
  });
}
