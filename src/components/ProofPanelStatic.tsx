"use client";

import { useState } from "react";
import type { RuleRecord } from "@/lib/engine/types";
import { ProofPanel } from "./RuleCard";

export function ProofPanelStatic({ rule }: { rule: RuleRecord }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="h-11 rounded-lg border border-border px-4 text-[15px] font-medium hover:bg-surface">
        {open ? "Hide proof" : "Show proof"}
      </button>
      {open && <ProofPanel rule={rule} />}
    </div>
  );
}
