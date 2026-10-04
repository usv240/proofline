// Renders the three submission videos from the live site, frame by frame, in 4K at 30 fps.
// Every frame sets the exact scroll and cursor position for its moment, then takes a 3840x2160 screenshot,
// so motion is smooth however slowly the machine captures. Page loads happen between frames (never on screen).
// Each scene lasts exactly as long as its narration (word timings from tts.py drive clicks and moves).
//   python scripts/video/tts.py && node scripts/video/record.mjs [demo|tech|team|all] && python scripts/video/build.py
import { chromium } from "playwright";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const BUILD = path.join(ROOT, "out", "video", "build");
const BASE = "https://proofline-opal.vercel.app";
const SPEC = JSON.parse(readFileSync(path.join(ROOT, "scripts", "video", "scenes.json"), "utf8"));
const TIMINGS = JSON.parse(readFileSync(path.join(BUILD, "timings.json"), "utf8"));
const FPS = 30;
// A 1536x864 layout rendered at 2.5x: exactly 3840x2160, with text 25% larger than a 1920 layout (easier to read on video).
// Plan coordinates are written for 1920x1080 and scaled by S.
const VW = 1536, VH = 864, DSF = 2.5, S = VW / 1920;
const which = process.argv[2] ?? "all";

// Cursor arrow and click ripple, drawn inside the page so they appear in every screenshot.
const cursorScript = () => {
  const install = () => {
    if (document.getElementById("__cur")) return;
    const c = document.createElement("div");
    c.id = "__cur";
    c.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24"><path d="M4 2l14.5 9.2-6.6 1.4 3.4 7.4-3 1.4-3.4-7.5L4 18.5z" fill="#111827" stroke="#ffffff" stroke-width="1.7" stroke-linejoin="round"/></svg>';
    Object.assign(c.style, { position: "fixed", left: "-100px", top: "-100px", zIndex: "2147483647", pointerEvents: "none",
      transform: "translate(-4px,-2px)", filter: "drop-shadow(0 2px 4px rgba(0,0,0,.35))" });
    const r = document.createElement("div");
    r.id = "__rip";
    Object.assign(r.style, { position: "fixed", left: "-100px", top: "-100px", borderRadius: "50%", border: "3px solid #4f46e5",
      background: "rgba(79,70,229,.28)", zIndex: "2147483646", pointerEvents: "none", display: "none" });
    document.documentElement.append(r, c);
  };
  window.__cursor = (x, y) => { install(); const c = document.getElementById("__cur"); c.style.left = x + "px"; c.style.top = y + "px"; };
  window.__ripple = (x, y, age) => {
    install();
    const r = document.getElementById("__rip");
    if (age < 0 || age > 0.6) { r.style.display = "none"; return; }
    const k = age / 0.6, d = 16 + 56 * k;
    Object.assign(r.style, { display: "block", left: x - d / 2 + "px", top: y - d / 2 + "px", width: d + "px", height: d + "px", opacity: String(1 - k) });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install); else install();
};

const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

