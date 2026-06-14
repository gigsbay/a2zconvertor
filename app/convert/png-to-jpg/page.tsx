"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PngToJpgPage() {
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
    if (!file.type.includes("png") && !file.name.toLowerCase().endsWith(".png")) {
      alert("Please upload a PNG image.");
      return;
    }

    setOriginalSize(file.size);
    setConvertedSize(null);
    setDownloadUrl(null);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function convertToJpg() {
    if (!preview) return;

    const image = new Image();
    image.src = preview;

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          const jpgUrl = URL.createObjectURL(blob);

          setDownloadUrl(jpgUrl);
          setConvertedSize(blob.size);
        },
        "image/jpeg",
        0.92
      );
    };
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Image Converter
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl">
            PNG to JPG Converter
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-400">
            Convert PNG images into JPG format online for free. Fast, private
            and easy to use.
          </p>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <label className="block cursor-pointer rounded-2xl border border-dashed border-white/20 bg-slate-950 p-10 hover:border-blue-500">
              <input
                type="file"
                accept="image/png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />

              <div className="text-xl font-bold">Upload PNG Image</div>

              <p className="mt-2 text-slate-400">
                Click here to choose a PNG file from your computer.
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
                  onClick={convertToJpg}
                  className="mt-8 rounded-full bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
                >
                  Convert to JPG
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
                    <p className="font-bold">PNG</p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">Output Format</p>
                    <p className="font-bold">JPG / JPEG</p>
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
                  download="converted-image.jpg"
                  className="mt-6 inline-flex rounded-full bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-700"
                >
                  Download JPG
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-black">
            How to convert PNG to JPG
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="mb-2 font-bold">1. Upload</h3>
              <p className="text-slate-400">
                Select your PNG image from your computer.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="mb-2 font-bold">2. Convert</h3>
              <p className="text-slate-400">
                A2ZConvertor converts your image inside your browser.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="mb-2 font-bold">3. Download</h3>
              <p className="text-slate-400">
                Download your new JPG file instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}