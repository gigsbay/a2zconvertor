"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function ImageToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);

    if (!selectedFile) {
      setImageUrl(null);
      return;
    }

    setImageUrl(URL.createObjectURL(selectedFile));
  }

  async function convertToPdf() {
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const pdf = new jsPDF({
        orientation: img.width > img.height ? "landscape" : "portrait",
        unit: "px",
        format: [img.width, img.height],
      });

      pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
      pdf.save("converted-image.pdf");

      URL.revokeObjectURL(url);
    };

    img.src = url;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Image to PDF Converter</h1>

      <p className="mb-8 text-slate-400">
        Upload a JPG, PNG or WEBP image and convert it into a PDF file.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {imageUrl && (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="mb-3 text-sm text-slate-400">Image Preview</p>
            <img
              src={imageUrl}
              alt="Preview"
              className="max-h-[400px] w-auto rounded-xl"
            />
          </div>
        )}

        <button
          onClick={convertToPdf}
          disabled={!file}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Convert to PDF
        </button>
      </div>
    </div>
  );
}