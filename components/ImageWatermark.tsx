"use client";

import { useState } from "react";

export default function ImageWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState("A2ZConvertor");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setDownloadUrl(null);

    if (!selectedFile) {
      setImageUrl(null);
      return;
    }

    setImageUrl(URL.createObjectURL(selectedFile));
  }

  async function addWatermark() {
    if (!file || !watermarkText.trim()) return;

    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(imageBitmap, 0, 0);

    const fontSize = Math.max(24, Math.floor(imageBitmap.width / 18));

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
    ctx.lineWidth = Math.max(2, Math.floor(fontSize / 12));
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";

    const padding = Math.max(24, Math.floor(imageBitmap.width / 40));
    const x = imageBitmap.width - padding;
    const y = imageBitmap.height - padding;

    ctx.strokeText(watermarkText, x, y);
    ctx.fillText(watermarkText, x, y);

    canvas.toBlob((blob) => {
      if (!blob) return;

      setDownloadUrl(URL.createObjectURL(blob));
    }, "image/png");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Watermark Image Online</h1>

      <p className="mb-8 text-slate-400">
        Upload an image, add a text watermark and download the protected image.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {imageUrl && (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="mb-3 text-sm text-slate-400">Image Preview</p>
            <img
              src={imageUrl}
              alt="Preview"
              className="max-h-[400px] w-auto rounded-xl"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Watermark Text
          </label>
          <input
            type="text"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
          />
        </div>

        <button
          onClick={addWatermark}
          disabled={!file || !watermarkText.trim()}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Watermark
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="watermarked-image.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Watermarked Image
          </a>
        )}
      </div>
    </div>
  );
}