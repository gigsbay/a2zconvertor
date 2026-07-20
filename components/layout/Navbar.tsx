"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import ToolBadge from "@/components/ToolBadge";
import { tools } from "@/data/tools";

type ExplorerCategory = {
  key: string;
  label: string;
  href: string;
  icon: "image" | "pdf" | "video" | "audio" | "ai" | "social";
  match: (tool: (typeof tools)[number]) => boolean;
};

const explorerCategories: ExplorerCategory[] = [
  {
    key: "image",
    label: "Image",
    href: "/image-tools",
    icon: "image",
    match: (tool) => tool.category === "Image Tools",
  },
  {
    key: "pdf",
    label: "PDF",
    href: "/pdf-tools",
    icon: "pdf",
    match: (tool) => tool.category === "PDF Tools",
  },
  {
    key: "video",
    label: "Video",
    href: "/video-tools",
    icon: "video",
    match: (tool) => tool.category === "Video Tools",
  },
  {
    key: "audio",
    label: "Audio",
    href: "/audio-tools",
    icon: "audio",
    match: (tool) => tool.category === "Audio Tools",
  },
  {
    key: "ai",
    label: "AI Creator",
    href: "/ai-tools",
    icon: "ai",
    match: (tool) => tool.category === "AI Creator Tools",
  },
  {
    key: "social",
    label: "Social Growth",
    href: "/social-media-tools",
    icon: "social",
    match: (tool) =>
      tool.category === "Social Media Tools" ||
      ["instagram", "tiktok", "youtube", "social-media", "content-ideas"].some((word) => tool.slug.includes(word)),
  },
];

const utilityLinks = [
  { label: "All Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(explorerCategories[0].key);

  const explorerTools = useMemo(
    () =>
      explorerCategories.map((category) => ({
        ...category,
        tools: tools.filter(category.match),
      })),
    [],
  );

  const active = explorerTools.find((category) => category.key === activeCategory) ?? explorerTools[0];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-black tracking-tight">
          A2Z<span className="text-blue-500">Convertor</span>
        </Link>

        <div className="hidden items-center gap-3 text-sm text-slate-300 lg:flex">
          {utilityLinks.map((link) => (
            <Link key={link.label} href={link.href} className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/support"
            className="rounded-full border border-amber-300/30 px-5 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10"
          >
            Support Us
          </Link>
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

      <div className="hidden border-t border-white/10 lg:block">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {explorerTools.map((category) => {
              const selected = category.key === active.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "border-blue-400/60 bg-blue-500/15 text-white"
                      : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <CategoryIcon icon={category.icon} />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-1">
            <Link href={active.href} className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-blue-400/60">
              View all {active.label}
            </Link>
            {active.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/convert/${tool.slug}`}
                className="group flex min-w-fit items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400/50 hover:text-white"
              >
                <span>{tool.name}</span>
                {tool.category === "AI Creator Tools" ? <ToolBadge kind="ai" className="px-2 py-0.5 text-[10px]" /> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 px-6 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-4">
            <div className="grid grid-cols-2 gap-2">
              {utilityLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {explorerTools.map((category) => (
              <details key={category.key} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4" open={category.key === "image"}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-white">
                  <span className="flex items-center gap-2"><CategoryIcon icon={category.icon} /> {category.label}</span>
                  <span className="text-xs text-slate-500">{category.tools.length} tools</span>
                </summary>
                <div className="mt-3 grid gap-2">
                  <Link href={category.href} onClick={() => setIsOpen(false)} className="rounded-xl border border-blue-400/30 px-3 py-2 text-sm font-semibold text-blue-200">
                    View all {category.label}
                  </Link>
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/convert/${tool.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}

            <div className="mt-2 flex justify-center"><ThemeToggle /></div>
            <Link href="/support" onClick={() => setIsOpen(false)} className="rounded-xl border border-amber-300/30 px-4 py-3 text-center text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10">
              Support Us
            </Link>
            <Link href="/request-tool" onClick={() => setIsOpen(false)} className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500">
              Request New Tool
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function CategoryIcon({ icon }: { icon: ExplorerCategory["icon"] }) {
  const common = "h-4 w-4";
  if (icon === "image") return <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m7 15 3-3 2 2 3-4 2 5"/><circle cx="8" cy="9" r="1"/></svg>;
  if (icon === "pdf") return <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M9 16h6"/><path d="M9 12h3"/></svg>;
  if (icon === "video") return <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></svg>;
  if (icon === "audio") return <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 9v6h4l5 4V5L9 9z"/><path d="M18 9a4 4 0 0 1 0 6"/></svg>;
  if (icon === "ai") return <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m6 6 2.5 2.5"/><path d="m15.5 15.5 2.5 2.5"/><path d="m18 6-2.5 2.5"/><path d="m8.5 15.5-2.5 2.5"/><circle cx="12" cy="12" r="4"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20a5 5 0 0 1 10 0"/><path d="M12 20a5 5 0 0 1 10 0"/></svg>;
}