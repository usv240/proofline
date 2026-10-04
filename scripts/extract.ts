// Steps 1 and 2 of the pipeline: read every corpus document with Claude, verify every quote in code,
// then have a second pass challenge each candidate against its source. Cached per document hash.
//   npx tsx scripts/extract.ts [--only D024,D069] [--force]
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as z from "zod/v4";
import { extractDocument } from "../src/lib/pipeline/extractDoc";
import { audit } from "./lib/audit";
import { loadCorpus, type CorpusDoc } from "./lib/corpus";
import { mapLimit, MODEL } from "./lib/llm";
import { EXTRACT_SYSTEM, ExtractionOutput, VERIFY_SYSTEM } from "./lib/prompts";

const OUT = path.join(process.cwd(), "out", "pipeline", "extract");
mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const force = args.includes("--force");
const PROMPT_HASH = createHash("sha256")
  .update(EXTRACT_SYSTEM + VERIFY_SYSTEM + MODEL + JSON.stringify(z.toJSONSchema(ExtractionOutput)))
  .digest("hex")
  .slice(0, 12);

async function processDoc(d: CorpusDoc) {
  const file = path.join(OUT, `${d.doc_id}.json`);
  if (!force && existsSync(file)) {
    const prev = JSON.parse(readFileSync(file, "utf8"));
    if (prev.sha256 === d.sha256 && prev.prompt_hash === PROMPT_HASH) return prev;
  }
  const t0 = Date.now();
  const r = await extractDocument(d);
  const result = {
    doc_id: d.doc_id,
    jurisdiction: d.jurisdiction,
    url: d.url,
    retrieved_at: d.retrieved_at,
    kind: d.kind,
    sha256: d.sha256,
    prompt_hash: PROMPT_HASH,
    model: MODEL,
    candidates: r.candidates,
    rules: r.rules,
    no_rule_findings: r.no_rule_findings,
    rejected: r.rejected,
    steps: r.steps,
    ms: Date.now() - t0,
  };
  writeFileSync(file, JSON.stringify(result, null, 2));
  audit("extract", { doc_id: d.doc_id, sha256: d.sha256, model: MODEL, prompt_hash: PROMPT_HASH }, {
    kept: r.rules.length,
    rejected: r.rejected.length,
    no_rule: r.no_rule_findings.length,
  });
  console.log(`${d.doc_id} ${d.jurisdiction.padEnd(18)} candidates=${r.candidates} kept=${r.rules.length} rejected=${r.rejected.length} no_rule=${r.no_rule_findings.length} ${(result.ms / 1000).toFixed(0)}s`);
  return result;
}

async function main() {
  let docs = loadCorpus();
  if (only) docs = docs.filter((d) => only.includes(d.doc_id));
  console.log(`Extracting ${docs.length} documents with ${MODEL}`);
  await mapLimit(docs, 8, async (d) => {
    try {
      return await processDoc(d);
    } catch (e) {
      console.error(`${d.doc_id} FAILED`, e instanceof Error ? e.message : e);
      return null;
    }
  });
}

main();
