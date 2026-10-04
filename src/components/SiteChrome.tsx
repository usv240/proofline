import Link from "next/link";
import { InfoButton } from "./InfoButton";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export const NAV = [
  { href: "/check", label: "Check an address" },
  { href: "/preflight", label: "Pre-Flight" },
  { href: "/watch", label: "Law Watch" },
  { href: "/byo", label: "Bring your own" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/learn", label: "Learn" },
];

export function DisclaimerBar() {
  return (
    <div role="note" className="no-print border-b border-border bg-surface text-[14px] text-muted">
      <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-1">
        <span>Proofline explains housing law. It is not legal advice.</span>
        <InfoButton k="disclaimer" />
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <svg aria-hidden width="26" height="26" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="var(--brand)" />
            <path d="M9 17l5 5 9-12" stroke="var(--brand-ink)" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Proofline</span>
        </Link>
        <nav aria-label="Main" className="ml-4 hidden gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-[15px] text-muted hover:bg-surface hover:text-text">
              {n.label}
            </Link>
          ))}
        </nav>
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
    <footer className="no-print mt-16 border-t border-border bg-surface text-[14px] text-muted">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        <div>
          <p className="font-semibold text-text">Proofline</p>
          <p className="mt-1">
            Proofline explains housing law. It is not legal advice and not a compliance certification.
          </p>
        </div>
        <div>
          <p className="font-semibold text-text">Sources</p>
          <p className="mt-1">
            Official state and city documents from the RealPage starter pack, retrieved October 1, 2026, plus public pages listed
            there as links, retrieved by Proofline on October 3, 2026. Answers show their as-of date.
          </p>
        </div>
        <div>
          <p className="font-semibold text-text">Open and checkable</p>
          <ul className="mt-1 space-y-1">
            <li><Link className="underline underline-offset-2" href="/data">Download the data</Link></li>
            <li><Link className="underline underline-offset-2" href="/how-it-works#audit">Verify the audit log</Link></li>
            <li><Link className="underline underline-offset-2" href="/how-it-works#api">API and MCP</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
