// Step 3: merge per-document extractions into one rule set, assign IDs, compute status as of the query
// date, and write the official rules.json plus no_rule_findings.json. Deterministic: no model calls.
//   npx tsx scripts/assemble.ts
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { statusAt } from "../src/lib/engine/lookup";
import type { Category, NoRuleFinding, RuleRecord } from "../src/lib/engine/types";
import { audit, sha } from "./lib/audit";

export const AS_OF = "2026-10-01";
const ROOT = process.cwd();
const IN = path.join(ROOT, "out", "pipeline", "extract");
const OUT = path.join(ROOT, "out");

const CITY_CODE: Record<string, string> = {
  "Los Angeles, CA": "LA", "San Francisco, CA": "SF", "San Diego, CA": "SD", "Berkeley, CA": "BK", "Santa Ana, CA": "SA",
  "Jersey City, NJ": "JC", "Hoboken, NJ": "HOB", "Newark, NJ": "NWK", "Boston, MA": "BOS", "Cambridge, MA": "CAM",
  CA: "CA", NJ: "NJ", MA: "MA",
};
const CAT_CODE: Record<Category, string> = {
  rent_increase_limits: "RENT", just_cause_eviction: "EVICT", security_deposits: "DEP",
  application_screening_fees: "FEE", screening_restrictions: "SCREEN", algorithmic_rent_setting: "ALG",
};

// Group key for a citation: its first section-like number ("1947.12", "13.63", "218-12", "40P").
// Lets the same rule cited differently by two sources ("BMC ch. 13.63" vs "Berkeley Municipal Code
// Chapter 13.63") merge into one record.
const normCite = (c: string) => {
  const nums = c.replace(/\b(19|20)\d{2}\b/g, " ").match(/\d+[A-Za-z]?(?:[.:\-]\d+[A-Za-z]?)*/g);
  return nums?.[0]?.toLowerCase() ?? c.toLowerCase().replace(/[^a-z0-9]/g, "");
};

// California Constitution art. IV, sec. 8(c): a non-urgency statute takes effect on January 1 of the
// year after it is enacted. Applied only to chaptered California bills that print no effective date.
function defaultEffectiveDate(r: any, d: DocOut): { date: string; note: string } | null {
  if (r.jurisdiction !== "CA" || r.lifecycle_kind !== "enacted" || r.effective_date || !r.enacted_date) return null;
  if (!/billNavClient|bill_id=/i.test(d.url)) return null;
  const y = Number(String(r.enacted_date).slice(0, 4));
  return y ? { date: `${y + 1}-01-01`, note: "Effective date derived from Cal. Const. art. IV, sec. 8(c): non-urgency statutes take effect January 1 of the following year." } : null;
}

function normDate(d: string | null | undefined): string | null {
  if (!d) return null;
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(d.trim());
  if (!m) return null;
  return [m[1], m[2], m[3]].filter(Boolean).join("-");
}

interface DocOut {
  doc_id: string; jurisdiction: string; url: string; retrieved_at: string | null; kind: RuleRecord["x_source_kind"];
  rules: any[]; no_rule_findings: any[]; rejected: any[]; candidates: number;
}

