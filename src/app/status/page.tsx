"use client";

import { useEffect, useState } from "react";

interface H {
  status: "ok" | "degraded" | "down";
  checked_at: string;
  data: { rules_sha256: string; generated_at: string; as_of: string; rules: number; audit_entries: number };
  components: Record<string, { ok: boolean; detail: string }>;
}

const NAMES: Record<string, string> = {
  lookups: "Address lookups and Pre-Flight",
  census_geocoder: "US Census Geocoder (live address search)",
  law_reader: "Reading new laws (Claude)",
  api_keys: "API key issuing",
  legiscan: "LegiScan (optional bill source)",
  openstates: "Open States (optional bill source)",
};

export default function StatusPage() {
  const [h, setH] = useState<H | null>(null);
  const [err, setErr] = useState(false);
  async function load() {
    setErr(false);
    try { setH(await (await fetch("/api/health", { cache: "no-store" })).json()); } catch { setErr(true); }
  }
  useEffect(() => { load(); }, []);
  const tone = h?.status === "ok" ? "ok" : h?.status === "degraded" ? "unk" : "bad";
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="eyebrow">System status</p>
      <h1 className="mt-1 text-[34px] font-bold">Status</h1>
      {err && <p role="alert" className="mt-4" style={{ color: "var(--bad-fg)" }}>Could not reach the health endpoint.</p>}
      {h && (
        <>
          <div className="card mt-6 flex items-center justify-between p-5" style={{ background: `var(--${tone}-bg)` }}>
            <p className="text-[20px] font-semibold" style={{ color: `var(--${tone}-fg)` }}>
              {h.status === "ok" ? "All systems working" : h.status === "degraded" ? "Working, with some parts paused" : "Down"}
            </p>
            <button type="button" onClick={load} className="btn btn-secondary">Check again</button>
          </div>
          <ul className="card mt-4 divide-y divide-border">
            {Object.entries(h.components).map(([k, v]) => (
              <li key={k} className="flex items-start gap-3 p-4">
                <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: v.ok ? "var(--ok-line)" : "var(--unk-line)" }} />
                <div>
                  <p className="font-medium">{NAMES[k] ?? k} <span className="sr-only">{v.ok ? "working" : "not available"}</span></p>
                  <p className="text-[14.5px] text-muted">{v.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="panel mt-4 p-5 text-[14.5px]">
            <p className="font-semibold">Data version</p>
            <p className="mt-1 break-all font-mono text-[13px] text-muted">rules sha256 {h.data.rules_sha256}</p>
            <p className="mt-1 text-muted">{h.data.rules} rules, generated {h.data.generated_at.slice(0, 19).replace("T", " ")} UTC, answers as of {h.data.as_of}, {h.data.audit_entries} audit entries. Checked {new Date(h.checked_at).toLocaleString()}.</p>
          </div>
        </>
      )}
    </div>
  );
}
