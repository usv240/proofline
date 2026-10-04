// Records a captioned demo of the live site with Playwright (real browser, real data, no edits).
//   node scripts/record_demo.mjs [baseUrl]
// Output: out/video/proofline-demo.webm (and .mp4 if ffmpeg is installed).
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "https://proofline-opal.vercel.app";
const OUT = path.join(process.cwd(), "out", "video");
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const W = 1440, H = 900;
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: OUT, size: { width: W, height: H } }, deviceScaleFactor: 1 });
await ctx.addInitScript(() => localStorage.setItem("proofline-theme", "light"));
const p = await ctx.newPage();
const wait = (ms) => p.waitForTimeout(ms);

// A caption bar and a soft cursor highlight, injected after every navigation.
async function chrome() {
  await p.evaluate(() => {
    if (document.getElementById("demo-cap")) return;
    const c = document.createElement("div");
    c.id = "demo-cap";
    Object.assign(c.style, { position: "fixed", left: "50%", bottom: "28px", transform: "translateX(-50%)", zIndex: 99999, maxWidth: "1100px",
      padding: "14px 22px", borderRadius: "14px", background: "rgba(15,23,42,0.92)", color: "#fff", font: "600 22px/1.35 Inter, system-ui, sans-serif",
      boxShadow: "0 12px 40px rgba(0,0,0,.35)", textAlign: "center", opacity: "0", transition: "opacity .25s" });
    document.body.appendChild(c);
    const dot = document.createElement("div");
    dot.id = "demo-dot";
    Object.assign(dot.style, { position: "fixed", width: "26px", height: "26px", borderRadius: "50%", background: "rgba(79,70,229,.28)", border: "2px solid rgba(79,70,229,.8)",
      zIndex: 99998, pointerEvents: "none", transform: "translate(-50%,-50%)", left: "-100px", top: "-100px", transition: "left .35s, top .35s" });
    document.body.appendChild(dot);
    document.addEventListener("mousemove", (e) => { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; });
  });
}
async function say(text, ms = 3200) {
  await chrome();
  await p.evaluate((t) => { const c = document.getElementById("demo-cap"); c.textContent = t; c.style.opacity = "1"; }, text);
  await wait(ms);
}
async function go(url) { await p.goto(BASE + url, { waitUntil: "networkidle" }); await chrome(); await wait(600); }
async function click(locator) {
  await locator.scrollIntoViewIfNeeded();
  const b = await locator.boundingBox();
  if (b) { await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 18 }); await wait(250); }
  await locator.click();
}
async function scrollTo(locator) {
  await locator.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));
  await wait(900);
}

// 1. Problem and promise
await go("/");
await say("3% of tenants facing eviction have a lawyer. 81% of landlords do.", 3600);
await say("Proofline: type an address, see which housing laws protect that home, with the law's own words as proof.", 4200);
await scrollTo(p.locator("#trust-h"));
await say("Every number is computed, not typed: 0 invented rules in 2,090 checks. 100% of quotes found in the source.", 4500);

// 2. Address with proof
await go("/check?address=A0016");
await say("San Francisco, 1926. Legal city found by the US Census Geocoder. State and city layers checked.", 3800);
await scrollTo(p.locator("#h-rent_increase_limits"));
await say("City rent control protects this home. The state cap is replaced by the stronger local rule.", 3800);
const proof = p.getByRole("button", { name: "Show proof" }).first();
await click(proof);
await wait(500);
await say("Every answer quotes the law, word for word, with its source and retrieval date.", 4000);

// 3. Not sure yet, then what-if
await go("/check?address=A0107");
await say("Los Angeles, built 1978: exactly at the rent control cutoff. Public records cannot settle it.", 4000);
await scrollTo(p.locator("#sum-h"));
await say("Proofline says \"Not sure yet\", and names the one fact that would settle it.", 3600);
const around = p.getByRole("button", { name: /Around 1977/ }).first();
await scrollTo(around);
await click(around);
await wait(700);
await say("Answer it, and every rule on the page recomputes instantly. No AI call: tested code, in the browser.", 4400);

// 4. Receipt and tamper
const getReceipt = p.getByRole("button", { name: "Get a receipt" });
await scrollTo(getReceipt);
await click(getReceipt);
await wait(400);
await click(p.getByRole("button", { name: "Verify it now" }));
await p.waitForSelector("text=Verified", { timeout: 15000 });
await say("A sealed receipt: the server recomputes the answer and confirms it.", 3600);
await click(p.getByRole("button", { name: "Try a tampered copy" }));
await p.waitForSelector("text=altered", { timeout: 15000 });
await say("Change one result in the file, and the tampering is caught.", 3600);

// 5. Pre-Flight
await go("/preflight?address=A0016");
await say("Rent Pre-Flight: check a rent increase before it happens.", 3200);
await click(p.getByRole("button", { name: "Check this change" }));
await wait(700);
await scrollTo(p.locator("section[aria-label=Result]"));
await say("9% asked, 1.6% allowed: Not allowed, with the ordinance's exact words.", 4000);
const note = p.getByRole("button", { name: "Draft a note to send" });
await scrollTo(note);
await click(note);
await wait(600);
await scrollTo(p.locator("textarea[readonly]"));
await say("A neutral note that quotes the law and asks how the increase was calculated. Never advice.", 4200);

// 6. Law Watch
await go("/watch/T3");
await say("Law Watch: New Jersey's FAIR Act starts July 1, 2027. 140 homes affected, 90 flagged for a conflict with city bans.", 4600);
await go("/watch");
const chk = p.getByRole("button", { name: "Check for changes" });
await click(chk);
await p.waitForSelector("text=Latest action", { timeout: 20000 }).catch(() => {});
await say("It reads the live Massachusetts bill history: still pending, so never reported as law.", 4200);

// 7. Proof of rigor
await go("/how-it-works");
await scrollTo(p.locator("#base-h"));
await say("Against the same AI given search: it invented rules in-force; Proofline invented none.", 4200);
await scrollTo(p.locator("#scale-h"));
await say("A new city, Bayonne NJ, added live from its official ordinance with one command.", 3800);
const verify = p.getByRole("button", { name: "Verify now" });
await scrollTo(verify);
await click(verify);
await p.waitForSelector("text=intact", { timeout: 15000 }).catch(() => {});
await say("Hash-chained audit log and every quote re-checked on the server, live.", 3800);

// 8. Close
await go("/");
await say("Proofline reads the law, tests every rule, proves every answer. Not legal advice.", 4200);

await ctx.close();
await browser.close();

const webm = readdirSync(OUT).find((f) => f.endsWith(".webm"));
const final = path.join(OUT, "proofline-demo.webm");
renameSync(path.join(OUT, webm), final);
console.log("video:", final);
try {
  execFileSync("ffmpeg", ["-y", "-i", final, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", final.replace(".webm", ".mp4")], { stdio: "ignore" });
  console.log("mp4:", final.replace(".webm", ".mp4"));
} catch {
  console.log("ffmpeg not found: upload the .webm directly (YouTube accepts it), or convert it later.");
}
if (!existsSync(final)) process.exit(1);
