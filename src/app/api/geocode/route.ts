// Resolves any typed address to its legal city with the US Census Geocoder (no key needed).
// Building facts are unknown for live addresses, so rules that depend on them come back "Not sure yet".
import type { AddressFacts } from "@/lib/engine/types";

const CITIES = new Set(["Los Angeles", "San Francisco", "San Diego", "Berkeley", "Santa Ana", "Jersey City", "Hoboken", "Newark", "Boston", "Cambridge"]);
const STATES: Record<string, AddressFacts["state"]> = { "06": "CA", "34": "NJ", "25": "MA" };

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 6 || q.length > 200) return Response.json({ message: "Please type a street address and city." }, { status: 400 });
  const url = new URL("https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress");
  url.search = new URLSearchParams({ address: q, benchmark: "Public_AR_Current", vintage: "Current_Current", layers: "Incorporated Places,States", format: "json" }).toString();
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const j = await r.json();
    const m = j?.result?.addressMatches?.[0];
    if (!m) return Response.json({ message: "We could not find that address. Try the street number and name, and the city." }, { status: 404 });
    const g = m.geographies ?? {};
    const stateFips = g.States?.[0]?.STATE;
    const state = STATES[stateFips];
    if (!state) return Response.json({ message: `We cover California, New Jersey and Massachusetts right now. This address is in ${g.States?.[0]?.NAME ?? "another state"}.` }, { status: 422 });
    const place = String(g["Incorporated Places"]?.[0]?.NAME ?? "").replace(/ city$/i, "");
    const city = CITIES.has(place) ? place : place || "Unincorporated area";
    const facts: AddressFacts = {
      address_id: "LIVE",
      street_address: m.matchedAddress.split(",")[0],
      postal_city: m.addressComponents?.city ?? city,
      state,
      city,
      zip: m.addressComponents?.zip ?? "",
      year_built: null,
      units: { min: null, max: null, source: "missing" },
      building_type: "unknown",
      government_subsidized: null,
      use_description: "Live lookup: building facts not available",
      resolution_method: "census_geocoder",
      resolution_confidence: 0.95,
    };
    return Response.json({ facts, note: CITIES.has(place) ? null : `This address is in ${city}. Only ${state} state rules are shown.` });
  } catch {
    return Response.json({ message: "The Census Geocoder did not answer in time. Please try again, or pick a sample address." }, { status: 504 });
  }
}
