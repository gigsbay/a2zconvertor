"use client";

import {
  PointerEvent as ReactPointerEvent,
  useRef,
  useState,
} from "react";
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

type PageSize = {
  width: number;
  height: number;
};

type DragMode = "move" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

type DragState = {
  mode: DragMode;
  pointerId: number;
  startX: number;
  startY: number;
  margins: Margins;
};

const defaultMargins: Margins = {
  top: 24,
  right: 24,
  bottom: 24,
  left: 24,
};

const minimumCropSize = 20;

export default function PdfCrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState<PageSize | null>(null);
  const [margins, setMargins] = useState<Margins>(defaultMargins);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
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
    setPageSize(null);
    setMargins(defaultMargins);
    clearPreview();

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
      setIsLoadingPreview(true);
      setProgress(10);
      setProgressLabel("Reading PDF");
      const bytes = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(bytes.slice(0));
      const pages = pdf.getPages();

      if (!pages[0]) {
        throw new Error("This PDF does not contain any pages.");
      }

      const firstPageSize = pages[0].getSize();
      const nextMargins = fitMarginsToPage(defaultMargins, firstPageSize);

      setFile(selectedFile);
      setPageCount(pages.length);
      setPageSize(firstPageSize);
      setMargins(nextMargins);
      setProgress(40);
      setProgressLabel("Rendering first page preview");

      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";
      const previewPdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const firstPage = await previewPdf.getPage(1);
      const baseViewport = firstPage.getViewport({ scale: 1 });
      const scale = Math.min(1.25, 680 / baseViewport.width);
      const viewport = firstPage.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d", { alpha: false });

      if (!canvas || !context) {
        throw new Error("Canvas is not available in this browser.");
      }

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await firstPage.render({ canvas, canvasContext: context, viewport }).promise;
      setProgress(100);
      setProgressLabel("Preview ready");
    } catch (loadError) {
      console.error(loadError);
      setFile(null);
      setPageCount(null);
      setPageSize(null);
      clearPreview();
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to read this PDF. Please try a standard, unlocked PDF file."
      );
      setProgress(0);
      setProgressLabel("");
    } finally {
      setIsLoadingPreview(false);
    }
  }

  function updateMargin(key: keyof Margins, value: string) {
    clearOutput();
    const numericValue = Math.max(0, Number(value) || 0);
    setMargins((current) =>
      pageSize
        ? clampMargins({ ...current, [key]: numericValue }, pageSize)
        : { ...current, [key]: numericValue }
    );
  }

  function startDrag(
    event: ReactPointerEvent<HTMLDivElement | HTMLButtonElement>,
    mode: DragMode
  ) {
    if (!pageSize) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      margins,
    };
    clearOutput();
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const preview = previewRef.current;

    if (!drag || !pageSize || !preview || drag.pointerId !== event.pointerId) {
      return;
    }

    const bounds = preview.getBoundingClientRect();
    const deltaX = ((event.clientX - drag.startX) / bounds.width) * pageSize.width;
    const deltaY =
      ((event.clientY - drag.startY) / bounds.height) * pageSize.height;
    setMargins(resizeMargins(drag.margins, drag.mode, deltaX, deltaY, pageSize));
  }

  function finishDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
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

        if (cropWidth <= minimumCropSize || cropHeight <= minimumCropSize) {
          throw new Error(
            "The selected crop area is too small for at least one page."
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

  function clearPreview() {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }

  const cropStyle = pageSize
    ? {
        left: `${(margins.left / pageSize.width) * 100}%`,
        top: `${(margins.top / pageSize.height) * 100}%`,
        right: `${(margins.right / pageSize.width) * 100}%`,
        bottom: `${(margins.bottom / pageSize.height) * 100}%`,
      }
    : undefined;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Crop PDF</h1>

      <p className="mb-8 text-slate-400">
        Upload a PDF, drag and resize the crop box on the first-page preview,
        then apply the same crop margins to every page.
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
              {pageSize
                ? ` - first page ${Math.round(pageSize.width)} x ${Math.round(
                    pageSize.height
                  )} pt`
                : ""}
            </p>
          </div>
        )}

        {isLoadingPreview && (
          <ProcessingProgress label={progressLabel} value={progress} />
        )}

        <div className={pageSize ? "block" : "hidden"}>
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Drag the crop area to move it. Drag a corner to resize it.
          </p>
          <div className="overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4">
            <div
              ref={previewRef}
              className="relative mx-auto w-fit max-w-full touch-none select-none overflow-hidden"
              onPointerMove={handlePointerMove}
              onPointerUp={finishDrag}
              onPointerCancel={finishDrag}
            >
              <canvas
                ref={canvasRef}
                className="block max-h-[680px] max-w-full"
                aria-label="First PDF page crop preview"
              />
              {cropStyle && (
                <>
                  <div
                    className="absolute border-2 border-blue-400 bg-blue-400/10 shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_0_0_9999px_rgba(0,0,0,0.55)]"
                    style={cropStyle}
                    onPointerDown={(event) => startDrag(event, "move")}
                  >
                    <span className="pointer-events-none absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                      Keep area
                    </span>
                    {(
                      [
                        ["top-left", "-left-2 -top-2 cursor-nwse-resize"],
                        ["top-right", "-right-2 -top-2 cursor-nesw-resize"],
                        ["bottom-left", "-bottom-2 -left-2 cursor-nesw-resize"],
                        ["bottom-right", "-bottom-2 -right-2 cursor-nwse-resize"],
                      ] as const
                    ).map(([mode, position]) => (
                      <button
                        key={mode}
                        type="button"
                        aria-label={`Resize crop from ${mode.replace("-", " ")}`}
                        className={`absolute h-5 w-5 rounded-full border-2 border-white bg-blue-500 ${position}`}
                        onPointerDown={(event) => startDrag(event, mode)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Fine-tune margins in PDF points
          </p>
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
                  value={Math.round(margins[key])}
                  onChange={(event) => updateMargin(key, event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-100">
          The first page is used as the visual guide. The same point-based
          margins are applied to every PDF page; pages with different dimensions
          may show a proportionally different crop.
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
          disabled={!file || isLoadingPreview || isCropping}
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

function fitMarginsToPage(margins: Margins, pageSize: PageSize) {
  return clampMargins(margins, pageSize);
}

function clampMargins(margins: Margins, pageSize: PageSize): Margins {
  const left = clamp(margins.left, 0, pageSize.width - minimumCropSize);
  const right = clamp(
    margins.right,
    0,
    pageSize.width - minimumCropSize - left
  );
  const top = clamp(margins.top, 0, pageSize.height - minimumCropSize);
  const bottom = clamp(
    margins.bottom,
    0,
    pageSize.height - minimumCropSize - top
  );

  return { top, right, bottom, left };
}

function resizeMargins(
  start: Margins,
  mode: DragMode,
  deltaX: number,
  deltaY: number,
  pageSize: PageSize
): Margins {
  const cropWidth = pageSize.width - start.left - start.right;
  const cropHeight = pageSize.height - start.top - start.bottom;

  if (mode === "move") {
    const left = clamp(start.left + deltaX, 0, pageSize.width - cropWidth);
    const top = clamp(start.top + deltaY, 0, pageSize.height - cropHeight);
    return {
      left,
      right: pageSize.width - left - cropWidth,
      top,
      bottom: pageSize.height - top - cropHeight,
    };
  }

  const next = { ...start };

  if (mode.includes("left")) {
    next.left = clamp(
      start.left + deltaX,
      0,
      pageSize.width - start.right - minimumCropSize
    );
  }
  if (mode.includes("right")) {
    next.right = clamp(
      start.right - deltaX,
      0,
      pageSize.width - start.left - minimumCropSize
    );
  }
  if (mode.includes("top")) {
    next.top = clamp(
      start.top + deltaY,
      0,
      pageSize.height - start.bottom - minimumCropSize
    );
  }
  if (mode.includes("bottom")) {
    next.bottom = clamp(
      start.bottom - deltaY,
      0,
      pageSize.height - start.top - minimumCropSize
    );
  }

  return next;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}
