"use client";

import { ChangeEvent, useRef, useState } from "react";

type OutputFormat = "png" | "jpeg";

export default function ImageMetadataRemover() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [quality, setQuality] = useState(92);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;
    resetOutput();
    setError(null);

    if (!selectedFile) {
      setFile(null);
      clearCanvas();
      return;
    }

    const isSupported =
      ["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type) ||
      /\.(jpe?g|png|webp)$/i.test(selectedFile.name);

    if (!isSupported) {
      setFile(null);
      clearCanvas();
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    try {
      const image = await loadImage(selectedFile);
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        throw new Error("Canvas is not available in this browser.");
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      setFile(selectedFile);
      setOutputFormat(selectedFile.type === "image/jpeg" ? "jpeg" : "png");
    } catch (loadError) {
      setFile(null);
      clearCanvas();
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load this image."
      );
    }
  }

  async function removeMetadata() {
    const sourceCanvas = canvasRef.current;

    if (!file || !sourceCanvas || sourceCanvas.width === 0) {
      setError("Please upload an image first.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      resetOutput();
      setProgress(20);
      await nextFrame();

      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = sourceCanvas.width;
      exportCanvas.height = sourceCanvas.height;
      const context = exportCanvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas export is not available in this browser.");
      }

      if (outputFormat === "jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      }

      context.drawImage(sourceCanvas, 0, 0);
      setProgress(65);
      await nextFrame();

      const mimeType =
        outputFormat === "jpeg" ? "image/jpeg" : "image/png";
      const blob = await canvasToBlob(
        exportCanvas,
        mimeType,
        outputFormat === "jpeg" ? quality / 100 : undefined
      );

      setOutputUrl(URL.createObjectURL(blob));
      setOutputSize(blob.size);
      setProgress(100);
    } catch (processError) {
      setProgress(0);
      setError(
        processError instanceof Error
          ? processError.message
          : "Could not create the cleaned image."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  function resetOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setOutputSize(null);
    setProgress(0);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }

  const extension = outputFormat === "jpeg" ? "jpg" : "png";
  const baseName = file?.name.replace(/\.[^.]+$/, "") || "cleaned-image";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Remove Image Metadata</h1>

      <p className="mb-4 text-slate-400">
        Re-render a JPG, PNG or WEBP image in your browser to remove most
        embedded metadata, including common EXIF details.
      </p>

      <p className="mb-8 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
        Canvas re-export removes most embedded metadata, but it may change the
        file format, compression quality or file size. JPG output also replaces
        transparent areas with white.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          onChange={handleFile}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Original file
                </p>
                <p className="mt-1 break-all text-sm text-white">{file.name}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {formatBytes(file.size)}
                </p>
              </div>

              <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  Cleaned output format
                </span>
                <select
                  value={outputFormat}
                  onChange={(event) => {
                    setOutputFormat(event.target.value as OutputFormat);
                    resetOutput();
                  }}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none focus:border-blue-500"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPG</option>
                </select>
              </label>
            </div>

            {outputFormat === "jpeg" && (
              <label className="block rounded-2xl border border-white/10 bg-black/20 p-4">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  JPG quality: {quality}%
                </span>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={quality}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                    resetOutput();
                  }}
                  className="w-full accent-blue-500"
                />
              </label>
            )}
          </>
        )}

        <div className={file ? "block" : "hidden"}>
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Image preview
          </p>
          <div className="overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4">
            <canvas
              ref={canvasRef}
              className="mx-auto max-h-[560px] max-w-full rounded-xl"
              aria-label="Image preview"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={removeMetadata}
          disabled={!file || isProcessing}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing
            ? `Removing Metadata ${progress}%`
            : "Remove Metadata"}
        </button>

        {isProcessing && (
          <div
            className="h-2 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full bg-blue-500 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {outputUrl && outputSize !== null && (
          <div className="space-y-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-green-200/70">
                  Original size
                </p>
                <p className="mt-1 font-semibold text-white">
                  {formatBytes(file?.size ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-green-200/70">
                  Cleaned size
                </p>
                <p className="mt-1 font-semibold text-white">
                  {formatBytes(outputSize)}
                </p>
              </div>
            </div>

            <a
              href={outputUrl}
              download={`${baseName}-metadata-removed.${extension}`}
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download Cleaned {extension.toUpperCase()}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not decode this image in your browser."));
    };
    image.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("The browser could not export this image."));
        }
      },
      mimeType,
      quality
    );
  });
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
