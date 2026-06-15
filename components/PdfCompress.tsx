"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

type CompressionResult = {
  url: string;
  originalSize: number;
  compressedSize: number;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getReductionPercent(originalSize: number, compressedSize: number) {
  if (originalSize === 0) return 0;

  return Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));
}

export default function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearResult() {
    setResult((currentResult) => {
      if (currentResult) URL.revokeObjectURL(currentResult.url);
      return null;
    });
  }

  function handleFile(selectedFile: File | null) {
    setError(null);
    clearResult();

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setFile(null);
      setError("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  }

  async function compressPdf() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setIsCompressing(true);
      setError(null);
      clearResult();

      const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
      const compressedPdf = await PDFDocument.create();
      const copiedPages = await compressedPdf.copyPages(
        sourcePdf,
        sourcePdf.getPageIndices()
      );

      copiedPages.forEach((page) => compressedPdf.addPage(page));
      compressedPdf.setProducer("A2ZConvertor");
      compressedPdf.setCreator("A2ZConvertor");

      const compressedBytes = await compressedPdf.save({
        useObjectStreams: true,
      });
      const compressedBuffer = new ArrayBuffer(compressedBytes.byteLength);
      new Uint8Array(compressedBuffer).set(compressedBytes);
      const blob = new Blob([compressedBuffer], { type: "application/pdf" });

      setResult({
        url: URL.createObjectURL(blob),
        originalSize: file.size,
        compressedSize: blob.size,
      });
    } catch (compressError) {
      console.error(compressError);
      setError(
        "Failed to compress this PDF. Please try a standard, unlocked PDF file."
      );
    } finally {
      setIsCompressing(false);
    }
  }

  const reduction = result
    ? getReductionPercent(result.originalSize, result.compressedSize)
    : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Compress Tool</h1>

      <p className="mb-8 text-slate-400">
        Optimize a PDF in your browser and download a smaller file where
        compression is possible.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="truncate font-semibold text-white">{file.name}</p>
            <p className="text-sm text-slate-500">
              Original size: {formatFileSize(file.size)}
            </p>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={compressPdf}
          disabled={!file || isCompressing}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCompressing ? "Compressing PDF..." : "Compress PDF"}
        </button>

        {result && (
          <div className="space-y-4">
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Original</p>
                <p className="text-xl font-bold text-white">
                  {formatFileSize(result.originalSize)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Compressed</p>
                <p className="text-xl font-bold text-white">
                  {formatFileSize(result.compressedSize)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Saved</p>
                <p className="text-xl font-bold text-green-300">
                  {reduction}%
                </p>
              </div>
            </div>

            {result.compressedSize >= result.originalSize && (
              <p className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
                This PDF was already well optimized, so the output may not be
                smaller than the original.
              </p>
            )}

            <a
              href={result.url}
              download="compressed.pdf"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download Compressed PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
