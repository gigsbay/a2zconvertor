"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import AIProviderSettings from "@/components/AIProviderSettings";
import GeneratorResultSection from "./GeneratorResultSection";
import { AI_SETTINGS_KEY, AISettings, DEFAULT_AI_INPUT_LIMIT, defaultAISettings, providerModels, SUMMARIZER_INPUT_LIMIT } from "@/utils/aiConfig";

const configs: Record<string, { title: string; fields: { name: string; label: string; type?: "textarea" | "select"; options?: string[] }[] }> = {
  "hashtag-generator": { title: "AI Hashtag Generator", fields: [{ name: "topic", label: "Topic or keywords" }, { name: "category", label: "Category" }] },
  "blog-title-generator": { title: "AI Blog Title Generator", fields: [{ name: "topic", label: "Blog topic" }, { name: "audience", label: "Audience" }] },
  "email-template-generator": { title: "AI Email Template Generator", fields: [{ name: "purpose", label: "Purpose" }, { name: "recipient", label: "Recipient type" }, { name: "tone", label: "Tone" }, { name: "keyMessage", label: "Key message", type: "textarea" }] },
  "text-summarizer": { title: "AI Text Summarizer", fields: [{ name: "text", label: "Text to summarize", type: "textarea" }] },
  "instagram-caption-generator": { title: "AI Instagram Caption Generator", fields: [{ name: "topic", label: "Topic or niche" }, { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Funny", "Professional", "Aesthetic", "Bold"] }, { name: "emoji", label: "Use emojis", type: "select", options: ["Yes", "No"] }] },
  "tiktok-hashtag-generator": { title: "AI TikTok Hashtag Generator", fields: [{ name: "topic", label: "Niche or topic" }, { name: "audience", label: "Audience" }] },
  "youtube-title-generator": { title: "AI YouTube Title Generator", fields: [{ name: "topic", label: "Video topic" }, { name: "style", label: "Style", type: "select", options: ["Mixed", "Tutorial", "Listicle", "Review", "Beginner"] }] },
  "social-media-bio-generator": { title: "AI Social Media Bio Generator", fields: [{ name: "name", label: "Name or brand" }, { name: "niche", label: "Niche" }, { name: "tone", label: "Tone" }, { name: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"] }] },
  "content-ideas-generator": { title: "AI Content Ideas Generator", fields: [{ name: "niche", label: "Niche" }, { name: "audience", label: "Audience" }, { name: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"] }, { name: "goal", label: "Goal", type: "select", options: ["Followers", "Leads", "Engagement", "Sales"] }] },
};

type FreeTrialInfo = { freeTrialEnabled: boolean; freeDailyLimit: number };

export default function AIGenerator({ toolSlug }: { toolSlug: string }) {
  const config = configs[toolSlug];
  const [settings, setSettings] = useState<AISettings>(defaultAISettings);
  const [freeTrial, setFreeTrial] = useState<FreeTrialInfo>({ freeTrialEnabled: false, freeDailyLimit: 3 });
  const [inputs, setInputs] = useState<Record<string, string>>(() => Object.fromEntries(config.fields.map((field) => [field.name, field.options?.[0] ?? ""])));
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [freeRemaining, setFreeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem(AI_SETTINGS_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Partial<AISettings>;
          const provider = parsed.provider === "openai" ? "openai" : "gemini";
          const model = typeof parsed.model === "string" && providerModels[provider].includes(parsed.model)
            ? parsed.model
            : providerModels[provider][0];
          const mode = parsed.mode === "free" || parsed.mode === "byok" ? parsed.mode : "";
          setSettings({
            ...defaultAISettings,
            ...parsed,
            provider,
            model,
            mode,
            apiKey: typeof parsed.apiKey === "string" ? parsed.apiKey : "",
            remember: parsed.remember === true,
          });
        } catch {
          localStorage.removeItem(AI_SETTINGS_KEY);
        }
      }

      fetch("/api/ai/generate")
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((data: FreeTrialInfo) => {
          setFreeTrial(data);
          if (!data.freeTrialEnabled) {
            setSettings((current) => current.mode === "free" ? { ...current, mode: "" } : current);
          }
        })
        .catch(() => setFreeTrial({ freeTrialEnabled: false, freeDailyLimit: 3 }));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const inputLimit = toolSlug === "text-summarizer" ? SUMMARIZER_INPUT_LIMIT : DEFAULT_AI_INPUT_LIMIT;
  const inputLength = useMemo(() => Object.values(inputs).reduce((total, value) => total + value.trim().length, 0), [inputs]);

  function updateSettings(next: AISettings) {
    setSettings(next);
    const stored = next.remember && next.mode === "byok"
      ? next
      : { ...next, apiKey: "", remember: false };
    localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(stored));
  }

  async function generate(event: FormEvent) {
    event.preventDefault();
    if (!settings.mode) { setError("Choose an AI generation option before generating."); return; }
    if (settings.mode === "byok" && !settings.apiKey.trim()) { setError("Enter your provider API key before generating."); return; }
    if (inputLength > inputLimit) { setError(`Shorten your input to ${inputLimit} characters or fewer.`); return; }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: settings.mode,
          provider: settings.provider,
          model: settings.model,
          apiKey: settings.mode === "byok" ? settings.apiKey : undefined,
          toolSlug,
          inputs,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed.");
      setResult(data.result);
      setFreeRemaining(typeof data.freeGenerationsRemaining === "number" ? data.freeGenerationsRemaining : null);
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

  const copyAll = result ? Object.entries(result).flatMap(([key, value]) => [
    label(key),
    ...(Array.isArray(value) ? value.map(formatItem) : [String(value)]),
  ]).join("\n") : "";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
      <h1 className="text-4xl font-black">{config.title}</h1>
      <p className="mt-4 text-slate-400">AI-powered using Gemini or OpenAI. Try free limited generation when available, or bring your own API key for more usage.</p>
      <div className="mt-8">
        <AIProviderSettings
          settings={settings}
          freeTrialEnabled={freeTrial.freeTrialEnabled}
          freeDailyLimit={freeTrial.freeDailyLimit}
          onChange={updateSettings}
          onClear={() => {
            localStorage.removeItem(AI_SETTINGS_KEY);
            setSettings(defaultAISettings);
            setResult(null);
            setFreeRemaining(null);
          }}
        />
      </div>
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-2">
        {config.fields.map((field) => field.type === "textarea" ? (
          <textarea key={field.name} required value={inputs[field.name] ?? ""} onChange={(event) => setInputs({ ...inputs, [field.name]: event.target.value })} placeholder={field.label} rows={6} maxLength={inputLimit} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 md:col-span-2" />
        ) : field.type === "select" ? (
          <label key={field.name} className="grid gap-2 text-sm text-slate-300">
            {field.label}
            <select required value={inputs[field.name] ?? field.options?.[0] ?? ""} onChange={(event) => setInputs({ ...inputs, [field.name]: event.target.value })} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
              {field.options?.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        ) : (
          <input key={field.name} required value={inputs[field.name] ?? ""} onChange={(event) => setInputs({ ...inputs, [field.name]: event.target.value })} placeholder={field.label} maxLength={inputLimit} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3" />
        ))}
        <p className={`text-xs md:col-span-2 ${inputLength > inputLimit ? "text-red-300" : "text-slate-500"}`}>{inputLength} / {inputLimit} input characters</p>
        <button disabled={loading} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60 md:col-span-2">{loading ? "Generating with AI..." : result ? "Regenerate" : "Generate"}</button>
      </form>
      {freeRemaining !== null && <p className="mt-4 text-sm text-slate-400">Free generations remaining today: {freeRemaining}</p>}
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200">{error}</p>}
      {result && (
        <div className="mt-10 grid gap-8">
          <div className="flex justify-end">
            <button type="button" onClick={() => copy(copyAll)} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200">{copied === copyAll ? "Copied" : "Copy all results"}</button>
          </div>
          {Object.entries(result).map(([key, value]) => {
            const items = Array.isArray(value) ? value.map(formatItem) : [String(value)];
            return <GeneratorResultSection key={key} title={label(key)} items={items} copied={copied} onCopy={copy} />;
          })}
        </div>
      )}
    </div>
  );
}

function formatItem(item: unknown) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && "title" in item) {
    const title = String((item as { title: unknown }).title);
    const count = "characterCount" in item ? ` (${String((item as { characterCount: unknown }).characterCount)} characters)` : "";
    return `${title}${count}`;
  }
  return JSON.stringify(item);
}

function label(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
