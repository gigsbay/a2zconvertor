"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ProcessingProgress from "@/components/ProcessingProgress";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function parsePageSelection(input: string, pageCount: number) {
  const selectedPages: number[] = [];
  const seenPages = new Set<number>();
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    throw new Error("Enter at least one page or page range.");
  }

  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    const pageMatch = part.match(/^\d+$/);

    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);

      if (start > end) {
        throw new Error(`Invalid range "${part}". Use a start page before the end page.`);
      }

      for (let page = start; page <= end; page += 1) {
        if (page < 1 || page > pageCount) {
          throw new Error(`Page ${page} is outside this PDF's 1-${pageCount} range.`);
        }

        if (!seenPages.has(page)) {
          seenPages.add(page);
          selectedPages.push(page);
        }
      }
    } else if (pageMatch) {
      const page = Number(part);

      if (page < 1 || page > pageCount) {
        throw new Error(`Page ${page} is outside this PDF's 1-${pageCount} range.`);
      }

      if (!seenPages.has(page)) {
        seenPages.add(page);
        selectedPages.push(page);
      }
    } else {
      throw new Error(`Could not understand "${part}". Try 1-3,6,8-10.`);
    }
  }

  return selectedPages;
}

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pageSelection, setPageSelection] = useState("");
  const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isSplitting, setIsSplitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  function clearResult() {
    setSplitPdfUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setProgress(0);
    setProgressLabel("");
  }

  async function handleFile(selectedFile: File | null) {
    setError(null);
    clearResult();
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

  async function splitPdf() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setIsSplitting(true);
      setError(null);
      clearResult();
      setProgress(10);
      setProgressLabel("Reading PDF");

      const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
      const sourcePageCount = sourcePdf.getPageCount();
      const selectedPages = parsePageSelection(pageSelection, sourcePageCount);
      const outputPdf = await PDFDocument.create();
      setProgress(35);
      setProgressLabel(`Copying ${selectedPages.length} page${selectedPages.length === 1 ? "" : "s"}`);
      const copiedPages = await outputPdf.copyPages(
        sourcePdf,
        selectedPages.map((page) => page - 1)
      );

      copiedPages.forEach((page) => outputPdf.addPage(page));
      setProgress(75);
      setProgressLabel("Saving split PDF");

      const splitBytes = await outputPdf.save();
      const splitBuffer = new ArrayBuffer(splitBytes.byteLength);
      new Uint8Array(splitBuffer).set(splitBytes);
      const blob = new Blob([splitBuffer], { type: "application/pdf" });

      setSplitPdfUrl(URL.createObjectURL(blob));
      setProgress(100);
    } catch (splitError) {
      console.error(splitError);
      setError(
        splitError instanceof Error
          ? splitError.message
          : "Failed to split this PDF. Please check the page selection and try again."
      );
    } finally {
      setIsSplitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Split Tool</h1>

      <p className="mb-8 text-slate-400">
        Extract selected pages from one PDF and download them as a new PDF.
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
            Pages to export
          </span>
          <input
            type="text"
            value={pageSelection}
            onChange={(event) => {
              setPageSelection(event.target.value);
              clearResult();
            }}
            placeholder="Example: 1-3,6,8-10"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </label>

        <p className="text-sm text-slate-500">
          Use page ranges like 1-3, individual pages like 1,4,7, or mixed input
          like 1-3,6,8-10.
        </p>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {isSplitting && (
          <ProcessingProgress label={progressLabel} value={progress} />
        )}

        <button
          type="button"
          onClick={splitPdf}
          disabled={!file || !pageSelection.trim() || isSplitting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSplitting ? "Splitting PDF..." : "Split PDF"}
        </button>

        {splitPdfUrl && (
          <a
            href={splitPdfUrl}
            download="split.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Split PDF
          </a>
        )}
      </div>
    </div>
  );
}
