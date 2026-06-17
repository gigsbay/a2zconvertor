"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "All Tools", href: "/tools" },
  { label: "Image Tools", href: "/tools?category=Image%20Tools" },
  { label: "PDF Tools", href: "/tools?category=PDF%20Tools" },
  { label: "Video Tools", href: "/tools?category=Video%20Tools" },
  { label: "Audio Tools", href: "/tools?category=Audio%20Tools" },
  { label: "AI Tools", href: "/tools?category=AI%20Tools" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-black tracking-tight">
          A2Z<span className="text-blue-500">Convertor</span>
        </Link>

        <div className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/request-tool"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Request New Tool
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white lg:hidden"
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className="h-0.5 rounded-full bg-current" />
            <span className="h-0.5 rounded-full bg-current" />
            <span className="h-0.5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 px-6 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-tool"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Request New Tool
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
