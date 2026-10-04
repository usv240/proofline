// GET /api/lookup?address=A0016&as_of=2026-10-01
import { addressBundle } from "@/lib/data";
import { decidingFactForAddress, jurisdictionStack, lookupAddress } from "@/lib/engine/lookup";
import { keyFromRequest, LIMITS, rateHeaders, takeToken, verifyKey } from "@/lib/apikeys";

const H = { "X-Not-Legal-Advice": "true" };

// Optional API key: anonymous callers get a lower per-minute limit; a valid key gets the free-tier limit.
function gate(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const v = verifyKeySafe(keyFromRequest(req));
  const subject = v ? `key:${v.id}` : `ip:${ip}`;
  const limit = v ? LIMITS.free.lookup_per_minute : LIMITS.anonymous.lookup_per_minute;
  const t = takeToken(subject, limit, 60_000);
  return { ok: t.ok, headers: rateHeaders(t, limit) };
}
function verifyKeySafe(k: string | null) {
  try { const v = verifyKey(k); return v.ok ? v.claims : null; } catch { return null; }
}

export async function GET(req: Request) {
  const g = gate(req);
  if (!g.ok) return Response.json({ message: "Rate limit reached. Add an API key from /developers for a higher limit.", disclaimer: "Not legal advice." }, { status: 429, headers: g.headers });
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
    { headers: { ...H, ...g.headers } },
  );
}
