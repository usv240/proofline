"use client";

// The "i" button: a toggletip (opens on click or tap, closes on Esc or outside click), never a hover
// tooltip, so it works on touch screens and with a keyboard. 44px hit area around a 20px icon.
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { INFO, type InfoKey } from "@/content/info";

export function InfoButton({ k, label }: { k: InfoKey; label?: string }) {
  const info = INFO[k] as { title: string; body: string; learn?: string };
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={`More about ${label ?? info.title}`}
        className="no-print inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted hover:text-brand focus-visible:text-brand -my-3 align-middle"
      >
        <span
          aria-hidden
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-[12px] font-semibold leading-none italic"
          style={{ fontFamily: "Georgia, serif" }}
        >
          i
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={4}
          collisionPadding={12}
          className="z-50 w-[min(22rem,calc(100vw-24px))] rounded-xl border border-border bg-bg p-4 text-[15px] leading-relaxed text-text shadow-lg"
        >
          <p className="mb-1 font-semibold">{info.title}</p>
          <p className="text-muted">{info.body}</p>
          {info.learn && (
            <Link href={info.learn} className="mt-2 inline-block text-brand underline underline-offset-2">
              Learn more
            </Link>
          )}
          <Popover.Close aria-label="Close" className="absolute right-2 top-2 h-8 w-8 rounded-full text-muted hover:text-text">
            <span aria-hidden>x</span>
          </Popover.Close>
          <Popover.Arrow className="fill-[var(--border)]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
