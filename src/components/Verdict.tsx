// Verdict chips: icon + word + color. Never color alone (WCAG 1.4.1).
import type { Category } from "@/lib/engine/types";
import type { InfoKey } from "@/content/info";

export type VerdictKind = "applies" | "unknown" | "superseded" | "not_yet_effective" | "pending" | "none" | "allowed" | "blocked" | "person" | "failed";

const V: Record<VerdictKind, { label: string; legal: string; bg: string; fg: string; icon: string; info?: InfoKey }> = {
  applies: { label: "Protects you", legal: "applies", bg: "var(--ok-bg)", fg: "var(--ok-fg)", icon: "check", info: "v.applies" },
  unknown: { label: "Not sure yet", legal: "unknown", bg: "var(--unk-bg)", fg: "var(--unk-fg)", icon: "question", info: "v.unknown" },
  superseded: { label: "Replaced by a local rule", legal: "superseded", bg: "var(--sup-bg)", fg: "var(--sup-fg)", icon: "up", info: "v.superseded" },
  not_yet_effective: { label: "Starts later", legal: "not yet effective", bg: "var(--nye-bg)", fg: "var(--nye-fg)", icon: "clock", info: "v.not_yet_effective" },
  pending: { label: "Proposed, not law", legal: "pending", bg: "var(--pen-bg)", fg: "var(--pen-fg)", icon: "doc", info: "v.pending" },
  failed: { label: "Did not become law", legal: "failed", bg: "var(--pen-bg)", fg: "var(--pen-fg)", icon: "dash" },
  none: { label: "No rule at this level", legal: "no rule", bg: "var(--none-bg)", fg: "var(--none-fg)", icon: "dash", info: "v.none" },
  allowed: { label: "Allowed", legal: "allowed", bg: "var(--ok-bg)", fg: "var(--ok-fg)", icon: "check", info: "pf.allowed" },
  blocked: { label: "Not allowed", legal: "not allowed", bg: "var(--bad-bg)", fg: "var(--bad-fg)", icon: "stop", info: "pf.blocked" },
  person: { label: "Needs a person", legal: "needs review", bg: "var(--unk-bg)", fg: "var(--unk-fg)", icon: "person", info: "pf.person" },
};

export const verdictInfo = (k: VerdictKind) => V[k];

function Icon({ name }: { name: string }) {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "check": return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M7.5 12.5l3 3 6-7" /></svg>;
    case "question": return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.8-2.5 2.2-2.5 3.9" /><path d="M12 17.2h.01" /></svg>;
    case "up": return <svg {...p}><rect x="3" y="10" width="18" height="11" rx="2" /><path d="M12 15V3M8 7l4-4 4 4" /></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 7v5l3 2" /></svg>;
    case "doc": return <svg {...p} strokeDasharray="3 2"><path d="M6 2h9l4 4v16H6z" /></svg>;
    case "stop": return <svg {...p}><path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" /><path d="M7 12h10" /></svg>;
    case "person": return <svg {...p}><circle cx="12" cy="7" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M7 12h10" /></svg>;
  }
}

export function VerdictChip({ kind, size = "md" }: { kind: VerdictKind; size?: "md" | "lg" }) {
  const v = V[kind];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${size === "lg" ? "px-4 py-2 text-[17px]" : "px-2.5 py-1 text-[14px]"}`}
      style={{ background: v.bg, color: v.fg }}
    >
      <Icon name={v.icon} />
      <span>{v.label}</span>
    </span>
  );
}

export const CATEGORY_LABEL: Record<Category, string> = {
  rent_increase_limits: "Rent increase limits",
  just_cause_eviction: "Just-cause eviction",
  security_deposits: "Security deposits",
  application_screening_fees: "Application and screening fees",
  screening_restrictions: "Screening restrictions",
  algorithmic_rent_setting: "Algorithmic rent-setting",
};

export const CATEGORY_ORDER: Category[] = [
  "rent_increase_limits",
  "just_cause_eviction",
  "security_deposits",
  "application_screening_fees",
  "screening_restrictions",
  "algorithmic_rent_setting",
];
