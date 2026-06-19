"use client";

import { useEffect, useState } from "react";
import { plannedToolRequests, ToolRequestStatus } from "@/data/toolRequests";

const storageKey = "a2z-planned-tool-votes";
const statusStyles: Record<ToolRequestStatus, string> = {
  Planned: "border-slate-500/30 bg-slate-500/10 text-slate-300",
  "Under Review": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Building: "border-green-400/30 bg-green-400/10 text-green-200",
};

export default function ToolVoting() {
  const [votes, setVotes] = useState<string[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
        if (Array.isArray(saved)) {
          setVotes(saved.filter((value) => typeof value === "string"));
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function toggleVote(toolId: string) {
    setVotes((current) => {
      const next = current.includes(toolId)
        ? current.filter((id) => id !== toolId)
        : [...current, toolId];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase text-blue-300">
          Product roadmap
        </p>
        <h2 className="mt-2 text-4xl font-black">Vote for upcoming tools</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-400">
          Tell us which ideas are most useful. Votes are saved in this browser
          for now. They are not global counts and are not sent to a backend.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {plannedToolRequests.map((tool) => {
            const hasVote = votes.includes(tool.id);
            return (
              <article
                key={tool.id}
                className="flex min-h-64 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-blue-300">
                      {tool.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{tool.name}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[tool.status]}`}>
                    {tool.status}
                  </span>
                </div>
                <p className="mt-4 leading-7 text-slate-400">{tool.description}</p>
                <button
                  type="button"
                  aria-pressed={hasVote}
                  onClick={() => toggleVote(tool.id)}
                  className={`mt-auto rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    hasVote
                      ? "border border-blue-400 bg-blue-500/15 text-blue-200"
                      : "bg-white text-black hover:bg-slate-200"
                  }`}
                >
                  {hasVote ? "Voted in this browser" : "Vote for this tool"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
