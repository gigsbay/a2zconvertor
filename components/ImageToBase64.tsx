"use client";

import { useState } from "react";

export default function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [copied, setCopied] = useState(false);

  function handleFile(file: File | null) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setBase64(reader.result as string);
      setCopied(false);
    };

    reader.readAsDataURL(file);
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(base64);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">
        Image to Base64 Converter
      </h1>

      <p className="mb-8 text-slate-400">
        Convert JPG, PNG and WEBP images into Base64 encoded text instantly.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {base64 && (
          <>
            <textarea
              readOnly
              value={base64}
              className="h-80 w-full rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-slate-300"
            />

            <button
              onClick={copyToClipboard}
              className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black"
            >
              {copied ? "Copied!" : "Copy Base64"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}