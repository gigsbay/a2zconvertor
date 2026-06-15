"use client";

import { useState } from "react";

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  async function convertPdfToImage() {
    if (!file) return;

    try {
      setIsConverting(true);

      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      const page = await pdf.getPage(1);

      const viewport = page.getViewport({
        scale: 2,
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
  canvasContext: context,
  viewport,
  canvas,
}).promise;

      const image = canvas.toDataURL("image/png");
      setImageUrl(image);
    } catch (error) {
      console.error(error);
      alert("Failed to convert PDF.");
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF to Image Converter</h1>

      <p className="mb-8 text-slate-400">
        Convert the first page of a PDF into a PNG image.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        <button
          onClick={convertPdfToImage}
          disabled={!file || isConverting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isConverting ? "Converting..." : "Convert PDF to Image"}
        </button>

        {imageUrl && (
          <div className="space-y-4">
            <img
              src={imageUrl}
              alt="PDF Preview"
              className="max-h-[500px] rounded-xl border border-white/10"
            />

            <a
              href={imageUrl}
              download="pdf-page.png"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download PNG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
