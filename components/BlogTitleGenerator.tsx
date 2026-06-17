"use client";

import { useMemo, useState } from "react";

const templates: Record<string, string[]> = {
  Listicle: [
    "{n} Practical {topic} Ideas You Can Use Today",
    "{n} Common {topic} Mistakes and How to Avoid Them",
    "{n} Simple Ways to Improve Your {topic}",
  ],
  "How-to": [
    "How to Get Better at {topic} Without Overcomplicating It",
    "How to Start with {topic}: A Clear Step-by-Step Guide",
    "How to Use {topic} to Save Time and Work Smarter",
  ],
  "Beginner guide": [
    "{topic} for Beginners: What to Know First",
    "The Beginner's Guide to {topic}",
    "A Simple Introduction to {topic} for New Starters",
  ],
  Comparison: [
    "{topic} vs Alternatives: What Should You Choose?",
    "The Pros and Cons of {topic}",
    "Comparing {topic}: What Matters Most?",
  ],
  Question: [
    "Is {topic} Worth It?",
    "What Is the Best Way to Approach {topic}?",
    "Why Does {topic} Matter Right Now?",
  ],
};

function titleCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function BlogTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Listicle");
  const [copiedTitle, setCopiedTitle] = useState("");

  const titles = useMemo(() => {
    const cleanTopic = titleCase(topic) || "Your Topic";
    const numbers = [5, 7, 9, 10, 12];
    const selectedTemplates = templates[style];
    const allTemplates = [...selectedTemplates, ...Object.values(templates).flat()];

    return Array.from(
      new Set(
        allTemplates.map((template, index) =>
          template.replaceAll("{topic}", cleanTopic).replaceAll("{n}", String(numbers[index % numbers.length]))
        )
      )
    ).slice(0, 15);
  }, [topic, style]);

  async function copyTitle(title: string) {
    await navigator.clipboard.writeText(title);
    setCopiedTitle(title);
    window.setTimeout(() => setCopiedTitle(""), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Blog Title Generator</h1>
      <p className="mb-8 text-slate-400">
        Create quick, template-based blog title ideas from your topic.
      </p>

      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <input
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="Blog topic"
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />
        <select
          value={style}
          onChange={(event) => setStyle(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {Object.keys(templates).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-3">
        {titles.map((title) => (
          <div
            key={title}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
          >
            <p className="font-semibold text-slate-100">{title}</p>
            <button
              type="button"
              onClick={() => copyTitle(title)}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-blue-500/60"
            >
              {copiedTitle === title ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
