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

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark or light theme"
      title="Toggle dark or light theme"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900 px-2 py-1 text-xs font-bold text-slate-200 shadow-sm transition hover:border-blue-400/60"
    >
      <span className={`rounded-full px-2 py-1 transition ${isDark ? "bg-blue-600 text-white" : "text-slate-400"}`}>
        Dark
      </span>
      <span className={`rounded-full px-2 py-1 transition ${!isDark ? "bg-blue-600 text-white" : "text-slate-400"}`}>
        Light
      </span>
    </button>
  );
}