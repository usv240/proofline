// Step 2b: reconcile. Different sources cite the same law differently ("Jersey City Code § 218-12" vs
// "the Jersey City ordinance banning rent-setting algorithms"). For every place and category with more
// than one candidate, the model groups candidates that describe the same legal rule. Output is a file
// that assemble.ts reads; assembly itself stays deterministic.
//   npx tsx scripts/reconcile.ts
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as z from "zod/v4";
import { audit } from "./lib/audit";
import { mapLimit, MODEL, parseStructured } from "./lib/llm";

const IN = path.join(process.cwd(), "out", "pipeline", "extract");
const OUT = path.join(process.cwd(), "out", "pipeline", "clusters.json");

const SYSTEM = `You reconcile housing-law rule records extracted from different source documents for the same place and category. Group records that describe the SAME legal rule (the same statute section, ordinance or bill, including a draft and the adopted version of the same ordinance, or a news summary of that ordinance). Keep DIFFERENT rules in different groups (for example a deposit cap and a deposit interest rule, or two different bills). Every record id must appear in exactly one group.`;

const Out = z.object({ groups: z.array(z.object({ ids: z.array(z.string()), reason: z.string() })) });

async function main() {
  const docs = readdirSync(IN).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(path.join(IN, f), "utf8")));
  const byCell = new Map<string, { id: string; r: any; doc: string }[]>();
  for (const d of docs) d.rules.forEach((r: any, i: number) => {
    const key = `${r.jurisdiction}|${r.category}`;
    byCell.set(key, [...(byCell.get(key) ?? []), { id: `${d.doc_id}#${i}`, r, doc: d.doc_id }]);
  });

  const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { cells: {} };
  const cells: Record<string, { hash: string; groups: string[][] }> = {};
  const multi = [...byCell.entries()].filter(([, v]) => v.length > 1);

  await mapLimit(multi, 6, async ([cell, items]) => {
    const listing = items.map((x) => `${x.id} | doc ${x.doc} | ${x.r.lifecycle_kind} | cite: ${x.r.citation} | ${x.r.title} | ${x.r.requirement.slice(0, 300)}`).join("\n");
    const hash = createHash("sha256").update(listing + SYSTEM + MODEL).digest("hex").slice(0, 16);
    if (prev.cells[cell]?.hash === hash) { cells[cell] = prev.cells[cell]; return; }
    const res = await parseStructured({ schema: Out, system: SYSTEM, user: `PLACE AND CATEGORY: ${cell}\n\nRECORDS:\n${listing}`, effort: "medium", maxTokens: 8000 });
    const all = new Set(items.map((x) => x.id));
    const groups = (res.data?.groups ?? []).map((g) => g.ids.filter((id) => all.has(id))).filter((g) => g.length);
    const seen = new Set(groups.flat());
    for (const id of all) if (!seen.has(id)) groups.push([id]);
    cells[cell] = { hash, groups };
    console.log(`${cell}: ${items.length} records -> ${groups.length} rules`);
  });

  writeFileSync(OUT, JSON.stringify({ model: MODEL, cells }, null, 2));
  audit("reconcile", { cells: multi.map(([c]) => c) }, { cells: Object.fromEntries(Object.entries(cells).map(([k, v]) => [k, v.groups])) });
}

main();
