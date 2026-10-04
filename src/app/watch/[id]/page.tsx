import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoButton } from "@/components/InfoButton";
import { ReviewBox } from "@/components/ReviewBox";
import { ProofPanelStatic } from "@/components/ProofPanelStatic";
import { VerdictChip, type VerdictKind } from "@/components/Verdict";
import { ADDRESSES, CHANGES, RULES } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(CHANGES).map((id) => ({ id }));
}

const LABEL: Record<string, VerdictKind> = { applies: "applies", unknown: "unknown", superseded: "superseded", not_yet_effective: "not_yet_effective", pending: "pending", none: "none" };

export default async function ChangePage(props: PageProps<"/watch/[id]">) {
  const { id } = await props.params;
  const c = CHANGES[id];
  if (!c) notFound();
  const rules = RULES.filter((r) => c.rules.includes(r.team_rule_id));
  const byCity = new Map<string, number>();
  for (const aid of c.affected_address_ids) {
    const a = ADDRESSES.find((x) => x.address_id === aid)!;
    const k = `${a.city}, ${a.state}`;
    byCity.set(k, (byCity.get(k) ?? 0) + 1);
  }
  const conflicts = new Set(c.conflict_flag_address_ids);
  const rows = c.before_after.slice(0, 400);
  const dates = [c.as_of_before, c.as_of, c.as_of_after].filter(Boolean) as string[];
  const lostProtection = c.before_after.filter((b) => b.before === "applies" && b.after !== "applies").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/watch" className="text-brand underline underline-offset-2">Back to Law Watch</Link>
      <p className="mt-4 text-[14px] font-semibold text-muted">{c.test_id}</p>
      <h1 className="text-[30px] font-semibold leading-tight">{c.title}</h1>
      {c.expected_behavior && <p className="mt-2 text-muted">What a correct system does: {c.expected_behavior}</p>}

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border p-4">
          <p className="flex items-center text-[15px] text-muted">Homes affected <InfoButton k="watch.radius" /></p>
          <p className="text-[36px] font-semibold tabular">{c.affected_address_ids.length}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="flex items-center text-[15px] text-muted">Conflict flags <InfoButton k="conflict" /></p>
          <p className="text-[36px] font-semibold tabular">{c.conflict_flag_address_ids.length}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-[15px] text-muted">Dates checked</p>
          <p className="mt-2 tabular">{dates.join(" and ") || "2026-10-01"}</p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-surface p-4">
        <p className="font-semibold">What changes</p>
        <p className="mt-1">{c.notes}</p>
        {byCity.size > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {[...byCity.entries()].map(([k, v]) => <li key={k} className="rounded-md border border-border bg-bg px-2 py-1 text-[15px]">{k}: <strong className="tabular">{v}</strong></li>)}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-[22px] font-semibold">Rules in this change</h2>
        <div className="mt-3 space-y-3">
          {rules.length === 0 && <p className="text-muted">No matching rule was found in the sources.</p>}
          {rules.map((r) => (
            <article key={r.team_rule_id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <VerdictChip kind={r.status === "not_yet_effective" ? "not_yet_effective" : r.x_lifecycle.kind === "pending" ? "pending" : r.x_lifecycle.kind === "failed" ? "failed" : "applies"} />
                <span className="text-[14px] text-muted">{r.team_rule_id} · {r.jurisdiction}</span>
              </div>
              <h3 className="mt-2 font-semibold">{r.title}</h3>
              <p className="mt-1">{r.requirement}</p>
              <p className="mt-1 text-[15px] text-muted">
                {r.x_lifecycle.enacted_date && <>Enacted {r.x_lifecycle.enacted_date}. </>}
                {r.x_lifecycle.effective_date && <>Effective {r.x_lifecycle.effective_date}. </>}
                {r.x_lifecycle.ended_date && <>Ended or struck {r.x_lifecycle.ended_date}. </>}
              </p>
              {r.conflict_note && <p className="mt-1 text-[15px]" style={{ color: "var(--bad-fg)" }}>{r.conflict_note}</p>}
              <ProofPanelStatic rule={r} />
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6"><ReviewBox id={c.test_id} removesProtection={lostProtection} /></section>

      <section className="mt-6">
        <h2 className="text-[22px] font-semibold">Affected homes</h2>
        {rows.length === 0 ? (
          <p className="mt-2 text-muted">No home is affected. {c.type === "negative" ? "This measure is not law, so no home gains or loses a rule." : ""}</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-surface text-muted"><tr><th className="p-3">Address</th><th className="p-3">City</th><th className="p-3">Before</th><th className="p-3">After</th><th className="p-3">Conflict</th></tr></thead>
              <tbody>
                {rows.map((b, i) => {
                  const a = ADDRESSES.find((x) => x.address_id === b.address_id)!;
                  return (
                    <tr key={`${b.address_id}-${b.rule}-${i}`} className="border-t border-border">
                      <td className="p-3"><Link className="text-brand underline underline-offset-2" href={`/check?address=${a.address_id}`}>{a.street_address}</Link></td>
                      <td className="p-3">{a.city}</td>
                      <td className="p-3"><VerdictChip kind={LABEL[b.before] ?? "none"} /></td>
                      <td className="p-3"><VerdictChip kind={LABEL[b.after] ?? "none"} /></td>
                      <td className="p-3">{conflicts.has(a.address_id) ? "Yes" : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
