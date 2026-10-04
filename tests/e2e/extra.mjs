import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const base = "http://localhost:3125";
const b = await chromium.launch({ channel: "chrome" });
const issues = [];
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => localStorage.setItem("proofline-theme", t), theme);
  const p = await ctx.newPage();
  p.on("pageerror", (e) => issues.push(`JS ${e.message}`));
  await p.goto(base + "/check?address=A0382", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Espanol" }).click();
  if (theme === "light") await p.screenshot({ path: "out/screens/es-check.png" });
  await p.goto(base + "/watch", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Check for changes" }).click();
  await p.waitForSelector("text=Latest action", { timeout: 20000 }).catch(() => issues.push("watch check no result"));
  if (theme === "light") await p.screenshot({ path: "out/screens/watch-check.png" });
  for (const path of ["/check?address=A0382", "/watch", "/how-it-works"]) {
    await p.goto(base + path, { waitUntil: "networkidle" });
    if (path.startsWith("/check")) await p.getByRole("button", { name: "Espanol" }).click();
    const r = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
    for (const v of r.violations.filter((v) => ["serious", "critical"].includes(v.impact))) issues.push(`axe ${theme} ${path}: ${v.id} ${v.nodes[0]?.target}`);
  }
  await ctx.close();
}
await b.close();
console.log(issues.length ? issues.join("\n") : "no issues");
