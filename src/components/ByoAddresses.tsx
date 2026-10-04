"use client";

import { useState } from "react";
import { buildFacts } from "@/lib/engine/facts";
import { lookupAddress } from "@/lib/engine/lookup";
import type { RuleRecord } from "@/lib/engine/types";
import { CATEGORY_LABEL, CATEGORY_ORDER } from "./Verdict";

const SAMPLE = `street,city,state,year_built,units
100 Main St,San Francisco,CA,1950,12
200 Ocean Ave,San Francisco,CA,2018,40
300 Broadway,Jersey City,NJ,,8
400 Mass Ave,Cambridge,MA,1920,6`;

const CITIES = ["Los Angeles", "San Francisco", "San Diego", "Berkeley", "Santa Ana", "Jersey City", "Hoboken", "Newark", "Boston", "Cambridge", "Bayonne"];

function parse(text: string) {
  const lines = text.trim().replace(/\r/g, "").split("\n").filter(Boolean);
  const head = lines[0].split(",").map((h) => h.trim().toLowerCase());
  return lines.slice(1, 201).map((l) => {
    const c = l.split(",").map((x) => x.trim());
    return Object.fromEntries(head.map((h, i) => [h, c[i] ?? ""]));
  });
}

export function ByoAddresses({ rules }: { rules: RuleRecord[] }) {
  const [text, setText] = useState(SAMPLE);
  const [asOf, setAsOf] = useState("2026-10-01");
  const [rows, setRows] = useState<{ street: string; city: string; state: string; err?: string; byCat: Record<string, string[]> }[] | null>(null);

  function run() {
    const out = parse(text).map((r, i) => {
      const state = (r.state || "").toUpperCase();
      const city = CITIES.find((c) => c.toLowerCase() === (r.city || "").toLowerCase());
      if (!["CA", "NJ", "MA"].includes(state)) return { street: r.street, city: r.city, state, err: "State must be CA, NJ or MA", byCat: {} };
      const f = buildFacts({
        address_id: `U${i + 1}`, street_address: r.street, postal_city: r.city, state, zip: "", year_built: r.year_built ?? "", units: r.units ?? "",
        use_code: "", use_description: "", legal_city: city ?? r.city, resolution_method: "user_supplied_city", resolution_confidence: "0.8",
      });
      const res = lookupAddress(rules, f, asOf);
      const byCat: Record<string, string[]> = {};
      for (const x of res) {
        const rule = rules.find((y) => y.team_rule_id === x.team_rule_id)!;
        (byCat[rule.category] ??= []).push(`${x.result}: ${rule.title}`);
      }
      return { street: r.street, city: city ?? `${r.city} (not one of our 9 cities: state rules only)`, state, byCat };
    });
    setRows(out);
  }

  function download() {
    if (!rows) return;
    const head = ["street", "city", "state", ...CATEGORY_ORDER];
    const csv = [head.join(","), ...rows.map((r) => [r.street, r.city, r.state, ...CATEGORY_ORDER.map((c) => `"${(r.byCat[c] ?? []).join("; ").replace(/"/g, "'")}"`)].join(","))].join("\n");
    const u = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = u; a.download = `proofline-results-${asOf}.csv`; a.click(); URL.revokeObjectURL(u);
  }

  return (
    <div className="space-y-4">
      <p className="text-muted">Paste CSV with columns <code>street, city, state</code> and, if you know them, <code>year_built, units</code>. Up to 200 rows. Nothing is uploaded: the check runs in your browser.</p>
      <label className="block">
        <span className="font-medium">Your addresses (CSV)</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} className="mt-1 w-full rounded-xl border border-border bg-bg p-3 font-mono text-[14px]" />
      </label>
      <div className="flex flex-wrap items-end gap-3">
        <label className="block"><span className="text-[15px]">As of</span>
          <input type="date" value={asOf} onChange={(e) => e.target.value && setAsOf(e.target.value)} className="mt-1 block h-11 rounded-lg border border-border bg-bg px-3" />
        </label>
        <label className="inline-flex h-11 cursor-pointer items-center rounded-lg border border-border px-4 hover:bg-surface">
          Load a CSV file
          <input type="file" accept=".csv,text/csv" className="sr-only" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setText(await f.text()); }} />
        </label>
        <button type="button" onClick={run} className="h-11 rounded-lg bg-brand px-5 font-medium text-brand-ink">Check all</button>
        {rows && <button type="button" onClick={download} className="h-11 rounded-lg border border-border px-4">Download results (CSV)</button>}
      </div>
      {rows && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-surface text-muted"><tr><th className="p-2">Address</th>{CATEGORY_ORDER.map((c) => <th key={c} className="p-2">{CATEGORY_LABEL[c]}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border align-top">
                  <td className="p-2"><span className="font-medium">{r.street}</span><span className="block text-muted">{r.city}, {r.state}</span>{r.err && <span className="block" style={{ color: "var(--bad-fg)" }}>{r.err}</span>}</td>
                  {CATEGORY_ORDER.map((c) => <td key={c} className="p-2">{(r.byCat[c] ?? []).map((x, j) => <span key={j} className="block">{x}</span>)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
