"use client";

import { useState } from "react";

export default function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function convertToIco() {
    if (!file) return;

    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(imageBitmap, 0, 0, 64, 64);

    const pngBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });

    if (!pngBlob) return;

    const url = URL.createObjectURL(pngBlob);
    setDownloadUrl(url);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">
        Image to Favicon Generator
      </h1>

      <p className="mb-8 text-slate-400">
        Upload an image and generate a favicon-sized icon.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setDownloadUrl(null);
          }}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        <button
          onClick={convertToIco}
          disabled={!file}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate Favicon
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="favicon.ico"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Favicon
          </a>
        )}
      </div>
    </div>
  );
}