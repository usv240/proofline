import Link from "next/link";
import { AddressSearch } from "@/components/AddressSearch";
import { InfoButton } from "@/components/InfoButton";
import { SampleChips } from "@/components/SampleChips";
import { addressIndex, METRICS } from "@/lib/data";

const STEPS = [
  { n: 1, t: "Find the address", d: "We work out the real city, not just the mailing city." },
  { n: 2, t: "Test every rule", d: "State and city rules are checked against this building's facts and the date." },
  { n: 3, t: "See the proof", d: "Each answer quotes the law. If a fact is missing, we tell you which one." },
];

const FEATURES = [
  { href: "/check", t: "Check an address", d: "See every rule for one home, with proof.", info: "stack" as const },
  { href: "/preflight", t: "Pre-Flight a change", d: "Is this rent increase, deposit, fee or pricing tool allowed at this address?", info: "pf.form" as const },
  { href: "/watch", t: "Watch the law change", d: "See which homes a new or proposed law would affect, and when.", info: "watch" as const },
  { href: "/byo", t: "Bring your own", d: "Paste a new law, or upload your own list of addresses.", info: "byo" as const },
];

const FAQ = [
  { q: "Is this legal advice?", a: "No. It shows what the law says and where it comes from. For advice about your situation, contact a legal aid office or a tenant rights group. The Learn page lists them." },
  { q: "Where does the law text come from?", a: "From official state and city sources collected for this project, each with its web address and the date it was retrieved. A few public pages listed only as links were retrieved once by Proofline and are labeled that way." },
  { q: "Why does it sometimes say \"Not sure yet\"?", a: "Some rules depend on facts that public records do not include, like the exact date a building was approved for people to live in. We tell you which fact and how to find it, instead of guessing." },
  { q: "Does it use AI?", a: "Yes, once: to read the law and turn it into rules that can be tested. A second AI pass and a script then check every rule against the source. Every answer you see is computed from those tested rules, not written by a chatbot." },
  { q: "Which places are covered?", a: "California (Los Angeles, San Francisco, San Diego, Berkeley, Santa Ana), New Jersey (Jersey City, Hoboken, Newark) and Massachusetts (Boston, Cambridge)." },
  { q: "How current is it?", a: "Every answer shows an \"as of\" date, and you can pick a different date to see what applied before or what is about to change." },
];

