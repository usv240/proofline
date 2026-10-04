// POST a proof receipt; the server recomputes the answer from the published rules and reports whether the
// receipt is intact, whether the rule set is the same version, and whether every result still matches.
import { addressById, METRICS, RULES } from "@/lib/data";
import { lookupAddress } from "@/lib/engine/lookup";
import type { AddressFacts } from "@/lib/engine/types";
import { canonical, hashHex, type Receipt } from "@/lib/receipt";

export async function POST(req: Request) {
  const r = (await req.json().catch(() => null)) as Receipt | null;
  if (!r || r.v !== 1 || !r.sha256 || !Array.isArray(r.results)) return Response.json({ ok: false, message: "That is not a Proofline receipt." }, { status: 400 });

  const { sha256, ...body } = r;
  const recomputed = await hashHex(canonical(body));
  const intact = recomputed === sha256;

  const base = addressById(r.address.id);
  const f: AddressFacts | null = base
    ? { ...base, year_built: r.facts_used.year_built, units: { ...r.facts_used.units, source: r.facts_used.units.source as AddressFacts["units"]["source"] }, building_type: r.facts_used.building_type as AddressFacts["building_type"], government_subsidized: r.facts_used.government_subsidized, user: r.facts_used.user }
    : null;
  const now = f ? lookupAddress(RULES.filter((x) => x.level === "state" ? x.jurisdiction === f.state : x.jurisdiction === `${f.city}, ${f.state}`), f, r.as_of).map((x) => ({ rule: x.team_rule_id, result: x.result })).sort((a, b) => a.rule.localeCompare(b.rule)) : null;
  const sameRules = r.rules_sha256 === METRICS.rules_sha256;
  const matches = now ? canonical(now) === canonical(r.results) : null;
  const diffs = now ? r.results.filter((x) => now.find((y) => y.rule === x.rule)?.result !== x.result).concat(now.filter((y) => !r.results.find((x) => x.rule === y.rule)).map((y) => ({ rule: y.rule, result: y.result }))) : [];

  return Response.json(
    {
      ok: intact && !!f && matches === true,
      receipt_intact: intact,
      address_known: !!f,
      same_rule_set: sameRules,
      results_match: matches,
      differences: diffs,
      message: !intact
        ? "The receipt was altered: its hash does not match its contents."
        : !f
          ? "The address in this receipt is not in the sample set."
          : matches
            ? sameRules ? "Verified: same rule set, same facts, same answers." : "Verified: the answers still hold, although the rule set has been updated since this receipt was issued."
            : "The answers have changed since this receipt was issued. The differences are listed.",
      disclaimer: "Not legal advice.",
    },
    { headers: { "X-Not-Legal-Advice": "true" } },
  );
}
