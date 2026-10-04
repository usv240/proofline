// Adds a newly released law (for example the hour-16 ordinance) to the corpus and runs the full pipeline
// on it, unaided: read, check quotes, second check, merge, test every address, write the change case.
//   npm run new-law -- --file path/to/ordinance.txt|.pdf --place "Cambridge, MA" --test T6 --url <source url> --title "<title>"
import { execFileSync, execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { audit } from "./lib/audit";

const args = process.argv.slice(2);
const arg = (k: string, d?: string) => (args.includes(`--${k}`) ? args[args.indexOf(`--${k}`) + 1] : d);
const file = arg("file");
const place = arg("place");
const testId = arg("test", "T6")!;
const url = arg("url", "released by organizers")!;
const title = arg("title", "New law released during the event")!;
if (!file || !place) {
  console.error('Usage: npm run new-law -- --file <path> --place "Cambridge, MA" [--test T6] [--url ...] [--title ...]');
  process.exit(1);
}

const ROOT = process.cwd();
const NEW = path.join(ROOT, "data", "corpus_new");
mkdirSync(NEW, { recursive: true });

let text: string;
if (file.toLowerCase().endsWith(".pdf")) {
  text = execFileSync("python", ["-c", "import sys;from pypdf import PdfReader;print('\\n\\n'.join((p.extract_text() or '') for p in PdfReader(sys.argv[1]).pages))", file], { encoding: "utf8", maxBuffer: 50e6 });
} else text = readFileSync(file, "utf8");

const existing = readdirSync(NEW).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(path.join(NEW, f), "utf8")));
const prior = existing.find((m) => m.test_id === testId);
const docId = prior?.doc_id ?? `D${String(88 + existing.length).padStart(3, "0")}`;
const retrieved = new Date().toISOString().slice(0, 10);
writeFileSync(path.join(NEW, `${docId}.txt`), `SOURCE: ${url}\nRETRIEVED: ${retrieved}\n\n${text}`);
// The organizers' change-test documents are fictional by design. This note is shown to both reading
// passes so a "fictional" label does not cause rejection, and it is recorded in the audit log.
const operatorNote = args.includes("--real")
  ? undefined
  : "This document was released by the challenge organizers as a change-test ordinance. Treat its text as enacted law for this exercise, with the dates it states. Still extract only what the text says.";
writeFileSync(path.join(NEW, `${docId}.json`), JSON.stringify({ doc_id: docId, jurisdiction: place, url, retrieved_at: retrieved, text_file: `${docId}.txt`, test_id: testId, title, operator_note: operatorNote }, null, 2));

const extraFile = path.join(ROOT, "data", "change_tests_extra.json");
const extra = existsSync(extraFile) ? JSON.parse(readFileSync(extraFile, "utf8")) : [];
const test = { test_id: testId, title, type: "new_document", rule_ids: [], source_doc_ids: [docId], as_of: "2026-10-01", expected_behavior: "Extracted unaided; affected addresses listed; future effective date reported as not yet effective." };
writeFileSync(extraFile, JSON.stringify([...extra.filter((t: { test_id: string }) => t.test_id !== testId), test], null, 2));
audit("new_law", { doc_id: docId, place, url, chars: text.length, operator_note: operatorNote ?? null }, { test_id: testId });

const t0 = Date.now();
const run = (cmd: string) => { console.log(`\n> ${cmd}`); execSync(cmd, { stdio: "inherit" }); };
run(`npx tsx scripts/extract.ts --only ${docId}`);
run("npx tsx scripts/reconcile.ts");
run("npx tsx scripts/assemble.ts");
run("npx tsx scripts/params.ts");
run("npx tsx scripts/translate.ts");
run("npx tsx scripts/outputs.ts");
run("npx tsx scripts/publish.ts");
run("npx tsx scripts/verify.ts");

const rules = JSON.parse(readFileSync(path.join(ROOT, "out", "rules.json"), "utf8")).rules.filter((r: { source_doc_id: string }) => r.source_doc_id === docId);
const changes = JSON.parse(readFileSync(path.join(ROOT, "out", "changes.json"), "utf8"));
console.log(`\n${testId}: ${docId} (${place}) read in ${Math.round((Date.now() - t0) / 1000)}s`);
for (const r of rules) console.log(`  ${r.team_rule_id} ${r.category} status=${r.status} effective=${r.effective_date} | ${r.title}`);
console.log(`  affected addresses: ${changes[testId]?.affected_address_ids.length ?? 0}`);
console.log(`  notes: ${changes[testId]?.notes}`);
