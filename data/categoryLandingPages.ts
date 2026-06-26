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
    title: "Free Online Text Tools",
    description:
      "Convert, clean and format everyday text in your browser.",
    intro:
      "Use fast browser-based text utilities for case changes and simple formatting, with AI creator tools linked separately when you need generation.",
    why: [
      "Use lightweight text utilities without creating an account.",
      "Keep generated AI drafts separate from simple text formatting tasks.",
    ],
    faqs: [
      { question: "What are Text Tools for?", answer: "Text Tools handle quick formatting tasks such as changing case, creating slugs and cleaning copy for reuse." },
      { question: "Do text utilities need an account?", answer: "No. The browser-based text utilities are free and do not require sign-up." },
      { question: "Where are AI writing tools listed?", answer: "Gemini-powered writing and creator tools are grouped on the AI Creator Tools page at /ai-tools." },
    ],
  },  {
    slug: "social-media-tools",
    category: "Social Media Tools",
    title: "Free Social Media Tools",
    description:
      "Find creator tools for captions, hashtags, video ideas, bios and social workflows.",
    intro:
      "Explore social media tools for creators, small businesses, students and marketers, with AI creator tools available on the dedicated AI page.",
    why: [
      "Use focused tools for social media planning, metadata and content creation workflows.",
      "Use AI Creator Tools when you want Gemini-generated captions, hooks and posts, then edit every draft for your audience.",
    ],
    faqs: [
      { question: "Do I need an API key?", answer: "No. A2ZConvertor uses its backend Gemini connection and does not ask users for provider keys." },
      { question: "Do I need an account?", answer: "No account is required for the free daily allowance." },
      { question: "Are Social Media Tools separate from AI Creator Tools?", answer: "Yes. Social Media Tools is a broader category, while /ai-tools focuses on Gemini-powered creator tools." },
      { question: "Where can I find AI creator tools?", answer: "Use the AI Creator Tools page for captions, hooks, bios, posts and other Gemini-powered drafts." },
      { question: "Do social tools guarantee growth?", answer: "No. They help with workflow and ideas, but reach and engagement depend on many outside factors." },
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
