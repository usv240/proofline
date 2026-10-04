"use client";

import { useState } from "react";
import type { AddressFacts, Result } from "@/lib/engine/types";
import { receiptBody, seal, type Receipt } from "@/lib/receipt";
import { InfoButton } from "./InfoButton";

interface V { ok: boolean; message: string; same_rule_set: boolean; differences: { rule: string; result: string }[] }

export function ReceiptButton({ facts, asOf, results, rulesSha }: { facts: AddressFacts; asOf: string; results: { team_rule_id: string; result: Result }[]; rulesSha: string }) {
  const [r, setR] = useState<Receipt | null>(null);
  const [v, setV] = useState<V | null>(null);
  const [busy, setBusy] = useState(false);

  async function make() {
    setV(null);
    setR(await seal(receiptBody(facts, asOf, results, rulesSha, new Date().toISOString())));
  }
  function download() {
    if (!r) return;
    const u = URL.createObjectURL(new Blob([JSON.stringify(r, null, 2)], { type: "application/json" }));
    const a = document.createElement("a"); a.href = u; a.download = `proofline-receipt-${r.address.id}-${r.sha256.slice(0, 12)}.json`; a.click(); URL.revokeObjectURL(u);
  }
  async function verify(tampered = false) {
    if (!r) return;
    setBusy(true);
    try {
      // A tampered copy flips the first result to a different value, leaving the seal unchanged.
      const body = tampered ? { ...r, results: r.results.map((x, i) => (i === 0 ? { ...x, result: (x.result === "applies" ? "unknown" : "applies") as Result } : x)) } : r;
      setV(await (await fetch("/api/receipt/verify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })).json());
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card no-print p-4 sm:p-5">
      <p className="flex items-center font-semibold">Proof receipt <InfoButton k="receipt" /></p>
      <p className="text-[15px] text-muted">A sealed record of this answer: the rule set version, the facts used, the date and every result. Anyone can check it later, even after the rules change.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={make} className="btn btn-primary">Get a receipt</button>
        {r && <button type="button" onClick={download} className="btn btn-secondary">Download</button>}
        {r && <button type="button" disabled={busy} onClick={() => verify(false)} className="btn btn-secondary">Verify it now</button>}
        {r && <button type="button" disabled={busy} onClick={() => verify(true)} className="btn btn-ghost">Try a tampered copy</button>}
      </div>
      {r && (
        <p className="mt-3 break-all font-mono text-[13px] text-muted">
          sha256 {r.sha256} · rules {r.rules_sha256.slice(0, 12)} · {r.results.length} results · issued {r.issued_at.slice(0, 19).replace("T", " ")} UTC
        </p>
      )}
      {v && (
        <p role="status" className="mt-2 font-medium" style={{ color: v.ok ? "var(--ok-fg)" : "var(--bad-fg)" }}>
          {v.message}{v.differences?.length ? ` (${v.differences.map((d) => `${d.rule}: now ${d.result}`).join(", ")})` : ""}
        </p>
      )}
    </div>
  );
}
