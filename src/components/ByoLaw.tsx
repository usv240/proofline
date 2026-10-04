"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EXAMPLE_ORDINANCE } from "@/content/exampleOrdinance";
import type { RuleRecord } from "@/lib/engine/types";
import { InfoButton } from "./InfoButton";
import { ReviewBox } from "./ReviewBox";
import { ProofPanelStatic } from "./ProofPanelStatic";
import { VerdictChip, type VerdictKind, CATEGORY_LABEL } from "./Verdict";

interface ByoResult {
  doc_id: string;
  steps: { step: string; ms: number; detail: string }[];
  rules: RuleRecord[];
  rejected: { title: string; reason: string }[];
  dates: string[];
  affected: { address_id: string; street: string; city: string; date: string; rule: string; result: string }[];
  affected_count: number;
  ms: number;
  disclaimer: string;
}

const STEPS = ["Read the law", "Check every quote against the text", "Second, independent check of each rule", "Test every sample home"];

export function ByoLaw({ places }: { places: string[] }) {
  const [text, setText] = useState("");
  const [place, setPlace] = useState("Cambridge, MA");
  const [busy, setBusy] = useState(false);
  const [tick, setTick] = useState(0);
  const [res, setRes] = useState<ByoResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!busy) return;
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [busy]);

  async function run() {
    setBusy(true); setTick(0); setErr(null); setRes(null);
    try {
      const r = await fetch("/api/byo/ordinance", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text, place }) });
      const j = await r.json();
      if (!r.ok) setErr(j.message ?? "Something went wrong.");
      else setRes(j);
    } catch {
      setErr("The request did not finish. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const byAddr = res ? [...new Map(res.affected.map((a) => [`${a.address_id}|${a.date}|${a.rule}`, a])).values()] : [];
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="flex items-center font-medium">Law text <InfoButton k="byo" /></span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} placeholder="Paste the full text of an ordinance, statute or bill"
            className="mt-1 w-full rounded-xl border border-border bg-bg p-3 font-serif text-[15px]" />
        </label>
        <div className="space-y-3 sm:w-64">
          <label className="block">
            <span className="font-medium">Which place is it for?</span>
            <select value={place} onChange={(e) => setPlace(e.target.value)} className="mt-1 h-12 w-full rounded-xl border border-border bg-bg px-3">
              {places.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <button type="button" onClick={() => { setText(EXAMPLE_ORDINANCE); setPlace("Cambridge, MA"); }} className="h-11 w-full rounded-lg border border-border px-3 text-[15px] hover:bg-surface">
            Use a practice law (fictional)
          </button>
          <button type="button" onClick={run} disabled={busy || text.trim().length < 200} className="h-12 w-full rounded-xl bg-brand font-semibold text-brand-ink disabled:opacity-50">
            {busy ? "Reading..." : "Read this law"}
          </button>
          <p className="text-[14px] text-muted">Takes about a minute. The result is a proposal: nothing changes until a person approves it.</p>
        </div>
      </div>

      {busy && (
        <ol className="space-y-2 rounded-xl border border-border p-4" aria-live="polite">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span aria-hidden className={`h-3 w-3 rounded-full ${i === Math.min(Math.floor(tick / 20), 3) ? "animate-pulse bg-brand" : i < Math.floor(tick / 20) ? "bg-brand" : "bg-border"}`} />
              {s}
            </li>
          ))}
          <li className="text-[14px] text-muted">{tick}s elapsed</li>
        </ol>
      )}
      {err && <p role="alert" style={{ color: "var(--bad-fg)" }}>{err}</p>}

      {res && (
        <section className="space-y-5" aria-label="Result">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-semibold">Done in {Math.round(res.ms / 1000)} seconds</p>
            <ol className="mt-2 space-y-1 text-[15px]">
              {res.steps.map((s) => <li key={s.step}>{s.step}: {s.detail}{s.ms ? ` (${(s.ms / 1000).toFixed(0)}s)` : ""}</li>)}
            </ol>
            <p className="mt-2 text-[14px] text-muted">{res.disclaimer}</p>
          </div>
          <h3 className="text-[20px] font-semibold">Rules found ({res.rules.length})</h3>
          {res.rules.length === 0 && <p className="text-muted">We did not find a rule in the six topics in this text.</p>}
          {res.rules.map((r) => (
            <article key={r.team_rule_id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <VerdictChip kind={(r.status === "in_force" ? "applies" : r.status === "not_yet_effective" ? "not_yet_effective" : r.status === "pending" ? "pending" : "failed") as VerdictKind} />
                <span className="text-[14px] text-muted">{CATEGORY_LABEL[r.category]} · {r.jurisdiction}{r.effective_date ? ` · effective ${r.effective_date}` : ""}</span>
              </div>
              <h4 className="mt-2 font-semibold">{r.title}</h4>
              <p className="mt-1">{r.requirement}</p>
              {r.key_value && <p className="mt-1 text-[15px]">Key number: <strong>{r.key_value}</strong></p>}
              <ProofPanelStatic rule={r} />
            </article>
          ))}
          {res.rejected.length > 0 && (
            <details className="rounded-xl border border-border p-4">
              <summary className="cursor-pointer font-medium">What Proofline refused to report ({res.rejected.length})</summary>
              <ul className="mt-2 list-disc pl-5 text-[15px]">{res.rejected.map((x, i) => <li key={i}>{x.title}: {x.reason}</li>)}</ul>
            </details>
          )}
          <h3 className="flex items-center text-[20px] font-semibold">Homes affected: {res.affected_count} <InfoButton k="watch.radius" /></h3>
          {byAddr.length > 0 && (
            <div className="max-h-96 overflow-auto rounded-xl border border-border">
              <table className="w-full text-left text-[15px]">
                <thead className="sticky top-0 bg-surface text-muted"><tr><th className="p-2">Address</th><th className="p-2">City</th><th className="p-2">Date</th><th className="p-2">Result</th></tr></thead>
                <tbody>
                  {byAddr.slice(0, 300).map((a, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-2"><Link className="text-brand underline underline-offset-2" href={`/check?address=${a.address_id}`}>{a.street}</Link></td>
                      <td className="p-2">{a.city}</td><td className="p-2 tabular">{a.date}</td>
                      <td className="p-2"><VerdictChip kind={a.result as VerdictKind} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <ReviewBox id={res.doc_id} />
          <button type="button" className="h-11 rounded-lg border border-border px-4 hover:bg-surface"
            onClick={() => {
              const blob = new Blob([JSON.stringify({ rules: res.rules, affected_address_ids: [...new Set(res.affected.map((a) => a.address_id))].sort(), dates: res.dates }, null, 2)], { type: "application/json" });
              const u = URL.createObjectURL(blob); const el = document.createElement("a"); el.href = u; el.download = `${res.doc_id}.json`; el.click(); URL.revokeObjectURL(u);
            }}>
            Download result (JSON)
          </button>
        </section>
      )}
    </div>
  );
}
