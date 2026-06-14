"use client";

import { useState } from "react";

type Props = {
  title: string;
  inputFormat: string;
  inputLabel: string;
  outputFormat: string;
  outputLabel: string;
  description: string;
};

export default function ImageConverter({
  title,
  inputFormat,
  inputLabel,
  outputFormat,
  outputLabel,
  description,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleFile(file: File) {
    setOriginalSize(file.size);
    setConvertedSize(null);
    setDownloadUrl(null);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function convert() {
    if (!preview) return;

    const image = new Image();
    image.src = preview;

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      if (outputFormat === "jpg" || outputFormat === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(image, 0, 0);

      const mimeType =
        outputFormat === "jpg" || outputFormat === "jpeg"
          ? "image/jpeg"
          : outputFormat === "webp"
          ? "image/webp"
          : "image/png";

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);

          setDownloadUrl(url);
          setConvertedSize(blob.size);
        },
        mimeType,
        0.92
      );
    };
  }

  return (
    <div className="text-center">
      <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
        Image Converter
      </div>

      <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl">
        {title}
      </h1>

      <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-400">
        {description}
      </p>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
        <label className="block cursor-pointer rounded-2xl border border-dashed border-white/20 bg-slate-950 p-10 hover:border-blue-500">
          <input
            type="file"
            accept={`image/${inputFormat}`}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />

          <div className="text-xl font-bold">
            Upload {inputLabel} Image
          </div>

          <p className="mt-2 text-slate-400">
            Click here to choose a {inputLabel} file from your computer.
          </p>
        </label>

        {preview && (
          <div className="mt-8">
            <img
              src={preview}
              alt="Uploaded preview"
              className="mx-auto max-h-96 rounded-2xl border border-white/10"
            />

            <button
              onClick={convert}
              className="mt-8 rounded-full bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
            >
              Convert to {outputLabel}
            </button>
          </div>
        )}

        {downloadUrl && (
          <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
            <h3 className="mb-4 text-2xl font-bold text-green-400">
              ✓ Conversion Successful
            </h3>

            <div className="mx-auto grid max-w-2xl gap-4 text-left md:grid-cols-2">
              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Original Format</p>
                <p className="font-bold">{inputLabel}</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Output Format</p>
                <p className="font-bold">{outputLabel}</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Original Size</p>
                <p className="font-bold">
                  {originalSize ? formatSize(originalSize) : "-"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Converted Size</p>
                <p className="font-bold">
                  {convertedSize ? formatSize(convertedSize) : "-"}
                </p>
              </div>
            </div>

            <a
              href={downloadUrl}
              download={`converted-image.${outputFormat}`}
              className="mt-6 inline-flex rounded-full bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-700"
            >
              Download {outputLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}