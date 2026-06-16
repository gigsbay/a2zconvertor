"use client";

import { useState } from "react";
import { degrees, PDFDocument } from "pdf-lib";
import {
  copyBytesToArrayBuffer,
  formatFileSize,
} from "@/components/pdfPageTools";

const rotationOptions = [90, 180, 270] as const;

export default function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<(typeof rotationOptions)[number]>(90);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
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

  async function rotatePdf() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setIsRotating(true);
      setError(null);
      clearOutput();

      const pdf = await PDFDocument.load(await file.arrayBuffer());

      pdf.getPages().forEach((page) => {
        const currentAngle = page.getRotation().angle;
        page.setRotation(degrees((currentAngle + rotation) % 360));
      });

      const outputBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([copyBytesToArrayBuffer(outputBytes)], {
        type: "application/pdf",
      });

      setOutputUrl(URL.createObjectURL(blob));
    } catch (rotateError) {
      console.error(rotateError);
      setError("Failed to rotate this PDF. Please try a standard, unlocked PDF file.");
    } finally {
      setIsRotating(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">PDF Rotate Tool</h1>

      <p className="mb-8 text-slate-400">
        Rotate every page in a PDF by 90, 180 or 270 degrees in your browser.
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

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Rotation angle
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {rotationOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setRotation(option);
                  clearOutput();
                }}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  rotation === option
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-white/10 bg-slate-950 text-slate-300 hover:border-blue-500/60"
                }`}
              >
                {option} degrees
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={rotatePdf}
          disabled={!file || isRotating}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRotating ? "Rotating PDF..." : "Rotate PDF"}
        </button>

        {outputUrl && (
          <a
            href={outputUrl}
            download="rotated.pdf"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Rotated PDF
          </a>
        )}
      </div>
    </div>
  );
}
