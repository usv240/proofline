// Rent Pre-Flight: checks a proposed change against every rule for the address on a date.
// Answers only allowed, not allowed, or needs a person. It never suggests ways around a rule.
import { lookupAddress } from "./lookup";
import type { AddressFacts, DecidingFact, RuleRecord } from "./types";

export interface CheckParams {
  check: "rent_increase" | "deposit" | "fee" | "pricing_tool" | "none";
  rent: { fixed_percent: number | null; period_from: string | null; period_to: string | null; floor_percent: number | null; max_percent: number | null; formula: string | null } | null;
  deposit: { max_months: number | null; exception_months: number | null; exception: string | null } | null;
  fee: { prohibited: boolean; max_usd: number | null; max_note: string | null } | null;
  pricing_tool: { bans_nonpublic_competitor_data: boolean; bans_all_rent_setting_software: boolean } | null;
  quote: string;
}
export type RuleWithParams = RuleRecord & { x_params?: CheckParams | null };

export type Action =
  | { kind: "rent_increase"; current_rent: number; new_rent: number }
  | { kind: "security_deposit"; monthly_rent: number; deposit: number }
  | { kind: "application_fee"; fee: number }
  | { kind: "pricing_tool"; uses_nonpublic_competitor_data: "yes" | "no" | "not_sure" };

export type Verdict = "allowed" | "not_allowed" | "needs_person" | "info";

export interface CheckLine {
  team_rule_id: string;
  title: string;
  jurisdiction: string;
  coverage: string;
  verdict: Verdict;
  reason: string;
  asked?: string;
  limit?: string;
  quote: string;
  citation: string;
  source_url: string;
  deciding?: DecidingFact | null;
}

export interface PreflightResult {
  verdict: "allowed" | "not_allowed" | "needs_person" | "no_rules";
  summary: string;
  lines: CheckLine[];
  rules_checked: string[];
  as_of: string;
  disclaimer: string;
}

const CHECK_FOR: Record<Action["kind"], CheckParams["check"]> = {
  rent_increase: "rent_increase",
  security_deposit: "deposit",
  application_fee: "fee",
  pricing_tool: "pricing_tool",
};
const CAT_FOR: Record<Action["kind"], string> = {
  rent_increase: "rent_increase_limits",
  security_deposit: "security_deposits",
  application_fee: "application_screening_fees",
  pricing_tool: "algorithmic_rent_setting",
};

const pct = (n: number) => `${Math.round(n * 100) / 100}%`;
const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

function inPeriod(p: NonNullable<CheckParams["rent"]>, asOf: string) {
  return (!p.period_from || asOf >= p.period_from) && (!p.period_to || asOf <= p.period_to);
}

function judge(a: Action, p: CheckParams, asOf: string): { verdict: Verdict; reason: string; asked?: string; limit?: string } {
  if (a.kind === "rent_increase" && p.rent) {
    const inc = ((a.new_rent - a.current_rent) / a.current_rent) * 100;
    const asked = pct(inc);
    if (inc <= 0) return { verdict: "allowed", reason: "This is not an increase.", asked };
    const r = p.rent;
    if (r.fixed_percent !== null && inPeriod(r, asOf)) {
      const limit = `${pct(r.fixed_percent)}${r.period_from ? ` (${r.period_from} to ${r.period_to ?? "later"})` : ""}`;
      return inc <= r.fixed_percent + 1e-9
        ? { verdict: "allowed", reason: `Within the allowed increase of ${pct(r.fixed_percent)}.`, asked, limit }
        : { verdict: "not_allowed", reason: `Above the allowed increase of ${pct(r.fixed_percent)} for this period.`, asked, limit };
    }
    const floor = r.floor_percent;
    const max = r.max_percent;
    const limit = r.formula ?? (max !== null ? `up to ${pct(max)}` : "formula");
    if (max !== null && inc > max + 1e-9) return { verdict: "not_allowed", reason: `Above the highest the cap can ever be (${pct(max)}).`, asked, limit };
    if (floor !== null && inc <= floor + 1e-9) return { verdict: "allowed", reason: `Below the lowest the cap can be (${pct(floor)}), whatever the price index.`, asked, limit };
    return { verdict: "needs_person", reason: `Depends on the official price index (CPI) figure for this period and region: ${limit}.`, asked, limit };
  }
  if (a.kind === "security_deposit" && p.deposit) {
    const months = a.deposit / a.monthly_rent;
    const asked = `${Math.round(months * 100) / 100} months' rent (${usd(a.deposit)})`;
    const d = p.deposit;
    if (d.max_months === null) return { verdict: "needs_person", reason: "The rule sets no number we could compare.", asked };
    const limit = `${d.max_months} month${d.max_months === 1 ? "" : "s"}' rent${d.exception_months ? ` (${d.exception_months} under an exception)` : ""}`;
    if (months <= d.max_months + 1e-9) return { verdict: "allowed", reason: `Within the limit of ${limit}.`, asked, limit };
    if (d.exception_months !== null && months <= d.exception_months + 1e-9) {
      return { verdict: "needs_person", reason: `Above the usual limit, but allowed only if this exception applies: ${d.exception ?? "see the rule"}.`, asked, limit };
    }
    return { verdict: "not_allowed", reason: `Above the limit of ${limit}.`, asked, limit };
  }
  if (a.kind === "application_fee" && p.fee) {
    const asked = usd(a.fee);
    if (p.fee.prohibited) return a.fee > 0 ? { verdict: "not_allowed", reason: "Application or screening fees are not allowed here.", asked, limit: "$0" } : { verdict: "allowed", reason: "No fee charged.", asked };
    if (p.fee.max_usd === null) return { verdict: "needs_person", reason: `No official dollar figure in our sources. ${p.fee.max_note ?? ""}`.trim(), asked };
    const limit = usd(p.fee.max_usd);
    return a.fee <= p.fee.max_usd + 1e-9
      ? { verdict: "allowed", reason: `Within the cap of ${limit}.${p.fee.max_note ? ` ${p.fee.max_note}` : ""}`, asked, limit }
      : { verdict: "not_allowed", reason: `Above the cap of ${limit}.`, asked, limit };
  }
  if (a.kind === "pricing_tool" && p.pricing_tool) {
    const t = p.pricing_tool;
    if (t.bans_all_rent_setting_software) return { verdict: "not_allowed", reason: "This rule bans rent-setting software of this kind." };
    if (!t.bans_nonpublic_competitor_data) return { verdict: "allowed", reason: "This rule does not ban this use." };
    if (a.uses_nonpublic_competitor_data === "yes") return { verdict: "not_allowed", reason: "This rule bans software that uses private data from competing landlords to set or recommend rents." };
    if (a.uses_nonpublic_competitor_data === "no") return { verdict: "allowed", reason: "The ban covers software that uses private competitor data. You said this tool does not." };
    return { verdict: "needs_person", reason: "Depends on whether the software uses private data from competing landlords." };
  }
  return { verdict: "needs_person", reason: "This rule has no number we could compare for this kind of change." };
}

