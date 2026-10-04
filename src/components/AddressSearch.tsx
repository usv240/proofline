"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { InfoButton } from "./InfoButton";

export interface AddrIdx { id: string; street: string; city: string; state: string; postal: string }

/** Accessible combobox over the 500 sample addresses, plus "look up any address" via the Census Geocoder. */
export function AddressSearch({ index, target = "/check", autoFocus = false, compact = false }: { index: AddrIdx[]; target?: string; autoFocus?: boolean; compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const listId = useId();

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return index
      .filter((a) => `${a.id} ${a.street} ${a.city} ${a.postal} ${a.state}`.toLowerCase().includes(s))
      .slice(0, 8);
  }, [q, index]);

  function go(id: string) {
    setOpen(false);
    router.push(`${target}?address=${id}`);
  }

  async function lookupFree() {
    if (q.trim().length < 6) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch(`/api/geocode?q=${encodeURIComponent(q.trim())}`);
      const j = await r.json();
      if (!r.ok) setMsg(j.message ?? "We could not find that address.");
      else router.push(`${target}?live=${encodeURIComponent(JSON.stringify(j.facts))}`);
    } catch {
      setMsg("Finding the city is taking longer than usual. You can pick a sample address while you wait.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative w-full">
      <label htmlFor={`${listId}-input`} className={compact ? "sr-only" : "mb-1 flex items-center text-[15px] font-medium"}>
        Address <InfoButton k="address" />
      </label>
      <div className="flex gap-2">
        <input
          id={`${listId}-input`}
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && matches[active] ? `${listId}-${matches[active].id}` : undefined}
          autoFocus={autoFocus}
          autoComplete="off"
          value={q}
          placeholder="Enter an address in one of our 9 cities"
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, matches.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            else if (e.key === "Enter") { e.preventDefault(); if (matches[active]) go(matches[active].id); else lookupFree(); }
            else if (e.key === "Escape") setOpen(false);
          }}
          className="h-12 w-full rounded-xl border border-border bg-bg px-4 text-[17px] placeholder:text-muted"
        />
        <button
          type="button"
          onClick={() => (matches[active] ? go(matches[active].id) : lookupFree())}
          disabled={busy}
          className="h-12 shrink-0 rounded-xl bg-brand px-5 font-medium text-brand-ink disabled:opacity-60"
        >
          {busy ? "Finding..." : "Check"}
        </button>
      </div>
      {open && matches.length > 0 && (
        <ul id={listId} role="listbox" className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-border bg-bg shadow-lg">
          {matches.map((m, i) => (
            <li
              key={m.id}
              id={`${listId}-${m.id}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); go(m.id); }}
              className={`cursor-pointer px-4 py-3 ${i === active ? "bg-surface-2" : ""}`}
            >
              <span className="font-medium">{m.street}</span>
              <span className="text-muted">, {m.city}, {m.state}</span>
              {m.postal !== m.city && <span className="ml-2 text-[13px] text-muted">(mailing city: {m.postal})</span>}
            </li>
          ))}
        </ul>
      )}
      {msg && <p role="status" className="mt-2 text-[15px] text-muted">{msg}</p>}
    </div>
  );
}
