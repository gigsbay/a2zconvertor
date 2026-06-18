"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const storageKey = "a2z-cookie-choice";

export default function CookiePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsVisible(!window.localStorage.getItem(storageKey));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function saveChoice(choice: "accepted" | "essential") {
    window.localStorage.setItem(storageKey, choice);
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-xl rounded-2xl border border-white/15 bg-slate-900 p-5 shadow-2xl shadow-black/50"
    >
      <h2 className="text-xl font-black text-white">Do you like cookies?</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Ours are the browser kind, sadly not the chocolate-chip kind. We use
        essential storage for preferences, and optional analytics may help us
        improve the tools. Read our{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-blue-300 hover:text-blue-200"
        >
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => saveChoice("essential")}
          className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5"
        >
          Only essential
        </button>
        <button
          type="button"
          onClick={() => saveChoice("accepted")}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Yes, delicious
        </button>
      </div>
    </aside>
  );
}
