"use client";

import { useState } from "react";
import { AISettings, DEFAULT_FREE_MODEL, providerModels } from "@/utils/aiConfig";

export default function AIProviderSettings({
  settings,
  freeTrialEnabled,
  freeDailyLimit,
  onChange,
  onClear,
}: {
  settings: AISettings;
  freeTrialEnabled: boolean;
  freeDailyLimit: number;
  onChange: (settings: AISettings) => void;
  onClear: () => void;
}) {
  const [showHelp, setShowHelp] = useState(false);

  function selectMode(mode: AISettings["mode"]) {
    if (mode === "free") {
      onChange({ ...settings, mode, provider: "gemini", model: DEFAULT_FREE_MODEL, apiKey: "", remember: false });
      return;
    }
    onChange({ ...settings, mode, model: providerModels[settings.provider][0] });
  }

  return (
    <section className="rounded-2xl border border-blue-400/25 bg-blue-400/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold">AI Provider Settings</h2>
          <p className="mt-1 text-sm text-slate-400">Use real AI to generate better results.</p>
        </div>
        <button type="button" onClick={() => setShowHelp((value) => !value)} className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold">
          How to find your API key
        </button>
      </div>

      {showHelp && (
        <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
          <p><strong>OpenAI:</strong> sign in to OpenAI Platform, open API keys, then create a secret key. ChatGPT Plus is separate from API billing.</p>
          <a className="mt-2 inline-block text-blue-300" href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">Get an OpenAI API key</a>
          <p className="mt-4"><strong>Google Gemini:</strong> open Google AI Studio, select or create a project, then create a Gemini API key.</p>
          <a className="mt-2 inline-block text-blue-300" href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Get a Gemini API key</a>
        </div>
      )}

      <fieldset className="mt-5 grid gap-3">
        <legend className="mb-2 text-sm font-semibold text-slate-200">Choose how to generate</legend>
        {freeTrialEnabled && (
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4">
            <input type="radio" name="ai-mode" checked={settings.mode === "free"} onChange={() => selectMode("free")} className="mt-1" />
            <span><strong>Free limited AI generation</strong><span className="mt-1 block text-sm text-slate-400">Up to {freeDailyLimit} generations per day using Gemini 2.5 Flash-Lite.</span></span>
          </label>
        )}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4">
          <input type="radio" name="ai-mode" checked={settings.mode === "byok" && settings.provider === "gemini"} onChange={() => onChange({ ...settings, mode: "byok", provider: "gemini", model: providerModels.gemini[0] })} className="mt-1" />
          <span><strong>Use my Gemini API key</strong><span className="mt-1 block text-sm text-slate-400">Usage is charged or limited by your Google AI Studio account.</span></span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4">
          <input type="radio" name="ai-mode" checked={settings.mode === "byok" && settings.provider === "openai"} onChange={() => onChange({ ...settings, mode: "byok", provider: "openai", model: providerModels.openai[0] })} className="mt-1" />
          <span><strong>Use my OpenAI API key</strong><span className="mt-1 block text-sm text-slate-400">OpenAI API billing is separate from ChatGPT Plus.</span></span>
        </label>
      </fieldset>

      {settings.mode === "byok" && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <select aria-label="AI provider" value={settings.provider} onChange={(event) => {
            const provider = event.target.value as AISettings["provider"];
            onChange({ ...settings, provider, model: providerModels[provider][0] });
          }} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
            <option value="gemini">Google Gemini</option>
            <option value="openai">OpenAI</option>
          </select>
          <select aria-label="AI model" value={settings.model} onChange={(event) => onChange({ ...settings, model: event.target.value })} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
            {providerModels[settings.provider].map((model) => <option key={model}>{model}</option>)}
          </select>
          <input type="password" value={settings.apiKey} onChange={(event) => onChange({ ...settings, apiKey: event.target.value })} placeholder={`${settings.provider === "openai" ? "OpenAI" : "Gemini"} API key`} autoComplete="off" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 md:col-span-2" />
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={settings.remember} onChange={(event) => onChange({ ...settings, remember: event.target.checked })} />
            Remember my key on this browser
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="button" onClick={onClear} className="rounded-xl border border-red-400/30 px-4 py-2 text-sm text-red-200">Clear saved AI settings</button>
        <p className="text-xs leading-5 text-slate-500">Your API key is used only to generate results. If saved, it is stored only in this browser.</p>
      </div>
      {freeTrialEnabled && <p className="mt-3 text-xs text-slate-500">Free AI generations are limited to control costs. For more generations, bring your own Gemini or OpenAI API key.</p>}
    </section>
  );
}
