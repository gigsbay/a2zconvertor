"use client";

import { useState } from "react";
import { formatDuration, formatFileSize } from "@/components/mediaTools";

export default function VideoToGif() {
  const [file, setFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState("0");
  const [duration, setDuration] = useState("3");
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputInfo, setOutputInfo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setOutputInfo(null);
  }

  function handleFile(selectedFile: File | null) {
    clearOutput();
    setError(null);
    setVideoDuration(null);

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

    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(selectedFile);

    video.preload = "metadata";
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      URL.revokeObjectURL(objectUrl);
    };
    video.onerror = () => {
      setError("Could not read this video's metadata in your browser.");
      URL.revokeObjectURL(objectUrl);
    };
    video.src = objectUrl;
  }

  async function createAnimatedWebm() {
    if (!file) {
      setError("Please upload a video first.");
      return;
    }

    if (!window.MediaRecorder) {
      setError("This browser does not support MediaRecorder video export.");
      return;
    }

    const start = Number(startTime);
    const clipDuration = Number(duration);

    if (
      !Number.isFinite(start) ||
      !Number.isFinite(clipDuration) ||
      start < 0 ||
      clipDuration <= 0
    ) {
      setError("Enter a valid start time and duration in seconds.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      clearOutput();

      const blob = await recordVideoToWebm(file, start, clipDuration, 0.8);
      setOutputUrl(URL.createObjectURL(blob));
      setOutputInfo(`${formatDuration(clipDuration)} animated WebM, ${formatFileSize(blob.size)}`);
    } catch (processError) {
      console.error(processError);
      setError("Could not create an animated WebM from this video in your browser.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Video to Animated WebM</h1>
      <p className="mb-4 text-slate-400">
        Create a short animated WebM clip from MP4 or WEBM video.
      </p>
      <p className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        True GIF generation requires a dedicated encoder and can be heavy in the
        browser. This MVP uses browser-native video recording and downloads WebM
        instead of falsely claiming GIF output.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="video/mp4,video/webm,.mp4,.webm"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            {file.name} · {formatFileSize(file.size)}
            {videoDuration ? ` · ${formatDuration(videoDuration)}` : ""}
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Start time (seconds)
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={startTime}
              onChange={(event) => {
                setStartTime(event.target.value);
                clearOutput();
              }}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Duration (seconds)
            </span>
            <input
              type="number"
              min="0.5"
              max="10"
              step="0.5"
              value={duration}
              onChange={(event) => {
                setDuration(event.target.value);
                clearOutput();
              }}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-blue-500"
            />
          </label>
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={createAnimatedWebm}
          disabled={!file || isProcessing}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? "Creating Clip..." : "Create Animated WebM"}
        </button>

        {outputUrl && (
          <div className="space-y-3">
            {outputInfo && <p className="text-sm text-slate-400">{outputInfo}</p>}
            <a
              href={outputUrl}
              download="animated-clip.webm"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download Animated WebM
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

async function recordVideoToWebm(
  file: File,
  startSeconds: number,
  durationSeconds: number,
  quality: number
) {
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

    video.currentTime = Math.min(startSeconds, Math.max(0, video.duration - 0.1));
    await waitForSeek(video);

    const maxWidth = 640;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    canvas.width = Math.max(2, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(2, Math.round(video.videoHeight * scale));

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const stream = canvas.captureStream(12);
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: Math.round(250000 + quality * 1200000),
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
    await new Promise((resolve) => setTimeout(resolve, durationSeconds * 1000));
    video.pause();
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

function waitForSeek(video: HTMLVideoElement) {
  return new Promise<void>((resolve) => {
    video.onseeked = () => resolve();
  });
}