async function renderVideo(name, plans) {
  const dir = path.join(BUILD, name);
  const framesDir = path.join(dir, "frames");
  rmSync(framesDir, { recursive: true, force: true });
  mkdirSync(framesDir, { recursive: true });
  const browser = await chromium.launch({ args: [`--force-device-scale-factor=${DSF}`] });
  const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: DSF });
  await ctx.addInitScript(() => { try { localStorage.setItem("proofline-theme", "light"); } catch {} });
  await ctx.addInitScript(cursorScript);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  const timing = Object.fromEntries(TIMINGS[name].map((x) => [x.id, x]));
  const pad = SPEC.videos[name].pad ?? 0.35;

  const frames = []; // one entry per output frame: file name (repeated when nothing changed)
  const scenes = [];
  let cur = [1500 * S, 760 * S];
  let shot = 0;

  const go = async (url) => {
    await page.goto(url.startsWith("http") || url.startsWith("file") ? url : BASE + url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
  };
  const absY = (loc, offset) => loc.evaluate((el, off) => el.getBoundingClientRect().top + window.scrollY - off, (offset + 70) * S); // +70 leaves room for the callout banner
  const jump = async (loc, offset = 140) => { const y = await absY(loc, offset); await page.evaluate((y) => window.scrollTo({ top: Math.max(0, y), behavior: "instant" }), y); };

  for (const [id, prep, plan] of plans) {
    const words = timing[id].words;
    const w = (word, nth = 0) => {
      const hits = words.filter((x) => norm(x.w) === norm(word));
      if (!hits[nth]) throw new Error(`word "${word}" not in ${id}`);
      return hits[nth].t;
    };
    // Collect the scene's timeline.
    const ev = [];
    const p = {
      page, w, go, jump,
      glide: (t, dur, target, dx = 0, dy = 0) => ev.push({ t, kind: "glide", dur, target, dx, dy }),
      scroll: (t, dur, target, offset = 140) => ev.push({ t, kind: "scroll", dur, target, offset }),
      click: (t) => ev.push({ t, kind: "click" }),
      cut: (t, fn) => ev.push({ t, kind: "cut", fn }),
      hook: (fn) => ev.push({ t: 0, kind: "hook", fn }),
      hide: () => { cur = [-200, -200]; },
    };
    await prep(p);
    if (cur[0] >= 0) await page.mouse.move(cur[0], cur[1]);
    plan(p);
    ev.sort((a, b) => a.t - b.t);

    const dur = timing[id].dur + pad;
    const n = Math.round(dur * FPS);
    let glide = null, scroll = null, clickAt = null, settleUntil = 0, hook = null, lastSig = null;
    scenes.push({ id, start: frames.length, frames: n });
    for (let f = 0; f < n; f++) {
      const t = f / FPS;
      let dirty = f === 0;
      while (ev.length && ev[0].t <= t) {
        const e = ev.shift();
        dirty = true;
        if (e.kind === "glide") {
          let to = Array.isArray(e.target) ? [e.target[0] * S, e.target[1] * S] : e.target;
          if (!Array.isArray(to)) {
            const b = await e.target.boundingBox({ timeout: 3000 }).catch(() => null);
            if (!b) console.warn(`  ${id}: glide target not found at ${t.toFixed(2)}s`);
            to = b ? [b.x + b.width / 2, b.y + b.height / 2] : cur;
          }
          glide = { t0: t, t1: t + e.dur, from: [...cur], to: [to[0] + e.dx * S, to[1] + e.dy * S] };
        } else if (e.kind === "scroll") {
          const y0 = await page.evaluate(() => window.scrollY);
          const y1 = typeof e.target === "number" ? e.target : e.target.by !== undefined ? y0 + e.target.by * S : await absY(e.target, e.offset).catch(() => y0);
          scroll = { t0: t, t1: t + e.dur, y0, y1: Math.max(0, y1) };
        } else if (e.kind === "click") {
          await page.mouse.move(cur[0], cur[1]);
          await page.mouse.down(); await page.mouse.up();
          clickAt = { t, x: cur[0], y: cur[1] };
          await page.waitForTimeout(350);
          settleUntil = t + 0.7;
        } else if (e.kind === "cut") {
          await e.fn();
          glide = null; scroll = null; clickAt = null;
          settleUntil = t + 0.3;
        } else if (e.kind === "hook") hook = e.fn;
      }
      if (glide) {
        const k = Math.min(1, (t - glide.t0) / (glide.t1 - glide.t0));
        cur = [glide.from[0] + (glide.to[0] - glide.from[0]) * ease(k), glide.from[1] + (glide.to[1] - glide.from[1]) * ease(k)];
        dirty = true;
        if (k >= 1) glide = null;
      }
      if (scroll) {
        const k = Math.min(1, (t - scroll.t0) / (scroll.t1 - scroll.t0));
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scroll.y0 + (scroll.y1 - scroll.y0) * ease(k));
        dirty = true;
        if (k >= 1) scroll = null;
      }
      if (cur[0] >= 0) await page.mouse.move(cur[0], cur[1]);
      await page.evaluate(([x, y, rx, ry, age]) => { window.__cursor?.(x, y); window.__ripple?.(rx, ry, age); },
        [cur[0], cur[1], clickAt?.x ?? 0, clickAt?.y ?? 0, clickAt ? t - clickAt.t : -1]);
      if (clickAt && t - clickAt.t <= 0.65) dirty = true;
      if (t < settleUntil) dirty = true;
      if (hook) { const sig = await page.evaluate(hook, t); if (sig !== lastSig) { dirty = true; lastSig = sig; } }
      if (dirty || !frames.length) {
        const { data } = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 90, optimizeForSpeed: true });
        const file = `${String(shot++).padStart(6, "0")}.jpg`;
        writeFileSync(path.join(framesDir, file), Buffer.from(data, "base64"));
        frames.push(file);
      } else frames.push(frames[frames.length - 1]);
    }
    console.log(`  ${id} ${(n / FPS).toFixed(2)}s, ${ev.length ? `${ev.length} event(s) after the end` : "ok"}`);
  }
  await browser.close();
  writeFileSync(path.join(dir, "record.json"), JSON.stringify({ fps: FPS, frames, scenes }));
  console.log(`  ${name}: ${frames.length} frames (${shot} captured), ${(frames.length / FPS).toFixed(1)}s`);
}

