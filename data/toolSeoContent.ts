type ToolSeoContext = {
  slug: string;
  title: string;
  description: string;
  inputLabel: string;
  outputFormat: string;
  outputLabel: string;
  category: string;
};

type HowToStep = {
  title: string;
  description: string;
};

type ToolSeoContent = {
  howToSteps: HowToStep[];
  whyUse: string[];
};

const customSeoContent: Record<string, Partial<ToolSeoContent>> = {
  "video-metadata": {
    howToSteps: [
      {
        title: "Upload video",
        description: "Choose an MP4, WEBM or MOV file from your device.",
      },
      {
        title: "Read metadata",
        description:
          "Your browser reads the video duration, file size and resolution.",
      },
      {
        title: "Review details",
        description:
          "Check the file name, duration, width, height and resolution on the page.",
      },
    ],
  },
  "audio-metadata": {
    howToSteps: [
      {
        title: "Upload audio",
        description: "Choose an MP3, WAV, OGG or M4A file from your device.",
      },
      {
        title: "Read metadata",
        description: "Your browser reads the audio duration and file size.",
      },
      {
        title: "Review details",
        description: "Check the file name, file size and duration on the page.",
      },
    ],
  },
  "video-to-gif": {
    whyUse: [
      "Create a short animated WebM preview from a longer video without installing desktop software.",
      "The page is honest about output format: it does not claim GIF export when browser-native GIF encoding is not available.",
    ],
  },
  "mp4-to-mp3": {
    whyUse: [
      "Extract supported MP4 audio in your browser and download it as WAV.",
      "The tool does not fake MP3 output because reliable browser-native MP3 encoding requires a heavier encoder.",
    ],
  },
  "mp3-cutter": {
    whyUse: [
      "Trim audio by start and end time without installing desktop software.",
      "The selected audio is exported as WAV because precise MP3 stream cutting is not available through standard browser APIs.",
    ],
  },
  "compress-video": {
    whyUse: [
      "Try browser-native WebM optimization for MP4 or WEBM videos and compare real output size.",
      "The tool reports accurate size results and tells you when the selected quality does not reduce the file.",
    ],
  },
};

export function getToolSeoContent(tool: ToolSeoContext): ToolSeoContent {
  const custom = customSeoContent[tool.slug] ?? {};

  return {
    howToSteps: custom.howToSteps ?? getFallbackHowToSteps(tool),
    whyUse: custom.whyUse ?? getFallbackWhyUse(tool),
  };
}

function getFallbackHowToSteps(tool: ToolSeoContext): HowToStep[] {
  const isMetadata = tool.outputFormat === "metadata";

  return [
    {
      title: `Upload ${tool.inputLabel}`,
      description: `Choose your ${tool.inputLabel} file from your device.`,
    },
    {
      title: isMetadata ? "View details" : "Process file",
      description: isMetadata
        ? `A2ZConvertor reads the ${tool.inputLabel} details in your browser where possible.`
        : `A2ZConvertor processes the file in your browser where possible.`,
    },
    {
      title: isMetadata ? "Review metadata" : `Download ${tool.outputLabel}`,
      description: isMetadata
        ? `Review the available ${tool.outputLabel} details on the page.`
        : `Download the finished ${tool.outputLabel} file when processing is complete.`,
    },
  ];
}

function getFallbackWhyUse(tool: ToolSeoContext): string[] {
  const isMetadata = tool.outputFormat === "metadata";

  if (isMetadata) {
    return [
      `${tool.title} helps you inspect ${tool.inputLabel} details quickly without installing extra software.`,
      "Files are handled in your browser where possible, keeping the workflow simple and private.",
    ];
  }

  return [
    `${tool.title} helps you work with ${tool.inputLabel} files and create ${tool.outputLabel} output from one simple page.`,
    "The workflow is designed for fast browser-based file tasks without account registration.",
  ];
}
