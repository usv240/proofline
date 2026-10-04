// Append-only, hash-chained audit log. Each entry's hash covers the previous hash, so any edit to an
// earlier line breaks verification from that point on.
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync } from "node:fs";
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

// Exclusive lock so two processes can never append at the same time and fork the chain.
function withLock<T>(fn: () => T): T {
  const lock = `${AUDIT_FILE}.lock`;
  const start = Date.now();
  for (;;) {
    try { mkdirSync(lock); break; } catch {
      if (Date.now() - start > 30_000) throw new Error(`audit log locked: ${lock}`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
  try { return fn(); } finally { rmSync(lock, { recursive: true, force: true }); }
}

export function audit(action: string, input: unknown, output: unknown, actor = "proofline-pipeline") {
  mkdirSync(path.dirname(AUDIT_FILE), { recursive: true });
  withLock(() => append(action, input, output, actor));
}

function append(action: string, input: unknown, output: unknown, actor: string) {
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

/** If the chain is broken (for example by an old concurrent write), keep the old file untouched under a
 * new name and start a new chain whose first entry records the old file's hash and where it broke. */
export function sealBrokenChain(): string | null {
  if (!existsSync(AUDIT_FILE)) return null;
  const text = readFileSync(AUDIT_FILE, "utf8");
  const v = verifyChain(text);
  if (v.ok) return null;
  const archived = AUDIT_FILE.replace(/\.jsonl$/, `.segment-${Date.now()}.jsonl`);
  renameSync(AUDIT_FILE, archived);
  audit("chain_sealed", { archived_file: path.basename(archived), archived_sha256: sha(text), entries: v.entries, broken_at: v.brokenAt },
    { reason: "Two pipeline processes appended at the same moment before write locking was added. The earlier segment is kept unchanged." });
  return archived;
}
