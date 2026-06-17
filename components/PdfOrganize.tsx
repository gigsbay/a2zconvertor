"use client";

import { DragEvent, useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  copyBytesToArrayBuffer,
  formatFileSize,
} from "@/components/pdfPageTools";

type PdfPageItem = {
  id: string;
  originalIndex: number;
  pageNumber: number;
  thumbnailUrl: string | null;
};

export default function PdfOrganize() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPageItem[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
  }

  function clearThumbnails(items: PdfPageItem[]) {
    items.forEach((item) => {
      if (item.thumbnailUrl) URL.revokeObjectURL(item.thumbnailUrl);
    });
  }

  async function handleFile(selectedFile: File | null) {
    setError(null);
    setProgress(null);
    clearOutput();
    clearThumbnails(pages);
    setPages([]);

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

    try {
      setIsLoading(true);
      setFile(selectedFile);
      setProgress("Reading PDF pages...");

      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";

      const pdf = await pdfjsLib.getDocument({
        data: await selectedFile.arrayBuffer(),
      }).promise;
      const renderedPages: PdfPageItem[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        setProgress(`Rendering thumbnail ${pageNumber} of ${pdf.numPages}`);
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 0.28 });
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

        const thumbnailUrl = await new Promise<string | null>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob ? URL.createObjectURL(blob) : null);
          }, "image/png");
        });

        renderedPages.push({
          id: `page-${pageNumber}`,
          originalIndex: pageNumber - 1,
          pageNumber,
          thumbnailUrl,
        });
      }

      setPages(renderedPages);
      setProgress(null);
    } catch (loadError) {
      console.error(loadError);
      setFile(null);
      setPages([]);
      setError("Failed to read this PDF. Please try a standard, unlocked PDF file.");
      setProgress(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDragStart(id: string) {
    setDraggedId(id);
    clearOutput();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>, targetId: string) {
    event.preventDefault();

    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      return;
    }

    setPages((currentPages) => {
      const draggedIndex = currentPages.findIndex((page) => page.id === draggedId);
      const targetIndex = currentPages.findIndex((page) => page.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) {
        return currentPages;
      }

      const nextPages = [...currentPages];
      const [draggedPage] = nextPages.splice(draggedIndex, 1);
      nextPages.splice(targetIndex, 0, draggedPage);
      return nextPages;
    });
    setDraggedId(null);
  }

  function deletePage(id: string) {
    clearOutput();
    setPages((currentPages) => {
      const removed = currentPages.find((page) => page.id === id);
      if (removed?.thumbnailUrl) URL.revokeObjectURL(removed.thumbnailUrl);
      return currentPages.filter((page) => page.id !== id);
    });
  }

  async function downloadOrganizedPdf() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    if (pages.length === 0) {
      setError("Keep at least one page before downloading.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      clearOutput();

      const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
      const outputPdf = await PDFDocument.create();
      const copiedPages = await outputPdf.copyPages(
        sourcePdf,
        pages.map((page) => page.originalIndex)
      );

      copiedPages.forEach((page) => outputPdf.addPage(page));

      const outputBytes = await outputPdf.save({ useObjectStreams: true });
      const blob = new Blob([copyBytesToArrayBuffer(outputBytes)], {
        type: "application/pdf",
      });

      setOutputUrl(URL.createObjectURL(blob));
    } catch (saveError) {
      console.error(saveError);
      setError("Failed to rebuild this PDF. Please try a standard, unlocked PDF file.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Organize PDF</h1>

      <p className="mb-8 text-slate-400">
        Upload one PDF, drag pages into a new order, remove pages if needed,
        and download the organized PDF.
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
              {formatFileSize(file.size)}
              {pages.length > 0
                ? ` · ${pages.length} page${pages.length === 1 ? "" : "s"} kept`
                : ""}
            </p>
          </div>
        )}

        {progress && (
          <p className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            {progress}
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {pages.length > 0 && (
          <div>
            <p className="mb-4 text-sm font-semibold text-slate-300">
              Drag pages to reorder. Use remove to delete a page from the output.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  draggable
                  onDragStart={() => handleDragStart(page.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, page.id)}
                  onDragEnd={() => setDraggedId(null)}
                  className={`rounded-2xl border p-4 transition ${
                    draggedId === page.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-black/20 hover:border-blue-500/60"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">
                        Output {index + 1}
                      </p>
                      <p className="text-sm text-slate-500">
                        Original page {page.pageNumber}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deletePage(page.id)}
                      disabled={pages.length === 1}
                      className="rounded-lg border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex min-h-40 items-center justify-center rounded-xl border border-white/10 bg-white p-2">
                    {page.thumbnailUrl ? (
                      <img
                        src={page.thumbnailUrl}
                        alt={`Page ${page.pageNumber} thumbnail`}
                        className="max-h-44 w-auto"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-700">
                        Page {page.pageNumber}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={downloadOrganizedPdf}
          disabled={!file || pages.length === 0 || isLoading || isSaving}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Rebuilding PDF..." : "Download Organized PDF"}
        </button>

        {outputUrl && (
          <a
            href={outputUrl}
            download="organized.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Organized PDF
          </a>
        )}
      </div>
    </div>
  );
}
