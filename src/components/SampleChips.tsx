import Link from "next/link";

// Curated examples that show the range of answers in one click each.
export const SAMPLES = [
  { id: "A0016", label: "3515 Fillmore St, San Francisco", why: "Older building: city rent control applies" },
  { id: "A0008", label: "1065 Summit Ave, Jersey City", why: "City rent control and a local ban on rent-setting software" },
  { id: "A0015", label: "15 Everett St, Cambridge", why: "No rent cap here, and we show why" },
  { id: "A0107", label: "Built in 1978, Los Angeles", why: "Right at the rent control cutoff: we say Not sure yet" },
];

export function SampleChips({ target = "/check" }: { target?: string }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {SAMPLES.map((s) => (
        <li key={s.id}>
          <Link href={`${target}?address=${s.id}`} className="block h-full rounded-xl border border-border bg-bg p-3 hover:border-brand hover:bg-surface">
            <span className="block font-medium">{s.label}</span>
            <span className="block text-[15px] text-muted">{s.why}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
