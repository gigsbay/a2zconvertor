export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(0.1, bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "Unknown";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export async function decodeAudioFile(file: File) {
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextClass) {
    throw new Error("This browser does not support the Web Audio API.");
  }

  const audioContext = new AudioContextClass();

  try {
    const audioBuffer = await audioContext.decodeAudioData(
      await file.arrayBuffer()
    );
    return audioBuffer;
  } finally {
    await audioContext.close();
  }
}

export function audioBufferToWav(audioBuffer: AudioBuffer) {
  const channelCount = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const samples = audioBuffer.length;
  const bytesPerSample = 2;
  const blockAlign = channelCount * bytesPerSample;
  const wavBuffer = new ArrayBuffer(44 + samples * blockAlign);
  const view = new DataView(wavBuffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples * blockAlign, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channelCount, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bytesPerSample * 8, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples * blockAlign, true);

  let offset = 44;
  const channels = Array.from({ length: channelCount }, (_, index) =>
    audioBuffer.getChannelData(index)
  );

  for (let sample = 0; sample < samples; sample += 1) {
    for (let channel = 0; channel < channelCount; channel += 1) {
      const clampedSample = Math.max(-1, Math.min(1, channels[channel][sample]));
      const pcmSample =
        clampedSample < 0 ? clampedSample * 0x8000 : clampedSample * 0x7fff;
      view.setInt16(offset, pcmSample, true);
      offset += bytesPerSample;
    }
  }

  return wavBuffer;
}

export function createSlicedAudioBuffer(
  sourceBuffer: AudioBuffer,
  startSeconds: number,
  endSeconds: number
) {
  const startSample = Math.max(
    0,
    Math.floor(startSeconds * sourceBuffer.sampleRate)
  );
  const endSample = Math.min(
    sourceBuffer.length,
    Math.ceil(endSeconds * sourceBuffer.sampleRate)
  );
  const frameCount = Math.max(0, endSample - startSample);

  const outputBuffer = new AudioBuffer({
    length: frameCount,
    numberOfChannels: sourceBuffer.numberOfChannels,
    sampleRate: sourceBuffer.sampleRate,
  });

  for (let channel = 0; channel < sourceBuffer.numberOfChannels; channel += 1) {
    const sourceData = sourceBuffer
      .getChannelData(channel)
      .slice(startSample, endSample);
    outputBuffer.copyToChannel(sourceData, channel);
  }

  return outputBuffer;
}

function writeString(view: DataView, offset: number, value: string) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}
