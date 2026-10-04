import { METRICS, RULES } from "@/lib/data";

export const metadata = { title: "Method note | Proofline" };

// The one-page method note requested in the RealPage participant guide (v5). Printable to a single page.
export default function MethodNote() {
  const m = METRICS;
  const inScope = RULES.filter((r) => r.jurisdiction !== "Bayonne, NJ").length;
  return (
    <article className="method mx-auto max-w-[820px] px-6 py-8 text-[13.5px] leading-[1.5] text-text print:px-0 print:py-0 print:text-[10.2px]">
      <style>{`@page { size: Letter; margin: 0.5in; } @media print { .method h2 { margin-top: 6px !important; } }`}</style>
      <header className="flex items-baseline justify-between border-b border-border pb-2">
        <div>
          <h1 className="text-[22px] font-bold print:text-[17px]">Proofline: method note</h1>
          <p className="text-muted">RealPage challenge, Rental Housing Law Navigator · Hack-Nation 7th Global AI Hackathon · as of 2026-10-01 · Not legal advice</p>
        </div>
        <p className="text-right text-muted">proofline-opal.vercel.app<br />github.com/usv240/proofline</p>
      </header>

      <h2 className="mt-3 font-bold">What it does</h2>
      <p>Reads the supplied housing-law corpus, turns each rule into a structured record with a machine-testable coverage condition and an exact quote, resolves any address to its legal city, tests every rule against the building on a chosen date, and reports which addresses each law change affects. Every answer cites its source, its retrieval date and the law&apos;s own words; when coverage depends on a fact the records lack, the answer is &ldquo;unknown&rdquo; with the deciding fact named.</p>

      <h2 className="mt-3 font-bold">Pipeline (Module A)</h2>
      <ol className="list-decimal pl-5">
        <li><strong>Read</strong> (Claude Opus 5.5 for the corpus, Sonnet 5.5 for laws pasted live; structured outputs): one call per document returns rule records in the official schema plus a coverage test over a closed set of facts (units, year built, building type, owner occupancy, subsidy, tenancy length).</li>
        <li><strong>Check quotes</strong> (code): every quote must be found word for word in the source; the stored span is copied from the source, never from the model. No quote, no rule.</li>
        <li><strong>Second check</strong> (independent model pass): tries to refute each record from the document alone; refuted records are dropped, partial ones corrected with lower confidence.</li>
        <li><strong>Reconcile and assemble</strong> (model grouping, deterministic merge): the same law found in several documents becomes one record; status is computed from lifecycle dates (enacted, effective, struck), never typed; conflicting published dates are kept and flagged.</li>
        <li><strong>Re-anchor</strong>: rules first read from link-only pages are re-cited to official corpus text wherever it states the same rule ({Math.round(m.citations.share * 100)}% of &ldquo;applies&rdquo; answers quote the supplied corpus).</li>
      </ol>

      <h2 className="mt-3 font-bold">Address lookup (Module B)</h2>
      <p>All {m.addresses.total} addresses resolved to their incorporated place ({m.addresses.geocoded} by US Census Geocoder coordinates, {m.addresses.fallback} by mailing city). Unit counts come from the assessor column, NJ MOD-IV descriptions (&ldquo;3S-F-D-6U&rdquo; = 6) or official use bands. Coverage uses Kleene three-valued logic: a missing fact gives &ldquo;unknown&rdquo;, never &ldquo;no&rdquo;; a building finished in a certificate-of-occupancy cutoff year is &ldquo;unknown&rdquo;. A state rule that yields to local law is &ldquo;superseded&rdquo; where the local rule applies; tenant-level conditions (tenancy length) are stated on the answer rather than blocking building coverage.</p>

      <h2 className="mt-3 font-bold">Change tracking (Module C)</h2>
      <p>As-of evaluation from lifecycle dates. T1 {m.change_tests.T1?.affected} CA addresses; T2 Jersey City 50 and Hoboken 40, Newark 0; T3 {m.change_tests.T3?.affected} NJ addresses with {m.change_tests.T3?.conflicts} conflict flags; T4 {m.change_tests.T4?.affected} MA addresses as pending; T5 empty. New laws run through the same pipeline with one command; Bayonne, NJ was added live from its official ordinance to show this (kept out of the submission files).</p>

      <h2 className="mt-3 font-bold">Results and validation</h2>
      <ul className="list-disc pl-5">
        <li>{inScope} rules in the 13 places in scope, every one with its quote found word for word in its source; {m.documents.with_text} of {m.documents.manifest} manifest documents read.</li>
        <li>Negative control: <strong>{m.negative_control.invented_applies} &ldquo;applies&rdquo; answers in {m.negative_control.checks.toLocaleString()} checks</strong> where the right answer is no rule, failed, or not law yet.</li>
        {m.baseline && <li>Baseline (same model, BM25 search over the same corpus): claimed an in-force rule in {m.baseline.baseline.invented_in_force} of {m.baseline.questions.no_rule} no-rule questions and gave {m.baseline.baseline.quotes_not_found} quote(s) not in the sources; Proofline 0 and 0.</li>}
        <li>32 automated checks, including golden checks taken only from the organizers&apos; statements (brief example, README cutoffs, T1 to T5). They caught two real bugs during the event, both fixed. <code>npm run verify</code> re-checks the hash-chained audit log, every quote, and that the engine reproduces lookups.json.</li>
      </ul>

      <h2 className="mt-3 font-bold">Responsible design and limits</h2>
      <p>Not legal advice on every page, API response and export. Pre-Flight answers only allowed, not allowed or needs a person and never suggests ways around a rule. New or changed laws are proposals until a person approves them. Measured limits: about {Math.round(((m.results.unknown ?? 0) / Object.values(m.results).reduce((a, b) => a + b, 0)) * 100)}% of answers are &ldquo;unknown&rdquo; because public records omit year built (San Diego, Berkeley) or unit counts (Berkeley, Jersey City, Newark, Boston); {100 - Math.round(m.citations.share * 100)}% of &ldquo;applies&rdquo; answers quote link-only pages (Hoboken, Newark, the Jersey City ban, the LA source-of-income article), labeled as such; owner facts are never in public data.</p>

      <h2 className="mt-3 font-bold">Scalability</h2>
      <p>A new place or law is one command (<code>npm run new-law</code>): read, check, merge, test, publish, verify. The engine is shared by the pipeline, the web app (it runs in the browser, no model calls at answer time), the public API with keys, and an MCP server.</p>
    </article>
  );
}
