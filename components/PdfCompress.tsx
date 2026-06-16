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
    return `${Math.max(0.1, bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getReductionPercent(originalSize: number, compressedSize: number) {
  if (originalSize === 0 || compressedSize >= originalSize) return 0;

  return ((originalSize - compressedSize) / originalSize) * 100;
}

function formatReduction(percent: number) {
  if (percent === 0) return "0%";
  if (percent < 0.1) return "<0.1%";

  return `${percent.toFixed(1)}%`;
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
      compressedPdf.setProducer("A2ZConvertor PDF Optimizer");
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
      <h1 className="mb-4 text-4xl font-black">PDF Optimizer</h1>

      <p className="mb-8 text-slate-400">
        Clean and rewrite a PDF in your browser to reduce file size where
        structural optimization is possible.
      </p>

      <div className="space-y-6">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-100">
          This browser tool can remove unused PDF structure and save with object
          streams. It cannot recompress embedded images or scanned page content
          with the current client-side library, so image-heavy PDFs may not get
          smaller.
        </div>

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
          {isCompressing ? "Optimizing PDF..." : "Optimize PDF"}
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
                <p className="text-sm text-slate-500">Optimized output</p>
                <p className="text-xl font-bold text-white">
                  {formatFileSize(result.compressedSize)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Reduction</p>
                <p
                  className={`text-xl font-bold ${
                    reduction > 0 ? "text-green-300" : "text-slate-300"
                  }`}
                >
                  {formatReduction(reduction)}
                </p>
              </div>
            </div>

            {result.compressedSize >= result.originalSize && (
              <p className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
                No smaller PDF could be produced in the browser for this file.
                It may already be optimized, or most of its size may come from
                embedded images that this client-side optimizer cannot recompress.
              </p>
            )}

            <a
              href={result.url}
              download="optimized.pdf"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download Optimized PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
