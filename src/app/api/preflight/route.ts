// POST /api/preflight  { address, as_of?, action, facts? }
import { addressBundle } from "@/lib/data";
import { preflight, type Action, type RuleWithParams } from "@/lib/engine/preflight";

const H = { "X-Not-Legal-Advice": "true" };
const KINDS = ["rent_increase", "security_deposit", "application_fee", "pricing_tool"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const b = addressBundle(String(body?.address ?? ""));
  if (!b) return Response.json({ message: "Unknown address id.", disclaimer: "Not legal advice." }, { status: 404, headers: H });
  const action = body?.action as Action | undefined;
  if (!action || !KINDS.includes(action.kind)) {
    return Response.json({ message: `action.kind must be one of ${KINDS.join(", ")}. Proofline only checks whether a change fits the rules; it does not suggest ways around them.`, disclaimer: "Not legal advice." }, { status: 400, headers: H });
  }
  const asOf = /^\d{4}-\d{2}-\d{2}$/.test(body?.as_of ?? "") ? body.as_of : "2026-10-01";
  const f = { ...b.address };
  if (typeof body?.facts?.units === "number") f.units = { min: body.facts.units, max: body.facts.units, source: "user" };
  if (typeof body?.facts?.year_built === "number") f.year_built = body.facts.year_built;
  if (typeof body?.facts?.owner_occupied === "boolean") f.user = { owner_occupied: body.facts.owner_occupied };
  return Response.json(preflight(b.rules as RuleWithParams[], f, asOf, action), { headers: H });
}
