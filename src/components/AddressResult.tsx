"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { decidingFactForAddress, lookupAddress } from "@/lib/engine/lookup";
import type { AddressFacts, NoRuleFinding, RuleRecord } from "@/lib/engine/types";
import { InfoButton } from "./InfoButton";
import { RuleCard } from "./RuleCard";
import { CATEGORY_LABEL, CATEGORY_ORDER, VerdictChip, type VerdictKind } from "./Verdict";

const QUICK_DATES = [
  { d: "2025-12-31", label: "Dec 31, 2025" },
  { d: "2026-10-01", label: "Oct 1, 2026 (default)" },
  { d: "2027-07-02", label: "Jul 2, 2027" },
];

export function unitsText(a: AddressFacts) {
  const u = a.units;
  if (u.min === null && u.max === null) return "Not in public records";
  const n = u.min === u.max ? `${u.min}` : u.max === null ? `${u.min} or more` : `${u.min} to ${u.max}`;
  const src = { assessor: "assessor record", description: "property description", use_band: "official use band", user: "you", missing: "" }[u.source];
  return `${n} (from ${src})`;
}

export function AddressResult({ address, rules, noRule, initialAsOf }: { address: AddressFacts; rules: RuleRecord[]; noRule: NoRuleFinding[]; initialAsOf: string }) {
  const [asOf, setAsOf] = useState(initialAsOf);
  const results = useMemo(() => lookupAddress(rules, address, asOf), [rules, address, asOf]);
  const deciding = useMemo(() => decidingFactForAddress(rules, address, asOf, results), [rules, address, asOf, results]);
  const byId = useMemo(() => new Map(rules.map((r) => [r.team_rule_id, r])), [rules]);
  const counts = results.reduce<Record<string, number>>((m, r) => ((m[r.result] = (m[r.result] ?? 0) + 1), m), {});
  const unknownCount = counts.unknown ?? 0;

  return (
    <div className="space-y-8">
      <section aria-labelledby="addr-h" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <p className="text-[14px] text-muted">Address {address.address_id}</p>
        <h1 id="addr-h" className="text-[28px] font-semibold leading-tight sm:text-[36px]">{address.street_address}</h1>
        <p className="mt-1 text-[17px]">
          Legal city: <strong>{address.city}, {address.state}</strong>
          {address.postal_city !== address.city && <span className="text-muted"> (mailing city: {address.postal_city})</span>}
          <InfoButton k="address" />
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[15px]">
          <span className="flex items-center text-muted">Layers of law <InfoButton k="stack" /></span>
          <span className="rounded-md border border-border bg-bg px-2 py-1">State: {address.state}</span>
          <span aria-hidden className="text-muted">then</span>
          <span className="rounded-md border border-border bg-bg px-2 py-1">City: {address.city}</span>
        </div>
        <dl className="mt-4 grid gap-x-6 gap-y-1 text-[15px] sm:grid-cols-[auto_1fr]">
          <dt className="text-muted">Year built</dt>
          <dd>{address.year_built ?? <span className="inline-flex items-center">Not in public records <InfoButton k="missing" /></span>}</dd>
          <dt className="flex items-center text-muted">Homes in building <InfoButton k="units" /></dt>
          <dd>{unitsText(address)}</dd>
          <dt className="text-muted">Property type</dt>
          <dd>{address.use_description || "not stated"}</dd>
          <dt className="text-muted">City found by</dt>
          <dd>{address.resolution_method === "census_geocoder" ? "US Census Geocoder" : "mailing city (the geocoder could not match this address)"}</dd>
        </dl>
      </section>

      <section aria-label="Date" className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div>
          <label htmlFor="asof" className="flex items-center text-[15px] font-medium">As of <InfoButton k="asof" /></label>
          <input id="asof" type="date" value={asOf} onChange={(e) => e.target.value && setAsOf(e.target.value)} className="h-11 rounded-lg border border-border bg-bg px-3" />
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_DATES.map((q) => (
            <button key={q.d} type="button" aria-pressed={asOf === q.d} onClick={() => setAsOf(q.d)}
              className={`h-11 rounded-lg border px-3 text-[15px] ${asOf === q.d ? "border-brand bg-[var(--sup-bg)]" : "border-border hover:bg-surface"}`}>
              {q.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="sum-h" className="rounded-2xl border border-border p-5">
        <h2 id="sum-h" className="text-[22px] font-semibold">Summary as of {asOf}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {(["applies", "unknown", "superseded", "not_yet_effective", "pending"] as VerdictKind[]).filter((k) => counts[k]).map((k) => (
            <li key={k} className="flex items-center gap-1"><VerdictChip kind={k} /><span className="tabular text-[15px]">x {counts[k]}</span></li>
          ))}
        </ul>
        {deciding && unknownCount > 0 && (
          <div className="mt-4 rounded-xl p-4" style={{ background: "var(--unk-bg)", color: "var(--unk-fg)" }}>
            <p className="flex items-center font-semibold">One fact would settle most &ldquo;Not sure yet&rdquo; answers here <InfoButton k="settle" /></p>
            <p className="mt-1 text-text">{deciding.question}</p>
            <p className="mt-1 text-[15px] text-text">How to find out: {deciding.how_to_find}</p>
            <p className="mt-2 text-[15px] text-text">
              Know it already? <Link className="underline underline-offset-2" href={`/preflight?address=${address.address_id}`}>Add it in Pre-Flight</Link> to get a clear answer.
            </p>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2 no-print">
          <Link href={`/preflight?address=${address.address_id}`} className="inline-flex h-11 items-center rounded-lg bg-brand px-4 font-medium text-brand-ink">Check a rent change</Link>
          <Link href={`/card/${address.address_id}`} className="inline-flex h-11 items-center rounded-lg border border-border px-4 hover:bg-surface">Get a Rights Card</Link>
        </div>
      </section>

      {CATEGORY_ORDER.map((cat) => {
        const items = results.filter((r) => byId.get(r.team_rule_id)?.category === cat);
        const none = noRule.filter((n) => n.category === cat);
        return (
          <section key={cat} aria-labelledby={`h-${cat}`}>
            <h2 id={`h-${cat}`} className="flex items-center text-[22px] font-semibold">
              {CATEGORY_LABEL[cat]} <InfoButton k={`cat.${cat}` as never} />
            </h2>
            <div className="mt-3 space-y-3">
              {items
                .sort((a, b) => order(a.result) - order(b.result))
                .map((r) => <RuleCard key={r.team_rule_id} rule={byId.get(r.team_rule_id)!} result={r} addressId={address.address_id} />)}
              {none.map((n) => (
                <div key={`${n.jurisdiction}-${n.category}`} className="rounded-xl border border-dashed border-border p-4">
                  <div className="flex items-center gap-2"><VerdictChip kind="none" /><InfoButton k="v.none" /><span className="text-[14px] text-muted">{n.level === "state" ? `State: ${n.jurisdiction}` : `City: ${n.jurisdiction}`}</span></div>
                  <p className="mt-2 text-[15px]">{n.reason}</p>
                  {n.quoted_span && <blockquote className="law-quote mt-2">&ldquo;{n.quoted_span}&rdquo;{n.citation ? <span className="mt-1 block font-sans text-[13px] text-muted">{n.citation} ({n.source_doc_id})</span> : null}</blockquote>}
                </div>
              ))}
              {!items.length && !none.length && <p className="text-muted">No rule in this category covers this building on {asOf}.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function order(r: string) {
  return ["applies", "unknown", "superseded", "not_yet_effective", "pending"].indexOf(r);
}
