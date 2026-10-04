import Link from "next/link";
import { AddressSearch } from "@/components/AddressSearch";
import { InfoButton } from "@/components/InfoButton";
import { SampleChips } from "@/components/SampleChips";
import { addressIndex, METRICS } from "@/lib/data";

const STEPS = [
  { n: 1, t: "Find the address", d: "We work out the real city, not just the mailing city. Dorchester is Boston; Van Nuys is Los Angeles." },
  { n: 2, t: "Test every rule", d: "State and city rules are checked against this building's facts and the date you pick. Missing facts stay honest: \"not sure\", never \"no\"." },
  { n: 3, t: "See the proof", d: "Each answer quotes the law, word for word. When something is missing, you get the one fact that would settle it." },
];

const FEATURES = [
  { href: "/check", t: "Check an address", d: "Every rule for one home, with the law's words as proof and a sealed receipt you can verify later.", info: "stack" as const, icon: "search" },
  { href: "/preflight", t: "Pre-Flight a change", d: "Is this rent increase, deposit, fee or pricing software allowed here? Allowed, not allowed, or needs a person.", info: "pf.form" as const, icon: "shield" },
  { href: "/watch", t: "Watch the law change", d: "Which homes a new or proposed law affects, from which date, with live checks of pending bills.", info: "watch" as const, icon: "pulse" },
  { href: "/byo", t: "Bring your own", d: "Paste a new law and watch it go through the same steps, or check your own list of addresses.", info: "byo" as const, icon: "upload" },
];

const FAQ = [
  { q: "Is this legal advice?", a: "No. It shows what the law says and where it comes from. For advice about your situation, contact a legal aid office or a tenant rights group. The Learn page lists them." },
  { q: "Where does the law text come from?", a: "From official state and city sources collected for this project, each with its web address and the date it was retrieved. A few public pages listed only as links were retrieved once by Proofline and are labeled that way." },
  { q: "Why does it sometimes say \"Not sure yet\"?", a: "Some rules depend on facts that public records do not include, like the exact date a building was approved for people to live in. We tell you which fact and how to find it, instead of guessing. You can answer it on the page and watch every result update." },
  { q: "Does it use AI?", a: "Yes, once: to read the law and turn it into rules that can be tested. A second AI pass and a script then check every rule against the source. Every answer you see is computed from those tested rules, the same way every time." },
  { q: "Which places are covered?", a: "California (Los Angeles, San Francisco, San Diego, Berkeley, Santa Ana), New Jersey (Jersey City, Hoboken, Newark) and Massachusetts (Boston, Cambridge), plus Bayonne, NJ, added live during the event." },
  { q: "How current is it?", a: "Every answer shows an \"as of\" date, and you can pick a different date to see what applied before or what is about to change." },
];

function Icon({ name }: { name: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>;
    case "shield": return <svg {...p}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "pulse": return <svg {...p}><path d="M3 12h4l2-5 4 10 2-5h6" /></svg>;
    default: return <svg {...p}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 20h16" /></svg>;
  }
}