export function preflight(rules: RuleWithParams[], f: AddressFacts, asOf: string, a: Action): PreflightResult {
  const results = lookupAddress(rules, f, asOf);
  const lines: CheckLine[] = [];
  for (const r of results) {
    const rule = rules.find((x) => x.team_rule_id === r.team_rule_id)!;
    if (rule.category !== CAT_FOR[a.kind]) continue;
    const p = rule.x_params;
    const base = { team_rule_id: rule.team_rule_id, title: rule.title, jurisdiction: rule.jurisdiction, coverage: r.result, quote: p?.quote ?? rule.quoted_span, citation: rule.citation, source_url: rule.source_url };
    if (r.result === "superseded") {
      lines.push({ ...base, verdict: "info", reason: "A local rule on this topic governs this building instead." });
      continue;
    }
    if (r.result === "pending" || r.result === "not_yet_effective") {
      const j = p && p.check === CHECK_FOR[a.kind] ? judge(a, p, asOf) : null;
      lines.push({ ...base, verdict: "info", reason: `${r.result === "pending" ? "Proposed, not law." : `Starts ${rule.x_lifecycle.effective_date}.`}${j ? ` If it were in force: ${j.verdict.replace("_", " ")}.` : ""}`, asked: j?.asked, limit: j?.limit });
      continue;
    }
    if (!p || p.check !== CHECK_FOR[a.kind]) {
      lines.push({ ...base, verdict: "info", reason: "This rule covers the building but sets no limit this check can compare." });
      continue;
    }
    const j = judge(a, p, asOf);
    if (r.result === "unknown") {
      // Only ask for a missing fact when it would change the answer.
      if (j.verdict === "allowed") lines.push({ ...base, ...j, reason: `${j.reason} This holds whether or not the rule covers this building.` });
      else lines.push({ ...base, ...j, verdict: "needs_person", reason: `If this rule covers the building: ${j.reason}`, deciding: r.deciding });
    } else lines.push({ ...base, ...j });
  }

  const decisive = lines.filter((l) => l.verdict !== "info");
  const verdict: PreflightResult["verdict"] = !decisive.length
    ? "no_rules"
    : decisive.some((l) => l.verdict === "not_allowed")
      ? "not_allowed"
      : decisive.some((l) => l.verdict === "needs_person")
        ? "needs_person"
        : "allowed";
  const where = `${f.street_address}, ${f.city}, ${f.state}`;
  const summary = {
    allowed: `Allowed under every rule we found for ${where} on ${asOf}.`,
    not_allowed: `Not allowed: at least one rule for ${where} forbids this on ${asOf}.`,
    needs_person: `Needs a person: the answer depends on a fact or figure we do not have.`,
    no_rules: `No rule in this project limits this kind of change at ${where} on ${asOf}.`,
  }[verdict];
  return { verdict, summary, lines, rules_checked: lines.map((l) => l.team_rule_id), as_of: asOf, disclaimer: "Based on the rules in this project only. Not legal advice." };
}
