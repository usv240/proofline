import { METRICS } from "@/lib/data";

export const metadata = { title: "Data | Proofline" };

const FILES = [
  { f: "rules.json", d: "Every extracted rule in the official record format, with citation, source link and exact quote." },
  { f: "lookups.json", d: "Results for all 500 sample addresses as of 2026-10-01: applies, unknown, superseded, not yet effective or pending." },
  { f: "changes.json", d: "Affected addresses and conflict flags for each change case." },
  { f: "no_rule_findings.json", d: "Every place and topic where there is no rule at that level, with the reason." },
  { f: "audit.log.jsonl", d: "Hash-chained record of every pipeline step and its inputs and outputs." },
];

export default function DataPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <p className="eyebrow">Open outputs</p>
      <h1 className="mt-1 text-[34px] font-bold">Data</h1>
      <p className="mt-2 text-muted">
        All outputs are open. Generated {METRICS.generated_at.slice(0, 10)} from {METRICS.documents.with_text} documents. Not legal advice.
      </p>
      <ul className="mt-6 space-y-3">
        {FILES.map((x) => (
          <li key={x.f} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="font-mono font-semibold">{x.f}</p>
              <p className="text-[15px] text-muted">{x.d}</p>
            </div>
            <a href={`/data/${x.f}`} download className="btn btn-secondary">Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
