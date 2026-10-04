"use client";

import { useState } from "react";

interface V { chain: { ok: boolean; entries: number; broken_at: number | null; head: string }; quotes: { ok: boolean; checked: number; not_found: string[] } }

export function VerifyButton() {
  const [v, setV] = useState<V | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <button type="button" disabled={busy} onClick={async () => { setBusy(true); try { setV(await (await fetch("/api/audit/verify")).json()); } finally { setBusy(false); } }}
        className="btn btn-primary">
        {busy ? "Checking..." : "Verify now"}
      </button>
      {v && (
        <ul role="status" className="mt-3 space-y-1">
          <li>Audit log: <strong>{v.chain.ok ? "intact" : `broken at line ${v.chain.broken_at}`}</strong>, {v.chain.entries} entries, chain head {v.chain.head}...</li>
          <li>Quotes: <strong>{v.quotes.ok ? "all found" : `${v.quotes.not_found.length} not found`}</strong> word for word in their sources ({v.quotes.checked} rules checked)</li>
        </ul>
      )}
    </div>
  );
}
