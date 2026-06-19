export type ComparisonPage = {
  slug: string;
  left: string;
  right: string;
  title: string;
  description: string;
  explanation: string;
  rows: { feature: string; left: string; right: string }[];
  recommendation: string[];
  toolSlugs: string[];
  faqs: { question: string; answer: string }[];
};

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "jpg-vs-png",
    left: "JPG",
    right: "PNG",
    title: "JPG vs PNG: Which Image Format Should You Use?",
    description: "Compare JPG and PNG for quality, transparency, file size and common web uses.",
    explanation: "JPG and PNG are both widely supported, but they solve different image problems. JPG is designed for compact photographs, while PNG preserves crisp edges and transparency.",
    rows: [
      { feature: "Best for", left: "Photos and complex colour gradients", right: "Logos, screenshots and graphics" },
      { feature: "Compression", left: "Lossy", right: "Lossless" },
      { feature: "Transparency", left: "No", right: "Yes" },
      { feature: "Typical size", left: "Smaller for photos", right: "Larger for photos, efficient for simple graphics" },
    ],
    recommendation: ["Choose JPG when a smaller photographic image matters most.", "Choose PNG when you need transparency, sharp text or repeated editing without lossy recompression."],
    toolSlugs: ["jpg-to-png", "png-to-jpg", "compress-image"],
    faqs: [
      { question: "Is PNG always higher quality than JPG?", answer: "PNG avoids lossy compression, but converting an existing JPG to PNG cannot restore detail already lost." },
      { question: "Which is better for websites?", answer: "JPG is often efficient for photographs; PNG is better for transparent or sharp-edged graphics." },
      { question: "Can JPG have transparency?", answer: "No. Use PNG or WEBP when transparent pixels are required." },
    ],
  },
  {
    slug: "png-vs-webp",
    left: "PNG",
    right: "WEBP",
    title: "PNG vs WEBP: Quality, Size and Transparency",
    description: "Compare PNG and WEBP for websites, transparency, compatibility and compression.",
    explanation: "PNG is a dependable lossless format, while WEBP offers modern lossy and lossless compression that can reduce website image size.",
    rows: [
      { feature: "Compression", left: "Lossless", right: "Lossy or lossless" },
      { feature: "Transparency", left: "Yes", right: "Yes" },
      { feature: "Animation", left: "Not standard PNG", right: "Supported" },
      { feature: "Typical web size", left: "Often larger", right: "Often smaller" },
    ],
    recommendation: ["Choose PNG for broad editing workflows and reliably crisp lossless graphics.", "Choose WEBP for modern websites where smaller downloads and transparency are useful."],
    toolSlugs: ["png-to-webp", "webp-to-png", "compress-image"],
    faqs: [
      { question: "Does WEBP support transparency?", answer: "Yes. WEBP can preserve transparent areas." },
      { question: "Will WEBP look worse than PNG?", answer: "Lossless WEBP can preserve detail; lossy WEBP quality depends on the chosen compression level." },
      { question: "Is WEBP supported in modern browsers?", answer: "Yes. Current major browsers support WEBP." },
    ],
  },
  {
    slug: "webp-vs-jpg",
    left: "WEBP",
    right: "JPG",
    title: "WEBP vs JPG: Which Is Better for the Web?",
    description: "Compare WEBP and JPG file size, browser support, transparency and photo quality.",
    explanation: "JPG remains a universal photo format. WEBP is newer and often delivers similar visual quality at a smaller size, with transparency support as an extra advantage.",
    rows: [
      { feature: "Best for", left: "Modern web images", right: "Universal photo sharing" },
      { feature: "Transparency", left: "Yes", right: "No" },
      { feature: "Compression", left: "Lossy or lossless", right: "Lossy" },
      { feature: "Compatibility", left: "Modern software", right: "Nearly universal" },
    ],
    recommendation: ["Choose WEBP for website performance and transparent web images.", "Choose JPG when compatibility with older software and services is the main concern."],
    toolSlugs: ["webp-to-jpg", "jpg-to-webp", "compress-image"],
    faqs: [
      { question: "Is WEBP smaller than JPG?", answer: "It often is at comparable visual quality, although results depend on the source and settings." },
      { question: "Can I use WEBP outside a browser?", answer: "Many modern apps support it, but JPG remains more universally accepted." },
      { question: "Does converting JPG to WEBP restore quality?", answer: "No. Conversion cannot recreate detail already removed by JPG compression." },
    ],
  },
  {
    slug: "pdf-vs-word",
    left: "PDF",
    right: "Word",
    title: "PDF vs Word: Sharing or Editing Documents",
    description: "Compare PDF and Word documents for editing, layout consistency, forms and sharing.",
    explanation: "PDF is designed to preserve a finished layout across devices. Word documents are designed for editing and collaboration, so their appearance can change with fonts, software and page settings.",
    rows: [
      { feature: "Primary purpose", left: "Fixed-layout sharing", right: "Editing and collaboration" },
      { feature: "Layout consistency", left: "High", right: "Can vary by device" },
      { feature: "Easy editing", left: "Limited", right: "Strong" },
      { feature: "Best final delivery", left: "Yes", right: "Usually no" },
    ],
    recommendation: ["Choose PDF for signed, printed or final documents where layout must stay consistent.", "Choose Word while writing, reviewing or collaborating on editable content."],
    toolSlugs: ["pdf-merge", "pdf-split", "compress-pdf"],
    faqs: [
      { question: "Is PDF better for sending documents?", answer: "Usually, because the layout is more likely to remain consistent for the recipient." },
      { question: "Is Word better for editing?", answer: "Yes. DOCX files are structured for document editing and collaboration." },
      { question: "Can every PDF convert cleanly to Word?", answer: "No. Complex layouts and scanned pages often lose formatting or require OCR." },
    ],
  },
  {
    slug: "mp3-vs-wav",
    left: "MP3",
    right: "WAV",
    title: "MP3 vs WAV: Audio Quality and File Size",
    description: "Compare MP3 and WAV for audio quality, editing, compatibility and storage size.",
    explanation: "MP3 reduces file size using lossy compression. WAV commonly stores uncompressed PCM audio, making it much larger but well suited to editing and dependable browser export.",
    rows: [
      { feature: "Compression", left: "Lossy", right: "Usually uncompressed" },
      { feature: "File size", left: "Small", right: "Large" },
      { feature: "Editing", left: "Less ideal for repeated edits", right: "Well suited" },
      { feature: "Sharing", left: "Convenient", right: "Best when quality matters" },
    ],
    recommendation: ["Choose MP3 for compact music, podcasts and easy sharing.", "Choose WAV for editing, archiving short recordings or preserving decoded audio quality."],
    toolSlugs: ["audio-converter", "mp3-cutter", "change-audio-volume"],
    faqs: [
      { question: "Does WAV always sound better?", answer: "WAV can preserve uncompressed audio, but the audible difference depends on the source, MP3 bitrate and listening setup." },
      { question: "Why are WAV files so large?", answer: "They usually store uncompressed sample data instead of discarding information to reduce size." },
      { question: "Can converting MP3 to WAV restore quality?", answer: "No. It avoids another lossy encode, but cannot restore audio information already removed from the MP3." },
    ],
  },
  {
    slug: "smallpdf-vs-ilovepdf-alternatives",
    left: "Online PDF suites",
    right: "Focused browser tools",
    title: "Smallpdf and iLovePDF Alternatives: What Should You Use?",
    description: "Compare large online PDF suites with focused browser-based alternatives for everyday document tasks.",
    explanation: "Smallpdf and iLovePDF offer broad PDF suites and paid plans. A focused browser tool can be a simpler choice when you need one task, clear output and local processing where supported.",
    rows: [
      { feature: "Tool range", left: "Broad suite", right: "Focused individual tools" },
      { feature: "Accounts", left: "May be needed for some features", right: "No account for A2ZConvertor tools" },
      { feature: "Processing", left: "Varies by tool", right: "Browser-based where supported" },
      { feature: "Best fit", left: "Frequent advanced PDF workflows", right: "Quick everyday tasks" },
    ],
    recommendation: ["Use a broad PDF suite when you need advanced workflows, integrations or team features.", "Use focused browser tools for quick merging, splitting and compression without installing a full editor."],
    toolSlugs: ["pdf-merge", "pdf-split", "compress-pdf"],
    faqs: [
      { question: "Are browser PDF tools private?", answer: "Privacy depends on implementation. A2ZConvertor describes when supported processing happens in your browser." },
      { question: "Do free alternatives replace desktop PDF editors?", answer: "Not for complex forms, redaction or document authoring, but they can cover many routine tasks." },
      { question: "Which option is best for occasional use?", answer: "A focused tool is often simplest when you only need one clearly defined action." },
    ],
  },
  {
    slug: "canva-vs-free-image-tools",
    left: "Canva",
    right: "Free image utilities",
    title: "Canva vs Free Image Tools: Design Suite or Quick Utility?",
    description: "Compare a full design platform with focused image conversion, compression and editing tools.",
    explanation: "Canva is built for visual design and templates. Focused image utilities are built to complete a narrow technical task quickly, such as resizing, converting or removing metadata.",
    rows: [
      { feature: "Best for", left: "Designed graphics and templates", right: "Fast file operations" },
      { feature: "Learning curve", left: "More features to learn", right: "Usually one workflow" },
      { feature: "Account", left: "Commonly used with an account", right: "No account required here" },
      { feature: "Advanced design", left: "Strong", right: "Not the purpose" },
    ],
    recommendation: ["Use Canva when composition, brand templates and collaborative design matter.", "Use a focused image tool when you simply need to convert, resize, crop or clean a file."],
    toolSlugs: ["compress-image", "resize-image", "remove-image-metadata"],
    faqs: [
      { question: "Can free image tools replace Canva?", answer: "They replace specific utility tasks, not Canva's broader design and template workflow." },
      { question: "Which is faster for resizing one image?", answer: "A focused resize tool is usually the shorter workflow." },
      { question: "Can I use both?", answer: "Yes. A utility can prepare an asset before or after a larger design workflow." },
    ],
  },
  {
    slug: "pdf-compressor-online-vs-desktop-software",
    left: "Online compressor",
    right: "Desktop software",
    title: "Online PDF Compressor vs Desktop Software",
    description: "Compare online PDF compression with desktop software for privacy, speed, quality and large files.",
    explanation: "Browser-based compressors are convenient for occasional jobs. Desktop software usually offers deeper optimisation controls and can be more dependable for large or confidential workflows.",
    rows: [
      { feature: "Setup", left: "Open in a browser", right: "Install software" },
      { feature: "Large files", left: "Limited by device and browser memory", right: "Often better suited" },
      { feature: "Compression controls", left: "Usually simple", right: "Often more advanced" },
      { feature: "Offline use", left: "Page must first load", right: "Usually available" },
    ],
    recommendation: ["Use an online compressor for quick, occasional reductions and verify the downloaded result.", "Use desktop software for batch processing, very large files or advanced optimisation requirements."],
    toolSlugs: ["compress-pdf", "pdf-split", "delete-pdf-pages"],
    faqs: [
      { question: "Why can a compressed PDF become larger?", answer: "Some files are already efficient, and image-based recompression can add data at unsuitable settings." },
      { question: "Will compression keep selectable text?", answer: "It depends on the method. A renderer-based compressor can flatten pages into images." },
      { question: "Which is safer for sensitive documents?", answer: "Use a workflow whose processing and retention are clear, and consider trusted offline software for highly sensitive files." },
    ],
  },
];

export function getComparisonPage(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}
