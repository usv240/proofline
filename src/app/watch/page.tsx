import Link from "next/link";
import { InfoButton } from "@/components/InfoButton";
import { VerdictChip } from "@/components/Verdict";
import { CHANGES, RULES } from "@/lib/data";

export const metadata = { title: "Law Watch | Proofline" };

function statusKind(ids: string[]) {
  const rs = RULES.filter((r) => ids.includes(r.team_rule_id));
  if (rs.some((r) => r.status === "not_yet_effective")) return "not_yet_effective" as const;
  if (rs.length && rs.every((r) => r.x_lifecycle.kind === "pending")) return "pending" as const;
  if (rs.length && rs.every((r) => r.x_lifecycle.kind === "failed")) return "failed" as const;
  return "applies" as const;
}

export default function WatchPage() {
  const entries = Object.values(CHANGES);
  const proposals = RULES.filter((r) => r.x_lifecycle.kind !== "enacted" || r.status === "not_yet_effective");
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="flex items-center text-[32px] font-semibold">Law Watch <InfoButton k="watch" /></h1>
      <p className="mt-1 max-w-3xl text-muted">
        Laws start, stop, and get proposed or struck down. For each change, Proofline shows which homes it affects, from which date,
        and any conflict between state and city rules. A person approves each change before it is used in answers.
      </p>

      <h2 className="mt-8 text-[22px] font-semibold">Change cases</h2>
      <ul className="mt-3 space-y-3">
        {entries.map((c) => (
          <li key={c.test_id}>
            <Link href={`/watch/${c.test_id}`} className="block rounded-xl border border-border p-4 hover:border-brand hover:bg-surface">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[14px] font-semibold">{c.test_id}</span>
                <VerdictChip kind={statusKind(c.rules)} />
                {c.conflict_flag_address_ids.length > 0 && (
                  <span className="rounded-md px-2 py-0.5 text-[13px]" style={{ background: "var(--bad-bg)", color: "var(--bad-fg)" }}>
                    {c.conflict_flag_address_ids.length} conflict flags
                  </span>
                )}
              </div>
              <p className="mt-2 text-[18px] font-semibold">{c.title}</p>
              <p className="text-muted">{c.affected_address_ids.length} homes affected · {c.rules.length} rule{c.rules.length === 1 ? "" : "s"}</p>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-[22px] font-semibold">Upcoming, proposed and failed measures</h2>
      <p className="text-muted">Everything in the sources that is not in force today.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-[15px]">
          <thead className="bg-surface text-muted">
            <tr><th className="p-3">Measure</th><th className="p-3">Place</th><th className="p-3">Status</th><th className="p-3">Date</th></tr>
          </thead>
          <tbody>
            {proposals.map((r) => (
              <tr key={r.team_rule_id} className="border-t border-border">
                <td className="p-3"><span className="font-medium">{r.title}</span><span className="block text-[13px] text-muted">{r.citation}</span></td>
                <td className="p-3">{r.jurisdiction}</td>
                <td className="p-3"><VerdictChip kind={r.status === "not_yet_effective" ? "not_yet_effective" : r.x_lifecycle.kind === "pending" ? "pending" : "failed"} /></td>
                <td className="p-3 tabular">{r.x_lifecycle.effective_date ?? r.x_lifecycle.ended_date ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-surface p-5">
        <p className="text-[18px] font-semibold">Got a new law?</p>
        <p className="text-muted">Paste it in Bring your own. Proofline reads it, checks its own work, and shows every affected home.</p>
        <Link href="/byo" className="mt-3 inline-flex h-11 items-center rounded-lg bg-brand px-4 font-medium text-brand-ink">Bring your own law</Link>
      </div>
    </div>
  );
}
