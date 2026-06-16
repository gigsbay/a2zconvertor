"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  copyBytesToArrayBuffer,
  formatFileSize,
} from "@/components/pdfPageTools";

export default function PdfPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isNumbering, setIsNumbering] = useState(false);
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

  async function addPageNumbers() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setIsNumbering(true);
      setError(null);
      clearOutput();

      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      const totalPages = pages.length;

      pages.forEach((page, index) => {
        const { width } = page.getSize();
        const label = `Page ${index + 1} of ${totalPages}`;
        const size = 12;
        const textWidth = font.widthOfTextAtSize(label, size);

        page.drawText(label, {
          x: width / 2 - textWidth / 2,
          y: 24,
          size,
          font,
          color: rgb(0.35, 0.39, 0.46),
        });
      });

      const outputBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([copyBytesToArrayBuffer(outputBytes)], {
        type: "application/pdf",
      });

      setOutputUrl(URL.createObjectURL(blob));
    } catch (numberError) {
      console.error(numberError);
      setError("Failed to add page numbers. Please try a standard, unlocked PDF file.");
    } finally {
      setIsNumbering(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Add Page Numbers to PDF</h1>

      <p className="mb-8 text-slate-400">
        Add page numbers to the bottom center of every PDF page in your browser.
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

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={addPageNumbers}
          disabled={!file || isNumbering}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isNumbering ? "Adding Page Numbers..." : "Add Page Numbers"}
        </button>

        {outputUrl && (
          <a
            href={outputUrl}
            download="page-numbered.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Numbered PDF
          </a>
        )}
      </div>
    </div>
  );
}
