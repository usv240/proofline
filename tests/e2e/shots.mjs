import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const base = process.env.BASE ?? "http://localhost:3124";
const pages = ["/", "/check?address=A0016", "/check?address=A0107", "/check?address=A0008", "/preflight?address=A0008", "/watch", "/watch/T3", "/byo", "/how-it-works", "/learn", "/card/A0016"];
const browser = await chromium.launch({ channel: "chrome" });
const issues = [];
for (const theme of ["light", "dark"]) for (const vp of [{ n: "desk", width: 1440, height: 900 }, { n: "mob", width: 360, height: 800 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  await ctx.addInitScript((t) => localStorage.setItem("proofline-theme", t), theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => issues.push(`JS error ${e.message}`));
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    const name = `${theme}-${vp.n}-${p.replace(/[^a-z0-9]+/gi, "_")}`;
    if (theme === "light" || p === "/" || p.startsWith("/check?address=A0016")) await page.screenshot({ path: `out/screens/${name}.png`, fullPage: vp.n === "desk" && p === "/" });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (sw) issues.push(`horizontal scroll: ${name}`);
    if (vp.n === "desk") {
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
      for (const v of r.violations.filter((v) => ["serious", "critical"].includes(v.impact))) issues.push(`axe ${theme} ${p}: ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(issues.length ? issues.join("\n") : "no issues");
