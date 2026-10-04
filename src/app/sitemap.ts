import type { MetadataRoute } from "next";

const BASE = "https://proofline-opal.vercel.app";
const PAGES = ["", "/judges", "/check", "/preflight", "/watch", "/byo", "/how-it-works", "/learn", "/developers", "/data", "/method-note", "/status"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
