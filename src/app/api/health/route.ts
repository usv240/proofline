// GET /api/health: what is up, what is degraded, and which data version is being served.
import { METRICS } from "@/lib/data";

export const revalidate = 0;

async function probe(url: string, init?: RequestInit) {
  const t = Date.now();
  try {
    const r = await fetch(url, { ...init, signal: AbortSignal.timeout(6000) });
    return { ok: r.ok, status: r.status, ms: Date.now() - t };
  } catch {
    return { ok: false, status: 0, ms: Date.now() - t };
  }
}

export async function GET() {
  const [geocoder] = await Promise.all([
    probe("https://geocoding.geo.census.gov/geocoder/benchmarks?format=json"),
  ]);
  const components = {
    lookups: { ok: true, detail: "Static rule set, runs without network or model calls." },
    census_geocoder: { ok: geocoder.ok, detail: `${geocoder.status || "no answer"} in ${geocoder.ms} ms (live address search only)` },
    law_reader: { ok: !!process.env.ANTHROPIC_API_KEY, detail: process.env.ANTHROPIC_API_KEY ? "Configured (Bring your own law)" : "Not configured: Bring your own law is paused; everything else works" },
    api_keys: { ok: !!process.env.PROOFLINE_KEY_SECRET, detail: process.env.PROOFLINE_KEY_SECRET ? "Key issuing enabled" : "Not configured" },
    legiscan: { ok: !!process.env.LEGISCAN_API_KEY, detail: process.env.LEGISCAN_API_KEY ? "Configured" : "Optional, not configured (Law Watch uses the official legislature site)" },
    openstates: { ok: !!process.env.OPENSTATES_API_KEY, detail: process.env.OPENSTATES_API_KEY ? "Configured" : "Optional, not configured" },
  };
  const required = ["lookups", "census_geocoder", "law_reader", "api_keys"] as const;
  const status = required.every((k) => components[k].ok) ? "ok" : components.lookups.ok ? "degraded" : "down";
  return Response.json(
    {
      status,
      checked_at: new Date().toISOString(),
      data: { rules_sha256: METRICS.rules_sha256, generated_at: METRICS.generated_at, as_of: METRICS.as_of, rules: METRICS.extraction.rules, audit_entries: METRICS.audit?.entries ?? 0 },
      components,
      disclaimer: "Not legal advice.",
    },
    { headers: { "Cache-Control": "no-store", "X-Not-Legal-Advice": "true" } },
  );
}
