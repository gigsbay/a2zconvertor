# Video Trim / Cut Feasibility

## Decision

Do not ship `trim-video` as an active tool yet.

The current dependency set can preview uploaded MP4 or WEBM files in the
browser, but it cannot reliably export a precise trimmed video while preserving
audio, codecs, timestamps and the original container without adding a heavier
media processing dependency.

## Research Notes

- `HTMLVideoElement` can load and preview local videos, but it does not expose a
  native "save this selected time range" API.
- `MediaRecorder` records a `MediaStream` and lets the browser choose supported
  containers and codecs. It is useful for recording streams, but it is not a
  precise video file trimming or remuxing API.
- `HTMLMediaElement.captureStream()` can capture playback into a stream in some
  browsers, but recording that stream would re-record playback rather than
  perform an accurate trim of the original file.
- `WebCodecs` exposes low-level encoding and decoding primitives, but it does
  not provide container muxing by itself. A shippable video trimmer would still
  need muxing logic and careful audio/video synchronization.
- Client-side ffmpeg/WASM could implement trimming, but it would add a large
  dependency and more launch risk than this site should take right now.

Primary references:

- MDN MediaRecorder: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
- MDN HTMLMediaElement.captureStream(): https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream
- MDN WebCodecs API: https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API

## Launch Recommendation

Keep `trim-video` out of `data/tools.ts`, `ToolRenderer` and `toolFaqs.ts` until
the site is ready to add a tested media processing stack.

If this tool is prioritized after launch, evaluate one of these paths:

1. Use ffmpeg/WASM with clear loading and file-size limits.
2. Add a dedicated browser muxing pipeline for WEBM first, with honest WEBM-only
   output.
3. Use a server-side job model later if large files or broad MP4 compatibility
   become important.

