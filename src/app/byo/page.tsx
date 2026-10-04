import { ByoAddresses } from "@/components/ByoAddresses";
import { ByoLaw } from "@/components/ByoLaw";
import { InfoButton } from "@/components/InfoButton";
import { PLACES, RULES } from "@/lib/data";

export const metadata = { title: "Bring your own | Proofline" };

export default function ByoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="flex items-center text-[32px] font-semibold">Bring your own <InfoButton k="byo" /></h1>
      <p className="mt-1 max-w-3xl text-muted">
        Test Proofline on data we did not prepare. Paste a new law and watch it go through the same steps as every other document,
        or check your own list of addresses.
      </p>

      <section className="mt-8 rounded-2xl border border-border p-5 sm:p-6" aria-labelledby="law-h">
        <h2 id="law-h" className="text-[24px] font-semibold">1. Paste a new law</h2>
        <p className="mt-1 text-muted">
          Proofline reads it, checks every quote against your text, double-checks each rule with a second pass, and shows every sample home it would
          affect and from when. The result is a proposal for a person to approve.
        </p>
        <div className="mt-4"><ByoLaw places={PLACES} /></div>
      </section>

      <section className="mt-8 rounded-2xl border border-border p-5 sm:p-6" aria-labelledby="addr-h">
        <h2 id="addr-h" className="text-[24px] font-semibold">2. Check your own addresses</h2>
        <div className="mt-3"><ByoAddresses rules={RULES} /></div>
      </section>
    </div>
  );
}
