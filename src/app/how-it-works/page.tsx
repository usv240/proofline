import Link from "next/link";
import { InfoButton } from "@/components/InfoButton";
import { VerifyButton } from "@/components/VerifyButton";
import { EXTENSION_PLACES, METRICS, RULES, SOURCES } from "@/lib/data";

export const metadata = { title: "How it works | Proofline" };

const PIPELINE = [
  { t: "Read", d: "Claude reads each law document once and writes candidate rules in a fixed format, each with an exact quote and testable coverage conditions.", ai: true },
  { t: "Check quotes", d: "A script confirms every quote appears word for word in the source. Rules without a found quote are rejected.", ai: false },
  { t: "Second check", d: "A separate pass tries to disprove each rule from the document alone: wrong date, wrong status, wrong number, wrong place.", ai: true },
  { t: "Merge", d: "The same law found in several sources becomes one rule. A later source showing a law was passed outranks an earlier draft.", ai: false },
  { t: "Test", d: "Each rule's coverage test runs on each building's facts with three answers: yes, no, or not sure. Missing facts never count as no.", ai: false },
  { t: "Answer", d: "Results for any address and any date come from code. The same engine runs in your browser.", ai: false },
];

export default function HowItWorks() {
  const m = METRICS;
  const pct = (a: number, b: number) => `${Math.round((a / b) * 100)}%`;
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-[32px] font-semibold">How it works</h1>
      <p className="mt-2 max-w-3xl text-[18px] text-muted">
        The AI reads the law once. After that, every answer comes from tested code, not from a chatbot. Every number on this page is
        produced by a script from the published data.
      </p>

      <section className="mt-8" aria-labelledby="pipe-h">
        <h2 id="pipe-h" className="text-[24px] font-semibold">From law text to an answer</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {PIPELINE.map((p, i) => (
            <li key={p.t} className="rounded-xl border border-border p-4">
              <p className="flex items-center gap-2 font-semibold">
                <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[14px] text-brand-ink">{i + 1}</span>
                {p.t}
                <span className="ml-auto rounded-md px-2 py-0.5 text-[12px]" style={{ background: p.ai ? "var(--sup-bg)" : "var(--ok-bg)", color: p.ai ? "var(--sup-fg)" : "var(--ok-fg)" }}>{p.ai ? "AI step" : "Code step"}</span>
              </p>
              <p className="mt-2 text-[15px] text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-5" aria-labelledby="ai-h">
        <h2 id="ai-h" className="flex items-center text-[22px] font-semibold">Proof it is not a chatbot <InfoButton k="ai" /></h2>
        <p className="mt-2">
          Address lookups and Pre-Flight checks make no AI calls at all: they run from the published rules, in your browser. Turn off your
          internet after this page loads and change the date on any address: the answers still update. The AI is only used to read new law
          text, in the pipeline and in Bring your own.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="num-h">
        <h2 id="num-h" className="text-[24px] font-semibold">Measured results</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { k: "metric.neg" as const, l: "Invented rules", v: `${m.negative_control.invented_applies} in ${m.negative_control.checks.toLocaleString()}`, s: "checks where the right answer is \"no rule\", \"not law yet\" or \"failed\"" },
            { k: "metric.cite" as const, l: "Quotes found in the source", v: pct(m.extraction.quotes_verified, m.extraction.rules), s: `${m.extraction.quotes_verified} of ${m.extraction.rules} rules` },
            { k: "source" as const, l: "Answers backed by the official pack", v: pct(m.citations.official_pack, m.citations.applies), s: `${m.citations.official_pack.toLocaleString()} of ${m.citations.applies.toLocaleString()} "Protects you" answers quote the organizers' corpus text; the rest quote city codes the pack lists only as links, labeled "Fetched by Proofline"` },
            { k: "source" as const, l: "Candidates rejected", v: String(m.extraction.rejected), s: `of ${m.extraction.candidates} candidate rules read from ${m.documents.with_text} documents` },
            { k: "metric.addresses" as const, l: "Addresses in their legal city", v: `${m.addresses.total}`, s: `${m.addresses.geocoded} by Census Geocoder, ${m.addresses.fallback} by mailing city` },
            { k: "watch.radius" as const, l: "Change cases run", v: String(Object.keys(m.change_tests).length), s: Object.entries(m.change_tests).map(([k, v]) => `${k}: ${v.affected}`).join(", ") },
            { k: "audit" as const, l: "Audit log", v: m.audit?.ok ? "Intact" : "Check", s: `${m.audit?.entries ?? 0} recorded steps` },
          ].map((x) => (
            <div key={x.l} className="rounded-xl border border-border p-4">
              <dt className="flex items-center text-[15px] text-muted">{x.l} <InfoButton k={x.k} /></dt>
              <dd className="mt-1 text-[28px] font-semibold tabular">{x.v}</dd>
              <dd className="text-[14px] text-muted">{x.s}</dd>
            </div>
          ))}
        </dl>
      </section>

      {m.baseline && (
        <section className="mt-8" aria-labelledby="base-h">
          <h2 id="base-h" className="text-[24px] font-semibold">Compared with the obvious alternative</h2>
          <p className="mt-1 max-w-3xl text-muted">
            The same model, given the same law documents through search, asked the same questions in plain language with a request to cite.
            Questions come from places and topics where no rule is in force, and from buildings whose coverage depends on a missing fact.
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-surface text-muted"><tr><th className="p-3">Measure</th><th className="p-3">AI plus search</th><th className="p-3">Proofline</th></tr></thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Said a rule is in force where none is ({m.baseline.questions.no_rule} questions)</td><td className="p-3 tabular">{m.baseline.baseline.invented_in_force} ({Math.round((m.baseline.baseline.invented_in_force / m.baseline.questions.no_rule) * 100)}%)</td><td className="p-3 tabular font-semibold">{m.baseline.proofline.invented_in_force}</td></tr>
                <tr className="border-t border-border"><td className="p-3">Quotes not found in the sources</td><td className="p-3 tabular">{m.baseline.baseline.quotes_not_found} of {m.baseline.baseline.quotes}</td><td className="p-3 tabular font-semibold">{m.baseline.proofline.quotes_not_found} of {m.baseline.proofline.quotes}</td></tr>
                <tr className="border-t border-border"><td className="p-3">Gave yes or no where a fact is missing ({m.baseline.questions.unknown_coverage} questions)</td><td className="p-3 tabular">{m.baseline.baseline.confident_on_unknown}</td><td className="p-3 tabular font-semibold">{m.baseline.proofline.confident_on_unknown}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[14px] text-muted">Method: {m.baseline.method} Full answers: out/eval_baseline.json in the repository.</p>
        </section>
      )}

      <section className="mt-8" aria-labelledby="lim-h">
        <h2 id="lim-h" className="flex items-center text-[24px] font-semibold">Measured limits <InfoButton k="missing" /></h2>
        <p className="mt-1 text-muted">Where public records leave out facts, answers say &ldquo;Not sure yet&rdquo;. This is how often, by city, as of {m.as_of}.</p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface text-muted"><tr><th className="p-3">Place</th><th className="p-3">Not sure yet</th><th className="p-3">Share of answers</th></tr></thead>
            <tbody>
              {Object.entries(m.unknown_by_city).sort((a, b) => b[1].unknown / b[1].total - a[1].unknown / a[1].total).map(([k, v]) => (
                <tr key={k} className="border-t border-border"><td className="p-3">{k}</td><td className="p-3 tabular">{v.unknown} of {v.total}</td><td className="p-3 tabular">{pct(v.unknown, v.total)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="scale" className="mt-8 rounded-2xl border border-border p-5" aria-labelledby="scale-h">
        <h2 id="scale-h" className="text-[22px] font-semibold">Adding a new place takes one command</h2>
        <p className="mt-1">
          Bayonne, New Jersey was not in the challenge. We added it during the event from the city&apos;s own published rent control ordinance
          (a 28-page PDF), with the same pipeline and no hand-written rules:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-surface p-3 text-[13px]">npm run new-law -- --file Rent-Control-Ordinance-2023.pdf --place &quot;Bayonne, NJ&quot; --real</pre>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-[15px]">
          {RULES.filter((r) => EXTENSION_PLACES.includes(r.jurisdiction)).map((r) => (
            <li key={r.team_rule_id}>{r.team_rule_id}: {r.title} <span className="text-muted">({r.citation}{r.key_value ? `; ${r.key_value}` : ""})</span></li>
          ))}
        </ul>
        <p className="mt-3 text-[15px] text-muted">
          Read, quote-checked and second-checked in about 75 seconds. Type any Bayonne address in the search box to see it alongside New Jersey state law.
          Places added this way are kept out of the challenge submission files, which cover the 13 places in the brief.
        </p>
      </section>

      <section id="audit" className="mt-8 rounded-2xl border border-border p-5" aria-labelledby="aud-h">
        <h2 id="aud-h" className="flex items-center text-[22px] font-semibold">Check it yourself <InfoButton k="audit" /></h2>
        <p className="mt-1 text-muted">Re-checks the audit log chain and finds every rule&apos;s quote in its source again, on the server, now.</p>
        <div className="mt-3"><VerifyButton /></div>
        <p className="mt-3 text-[15px]">From the repository: <code>npm run verify</code> does the same from the command line.</p>
      </section>

      <section id="api" className="mt-8" aria-labelledby="api-h">
        <h2 id="api-h" className="text-[24px] font-semibold">API and MCP</h2>
        <p className="mt-1 text-muted">Other tools, like a legal aid chatbot, can use the same answers. Every response says &ldquo;Not legal advice.&rdquo;</p>
        <ul className="mt-3 space-y-2 font-mono text-[14px]">
          <li className="rounded-lg bg-surface p-3">GET /api/lookup?address=A0016&amp;as_of=2026-10-01</li>
          <li className="rounded-lg bg-surface p-3">POST /api/preflight {"{"} &quot;address&quot;: &quot;A0016&quot;, &quot;action&quot;: {"{"} &quot;kind&quot;: &quot;rent_increase&quot;, &quot;current_rent&quot;: 2000, &quot;new_rent&quot;: 2100 {"}"} {"}"}</li>
          <li className="rounded-lg bg-surface p-3">GET /api/audit/verify</li>
          <li className="rounded-lg bg-surface p-3">MCP server: npm run mcp (tools: lookup_address, preflight_check, list_changes)</li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="src-h">
        <h2 id="src-h" className="flex items-center text-[24px] font-semibold">Sources ({SOURCES.length}) <InfoButton k="source" /></h2>
        <div className="mt-3 max-h-[28rem] overflow-auto rounded-xl border border-border">
          <table className="w-full text-left text-[14px]">
            <thead className="sticky top-0 bg-surface text-muted"><tr><th className="p-2">ID</th><th className="p-2">Place</th><th className="p-2">Kind</th><th className="p-2">Rules</th><th className="p-2">Link</th></tr></thead>
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.doc_id} className="border-t border-border">
                  <td className="p-2 font-medium">{s.doc_id}</td>
                  <td className="p-2">{s.jurisdiction}</td>
                  <td className="p-2">{s.kind === "official_corpus" ? "Official pack" : s.kind === "fetched_link_only" ? "Fetched by Proofline" : "Not available (site blocked automated access)"}</td>
                  <td className="p-2">{s.rules.join(", ") || "-"}</td>
                  <td className="p-2"><a className="text-brand underline" href={s.url} target="_blank" rel="noreferrer">open</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[15px]"><Link className="text-brand underline underline-offset-2" href="/data">Download all outputs</Link></p>
      </section>
    </div>
  );
}
