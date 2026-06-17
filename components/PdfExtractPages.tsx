"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ProcessingProgress from "@/components/ProcessingProgress";
import {
  copyBytesToArrayBuffer,
  formatFileSize,
  parsePageSelection,
} from "@/components/pdfPageTools";

export default function PdfExtractPages() {
  const [file, setFile] = useState<File | null>(null);
  const [pageSelection, setPageSelection] = useState("");
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
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
      const pages = sourcePdf.getPageCount();
      setPageCount(pages);
      setPageSelection(pages > 1 ? `1-${Math.min(3, pages)}` : "1");
    } catch (loadError) {
      console.error(loadError);
      setFile(null);
      setError("Failed to read this PDF. Please try a standard, unlocked PDF file.");
    }
  }

  async function extractPages() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setIsExtracting(true);
      setError(null);
      clearOutput();
      setProgress(10);
      setProgressLabel("Reading PDF");

      const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
      const selectedPages = parsePageSelection(pageSelection, sourcePdf.getPageCount());
      const outputPdf = await PDFDocument.create();
      setProgress(35);
      setProgressLabel(`Copying ${selectedPages.length} page${selectedPages.length === 1 ? "" : "s"}`);
      const copiedPages = await outputPdf.copyPages(
        sourcePdf,
        selectedPages.map((page) => page - 1)
      );

      copiedPages.forEach((page) => outputPdf.addPage(page));
      setProgress(75);
      setProgressLabel("Saving extracted PDF");

      const outputBytes = await outputPdf.save();
      const blob = new Blob([copyBytesToArrayBuffer(outputBytes)], {
        type: "application/pdf",
      });

      setOutputUrl(URL.createObjectURL(blob));
      setProgress(100);
    } catch (extractError) {
      console.error(extractError);
      setError(
        extractError instanceof Error
          ? extractError.message
          : "Failed to extract pages from this PDF."
      );
    } finally {
      setIsExtracting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Extract Pages Tool</h1>

      <p className="mb-8 text-slate-400">
        Select pages from one PDF and export them as a new downloadable PDF.
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
            Pages to extract
          </span>
          <input
            type="text"
            value={pageSelection}
            onChange={(event) => {
              setPageSelection(event.target.value);
              clearOutput();
            }}
            placeholder="Example: 1,3,5 or 2-4"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </label>

        <p className="text-sm text-slate-500">
          Use individual pages like 1,3,5, ranges like 2-4, or mixed input like
          1-3,6,8-10.
        </p>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {isExtracting && (
          <ProcessingProgress label={progressLabel} value={progress} />
        )}

        <button
          type="button"
          onClick={extractPages}
          disabled={!file || !pageSelection.trim() || isExtracting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isExtracting ? "Extracting Pages..." : "Extract Pages"}
        </button>

        {outputUrl && (
          <a
            href={outputUrl}
            download="extracted-pages.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Extracted Pages
          </a>
        )}
      </div>
    </div>
  );
}
