// Re-checks the hash chain of the published audit log and re-checks every rule's quote against its source.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { RULES } from "@/lib/data";
import { findSpan } from "@/lib/engine/span";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");
function canonical(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonical).join(",")}]`;
  if (v && typeof v === "object") return `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`).join(",")}}`;
  return JSON.stringify(v);
}

export async function GET() {
  const pub = path.join(process.cwd(), "public", "data");
  const log = readFileSync(path.join(pub, "audit.log.jsonl"), "utf8").trim().split("\n").filter(Boolean);
  let prev = "GENESIS";
  let brokenAt: number | null = null;
  for (let i = 0; i < log.length; i++) {
    const { hash, ...body } = JSON.parse(log[i]);
    if (body.prev_hash !== prev || sha(prev + canonical(body)) !== hash) { brokenAt = i + 1; break; }
    prev = hash;
  }
  const texts: Record<string, string> = JSON.parse(readFileSync(path.join(pub, "source_texts.json"), "utf8"));
  const missing = RULES.filter((r) => !r.source_doc_id || !texts[r.source_doc_id] || !findSpan(texts[r.source_doc_id], r.quoted_span)).map((r) => r.team_rule_id);
  return Response.json(
    {
      chain: { ok: brokenAt === null, entries: log.length, broken_at: brokenAt, head: prev.slice(0, 16) },
      quotes: { ok: missing.length === 0, checked: RULES.length, not_found: missing },
      disclaimer: "Not legal advice.",
    },
    { headers: { "X-Not-Legal-Advice": "true" } },
  );
}
