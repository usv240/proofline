"use client";

import { useMemo, useState } from "react";
import { preflight, type Action, type PreflightResult, type RuleWithParams } from "@/lib/engine/preflight";
import type { AddressFacts } from "@/lib/engine/types";
import { InfoButton } from "./InfoButton";
import { VerdictChip, type VerdictKind } from "./Verdict";

type Kind = Action["kind"];
const KINDS: { k: Kind; t: string; d: string }[] = [
  { k: "rent_increase", t: "Rent increase", d: "Is this new rent allowed?" },
  { k: "security_deposit", t: "Security deposit", d: "Is this deposit too high?" },
  { k: "application_fee", t: "Application fee", d: "Is this fee allowed?" },
  { k: "pricing_tool", t: "Pricing software", d: "Can rent-setting software be used here?" },
];
const FROM_CATEGORY: Record<string, Kind> = {
  rent_increase_limits: "rent_increase", security_deposits: "security_deposit",
  application_screening_fees: "application_fee", algorithmic_rent_setting: "pricing_tool",
};

const VERDICT_KIND: Record<string, VerdictKind> = { allowed: "allowed", not_allowed: "blocked", needs_person: "person", info: "none", no_rules: "none" };

export function PreflightForm({ address, rules, initialKind }: { address: AddressFacts; rules: RuleWithParams[]; initialKind?: string }) {
  const [kind, setKind] = useState<Kind>(FROM_CATEGORY[initialKind ?? ""] ?? "rent_increase");
  const [asOf, setAsOf] = useState("2026-10-01");
  const [cur, setCur] = useState("2000");
  const [next, setNext] = useState("2180");
  const [rent, setRent] = useState("2000");
  const [dep, setDep] = useState("3000");
  const [fee, setFee] = useState("60");
  const [tool, setTool] = useState<"yes" | "no" | "not_sure">("yes");
  const [units, setUnits] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [ownerLives, setOwnerLives] = useState("");
  const [result, setResult] = useState<PreflightResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const facts = useMemo<AddressFacts>(() => {
    const f: AddressFacts = { ...address, user: {} };
    if (units && +units > 0) f.units = { min: +units, max: +units, source: "user" };
    if (yearBuilt && +yearBuilt > 1700) f.year_built = +yearBuilt;
    if (ownerLives) f.user = { ...f.user, owner_occupied: ownerLives === "yes" };
    return f;
  }, [address, units, yearBuilt, ownerLives]);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    let a: Action;
    if (kind === "rent_increase") {
      if (!(+cur > 0) || !(+next > 0)) return setErr("Please enter the current rent and the new rent as numbers.");
      a = { kind, current_rent: +cur, new_rent: +next };
    } else if (kind === "security_deposit") {
      if (!(+rent > 0) || !(+dep >= 0)) return setErr("Please enter the monthly rent and the deposit as numbers.");
      a = { kind, monthly_rent: +rent, deposit: +dep };
    } else if (kind === "application_fee") {
      if (!(+fee >= 0)) return setErr("Please enter the fee as a number.");
      a = { kind, fee: +fee };
    } else a = { kind, uses_nonpublic_competitor_data: tool };
    setResult(preflight(rules, facts, asOf, a));
  }

  const input = "h-12 w-full rounded-xl border border-border bg-bg px-3 text-[17px] tabular";
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={run} className="space-y-6" aria-describedby="pf-help">
        <fieldset>
          <legend className="flex items-center text-[18px] font-semibold">1. What change? <InfoButton k="pf.form" /></legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {KINDS.map((x) => (
              <label key={x.k} className={`cursor-pointer rounded-xl border p-3 ${kind === x.k ? "border-brand bg-[var(--sup-bg)]" : "border-border hover:bg-surface"}`}>
                <input type="radio" name="kind" value={x.k} checked={kind === x.k} onChange={() => { setKind(x.k); setResult(null); }} className="sr-only" />
                <span className="block font-medium">{x.t}</span>
                <span className="block text-[14px] text-muted">{x.d}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-[18px] font-semibold">2. Details</legend>
          {kind === "rent_increase" && (
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="text-[15px]">Current monthly rent ($)</span><input inputMode="decimal" className={input} value={cur} onChange={(e) => setCur(e.target.value)} /></label>
              <label className="block"><span className="text-[15px]">New monthly rent ($)</span><input inputMode="decimal" className={input} value={next} onChange={(e) => setNext(e.target.value)} /></label>
            </div>
          )}
          {kind === "security_deposit" && (
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="text-[15px]">Monthly rent ($)</span><input inputMode="decimal" className={input} value={rent} onChange={(e) => setRent(e.target.value)} /></label>
              <label className="block"><span className="text-[15px]">Deposit asked ($)</span><input inputMode="decimal" className={input} value={dep} onChange={(e) => setDep(e.target.value)} /></label>
            </div>
          )}
          {kind === "application_fee" && (
            <label className="block"><span className="text-[15px]">Application or screening fee ($)</span><input inputMode="decimal" className={input} value={fee} onChange={(e) => setFee(e.target.value)} /></label>
          )}
          {kind === "pricing_tool" && (
            <fieldset>
              <legend className="text-[15px]">Does the software use private data from competing landlords (for example their actual rents or occupancy) to set or recommend rents?</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["yes", "no", "not_sure"] as const).map((v) => (
                  <label key={v} className={`cursor-pointer rounded-lg border px-4 py-2 ${tool === v ? "border-brand bg-[var(--sup-bg)]" : "border-border"}`}>
                    <input type="radio" name="tool" className="sr-only" checked={tool === v} onChange={() => setTool(v)} />
                    {v === "not_sure" ? "Not sure" : v === "yes" ? "Yes" : "No"}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <label className="block">
            <span className="flex items-center text-[15px]">Date the change takes effect <InfoButton k="asof" /></span>
            <input type="date" className={input} value={asOf} onChange={(e) => e.target.value && setAsOf(e.target.value)} />
          </label>
        </fieldset>

        <details className="rounded-xl border border-border p-4">
          <summary className="cursor-pointer font-medium">3. Building facts (optional)</summary>
          <p className="mt-2 flex items-center text-[15px] text-muted">Used for this check only, never saved. <InfoButton k="pf.facts" /></p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <label className="block"><span className="text-[15px]">Homes in building</span><input inputMode="numeric" className={input} placeholder={address.units.min ? String(address.units.min) : "unknown"} value={units} onChange={(e) => setUnits(e.target.value)} /></label>
            <label className="block"><span className="text-[15px]">Year first approved</span><input inputMode="numeric" className={input} placeholder={address.year_built ? String(address.year_built) : "unknown"} value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} /></label>
            <label className="block"><span className="text-[15px]">Owner lives there?</span>
              <select className={input} value={ownerLives} onChange={(e) => setOwnerLives(e.target.value)}>
                <option value="">Not sure</option><option value="yes">Yes</option><option value="no">No</option>
              </select>
            </label>
          </div>
        </details>

        {err && <p role="alert" style={{ color: "var(--bad-fg)" }}>{err}</p>}
        <button type="submit" className="h-12 w-full rounded-xl bg-brand text-[17px] font-semibold text-brand-ink">Check this change</button>
        <p id="pf-help" className="text-[14px] text-muted">
          Pre-Flight only says whether a change fits the rules it found. It never suggests ways around a rule. Your inputs are not saved.
        </p>
      </form>

      <section aria-live="polite" aria-label="Result">
        {!result ? (
          <div className="rounded-2xl border border-dashed border-border p-6 text-muted">The result appears here, with the law&apos;s own words for every rule checked.</div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border p-5" style={{ background: `var(--${result.verdict === "not_allowed" ? "bad" : result.verdict === "needs_person" ? "unk" : result.verdict === "allowed" ? "ok" : "none"}-bg)` }}>
              <VerdictChip kind={VERDICT_KIND[result.verdict]} size="lg" />
              <p className="mt-3 text-[18px]">{result.summary}</p>
              <p className="mt-2 text-[14px] text-muted">{result.disclaimer}</p>
            </div>
            {result.lines.map((l) => (
              <article key={l.team_rule_id} className="rounded-xl border border-border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <VerdictChip kind={VERDICT_KIND[l.verdict]} />
                  <span className="text-[14px] text-muted">{l.jurisdiction} · coverage: {l.coverage.replace(/_/g, " ")}</span>
                </div>
                <h3 className="mt-2 font-semibold">{l.title}</h3>
                <p className="mt-1">{l.reason}</p>
                {(l.asked || l.limit) && (
                  <p className="mt-2 text-[15px] tabular">
                    {l.asked && <>You asked: <strong>{l.asked}</strong>. </>}
                    {l.limit && <>Limit here: <strong>{l.limit}</strong>.</>}
                  </p>
                )}
                {l.deciding && (
                  <p className="mt-2 rounded-lg p-2 text-[15px]" style={{ background: "var(--unk-bg)" }}>
                    Missing fact: {l.deciding.question} Add it under Building facts to get a clear answer.
                  </p>
                )}
                <blockquote className="law-quote mt-3">&ldquo;{l.quote}&rdquo;<span className="mt-1 block font-sans text-[13px] text-muted">{l.citation}</span></blockquote>
              </article>
            ))}
            <button type="button" onClick={() => navigator.clipboard?.writeText(`${result.summary}\n${result.lines.map((l) => `- ${l.title} (${l.citation}): ${l.reason}`).join("\n")}\n${result.disclaimer}`)}
              className="h-11 rounded-lg border border-border px-4 hover:bg-surface">
              Copy summary with sources
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
