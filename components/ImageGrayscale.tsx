"use client";

import { useState } from "react";

export default function ImageGrayscale() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [grayscaleUrl, setGrayscaleUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setGrayscaleUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
  }

  function handleFile(selectedFile: File | null) {
    setError(null);
    clearOutput();

    setPreviewUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isSupportedImage =
      ["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type) ||
      /\.(jpe?g|png|webp)$/i.test(selectedFile.name);

    if (!isSupportedImage) {
      setFile(null);
      setError("Please select a JPG, PNG or WEBP image.");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }

  async function convertToGrayscale() {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    try {
      setIsConverting(true);
      setError(null);
      clearOutput();

      const image = await loadImage(file);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas is not available in this browser.");
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      for (let index = 0; index < pixels.length; index += 4) {
        const gray =
          0.299 * pixels[index] +
          0.587 * pixels[index + 1] +
          0.114 * pixels[index + 2];

        pixels[index] = gray;
        pixels[index + 1] = gray;
        pixels[index + 2] = gray;
      }

      context.putImageData(imageData, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        throw new Error("Failed to create the grayscale image.");
      }

      setGrayscaleUrl(URL.createObjectURL(blob));
    } catch (convertError) {
      console.error(convertError);
      setError(
        convertError instanceof Error
          ? convertError.message
          : "Failed to convert this image to grayscale."
      );
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Grayscale Image Tool</h1>

      <p className="mb-8 text-slate-400">
        Convert JPG, PNG or WEBP images to grayscale and download the result as
        a PNG.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {previewUrl && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-300">
                Original
              </p>
              <img
                src={previewUrl}
                alt="Original preview"
                className="max-h-[360px] w-full rounded-xl object-contain"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-300">
                Grayscale Preview
              </p>
              {grayscaleUrl ? (
                <img
                  src={grayscaleUrl}
                  alt="Grayscale preview"
                  className="max-h-[360px] w-full rounded-xl object-contain"
                />
              ) : (
                <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
                  Convert the image to preview the grayscale output.
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={convertToGrayscale}
          disabled={!file || isConverting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isConverting ? "Converting..." : "Convert to Grayscale"}
        </button>

        {grayscaleUrl && (
          <a
            href={grayscaleUrl}
            download="grayscale-image.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Grayscale PNG
          </a>
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
      reject(new Error("Failed to load this image."));
    };
    image.src = url;
  });
}
