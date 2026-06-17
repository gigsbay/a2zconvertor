"use client";

import { useState } from "react";

type AvifConverterProps = {
  output: "png" | "jpg";
};

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(0.1, bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getOutputMime(output: "png" | "jpg") {
  return output === "png" ? "image/png" : "image/jpeg";
}

export default function AvifConverter({ output }: AvifConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const outputLabel = output.toUpperCase();

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setOutputSize(null);
  }

  function handleFile(selectedFile: File | null) {
    clearOutput();
    setError(null);
    setPreviewUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isAvif =
      selectedFile.type === "image/avif" ||
      selectedFile.name.toLowerCase().endsWith(".avif");

    if (!isAvif) {
      setFile(null);
      setError("Please upload an AVIF image file.");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }

  async function convertAvif() {
    if (!file) {
      setError("Please upload an AVIF image first.");
      return;
    }

    const sourceUrl = URL.createObjectURL(file);

    try {
      setIsConverting(true);
      setError(null);
      clearOutput();

      const image = new Image();

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(
            new Error(
              "This browser could not decode the AVIF file. Try an up-to-date Chrome, Firefox, Edge or Safari browser."
            )
          );
        image.src = sourceUrl;
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: output === "png" });

      if (!context) {
        throw new Error("Canvas is not available in this browser.");
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      if (output === "jpg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) resolve(result);
            else reject(new Error(`Could not export ${outputLabel}.`));
          },
          getOutputMime(output),
          output === "jpg" ? 0.92 : undefined
        );
      });

      setOutputSize(blob.size);
      setOutputUrl(URL.createObjectURL(blob));
    } catch (convertError) {
      console.error(convertError);
      setError(
        convertError instanceof Error
          ? convertError.message
          : "Could not convert this AVIF image in your browser."
      );
    } finally {
      URL.revokeObjectURL(sourceUrl);
      setIsConverting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">AVIF to {outputLabel}</h1>
      <p className="mb-4 text-slate-400">
        Decode an AVIF image in your browser and export it as {outputLabel}.
      </p>
      <p className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        Modern browsers can decode AVIF images, but AVIF canvas export is not
        reliable enough to promise here. This tool only converts AVIF into PNG
        or JPG.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/avif,.avif"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            <p className="break-words font-semibold text-white">{file.name}</p>
            <p className="mt-1 text-slate-500">Original: {formatFileSize(file.size)}</p>
          </div>
        )}

        {previewUrl && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-300">
              Browser preview
            </p>
            <img
              src={previewUrl}
              alt="AVIF preview"
              className="max-h-[420px] rounded-xl border border-white/10"
            />
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={convertAvif}
          disabled={!file || isConverting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isConverting ? `Converting to ${outputLabel}...` : `Convert to ${outputLabel}`}
        </button>

        {outputUrl && (
          <div className="space-y-3">
            {outputSize !== null && (
              <p className="text-sm text-slate-400">
                Output size: {formatFileSize(outputSize)}
              </p>
            )}
            <a
              href={outputUrl}
              download={`converted-avif.${output}`}
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download {outputLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
