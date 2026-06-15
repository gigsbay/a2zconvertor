"use client";

import { useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSize = useMemo(() => {
    return files.reduce((sum, file) => sum + file.size, 0);
  }, [files]);

  function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function handleFiles(selectedFiles: FileList | null) {
    setError(null);
    setMergedPdfUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });

    const pdfFiles = Array.from(selectedFiles ?? []).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
    );

    setFiles(pdfFiles);

    if (selectedFiles && pdfFiles.length !== selectedFiles.length) {
      setError("Only PDF files can be merged. Non-PDF files were ignored.");
    }
  }

  function removeFile(indexToRemove: number) {
    setFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    );
    setMergedPdfUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
  }

  async function mergePdfs() {
    if (files.length < 2) {
      setError("Please select at least two PDF files to merge.");
      return;
    }

    try {
      setIsMerging(true);
      setError(null);

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
        const copiedPages = await mergedPdf.copyPages(
          sourcePdf,
          sourcePdf.getPageIndices()
        );

        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const mergedBuffer = new ArrayBuffer(mergedBytes.byteLength);
      new Uint8Array(mergedBuffer).set(mergedBytes);
      const blob = new Blob([mergedBuffer], { type: "application/pdf" });

      setMergedPdfUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return URL.createObjectURL(blob);
      });
    } catch (mergeError) {
      console.error(mergeError);
      setError(
        "Failed to merge these PDFs. Please try again with standard, unlocked PDF files."
      );
    } finally {
      setIsMerging(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Merge Tool</h1>

      <p className="mb-8 text-slate-400">
        Combine multiple PDF files into one downloadable PDF in your browser.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={(event) => handleFiles(event.target.files)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {files.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-white">
                {files.length} PDF{files.length === 1 ? "" : "s"} selected
              </p>
              <p className="text-sm text-slate-400">
                Total size: {formatFileSize(totalSize)}
              </p>
            </div>

            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-950/70 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {index + 1}. {file.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-red-400/60 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={mergePdfs}
          disabled={files.length < 2 || isMerging}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isMerging ? "Merging PDFs..." : "Merge PDFs"}
        </button>

        {mergedPdfUrl && (
          <a
            href={mergedPdfUrl}
            download="merged.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Merged PDF
          </a>
        )}
      </div>
    </div>
  );
}
