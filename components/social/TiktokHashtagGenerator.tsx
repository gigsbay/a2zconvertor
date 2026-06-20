"use client";

import { useMemo, useState } from "react";

function tag(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export default function TiktokHashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [copied, setCopied] = useState(false);
  const output = useMemo(() => {
    const niche = tag(topic) || "content";
    const people = tag(audience) || "community";
    return {
      broad: [`#${niche}`, "#contentcreator", "#creatortips", "#socialmedia", "#learnontiktok", "#newpost"],
      niche: [`#${niche}tips`, `#${niche}ideas`, `#${people}`, `#${niche}${people}`, `#${niche}community`, `#learn${niche}`],
      discovery: [`#watchthis`, `#trythis`, `#thingsyouneedtoknow`, `#quicktips`, `#todayilearned`, `#foryouideas`],
    };
  }, [topic, audience]);
  const all = [...output.broad, ...output.niche, ...output.discovery].join(" ");

  async function copyAll() {
    await navigator.clipboard.writeText(all);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="text-4xl font-black">TikTok Hashtag Generator</h1>
      <p className="mt-4 text-slate-400">
        Build a balanced, rule-based hashtag set. Hashtags can support
        discovery, but they cannot guarantee reach or virality.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Niche or topic" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500" />
        <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Audience, e.g. new photographers" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500" />
      </div>
      <button type="button" onClick={copyAll} className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500">
        {copied ? "Copied" : "Copy all hashtags"}
      </button>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["Broad hashtags", output.broad],
          ["Niche hashtags", output.niche],
          ["Viral-style discovery tags", output.discovery],
        ].map(([title, items]) => (
          <section key={title as string} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h2 className="font-bold">{title as string}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(items as string[]).map((item) => <span key={item} className="rounded-full bg-blue-500/10 px-3 py-2 text-sm text-blue-200">{item}</span>)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
