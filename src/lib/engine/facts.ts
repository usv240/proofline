// Builds address facts from the resolved assessor sample.
// Unit counts come from the assessor column when present, otherwise from the property description
// (New Jersey MOD-IV descriptions such as "3S-F-D-6U" encode the unit count) or the official use band
// ("5+ units", "APT 7-30 UNITS"). The source is kept so the UI can say where a number came from.

import type { AddressFacts, UnitsFact } from "./types";

export interface AddressRow {
  address_id: string;
  street_address: string;
  postal_city: string;
  state: string;
  zip: string;
  year_built: string;
  units: string;
  use_code: string;
  use_description: string;
  legal_city: string;
  resolution_method: string;
  resolution_confidence: string;
}

export function unitsFromDescription(desc: string): UnitsFact | null {
  const d = desc.toUpperCase();
  const band = /(\d+)\s*-\s*(\d+)\s*UNITS?\b/.exec(d) ?? /\b(\d+)-(\d+)-UNIT/.exec(d);
  if (band) return { min: +band[1], max: +band[2], source: "use_band" };
  if (/\b5\+\s*UNITS|FIVE OR MORE|5 OR MORE/.test(d)) return { min: 5, max: null, source: "use_band" };
  if (/>\s*8-UNIT/.test(d)) return { min: 9, max: null, source: "use_band" };
  if (/15 UNITS OR MORE/.test(d)) return { min: 15, max: null, source: "use_band" };
  if (/5 TO 14 UNITS/.test(d)) return { min: 5, max: 14, source: "use_band" };
  if (/4 UNITS OR LESS/.test(d)) return { min: 1, max: 4, source: "use_band" };
  // MOD-IV building descriptions: "<n>U" tokens, one per building on the lot.
  const counts = [...d.matchAll(/(\d+)\s*U(?=$|[^A-Z]|G|H|N)/g)].map((m) => +m[1]).filter((n) => n > 0 && n < 2000);
  if (counts.length) {
    const max = counts.reduce((a, b) => a + b, 0);
    return { min: Math.max(...counts), max, source: "description" };
  }
  return null;
}

export function buildFacts(r: AddressRow): AddressFacts {
  let units: UnitsFact;
  if (r.units && !Number.isNaN(+r.units)) units = { min: +r.units, max: +r.units, source: "assessor" };
  else units = unitsFromDescription(r.use_description) ?? { min: null, max: null, source: "missing" };

  const d = r.use_description.toUpperCase();
  let building_type: AddressFacts["building_type"] = "multifamily";
  if (/ELDERLY/.test(d)) building_type = "elderly";
  else if (/CONDO/.test(d)) building_type = "condo";

  const government_subsidized = /SUBSD|SECTION 8|S-\s*8|AFFORDABL/.test(d) ? true : null;

  return {
    address_id: r.address_id,
    street_address: r.street_address,
    postal_city: r.postal_city,
    state: r.state as AddressFacts["state"],
    city: r.legal_city,
    zip: r.zip,
    year_built: r.year_built ? +r.year_built : null,
    units,
    building_type,
    government_subsidized,
    use_description: r.use_description,
    resolution_method: r.resolution_method,
    resolution_confidence: +r.resolution_confidence,
  };
}
