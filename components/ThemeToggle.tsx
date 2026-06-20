"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    typeof document === "undefined" ? "dark" : document.documentElement.dataset.theme || "dark"
  );
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("a2z-theme", next);
    setTheme(next);
  }
  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <button type="button" onClick={toggle} aria-label={`Switch to ${nextTheme} theme`} title={`Switch to ${nextTheme} theme`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900 text-xs font-bold">
      {theme === "dark" ? "SUN" : "MOON"}
    </button>
  );
}