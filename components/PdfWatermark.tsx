"use client";

import { useState } from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  copyBytesToArrayBuffer,
  formatFileSize,
} from "@/components/pdfPageTools";

export default function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("A2ZConvertor");
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isWatermarking, setIsWatermarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
  }

  async function handleFile(selectedFile: File | null) {
    setError(null);
    clearOutput();
    setPageCount(null);

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

    try {
      const sourcePdf = await PDFDocument.load(await selectedFile.arrayBuffer());
      setPageCount(sourcePdf.getPageCount());
    } catch (loadError) {
      console.error(loadError);
      setFile(null);
      setError("Failed to read this PDF. Please try a standard, unlocked PDF file.");
    }
  }

  async function addWatermark() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    const trimmedText = watermarkText.trim();

    if (!trimmedText) {
      setError("Enter watermark text before creating the PDF.");
      return;
    }

    try {
      setIsWatermarking(true);
      setError(null);
      clearOutput();

      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);

      pdf.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const maxTextWidth = width * 0.72;
        const baseSize = Math.max(28, Math.min(width, height) * 0.1);
        const textWidthAtBase = font.widthOfTextAtSize(trimmedText, baseSize);
        const size =
          textWidthAtBase > maxTextWidth
            ? Math.max(16, (baseSize * maxTextWidth) / textWidthAtBase)
            : baseSize;
        const textWidth = font.widthOfTextAtSize(trimmedText, size);

        page.drawText(trimmedText, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size,
          font,
          color: rgb(0.75, 0.8, 0.9),
          opacity: 0.28,
          rotate: degrees(-35),
        });
      });

      const outputBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([copyBytesToArrayBuffer(outputBytes)], {
        type: "application/pdf",
      });

      setOutputUrl(URL.createObjectURL(blob));
    } catch (watermarkError) {
      console.error(watermarkError);
      setError("Failed to watermark this PDF. Please try a standard, unlocked PDF file.");
    } finally {
      setIsWatermarking(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Watermark Tool</h1>

      <p className="mb-8 text-slate-400">
        Add a text watermark to every page in a PDF directly in your browser.
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
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{file.name}</p>
                <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
              </div>

              {pageCount && (
                <p className="text-sm font-semibold text-blue-300">
                  {pageCount} page{pageCount === 1 ? "" : "s"}
                </p>
              )}
            </div>
          </div>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-300">
            Watermark text
          </span>
          <input
            type="text"
            value={watermarkText}
            onChange={(event) => {
              setWatermarkText(event.target.value);
              clearOutput();
            }}
            placeholder="Enter watermark text"
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-blue-500"
          />
        </label>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={addWatermark}
          disabled={!file || isWatermarking}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isWatermarking ? "Adding Watermark..." : "Add Watermark"}
        </button>

        {outputUrl && (
          <a
            href={outputUrl}
            download="watermarked.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Watermarked PDF
          </a>
        )}
      </div>
    </div>
  );
}
