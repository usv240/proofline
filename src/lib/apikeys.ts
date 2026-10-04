// API keys without a database: each key is a signed token. The server verifies the signature with a secret
// and reads the key's id, tier and expiry from the token itself. Revocation: rotate the secret, or add an id
// to the denylist below. Usage limits are enforced per key id in memory (best effort per instance), which is
// honest for a prototype and stated on the developers page.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export type Tier = "free";
export interface KeyClaims { id: string; tier: Tier; label: string; iat: number; exp: number }

const DENYLIST = new Set<string>();
const PREFIX = "pl_live_";

function secret(): string {
  const s = process.env.PROOFLINE_KEY_SECRET;
  if (!s || s.length < 16) throw new Error("PROOFLINE_KEY_SECRET is not set (at least 16 characters).");
  return s;
}
const b64 = (b: Buffer) => b.toString("base64url");
const sign = (payload: string) => b64(createHmac("sha256", secret()).update(payload).digest()).slice(0, 32);

export function issueKey(label: string, days = 365): { key: string; claims: KeyClaims } {
  const now = Math.floor(Date.now() / 1000);
  const claims: KeyClaims = { id: b64(randomBytes(9)), tier: "free", label: label.slice(0, 60), iat: now, exp: now + days * 86400 };
  const payload = b64(Buffer.from(JSON.stringify(claims)));
  return { key: `${PREFIX}${payload}.${sign(payload)}`, claims };
}

export function verifyKey(key: string | null | undefined): { ok: true; claims: KeyClaims } | { ok: false; reason: string } {
  if (!key) return { ok: false, reason: "missing" };
  if (!key.startsWith(PREFIX)) return { ok: false, reason: "malformed" };
  const [payload, sig] = key.slice(PREFIX.length).split(".");
  if (!payload || !sig) return { ok: false, reason: "malformed" };
  const want = sign(payload);
  if (want.length !== sig.length || !timingSafeEqual(Buffer.from(want), Buffer.from(sig))) return { ok: false, reason: "bad signature" };
  let claims: KeyClaims;
  try { claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")); } catch { return { ok: false, reason: "malformed" }; }
  if (claims.exp < Date.now() / 1000) return { ok: false, reason: "expired" };
  if (DENYLIST.has(claims.id)) return { ok: false, reason: "revoked" };
  return { ok: true, claims };
}

export function keyFromRequest(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return req.headers.get("x-api-key");
}

/** Same-origin browser calls from the Proofline site itself do not need a key. */
export function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  const origin = req.headers.get("origin") ?? req.headers.get("referer");
  if (!host || !origin) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

// Fixed-window limits per subject (key id or IP). In-memory, per server instance.
const windows = new Map<string, { n: number; reset: number }>();
export const LIMITS = {
  anonymous: { lookup_per_minute: 30 },
  free: { lookup_per_minute: 120, byo_reads_per_day: 500 },
};
export function takeToken(subject: string, limit: number, windowMs: number): { ok: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const w = windows.get(subject);
  if (!w || w.reset < now) {
    windows.set(subject, { n: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, reset: now + windowMs };
  }
  w.n += 1;
  return { ok: w.n <= limit, remaining: Math.max(0, limit - w.n), reset: w.reset };
}

export function rateHeaders(r: { remaining: number; reset: number }, limit: number) {
  return { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": String(r.remaining), "X-RateLimit-Reset": String(Math.ceil(r.reset / 1000)), "X-Not-Legal-Advice": "true" };
}
