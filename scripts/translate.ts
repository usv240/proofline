// Translates each rule's one-sentence plain explanation into Spanish, once, at build time.
// Stored in out/pipeline/plain_es.json and attached by publish.ts. Legal quotes are never translated.
//   npx tsx scripts/translate.ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as z from "zod/v4";
import type { RuleRecord } from "../src/lib/engine/types";
import { audit } from "./lib/audit";
import { parseStructured } from "./lib/llm";

const OUT = path.join(process.cwd(), "out", "pipeline", "plain_es.json");

async function main() {
  const rules: RuleRecord[] = JSON.parse(readFileSync(path.join(process.cwd(), "out", "rules.json"), "utf8")).rules;
  const prev: Record<string, { en: string; es: string }> = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
  const todo = rules.filter((r) => prev[r.team_rule_id]?.en !== r.x_plain);
  if (todo.length) {
    const res = await parseStructured({
      schema: z.object({ items: z.array(z.object({ id: z.string(), es: z.string() })) }),
      system: "Translate each sentence into clear, plain Latin American Spanish at about a 6th grade reading level, for renters. Keep numbers, dates, dollar amounts and the names of laws exactly. Do not add advice. Return every id.",
      user: todo.map((r) => `${r.team_rule_id}: ${r.x_plain}`).join("\n"),
      effort: "low",
      maxTokens: 16000,
    });
    for (const it of res.data?.items ?? []) {
      const r = todo.find((x) => x.team_rule_id === it.id);
      if (r) prev[r.team_rule_id] = { en: r.x_plain, es: it.es };
    }
  }
  writeFileSync(OUT, JSON.stringify(prev, null, 2));
  audit("translate", { rules: todo.map((r) => r.team_rule_id) }, { translated: todo.length });
  console.log(`translated ${todo.length}, total ${Object.keys(prev).length}`);
}

main();
