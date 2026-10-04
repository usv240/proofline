# Fetches each link-only source from the official manifest once (read-only) and stores plain text with a
# provenance header. Pages that block automated access are recorded as such, never worked around.
import csv, hashlib, html, os, re, subprocess, sys, datetime
from html.parser import HTMLParser

ROOT = os.getcwd()
MAN = os.path.join(ROOT, "data", "starter", "corpus", "corpus_manifest.csv")
EXT = os.path.join(ROOT, "data", "corpus_ext")
SCRATCH = sys.argv[1] if len(sys.argv) > 1 else None

class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.out = []; self.skip = 0
    def handle_starttag(self, tag, a):
        if tag in ("script", "style", "noscript", "svg", "nav", "header", "footer"): self.skip += 1
        if tag in ("p", "div", "br", "li", "h1", "h2", "h3", "h4", "tr", "section", "article"): self.out.append("\n")
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg", "nav", "header", "footer") and self.skip: self.skip -= 1
    def handle_data(self, d):
        if not self.skip: self.out.append(d)

def to_text(raw):
    p = Text(); p.feed(raw)
    t = "".join(p.out)
    t = re.sub(r"[ \t]+", " ", t); t = re.sub(r"\n\s*\n+", "\n\n", t)
    return t.strip()

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"
today = datetime.date.today().isoformat()
report = []
for m in csv.DictReader(open(MAN, encoding="utf-8")):
    if m["status"] == "ok": continue
    out = os.path.join(EXT, m["doc_id"] + ".txt")
    if os.path.exists(out): report.append((m["doc_id"], "already have")); continue
    raw = None
    if m["doc_id"] == "D074" and SCRATCH and os.path.exists(os.path.join(SCRATCH, "d074.html")):
        raw = open(os.path.join(SCRATCH, "d074.html"), encoding="utf-8", errors="replace").read()
    else:
        r = subprocess.run(["curl", "-sL", "--max-time", "40", "-A", UA, "-w", "\n%{http_code}", m["url"]], capture_output=True)
        body = r.stdout.decode("utf-8", "replace"); code = body.rsplit("\n", 1)[-1]
        if code != "200": report.append((m["doc_id"], f"HTTP {code}")); continue
        raw = body.rsplit("\n", 1)[0]
    text = to_text(raw) if "<html" in raw[:5000].lower() or "<!doctype" in raw[:200].lower() else raw
    if len(text) < 400: report.append((m["doc_id"], f"too short ({len(text)} chars)")); continue
    sha = hashlib.sha256(text.encode()).hexdigest()
    with open(out, "w", encoding="utf-8") as f:
        f.write(f"SOURCE: {m['url']}\nRETRIEVED: {today} (fetched by Proofline; link-only in official manifest)\nSHA256: {sha}\n\n{text}\n")
    report.append((m["doc_id"], f"saved {len(text)} chars"))
for r in report: print(*r)
