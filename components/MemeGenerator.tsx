"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function MemeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState(48);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    drawMeme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, topText, bottomText, fontSize]);

  function clearDownload() {
    setDownloadUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;
    setError(null);
    clearDownload();

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    if (!selectedFile) {
      setImageUrl(null);
      setFileName(null);
      return;
    }

    const isImage =
      ["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type) ||
      /\.(jpe?g|png|webp)$/i.test(selectedFile.name);

    if (!isImage) {
      setImageUrl(null);
      setFileName(null);
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    setFileName(selectedFile.name);
    setImageUrl(URL.createObjectURL(selectedFile));
  }

  function drawMeme() {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image || !image.complete || image.naturalWidth === 0) {
      return;
    }

    const maxWidth = 1000;
    const scale = Math.min(1, maxWidth / image.naturalWidth);
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const scaledFontSize = Math.max(18, Math.round(fontSize * scale));
    context.font = `900 ${scaledFontSize}px Impact, Arial Black, sans-serif`;
    context.textAlign = "center";
    context.lineJoin = "round";
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#000000";
    context.lineWidth = Math.max(3, Math.round(scaledFontSize * 0.12));

    drawMemeText(context, topText.toUpperCase(), canvas.width / 2, scaledFontSize + 18, canvas.width * 0.92, scaledFontSize);
    drawMemeText(
      context,
      bottomText.toUpperCase(),
      canvas.width / 2,
      canvas.height - 18,
      canvas.width * 0.92,
      scaledFontSize,
      "bottom"
    );
  }

  function downloadMeme() {
    const canvas = canvasRef.current;
    if (!canvas) {
      setError("Please upload an image first.");
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        setError("Could not export this meme image.");
        return;
      }

      clearDownload();
      setDownloadUrl(URL.createObjectURL(blob));
    }, "image/png");
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Meme Generator</h1>

      <p className="mb-8 text-slate-400">
        Upload an image, add classic meme text, preview it on canvas and
        download the finished PNG.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {fileName && (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            {fileName}
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Top text" value={topText} onChange={setTopText} />
          <TextField
            label="Bottom text"
            value={bottomText}
            onChange={setBottomText}
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-300">
            Font size: {fontSize}px
          </span>
          <input
            type="range"
            min="20"
            max="96"
            value={fontSize}
            onChange={(event) => {
              setFontSize(Number(event.target.value));
              clearDownload();
            }}
            className="w-full accent-blue-500"
          />
        </label>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {imageUrl && (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <img
              ref={imageRef}
              src={imageUrl}
              alt=""
              className="hidden"
              onLoad={drawMeme}
            />

            <canvas
              ref={canvasRef}
              className="mx-auto max-h-[560px] max-w-full rounded-xl border border-white/10"
            />
          </div>
        )}

        <button
          type="button"
          onClick={downloadMeme}
          disabled={!imageUrl}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate Download
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="meme.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Meme PNG
          </a>
        )}
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-blue-500"
      />
    </label>
  );
}

function drawMemeText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  position: "top" | "bottom" = "top"
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) lines.push(currentLine);

  const renderedLines = lines.length > 0 ? lines : [""];
  const startY =
    position === "bottom" ? y - lineHeight * (renderedLines.length - 1) : y;

  renderedLines.forEach((line, index) => {
    const lineY = startY + index * lineHeight;
    context.strokeText(line, x, lineY);
    context.fillText(line, x, lineY);
  });
}
