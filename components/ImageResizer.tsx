"use client";

import { useState } from "react";

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setDownloadUrl(null);

    if (!selectedFile) return;

    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(img.width);
      setHeight(img.height);
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(selectedFile);
  }

  function updateWidth(newWidth: number) {
    setWidth(newWidth);

    if (lockAspectRatio && originalWidth && originalHeight) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(newWidth * ratio));
    }
  }

  function updateHeight(newHeight: number) {
    setHeight(newHeight);

    if (lockAspectRatio && originalWidth && originalHeight) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(newHeight * ratio));
    }
  }

  async function resizeImage() {
    if (!file || width <= 0 || height <= 0) return;

    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(imageBitmap, 0, 0, width, height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    }, "image/png");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Resize Image Online</h1>

      <p className="mb-8 text-slate-400">
        Upload an image and change its width and height online for free.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {originalWidth && originalHeight && (
          <div className="rounded-xl bg-black/30 p-4 text-slate-300">
            Original size:{" "}
            <span className="font-bold text-white">
              {originalWidth} × {originalHeight}px
            </span>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Width
            </label>
            <input
              type="number"
              value={width}
              min="1"
              onChange={(e) => updateWidth(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Height
            </label>
            <input
              type="number"
              value={height}
              min="1"
              onChange={(e) => updateHeight(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 text-slate-300">
          <input
            type="checkbox"
            checked={lockAspectRatio}
            onChange={(e) => setLockAspectRatio(e.target.checked)}
          />
          Lock aspect ratio
        </label>

        <button
          onClick={resizeImage}
          disabled={!file || width <= 0 || height <= 0}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Resize Image
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="resized-image.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Resized Image
          </a>
        )}
      </div>
    </div>
  );
}