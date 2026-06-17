"use client";

import { useMemo, useState } from "react";

const stopWords = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "you",
  "your",
  "are",
  "was",
  "were",
  "have",
  "has",
  "but",
  "not",
  "can",
  "will",
  "our",
]);

function getWords(text: string) {
  return text
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter((word) => word.length > 2 && !stopWords.has(word)) ?? [];
}

function summarize(text: string, sentenceCount: number) {
  const sentences =
    text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()) ?? [];
  const words = getWords(text);
  const frequencies = new Map<string, number>();

  words.forEach((word) => frequencies.set(word, (frequencies.get(word) ?? 0) + 1));

  return sentences
    .map((sentence, index) => {
      const score = getWords(sentence).reduce(
        (total, word) => total + (frequencies.get(word) ?? 0),
        0
      );
      return { sentence, index, score };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, sentenceCount)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence)
    .join(" ");
}

export default function TextSummarizer() {
  const [text, setText] = useState("");
  const [sentenceCount, setSentenceCount] = useState(3);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () => summarize(text, sentenceCount),
    [text, sentenceCount]
  );

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Text Summarizer</h1>
      <p className="mb-8 text-slate-400">
        Create a quick rule-based summary by scoring sentences with keyword
        frequency. No external API is used.
      </p>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste text to summarize..."
        rows={10}
        className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
      />

      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="text-sm font-semibold text-slate-300">
          Summary length: {sentenceCount} sentences
          <input
            type="range"
            min="3"
            max="5"
            value={sentenceCount}
            onChange={(event) => setSentenceCount(Number(event.target.value))}
            className="mt-2 block w-56"
          />
        </label>
        <button
          type="button"
          onClick={copySummary}
          disabled={!summary}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? "Copied" : "Copy Summary"}
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
        <h2 className="mb-3 text-xl font-bold">Rule-based summary</h2>
        <p className="leading-7 text-slate-200">
          {summary || "Your quick summary will appear here."}
        </p>
      </div>
    </div>
  );
}
