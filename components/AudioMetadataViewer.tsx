"use client";

import { useState } from "react";
import { formatDuration, formatFileSize } from "@/components/mediaTools";

type AudioMetadata = {
  name: string;
  size: string;
  duration: string;
};

export default function AudioMetadataViewer() {
  const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | null) {
    setMetadata(null);
    setError(null);

    if (!file) {
      return;
    }

    const isAudio =
      ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/x-m4a"].includes(
        file.type
      ) || /\.(mp3|wav|ogg|m4a)$/i.test(file.name);

    if (!isAudio) {
      setError("Please upload an MP3, WAV, OGG or M4A audio file.");
      return;
    }

    const audio = document.createElement("audio");
    const objectUrl = URL.createObjectURL(file);

    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      setMetadata({
        name: file.name,
        size: formatFileSize(file.size),
        duration: formatDuration(audio.duration),
      });
      URL.revokeObjectURL(objectUrl);
    };
    audio.onerror = () => {
      setError("Could not read this audio file's metadata in your browser.");
      URL.revokeObjectURL(objectUrl);
    };
    audio.src = objectUrl;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Audio Metadata Viewer</h1>
      <p className="mb-8 text-slate-400">
        Inspect audio file details using your browser audio APIs.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="audio/mpeg,audio/wav,audio/ogg,audio/mp4,.mp3,.wav,.ogg,.m4a"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {metadata && (
          <div className="grid gap-4 md:grid-cols-3">
            <MetadataCard label="File name" value={metadata.name} />
            <MetadataCard label="File size" value={metadata.size} />
            <MetadataCard label="Duration" value={metadata.duration} />
          </div>
        )}
      </div>
    </div>
  );
}

function MetadataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="mb-1 text-sm text-slate-500">{label}</p>
      <p className="break-words font-semibold text-white">{value}</p>
    </div>
  );
}
