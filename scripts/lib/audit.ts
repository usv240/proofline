// Append-only, hash-chained audit log. Each entry's hash covers the previous hash, so any edit to an
// earlier line breaks verification from that point on.
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const AUDIT_FILE = path.join(process.cwd(), "out", "audit.log.jsonl");

function canonical(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonical).join(",")}]`;
  if (v && typeof v === "object") {
    return `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`).join(",")}}`;
  }
  return JSON.stringify(v);
}

export const sha = (s: string) => createHash("sha256").update(s).digest("hex");

function lastEntry(): { seq: number; hash: string } {
  if (!existsSync(AUDIT_FILE)) return { seq: 0, hash: "GENESIS" };
  const lines = readFileSync(AUDIT_FILE, "utf8").trim().split("\n").filter(Boolean);
  if (!lines.length) return { seq: 0, hash: "GENESIS" };
  const e = JSON.parse(lines[lines.length - 1]);
  return { seq: e.seq, hash: e.hash };
}

export function audit(action: string, input: unknown, output: unknown, actor = "proofline-pipeline") {
  mkdirSync(path.dirname(AUDIT_FILE), { recursive: true });
  const prev = lastEntry();
  const body = {
    seq: prev.seq + 1,
    ts: new Date().toISOString(),
    actor,
    action,
    input_hash: sha(canonical(input)),
    output_hash: sha(canonical(output)),
    input,
    output,
    prev_hash: prev.hash,
  };
  const hash = sha(prev.hash + canonical(body));
  appendFileSync(AUDIT_FILE, JSON.stringify({ ...body, hash }) + "\n");
}

export function verifyChain(text: string): { ok: boolean; entries: number; brokenAt: number | null } {
  const lines = text.trim().split("\n").filter(Boolean);
  let prev = "GENESIS";
  for (let i = 0; i < lines.length; i++) {
    const { hash, ...body } = JSON.parse(lines[i]);
    if (body.prev_hash !== prev || sha(prev + canonical(body)) !== hash) return { ok: false, entries: lines.length, brokenAt: i + 1 };
    prev = hash;
  }
  return { ok: true, entries: lines.length, brokenAt: null };
}
