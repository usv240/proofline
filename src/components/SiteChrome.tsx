import Link from "next/link";
import { InfoButton } from "./InfoButton";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export const NAV = [
  { href: "/check", label: "Check an address" },
  { href: "/preflight", label: "Pre-Flight" },
  { href: "/watch", label: "Law Watch" },
  { href: "/byo", label: "Bring your own" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/learn", label: "Learn" },
  { href: "/developers", label: "Developers" },
];

export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="pl-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--brand-2)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#pl-g)" />
      <path d="M9 17l5 5 9-12" stroke="var(--brand-ink)" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DisclaimerBar() {
  return (
    <div role="note" className="no-print border-b border-border bg-surface-2 text-[13.5px] text-muted">
      <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-1">
        <span>Proofline explains housing law. It is not legal advice.</span>
        <InfoButton k="disclaimer" />
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
          <Logo />
          <span>Proofline</span>
        </Link>
        <NavLinks items={NAV} />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <MobileNav items={NAV} />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print mt-20 border-t border-border bg-surface-2 text-[14px] text-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 font-semibold text-text"><Logo size={20} /> Proofline</p>
          <p className="mt-2 max-w-sm">
            Reads housing law, tests every rule against the building, proves each answer with the law&apos;s own words, and names the one fact
            that would settle the rest. Not legal advice and not a compliance certification.
          </p>
        </div>
        <div>
          <p className="eyebrow">Sources</p>
          <p className="mt-2">
            Official state and city documents from the RealPage starter pack, retrieved October 1, 2026, plus public pages listed there as
            links, retrieved by Proofline on October 3, 2026. Every answer shows its as-of date.
          </p>
        </div>
        <div>
          <p className="eyebrow">Open and checkable</p>
          <ul className="mt-2 space-y-1.5">
            <li><Link className="text-text-2 underline-offset-4 hover:underline" href="/data">Download the data</Link></li>
            <li><Link className="text-text-2 underline-offset-4 hover:underline" href="/how-it-works#audit">Verify the audit log</Link></li>
            <li><Link className="text-text-2 underline-offset-4 hover:underline" href="/how-it-works#api">API and MCP server</Link></li>
            <li><a className="text-text-2 underline-offset-4 hover:underline" href="https://github.com/usv240/proofline" target="_blank" rel="noreferrer">Source code (Apache-2.0)</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
