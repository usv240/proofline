// GET /api/lookup?address=A0016&as_of=2026-10-01
import { addressBundle } from "@/lib/data";
import { decidingFactForAddress, jurisdictionStack, lookupAddress } from "@/lib/engine/lookup";

const H = { "X-Not-Legal-Advice": "true" };

export async function GET(req: Request) {
  const u = new URL(req.url).searchParams;
  const id = u.get("address") ?? "";
  const asOf = /^\d{4}-\d{2}-\d{2}$/.test(u.get("as_of") ?? "") ? u.get("as_of")! : "2026-10-01";
  const b = addressBundle(id);
  if (!b) return Response.json({ message: "Unknown address id. Use a sample id such as A0016.", disclaimer: "Not legal advice." }, { status: 404, headers: H });
  const results = lookupAddress(b.rules, b.address, asOf);
  return Response.json(
    {
      address: b.address,
      as_of: asOf,
      jurisdiction_stack: jurisdictionStack(b.address),
      results: results.map((r) => {
        const rule = b.rules.find((x) => x.team_rule_id === r.team_rule_id)!;
        return { ...r, title: rule.title, category: rule.category, citation: rule.citation, quoted_span: rule.quoted_span, source_url: rule.source_url, retrieved_at: rule.x_retrieved_at };
      }),
      no_rule_findings: b.noRule,
      deciding_fact: decidingFactForAddress(b.rules, b.address, asOf, results),
      disclaimer: "Not legal advice.",
    },
    { headers: H },
  );
}
