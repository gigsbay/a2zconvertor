"use client";

import { useMemo, useState } from "react";
import SocialOutputSection from "./SocialOutputSection";

const platforms = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"];
const goals = ["Followers", "Leads", "Engagement", "Sales"];

export default function ContentIdeasGenerator() {
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [goal, setGoal] = useState("Engagement");
  const [copied, setCopied] = useState("");
  const groups = useMemo(() => {
    const topic = niche.trim() || "your niche";
    return {
      Educational: [
        `Explain one ${topic} mistake beginners make.`,
        `Create a three-step ${topic} checklist.`,
        `Compare two common approaches to ${topic}.`,
        `Answer the most repeated question about ${topic}.`,
        `Share a useful ${topic} term in plain language.`,
      ],
      Entertaining: [
        `Show the expectation versus reality of ${topic}.`,
        `Create a quick ${topic} myth-or-fact post.`,
        `Share an unpopular but fair ${topic} opinion.`,
        `Turn a common ${topic} frustration into a short story.`,
        `Create a “choose one” poll about ${topic}.`,
      ],
      Promotional: [
        `Show how your offer solves one specific ${topic} problem.`,
        `Share a before-and-after customer workflow.`,
        `Answer an objection people have before buying.`,
        `Demonstrate one feature in a practical scenario.`,
        `Create a clear next-step post for ${goal.toLowerCase()}.`,
      ],
      Personal: [
        `Share why you started working in ${topic}.`,
        `Describe a recent lesson that changed your approach.`,
        `Show a realistic behind-the-scenes moment.`,
        `Share one small win and what made it possible.`,
        `Explain the value you want your ${platform} content to provide.`,
      ],
    };
  }, [niche, platform, goal]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="text-4xl font-black">Content Ideas Generator</h1>
      <p className="mt-4 text-slate-400">
        Generate twenty template-based starting points across four content
        types. Results are ideas, not guaranteed growth strategies.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Niche" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500" />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
          {platforms.map((option) => <option key={option}>{option}</option>)}
        </select>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
          {goals.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div className="mt-10 grid gap-10">
        {Object.entries(groups).map(([title, items]) => (
          <SocialOutputSection key={title} title={title} items={items} copied={copied} onCopy={copy} />
        ))}
      </div>
    </div>
  );
}
