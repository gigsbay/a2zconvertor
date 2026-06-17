"use client";

import { useRef, useState } from "react";

type OutputFormat = "png" | "jpg";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(0.1, bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export default function VideoThumbnailExtractor() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [format, setFormat] = useState<OutputFormat>("png");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailSize, setThumbnailSize] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function clearThumbnail() {
    setThumbnailUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setThumbnailSize(null);
    setProgress(0);
  }

  function handleFile(selectedFile: File | null) {
    clearThumbnail();
    setError(null);
    setDuration(0);
    setTimestamp(0);
    setVideoUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const supported =
      selectedFile.type === "video/mp4" ||
      selectedFile.type === "video/webm" ||
      selectedFile.type === "video/quicktime" ||
      /\.(mp4|webm|mov)$/i.test(selectedFile.name);

    if (!supported) {
      setFile(null);
      setError("Please upload an MP4, WEBM or MOV video.");
      return;
    }

    setFile(selectedFile);
    setVideoUrl(URL.createObjectURL(selectedFile));
  }

  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (!video) return;

    const safeDuration = Number.isFinite(video.duration) ? video.duration : 0;
    setDuration(safeDuration);
    setTimestamp(Math.min(1, safeDuration));
  }

  async function captureThumbnail() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !file) {
      setError("Please upload a video first.");
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      setError("The video metadata is not ready yet. Try again in a moment.");
      return;
    }

    try {
      setIsCapturing(true);
      setError(null);
      clearThumbnail();
      setProgress(20);

      const targetTime = Math.min(Math.max(timestamp, 0), duration || timestamp);

      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        await new Promise<void>((resolve, reject) => {
          const handleSeeked = () => {
            cleanup();
            resolve();
          };
          const handleError = () => {
            cleanup();
            reject(new Error("Could not seek to that timestamp in this video."));
          };
          const cleanup = () => {
            video.removeEventListener("seeked", handleSeeked);
            video.removeEventListener("error", handleError);
          };

          video.addEventListener("seeked", handleSeeked, { once: true });
          video.addEventListener("error", handleError, { once: true });
          video.currentTime = targetTime;
        });
      }

      setProgress(60);

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas is not available in this browser.");
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const mimeType = format === "png" ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) resolve(result);
            else reject(new Error("Could not create a thumbnail image."));
          },
          mimeType,
          format === "jpg" ? 0.92 : undefined
        );
      });

      setProgress(100);
      setThumbnailSize(blob.size);
      setThumbnailUrl(URL.createObjectURL(blob));
    } catch (captureError) {
      console.error(captureError);
      setError(
        captureError instanceof Error
          ? captureError.message
          : "Could not extract a thumbnail from this video."
      );
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Video Thumbnail Extractor</h1>
      <p className="mb-8 text-slate-400">
        Pick a frame from an MP4, WEBM or MOV video and download it as a PNG or
        JPG image. Everything runs in your browser.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300 sm:grid-cols-2">
            <div>
              <p className="text-slate-500">File</p>
              <p className="break-words font-semibold text-white">{file.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Size</p>
              <p className="font-semibold text-white">{formatFileSize(file.size)}</p>
            </div>
          </div>
        )}

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className="max-h-[520px] w-full rounded-2xl border border-white/10 bg-black"
          />
        )}

        {duration > 0 && (
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_160px]">
            <label className="space-y-2 text-sm font-semibold text-slate-300">
              Timestamp: {formatDuration(timestamp)} of {formatDuration(duration)}
              <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={timestamp}
                onChange={(event) => {
                  clearThumbnail();
                  setTimestamp(Number(event.target.value));
                }}
                className="w-full accent-green-400"
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-300">
              Output
              <select
                value={format}
                onChange={(event) => {
                  clearThumbnail();
                  setFormat(event.target.value as OutputFormat);
                }}
                className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </label>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={captureThumbnail}
          disabled={!file || !duration || isCapturing}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCapturing ? `Extracting thumbnail ${progress}%` : "Extract thumbnail"}
        </button>

        <canvas ref={canvasRef} className="hidden" />

        {thumbnailUrl && (
          <div className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-slate-400">
              Thumbnail ready
              {thumbnailSize !== null ? ` (${formatFileSize(thumbnailSize)})` : ""}
            </p>
            <a
              href={thumbnailUrl}
              download={`video-thumbnail.${format}`}
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download {format.toUpperCase()} thumbnail
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
