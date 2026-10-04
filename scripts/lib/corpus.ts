// Loads the official corpus (starter pack) and the link-only sources Proofline fetched itself.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();
export const STARTER = path.join(ROOT, "data", "starter");
export const EXT = path.join(ROOT, "data", "corpus_ext");

export interface ManifestRow {
  doc_id: string;
  jurisdictions: string;
  url: string;
  source_type: string;
  capture: string;
  retrieved_at: string;
  sha256: string;
  text_file: string;
  status: string;
}

export interface CorpusDoc {
  doc_id: string;
  jurisdiction: string; // "CA" or "San Francisco, CA"
  state: "CA" | "NJ" | "MA";
  level: "state" | "city";
  url: string;
  retrieved_at: string | null;
  kind: "official_corpus" | "fetched_link_only";
  text: string; // full file contents, including the SOURCE/RETRIEVED header
  sha256: string;
  operator_note?: string;
}

export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cur); cur = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else cur += ch;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

export function loadManifest(): ManifestRow[] {
  return parseCsv(readFileSync(path.join(STARTER, "corpus", "corpus_manifest.csv"), "utf8")) as unknown as ManifestRow[];
}

function jur(j: string) {
  const state = (j.includes(",") ? j.split(",")[1].trim() : j.trim()) as CorpusDoc["state"];
  return { jurisdiction: j.trim(), state, level: (j.includes(",") ? "city" : "state") as CorpusDoc["level"] };
}

export function loadCorpus(): CorpusDoc[] {
  const docs: CorpusDoc[] = [];
  for (const m of loadManifest()) {
    const official = m.text_file ? path.join(STARTER, "corpus", m.text_file) : "";
    const ext = path.join(EXT, `${m.doc_id}.txt`);
    let file = "";
    let kind: CorpusDoc["kind"] = "official_corpus";
    if (official && existsSync(official)) file = official;
    else if (existsSync(ext)) { file = ext; kind = "fetched_link_only"; }
    else continue;
    const text = readFileSync(file, "utf8");
    const retrieved = /RETRIEVED:\s*([0-9-]{10})/.exec(text)?.[1] ?? (m.retrieved_at ? m.retrieved_at.slice(0, 10) : null);
    docs.push({
      doc_id: m.doc_id,
      ...jur(m.jurisdictions),
      url: m.url,
      retrieved_at: retrieved,
      kind,
      text,
      sha256: createHash("sha256").update(text).digest("hex"),
    });
  }
  // New documents released during the event (for example the hour-16 ordinance), added with
  // `npm run new-law`. Each has a small JSON sidecar with its place and source.
  const NEW = path.join(ROOT, "data", "corpus_new");
  if (existsSync(NEW)) {
    for (const f of readdirSync(NEW).filter((x) => x.endsWith(".json"))) {
      const meta = JSON.parse(readFileSync(path.join(NEW, f), "utf8"));
      const text = readFileSync(path.join(NEW, meta.text_file), "utf8");
      docs.push({
        doc_id: meta.doc_id, ...jur(meta.jurisdiction), url: meta.url, retrieved_at: meta.retrieved_at,
        // The note is part of the cache key: changing it re-reads the document.
        kind: "official_corpus", text, sha256: createHash("sha256").update(text + (meta.operator_note ?? "")).digest("hex"),
        operator_note: meta.operator_note,
      });
    }
  }
  return docs;
}

export function loadDocById(id: string): CorpusDoc | undefined {
  return loadCorpus().find((d) => d.doc_id === id);
}
