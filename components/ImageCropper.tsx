"use client";

import { PointerEvent, useRef, useState } from "react";

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ImageSize = {
  width: number;
  height: number;
};

type DragState = {
  mode: "move" | "resize";
  edge?: "nw" | "ne" | "sw" | "se";
  pointerX: number;
  pointerY: number;
  crop: Crop;
};

const minCropSize = 20;

export default function ImageCropper() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragState = useRef<DragState | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 300,
    height: 300,
  });
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function clearDownload() {
    setDownloadUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
  }

  function handleFileChange(selectedFile: File | null) {
    clearDownload();
    setError(null);
    setImageSize(null);

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    if (!selectedFile) {
      setFile(null);
      setImageUrl(null);
      return;
    }

    const isImage =
      ["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type) ||
      /\.(jpe?g|png|webp)$/i.test(selectedFile.name);

    if (!isImage) {
      setFile(null);
      setImageUrl(null);
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  }

  function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    const nextSize = {
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
    const initialWidth = Math.max(1, Math.round(nextSize.width * 0.7));
    const initialHeight = Math.max(1, Math.round(nextSize.height * 0.7));

    setImageSize(nextSize);
    setCrop({
      x: Math.round((nextSize.width - initialWidth) / 2),
      y: Math.round((nextSize.height - initialHeight) / 2),
      width: initialWidth,
      height: initialHeight,
    });
  }

  function updateCrop(nextCrop: Crop) {
    if (!imageSize) {
      setCrop(nextCrop);
      return;
    }

    setCrop(clampCrop(nextCrop, imageSize));
    clearDownload();
  }

  function startMove(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    dragState.current = {
      mode: "move",
      pointerX: event.clientX,
      pointerY: event.clientY,
      crop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function startResize(
    event: PointerEvent<HTMLButtonElement>,
    edge: DragState["edge"]
  ) {
    event.preventDefault();
    event.stopPropagation();
    dragState.current = {
      mode: "resize",
      edge,
      pointerX: event.clientX,
      pointerY: event.clientY,
      crop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current || !imageSize || !imageRef.current) {
      return;
    }

    const displayedImage = imageRef.current.getBoundingClientRect();
    const scaleX = imageSize.width / displayedImage.width;
    const scaleY = imageSize.height / displayedImage.height;
    const deltaX = (event.clientX - dragState.current.pointerX) * scaleX;
    const deltaY = (event.clientY - dragState.current.pointerY) * scaleY;
    const original = dragState.current.crop;

    if (dragState.current.mode === "move") {
      updateCrop({
        ...original,
        x: original.x + deltaX,
        y: original.y + deltaY,
      });
      return;
    }

    const nextCrop = resizeCrop(original, deltaX, deltaY, dragState.current.edge);
    updateCrop(nextCrop);
  }

  function stopDrag() {
    dragState.current = null;
  }

  async function cropImage() {
    if (!file || !imageSize) {
      setError("Please upload an image first.");
      return;
    }

    try {
      setError(null);
      clearDownload();

      const imageBitmap = await createImageBitmap(file);
      const safeCrop = clampCrop(crop, imageSize);
      const canvas = document.createElement("canvas");

      canvas.width = Math.round(safeCrop.width);
      canvas.height = Math.round(safeCrop.height);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Could not create a crop canvas in this browser.");
        return;
      }

      ctx.drawImage(
        imageBitmap,
        Math.round(safeCrop.x),
        Math.round(safeCrop.y),
        Math.round(safeCrop.width),
        Math.round(safeCrop.height),
        0,
        0,
        Math.round(safeCrop.width),
        Math.round(safeCrop.height)
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          setError("Could not export this cropped image.");
          return;
        }

        setDownloadUrl(URL.createObjectURL(blob));
      }, "image/png");
    } catch (cropError) {
      console.error(cropError);
      setError("Could not crop this image. Please try another JPG, PNG or WEBP file.");
    }
  }

  const cropStyle = imageSize
    ? {
        left: `${(crop.x / imageSize.width) * 100}%`,
        top: `${(crop.y / imageSize.height) * 100}%`,
        width: `${(crop.width / imageSize.width) * 100}%`,
        height: `${(crop.height / imageSize.height) * 100}%`,
      }
    : undefined;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Crop Image Online</h1>

      <p className="mb-8 text-slate-400">
        Upload an image, drag or resize the crop box, then download the cropped
        PNG.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {imageUrl && (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-300">
                Drag the crop area or pull a corner to resize
              </p>
              {imageSize && (
                <p className="text-sm text-slate-500">
                  {imageSize.width} x {imageSize.height}px
                </p>
              )}
            </div>

            <div
              className="relative inline-block max-w-full touch-none select-none overflow-hidden rounded-xl"
              onPointerMove={handlePointerMove}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Crop preview"
                onLoad={handleImageLoad}
                className="max-h-[520px] max-w-full rounded-xl"
                draggable={false}
              />

              {imageSize && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/45" />

                  <div
                    role="application"
                    aria-label="Crop selection"
                    className="absolute cursor-move border-2 border-blue-400 bg-blue-400/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
                    style={cropStyle}
                    onPointerDown={startMove}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-1/3 border-t border-white/50" />
                    <div className="pointer-events-none absolute inset-x-0 top-2/3 border-t border-white/50" />
                    <div className="pointer-events-none absolute inset-y-0 left-1/3 border-l border-white/50" />
                    <div className="pointer-events-none absolute inset-y-0 left-2/3 border-l border-white/50" />

                    {(["nw", "ne", "sw", "se"] as const).map((edge) => (
                      <button
                        key={edge}
                        type="button"
                        aria-label={`Resize ${edge} corner`}
                        onPointerDown={(event) => startResize(event, edge)}
                        className={`absolute h-5 w-5 rounded-full border-2 border-white bg-blue-500 ${
                          edge === "nw"
                            ? "-left-2.5 -top-2.5 cursor-nwse-resize"
                            : edge === "ne"
                              ? "-right-2.5 -top-2.5 cursor-nesw-resize"
                              : edge === "sw"
                                ? "-bottom-2.5 -left-2.5 cursor-nesw-resize"
                                : "-bottom-2.5 -right-2.5 cursor-nwse-resize"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {imageSize && (
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-300">
              Crop dimensions
            </p>
            <div className="grid gap-4 md:grid-cols-4">
              <NumberField
                label="X"
                value={Math.round(crop.x)}
                min={0}
                max={imageSize.width - minCropSize}
                onChange={(value) => updateCrop({ ...crop, x: value })}
              />
              <NumberField
                label="Y"
                value={Math.round(crop.y)}
                min={0}
                max={imageSize.height - minCropSize}
                onChange={(value) => updateCrop({ ...crop, y: value })}
              />
              <NumberField
                label="Width"
                value={Math.round(crop.width)}
                min={minCropSize}
                max={imageSize.width}
                onChange={(value) => updateCrop({ ...crop, width: value })}
              />
              <NumberField
                label="Height"
                value={Math.round(crop.height)}
                min={minCropSize}
                max={imageSize.height}
                onChange={(value) => updateCrop({ ...crop, height: value })}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={cropImage}
          disabled={!file || !imageSize}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Crop Image
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="cropped-image.png"
            className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
          >
            Download Cropped PNG
          </a>
        )}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-blue-500"
      />
    </label>
  );
}

function clampCrop(crop: Crop, imageSize: ImageSize): Crop {
  const width = Math.min(
    Math.max(minCropSize, crop.width),
    imageSize.width
  );
  const height = Math.min(
    Math.max(minCropSize, crop.height),
    imageSize.height
  );
  const x = Math.min(Math.max(0, crop.x), imageSize.width - width);
  const y = Math.min(Math.max(0, crop.y), imageSize.height - height);

  return {
    x,
    y,
    width,
    height,
  };
}

function resizeCrop(
  crop: Crop,
  deltaX: number,
  deltaY: number,
  edge: DragState["edge"]
): Crop {
  if (edge === "nw") {
    return {
      x: crop.x + deltaX,
      y: crop.y + deltaY,
      width: crop.width - deltaX,
      height: crop.height - deltaY,
    };
  }

  if (edge === "ne") {
    return {
      x: crop.x,
      y: crop.y + deltaY,
      width: crop.width + deltaX,
      height: crop.height - deltaY,
    };
  }

  if (edge === "sw") {
    return {
      x: crop.x + deltaX,
      y: crop.y,
      width: crop.width - deltaX,
      height: crop.height + deltaY,
    };
  }

  return {
    x: crop.x,
    y: crop.y,
    width: crop.width + deltaX,
    height: crop.height + deltaY,
  };
}
