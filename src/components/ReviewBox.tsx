"use client";

import { useEffect, useState } from "react";
import { InfoButton } from "./InfoButton";

interface Decision { status: "approved" | "rejected"; note: string; at: string }

/** Human gate for a law change. In this demo the decision is kept in the browser and shown with a time stamp. */
export function ReviewBox({ id, removesProtection }: { id: string; removesProtection?: number }) {
  const key = `proofline-review-${id}`;
  const [d, setD] = useState<Decision | null>(null);
  const [note, setNote] = useState("");
  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setD(JSON.parse(raw));
  }, [key]);

  function decide(status: Decision["status"]) {
    if (removesProtection && status === "approved" && !note.trim()) return;
    const v = { status, note: note.trim(), at: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(v));
    setD(v);
  }

  return (
    <div className="rounded-xl border border-border p-4">
      <p className="flex items-center font-semibold">Human review <InfoButton k="watch.approve" /></p>
      {d ? (
        <div className="mt-2">
          <p>
            <strong>{d.status === "approved" ? "Approved" : "Rejected"}</strong> by demo reviewer at {new Date(d.at).toLocaleString()}
            {d.note && <> with note: &ldquo;{d.note}&rdquo;</>}
          </p>
          <button type="button" className="mt-2 text-brand underline underline-offset-2" onClick={() => { localStorage.removeItem(key); setD(null); }}>Undo</button>
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          {!!removesProtection && <p className="font-medium" style={{ color: "var(--bad-fg)" }}>This change removes protection for {removesProtection} homes. A note is required to approve.</p>}
          <label className="block text-[15px]">Note (optional)
            <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-border bg-bg px-3" />
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={() => decide("approved")} className="h-11 rounded-lg bg-brand px-4 font-medium text-brand-ink">Approve</button>
            <button type="button" onClick={() => decide("rejected")} className="h-11 rounded-lg border border-border px-4">Reject</button>
          </div>
          <p className="text-[14px] text-muted">Nothing changes in answers until a person approves.</p>
        </div>
      )}
    </div>
  );
}
