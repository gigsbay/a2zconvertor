"use client";

import { useMemo, useState } from "react";

const categoryBanks: Record<string, string[]> = {
  General: ["tips", "ideas", "guide", "daily", "inspiration", "community"],
  Business: ["smallbusiness", "marketing", "startup", "growth", "strategy"],
  Lifestyle: ["lifestyle", "wellness", "motivation", "habits", "mindset"],
  Travel: ["travel", "wanderlust", "tripideas", "explore", "adventure"],
  Food: ["foodie", "recipe", "homecooking", "foodlover", "tastethis"],
};

const toneBanks: Record<string, string[]> = {
  Balanced: ["now", "today", "best", "simple", "quick"],
  Professional: ["expert", "insights", "protips", "industry", "solutions"],
  Playful: ["fun", "vibes", "loveit", "trending", "musttry"],
};

function cleanKeyword(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("General");
  const [tone, setTone] = useState("Balanced");
  const [copied, setCopied] = useState(false);

  const hashtags = useMemo(() => {
    const keywords = topic
      .split(/[\s,]+/)
      .map(cleanKeyword)
      .filter(Boolean)
      .slice(0, 8);
    const base = keywords.length ? keywords : ["content"];
    const suggestions = new Set<string>();

    base.forEach((keyword) => suggestions.add(`#${keyword}`));
    base.forEach((keyword) => {
      categoryBanks[category].forEach((tag) => suggestions.add(`#${keyword}${tag}`));
      toneBanks[tone].forEach((tag) => suggestions.add(`#${tag}${keyword}`));
    });
    categoryBanks[category].forEach((tag) => suggestions.add(`#${tag}`));
    toneBanks[tone].forEach((tag) => suggestions.add(`#${tag}`));

    return Array.from(suggestions).slice(0, 30);
  }, [topic, category, tone]);

  async function copyAll() {
    await navigator.clipboard.writeText(hashtags.join(" "));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Hashtag Generator</h1>
      <p className="mb-8 text-slate-400">
        Generate smart, template-based hashtag ideas from your topic. No AI or
        external API is used.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="Topic or keywords"
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 md:col-span-3"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {Object.keys(categoryBanks).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select
          value={tone}
          onChange={(event) => setTone(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {Object.keys(toneBanks).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={copyAll}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          {copied ? "Copied" : "Copy All"}
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {hashtags.map((hashtag) => (
          <span
            key={hashtag}
            className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-100"
          >
            {hashtag}
          </span>
        ))}
      </div>
    </div>
  );
}
