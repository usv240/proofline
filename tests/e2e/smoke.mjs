// End-to-end smoke test against a running server: every page, light and dark, desktop and phone.
// Fails on any page error, console error (including blocked by the security policy), axe serious or critical
// issue, horizontal scroll on a phone, or a broken key flow. Usage: BASE=http://localhost:3000 npm run e2e
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.BASE ?? "http://localhost:3000";
const PAGES = ["/", "/judges", "/check?address=A0016", "/check?address=A0107", "/preflight?address=A0016", "/watch", "/watch/T3", "/byo",
  "/how-it-works", "/learn", "/developers", "/data", "/method-note", "/status", "/card/A0016"];
const issues = [];
const b = await chromium.launch();

for (const theme of ["light", "dark"]) {
  for (const vp of [{ name: "desktop", width: 1440, height: 900 }, { name: "phone", width: 390, height: 844 }]) {
    const ctx = await b.newContext({ viewport: vp });
    await ctx.addInitScript((t) => localStorage.setItem("proofline-theme", t), theme);
    const p = await ctx.newPage();
    const tag = `${theme}/${vp.name}`;
    p.on("pageerror", (e) => issues.push(`${tag} JS ${e.message}`));
    p.on("console", (m) => { if (m.type() === "error") issues.push(`${tag} console ${m.text().slice(0, 160)}`); });
    for (const path of PAGES) {
      const r = await p.goto(base + path, { waitUntil: "networkidle" });
      if (!r || r.status() >= 400) { issues.push(`${tag} ${path} HTTP ${r?.status()}`); continue; }
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) issues.push(`${tag} ${path} scrolls sideways by ${overflow}px`);
      if (vp.name === "desktop") {
        const a = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
        for (const v of a.violations.filter((v) => ["serious", "critical"].includes(v.impact))) issues.push(`${tag} axe ${path}: ${v.id} ${v.nodes[0]?.target}`);
      }
    }
    await ctx.close();
  }
}

// Key flows.
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
p.on("pageerror", (e) => issues.push(`flow JS ${e.message}`));
const step = async (name, fn) => { try { await fn(); console.log(`ok   ${name}`); } catch (e) { issues.push(`flow ${name}: ${e.message.split("\n")[0]}`); } };

await step("what-if turns unknown into answers", async () => {
  await p.goto(base + "/check?address=A0107", { waitUntil: "networkidle" });
  const before = await p.locator("text=Not sure yet").count();
  await p.getByRole("button", { name: /Around 1977/ }).first().click();
  await p.waitForTimeout(300);
  const after = await p.locator("text=Not sure yet").count();
  if (!(after < before)) throw new Error(`unknown count ${before} -> ${after}`);
});
await step("receipt verifies and tampered copy is caught", async () => {
  await p.getByRole("button", { name: "Get a receipt" }).click();
  await p.getByRole("button", { name: "Verify it now" }).click();
  await p.waitForSelector("text=Verified", { timeout: 15000 });
  await p.getByRole("button", { name: "Try a tampered copy" }).click();
  await p.waitForFunction(() => { const s = [...document.querySelectorAll("[role=status]")].pop(); return s && !/^Verified/.test(s.textContent ?? ""); }, null, { timeout: 15000 });
});
await step("Pre-Flight blocks a 9% increase in San Francisco", async () => {
  await p.goto(base + "/preflight?address=A0016", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Check this change" }).click();
  await p.waitForSelector("text=Not allowed", { timeout: 10000 });
});
await step("audit verification passes on the server", async () => {
  const r = await (await p.request.get(base + "/api/audit/verify")).json();
  if (!r.chain?.ok) throw new Error(JSON.stringify(r).slice(0, 200));
});
await step("API lookup answers with citations", async () => {
  const r = await (await p.request.get(base + "/api/lookup?address=A0016")).json();
  if (!Array.isArray(r.results) || !r.results.length) throw new Error(JSON.stringify(r).slice(0, 200));
});
await step("health endpoint reports status", async () => {
  const r = await (await p.request.get(base + "/api/health")).json();
  if (!["ok", "degraded"].includes(r.status)) throw new Error(r.status);
});
await ctx.close();
await b.close();

console.log(issues.length ? `\n${issues.length} issue(s):\n${issues.join("\n")}` : "\nno issues");
process.exit(issues.length ? 1 : 0);
