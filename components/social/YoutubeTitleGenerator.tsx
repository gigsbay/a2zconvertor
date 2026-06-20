"use client";

import { useMemo, useState } from "react";

const templates: Record<string, string[]> = {
  Tutorial: ["How to {topic}: A Simple Step-by-Step Guide", "{topic} Tutorial for Beginners", "The Easiest Way to Start {topic}", "How I Approach {topic} from Start to Finish"],
  Listicle: ["7 {topic} Ideas Worth Trying", "10 Things to Know About {topic}", "5 Common {topic} Mistakes", "9 Practical Ways to Improve {topic}"],
  Review: ["My Honest Review of {topic}", "{topic}: What Worked and What Did Not", "Is {topic} Worth Your Time?", "{topic} Review After Real Use"],
  Beginner: ["{topic} for Complete Beginners", "Start Here: A Beginner Guide to {topic}", "What I Wish I Knew Before {topic}", "Your First Week with {topic}"],
  Viral: ["I Tried {topic} So You Do Not Have To", "The Truth About {topic}", "Why Everyone Is Talking About {topic}", "This Changed How I Think About {topic}"],
};

export default function YoutubeTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Tutorial");
  const [copied, setCopied] = useState("");
  const titles = useMemo(() => {
    const subject = topic.trim() || "Your Video Topic";
    return Array.from(new Set([...templates[style], ...Object.values(templates).flat()].map((item) => item.replaceAll("{topic}", subject)))).slice(0, 10);
  }, [topic, style]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="text-4xl font-black">YouTube Title Generator</h1>
      <p className="mt-4 text-slate-400">
        Generate ten template-based title starting points. Clear titles help
        viewers understand a video, but no title can guarantee performance.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px]">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Video topic" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500" />
        <select value={style} onChange={(e) => setStyle(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
          {Object.keys(templates).map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div className="mt-8 grid gap-3">
        {titles.map((title) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold">{title}</p>
              <button type="button" onClick={() => copy(title)} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-blue-500/60">
                {copied === title ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">{title.length} characters {title.length <= 60 ? "• concise" : "• consider shortening"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
