"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ProcessingProgress from "@/components/ProcessingProgress";
import {
  copyBytesToArrayBuffer,
  formatFileSize,
} from "@/components/pdfPageTools";

type Margins = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const defaultMargins: Margins = {
  top: 24,
  right: 24,
  bottom: 24,
  left: 24,
};

export default function PdfCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [firstPageSize, setFirstPageSize] = useState<string | null>(null);
  const [margins, setMargins] = useState<Margins>(defaultMargins);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setProgress(0);
    setProgressLabel("");
  }

  async function handleFile(selectedFile: File | null) {
    setError(null);
    clearOutput();
    setPageCount(null);
    setFirstPageSize(null);

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
      const pdf = await PDFDocument.load(await selectedFile.arrayBuffer());
      const pages = pdf.getPages();
      setPageCount(pages.length);

      if (pages[0]) {
        const { width, height } = pages[0].getSize();
        setFirstPageSize(`${Math.round(width)} x ${Math.round(height)} pt`);
      }
    } catch (loadError) {
      console.error(loadError);
      setFile(null);
      setError("Failed to read this PDF. Please try a standard, unlocked PDF file.");
    }
  }

  function updateMargin(key: keyof Margins, value: string) {
    clearOutput();
    setMargins((current) => ({
      ...current,
      [key]: Math.max(0, Number(value) || 0),
    }));
  }

  async function cropPdf() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setIsCropping(true);
      setError(null);
      clearOutput();
      setProgress(10);
      setProgressLabel("Reading PDF");

      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const pages = pdf.getPages();

      if (pages.length === 0) {
        throw new Error("This PDF does not contain any pages.");
      }

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const cropWidth = width - margins.left - margins.right;
        const cropHeight = height - margins.top - margins.bottom;

        if (cropWidth <= 20 || cropHeight <= 20) {
          throw new Error(
            "Crop margins are too large for at least one page. Reduce the margins and try again."
          );
        }

        page.setCropBox(margins.left, margins.bottom, cropWidth, cropHeight);
        setProgress(20 + ((index + 1) / pages.length) * 60);
        setProgressLabel(`Applying crop to page ${index + 1} of ${pages.length}`);
      });

      setProgress(85);
      setProgressLabel("Saving cropped PDF");
      const outputBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([copyBytesToArrayBuffer(outputBytes)], {
        type: "application/pdf",
      });

      setOutputUrl(URL.createObjectURL(blob));
      setProgress(100);
    } catch (cropError) {
      console.error(cropError);
      setError(
        cropError instanceof Error
          ? cropError.message
          : "Failed to crop this PDF. Please try a standard, unlocked PDF file."
      );
    } finally {
      setIsCropping(false);
    }
  }

  const totalHorizontal = margins.left + margins.right;
  const totalVertical = margins.top + margins.bottom;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Crop PDF</h1>

      <p className="mb-8 text-slate-400">
        Crop every page in a PDF by setting top, right, bottom and left margins
        in PDF points. The content stays in the file; the visible crop box is
        adjusted in your browser.
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
            <p className="mt-1 text-sm text-slate-500">
              {formatFileSize(file.size)}
              {pageCount ? ` - ${pageCount} page${pageCount === 1 ? "" : "s"}` : ""}
              {firstPageSize ? ` - first page ${firstPageSize}` : ""}
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          {(["top", "right", "bottom", "left"] as const).map((key) => (
            <label key={key} className="block">
              <span className="mb-2 block text-sm font-semibold capitalize text-slate-300">
                {key} margin
              </span>
              <input
                type="number"
                min="0"
                step="1"
                value={margins[key]}
                onChange={(event) => updateMargin(key, event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </label>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-100">
          Preview: this will crop {margins.top} pt from the top, {margins.right} pt
          from the right, {margins.bottom} pt from the bottom and {margins.left} pt
          from the left of every page. Total visible area removed is{" "}
          {totalHorizontal} pt horizontally and {totalVertical} pt vertically.
        </div>

        {isCropping && (
          <ProcessingProgress label={progressLabel} value={progress} />
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={cropPdf}
          disabled={!file || isCropping}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCropping ? "Cropping PDF..." : "Crop PDF"}
        </button>

        {outputUrl && (
          <a
            href={outputUrl}
            download="cropped.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Cropped PDF
          </a>
        )}
      </div>
    </div>
  );
}
