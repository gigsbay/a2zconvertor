"use client";

import { useMemo, useState } from "react";

const modes = [
  "Uppercase",
  "Lowercase",
  "Title Case",
  "Sentence case",
  "Slug / kebab case",
];

function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase());
}

function toSentenceCase(text: string) {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
}

function convertText(text: string, mode: string) {
  switch (mode) {
    case "Uppercase":
      return text.toUpperCase();
    case "Lowercase":
      return text.toLowerCase();
    case "Title Case":
      return toTitleCase(text);
    case "Sentence case":
      return toSentenceCase(text);
    case "Slug / kebab case":
      return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    default:
      return text;
  }
}

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("Uppercase");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => convertText(text, mode), [text, mode]);

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Text Case Converter</h1>
      <p className="mb-8 text-slate-400">
        Convert text casing instantly in your browser.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter text..."
          rows={10}
          className="rounded-2xl border border-white/10 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />
        <textarea
          value={output}
          readOnly
          rows={10}
          className="rounded-2xl border border-white/10 bg-black/20 p-4 text-slate-100 outline-none"
        />
      </div>

      <div className="mt-5 flex flex-col gap-4 md:flex-row">
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {modes.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={copyOutput}
          disabled={!output}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? "Copied" : "Copy Output"}
        </button>
      </div>
    </div>
  );
}
