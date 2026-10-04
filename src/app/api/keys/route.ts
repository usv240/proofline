// POST /api/keys { label } -> a new API key, shown once. No account, no email, nothing stored.
import { isSameOrigin, issueKey, takeToken } from "@/lib/apikeys";

export async function POST(req: Request) {
  if (!process.env.PROOFLINE_KEY_SECRET) return Response.json({ message: "Key issuing is not configured on this server." }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const t = takeToken(`keys:${ip}`, 5, 60 * 60 * 1000);
  if (!t.ok) return Response.json({ message: "Too many keys requested from this network. Try again in an hour." }, { status: 429 });
  if (!isSameOrigin(req)) return Response.json({ message: "Create keys from the Proofline developers page." }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const label = typeof body?.label === "string" && body.label.trim() ? body.label.trim() : "unnamed";
  const { key, claims } = issueKey(label);
  return Response.json({ key, id: claims.id, tier: claims.tier, label: claims.label, expires: new Date(claims.exp * 1000).toISOString().slice(0, 10), disclaimer: "Not legal advice." });
}
