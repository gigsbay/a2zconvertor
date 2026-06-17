"use client";

import { useState } from "react";
import {
  audioBufferToWav,
  decodeAudioFile,
  formatDuration,
  formatFileSize,
} from "@/components/mediaTools";
import ProcessingProgress from "@/components/ProcessingProgress";

export default function Mp4ToAudio() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [audioInfo, setAudioInfo] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  function clearOutput() {
    setOutputUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setAudioInfo(null);
    setProgress(0);
    setProgressLabel("");
  }

  function handleFile(selectedFile: File | null) {
    clearOutput();
    setError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isMp4 =
      selectedFile.type === "video/mp4" || /\.mp4$/i.test(selectedFile.name);

    if (!isMp4) {
      setFile(null);
      setError("Please upload an MP4 video file.");
      return;
    }

    setFile(selectedFile);
  }

  async function extractAudio() {
    if (!file) {
      setError("Please upload an MP4 video first.");
      return;
    }

    try {
      setIsExtracting(true);
      setError(null);
      clearOutput();
      setProgress(15);
      setProgressLabel("Decoding MP4 audio");

      const audioBuffer = await decodeAudioFile(file);
      setProgress(75);
      setProgressLabel("Encoding WAV");
      const wavBuffer = audioBufferToWav(audioBuffer);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });

      setOutputUrl(URL.createObjectURL(blob));
      setAudioInfo(
        `${formatDuration(audioBuffer.duration)} WAV audio, ${formatFileSize(
          blob.size
        )}`
      );
      setProgress(100);
    } catch (extractError) {
      console.error(extractError);
      setError(
        "Could not extract audio from this MP4 in your browser. This tool exports WAV because browser-native MP3 encoding is not available without a heavier encoder."
      );
    } finally {
      setIsExtracting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Extract Audio from MP4</h1>
      <p className="mb-4 text-slate-400">
        Extract the audio track from an MP4 video in your browser.
      </p>
      <p className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        Browser APIs can decode supported MP4 audio, but they do not reliably
        encode MP3 without a heavy encoder. This tool downloads WAV audio.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="video/mp4,.mp4"
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

        {isExtracting && (
          <ProcessingProgress label={progressLabel} value={progress} />
        )}

        <button
          type="button"
          onClick={extractAudio}
          disabled={!file || isExtracting}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isExtracting ? "Extracting Audio..." : "Extract WAV Audio"}
        </button>

        {outputUrl && (
          <div className="space-y-3">
            {audioInfo && <p className="text-sm text-slate-400">{audioInfo}</p>}
            <a
              href={outputUrl}
              download="extracted-audio.wav"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download WAV Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
