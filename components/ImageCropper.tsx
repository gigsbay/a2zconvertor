"use client";

import { useState } from "react";

export default function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setDownloadUrl(null);

    if (!selectedFile) {
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
  }

  async function cropImage() {
    if (!file) return;

    const imageBitmap = await createImageBitmap(file);

    const safeX = Math.max(0, Math.min(cropX, imageBitmap.width));
    const safeY = Math.max(0, Math.min(cropY, imageBitmap.height));
    const safeWidth = Math.max(
      1,
      Math.min(cropWidth, imageBitmap.width - safeX)
    );
    const safeHeight = Math.max(
      1,
      Math.min(cropHeight, imageBitmap.height - safeY)
    );

    const canvas = document.createElement("canvas");
    canvas.width = safeWidth;
    canvas.height = safeHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imageBitmap,
      safeX,
      safeY,
      safeWidth,
      safeHeight,
      0,
      0,
      safeWidth,
      safeHeight
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    }, "image/png");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Crop Image Online</h1>

      <p className="mb-8 text-slate-400">
        Upload an image, enter crop dimensions and download the cropped result.
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

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              X Position
            </label>
            <input
              type="number"
              value={cropX}
              min="0"
              onChange={(e) => setCropX(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Y Position
            </label>
            <input
              type="number"
              value={cropY}
              min="0"
              onChange={(e) => setCropY(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Crop Width
            </label>
            <input
              type="number"
              value={cropWidth}
              min="1"
              onChange={(e) => setCropWidth(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Crop Height
            </label>
            <input
              type="number"
              value={cropHeight}
              min="1"
              onChange={(e) => setCropHeight(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
            />
          </div>
        </div>

        <button
          onClick={cropImage}
          disabled={!file}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Crop Image
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="cropped-image.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Cropped Image
          </a>
        )}
      </div>
    </div>
  );
}