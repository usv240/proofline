import Link from "next/link";
import { InfoButton } from "@/components/InfoButton";
import { KeyIssuer } from "@/components/KeyIssuer";
import { LIMITS } from "@/lib/apikeys";

export const metadata = { title: "Developers | Proofline" };

const BASE = "https://proofline-opal.vercel.app";

const ENDPOINTS = [
  { m: "GET", p: "/api/lookup?address=A0016&as_of=2026-10-01", d: "Every rule for a sample address on a date: result, explanation, citation, quote, source, deciding fact.", key: "optional" },
  { m: "POST", p: "/api/preflight", d: "Check a rent increase, deposit, fee or pricing software. Body: { address, as_of?, action, facts? }.", key: "optional" },
  { m: "POST", p: "/api/byo/ordinance", d: "Read a new law with the full pipeline and list affected sample homes. Body: { text, place, as_of? }. Spends model credits, so a key is required.", key: "required" },
  { m: "GET", p: "/api/geocode?q=<address>", d: "Legal city for any US address in CA, NJ or MA (US Census Geocoder).", key: "none" },
  { m: "GET", p: "/api/watch/status", d: "Live status of tracked pending bills against the snapshot Proofline read.", key: "none" },
  { m: "POST", p: "/api/receipt/verify", d: "Recompute a proof receipt and report whether it is intact and still true.", key: "none" },
  { m: "GET", p: "/api/audit/verify", d: "Audit chain and quote verification.", key: "none" },
  { m: "GET", p: "/api/keys/verify", d: "Check a key and see its limits.", key: "required" },
];

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="eyebrow">Build on it</p>
      <h1 className="mt-1 text-[34px] font-bold">Developers</h1>
      <p className="mt-2 max-w-3xl text-[17px] text-text-2">
        One key, one header, the same answers as the website. Built for legal aid intake tools, tenant hotlines and housing providers&apos;
        own systems. Every response carries <code>X-Not-Legal-Advice: true</code> and a disclaimer field.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <KeyIssuer />
        <div className="card p-5 sm:p-6">
          <p className="flex items-center text-[18px] font-semibold">How keys work <InfoButton k="apikeys" /></p>
          <ul className="mt-2 space-y-2 text-[15px] text-text-2">
            <li><strong>Signed, not stored.</strong> A key is a signed token. The server checks the signature and reads the key&apos;s id, tier and expiry from the token itself. There is no key database to leak.</li>
            <li><strong>Free tier:</strong> {LIMITS.free.lookup_per_minute} lookups or checks per minute and {LIMITS.free.byo_reads_per_day} law reads per day. Without a key: {LIMITS.anonymous.lookup_per_minute} per minute and no law reads.</li>
            <li><strong>Limits are best effort</strong> in this prototype (counted per server instance, in memory). A production deployment would count in a shared store.</li>
            <li><strong>Revocation:</strong> rotate the server secret, or deny a key id. Keys expire after a year.</li>
          </ul>
        </div>
      </div>

      <section className="mt-10" aria-labelledby="ep-h">
        <h2 id="ep-h" className="text-[24px] font-bold">Endpoints</h2>
        <div className="card mt-3 overflow-x-auto">
          <table className="table">
            <thead><tr><th>Method</th><th>Path</th><th>What it returns</th><th>Key</th></tr></thead>
            <tbody>
              {ENDPOINTS.map((e) => (
                <tr key={e.p}>
                  <td><span className="rounded-md bg-brand-soft px-2 py-0.5 font-mono text-[12.5px] font-bold text-brand">{e.m}</span></td>
                  <td className="font-mono text-[13.5px]">{e.p}</td>
                  <td>{e.d}</td>
                  <td>{e.key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[14px] text-muted">Machine-readable description: <a className="text-brand underline underline-offset-4" href="/api/openapi.json">/api/openapi.json</a></p>
      </section>

      <section className="mt-10" aria-labelledby="ex-h">
        <h2 id="ex-h" className="text-[24px] font-bold">Examples</h2>
        <div className="mt-3 grid gap-4">
          <pre className="card overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{`# Which rules protect this home, as of a date
curl "${BASE}/api/lookup?address=A0016&as_of=2026-10-01" \\
  -H "Authorization: Bearer pl_live_..."

# Is a 9% increase allowed here?
curl -X POST "${BASE}/api/preflight" \\
  -H "Authorization: Bearer pl_live_..." -H "Content-Type: application/json" \\
  -d '{"address":"A0016","action":{"kind":"rent_increase","current_rent":2000,"new_rent":2180}}'

# Read a new law and see which sample homes it affects (key required)
curl -X POST "${BASE}/api/byo/ordinance" \\
  -H "Authorization: Bearer pl_live_..." -H "Content-Type: application/json" \\
  -d '{"place":"Cambridge, MA","text":"<full ordinance text>"}'`}</code></pre>
          <pre className="card overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{`// JavaScript
const r = await fetch("${BASE}/api/preflight", {
  method: "POST",
  headers: { Authorization: "Bearer " + process.env.PROOFLINE_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ address: "A0016", action: { kind: "security_deposit", monthly_rent: 2000, deposit: 4500 } }),
});
const { verdict, lines, disclaimer } = await r.json();
// verdict: "allowed" | "not_allowed" | "needs_person" | "no_rules"`}</code></pre>
        </div>
      </section>

      <section className="panel mt-10 p-6" aria-labelledby="mcp-h">
        <h2 id="mcp-h" className="text-[22px] font-bold">Prefer MCP?</h2>
        <p className="mt-1 text-text-2">
          Run <code>npm run mcp</code> from the repository to expose <code>lookup_address</code>, <code>preflight_check</code> and <code>list_changes</code> to any
          MCP-capable assistant. Same engine, same disclaimer. See <Link className="text-brand underline underline-offset-4" href="/how-it-works#api">How it works</Link>.
        </p>
      </section>
    </div>
  );
}
