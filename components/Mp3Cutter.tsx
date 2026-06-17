"use client";

import { useState } from "react";
import {
  audioBufferToWav,
  createSlicedAudioBuffer,
  decodeAudioFile,
  formatDuration,
  formatFileSize,
} from "@/components/mediaTools";

export default function Mp3Cutter() {
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputInfo, setOutputInfo] = useState<string | null>(null);
  const [isCutting, setIsCutting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setOutputInfo(null);
  }

  async function handleFile(selectedFile: File | null) {
    clearOutput();
    setError(null);
    setDuration(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isMp3 =
      selectedFile.type === "audio/mpeg" || /\.mp3$/i.test(selectedFile.name);

    if (!isMp3) {
      setFile(null);
      setError("Please upload an MP3 file.");
      return;
    }

    setFile(selectedFile);

    try {
      const audioBuffer = await decodeAudioFile(selectedFile);
      setDuration(audioBuffer.duration);
      setEndTime(audioBuffer.duration.toFixed(1));
    } catch (loadError) {
      console.error(loadError);
      setError("Could not read this MP3 in your browser.");
    }
  }

  async function cutAudio() {
    if (!file) {
      setError("Please upload an MP3 file first.");
      return;
    }

    const start = Number(startTime);
    const end = Number(endTime);

    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
      setError("Enter a valid start time and end time in seconds.");
      return;
    }

    try {
      setIsCutting(true);
      setError(null);
      clearOutput();

      const audioBuffer = await decodeAudioFile(file);
      const clippedEnd = Math.min(end, audioBuffer.duration);
      const slicedBuffer = createSlicedAudioBuffer(audioBuffer, start, clippedEnd);
      const wavBuffer = audioBufferToWav(slicedBuffer);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });

      setOutputUrl(URL.createObjectURL(blob));
      setOutputInfo(
        `${formatDuration(slicedBuffer.duration)} trimmed WAV, ${formatFileSize(
          blob.size
        )}`
      );
    } catch (cutError) {
      console.error(cutError);
      setError("Could not trim this MP3 in your browser.");
    } finally {
      setIsCutting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">MP3 Cutter</h1>
      <p className="mb-4 text-slate-400">
        Trim an MP3 by start and end time using browser audio decoding.
      </p>
      <p className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        Precise MP3 stream cutting without re-encoding is not available through
        browser APIs. This tool exports the trimmed selection as WAV.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="audio/mpeg,.mp3"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            {file.name} · {formatFileSize(file.size)}
            {duration ? ` · ${formatDuration(duration)}` : ""}
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
              End time (seconds)
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={endTime}
              onChange={(event) => {
                setEndTime(event.target.value);
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
          onClick={cutAudio}
          disabled={!file || isCutting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCutting ? "Trimming Audio..." : "Trim and Export WAV"}
        </button>

        {outputUrl && (
          <div className="space-y-3">
            {outputInfo && <p className="text-sm text-slate-400">{outputInfo}</p>}
            <a
              href={outputUrl}
              download="trimmed-audio.wav"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download Trimmed WAV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
