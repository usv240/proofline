"use client";

import { useState } from "react";

interface R {
  id: string; title: string; history_url: string; status: string; message: string;
  snapshot: { actions: number; retrieved: string | null };
  live: { actions: number; latest: { date: string; branch: string; action: string } | null };
  other_sources: { source: string; last_action: string; last_action_date: string }[];
}

export function WatchCheck() {
  const [data, setData] = useState<{ checked_at: string; sources: Record<string, boolean>; results: R[] } | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="card p-5 sm:p-6">
      <p className="text-[18px] font-semibold">Check pending bills now</p>
      <p className="text-muted">Reads the live bill history on the Massachusetts Legislature website and compares it with the copy Proofline read. A change becomes a proposal for review; nothing changes on its own.</p>
      <button type="button" disabled={busy} onClick={async () => { setBusy(true); try { setData(await (await fetch("/api/watch/status", { cache: "no-store" })).json()); } finally { setBusy(false); } }}
        className="btn btn-primary mt-3">
        {busy ? "Checking..." : "Check for changes"}
      </button>
      {data && (
        <div role="status" className="mt-4 space-y-3">
          <p className="text-[14px] text-muted">
            Checked {new Date(data.checked_at).toLocaleString()} · sources: official legislature site
            {data.sources.legiscan ? ", LegiScan" : ""}{data.sources.openstates ? ", Open States" : ""}
          </p>
          {data.results.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="font-medium">{r.title}</p>
              <p className="mt-1" style={{ color: r.status === "no_change" || r.status === "live_only" ? "var(--ok-fg)" : r.status === "unavailable" ? "var(--muted)" : "var(--bad-fg)" }}>{r.message}</p>
              {r.live.latest && <p className="mt-1 text-[15px] text-muted">Latest action ({r.live.latest.date}, {r.live.latest.branch}): {r.live.latest.action}</p>}
              <p className="text-[14px] text-muted">Actions when read: {r.snapshot.actions} · actions now: {r.live.actions} · <a className="underline" href={r.history_url} target="_blank" rel="noreferrer">official history</a></p>
              {r.other_sources.map((o) => <p key={o.source} className="text-[14px] text-muted">{o.source}: {o.last_action} ({o.last_action_date})</p>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
