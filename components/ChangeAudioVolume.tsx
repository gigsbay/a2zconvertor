"use client";

import { useState } from "react";
import {
  audioBufferToWav,
  decodeAudioFile,
  formatDuration,
  formatFileSize,
} from "@/components/mediaTools";

export default function ChangeAudioVolume() {
  const [file, setFile] = useState<File | null>(null);
  const [volume, setVolume] = useState(100);
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

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isAudio =
      ["audio/mpeg", "audio/wav", "audio/ogg"].includes(selectedFile.type) ||
      /\.(mp3|wav|ogg)$/i.test(selectedFile.name);

    if (!isAudio) {
      setFile(null);
      setError("Please upload an MP3, WAV or OGG audio file.");
      return;
    }

    setFile(selectedFile);
  }

  async function adjustVolume() {
    if (!file) {
      setError("Please upload an audio file first.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      clearOutput();

      const sourceBuffer = await decodeAudioFile(file);
      const outputBuffer = new AudioBuffer({
        length: sourceBuffer.length,
        numberOfChannels: sourceBuffer.numberOfChannels,
        sampleRate: sourceBuffer.sampleRate,
      });
      const multiplier = volume / 100;

      for (let channel = 0; channel < sourceBuffer.numberOfChannels; channel += 1) {
        const input = sourceBuffer.getChannelData(channel);
        const output = outputBuffer.getChannelData(channel);

        for (let index = 0; index < input.length; index += 1) {
          output[index] = Math.max(-1, Math.min(1, input[index] * multiplier));
        }
      }

      const wavBuffer = audioBufferToWav(outputBuffer);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });

      setOutputUrl(URL.createObjectURL(blob));
      setOutputInfo(
        `${formatDuration(outputBuffer.duration)} adjusted WAV, ${formatFileSize(
          blob.size
        )}`
      );
    } catch (volumeError) {
      console.error(volumeError);
      setError("Could not adjust this audio file in your browser.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Change Audio Volume</h1>
      <p className="mb-4 text-slate-400">
        Increase or reduce audio volume with the Web Audio API.
      </p>
      <p className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        Browser-native MP3 output is not reliable without a heavier encoder.
        This tool exports adjusted audio as WAV.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="audio/mpeg,audio/wav,audio/ogg,.mp3,.wav,.ogg"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {file && (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            {file.name} · {formatFileSize(file.size)}
          </p>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-300">
            Volume: {volume}%
          </span>
          <input
            type="range"
            min="10"
            max="200"
            value={volume}
            onChange={(event) => {
              setVolume(Number(event.target.value));
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
          onClick={adjustVolume}
          disabled={!file || isProcessing}
          className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? "Adjusting Audio..." : "Export Adjusted WAV"}
        </button>

        {outputUrl && (
          <div className="space-y-3">
            {outputInfo && <p className="text-sm text-slate-400">{outputInfo}</p>}
            <a
              href={outputUrl}
              download="volume-adjusted.wav"
              className="block w-full rounded-xl bg-green-500 px-6 py-3 text-center font-semibold text-black"
            >
              Download Adjusted WAV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
