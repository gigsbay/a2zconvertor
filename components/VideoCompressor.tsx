"use client";

import { useState } from "react";
import { formatFileSize } from "@/components/mediaTools";

export default function VideoCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setCompressedSize(null);
  }

  function handleFile(selectedFile: File | null) {
    clearOutput();
    setError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isVideo =
      ["video/mp4", "video/webm"].includes(selectedFile.type) ||
      /\.(mp4|webm)$/i.test(selectedFile.name);

    if (!isVideo) {
      setFile(null);
      setError("Please upload an MP4 or WEBM video file.");
      return;
    }

    setFile(selectedFile);
  }

  async function compressVideo() {
    if (!file) {
      setError("Please upload a video first.");
      return;
    }

    if (!window.MediaRecorder) {
      setError("This browser does not support MediaRecorder video export.");
      return;
    }

    try {
      setIsCompressing(true);
      setError(null);
      clearOutput();

      const outputBlob = await recompressVideoToWebm(file, quality / 100);
      setCompressedSize(outputBlob.size);
      setOutputUrl(URL.createObjectURL(outputBlob));
    } catch (compressError) {
      console.error(compressError);
      setError("Could not optimize this video in your browser.");
    } finally {
      setIsCompressing(false);
    }
  }

  const savedPercent =
    file && compressedSize
      ? Math.round(((file.size - compressedSize) / file.size) * 100)
      : null;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Video Optimizer</h1>
      <p className="mb-4 text-slate-400">
        Recompress MP4 or WEBM video to a browser-native WebM file.
      </p>
      <p className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        Browser APIs do not reliably create optimized MP4 files without a heavy
        encoder. This tool records the video frames to WebM and shows the real
        output size. Audio may not be preserved.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="video/mp4,video/webm,.mp4,.webm"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            <p className="break-words font-semibold text-white">{file.name}</p>
            <p className="mt-1 text-slate-500">Original: {formatFileSize(file.size)}</p>
          </div>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-300">
            Quality: {quality}%
          </span>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(event) => {
              setQuality(Number(event.target.value));
              clearOutput();
            }}
            className="w-full"
          />
        </label>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={compressVideo}
          disabled={!file || isCompressing}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCompressing ? "Optimizing Video..." : "Optimize to WebM"}
        </button>

        {outputUrl && compressedSize !== null && file && (
          <div className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-3">
              <p>Original: {formatFileSize(file.size)}</p>
              <p>Output: {formatFileSize(compressedSize)}</p>
              <p>Saved: {savedPercent}%</p>
            </div>

            {savedPercent !== null && savedPercent <= 0 && (
              <p className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-100">
                This video could not be reduced at the selected quality. The
                output is larger than the original.
              </p>
            )}

            <a
              href={outputUrl}
              download="optimized-video.webm"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download WebM Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

async function recompressVideoToWebm(file: File, quality: number) {
  const video = document.createElement("video");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not available.");
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    video.muted = true;
    video.playsInline = true;
    video.src = objectUrl;
    await waitForMetadata(video);

    const scale = Math.max(0.35, quality);
    canvas.width = Math.max(2, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(2, Math.round(video.videoHeight * scale));

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const stream = canvas.captureStream(24);
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: Math.round(200000 + quality * 2200000),
    });
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    const stopped = new Promise<Blob>((resolve) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
    });

    const drawFrame = () => {
      if (!video.paused && !video.ended) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      }
    };

    recorder.start();
    await video.play();
    drawFrame();

    await new Promise<void>((resolve) => {
      video.onended = () => resolve();
    });

    recorder.stop();
    return await stopped;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function waitForMetadata(video: HTMLVideoElement) {
  return new Promise<void>((resolve, reject) => {
    video.onloadedmetadata = () => resolve();
    video.onerror = () => reject(new Error("Could not load video metadata."));
  });
}
