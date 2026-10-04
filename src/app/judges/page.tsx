import Link from "next/link";
import { METRICS } from "@/lib/data";

export const metadata = { title: "For judges: three minutes | Proofline" };

const TRY = [
  {
    t: "Watch \"not sure\" turn into an answer",
    d: "A Los Angeles building finished in 1978, right at the rent control cutoff. Four rules say \"Not sure yet\". Tap \"Around 1977\" in the yellow panel: every answer on the page recomputes at once.",
    href: "/check?address=A0107",
    cta: "Open the 1978 building",
    why: "Missing facts are named and answerable, never guessed.",
  },
  {
    t: "Catch an illegal rent increase before it happens",
    d: "San Francisco, built 1926. The new rent is filled in at 9% above the old one. Press \"Check this change\": Not allowed, 9% asked, 1.6% limit, with the ordinance's exact words. Then \"Draft a note to send\".",
    href: "/preflight?address=A0016",
    cta: "Open Pre-Flight",
    why: "The only check that runs before harm, not after.",
  },
  {
    t: "Tamper with a receipt",
    d: "On any address page, press \"Get a receipt\", then \"Verify it now\" (the server recomputes the answer), then \"Try a tampered copy\". The altered file is caught.",
    href: "/check?address=A0016",
    cta: "Open an address",
    why: "Every answer can be checked later, by anyone.",
  },
  {
    t: "See what is about to change",
    d: "The New Jersey FAIR Act: 140 homes affected from July 1, 2027, 90 of them with a conflict flag because Jersey City and Hoboken have their own bans. Then press \"Check for changes\" on Law Watch: it reads the live Massachusetts bill history.",
    href: "/watch/T3",
    cta: "Open the FAIR Act",
    why: "Pending, struck and future laws are never reported as in force.",
  },
  {
    t: "Check the numbers yourself",
    d: "Press \"Verify now\": the audit chain is re-hashed and every rule's quote is found again in its source, on the server, now. The table above it compares Proofline with the same AI given search.",
    href: "/how-it-works#audit",
    cta: "Open How it works",
    why: "Nothing on the site is typed by hand.",
  },
];

export default function JudgesPage() {
  const m = METRICS;
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="eyebrow">For judges</p>
      <h1 className="mt-1 text-[36px] font-bold leading-tight">Five things to try in three minutes</h1>
      <p className="mt-3 text-[17px] text-text-2">
        Proofline reads housing law, tests every rule against the building, proves each answer with the law&apos;s own words, and names the one fact
        that would settle the rest. Every link below opens the live system. Not legal advice.
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          { v: String(m.negative_control.invented_applies), l: `invented rules in ${m.negative_control.checks.toLocaleString()} no-rule checks` },
          { v: `${Math.round(m.extraction.quote_rate * 100)}%`, l: "rule quotes found word for word" },
          { v: m.baseline ? `${m.baseline.baseline.invented_in_force} vs 0` : "-", l: "invented rules: AI with search vs Proofline" },
          { v: "5 / 5", l: "change tests (T1 to T5) as specified" },
        ].map((x) => (
          <div key={x.l} className="card kpi p-4">
            <dd className="kpi-value text-[28px]">{x.v}</dd>
            <dt className="kpi-label">{x.l}</dt>
          </div>
        ))}
      </dl>

      <ol className="mt-8 space-y-4">
        {TRY.map((x, i) => (
          <li key={x.t} className="card flex gap-4 p-5 sm:p-6">
            <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[16px] font-bold text-brand">{i + 1}</span>
            <div className="min-w-0">
              <h2 className="text-[19px] font-semibold">{x.t}</h2>
              <p className="mt-1 text-[15.5px] leading-relaxed text-text-2">{x.d}</p>
              <p className="mt-2 text-[14px] text-muted">{x.why}</p>
              <Link href={x.href} className="btn btn-primary mt-3">{x.cta}</Link>
            </div>
          </li>
        ))}
      </ol>

      <section className="panel mt-8 p-6">
        <h2 className="text-[20px] font-bold">If you have one more minute</h2>
        <ul className="mt-2 space-y-1.5 text-[15.5px] text-text-2">
          <li><Link className="text-brand underline underline-offset-4" href="/byo">Bring your own</Link>: paste any ordinance (or the fictional practice one) and watch it go through the full pipeline live.</li>
          <li><Link className="text-brand underline underline-offset-4" href="/developers">Developers</Link>: create an API key in one click and call the same engine.</li>
          <li><Link className="text-brand underline underline-offset-4" href="/how-it-works#scale">A new city added live</Link>: Bayonne, NJ, read from its official ordinance with one command.</li>
          <li><Link className="text-brand underline underline-offset-4" href="/method-note">Method note</Link>: the whole method on one page (also as a <a className="text-brand underline underline-offset-4" href="/proofline-method-note.pdf">PDF</a>).</li>
          <li><a className="text-brand underline underline-offset-4" href="https://github.com/usv240/proofline" target="_blank" rel="noreferrer">Source code</a>: <code>npm test</code> and <code>npm run verify</code> reproduce every number.</li>
        </ul>
      </section>
    </div>
  );
}
