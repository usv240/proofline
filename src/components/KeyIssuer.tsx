"use client";

import { useState } from "react";

interface Issued { key: string; id: string; label: string; expires: string }

export function KeyIssuer() {
  const [label, setLabel] = useState("");
  const [k, setK] = useState<Issued | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [check, setCheck] = useState<string | null>(null);

  async function create() {
    setBusy(true); setErr(null); setCheck(null);
    try {
      const r = await fetch("/api/keys", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ label }) });
      const j = await r.json();
      if (!r.ok) setErr(j.message ?? "Could not create a key.");
      else setK(j);
    } finally { setBusy(false); }
  }
  async function verify() {
    if (!k) return;
    const r = await fetch("/api/keys/verify", { headers: { authorization: `Bearer ${k.key}` } });
    const j = await r.json();
    setCheck(j.ok ? `Valid. Tier ${j.tier}, ${j.limits.lookup_per_minute} lookups per minute, ${j.limits.byo_reads_per_day} law reads per day, expires ${j.expires}.` : `Invalid: ${j.reason}`);
  }

  return (
    <div className="card p-5 sm:p-6">
      <p className="text-[18px] font-semibold">Create a key</p>
      <p className="mt-1 text-[15px] text-muted">No account and no email. The key is shown once; Proofline does not store it. Give it a label so you remember what it is for.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label, for example: intake chatbot" className="input" aria-label="Key label" />
        <button type="button" onClick={create} disabled={busy} className="btn btn-primary h-12 shrink-0">{busy ? "Creating..." : "Create key"}</button>
      </div>
      {err && <p role="alert" className="mt-2" style={{ color: "var(--bad-fg)" }}>{err}</p>}
      {k && (
        <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4">
          <p className="text-[14px] text-muted">Your key ({k.label}, expires {k.expires}). Copy it now.</p>
          <code className="mt-2 block break-all rounded-lg bg-bg p-3 font-mono text-[13px]">{k.key}</code>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={async () => { await navigator.clipboard?.writeText(k.key); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? "Copied" : "Copy key"}</button>
            <button type="button" className="btn btn-secondary" onClick={verify}>Test it</button>
          </div>
          {check && <p role="status" className="mt-2 text-[15px]">{check}</p>}
        </div>
      )}
    </div>
  );
}
