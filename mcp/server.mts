// MCP server: lets any MCP-capable assistant (for example a legal aid chatbot) ask Proofline instead of
// guessing. Same engine and data as the website. Every answer says "Not legal advice."
//   npm run mcp
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";
import { parseAddressesCsv } from "../src/lib/engine/addresses";
import { decidingFactForAddress, lookupAddress, rulesForAddress } from "../src/lib/engine/lookup";
import { preflight, type RuleWithParams } from "../src/lib/engine/preflight";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rules: RuleWithParams[] = JSON.parse(readFileSync(path.join(ROOT, "src", "generated", "rules.json"), "utf8"));
const changes = JSON.parse(readFileSync(path.join(ROOT, "src", "generated", "changes.json"), "utf8"));
const addrs = parseAddressesCsv(readFileSync(path.join(ROOT, "data", "addresses_resolved.csv"), "utf8"));
const NLA = "Not legal advice.";

const text = (o: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(o, null, 2) }] });
const find = (q: string) => addrs.find((a) => a.address_id === q) ?? addrs.find((a) => `${a.street_address}, ${a.city}`.toLowerCase().includes(q.toLowerCase()));

const server = new McpServer({ name: "proofline", version: "1.0.0" });

server.registerTool(
  "lookup_address",
  {
    title: "Housing rules for an address",
    description: "Returns every housing rule (rent caps, just cause, deposits, fees, screening, algorithmic rent-setting) that covers a sample address on a date, with citation and the law's exact quote. Results: applies, unknown (with the missing fact), superseded, not_yet_effective, pending. Not legal advice.",
    inputSchema: { address: z.string().describe("Sample id like A0016, or part of the street address"), as_of: z.string().optional().describe("YYYY-MM-DD, default 2026-10-01") },
  },
  async ({ address, as_of }) => {
    const a = find(address);
    if (!a) return text({ error: "Address not in the sample.", disclaimer: NLA });
    const asOf = as_of ?? "2026-10-01";
    const rs = rulesForAddress(rules, a);
    const results = lookupAddress(rs, a, asOf);
    return text({
      address: `${a.street_address}, ${a.city}, ${a.state}`,
      as_of: asOf,
      results: results.map((r) => { const x = rs.find((y) => y.team_rule_id === r.team_rule_id)!; return { result: r.result, title: x.title, citation: x.citation, quote: x.quoted_span, source: x.source_url, explanation: r.explanation, conflict: r.conflict_flag }; }),
      deciding_fact: decidingFactForAddress(rs, a, asOf, results),
      disclaimer: NLA,
    });
  },
);

server.registerTool(
  "preflight_check",
  {
    title: "Check a rent change before it happens",
    description: "Checks a rent increase, security deposit, application fee or pricing-software use against the rules for an address. Returns allowed, not_allowed or needs_person with quotes. Never suggests ways around a rule. Not legal advice.",
    inputSchema: {
      address: z.string(),
      as_of: z.string().optional(),
      kind: z.enum(["rent_increase", "security_deposit", "application_fee", "pricing_tool"]),
      current_rent: z.number().optional(), new_rent: z.number().optional(),
      monthly_rent: z.number().optional(), deposit: z.number().optional(),
      fee: z.number().optional(),
      uses_nonpublic_competitor_data: z.enum(["yes", "no", "not_sure"]).optional(),
    },
  },
  async (i) => {
    const a = find(i.address);
    if (!a) return text({ error: "Address not in the sample.", disclaimer: NLA });
    const action =
      i.kind === "rent_increase" ? { kind: i.kind, current_rent: i.current_rent ?? 0, new_rent: i.new_rent ?? 0 }
      : i.kind === "security_deposit" ? { kind: i.kind, monthly_rent: i.monthly_rent ?? 0, deposit: i.deposit ?? 0 }
      : i.kind === "application_fee" ? { kind: i.kind, fee: i.fee ?? 0 }
      : { kind: i.kind, uses_nonpublic_competitor_data: i.uses_nonpublic_competitor_data ?? "not_sure" };
    return text(preflight(rulesForAddress(rules, a), a, i.as_of ?? "2026-10-01", action as never));
  },
);

server.registerTool(
  "list_changes",
  {
    title: "Law changes and affected addresses",
    description: "Lists the tracked law changes (new, upcoming, pending and failed measures) with the number of sample addresses each affects and conflict flags. Not legal advice.",
    inputSchema: {},
  },
  async () => text({ changes: Object.values(changes).map((c: any) => ({ id: c.test_id, title: c.title, affected: c.affected_address_ids.length, conflicts: c.conflict_flag_address_ids.length, notes: c.notes })), disclaimer: NLA }),
);

await server.connect(new StdioServerTransport());
