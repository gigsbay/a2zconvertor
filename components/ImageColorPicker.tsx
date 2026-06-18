"use client";

import { ChangeEvent, MouseEvent, useRef, useState } from "react";

type PickedColor = {
  hex: string;
  rgb: string;
  hsl: string;
  x: number;
  y: number;
};

export default function ImageColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<PickedColor | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setError(null);
    setPickedColor(null);
    setCopiedValue(null);

    if (!file) {
      setFileName(null);
      clearCanvas();
      return;
    }

    const isSupported =
      ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!isSupported) {
      setFileName(null);
      clearCanvas();
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    try {
      const image = await loadImage(file);
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d", { willReadFrequently: true });

      if (!canvas || !context) {
        throw new Error("Canvas is not available in this browser.");
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      setFileName(file.name);
    } catch (loadError) {
      clearCanvas();
      setFileName(null);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load this image."
      );
    }
  }

  function pickColor(event: MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });

    if (!canvas || !context || canvas.width === 0 || canvas.height === 0) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const x = clamp(
      Math.floor((event.clientX - bounds.left) * (canvas.width / bounds.width)),
      0,
      canvas.width - 1
    );
    const y = clamp(
      Math.floor((event.clientY - bounds.top) * (canvas.height / bounds.height)),
      0,
      canvas.height - 1
    );
    const [red, green, blue] = context.getImageData(x, y, 1, 1).data;

    setPickedColor({
      hex: toHex(red, green, blue),
      rgb: `rgb(${red}, ${green}, ${blue})`,
      hsl: toHsl(red, green, blue),
      x,
      y,
    });
    setCopiedValue(null);
  }

  async function copyColor(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(label);
    } catch {
      setError("Could not copy the color value. Please copy it manually.");
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Image Color Picker</h1>

      <p className="mb-8 text-slate-400">
        Upload an image, click or tap any pixel, then copy its HEX, RGB or HSL
        color value.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          onChange={handleFile}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {fileName && (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            {fileName}
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className={fileName ? "block" : "hidden"}>
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Click or tap the image to pick a color
          </p>
          <div className="overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4">
            <canvas
              ref={canvasRef}
              onClick={pickColor}
              className="mx-auto max-h-[600px] max-w-full cursor-crosshair rounded-xl"
              aria-label="Uploaded image color picker"
            />
          </div>
        </div>

        {pickedColor && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="mb-5 flex items-center gap-4">
              <div
                className="h-16 w-16 shrink-0 rounded-xl border border-white/20"
                style={{ backgroundColor: pickedColor.hex }}
                aria-label={`Selected color ${pickedColor.hex}`}
              />
              <div>
                <p className="font-semibold text-white">Selected color</p>
                <p className="text-sm text-slate-400">
                  Pixel {pickedColor.x}, {pickedColor.y}
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <ColorValue
                label="HEX"
                value={pickedColor.hex}
                copied={copiedValue === "HEX"}
                onCopy={() => copyColor("HEX", pickedColor.hex)}
              />
              <ColorValue
                label="RGB"
                value={pickedColor.rgb}
                copied={copiedValue === "RGB"}
                onCopy={() => copyColor("RGB", pickedColor.rgb)}
              />
              <ColorValue
                label="HSL"
                value={pickedColor.hsl}
                copied={copiedValue === "HSL"}
                onCopy={() => copyColor("HSL", pickedColor.hsl)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ColorValue({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <p className="mb-1 text-xs font-semibold uppercase text-slate-500">
        {label}
      </p>
      <p className="mb-3 break-words font-mono text-sm text-white">{value}</p>
      <button
        type="button"
        onClick={onCopy}
        className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
      >
        {copied ? "Copied" : `Copy ${label}`}
      </button>
    </div>
  );
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not decode this image in your browser."));
    };
    image.src = url;
  });
}

function toHex(red: number, green: number, blue: number) {
  return `#${[red, green, blue]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function toHsl(red: number, green: number, blue: number) {
  const normalized = [red, green, blue].map((value) => value / 255);
  const [r, g, b] = normalized;
  const maximum = Math.max(r, g, b);
  const minimum = Math.min(r, g, b);
  const lightness = (maximum + minimum) / 2;
  const difference = maximum - minimum;
  let hue = 0;
  let saturation = 0;

  if (difference !== 0) {
    saturation =
      lightness > 0.5
        ? difference / (2 - maximum - minimum)
        : difference / (maximum + minimum);

    if (maximum === r) {
      hue = (g - b) / difference + (g < b ? 6 : 0);
    } else if (maximum === g) {
      hue = (b - r) / difference + 2;
    } else {
      hue = (r - g) / difference + 4;
    }

    hue /= 6;
  }

  return `hsl(${Math.round(hue * 360)}, ${Math.round(
    saturation * 100
  )}%, ${Math.round(lightness * 100)}%)`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}