export default function Home() {
  const m = METRICS;
  return (
    <div>
      <section className="hero-bg border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-14 pt-14 lg:grid-cols-[1.15fr_1fr] lg:pb-20 lg:pt-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Housing law, at the level of one address</p>
              <Link href="/judges" className="rounded-full border border-border-2 bg-surface px-3 py-1 text-[13px] font-semibold text-brand hover:bg-surface-2">Judging? Start here: 3 minutes &rarr;</Link>
            </div>
            <h1 className="mt-3 text-[40px] font-bold leading-[1.05] sm:text-[56px]">
              Which housing laws <span className="gradient-text">protect this home?</span>
            </h1>
            <p className="mt-5 max-w-xl text-[19px] leading-relaxed text-text-2">
              Type an address. Proofline shows the rules that apply today, proves each one with the law&apos;s own words, and tells you
              the one fact to check when it is not sure.
            </p>
            <div className="mt-7 max-w-xl">
              <AddressSearch index={addressIndex()} />
            </div>
            <p className="mt-6 text-[14px] font-medium text-muted">Or start with one of these</p>
            <div className="mt-2 max-w-xl"><SampleChips /></div>
          </div>
          <ol className="grid content-start gap-3" aria-label="How it works in three steps">
            {STEPS.map((s) => (
              <li key={s.n} className="card flex gap-4 p-5">
                <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[16px] font-bold text-brand">{s.n}</span>
                <div>
                  <p className="text-[18px] font-semibold">{s.t}</p>
                  <p className="mt-1 text-[15.5px] leading-relaxed text-muted">{s.d}</p>
                </div>
              </li>
            ))}
            <li className="card bg-surface-2 p-5">
              <dl className="grid grid-cols-3 gap-3">
                {[
                  { v: String(m.negative_control.invented_applies), l: "invented rules", k: "metric.neg" as const },
                  { v: `${Math.round(m.extraction.quote_rate * 100)}%`, l: "quotes verified", k: "metric.cite" as const },
                  { v: `${m.addresses.total}`, l: "addresses", k: "metric.addresses" as const },
                ].map((x) => (
                  <div key={x.l} className="kpi">
                    <dd className="kpi-value text-[32px]">{x.v}</dd>
                    <dt className="kpi-label flex items-center">{x.l} <InfoButton k={x.k} /></dt>
                  </div>
                ))}
              </dl>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="what-h">
        <p className="eyebrow">What you can do</p>
        <h2 id="what-h" className="mt-2 text-[30px] font-bold">Four things, one engine</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className="card card-hover group flex gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name={f.icon} /></span>
              <div className="min-w-0">
                <p className="flex items-center text-[19px] font-semibold">{f.t} <InfoButton k={f.info} label={f.t} /></p>
                <p className="mt-1 text-[15.5px] leading-relaxed text-muted">{f.d}</p>
                <p className="mt-3 text-[14.5px] font-semibold text-brand">Open <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-2" aria-labelledby="trust-h">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="eyebrow">Why you can trust it</p>
          <h2 id="trust-h" className="mt-2 text-[30px] font-bold">Every number below is computed, not typed</h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: String(m.negative_control.invented_applies), l: `invented rules in ${m.negative_control.checks.toLocaleString()} checks where the right answer is "no rule" or "not law"`, k: "metric.neg" as const },
              { v: `${Math.round(m.extraction.quote_rate * 100)}%`, l: `of ${m.extraction.rules} rules backed by a quote found word for word in the source`, k: "metric.cite" as const },
              { v: `${Math.round(m.citations.share * 100)}%`, l: `of "protects you" answers quote the organizers' official corpus text`, k: "source" as const },
              { v: `${m.addresses.total}`, l: `addresses placed in their legal city, ${m.addresses.geocoded} by the US Census Geocoder`, k: "metric.addresses" as const },
            ].map((x) => (
              <div key={x.l} className="card kpi p-6">
                <dd className="kpi-value">{x.v}</dd>
                <dt className="kpi-label flex items-start"><span>{x.l}</span><InfoButton k={x.k} /></dt>
              </div>
            ))}
          </dl>
          <Link href="/how-it-works" className="btn btn-secondary mt-8">See how it works and check it yourself</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="prob-h">
        <p className="eyebrow">Why it matters</p>
        <h2 id="prob-h" className="mt-2 text-[30px] font-bold">Renters face the law alone</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { v: "3% vs 81%", d: "Share of tenants vs landlords with a lawyer in eviction cases, US average.", s: "NCCRC via NLIHC, 2023", u: "https://nlihc.org/sites/default/files/2023-03/2023AG7-04_Right-to-Counsel.pdf" },
            { v: "43%", d: "of rent-controlled tenants in Berkeley did not know their own rent control status.", s: "Berkeley Rent Board, 2022", u: "https://rentboard.berkeleyca.gov/sites/default/files/documents/2022%20Tenant%20Survey%20Presentation%20and%20Results.pdf" },
            { v: "17 to 33%", d: "of answers from leading legal AI research tools were wrong or wrongly cited in a Stanford study.", s: "Magesh et al., J. Empirical Legal Stud., 2025", u: "https://onlinelibrary.wiley.com/doi/full/10.1111/jels.12413" },
          ].map((x) => (
            <li key={x.v} className="card p-6">
              <p className="kpi-value text-[34px]">{x.v}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-text-2">{x.d}</p>
              <a className="mt-3 inline-block text-[14px] font-medium text-brand underline-offset-4 hover:underline" href={x.u} target="_blank" rel="noreferrer">{x.s}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16" aria-labelledby="faq-h">
        <h2 id="faq-h" className="text-[30px] font-bold">Questions</h2>
        <div className="card mt-6 divide-y divide-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold">
                {f.q}
                <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
