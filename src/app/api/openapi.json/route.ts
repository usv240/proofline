// Machine-readable description of the public API.
export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: { title: "Proofline API", version: "1.0.0", description: "Address-level housing law answers, each backed by the law's own words. Not legal advice." },
    servers: [{ url: "https://proofline-opal.vercel.app" }],
    components: { securitySchemes: { bearer: { type: "http", scheme: "bearer", description: "API key pl_live_... from /developers. Optional on read endpoints (higher limits), required to read new laws." } } },
    paths: {
      "/api/lookup": { get: { summary: "Rules for a sample address on a date", parameters: [{ name: "address", in: "query", required: true, schema: { type: "string" } }, { name: "as_of", in: "query", schema: { type: "string", format: "date" } }], security: [{}, { bearer: [] }], responses: { "200": { description: "Results with citations, quotes and deciding fact" }, "404": { description: "Unknown address id" }, "429": { description: "Rate limit" } } } },
      "/api/preflight": { post: { summary: "Check a rent increase, deposit, fee or pricing software", security: [{}, { bearer: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["address", "action"], properties: { address: { type: "string" }, as_of: { type: "string", format: "date" }, action: { type: "object", properties: { kind: { type: "string", enum: ["rent_increase", "security_deposit", "application_fee", "pricing_tool"] }, current_rent: { type: "number" }, new_rent: { type: "number" }, monthly_rent: { type: "number" }, deposit: { type: "number" }, fee: { type: "number" }, uses_nonpublic_competitor_data: { type: "string", enum: ["yes", "no", "not_sure"] } } }, facts: { type: "object", properties: { units: { type: "integer" }, year_built: { type: "integer" }, owner_occupied: { type: "boolean" } } } } } } } }, responses: { "200": { description: "verdict allowed | not_allowed | needs_person | no_rules, with per-rule lines and quotes" } } } },
      "/api/byo/ordinance": { post: { summary: "Read a new law with the full pipeline (key required)", security: [{ bearer: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["text", "place"], properties: { text: { type: "string" }, place: { type: "string" }, as_of: { type: "string", format: "date" } } } } } }, responses: { "200": { description: "Proposed rules, rejected candidates, affected sample homes" }, "401": { description: "Missing or invalid key" } } } },
      "/api/geocode": { get: { summary: "Legal city for a typed address", parameters: [{ name: "q", in: "query", required: true, schema: { type: "string" } }], responses: { "200": { description: "facts" } } } },
      "/api/watch/status": { get: { summary: "Live status of tracked pending bills", responses: { "200": { description: "Per-bill status" } } } },
      "/api/receipt/verify": { post: { summary: "Recompute and verify a proof receipt", responses: { "200": { description: "intact, same rule set, results match" } } } },
      "/api/audit/verify": { get: { summary: "Audit chain and quote verification", responses: { "200": { description: "chain and quotes" } } } },
      "/api/keys": { post: { summary: "Create an API key (from the developers page)", responses: { "200": { description: "key shown once" } } } },
      "/api/health": { get: { summary: "Health of each component and the data version being served", responses: { "200": { description: "status ok | degraded | down, components, rules_sha256" } } } },
      "/api/keys/verify": { get: { summary: "Check a key", security: [{ bearer: [] }], responses: { "200": { description: "limits and expiry" }, "401": { description: "invalid" } } } },
    },
  };
  return Response.json(spec, { headers: { "X-Not-Legal-Advice": "true" } });
}
