"use client";

import { useState } from "react";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  async function compressImage() {
    if (!file) return;

    setOriginalSize(file.size);

    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(imageBitmap, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        setCompressedSize(blob.size);

        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      },
      "image/jpeg",
      quality / 100
    );
  }

  const saving =
    originalSize && compressedSize
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : null;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const selected = e.target.files?.[0] || null;
            setFile(selected);
            setOriginalSize(selected ? selected.size : null);
            setCompressedSize(null);
            setDownloadUrl(null);
          }}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-gray-300"
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-200">
            Compression Quality: {quality}%
          </label>

          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={compressImage}
          disabled={!file}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Compress Image
        </button>

        {originalSize && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-black/30 p-4">
              <p className="text-sm text-gray-400">Original Size</p>
              <p className="text-xl font-bold text-white">
                {formatSize(originalSize)}
              </p>
            </div>

            {compressedSize && (
              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-400">Compressed Size</p>
                <p className="text-xl font-bold text-white">
                  {formatSize(compressedSize)}
                </p>
              </div>
            )}

            {saving !== null && (
              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-400">Saved</p>
                <p className="text-xl font-bold text-white">{saving}%</p>
              </div>
            )}
          </div>
        )}

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="compressed-image.jpg"
            className="rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Compressed Image
          </a>
        )}
      </div>
    </div>
  );
}