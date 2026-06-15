"use client";

import { useState } from "react";

export default function ImageFlipper() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [flipType, setFlipType] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
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

  async function flipImage() {
    if (!file) return;

    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (flipType === "horizontal") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }

    ctx.drawImage(imageBitmap, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;

      setDownloadUrl(URL.createObjectURL(blob));
    }, "image/png");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Flip Image Online</h1>

      <p className="mb-8 text-slate-400">
        Upload an image and flip it horizontally or vertically.
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
            Flip Type
          </label>

          <select
            value={flipType}
            onChange={(e) =>
              setFlipType(e.target.value as "horizontal" | "vertical")
            }
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
          >
            <option value="horizontal">Flip Horizontally</option>
            <option value="vertical">Flip Vertically</option>
          </select>
        </div>

        <button
          onClick={flipImage}
          disabled={!file}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Flip Image
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="flipped-image.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Flipped Image
          </a>
        )}
      </div>
    </div>
  );
}