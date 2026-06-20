"use client";

import { useState } from "react";
import { AISettings, providerModels } from "@/utils/aiConfig";

export default function AIProviderSettings({
  settings,
  onChange,
  onClear,
}: {
  settings: AISettings;
  onChange: (settings: AISettings) => void;
  onClear: () => void;
}) {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <section className="rounded-2xl border border-blue-400/25 bg-blue-400/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold">AI Provider Settings</h2>
          <p className="mt-1 text-sm text-slate-400">Bring your own OpenAI or Gemini API key.</p>
        </div>
        <button type="button" onClick={() => setShowHelp((value) => !value)} className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold">
          How to find your API key
        </button>
      </div>
      {showHelp && (
        <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
          <p><strong>OpenAI:</strong> sign in to OpenAI Platform, open API keys, then create a secret key. ChatGPT Plus is separate from API billing.</p>
          <a className="mt-2 inline-block text-blue-300" href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">Open OpenAI API keys</a>
          <p className="mt-4"><strong>Google Gemini:</strong> open Google AI Studio and create a Gemini API key for your project.</p>
          <a className="mt-2 inline-block text-blue-300" href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Open Google AI Studio</a>
        </div>
      )}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <select value={settings.provider} onChange={(e) => onChange({ ...settings, provider: e.target.value as AISettings["provider"], model: providerModels[e.target.value as AISettings["provider"]][0] })} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
          <option value="openai">OpenAI</option>
          <option value="gemini">Google Gemini</option>
        </select>
        <select value={settings.model} onChange={(e) => onChange({ ...settings, model: e.target.value })} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
          {providerModels[settings.provider].map((model) => <option key={model}>{model}</option>)}
        </select>
        <input type="password" value={settings.apiKey} onChange={(e) => onChange({ ...settings, apiKey: e.target.value })} placeholder={`${settings.provider === "openai" ? "OpenAI" : "Gemini"} API key`} autoComplete="off" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 md:col-span-2" />
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" checked={settings.remember} onChange={(e) => onChange({ ...settings, remember: e.target.checked })} />
          Remember my API key on this browser
        </label>
        <button type="button" onClick={onClear} className="justify-self-start rounded-xl border border-red-400/30 px-4 py-2 text-sm text-red-200">Clear saved AI settings</button>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">Your API key is used to generate results with your selected provider. If saved, it is stored only in this browser. A2ZConvertor does not store your key in a database.</p>
    </section>
  );
}
