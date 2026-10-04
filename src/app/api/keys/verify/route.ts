// GET /api/keys/verify with Authorization: Bearer <key> -> is this key valid, and what are its limits.
import { keyFromRequest, LIMITS, verifyKey } from "@/lib/apikeys";

export async function GET(req: Request) {
  if (!process.env.PROOFLINE_KEY_SECRET) return Response.json({ ok: false, reason: "keys not configured" }, { status: 503 });
  const v = verifyKey(keyFromRequest(req));
  if (!v.ok) return Response.json({ ok: false, reason: v.reason }, { status: 401 });
  return Response.json({ ok: true, id: v.claims.id, label: v.claims.label, tier: v.claims.tier, expires: new Date(v.claims.exp * 1000).toISOString().slice(0, 10), limits: LIMITS.free, disclaimer: "Not legal advice." });
}
