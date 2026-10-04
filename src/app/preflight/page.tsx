import { AddressSearch } from "@/components/AddressSearch";
import { InfoButton } from "@/components/InfoButton";
import { PreflightForm } from "@/components/PreflightForm";
import { SampleChips } from "@/components/SampleChips";
import { addressBundle, addressIndex } from "@/lib/data";
import type { RuleWithParams } from "@/lib/engine/preflight";

export const metadata = { title: "Rent Pre-Flight | Proofline" };

export default async function PreflightPage(props: PageProps<"/preflight">) {
  const sp = await props.searchParams;
  const id = typeof sp.address === "string" ? sp.address : null;
  const kind = typeof sp.kind === "string" ? sp.kind : undefined;
  const bundle = id ? addressBundle(id) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="eyebrow">Before it happens</p>
      <h1 className="mt-1 flex items-center text-[34px] font-bold">Rent Pre-Flight <InfoButton k="pf.form" /></h1>
      <p className="mt-2 max-w-3xl text-[17px] text-text-2">
        Check a rent increase, deposit, application fee or pricing software against every rule for one address, before it happens.
        You get <strong>Allowed</strong>, <strong>Not allowed</strong> with the law&apos;s words, or <strong>Needs a person</strong> with the missing fact.
      </p>
      <div className="mt-6 max-w-2xl"><AddressSearch index={addressIndex()} target="/preflight" compact /></div>
      {bundle ? (
        <div className="mt-6">
          <p className="mb-4 text-[17px]">
            Checking <strong>{bundle.address.street_address}</strong>, {bundle.address.city}, {bundle.address.state}
          </p>
          <PreflightForm address={bundle.address} rules={bundle.rules as RuleWithParams[]} initialKind={kind} />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="font-medium">Pick an address to start:</p>
          <SampleChips target="/preflight" />
        </div>
      )}
    </div>
  );
}
