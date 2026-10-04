import { notFound } from "next/navigation";
import { RightsCard } from "@/components/RightsCard";
import { addressBundle } from "@/lib/data";

export const metadata = { title: "Rights Card | Proofline" };

export default async function CardPage(props: PageProps<"/card/[id]">) {
  const { id } = await props.params;
  const b = addressBundle(id);
  if (!b) notFound();
  return <RightsCard address={b.address} rules={b.rules} noRule={b.noRule} url={`proofline: /check?address=${id}`} />;
}
