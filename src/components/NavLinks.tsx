"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="ml-2 hidden gap-0.5 lg:flex">
      {items.map((n) => {
        const active = path === n.href || path.startsWith(n.href + "/") || (n.href === "/check" && path.startsWith("/check"));
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-[14.5px] font-medium ${active ? "bg-brand-soft text-brand" : "text-text-2 hover:bg-surface-2 hover:text-text"}`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
