// Step 3b: turn each rule's numbers into structured check parameters for Pre-Flight (caps, deposit
// months, fee limits, pricing-software bans). One model call per rule, cached by rule content; every
// number must be backed by a quote that a script finds in the source.
//   npx tsx scripts/params.ts
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as z from "zod/v4";
import { findSpan } from "../src/lib/engine/span";
import type { RuleRecord } from "../src/lib/engine/types";
import { audit } from "./lib/audit";
import { loadCorpus } from "./lib/corpus";
import { mapLimit, MODEL, parseStructured } from "./lib/llm";

const OUT = path.join(process.cwd(), "out", "pipeline", "params.json");

export const Params = z.object({
  check: z.enum(["rent_increase", "deposit", "fee", "pricing_tool", "none"]).describe("Which Pre-Flight check this rule can decide. 'none' if it sets no number or ban a check could compare against."),
  rent: z.object({
    fixed_percent: z.number().nullable().describe("Allowed annual increase in percent for a stated period, e.g. 1.6 for San Francisco 2026-27. Null if only a formula is given."),
    period_from: z.string().nullable(),
    period_to: z.string().nullable(),
    floor_percent: z.number().nullable().describe("Lowest the formula cap can be, e.g. 5 for '5% + CPI, max 10%' (CPI cannot be negative there); 0 if CPI-based with no floor; null if unknown."),
    max_percent: z.number().nullable().describe("Hard ceiling of the formula, e.g. 10 for '5% + CPI, max 10%'."),
    formula: z.string().nullable(),
  }).nullable(),
  deposit: z.object({
    max_months: z.number().nullable(),
    exception_months: z.number().nullable().describe("Higher limit allowed under a stated exception (e.g. 2 months for qualifying small landlords)."),
    exception: z.string().nullable(),
  }).nullable(),
  fee: z.object({
    prohibited: z.boolean().describe("True if application or screening fees are not allowed at all."),
    max_usd: z.number().nullable(),
    max_note: z.string().nullable(),
  }).nullable(),
  pricing_tool: z.object({
    bans_nonpublic_competitor_data: z.boolean(),
    bans_all_rent_setting_software: z.boolean(),
  }).nullable(),
  quote: z.string().describe("Exact text from the source supporting the numbers. Copy character for character."),
});
export type Params = z.infer<typeof Params>;

const SYSTEM = `You convert one housing-law rule into machine-checkable parameters, strictly from the given source text. Never invent a number: if the text does not state it, use null. Percent values are numbers (1.6 means 1.6 percent). Dates are YYYY-MM-DD.`;

async function main() {
  const rules: RuleRecord[] = JSON.parse(readFileSync(path.join(process.cwd(), "out", "rules.json"), "utf8")).rules;
  const corpus = loadCorpus();
  const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
  const out: Record<string, { hash: string; params: Params | null; quote_ok: boolean }> = {};
  const targets = rules.filter((r) => ["rent_increase_limits", "security_deposits", "application_screening_fees", "algorithmic_rent_setting"].includes(r.category));

  await mapLimit(targets, 8, async (r) => {
    const key = r.team_rule_id;
    const doc = corpus.find((d) => d.doc_id === r.source_doc_id);
    if (!doc) return;
    const hash = createHash("sha256").update(JSON.stringify([r.requirement, r.key_value, r.quoted_span, r.x_details, doc.sha256, SYSTEM, MODEL])).digest("hex").slice(0, 16);
    if (prev[key]?.hash === hash) { out[key] = prev[key]; return; }
    const user = `RULE: ${r.title}\nJurisdiction: ${r.jurisdiction}\nCategory: ${r.category}\nCitation: ${r.citation}\nRequirement: ${r.requirement}\nKey value: ${r.key_value}\nQuote: "${r.quoted_span}"\nDetails:\n${r.x_details.map((d) => `- ${d.text} | "${d.quoted_span}"`).join("\n")}\n\n<source>\n${doc.text}\n</source>`;
    const res = await parseStructured({ schema: Params, system: SYSTEM, user, effort: "medium", maxTokens: 8000 });
    const p = res.data;
    const m = p ? findSpan(doc.text, p.quote) : null;
    if (p && m) p.quote = m.text;
    out[key] = { hash, params: p && m ? p : null, quote_ok: !!m };
    console.log(`${r.team_rule_id.padEnd(12)} ${p?.check ?? "-"} ${m ? "quote ok" : "QUOTE NOT FOUND, params dropped"}`);
  });

  writeFileSync(OUT, JSON.stringify(out, null, 2));
  audit("params", { rules: targets.map((r) => r.team_rule_id) }, { with_params: Object.values(out).filter((x) => x.params).length });
}

main();
