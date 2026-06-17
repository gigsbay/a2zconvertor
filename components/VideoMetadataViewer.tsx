"use client";

import { useState } from "react";
import { formatDuration, formatFileSize } from "@/components/mediaTools";

type VideoMetadata = {
  name: string;
  size: string;
  duration: string;
  resolution: string;
  width: number;
  height: number;
};

export default function VideoMetadataViewer() {
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | null) {
    setMetadata(null);
    setError(null);

    if (!file) {
      return;
    }

    const isVideo =
      ["video/mp4", "video/webm", "video/quicktime"].includes(file.type) ||
      /\.(mp4|webm|mov)$/i.test(file.name);

    if (!isVideo) {
      setError("Please upload an MP4, WEBM or MOV video file.");
      return;
    }

    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);

    video.preload = "metadata";
    video.onloadedmetadata = () => {
      setMetadata({
        name: file.name,
        size: formatFileSize(file.size),
        duration: formatDuration(video.duration),
        resolution: `${video.videoWidth} x ${video.videoHeight}`,
        width: video.videoWidth,
        height: video.videoHeight,
      });
      URL.revokeObjectURL(objectUrl);
    };
    video.onerror = () => {
      setError("Could not read this video's metadata in your browser.");
      URL.revokeObjectURL(objectUrl);
    };
    video.src = objectUrl;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Video Metadata Viewer</h1>
      <p className="mb-8 text-slate-400">
        Inspect MP4, WEBM or MOV file details using your browser video APIs.
      </p>

      <div className="space-y-6">
        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
        />

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        {metadata && (
          <div className="grid gap-4 md:grid-cols-2">
            <MetadataCard label="File name" value={metadata.name} />
            <MetadataCard label="File size" value={metadata.size} />
            <MetadataCard label="Duration" value={metadata.duration} />
            <MetadataCard label="Resolution" value={metadata.resolution} />
            <MetadataCard label="Video width" value={`${metadata.width}px`} />
            <MetadataCard label="Video height" value={`${metadata.height}px`} />
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
