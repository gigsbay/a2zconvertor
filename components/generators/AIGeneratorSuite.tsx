"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import GeneratorResultSection from "./GeneratorResultSection";
import { DEFAULT_AI_INPUT_LIMIT, SUMMARIZER_INPUT_LIMIT } from "@/utils/aiConfig";

const configs: Record<string, { title: string; fields: { name: string; label: string; type?: "textarea" | "select"; options?: string[] }[] }> = {
  "hashtag-generator": { title: "Free AI Hashtag Generator", fields: [{ name: "topic", label: "Topic or keywords" }, { name: "category", label: "Category" }] },
  "blog-title-generator": { title: "Free AI Blog Title Generator", fields: [{ name: "topic", label: "Blog topic" }, { name: "audience", label: "Audience" }] },
  "email-template-generator": { title: "Free AI Email Template Generator", fields: [{ name: "purpose", label: "Purpose" }, { name: "recipient", label: "Recipient type" }, { name: "tone", label: "Tone" }, { name: "keyMessage", label: "Key message", type: "textarea" }] },
  "text-summarizer": { title: "Free AI Text Summarizer", fields: [{ name: "text", label: "Text to summarize", type: "textarea" }] },
  "instagram-caption-generator": { title: "Free AI Instagram Caption Generator", fields: [{ name: "topic", label: "Topic or niche" }, { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Funny", "Professional", "Aesthetic", "Bold"] }, { name: "emoji", label: "Use emojis", type: "select", options: ["Yes", "No"] }] },
  "tiktok-hashtag-generator": { title: "Free AI TikTok Hashtag Generator", fields: [{ name: "topic", label: "Niche or topic" }, { name: "audience", label: "Audience" }] },
  "youtube-title-generator": { title: "Free AI YouTube Title Generator", fields: [{ name: "topic", label: "Video topic" }, { name: "style", label: "Style", type: "select", options: ["Mixed", "Tutorial", "Listicle", "Review", "Beginner"] }] },
  "social-media-bio-generator": { title: "Free AI Social Media Bio Generator", fields: [{ name: "name", label: "Name or brand" }, { name: "niche", label: "Niche" }, { name: "tone", label: "Tone" }, { name: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"] }] },
  "content-ideas-generator": { title: "Free AI Content Ideas Generator", fields: [{ name: "niche", label: "Niche" }, { name: "audience", label: "Audience" }, { name: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"] }, { name: "goal", label: "Goal", type: "select", options: ["Followers", "Leads", "Engagement", "Sales"] }] },
};

type AIStatus = {
  enabled: boolean;
  configured: boolean;
  dailyLimit: number;
  used: number;
  remaining: number;
  model: string;
  reasonCode: string | null;
};

export default function AIGenerator({ toolSlug }: { toolSlug: string }) {
  const config = configs[toolSlug];
  const [status, setStatus] = useState<AIStatus | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>(() => Object.fromEntries(config.fields.map((field) => [field.name, field.options?.[0] ?? ""])));
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetch("/api/ai/status", { cache: "no-store" })
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((data: AIStatus) => setStatus(data))
        .catch(() => setStatus({ enabled: false, configured: false, dailyLimit: 3, used: 0, remaining: 0, model: "gemini-2.5-flash-lite", reasonCode: "STATUS_UNAVAILABLE" }));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const inputLimit = toolSlug === "text-summarizer" ? SUMMARIZER_INPUT_LIMIT : DEFAULT_AI_INPUT_LIMIT;
  const inputLength = useMemo(() => Object.values(inputs).reduce((total, value) => total + value.trim().length, 0), [inputs]);

  async function generate(event: FormEvent) {
    event.preventDefault();
    if (!status?.enabled) { setError("Free AI is temporarily unavailable."); return; }
    if (inputLength > inputLimit) { setError("Please shorten your input to stay within the free AI limit."); return; }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ai/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ toolSlug, inputs }) });
      const data = await response.json();
      if (typeof data.freeGenerationsRemaining === "number") {
        setStatus((current) => current ? { ...current, used: Math.max(0, current.dailyLimit - data.freeGenerationsRemaining), remaining: data.freeGenerationsRemaining } : current);
      }
      if (!response.ok) throw new Error(data.error || "Generation failed.");
      setResult(data.result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }

  const copyAll = result ? Object.entries(result).flatMap(([key, value]) => [label(key), ...(Array.isArray(value) ? value.map(formatItem) : [String(value)])]).join("\n") : "";
  const dailyLimit = status?.dailyLimit ?? 3;
  const limitReached = Boolean(status?.configured && status.remaining === 0);

  return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4"><div>
      <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">Free AI {"\u00b7"} {dailyLimit}/day</span>
      <h1 className="mt-4 text-4xl font-black">{config.title}</h1>
      <p className="mt-4 max-w-2xl text-slate-400">Free AI tools powered by Gemini. You get {dailyLimit} free generations per day. No account or API key is required.</p>
    </div><Link href="/support" className="rounded-xl border border-amber-300/30 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-300/10">Support free AI</Link></div>
    <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-2">
      {config.fields.map((field) => field.type === "textarea" ? <textarea key={field.name} required value={inputs[field.name] ?? ""} onChange={(event) => setInputs({ ...inputs, [field.name]: event.target.value })} placeholder={field.label} rows={6} maxLength={inputLimit} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 md:col-span-2" /> : field.type === "select" ? <label key={field.name} className="grid gap-2 text-sm text-slate-300">{field.label}<select required value={inputs[field.name] ?? field.options?.[0] ?? ""} onChange={(event) => setInputs({ ...inputs, [field.name]: event.target.value })} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">{field.options?.map((option) => <option key={option}>{option}</option>)}</select></label> : <input key={field.name} required value={inputs[field.name] ?? ""} onChange={(event) => setInputs({ ...inputs, [field.name]: event.target.value })} placeholder={field.label} maxLength={inputLimit} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3" />)}
      <p className={`text-xs md:col-span-2 ${inputLength > inputLimit ? "text-red-300" : "text-slate-500"}`}>{inputLength} / {inputLimit} input characters</p>
      <button disabled={loading || !status?.enabled || status.remaining === 0} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2">{loading ? "Generating with Gemini..." : result ? "Regenerate" : "Generate"}</button>
    </form>
    <AIAllowanceStatus status={status} />
    {error && <div role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"><p>{error}</p>{limitReached && <Link href="/support" className="mt-3 inline-flex font-semibold text-amber-200 underline">Support A2ZConvertor</Link>}</div>}
    {result && <div className="mt-10 grid gap-8"><div className="flex justify-end"><button type="button" onClick={() => copy(copyAll)} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200">{copied === copyAll ? "Copied" : "Copy all results"}</button></div>{Object.entries(result).map(([key, value]) => <GeneratorResultSection key={key} title={label(key)} items={Array.isArray(value) ? value.map(formatItem) : [String(value)]} copied={copied} onCopy={copy} />)}</div>}
  </div>;
}

function AIAllowanceStatus({ status }: { status: AIStatus | null }) {
  if (!status) return <p className="mt-4 text-sm text-slate-400">Checking free AI allowance...</p>;
  if (!status.enabled || !status.configured) return <p className="mt-4 text-sm text-slate-400">Free AI is temporarily unavailable.</p>;
  if (status.remaining === 0) return <p className="mt-4 text-sm text-amber-200">Daily free AI limit reached. Please try again tomorrow or <Link href="/support" className="font-semibold underline">support A2ZConvertor</Link>.</p>;
  return <p className="mt-4 text-sm text-slate-400">You have {status.remaining} free AI generations left today.</p>;
}

function formatItem(item: unknown) { if (typeof item === "string") return item; if (item && typeof item === "object" && "title" in item) { const title = String((item as { title: unknown }).title); const count = "characterCount" in item ? ` (${String((item as { characterCount: unknown }).characterCount)} characters)` : ""; return `${title}${count}`; } return JSON.stringify(item); }
function label(value: string) { return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()); }
