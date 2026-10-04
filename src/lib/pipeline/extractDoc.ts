// One document through the reading pipeline: model extraction, code quote check, model challenge.
// Shared by the batch script (scripts/extract.ts) and the live Bring Your Own route.
import { findSpan } from "../engine/span";
import { parseStructured } from "./llm";
import { EXTRACT_SYSTEM, ExtractionOutput, VERIFY_SYSTEM, VerifyOutput, type ExtractedRule } from "./prompts";

export interface DocInput {
  doc_id: string;
  jurisdiction: string;
  state: string;
  level: "state" | "city";
  url: string;
  retrieved_at: string | null;
  text: string;
  /** Set only for documents an operator marks as event test documents (npm run new-law). */
  operator_note?: string;
}

export type KeptRule = ExtractedRule & {
  span: { start: number; end: number; match: "exact" | "normalized" };
  challenge: { verdict: string; note: string } | null;
};

export interface DocResult {
  candidates: number;
  rules: KeptRule[];
  no_rule_findings: { jurisdiction: string; category: string; reason: string; citation: string | null; quoted_span: string }[];
  rejected: { title: string; reason: string }[];
  steps: { step: string; ms: number; detail: string }[];
}

export function allowedJurisdictions(d: Pick<DocInput, "level" | "state" | "jurisdiction">) {
  return d.level === "state" ? [d.state] : [d.jurisdiction, d.state];
}

export async function extractDocument(d: DocInput, opts: { effort?: "medium" | "high" } = {}): Promise<DocResult> {
  const steps: DocResult["steps"] = [];
  let t = Date.now();
  const allowed = allowedJurisdictions(d);
  const note = d.operator_note ? `\nOperator note: ${d.operator_note}` : "";
  const header = `DOCUMENT ${d.doc_id}\nSource URL: ${d.url}\nPrimary jurisdiction: ${d.jurisdiction}\nAllowed jurisdictions: ${allowed.join(" | ")}\nRetrieved: ${d.retrieved_at ?? "unknown"}${note}\n\n<document>\n${d.text}\n</document>`;
  const ex = await parseStructured({ schema: ExtractionOutput, system: EXTRACT_SYSTEM, user: header, effort: opts.effort ?? "high" });
  const raw = ex.data ?? { rules: [], no_rule_findings: [] };
  steps.push({ step: "Read the law", ms: Date.now() - t, detail: `${raw.rules.length} candidate rules` });

  t = Date.now();
  const rejected: DocResult["rejected"] = [];
  const kept = raw.rules.flatMap((r) => {
    if (!allowed.includes(r.jurisdiction)) {
      rejected.push({ title: r.title, reason: `jurisdiction ${r.jurisdiction} not allowed for this document` });
      return [];
    }
    const m = findSpan(d.text, r.quoted_span);
    if (!m) {
      rejected.push({ title: r.title, reason: "quoted span not found in source" });
      return [];
    }
    const details = r.details.flatMap((x) => {
      const dm = findSpan(d.text, x.quoted_span);
      return dm ? [{ text: x.text, quoted_span: dm.text }] : [];
    });
    return [{ ...r, quoted_span: m.text, details, span: { start: m.start, end: m.end, match: m.match } }];
  });
  const noRules = raw.no_rule_findings.flatMap((n) => {
    const m = findSpan(d.text, n.quoted_span);
    return m && allowed.includes(n.jurisdiction) ? [{ ...n, quoted_span: m.text }] : [];
  });
  steps.push({ step: "Check every quote against the text", ms: Date.now() - t, detail: `${kept.length} kept, ${rejected.length} rejected` });

  t = Date.now();
  let verdicts: { index: number; verdict: string; note: string; corrected_effective_date: string | null; corrected_lifecycle_kind: string | null; corrected_key_value: string | null }[] = [];
  if (kept.length) {
    const listing = kept
      .map((r, i) => `#${i} [${r.jurisdiction} | ${r.category} | ${r.lifecycle_kind} | effective ${r.effective_date ?? "null"}]\nTitle: ${r.title}\nCitation: ${r.citation}\nRequirement: ${r.requirement}\nKey value: ${r.key_value ?? "null"}\nQuote: "${r.quoted_span}"`)
      .join("\n\n");
    const ver = await parseStructured({
      schema: VerifyOutput,
      system: VERIFY_SYSTEM,
      user: `${note ? `${note.trim()}\n\n` : ""}<document id="${d.doc_id}" jurisdiction="${d.jurisdiction}">\n${d.text}\n</document>\n\nCANDIDATE RECORDS:\n\n${listing}`,
      effort: opts.effort ?? "high",
    });
    verdicts = ver.data?.verdicts ?? [];
  }
  const rules: KeptRule[] = kept.flatMap((r, i) => {
    const v = verdicts.find((x) => x.index === i);
    if (v?.verdict === "contradict") {
      rejected.push({ title: r.title, reason: `second check: ${v.note}` });
      return [];
    }
    return [{
      ...r,
      effective_date: v?.corrected_effective_date ?? r.effective_date,
      lifecycle_kind: (v?.corrected_lifecycle_kind as ExtractedRule["lifecycle_kind"]) ?? r.lifecycle_kind,
      key_value: v?.corrected_key_value ?? r.key_value,
      confidence: v?.verdict === "partial" ? Math.min(r.confidence, 0.7) : r.confidence,
      challenge: v ? { verdict: v.verdict, note: v.note } : null,
    }];
  });
  steps.push({ step: "Second, independent check of each rule", ms: Date.now() - t, detail: `${rules.length} supported` });

  return { candidates: raw.rules.length, rules, no_rule_findings: noRules, rejected, steps };
}
