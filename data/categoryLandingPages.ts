export type CategoryPageConfig = {
  slug: string;
  category: string;
  title: string;
  description: string;
  intro: string;
  why: string[];
  faqs: { question: string; answer: string }[];
  relatedToolSlugs?: string[];
};

export const categoryLandingPages: CategoryPageConfig[] = [
  {
    slug: "image-tools",
    category: "Image Tools",
    title: "Free Online Image Tools",
    description:
      "Convert, compress, resize, crop and edit images privately in your browser.",
    intro:
      "Work with JPG, PNG, WEBP and AVIF files using practical image converters and editors. Choose a tool below to prepare images for websites, documents and sharing.",
    why: [
      "Convert common image formats without installing desktop software.",
      "Edit and inspect images with browser-based tools that keep workflows quick.",
    ],
    faqs: [
      { question: "Which image formats are supported?", answer: "Available tools cover JPG, JPEG, PNG, WEBP and supported AVIF workflows." },
      { question: "Are images uploaded?", answer: "Image tools are designed to process files locally in your browser where supported." },
      { question: "Can I use these tools on mobile?", answer: "Yes. Modern mobile browsers can use the tools, although very large images may need more memory." },
    ],
  },
  {
    slug: "pdf-tools",
    category: "PDF Tools",
    title: "Free Online PDF Tools",
    description:
      "Merge, split, compress, organize, crop and edit PDF files in your browser.",
    intro:
      "Handle everyday PDF tasks without installing a desktop editor. Merge files, extract pages, organize documents and prepare PDFs for sharing.",
    why: [
      "Complete common PDF workflows from one straightforward directory.",
      "Process documents client-side where possible with clear output limitations.",
    ],
    faqs: [
      { question: "Can I merge and split PDFs here?", answer: "Yes. Dedicated tools support merging multiple PDFs and extracting selected page ranges." },
      { question: "Do PDF tools work with password-protected files?", answer: "Most tools require a standard unlocked PDF that the browser libraries can read." },
      { question: "Is PDF processing private?", answer: "The listed PDF tools process documents in your browser rather than requiring a server upload." },
    ],
  },
  {
    slug: "video-tools",
    category: "Video Tools",
    title: "Free Online Video Tools",
    description:
      "Inspect, optimize and extract useful content from video files in your browser.",
    intro:
      "Use browser-native video tools for metadata, thumbnails, audio extraction and lightweight optimization without installing editing software.",
    why: [
      "Quickly inspect video properties and capture useful frames.",
      "Use honest browser-native formats and outputs without fake server processing.",
    ],
    faqs: [
      { question: "Which video formats can I upload?", answer: "Supported inputs vary by tool and browser, with MP4, WEBM and some MOV files commonly accepted." },
      { question: "Why do some tools export WEBM or WAV?", answer: "Browsers reliably encode a limited set of formats, so each tool labels its real output honestly." },
      { question: "Are videos uploaded?", answer: "These tools use browser media APIs and process supported files on your device." },
    ],
  },
  {
    slug: "audio-tools",
    category: "Audio Tools",
    title: "Free Online Audio Tools",
    description:
      "Inspect, trim, convert and adjust audio files with browser-based tools.",
    intro:
      "Work with common audio files using Web Audio API tools for metadata, trimming, volume adjustment and WAV conversion.",
    why: [
      "Make quick audio changes without a full desktop audio editor.",
      "Receive clearly labelled WAV output when browser-native MP3 encoding is not dependable.",
    ],
    faqs: [
      { question: "Which audio formats are supported?", answer: "Tools accept combinations of MP3, WAV, OGG and M4A depending on browser decoding support." },
      { question: "Why is the download sometimes WAV?", answer: "WAV is the reliable client-side export format used when MP3 encoding would require a heavier dependency." },
      { question: "Does audio leave my device?", answer: "Audio decoding and processing run in your browser." },
    ],
  },
  {
    slug: "text-tools",
    category: "Text Tools",
    title: "AI Text Tools",
    description:
      "Generate, rewrite and summarize text with real AI using free limited generation or your own API key.",
    intro:
      "Create titles, emails, hashtags and summaries with Gemini or OpenAI. Use the limited free option when available, or bring your own provider key for more generations.",
    why: [
      "Use real AI generation with clear provider and model choices.",
      "Keep control of usage by choosing the free daily allowance or your own API account.",
    ],
    faqs: [
      { question: "Why do I need an API key?", answer: "You do not need one when free limited AI generation is available. For more usage, a Gemini or OpenAI API key connects the tool to your own provider account." },
      { question: "Does A2ZConvertor store my API key?", answer: "No database stores your key. It stays in memory unless you explicitly choose to save it in this browser's local storage." },
      { question: "Is free AI unlimited?", answer: "No. Free AI generations have a small daily limit to control service costs and may be disabled when production-safe capacity is unavailable." },
      { question: "Can I use my ChatGPT Plus subscription?", answer: "Not directly. ChatGPT subscriptions and OpenAI API billing are separate, so BYOK mode requires an OpenAI Platform API key." },
      { question: "How do I clear my saved key?", answer: "Open AI Provider Settings on any AI tool and select Clear saved AI settings." },
    ],
  },
  {
    slug: "social-media-tools",
    category: "Social Media Tools",
    title: "Free AI Social Media Tools",
    description:
      "Create captions, hashtags, titles, bios and content ideas with real Gemini or OpenAI generation.",
    intro:
      "Generate editable social content for creators, small businesses, students and marketers. Use free limited Gemini generation when available, or bring your own Gemini or OpenAI API key for more usage.",
    why: [
      "Generate tailored starting points with real AI rather than fixed templates.",
      "Choose a provider and refine every result for your audience, platform and brand voice.",
    ],
    faqs: [
      { question: "Why do I need an API key?", answer: "The free limited mode does not require your key when it is available. BYOK mode uses your own Gemini or OpenAI API account for additional generations." },
      { question: "Does A2ZConvertor store my API key?", answer: "No database stores your key. It is saved only in this browser when you explicitly select Remember my key on this browser." },
      { question: "Is free AI unlimited?", answer: "No. Free generation has a daily allowance to control costs and availability." },
      { question: "Can I use my ChatGPT Plus subscription?", answer: "No. ChatGPT Plus does not automatically include OpenAI API usage or an API key." },
      { question: "How do I clear my saved key?", answer: "Use Clear saved AI settings inside the provider panel on any AI generator." },
    ],
    relatedToolSlugs: [
      "meme-generator",
      "video-thumbnail-extractor",
      "resize-image",
      "hashtag-generator",
      "text-case-converter",
      "watermark-image",
    ],
  },];

export function getCategoryPage(slug: string) {
  return categoryLandingPages.find((page) => page.slug === slug);
}
