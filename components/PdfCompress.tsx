"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import ProcessingProgress from "@/components/ProcessingProgress";

type CompressionResult = {
  url: string;
  originalSize: number;
  compressedSize: number;
  pageCount: number;
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
  const [quality, setQuality] = useState(70);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  function clearResult() {
    setResult((currentResult) => {
      if (currentResult) URL.revokeObjectURL(currentResult.url);
      return null;
    });
    setProgress(0);
    setProgressLabel("");
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
      setProgress(5);
      setProgressLabel("Loading PDF");

      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";

      const sourcePdf = await pdfjsLib.getDocument({
        data: await file.arrayBuffer(),
      }).promise;
      const pageCount = sourcePdf.numPages;
      let outputPdf: jsPDF | null = null;
      const jpegQuality = quality / 100;

      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        setProgressLabel(`Rendering page ${pageNumber} of ${pageCount}`);
        setProgress(10 + ((pageNumber - 1) / pageCount) * 75);

        const page = await sourcePdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: false });

        if (!context) {
          throw new Error("Canvas is not available in this browser.");
        }

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: context,
          viewport,
          canvas,
        }).promise;

        const pageImage = canvas.toDataURL("image/jpeg", jpegQuality);
        const orientation = canvas.width > canvas.height ? "landscape" : "portrait";

        if (!outputPdf) {
          outputPdf = new jsPDF({
            orientation,
            unit: "px",
            format: [canvas.width, canvas.height],
            compress: true,
          });
        } else {
          outputPdf.addPage([canvas.width, canvas.height], orientation);
        }

        outputPdf.addImage(
          pageImage,
          "JPEG",
          0,
          0,
          canvas.width,
          canvas.height,
          undefined,
          "FAST"
        );
        setProgress(10 + (pageNumber / pageCount) * 75);
      }

      if (!outputPdf) {
        throw new Error("This PDF does not contain any pages.");
      }

      setProgressLabel("Saving compressed PDF");
      setProgress(92);
      const blob = outputPdf.output("blob");

      setResult({
        url: URL.createObjectURL(blob),
        originalSize: file.size,
        compressedSize: blob.size,
        pageCount,
      });
      setProgress(100);
    } catch (compressError) {
      console.error(compressError);
      setError(
        "Failed to compress this PDF. Please try a standard, unlocked PDF file."
      );
      setProgress(0);
      setProgressLabel("");
    } finally {
      setIsCompressing(false);
    }
  }

  const reduction = result
    ? getReductionPercent(result.originalSize, result.compressedSize)
    : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Compressor</h1>

      <p className="mb-8 text-slate-400">
        Compress a PDF by rendering each page as an optimized image and
        rebuilding a smaller downloadable PDF.
      </p>

      <div className="space-y-6">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-100">
          This compressor works by rendering PDF pages as optimized images. It
          can significantly reduce file size, but selectable text may become
          flattened.
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

        <label className="block">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-slate-300">
              JPEG quality
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
              {quality}%
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={quality}
            onChange={(event) => {
              setQuality(Number(event.target.value));
              clearResult();
            }}
            className="w-full accent-blue-500"
          />

          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Smaller file</span>
            <span>Higher quality</span>
          </div>
        </label>

        {isCompressing && (
          <ProcessingProgress label={progressLabel} value={progress} />
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
                <p
                  className={`text-xl font-bold ${
                    reduction > 0 ? "text-green-300" : "text-slate-300"
                  }`}
                >
                  {formatReduction(reduction)}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              Rendered {result.pageCount} page{result.pageCount === 1 ? "" : "s"} at{" "}
              {quality}% JPEG quality.
            </p>

            {result.compressedSize >= result.originalSize && (
              <p className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
                This PDF could not be reduced at the selected quality. Try a
                lower quality setting, or keep the original if quality matters
                more than file size.
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