export function assemble() {
  const docs: DocOut[] = readdirSync(IN).filter((f) => f.endsWith(".json")).sort()
    .map((f) => JSON.parse(readFileSync(path.join(IN, f), "utf8")));

  type Cand = { r: any; d: DocOut };
  const groups = new Map<string, Cand[]>();
  const clustersFile = path.join(ROOT, "out", "pipeline", "clusters.json");
  const clusterOf = new Map<string, string>();
  if (existsSync(clustersFile)) {
    const cl = JSON.parse(readFileSync(clustersFile, "utf8"));
    for (const [cell, v] of Object.entries<any>(cl.cells)) v.groups.forEach((g: string[]) => g.forEach((id) => clusterOf.set(id, `${cell}|c:${g[0]}`)));
  }
  for (const d of docs) d.rules.forEach((r: any, i: number) => {
    const dflt = defaultEffectiveDate(r, d);
    if (dflt) {
      r.effective_date = dflt.date;
      r.details = [...(r.details ?? []), { text: dflt.note, quoted_span: r.quoted_span }];
    }
    const key = clusterOf.get(`${d.doc_id}#${i}`) ?? `${r.jurisdiction}|${r.category}|${normCite(r.citation)}`;
    groups.set(key, [...(groups.get(key) ?? []), { r, d }]);
  });

  const rank = (c: Cand) =>
    (c.d.kind === "official_corpus" ? 2 : 0) + (c.r.challenge?.verdict === "support" ? 1 : 0) + (c.r.confidence ?? 0) +
    (c.r.span?.match === "exact" ? 0.1 : 0);

  const merged: Omit<RuleRecord, "team_rule_id">[] = [];
  for (const cands of groups.values()) {
    cands.sort((a, b) => rank(b) - rank(a));
    const { r, d } = cands[0];
    const details = new Map<string, { text: string; quoted_span: string }>();
    for (const c of cands) for (const x of c.r.details ?? []) details.set(x.quoted_span, x);
    // Status evidence: a source showing enactment (or failure) outranks an earlier draft marked pending.
    const lifeSrc =
      cands.find((c) => c.r.lifecycle_kind === "failed") ??
      cands.filter((c) => c.r.lifecycle_kind === "enacted").sort((a, b) => (b.r.effective_date ? 1 : 0) - (a.r.effective_date ? 1 : 0))[0] ??
      cands[0];
    if (lifeSrc !== cands[0]) {
      details.set(lifeSrc.r.quoted_span, {
        text: `Status and dates from ${lifeSrc.d.doc_id} (${lifeSrc.d.kind === "official_corpus" ? "official pack" : "fetched link-only source"}): ${lifeSrc.r.lifecycle_kind}${lifeSrc.r.effective_date ? `, effective ${lifeSrc.r.effective_date}` : ""}.`,
        quoted_span: lifeSrc.r.quoted_span,
      });
    }
    const lifecycle = {
      kind: lifeSrc.r.lifecycle_kind,
      enacted_date: normDate(lifeSrc.r.enacted_date ?? r.enacted_date),
      effective_date: normDate(lifeSrc.r.effective_date ?? r.effective_date),
      ended_date: normDate(lifeSrc.r.ended_date ?? r.ended_date),
    } as RuleRecord["x_lifecycle"];
    // Conflicting published effective dates are surfaced, not silently resolved.
    const dates = [...new Set(cands.map((c) => normDate(c.r.effective_date)).filter(Boolean))];
    const dateConflict = lifecycle.kind === "enacted" && dates.length > 1
      ? `Sources publish different effective dates: ${cands.filter((c) => c.r.effective_date).map((c) => `${normDate(c.r.effective_date)} (${c.d.doc_id})`).join(", ")}. Using ${lifecycle.effective_date}. Human review needed.`
      : null;
    const rec: Omit<RuleRecord, "team_rule_id"> = {
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
      interaction: r.yields_to_local
        ? "Yields to a stricter local rule on the same topic where that rule covers the unit."
        : r.may_conflict_with_local
          ? "May preempt or conflict with local rules on the same topic; flagged for human review."
          : null,
      effective_date: lifecycle.effective_date,
      citation: r.citation,
      source_doc_id: d.doc_id,
      source_url: d.url,
      quoted_span: r.quoted_span,
      confidence: r.confidence ?? null,
      conflict_flag: !!dateConflict,
      conflict_note: dateConflict,
      x_lifecycle: lifecycle,
      x_coverage: { all: r.coverage.all, exempt_if_any: r.coverage.exempt_if_any.map((g: any) => g.conds) },
      x_yields_to_local: !!r.yields_to_local,
      // A state law that defers to local rules does not conflict with them; deference wins.
      x_may_conflict_with_local: !!r.may_conflict_with_local && !r.yields_to_local,
      x_details: [...details.values()],
      x_plain: r.plain_language,
      x_retrieved_at: d.retrieved_at,
      x_source_kind: d.kind,
      x_span: r.span ?? null,
      x_challenge: r.challenge ?? null,
    };
    rec.status = statusAt(rec as RuleRecord, AS_OF);
    merged.push(rec);
  }

  // Stable IDs: <PLACE>-<CATEGORY>-<nn>, pending or failed measures use -P<n>.
  merged.sort((a, b) => (a.jurisdiction + a.category + a.citation).localeCompare(b.jurisdiction + b.category + b.citation));
  const counters = new Map<string, number>();
  const rules: RuleRecord[] = merged.map((m) => {
    const p = m.x_lifecycle.kind !== "enacted";
    const base = `${CITY_CODE[m.jurisdiction] ?? m.jurisdiction}-${CAT_CODE[m.category]}-${p ? "P" : ""}`;
    const n = (counters.get(base) ?? 0) + 1;
    counters.set(base, n);
    return { team_rule_id: `${base}${p ? n : String(n).padStart(2, "0")}`, ...m };
  });

  // Rules that a state law may conflict with get the flag at the record level too.
  for (const s of rules.filter((r) => r.level === "state" && r.x_may_conflict_with_local)) {
    const locals = rules.filter((r) => r.level === "city" && r.category === s.category && r.jurisdiction.endsWith(`, ${s.jurisdiction}`) && r.x_lifecycle.kind === "enacted");
    if (!locals.length) continue;
    s.conflict_flag = true;
    s.overrides = locals.map((l) => l.team_rule_id);
    s.conflict_note = `May conflict with or preempt: ${locals.map((l) => `${l.team_rule_id} (${l.jurisdiction})`).join(", ")}. Human review needed.`;
    for (const l of locals) {
      l.conflict_flag = true;
      l.conflict_note = `A state law on the same topic (${s.team_rule_id}, ${s.citation}) may conflict with or preempt this rule once in force. Human review needed.`;
      l.overrides = [...new Set([...l.overrides, s.team_rule_id])];
    }
  }
  for (const s of rules.filter((r) => r.level === "state" && r.x_yields_to_local)) {
    const locals = rules.filter((r) => r.level === "city" && r.category === s.category && r.jurisdiction.endsWith(`, ${s.jurisdiction}`) && r.x_lifecycle.kind === "enacted");
    s.overrides = [...new Set([...s.overrides, ...locals.map((l) => l.team_rule_id)])];
  }

  const seenNoRule = new Set<string>();
  const noRules: NoRuleFinding[] = [];
  for (const d of docs) for (const n of d.no_rule_findings) {
    const key = `${n.jurisdiction}|${n.category}`;
    if (seenNoRule.has(key)) continue;
    seenNoRule.add(key);
    // A source may say "no rent cap" while a softer enacted rule exists in the same category (for example
    // New Jersey's unconscionability standard). Keep both, and say so.
    const enacted = rules.filter((r) => r.jurisdiction === n.jurisdiction && r.category === n.category && r.x_lifecycle.kind === "enacted");
    noRules.push({
      jurisdiction: n.jurisdiction, level: n.jurisdiction.includes(",") ? "city" : "state", category: n.category,
      reason: enacted.length
        ? `${n.reason} Qualified: related enacted rules exist at this level: ${enacted.map((r) => `${r.team_rule_id} (${r.citation}): ${r.key_value ?? r.title}`).join("; ")}.`
        : n.reason,
      citation: n.citation, source_doc_id: d.doc_id, quoted_span: n.quoted_span,
      qualified_by: enacted.map((r) => r.team_rule_id),
    });
  }

  // Every place and category with no enacted rule gets an explicit finding, so "no rule" is an answer
  // the system states (with what it found instead), never a silent gap.
  const PLACES = Object.keys(CITY_CODE);
  for (const j of PLACES) for (const cat of Object.keys(CAT_CODE) as Category[]) {
    if (rules.some((r) => r.jurisdiction === j && r.category === cat && r.x_lifecycle.kind === "enacted")) continue;
    if (noRules.some((n) => n.jurisdiction === j && n.category === cat)) continue;
    const proposals = rules.filter((r) => r.jurisdiction === j && r.category === cat);
    noRules.push({
      jurisdiction: j,
      level: j.includes(",") ? "city" : "state",
      category: cat,
      reason: proposals.length
        ? `No enacted rule at this level. Proposals only: ${proposals.map((p) => `${p.team_rule_id} ${p.citation} (${p.x_lifecycle.kind})`).join("; ")}.`
        : `No rule at this level was found in the ${docs.filter((d) => d.jurisdiction === j).length} source documents for ${j}. ${j.includes(",") ? "State law applies." : "Local rules, if any, apply."}`,
      citation: null,
      source_doc_id: null,
      quoted_span: null,
    });
  }

  mkdirSync(OUT, { recursive: true });
  writeFileSync(path.join(OUT, "rules.json"), JSON.stringify({ rules }, null, 2));
  writeFileSync(path.join(OUT, "no_rule_findings.json"), JSON.stringify({ as_of: AS_OF, findings: noRules }, null, 2));

  const rejected = docs.flatMap((d) => d.rejected.map((x: any) => ({ doc_id: d.doc_id, ...x })));
  writeFileSync(path.join(OUT, "pipeline", "rejected.json"), JSON.stringify(rejected, null, 2));
  audit("assemble", { docs: docs.map((d) => d.doc_id) }, { rules: rules.length, no_rule: noRules.length, rules_sha: sha(JSON.stringify(rules)) });
  console.log(`rules=${rules.length} candidates=${docs.reduce((a, d) => a + d.candidates, 0)} rejected=${rejected.length} no_rule_findings=${noRules.length}`);
  return rules;
}

assemble();
