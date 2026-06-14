"use client";

import { useState } from "react";

export default function ImageRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState(90);
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

  async function rotateImage() {
    if (!file) return;

    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const angle = (rotation * Math.PI) / 180;

    if (rotation === 90 || rotation === 270) {
      canvas.width = imageBitmap.height;
      canvas.height = imageBitmap.width;
    } else {
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(
      imageBitmap,
      -imageBitmap.width / 2,
      -imageBitmap.height / 2
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    }, "image/png");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Rotate Image Online</h1>

      <p className="mb-8 text-slate-400">
        Upload an image, rotate it 90, 180 or 270 degrees and download the result.
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
            Rotation
          </label>

          <select
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white"
          >
            <option value={90}>Rotate 90°</option>
            <option value={180}>Rotate 180°</option>
            <option value={270}>Rotate 270°</option>
          </select>
        </div>

        <button
          onClick={rotateImage}
          disabled={!file}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Rotate Image
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="rotated-image.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Rotated Image
          </a>
        )}
      </div>
    </div>
  );
}