import Link from "next/link";
import { CATEGORY_LABEL, CATEGORY_ORDER, VerdictChip } from "@/components/Verdict";
import { NO_RULE, PLACES, RULES } from "@/lib/data";

export const metadata = { title: "Learn | Proofline" };

const ONE_LINE: Record<string, string> = {
  rent_increase_limits: "Caps on how much rent can go up each year, and which buildings they cover.",
  just_cause_eviction: "A landlord needs a listed reason to end a tenancy, and sometimes must pay moving money.",
  security_deposits: "How big a deposit can be, and how and when it comes back.",
  application_screening_fees: "What you can be charged to apply for a home.",
  screening_restrictions: "What a landlord cannot use to turn you down, such as a criminal record or a housing voucher.",
  algorithmic_rent_setting: "Rules about software that sets rents using private data from competing landlords.",
};

const GLOSSARY: [string, string][] = [
  ["Jurisdiction", "The government whose rules apply, like a state or a city."],
  ["Ordinance", "A law passed by a city."],
  ["Statute", "A law passed by a state."],
  ["Bill", "A proposed law that is not passed yet."],
  ["Effective date", "The day a law starts to apply."],
  ["Rent control or rent stabilization", "Local rules that limit yearly rent increases for covered homes."],
  ["Just cause", "A rule that a landlord needs a listed reason to end a tenancy."],
  ["Relocation assistance", "Money a landlord must pay when a tenant has to move for a reason that is not the tenant's fault."],
  ["Certificate of occupancy", "The city's approval that a building is ready for people to live in. Many rent control rules depend on its date."],
  ["CPI", "Consumer Price Index, a measure of how much prices went up. Many rent caps are tied to it."],
  ["Source of income", "Where your rent money comes from, such as a job or a housing voucher."],
  ["Preemption", "When a higher-level law overrides a lower-level one."],
  ["Superseded", "Replaced by another rule that takes priority."],
];

const HELP: [string, string, string][] = [
  ["California", "LawHelpCA (find free legal aid near you)", "https://www.lawhelpca.org/"],
  ["New Jersey", "Legal Services of New Jersey", "https://www.lsnj.org/"],
  ["Massachusetts", "MassLegalHelp", "https://www.masslegalhelp.org/"],
  ["San Francisco", "San Francisco Rent Board", "https://www.sf.gov/departments/rent-board"],
  ["Los Angeles", "Los Angeles Housing Department", "https://housing.lacity.gov/"],
  ["Berkeley", "Berkeley Rent Board", "https://rentboard.berkeleyca.gov/"],
  ["Boston", "Boston Office of Housing Stability", "https://www.boston.gov/departments/housing/office-housing-stability"],
];

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="eyebrow">Plain explanations</p>
      <h1 className="mt-1 text-[34px] font-bold">Learn</h1>
      <p className="mt-2 max-w-3xl text-muted">Plain explanations of the six topics, how layers of law work, and where to get help. Not legal advice.</p>

      <section id="layers" className="panel mt-8 p-6">
        <h2 className="text-[24px] font-semibold">Layers of law</h2>
        <p className="mt-2">Every home is covered by its <strong>state</strong> law and, inside some cities, by <strong>city</strong> law too. When both cover the same topic, one of three things happens:</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>The state law steps aside where a city rule covers the home. We show the state rule as <VerdictChip kind="superseded" />.</li>
          <li>Both apply, and you get the stronger protection of each.</li>
          <li>The state law overrides city rules (preemption). We flag it as a possible conflict for a person to review.</li>
        </ul>
        <p className="mt-2">Which city you are in depends on the legal city, not the mailing city. For example, Dorchester is part of Boston.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-[24px] font-semibold">How to read a citation</h2>
        <p className="mt-2">&ldquo;Cal. Civ. Code &sect; 1947.12&rdquo; means California Civil Code, section 1947.12. &ldquo;N.J.S.A. 46:8-21.2&rdquo; means New Jersey Statutes, title 46, section 8-21.2. &ldquo;S.F. Admin. Code &sect; 37.3&rdquo; is section 37.3 of San Francisco&apos;s Administrative Code.</p>
      </section>

      {CATEGORY_ORDER.map((cat) => (
        <section key={cat} id={cat} className="mt-10 scroll-mt-24">
          <h2 className="text-[24px] font-semibold">{CATEGORY_LABEL[cat]}</h2>
          <p className="mt-1 text-[18px]">{ONE_LINE[cat]}</p>
          <div className="card mt-3 overflow-x-auto">
            <table className="table">
              <thead><tr><th className="p-3">Place</th><th className="p-3">What applies</th><th className="p-3">Status</th></tr></thead>
              <tbody>
                {PLACES.map((p) => {
                  const rs = RULES.filter((r) => r.jurisdiction === p && r.category === cat);
                  const none = NO_RULE.find((n) => n.jurisdiction === p && n.category === cat);
                  if (!rs.length && !none) return null;
                  return (
                    <tr key={p} className="border-t border-border align-top">
                      <td className="p-3 font-medium">{p}</td>
                      <td className="p-3">
                        {rs.length ? rs.map((r) => <span key={r.team_rule_id} className="block">{r.title}{r.key_value ? `: ${r.key_value}` : ""} <span className="text-muted">({r.citation})</span></span>) : <span className="text-muted">{none?.reason}</span>}
                      </td>
                      <td className="p-3">
                        {rs.length ? rs.map((r) => <span key={r.team_rule_id} className="mb-1 block"><VerdictChip kind={r.status === "in_force" ? "applies" : r.status === "not_yet_effective" ? "not_yet_effective" : r.status === "pending" ? "pending" : "failed"} /></span>) : <VerdictChip kind="none" />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-[24px] font-semibold">Words you will see</h2>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          {GLOSSARY.map(([t, d]) => (
            <div key={t} className="card p-4"><dt className="font-semibold">{t}</dt><dd className="text-muted">{d}</dd></div>
          ))}
        </dl>
      </section>

      <section id="help" className="panel mt-10 scroll-mt-24 p-6">
        <h2 className="text-[24px] font-semibold">Where to get help</h2>
        <p className="mt-1">For advice about your own situation, contact one of these. Proofline is not a lawyer.</p>
        <ul className="mt-3 space-y-2">
          {HELP.map(([p, n, u]) => <li key={n}><span className="text-muted">{p}: </span><a className="text-brand underline underline-offset-2" href={u} target="_blank" rel="noreferrer">{n}</a></li>)}
        </ul>
        <p className="mt-3 text-[15px]"><Link className="text-brand underline underline-offset-2" href="/check">Check an address</Link></p>
      </section>
    </div>
  );
}
