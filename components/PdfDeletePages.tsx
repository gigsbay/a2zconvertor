"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ProcessingProgress from "@/components/ProcessingProgress";
import {
  copyBytesToArrayBuffer,
  formatFileSize,
  parsePageSelection,
} from "@/components/pdfPageTools";

export default function PdfDeletePages() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesToRemove, setPagesToRemove] = useState("");
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
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
      setPageCount(sourcePdf.getPageCount());
      setPagesToRemove(sourcePdf.getPageCount() > 1 ? "2" : "1");
    } catch (loadError) {
      console.error(loadError);
      setFile(null);
      setError("Failed to read this PDF. Please try a standard, unlocked PDF file.");
    }
  }

  async function deletePages() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      clearOutput();
      setProgress(10);
      setProgressLabel("Reading PDF");

      const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
      const sourcePageCount = sourcePdf.getPageCount();
      const removedPages = new Set(parsePageSelection(pagesToRemove, sourcePageCount));
      const keptPageIndexes = sourcePdf
        .getPageIndices()
        .filter((pageIndex) => !removedPages.has(pageIndex + 1));

      if (keptPageIndexes.length === 0) {
        throw new Error("At least one page must remain in the PDF.");
      }

      const outputPdf = await PDFDocument.create();
      setProgress(35);
      setProgressLabel(`Copying ${keptPageIndexes.length} remaining page${keptPageIndexes.length === 1 ? "" : "s"}`);
      const copiedPages = await outputPdf.copyPages(sourcePdf, keptPageIndexes);

      copiedPages.forEach((page) => outputPdf.addPage(page));
      setProgress(75);
      setProgressLabel("Saving updated PDF");

      const outputBytes = await outputPdf.save();
      const blob = new Blob([copyBytesToArrayBuffer(outputBytes)], {
        type: "application/pdf",
      });

      setOutputUrl(URL.createObjectURL(blob));
      setProgress(100);
    } catch (deleteError) {
      console.error(deleteError);
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete pages from this PDF."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Delete Pages Tool</h1>

      <p className="mb-8 text-slate-400">
        Remove selected pages from one PDF and download the remaining pages as a
        new PDF.
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
            Pages to remove
          </span>
          <input
            type="text"
            value={pagesToRemove}
            onChange={(event) => {
              setPagesToRemove(event.target.value);
              clearOutput();
            }}
            placeholder="Example: 2,4,7 or 3-5"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </label>

        <p className="text-sm text-slate-500">
          Use individual pages like 2,4,7, ranges like 3-5, or mixed input like
          1,3-5,9.
        </p>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {isDeleting && (
          <ProcessingProgress label={progressLabel} value={progress} />
        )}

        <button
          type="button"
          onClick={deletePages}
          disabled={!file || !pagesToRemove.trim() || isDeleting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting Pages..." : "Delete Pages"}
        </button>

        {outputUrl && (
          <a
            href={outputUrl}
            download="pages-removed.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Updated PDF
          </a>
        )}
      </div>
    </div>
  );
}
