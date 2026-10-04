// Bring Your Own law: runs a pasted law through the same pipeline as the corpus (read, check quotes,
// second check), then computes which sample homes it would affect and from when. Nothing is published:
// the result is a proposal for a person to review.
import { createHash } from "node:crypto";
import { ADDRESSES, PLACES, RULES } from "@/lib/data";
import { lookupAddress } from "@/lib/engine/lookup";
import type { Result } from "@/lib/engine/types";
import { extractDocument } from "@/lib/pipeline/extractDoc";
import { toRuleRecords } from "@/lib/pipeline/toRecord";
import { isSameOrigin, keyFromRequest, LIMITS, takeToken, verifyKey } from "@/lib/apikeys";

export const maxDuration = 300;

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 50;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ message: "Reading new laws is paused right now. Every address answer still works." }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  // This endpoint spends model credits, so it needs either a key or a same-origin call from the Proofline site.
  let keyId: string | null = null;
  const presented = keyFromRequest(req);
  if (presented) {
    let v: ReturnType<typeof verifyKey>;
    try { v = verifyKey(presented); } catch { v = { ok: false, reason: "keys not configured" }; }
    if (!v.ok) return Response.json({ message: `API key ${v.reason}. Create one at /developers.` }, { status: 401 });
    keyId = v.claims.id;
    const q = takeToken(`byo:${keyId}`, LIMITS.free.byo_reads_per_day, 24 * 60 * 60 * 1000);
    if (!q.ok) return Response.json({ message: `This key has used its ${LIMITS.free.byo_reads_per_day} law reads for today.` }, { status: 429 });
  } else if (!isSameOrigin(req)) {
    return Response.json({ message: "Reading a new law needs an API key (Authorization: Bearer pl_live_...). Create one at /developers." }, { status: 401 });
  } else if (limited(ip)) {
    return Response.json({ message: "Too many requests. Please try again in an hour." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text : "";
  const place = typeof body?.place === "string" ? body.place : "";
  const asOf = typeof body?.as_of === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.as_of) ? body.as_of : "2026-10-01";
  if (text.trim().length < 200) return Response.json({ message: "Please paste the full text of the law (at least a paragraph)." }, { status: 400 });
  if (text.length > 200_000) return Response.json({ message: "That text is longer than 200 KB. Please paste one law at a time." }, { status: 413 });
  if (!PLACES.includes(place)) return Response.json({ message: "Please choose which place this law is for." }, { status: 400 });

  const state = place.includes(",") ? place.split(",")[1].trim() : place;
  const sha = createHash("sha256").update(text).digest("hex");
  const doc_id = `BYO-${sha.slice(0, 8)}`;
  const retrieved_at = new Date().toISOString().slice(0, 10);
  const full = `SOURCE: pasted by user\nRETRIEVED: ${retrieved_at}\n\n${text}`;

  const t0 = Date.now();
  const r = await extractDocument({ doc_id, jurisdiction: place, state, level: place.includes(",") ? "city" : "state", url: "pasted by user", retrieved_at, text: full }, { effort: "medium" });
  const newRules = toRuleRecords(r.rules, { doc_id, url: "pasted by user", retrieved_at, kind: "fetched_link_only" }, `NEW-${sha.slice(0, 4).toUpperCase()}`, asOf);

  // Blast radius: compare every sample home with and without the new rules, today and on each new date.
  const dates = [...new Set([asOf, ...newRules.flatMap((x) => (x.x_lifecycle.effective_date && x.x_lifecycle.effective_date.length === 10 ? [x.x_lifecycle.effective_date] : []))])].sort();
  const after = [...RULES, ...newRules];
  const newIds = new Set(newRules.map((x) => x.team_rule_id));
  const affected: { address_id: string; street: string; city: string; date: string; rule: string; result: Result }[] = [];
  const inScope = ADDRESSES.filter((a) => a.state === state && (!place.includes(",") || `${a.city}, ${a.state}` === place));
  for (const a of inScope) {
    for (const d of dates) {
      for (const res of lookupAddress(after, a, d)) {
        if (newIds.has(res.team_rule_id)) affected.push({ address_id: a.address_id, street: a.street_address, city: a.city, date: d, rule: res.team_rule_id, result: res.result });
      }
    }
  }

  return Response.json({
    doc_id,
    sha256: sha,
    steps: [...r.steps, { step: "Test every sample home", ms: 0, detail: `${inScope.length} homes checked on ${dates.join(", ")}` }],
    rules: newRules,
    rejected: r.rejected,
    no_rule_findings: r.no_rule_findings,
    dates,
    affected,
    affected_count: new Set(affected.map((x) => x.address_id)).size,
    ms: Date.now() - t0,
    status: "proposed",
    disclaimer: "Proposal for human review. Not legal advice.",
  });
}
