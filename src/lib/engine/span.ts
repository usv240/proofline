// Verifies that a quoted span exists in its source text, and returns the exact source substring.
// Matching tries the quote as written first, then a normalized form (whitespace, curly quotes,
// non-breaking spaces, dashes). The returned span is always copied from the source, never from the model.

export interface SpanMatch {
  start: number;
  end: number;
  text: string;
  match: "exact" | "normalized";
}

const CHAR_MAP: Record<string, string> = {
  "‘": "'", "’": "'", "‚": "'", "‛": "'",
  "“": '"', "”": '"', "„": '"', "‟": '"',
  "–": "-", "—": "-", "−": "-", " ": " ", " ": " ", " ": " ",
  "­": "", "​": "",
};

function normalizeWithMap(s: string): { norm: string; map: number[] } {
  let norm = "";
  const map: number[] = [];
  let lastSpace = false;
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if (ch in CHAR_MAP) ch = CHAR_MAP[ch];
    if (ch === "") continue;
    if (/\s/.test(ch)) {
      // PDF line breaks inside hyphenated words ("owner-\noccupied") match "owner-occupied".
      if (lastSpace || norm.endsWith("-")) continue;
      ch = " ";
      lastSpace = true;
    } else lastSpace = false;
    norm += ch.toLowerCase();
    map.push(i);
  }
  return { norm, map };
}

function normalize(s: string): string {
  return normalizeWithMap(s).norm.trim();
}

export function findSpan(source: string, quote: string): SpanMatch | null {
  const q = quote.trim();
  if (q.length < 20) return null;
  const i = source.indexOf(q);
  if (i >= 0) return { start: i, end: i + q.length, text: q, match: "exact" };

  const { norm, map } = normalizeWithMap(source);
  const nq = normalize(q);
  const j = norm.indexOf(nq);
  if (j >= 0) {
    const start = map[j];
    const end = map[j + nq.length - 1] + 1;
    return { start, end, text: source.slice(start, end), match: "normalized" };
  }
  // Quotes joined with an ellipsis: keep the longest piece that is found verbatim.
  const parts = q.split(/\s*(?:\.\.\.|…)\s*/).filter((p) => p.length >= 20).sort((a, b) => b.length - a.length);
  if (parts.length > 1) {
    for (const p of parts) {
      const m = findSpan(source, p);
      if (m) return m;
    }
  }
  return null;
}