export default function Home() {
  const m = METRICS;
  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <div>
            <h1 className="text-[36px] font-semibold leading-[1.1] sm:text-[48px]">Which housing laws protect this home?</h1>
            <p className="mt-4 max-w-xl text-[19px] text-muted">
              Type an address. Proofline shows the rules that apply today, proves each one with the law&apos;s own words,
              and tells you what to check when it is not sure.
            </p>
            <div className="mt-6 max-w-xl">
              <AddressSearch index={addressIndex()} autoFocus={false} />
            </div>
            <p className="mt-6 text-[15px] font-medium">Or try one of these:</p>
            <div className="mt-2 max-w-xl"><SampleChips /></div>
          </div>
          <ol className="grid content-start gap-4" aria-label="How it works in three steps">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4 rounded-2xl border border-border bg-bg p-5">
                <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-[18px] font-semibold text-brand-ink">{s.n}</span>
                <div>
                  <p className="text-[19px] font-semibold">{s.t}</p>
                  <p className="text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="what-h">
        <h2 id="what-h" className="text-[28px] font-semibold">What can I do here?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.href} className="rounded-2xl border border-border p-5">
              <p className="flex items-center text-[20px] font-semibold">{f.t} <InfoButton k={f.info} label={f.t} /></p>
              <p className="mt-1 text-muted">{f.d}</p>
              <Link href={f.href} className="mt-3 inline-flex h-11 items-center rounded-lg border border-border px-4 font-medium hover:bg-surface">Open</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface" aria-labelledby="who-h">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="who-h" className="text-[28px] font-semibold">Who it is for</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Renters", "Know your rights at your own address, and check a rent increase before you pay it."],
              ["Legal aid and tenant groups", "Answer intake questions faster, with the law's exact words you can share."],
              ["Small housing providers", "Know your duties before you act, without a legal team."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-border bg-bg p-5">
                <p className="text-[19px] font-semibold">{t}</p>
                <p className="mt-1 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="trust-h">
        <h2 id="trust-h" className="text-[28px] font-semibold">Why you can trust it</h2>
        <p className="mt-2 max-w-3xl text-muted">Every number below is computed by a script from the published data. None is typed by hand.</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: String(m.negative_control.invented_applies), l: `invented rules in ${m.negative_control.checks.toLocaleString()} checks where the right answer is "no rule" or "not law"`, k: "metric.neg" as const },
            { v: `${Math.round(m.extraction.quote_rate * 100)}%`, l: `of ${m.extraction.rules} rules backed by a quote found word for word in the source`, k: "metric.cite" as const },
            { v: `${m.addresses.total}`, l: `addresses placed in their legal city (${m.addresses.geocoded} by the US Census Geocoder)`, k: "metric.addresses" as const },
            { v: `${m.documents.with_text}`, l: `law documents read (${m.documents.official} from the official pack, ${m.documents.fetched} public link pages)`, k: "source" as const },
          ].map((x) => (
            <div key={x.l} className="rounded-2xl border border-border p-5">
              <dt className="flex items-start text-[15px] text-muted"><span>{x.l}</span><InfoButton k={x.k} /></dt>
              <dd className="mt-2 text-[36px] font-semibold tabular">{x.v}</dd>
            </div>
          ))}
        </dl>
        <Link href="/how-it-works" className="mt-6 inline-block text-brand underline underline-offset-2">See how it works and check it yourself</Link>
      </section>

      <section className="border-y border-border bg-surface" aria-labelledby="prob-h">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="prob-h" className="text-[28px] font-semibold">The problem</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="rounded-2xl border border-border bg-bg p-5">
              <p className="text-[32px] font-semibold">3% vs 81%</p>
              <p className="text-muted">Share of tenants vs landlords with a lawyer in eviction cases, US average.</p>
              <a className="mt-2 inline-block text-[14px] text-brand underline" href="https://nlihc.org/sites/default/files/2023-03/2023AG7-04_Right-to-Counsel.pdf" target="_blank" rel="noreferrer">NCCRC via NLIHC, 2023</a>
            </li>
            <li className="rounded-2xl border border-border bg-bg p-5">
              <p className="text-[32px] font-semibold">43%</p>
              <p className="text-muted">of rent-controlled tenants in Berkeley did not know their rent control status.</p>
              <a className="mt-2 inline-block text-[14px] text-brand underline" href="https://rentboard.berkeleyca.gov/sites/default/files/documents/2022%20Tenant%20Survey%20Presentation%20and%20Results.pdf" target="_blank" rel="noreferrer">Berkeley Rent Board, 2022</a>
            </li>
            <li className="rounded-2xl border border-border bg-bg p-5">
              <p className="text-[32px] font-semibold">17 to 33%</p>
              <p className="text-muted">of answers from leading legal AI research tools were wrong or wrongly cited in a Stanford study.</p>
              <a className="mt-2 inline-block text-[14px] text-brand underline" href="https://onlinelibrary.wiley.com/doi/full/10.1111/jels.12413" target="_blank" rel="noreferrer">Magesh et al., J. Empirical Legal Stud., 2025</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12" aria-labelledby="faq-h">
        <h2 id="faq-h" className="text-[28px] font-semibold">Questions</h2>
        <div className="mt-4 divide-y divide-border rounded-2xl border border-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none text-[18px] font-medium">
                <span className="mr-2 inline-block transition-transform group-open:rotate-90" aria-hidden>&rsaquo;</span>{f.q}
              </summary>
              <p className="mt-2 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
