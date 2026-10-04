// Loads the 500 resolved sample addresses into engine facts.
import { buildFacts, type AddressRow } from "./facts";
import type { AddressFacts } from "./types";

export function parseAddressesCsv(text: string): AddressFacts[] {
  const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
  const head = splitCsvLine(lines[0]);
  return lines.slice(1).map((l) => {
    const cells = splitCsvLine(l);
    const row = Object.fromEntries(head.map((h, i) => [h, cells[i] ?? ""])) as unknown as AddressRow;
    return buildFacts(row);
  });
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