// A terminal that replays the real output of `npm test` and `npm run verify`, captured just before rendering.
// It draws itself for a given time t, so typing speed matches the video, not the capture speed.
function terminalPage() {
  const test = readFileSync(path.join(BUILD, "npm_test.txt"), "utf8").trim().split("\n");
  const verify = readFileSync(path.join(BUILD, "npm_verify.txt"), "utf8").trim().split("\n");
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const color = (l) => (/PASS|passed|✓/.test(l) ? "#4ade80" : /FAIL/.test(l) ? "#f87171" : "#cbd5e1");
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;height:100%;background:#0b1016;font-family:"Cascadia Mono",Consolas,monospace;}
    .win{position:absolute;inset:60px 110px 150px;border-radius:16px;background:#0f172a;box-shadow:0 30px 80px rgba(0,0,0,.5);overflow:hidden;border:1px solid #1e293b}
    .bar{height:44px;background:#1e293b;display:flex;align-items:center;gap:9px;padding:0 18px;color:#94a3b8;font:15px Segoe UI,sans-serif}
    .d{width:13px;height:13px;border-radius:50%}
    pre{margin:0;padding:24px 32px;font-size:21px;line-height:1.5;color:#cbd5e1;white-space:pre-wrap}
    .p{color:#60a5fa}
  </style></head><body><div class="win"><div class="bar"><span class="d" style="background:#f87171"></span><span class="d" style="background:#fbbf24"></span><span class="d" style="background:#4ade80"></span><span style="margin-left:14px">proofline: terminal</span></div><pre id="o"></pre></div>
  <script>
    const T=${JSON.stringify(test.map((l) => [esc(l), color(l)]))}, V=${JSON.stringify(verify.map((l) => [esc(l), color(l)]))};
    window.__plan = { a: 0.3, b: 99 };
    function block(cmd, lines, start, cps, gap, t) {
      if (t < start) return ["", 0];
      const typed = Math.min(cmd.length, Math.floor((t - start) * cps));
      let html = '<div><span class="p">proofline $</span> ' + cmd.slice(0, typed) + (typed < cmd.length ? '<span style="background:#cbd5e1">&nbsp;</span>' : "") + "</div>";
      const outStart = start + cmd.length / cps + 0.3;
      const shown = t < outStart ? 0 : Math.min(lines.length, Math.floor((t - outStart) / gap) + 1);
      for (let i = 0; i < shown; i++) html += '<div style="color:' + lines[i][1] + '">' + (lines[i][0] || "&nbsp;") + "</div>";
      return [html, typed * 100 + shown];
    }
    window.__frame = (t) => {
      const [h1, s1] = block("npm test", T, __plan.a, 16, 0.07, t);
      const [h2, s2] = block("npm run verify", V, __plan.b, 16, 0.45, t);
      document.getElementById("o").innerHTML = h1 + (h2 ? "<br>" + h2 : "");
      return s1 * 10000 + s2;
    };
  </script></body></html>`;
  const f = path.join(BUILD, "terminal.html");
  writeFileSync(f, html);
  return pathToFileURL(f).href;
}

function titlePage() {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;height:100%;font-family:Inter,"Segoe UI",system-ui,sans-serif;color:#0f172a;
      background:radial-gradient(1100px 600px at 85% -10%,#e0e7ff 0,transparent 60%),radial-gradient(900px 500px at -10% 110%,#dbeafe 0,transparent 60%),#fbfbfd}
    .w{height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 160px}
    .logo{display:flex;align-items:center;gap:18px;font-size:40px;font-weight:700}
    h1{font-size:108px;margin:46px 0 0;letter-spacing:-3px;line-height:1.02}
    .g{background:linear-gradient(90deg,#1d4ed8,#4f46e5);-webkit-background-clip:text;color:transparent}
    p{font-size:34px;color:#475569;margin:26px 0 0}
    .pill{display:inline-block;margin-top:40px;padding:12px 24px;border-radius:999px;background:#eef2ff;color:#1d4ed8;font-weight:600;font-size:26px}
  </style></head><body><div class="w">
    <div class="logo"><svg width="64" height="64" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d4ed8"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#g)"/><path d="M9 17l5 5 9-12" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Proofline</div>
    <h1>Ujwal<br><span class="g">Team USV</span></h1>
    <p>Software engineer · Solo entry · RealPage challenge: Rental Housing Law Navigator</p>
    <span class="pill">Hack-Nation 7th Global AI Hackathon · October 2026</span>
  </div></body></html>`;
  const f = path.join(BUILD, "title.html");
  writeFileSync(f, html);
  return pathToFileURL(f).href;
}

const showProof = (page) => page.getByRole("button", { name: "Show proof" }).first();
const checkBtn = (page) => page.getByRole("button", { name: "Check this change" });
const around = (page) => page.getByRole("button", { name: /Around 1977/ }).first();

const PLANS = {
  demo: [
    ["d1", (p) => p.go("/"), (p) => {
      p.glide(0.4, 1.4, [980, 470]);
      p.glide(p.w("proofline"), 0.9, p.page.locator("input").first());
    }],
    ["d2", (p) => p.go("/check?address=A0016"), (p) => {
      p.scroll(0.3, 0.9, showProof(p.page), 560);
      p.glide(1.3, 0.6, showProof(p.page));
      const c = Math.max(2.0, p.w("finds"));
      p.click(c);
      p.scroll(c + 0.4, 1.1, showProof(p.page), 230);
      p.glide(p.w("quote"), 0.9, [900, 600]);
    }],
    ["d3", async (p) => { await p.go("/preflight?address=A0016"); await p.jump(checkBtn(p.page), 640); }, (p) => {
      p.glide(0.4, 0.9, checkBtn(p.page));
      const c = Math.max(1.4, p.w("check") - 0.1);
      p.click(c);
      p.scroll(c + 0.45, 1.0, p.page.getByText("Not allowed").first(), 170);
      p.glide(Math.max(c + 1.5, p.w("limit")), 0.8, p.page.getByText("Not allowed").first());
      // The San Francisco ordinance quote (the 1.6% limit), not the state cap it replaces.
      const sfQuote = p.page.locator(".law-quote", { hasText: "1.6%" }).first();
      p.scroll(p.w("ordinance") - 0.6, 1.0, sfQuote, 380);
      p.glide(p.w("ordinance") + 0.5, 0.8, sfQuote);
    }],
    ["d4", async (p) => { await p.go("/check?address=A0107"); await p.jump(around(p.page), 520); }, (p) => {
      p.glide(0.4, 1.0, p.page.getByText("Not sure yet").first());
      p.glide(p.w("says"), 1.0, around(p.page));
      p.click(p.w("answer"));
      p.scroll(p.w("answer") + 0.6, 1.4, { by: 380 });
    }],
    ["d5", (p) => p.go("/watch/T3"), (p) => {
      p.glide(0.3, 0.9, p.page.getByText("140", { exact: true }).first());
      p.glide(p.w("flags"), 0.8, p.page.getByText("90", { exact: true }).first());
    }],
    ["d6", async (p) => { await p.go("/how-it-works"); await p.jump(p.page.locator("#base-h"), 150); }, (p) => {
      p.glide(0.5, 1.2, [760, 520]);
      p.glide(p.w("zero"), 1.0, [1300, 560]);
      p.scroll(p.w("verify"), 1.6, p.page.locator("#num-h"), 150);
    }],
  ],
  tech: [
    ["t1", (p) => p.go("/how-it-works"), (p) => {
      p.glide(0.5, 1.2, [820, 330]);
      p.scroll(p.w("deterministic"), 1.5, p.page.locator("#pipe-h"), 150);
    }],
    ["t2", async (p) => { await p.go("/how-it-works"); await p.jump(p.page.locator("#pipe-h"), 150); }, (p) => {
      // Point at each pipeline card as it is named: Read, Check quotes, Second check.
      p.glide(0.4, 1.0, p.page.getByText("Read", { exact: true }).first());
      p.glide(p.w("code"), 0.9, p.page.getByText("Check quotes", { exact: true }).first());
      p.glide(p.w("second"), 0.9, p.page.getByText("Second check", { exact: true }).first());
    }],
    ["t3", async (p) => { await p.go(terminalPage()); p.hide(); }, (p) => {
      const b = p.w("verify");
      p.hook(new Function("t", `window.__plan.b = ${b}; return window.__frame(t);`));
    }],
    ["t4", async (p) => { await p.go("/how-it-works"); await p.jump(p.page.locator("#base-h"), 150); }, (p) => {
      p.glide(0.2, 1.0, [800, 520]);
      p.glide(p.w("proofline"), 0.9, [1300, 560]);
    }],
    ["t5", async (p) => { await p.go("/developers"); await p.jump(p.page.locator("#mcp-h"), 260); }, (p) => {
      p.glide(0.3, 1.0, p.page.locator("#mcp-h"));
      const a = p.w("thats") - 0.15, b = p.w("we") - 0.15;
      p.cut(a, async () => { await p.go("https://github.com/usv240/proofline"); await p.jump(p.page.locator("article.markdown-body").first(), 40).catch(() => {}); });
      p.glide(a + 0.05, 1.2, [700, 330]);
      p.cut(b, async () => { await p.go("/how-it-works"); await p.jump(p.page.locator("#scale"), 150); });
      p.glide(b + 0.05, 1.0, p.page.locator("#scale-h"));
    }],
  ],
  team: [
    ["m1", async (p) => { await p.go(titlePage()); p.hide(); }, () => {}],
    ["m2", async (p) => { await p.go("/"); await p.jump(p.page.locator("#prob-h"), 170); }, (p) => {
      p.glide(0.1, 1.4, [760, 480]);
      p.glide(p.w("berkeley"), 1.2, [1150, 640]);
    }],
    ["m3", async (p) => { await p.go("/"); await p.jump(p.page.locator("#what-h"), 150); }, (p) => {
      p.glide(0.4, 1.2, [700, 520]);
      p.glide(p.w("rent"), 1.2, [1250, 600]);
    }],
    ["m4", async (p) => { await p.go("/how-it-works"); await p.jump(p.page.locator("#num-h"), 150); }, (p) => {
      p.glide(0.5, 1.2, [820, 450]);
      const a = p.w("every") - 0.4;
      p.cut(a, () => p.go("/"));
      p.glide(a + 0.05, 1.5, [980, 520]);
    }],
  ],
};

for (const name of which === "all" ? Object.keys(PLANS) : [which]) {
  console.log(`rendering ${name}`);
  await renderVideo(name, PLANS[name]);
}
