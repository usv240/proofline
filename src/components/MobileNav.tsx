"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 items-center rounded-lg border border-border px-3 text-[15px]"
      >
        Menu
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="absolute inset-x-0 top-full border-b border-border bg-bg px-4 pb-4 shadow-lg">
          {items.map((n) => (
            <Link key={n.href} href={n.href} className="block rounded-lg px-3 py-3 text-[17px] hover:bg-surface">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
