import Link from "next/link";
import { AddressResult } from "@/components/AddressResult";
import { AddressSearch } from "@/components/AddressSearch";
import { SampleChips } from "@/components/SampleChips";
import { addressBundle, addressIndex, NO_RULE, RULES } from "@/lib/data";
import { rulesForAddress } from "@/lib/engine/lookup";
import type { AddressFacts } from "@/lib/engine/types";

export const metadata = { title: "Check an address | Proofline" };

export default async function CheckPage(props: PageProps<"/check">) {
  const sp = await props.searchParams;
  const id = typeof sp.address === "string" ? sp.address : null;
  const live = typeof sp.live === "string" ? sp.live : null;
  const asOf = typeof sp.asof === "string" && /^\d{4}-\d{2}-\d{2}$/.test(sp.asof) ? sp.asof : "2026-10-01";

  let bundle = id ? addressBundle(id) : null;
  if (!bundle && live) {
    try {
      const a = JSON.parse(live) as AddressFacts;
      bundle = {
        address: a,
        rules: rulesForAddress(RULES, a),
        noRule: NO_RULE.filter((n) => n.jurisdiction === a.state || n.jurisdiction === `${a.city}, ${a.state}`),
      };
    } catch {
      bundle = null;
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="no-print mb-6">
        <AddressSearch index={addressIndex()} compact />
      </div>
      {bundle ? (
        <>
          <div className="no-print mb-6 rounded-xl border border-border bg-surface p-4 text-[15px]">
            This page shows which rules cover this building on the date you pick. Tap any <strong>i</strong> to learn more.
            Tap <strong>Show proof</strong> to read the law&apos;s own words.
          </div>
          <AddressResult address={bundle.address} rules={bundle.rules} noRule={bundle.noRule} initialAsOf={asOf} />
        </>
      ) : (
        <div className="space-y-4">
          <h1 className="text-[28px] font-semibold">Check an address</h1>
          <p className="text-muted">
            {id ? "We could not find that address in our sample. " : ""}Search the 500 sample addresses, try one of these, or type any address in our 9 cities.
          </p>
          <SampleChips />
          <p className="text-[15px] text-muted">
            Want to check a list of your own addresses? <Link href="/byo" className="text-brand underline underline-offset-2">Bring your own</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
