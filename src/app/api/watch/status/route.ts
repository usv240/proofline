// Law Watch: checks the live status of tracked bills against the snapshot Proofline read.
// Official legislature pages first (no key). LegiScan and Open States are added as extra sources when
// LEGISCAN_API_KEY or OPENSTATES_API_KEY is set. A change creates a proposal for human review; nothing is
// applied automatically.
import { readFileSync } from "node:fs";
import path from "node:path";

export const revalidate = 0;

interface Tracked {
  id: string;
  title: string;
  rule: string;
  state: "MA" | "NJ";
  number: string;
  session: string;
  history_url: string;
  snapshot_doc: string;
}

const TRACKED: Tracked[] = [
  { id: "MA-S2983", title: "Mass. S.2983, An Act prohibiting algorithmic rent setting", rule: "MA-ALG-P2", state: "MA", number: "S2983", session: "194", history_url: "https://malegislature.gov/Bills/194/S2983/BillHistory", snapshot_doc: "D047" },
  { id: "MA-H5222", title: "Mass. H.5222, algorithmic rent setting", rule: "MA-ALG-P1", state: "MA", number: "H5222", session: "194", history_url: "https://malegislature.gov/Bills/194/H5222/BillHistory", snapshot_doc: "D045" },
];

type Action = { date: string; branch: string; action: string };

function parseHistory(html: string): Action[] {
  const out: Action[] = [];
  for (const row of html.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) ?? []) {
    const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim(),
    );
    if (cells.length >= 3 && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cells[0])) out.push({ date: cells[0], branch: cells[1], action: cells[2] });
  }
  return out;
}

function snapshotActions(docId: string): { count: number; retrieved: string | null } {
  try {
    const texts = JSON.parse(readFileSync(path.join(process.cwd(), "public", "data", "source_texts.json"), "utf8"));
    const t: string = texts[docId] ?? "";
    return { count: (t.match(/^\d{1,2}\/\d{1,2}\/\d{4}\s*$/gm) ?? []).length / 1, retrieved: /RETRIEVED:\s*([0-9-]{10})/.exec(t)?.[1] ?? null };
  } catch {
    return { count: 0, retrieved: null };
  }
}

// Third-party answers are cached for six hours per server, so a busy page stays far inside the free
// query limits (LegiScan public tier: 10,000 a month; we track two bills).
const SIX_HOURS = 6 * 60 * 60 * 1000;
const cache = new Map<string, { at: number; value: unknown }>();
async function cached<T>(k: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(k);
  if (hit && Date.now() - hit.at < SIX_HOURS) return hit.value as T;
  const value = await fn();
  if (value) cache.set(k, { at: Date.now(), value });
  return value;
}

function legiscan(b: Tracked) {
  return cached(`legiscan:${b.id}`, () => legiscanLive(b));
}

function openstates(b: Tracked) {
  return cached(`openstates:${b.id}`, () => openstatesLive(b));
}

async function legiscanLive(b: Tracked) {
  const key = process.env.LEGISCAN_API_KEY;
  if (!key) return null;
  try {
    const r = await fetch(`https://api.legiscan.com/?key=${key}&op=getSearch&state=${b.state}&query=${encodeURIComponent(b.number)}`, { signal: AbortSignal.timeout(8000) });
    const j = await r.json();
    const hit = Object.values<any>(j?.searchresult ?? {}).find((x) => x?.bill_number?.replace(/\s/g, "") === b.number);
    return hit ? { source: "LegiScan", last_action: hit.last_action, last_action_date: hit.last_action_date, url: hit.url } : null;
  } catch {
    return null;
  }
}

async function openstatesLive(b: Tracked) {
  const key = process.env.OPENSTATES_API_KEY;
  if (!key) return null;
  try {
    const ident = b.number.replace(/^([A-Z]+)(\d+)$/, "$1 $2");
    const r = await fetch(`https://v3.openstates.org/bills?jurisdiction=${b.state.toLowerCase()}&identifier=${encodeURIComponent(ident)}&sort=updated_desc&per_page=1`, { headers: { "X-API-KEY": key }, signal: AbortSignal.timeout(8000) });
    const j = await r.json();
    const hit = j?.results?.[0];
    return hit ? { source: "Open States", last_action: hit.latest_action_description, last_action_date: hit.latest_action_date, url: hit.openstates_url } : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const checked_at = new Date().toISOString();
  const results = await Promise.all(
    TRACKED.map(async (b) => {
      const snap = snapshotActions(b.snapshot_doc);
      let live: Action[] = [];
      let error: string | null = null;
      try {
        const r = await fetch(b.history_url, { headers: { "User-Agent": "Proofline Law Watch (read-only status check)" }, signal: AbortSignal.timeout(10000) });
        live = parseHistory(await r.text());
      } catch {
        error = "The legislature site did not answer in time.";
      }
      const [ls, os] = await Promise.all([legiscan(b), openstates(b)]);
      const latest = live[live.length - 1] ?? null;
      const enacted = live.some((a) => /signed by the governor|chapter \d+ of the acts/i.test(a.action));
      const changed = !error && snap.count > 0 && live.length > snap.count;
      return {
        ...b,
        snapshot: { actions: snap.count, retrieved: snap.retrieved },
        live: { actions: live.length, latest, enacted },
        other_sources: [ls, os].filter(Boolean),
        status: error ? "unavailable" : enacted ? "enacted_review_needed" : changed ? "changed_review_needed" : snap.count === 0 ? "live_only" : "no_change",
        message: error ?? (enacted
          ? "The bill appears to have been signed. A change request is needed: re-read the enacted text and approve before answers change."
          : changed
            ? `${live.length - snap.count} new action(s) since Proofline read this bill. Still pending; flagged for review.`
            : snap.count === 0
              ? "Still pending, so it is not law. (The copy Proofline read has no action history to compare, so this shows the live status only.)"
              : `No new action since Proofline read this bill on ${snap.retrieved ?? "its retrieval date"}. Still pending, so it is not law.`),
      };
    }),
  );
  return Response.json(
    { checked_at, sources: { official: true, legiscan: !!process.env.LEGISCAN_API_KEY, openstates: !!process.env.OPENSTATES_API_KEY }, results, disclaimer: "Not legal advice." },
    { headers: { "X-Not-Legal-Advice": "true", "Cache-Control": "no-store" } },
  );
}
