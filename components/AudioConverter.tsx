"use client";

import { useState } from "react";
import {
  audioBufferToWav,
  decodeAudioFile,
  formatDuration,
  formatFileSize,
} from "@/components/mediaTools";

export default function AudioConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputInfo, setOutputInfo] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
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

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isAudio =
      ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/x-m4a"].includes(
        selectedFile.type
      ) || /\.(mp3|wav|ogg|m4a)$/i.test(selectedFile.name);

    if (!isAudio) {
      setFile(null);
      setError("Please upload an MP3, WAV, OGG or M4A audio file.");
      return;
    }

    setFile(selectedFile);
  }

  async function convertToWav() {
    if (!file) {
      setError("Please upload an audio file first.");
      return;
    }

    try {
      setIsConverting(true);
      setError(null);
      clearOutput();

      const audioBuffer = await decodeAudioFile(file);
      const wavBuffer = audioBufferToWav(audioBuffer);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });

      setOutputUrl(URL.createObjectURL(blob));
      setOutputInfo(
        `${formatDuration(audioBuffer.duration)} WAV, ${formatFileSize(blob.size)}`
      );
    } catch (convertError) {
      console.error(convertError);
      setError("Could not convert this audio file to WAV in your browser.");
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Convert Audio to WAV</h1>
      <p className="mb-8 text-slate-400">
        Upload MP3, WAV, OGG or M4A and convert it to a WAV file in your
        browser.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="audio/mpeg,audio/wav,audio/ogg,audio/mp4,.mp3,.wav,.ogg,.m4a"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            {file.name} · {formatFileSize(file.size)}
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={convertToWav}
          disabled={!file || isConverting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isConverting ? "Converting Audio..." : "Convert to WAV"}
        </button>

        {outputUrl && (
          <div className="space-y-3">
            {outputInfo && <p className="text-sm text-slate-400">{outputInfo}</p>}
            <a
              href={outputUrl}
              download="converted-audio.wav"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download WAV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
