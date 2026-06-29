"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import GeneratorResultSection from "./GeneratorResultSection";
import { BUY_ME_A_COFFEE_URL } from "@/components/SupportCTA";
import { DEFAULT_AI_INPUT_LIMIT, DEFAULT_FREE_DAILY_LIMIT, SUMMARIZER_INPUT_LIMIT } from "@/utils/aiConfig";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "textarea" | "select";
  options?: string[];
  defaultValue?: string;
  required?: boolean;
};

type GeneratorConfig = {
  title: string;
  description: string;
  fields: Field[];
};

const toneOptions = ["Friendly", "Professional", "Funny", "Bold", "Clear"];
const platformOptions = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X", "Website"];

const fallbackConfig: GeneratorConfig = { title: "Free AI Creator Tool", description: "Generate editable creator content with Gemini.", fields: [{ name: "topic", label: "Topic", placeholder: "Describe what you want to create" }] };

const configs: Record<string, GeneratorConfig> = {
  "hashtag-generator": {
    title: "Free AI Hashtag Generator",
    description: "Generate grouped hashtag ideas from one topic, with no guaranteed reach claims.",
    fields: [
      { name: "topic", label: "Topic or keywords", placeholder: "Example: handmade candles for winter gifting" },
      { name: "platform", label: "Platform", type: "select", options: platformOptions, defaultValue: "Instagram", required: false },
      { name: "niche", label: "Niche", placeholder: "Optional niche or audience", required: false },
    ],
  },
  "blog-title-generator": {
    title: "Free AI Blog Title Generator",
    description: "Create practical blog title ideas for articles, guides and comparisons.",
    fields: [
      { name: "topic", label: "Blog topic", placeholder: "Example: how to compress PDF files safely" },
      { name: "style", label: "Style", type: "select", options: ["Mixed", "Listicle", "How-to", "Beginner guide", "Comparison", "Question"], defaultValue: "Mixed", required: false },
    ],
  },
  "email-template-generator": {
    title: "Free AI Email Template Generator",
    description: "Draft an editable email and subject line from a simple purpose.",
    fields: [
      { name: "purpose", label: "Email purpose", placeholder: "Example: follow up after a pricing call" },
      { name: "recipient", label: "Recipient type", type: "select", options: ["Customer", "Client", "Colleague", "Teacher", "Recruiter", "General"], defaultValue: "Customer", required: false },
      { name: "tone", label: "Tone", type: "select", options: toneOptions, defaultValue: "Professional", required: false },
    ],
  },
  "text-summarizer": {
    title: "Free AI Text Summarizer",
    description: "Summarize supplied text into a short summary, bullets and key takeaways.",
    fields: [
      { name: "text", label: "Text to summarize", type: "textarea", placeholder: "Paste the text you want summarized" },
      { name: "style", label: "Summary style", type: "select", options: ["Balanced", "Short", "Bullet points", "Key takeaways"], defaultValue: "Balanced", required: false },
    ],
  },
  "instagram-caption-generator": {
    title: "Free AI Instagram Caption Generator",
    description: "Generate caption ideas, short captions and CTA lines for Instagram posts.",
    fields: [
      { name: "topic", label: "Post topic", placeholder: "Example: new cafe menu launch" },
      { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Funny", "Professional", "Aesthetic", "Bold"], defaultValue: "Friendly", required: false },
      { name: "emoji", label: "Emoji use", type: "select", options: ["Light emojis", "No emojis"], defaultValue: "Light emojis", required: false },
    ],
  },
  "tiktok-hashtag-generator": {
    title: "Free AI TikTok Hashtag Generator",
    description: "Create broad, niche and viral-style TikTok hashtag ideas without guaranteed reach claims.",
    fields: [
      { name: "topic", label: "Niche or topic", placeholder: "Example: budget meal prep for students" },
      { name: "audience", label: "Audience", placeholder: "Optional audience", required: false },
    ],
  },
  "youtube-title-generator": {
    title: "Free AI YouTube Title Generator",
    description: "Generate YouTube title ideas with approximate title lengths.",
    fields: [
      { name: "topic", label: "Video topic", placeholder: "Example: beginner guide to Notion dashboards" },
      { name: "style", label: "Style", type: "select", options: ["Tutorial", "Listicle", "Review", "Beginner", "Viral-style"], defaultValue: "Tutorial", required: false },
    ],
  },
  "social-media-bio-generator": {
    title: "Free AI Social Media Bio Generator",
    description: "Create editable bio options for creator, brand and professional profiles.",
    fields: [
      { name: "brand", label: "Name, brand or role", placeholder: "Example: Priya, handmade jewellery designer" },
      { name: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"], defaultValue: "Instagram", required: false },
      { name: "tone", label: "Tone", type: "select", options: toneOptions, defaultValue: "Friendly", required: false },
    ],
  },
  "content-ideas-generator": {
    title: "Free AI Content Ideas Generator",
    description: "Plan educational, entertaining, promotional and behind-the-scenes post ideas.",
    fields: [
      { name: "niche", label: "Niche", placeholder: "Example: fitness coaching for busy parents" },
      { name: "platform", label: "Platform", type: "select", options: platformOptions, defaultValue: "Instagram", required: false },
      { name: "goal", label: "Goal", type: "select", options: ["Followers", "Leads", "Engagement", "Sales"], defaultValue: "Engagement", required: false },
    ],
  },
  "ai-hook-generator": {
    title: "Free AI Hook Generator",
    description: "Generate honest opening hooks for posts, videos, emails and articles.",
    fields: [
      { name: "topic", label: "Hook topic", placeholder: "Example: why small PDFs are easier to share" },
      { name: "platform", label: "Platform", type: "select", options: platformOptions, defaultValue: "Instagram", required: false },
      { name: "tone", label: "Tone", type: "select", options: toneOptions, defaultValue: "Bold", required: false },
    ],
  },
  "ai-carousel-post-generator": {
    title: "Free AI Carousel Post Generator",
    description: "Plan a carousel post with slide-by-slide copy and a caption starter.",
    fields: [
      { name: "topic", label: "Carousel topic", placeholder: "Example: 5 ways to protect photo privacy" },
      { name: "platform", label: "Platform", type: "select", options: ["Instagram", "LinkedIn", "TikTok", "X"], defaultValue: "Instagram", required: false },
      { name: "goal", label: "Goal", type: "select", options: ["Educate", "Engage", "Promote", "Explain"], defaultValue: "Educate", required: false },
    ],
  },
  "ai-linkedin-post-generator": {
    title: "Free AI LinkedIn Post Generator",
    description: "Draft professional LinkedIn posts for insights, updates and lessons learned.",
    fields: [
      { name: "topic", label: "LinkedIn post topic", placeholder: "Example: what I learned launching a small business website" },
      { name: "audience", label: "Audience", placeholder: "Optional audience", required: false },
      { name: "tone", label: "Tone", type: "select", options: ["Professional", "Helpful", "Story-driven", "Founder-style"], defaultValue: "Professional", required: false },
    ],
  },
  "ai-video-script-generator": {
    title: "Free AI Video Script Generator",
    description: "Create a short-form video script with hook, main script and CTA.",
    fields: [
      { name: "topic", label: "Video topic", placeholder: "Example: how to remove image metadata before sharing" },
      { name: "platform", label: "Platform", type: "select", options: ["TikTok", "Instagram Reels", "YouTube Shorts", "LinkedIn"], defaultValue: "TikTok", required: false },
      { name: "duration", label: "Duration", type: "select", options: ["15 seconds", "30 seconds", "60 seconds"], defaultValue: "30 seconds", required: false },
    ],
  },
  "ai-product-description-generator": {
    title: "Free AI Product Description Generator",
    description: "Write product descriptions from your supplied details, without inventing specs.",
    fields: [
      { name: "product", label: "Product details", type: "textarea", placeholder: "Describe the product, audience, benefits and real features" },
      { name: "tone", label: "Tone", type: "select", options: ["Clear", "Friendly", "Premium", "Technical", "Playful"], defaultValue: "Clear", required: false },
    ],
  },
  "ai-ad-copy-generator": {
    title: "Free AI Ad Copy Generator",
    description: "Generate ad headlines, primary text ideas and CTA lines for a real offer.",
    fields: [
      { name: "offer", label: "Product, service or offer", placeholder: "Example: free browser-based PDF compressor" },
      { name: "platform", label: "Ad platform", type: "select", options: ["Meta ads", "Google ads", "LinkedIn ads", "TikTok ads", "General"], defaultValue: "Meta ads", required: false },
      { name: "audience", label: "Audience", placeholder: "Optional audience", required: false },
    ],
  },
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
  const config = configs[toolSlug] ?? fallbackConfig;
  const [status, setStatus] = useState<AIStatus | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>(() => getInitialInputs(config));
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetch("/api/ai/status", { cache: "no-store" })
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((data: AIStatus) => setStatus(data))
        .catch(() => setStatus({ enabled: false, configured: false, dailyLimit: DEFAULT_FREE_DAILY_LIMIT, used: 0, remaining: 0, model: "gemini-2.5-flash-lite", reasonCode: "status_unavailable" }));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);


  const inputLimit = toolSlug === "text-summarizer" ? SUMMARIZER_INPUT_LIMIT : DEFAULT_AI_INPUT_LIMIT;
  const inputLength = useMemo(() => Object.values(inputs).reduce((total, value) => total + value.trim().length, 0), [inputs]);
  const requiredMissing = config.fields.some((field) => field.required !== false && !inputs[field.name]?.trim());

  async function generate(event: FormEvent) {
    event.preventDefault();
    if (!status) { setError("Checking free AI allowance. Please try again in a moment."); return; }
    if (!status.enabled || !status.configured) { setError("Free AI is temporarily unavailable."); return; }
    if (status.remaining === 0) { setError("Daily free AI limit reached. Please try again tomorrow or support A2ZConvertor to help keep AI tools free."); return; }
    if (requiredMissing) { setError("Please fill in the required field before generating."); return; }
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

  const resultEntries = result ? Object.entries(result).map(([key, value]) => [key, Array.isArray(value) ? value.map(formatItem).filter(Boolean) : [formatItem(value)].filter(Boolean)] as const).filter(([, items]) => items.length > 0) : [];
  const copyAll = resultEntries.length > 0 ? serializeResultEntries(resultEntries) : "";
  const limitReached = Boolean(status?.configured && status.remaining === 0);
  const disabled = loading || !status || !status.enabled || !status.configured || status.remaining === 0 || requiredMissing || inputLength > inputLimit;

  return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4"><div>
      <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">Free AI generation available</span>
      <h1 className="mt-4 text-4xl font-black">{config.title}</h1>
      <p className="mt-4 max-w-2xl text-slate-400">{config.description} Daily free usage limit applies. No account or API key is required.</p>
    </div><a href={BUY_ME_A_COFFEE_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-amber-300/30 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-300/10">Support free AI</a></div>
    <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-2">
      {config.fields.map((field) => <FieldControl key={field.name} field={field} value={inputs[field.name] ?? ""} inputLimit={inputLimit} onChange={(value) => setInputs({ ...inputs, [field.name]: value })} />)}
      <p className={`text-xs md:col-span-2 ${inputLength > inputLimit ? "text-red-300" : "text-slate-500"}`}>{inputLength} / {inputLimit} input characters</p>
      <button disabled={disabled} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2">{loading ? "Generating with Gemini..." : result ? "Regenerate" : "Generate"}</button>
    </form>
    <AIAllowanceStatus status={status} />
    {error && <div role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"><p>{error}</p>{limitReached && <a href={BUY_ME_A_COFFEE_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex font-semibold text-amber-200 underline">Support A2ZConvertor</a>}</div>}
    {resultEntries.length > 0 && <div className="mt-10 grid gap-8"><div className="flex justify-end"><button type="button" onClick={() => copy(copyAll)} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200">{copied === copyAll ? "Copied" : "Copy all results"}</button></div>{resultEntries.map(([key, items]) => <GeneratorResultSection key={key} title={label(key)} items={items} copied={copied} onCopy={copy} />)}</div>}
  </div>;
}

function FieldControl({ field, value, inputLimit, onChange }: { field: Field; value: string; inputLimit: number; onChange: (value: string) => void }) {
  const required = field.required !== false;
  const labelText = required ? field.label : `${field.label} (optional)`;
  if (field.type === "textarea") {
    return <label className="grid gap-2 text-sm text-slate-300 md:col-span-2">{labelText}<textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={field.placeholder ?? field.label} rows={6} maxLength={inputLimit} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600" /></label>;
  }
  if (field.type === "select") {
    return <label className="grid gap-2 text-sm text-slate-300">{labelText}<select required={required} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white">{field.options?.map((option) => <option key={option}>{option}</option>)}</select></label>;
  }
  return <label className="grid gap-2 text-sm text-slate-300 md:col-span-2">{labelText}<input required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={field.placeholder ?? field.label} maxLength={inputLimit} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600" /></label>;
}

function AIAllowanceStatus({ status }: { status: AIStatus | null }) {
  if (!status) return <p className="mt-4 text-sm text-slate-400">Checking free AI allowance...</p>;
  if (!status.enabled || !status.configured) return <p className="mt-4 text-sm text-slate-400">Free AI is temporarily unavailable.</p>;
  if (status.remaining === 0) return <p className="mt-4 text-sm text-amber-200">Daily free AI limit reached. Please try again tomorrow or <Link href="/support" className="font-semibold underline">support A2ZConvertor to help keep AI tools free</Link>.</p>;
  return <p className="mt-4 text-sm text-slate-400">Free AI generation available. Daily free usage limit applies.</p>;
}

function getInitialInputs(config: GeneratorConfig | undefined) {
  if (!config) return {};
  return Object.fromEntries(config.fields.map((field) => [field.name, field.defaultValue ?? field.options?.[0] ?? ""]));
}

function formatItem(item: unknown): string {
  if (typeof item === "string") return item.trim();
  if (typeof item === "number" || typeof item === "boolean") return String(item);
  if (Array.isArray(item)) return item.map(formatItem).filter(Boolean).join("\n");
  if (item && typeof item === "object") {
    const entries = Object.entries(item as Record<string, unknown>);
    if ("title" in item) {
      const record = item as { title?: unknown; text?: unknown; characterCount?: unknown };
      const title = String(record.title ?? "").trim();
      const text = typeof record.text === "string" ? record.text.trim() : "";
      const count = record.characterCount ? ` (${String(record.characterCount)} characters)` : "";
      return [title ? `${title}${count}` : "", text].filter(Boolean).join("\n");
    }
    return entries.map(([key, value]) => `${label(key)}: ${Array.isArray(value) ? value.map(formatItem).filter(Boolean).join(", ") : formatItem(value)}`).filter((line) => !line.endsWith(": ")).join("\n");
  }
  return "";
}

function serializeResultEntries(entries: ReadonlyArray<readonly [string, string[]]>) {
  return entries.map(([key, items]) => `${label(key)}\n${items.join("\n")}`).join("\n\n");
}

function label(value: string) { return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()); }
