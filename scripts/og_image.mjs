// Renders the social share image (src/app/opengraph-image.png, 1200x630) from live metrics.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const m = JSON.parse(readFileSync(root + "src/generated/metrics.json", "utf8"));
const kpis = [
  [String(m.negative_control.invented_applies), `invented rules in ${m.negative_control.checks.toLocaleString("en-US")} no-rule checks`],
  [`${Math.round(m.extraction.quote_rate * 100)}%`, "rule quotes found word for word"],
  ["5 / 5", "change tests as specified"],
];
const html = `<!doctype html><html><body style="margin:0;width:1200px;height:630px;font-family:Inter,Segoe UI,system-ui,sans-serif;
background:radial-gradient(900px 500px at 85% -10%,#e0e7ff 0,transparent 60%),radial-gradient(700px 400px at -10% 110%,#dbeafe 0,transparent 60%),#fbfbfd;color:#0f172a">
<div style="padding:64px 72px;display:flex;flex-direction:column;height:100%;box-sizing:border-box">
 <div style="display:flex;align-items:center;gap:16px">
  <svg width="56" height="56" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d4ed8"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#g)"/><path d="M9 17l5 5 9-12" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span style="font-size:34px;font-weight:700;letter-spacing:-0.5px">Proofline</span>
 </div>
 <h1 style="font-size:56px;line-height:1.1;margin:32px 0 32px;letter-spacing:-1.5px;font-weight:800">Which housing laws protect this home?<br><span style="background:linear-gradient(90deg,#1d4ed8,#4f46e5);-webkit-background-clip:text;color:transparent">Proved in the law's own words.</span></h1>
 <div style="display:flex;gap:20px;margin-top:auto">
  ${kpis.map(([v, l]) => `<div style="flex:1;background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:20px 24px;box-shadow:0 1px 2px rgba(15,23,42,.06)"><div style="font-size:44px;font-weight:800;color:#1d4ed8">${v}</div><div style="font-size:20px;color:#475569;margin-top:4px">${l}</div></div>`).join("")}
 </div>
 <div style="font-size:18px;color:#64748b;margin-top:20px">13 places in CA, NJ, MA · address lookups, Pre-Flight checks, law change tracking · Not legal advice</div>
</div></body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: root + "src/app/opengraph-image.png" });
await browser.close();
console.log("wrote src/app/opengraph-image.png");
