"use client";

import { useEffect, useState } from "react";

// Light is the default for everyone. Dark is an explicit choice, saved in localStorage.
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("proofline-theme", next ? "dark" : "light");
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-[15px] hover:bg-surface"
    >
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {dark ? (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
      <span>{dark ? "Dark" : "Light"}</span>
    </button>
  );
}

/** Runs before paint so a saved dark choice does not flash light first. */
export const themeScript = `try{if(localStorage.getItem('proofline-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;
