"use client";

import { useMemo, useState } from "react";
import SocialOutputSection from "./SocialOutputSection";

const platforms = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"];
const tones = ["Friendly", "Professional", "Playful", "Bold", "Minimal"];

export default function SocialBioGenerator() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [platform, setPlatform] = useState("Instagram");
  const [copied, setCopied] = useState("");
  const output = useMemo(() => {
    const brand = name.trim() || "Your Name";
    const topic = niche.trim() || "your niche";
    const voice = tone.toLowerCase();
    return {
      options: [
        `${brand} | ${topic}\nPractical ideas with a ${voice} point of view.\nNew posts for the ${platform} community.`,
        `Helping curious people get better at ${topic}.\nTips, lessons and honest progress by ${brand}.`,
        `${topic} made clearer.\nCreated by ${brand} for people who like useful content.`,
        `Sharing the process behind ${topic}.\nFollow ${brand} for ideas you can actually use.`,
        `${brand}\n${topic} • useful notes • fresh experiments\nStart with the latest post.`,
      ],
      short: [`${brand} | Useful ${topic} ideas without the noise.`],
      professional: [`${brand} helps people understand and improve ${topic} through practical resources, clear examples and consistent educational content.`],
      cta: [`Follow for more ${topic} ideas.`, `Explore the latest ${topic} post.`, "Start with the link below."],
    };
  }, [name, niche, tone, platform]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="text-4xl font-black">Social Media Bio Generator</h1>
      <p className="mt-4 text-slate-400">Create free template-based bio options, then edit them to match your real experience and voice.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name or brand" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500" />
        <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Niche" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500" />
        <select value={tone} onChange={(e) => setTone(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
          {tones.map((option) => <option key={option}>{option}</option>)}
        </select>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
          {platforms.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div className="mt-10 grid gap-10">
        <SocialOutputSection title="Bio options" items={output.options} copied={copied} onCopy={copy} />
        <SocialOutputSection title="Short bio" items={output.short} copied={copied} onCopy={copy} />
        <SocialOutputSection title="Professional bio" items={output.professional} copied={copied} onCopy={copy} />
        <SocialOutputSection title="CTA lines" items={output.cta} copied={copied} onCopy={copy} />
      </div>
    </div>
  );
}
