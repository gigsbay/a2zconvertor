"use client";

import { FormEvent, useState } from "react";
import AIProviderSettings from "@/components/AIProviderSettings";
import GeneratorResultSection from "./GeneratorResultSection";
import { AI_SETTINGS_KEY, AISettings, defaultAISettings } from "@/utils/aiConfig";

const configs: Record<string, { title: string; fields: { name: string; label: string; type?: "textarea" | "select"; options?: string[] }[] }> = {
  "hashtag-generator": { title: "AI Hashtag Generator", fields: [{ name: "topic", label: "Topic or keywords" }, { name: "category", label: "Category" }] },
  "blog-title-generator": { title: "AI Blog Title Generator", fields: [{ name: "topic", label: "Blog topic" }, { name: "audience", label: "Audience" }] },
  "email-template-generator": { title: "AI Email Template Generator", fields: [{ name: "purpose", label: "Purpose" }, { name: "recipient", label: "Recipient type" }, { name: "tone", label: "Tone" }, { name: "keyMessage", label: "Key message", type: "textarea" }] },
  "text-summarizer": { title: "AI Text Summarizer", fields: [{ name: "text", label: "Text to summarize", type: "textarea" }] },
  "instagram-caption-generator": { title: "AI Instagram Caption Generator", fields: [{ name: "topic", label: "Topic or niche" }, { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Funny", "Professional", "Aesthetic", "Bold"] }, { name: "emoji", label: "Use emojis", type: "select", options: ["Yes", "No"] }] },
  "tiktok-hashtag-generator": { title: "AI TikTok Hashtag Generator", fields: [{ name: "topic", label: "Niche or topic" }, { name: "audience", label: "Audience" }] },
  "youtube-title-generator": { title: "AI YouTube Title Generator", fields: [{ name: "topic", label: "Video topic" }, { name: "style", label: "Style", type: "select", options: ["Mixed", "Tutorial", "Beginner", "Review", "Fast method"] }] },
  "social-media-bio-generator": { title: "AI Social Media Bio Generator", fields: [{ name: "name", label: "Name or brand" }, { name: "niche", label: "Niche" }, { name: "tone", label: "Tone" }, { name: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"] }] },
  "content-ideas-generator": { title: "AI Content Ideas Generator", fields: [{ name: "niche", label: "Niche" }, { name: "audience", label: "Audience" }, { name: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"] }, { name: "goal", label: "Goal", type: "select", options: ["Followers", "Leads", "Engagement", "Sales"] }] },
};

export default function AIGenerator({ toolSlug }: { toolSlug: string }) {
  const config = configs[toolSlug];
  const [settings, setSettings] = useState<AISettings>(() => {
    if (typeof window === "undefined") return defaultAISettings;
    const saved = localStorage.getItem(AI_SETTINGS_KEY);
    if (!saved) return defaultAISettings;
    try { return { ...defaultAISettings, ...JSON.parse(saved) }; }
    catch { localStorage.removeItem(AI_SETTINGS_KEY); return defaultAISettings; }
  });
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");


  function updateSettings(next: AISettings) {
    setSettings(next);
    if (next.remember) localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(next));
    else localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify({ provider: next.provider, model: next.model, remember: false, apiKey: "" }));
  }

  async function generate(event: FormEvent) {
    event.preventDefault();
    if (!settings.apiKey.trim()) { setError("Enter your provider API key before generating."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: settings.provider, model: settings.model, apiKey: settings.apiKey, toolSlug, inputs }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed.");
      setResult(data.result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Generation failed.");
    } finally { setLoading(false); }
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value); setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
      <h1 className="text-4xl font-black">{config.title}</h1>
      <p className="mt-4 text-slate-400">AI-powered using your own API key. A2ZConvertor does not provide or store a server-side key.</p>
      <div className="mt-8">
        <AIProviderSettings settings={settings} onChange={updateSettings} onClear={() => { localStorage.removeItem(AI_SETTINGS_KEY); setSettings(defaultAISettings); setResult(null); }} />
      </div>
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-2">
        {config.fields.map((field) => field.type === "textarea" ? (
          <textarea key={field.name} required value={inputs[field.name] ?? ""} onChange={(e) => setInputs({ ...inputs, [field.name]: e.target.value })} placeholder={field.label} rows={6} maxLength={toolSlug === "text-summarizer" ? 16000 : 2000} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 md:col-span-2" />
        ) : field.type === "select" ? (
          <select key={field.name} required value={inputs[field.name] ?? field.options?.[0] ?? ""} onChange={(e) => setInputs({ ...inputs, [field.name]: e.target.value })} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
            {field.options?.map((option) => <option key={option}>{option}</option>)}
          </select>
        ) : (
          <input key={field.name} required value={inputs[field.name] ?? ""} onChange={(e) => setInputs({ ...inputs, [field.name]: e.target.value })} placeholder={field.label} maxLength={2000} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3" />
        ))}
        <button disabled={loading} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60 md:col-span-2">{loading ? "Generating..." : result ? "Regenerate" : "Generate"}</button>
      </form>
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200">{error}</p>}
      {result && <div className="mt-10 grid gap-10">{Object.entries(result).map(([key, value]) => {
        const items = Array.isArray(value) ? value.map((item) => typeof item === "string" ? item : JSON.stringify(item)) : [String(value)];
        return <GeneratorResultSection key={key} title={label(key)} items={items} copied={copied} onCopy={copy} />;
      })}</div>}
    </div>
  );
}

function label(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
