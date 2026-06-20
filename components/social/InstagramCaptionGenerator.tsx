"use client";

import { useMemo, useState } from "react";
import SocialOutputSection from "./SocialOutputSection";

const toneLines: Record<string, string[]> = {
  Friendly: ["A little update from", "Sharing something useful about", "Come along as we explore"],
  Funny: ["Plot twist: we are talking about", "Apparently my current personality is", "Nobody asked, but here is"],
  Professional: ["A practical perspective on", "Key lessons from", "A clear approach to"],
  Aesthetic: ["A quiet moment for", "Notes, details and a little", "Currently inspired by"],
  Bold: ["Let us make one thing clear about", "Stop overlooking", "This is your sign to rethink"],
};

export default function InstagramCaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [emoji, setEmoji] = useState(true);
  const [copied, setCopied] = useState("");
  const subject = topic.trim() || "your topic";
  const mark = emoji ? " ✨" : "";

  const output = useMemo(() => {
    const lines = toneLines[tone];
    return {
      captions: [
        `${lines[0]} ${subject}.${mark} Here is what made it worth sharing.`,
        `${lines[1]} ${subject}.${mark} Save this for the next time you need a fresh perspective.`,
        `${lines[2]} ${subject}.${mark} What would you add to the conversation?`,
        `${subject} does not need to be complicated. Start with one useful step and build from there.${mark}`,
        `Behind the scenes of ${subject}: the lesson, the process and the part nobody sees.${mark}`,
      ],
      short: [
        `${subject}, but make it useful.${mark}`,
        `A fresh take on ${subject}.${mark}`,
        `Today is for ${subject}.${mark}`,
        `Small steps, better ${subject}.${mark}`,
        `Save this ${subject} idea.${mark}`,
      ],
      ctas: [
        "Save this for later.",
        "Share this with someone who needs it.",
        "Tell me your experience in the comments.",
        "Follow for more practical ideas.",
        "Which option would you try first?",
      ],
    };
  }, [subject, tone, mark]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="text-4xl font-black">Instagram Caption Generator</h1>
      <p className="mt-4 text-slate-400">
        Create free template-based caption ideas to edit for your own voice. No
        AI or external API is used.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px_auto]">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Post topic" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500" />
        <select value={tone} onChange={(e) => setTone(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
          {Object.keys(toneLines).map((option) => <option key={option}>{option}</option>)}
        </select>
        <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
          <input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} />
          Emojis
        </label>
      </div>
      <div className="mt-10 grid gap-10">
        <SocialOutputSection title="Caption ideas" items={output.captions} copied={copied} onCopy={copy} />
        <SocialOutputSection title="Short captions" items={output.short} copied={copied} onCopy={copy} />
        <SocialOutputSection title="CTA ideas" items={output.ctas} copied={copied} onCopy={copy} />
      </div>
    </div>
  );
}
