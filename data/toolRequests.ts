export type ToolRequestStatus = "Planned" | "Under Review" | "Building";

export const toolRequestCategories = [
  "Image Tools",
  "PDF Tools",
  "Video Tools",
  "Audio Tools",
  "Text Tools",
] as const;

export type ToolRequest = {
  id: string;
  name: string;
  category: (typeof toolRequestCategories)[number];
  description: string;
  status: ToolRequestStatus;
};

export const plannedToolRequests: ToolRequest[] = [
  { id: "heic-converter", name: "HEIC Converter", category: "Image Tools", description: "Convert modern HEIC photos to widely supported JPG or PNG files.", status: "Under Review" },
  { id: "image-collage-maker", name: "Image Collage Maker", category: "Image Tools", description: "Arrange several images into a downloadable collage layout.", status: "Planned" },
  { id: "pdf-to-word", name: "PDF to Editable Word", category: "PDF Tools", description: "Explore an honest text-first DOCX export for suitable PDFs.", status: "Under Review" },
  { id: "ocr-searchable-pdf", name: "OCR Searchable PDF", category: "PDF Tools", description: "Recognize printed text in scanned pages and add a searchable layer.", status: "Planned" },
  { id: "trim-video", name: "Trim Video", category: "Video Tools", description: "Select a start and end time and export a shortened video.", status: "Building" },
  { id: "crop-video", name: "Crop Video", category: "Video Tools", description: "Visually select a video crop area and export the result.", status: "Under Review" },
  { id: "audio-joiner", name: "Audio Joiner", category: "Audio Tools", description: "Combine multiple compatible audio files into one WAV download.", status: "Planned" },
  { id: "audio-speed-changer", name: "Audio Speed Changer", category: "Audio Tools", description: "Adjust playback speed and export processed audio in the browser.", status: "Building" },
  { id: "word-counter", name: "Word and Reading Time Counter", category: "Text Tools", description: "Count words, characters, sentences and estimated reading time.", status: "Planned" },
  { id: "markdown-cleaner", name: "Markdown Cleaner", category: "Text Tools", description: "Normalize pasted Markdown spacing, headings and list formatting.", status: "Under Review" },
];
