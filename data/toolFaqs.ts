type ToolFaq = {
  question: string;
  answer: string;
};

type ToolFaqContext = {
  title: string;
  inputLabel: string;
  outputLabel: string;
};

export const toolFaqs: Record<string, ToolFaq[]> = {
  "jpg-to-png": [
    {
      question: "Why should I convert JPG to PNG?",
      answer:
        "PNG is useful when you need sharper graphics, screenshots, logos or images that may need transparency support.",
    },
    {
      question: "Will JPG to PNG improve image quality?",
      answer:
        "Converting to PNG will not restore detail already lost in the JPG, but it can prevent additional compression when you save the new file.",
    },
    {
      question: "Can I convert JPEG files with this tool?",
      answer:
        "Yes. JPG and JPEG files use the same image format, so both can be converted to PNG with this converter.",
    },
  ],
  "png-to-jpg": [
    {
      question: "Why convert PNG to JPG?",
      answer:
        "JPG is often smaller than PNG, which makes it useful for photos, email attachments and website uploads.",
    },
    {
      question: "Will transparent PNG areas stay transparent?",
      answer:
        "No. JPG does not support transparency, so transparent areas are flattened when the image is converted.",
    },
    {
      question: "Is PNG to JPG best for photos?",
      answer:
        "Yes. JPG is usually a good choice for photographic images where smaller file size matters more than transparency.",
    },
  ],
  "webp-to-jpg": [
    {
      question: "Why convert WEBP to JPG?",
      answer:
        "JPG works in almost every app, website and device, so it is helpful when a service does not accept WEBP files.",
    },
    {
      question: "Does WEBP to JPG keep transparency?",
      answer:
        "No. JPG does not support transparent pixels, so WEBP transparency is flattened during conversion.",
    },
    {
      question: "Can I use the JPG after conversion for uploads?",
      answer:
        "Yes. The converted JPG is suitable for common website forms, image editors, documents and sharing workflows.",
    },
  ],
  "webp-to-png": [
    {
      question: "Why convert WEBP to PNG?",
      answer:
        "PNG is useful when you need broad compatibility and want to preserve crisp graphics or transparency from supported WEBP images.",
    },
    {
      question: "Will WEBP transparency be preserved?",
      answer:
        "When the source WEBP contains transparency, converting to PNG is the best option for keeping transparent areas.",
    },
    {
      question: "Is PNG larger than WEBP?",
      answer:
        "Usually yes. PNG files can be larger, but they are widely supported and work well for graphics, icons and screenshots.",
    },
  ],
  "jpg-to-webp": [
    {
      question: "Why convert JPG to WEBP?",
      answer:
        "WEBP can reduce file size for website images while keeping good visual quality, which may help pages load faster.",
    },
    {
      question: "Is WEBP supported by modern browsers?",
      answer:
        "Yes. Modern browsers support WEBP, making it a practical format for web images and performance-focused sites.",
    },
    {
      question: "Will converting JPG to WEBP remove compression artifacts?",
      answer:
        "No. Existing JPG artifacts remain, but WEBP can create a smaller copy for web use without adding much visible loss.",
    },
  ],
  "png-to-webp": [
    {
      question: "Why convert PNG to WEBP?",
      answer:
        "WEBP can make PNG images much smaller for websites while still supporting transparency in many cases.",
    },
    {
      question: "Can WEBP keep PNG transparency?",
      answer:
        "Yes. WEBP supports transparency, so it is a strong option for optimizing transparent PNG graphics for the web.",
    },
    {
      question: "Is PNG or WEBP better for websites?",
      answer:
        "WEBP is often better for website performance, while PNG remains useful when a platform specifically requires PNG.",
    },
  ],
  "compress-image": [
    {
      question: "What does image compression do?",
      answer:
        "Image compression reduces file size so images are easier to upload, share and use on websites.",
    },
    {
      question: "Will compressing an image reduce quality?",
      answer:
        "Some compression can affect quality, but the goal is to reduce file size while keeping the image visually useful.",
    },
    {
      question: "When should I compress an image?",
      answer:
        "Compress images before uploading to websites, attaching to forms or sharing when file size limits matter.",
    },
  ],
  "resize-image": [
    {
      question: "What is image resizing?",
      answer:
        "Image resizing changes the width and height of an image to fit a specific layout, upload rule or display size.",
    },
    {
      question: "Will resizing reduce file size?",
      answer:
        "Often yes. Smaller dimensions usually produce a smaller file, especially for large photos.",
    },
    {
      question: "Should I keep the aspect ratio?",
      answer:
        "Keeping the aspect ratio prevents stretching and helps the resized image look natural.",
    },
  ],
  "crop-image": [
    {
      question: "What does cropping an image do?",
      answer:
        "Cropping removes unwanted outer areas so the image focuses on the part you want to keep. Use the visual crop box to choose the area.",
    },
    {
      question: "Does cropping change image dimensions?",
      answer:
        "Yes. The exported image uses the selected crop area, so its width and height usually change.",
    },
    {
      question: "When is cropping useful?",
      answer:
        "Cropping is useful for profile photos, product images, thumbnails and removing distracting edges. You can drag and resize the crop area before downloading.",
    },
  ],
  "rotate-image": [
    {
      question: "Why rotate an image online?",
      answer:
        "Rotation fixes sideways or upside-down photos and helps images match the orientation needed for upload or sharing.",
    },
    {
      question: "Can I rotate by common angles?",
      answer:
        "Yes. This tool supports common rotation angles so you can quickly turn images into the correct orientation.",
    },
    {
      question: "Does rotating change the file format?",
      answer:
        "The tool outputs a rotated image file while preserving a practical downloadable image format.",
    },
  ],
  "image-to-base64": [
    {
      question: "What is Base64 image encoding?",
      answer:
        "Base64 converts image data into text so it can be embedded in HTML, CSS, JSON or other text-based formats.",
    },
    {
      question: "When should I use Image to Base64?",
      answer:
        "Use it for small icons, test data or embeds where keeping image data inside text is convenient.",
    },
    {
      question: "Are Base64 images smaller?",
      answer:
        "No. Base64 text is usually larger than the original file, so it is best for convenience rather than compression.",
    },
  ],
  "favicon-generator": [
    {
      question: "What is a favicon?",
      answer:
        "A favicon is the small icon browsers show in tabs, bookmarks and other website UI next to your site name.",
    },
    {
      question: "What image should I use for a favicon?",
      answer:
        "Use a simple square logo or symbol with clear contrast so it remains recognizable at small sizes.",
    },
    {
      question: "Can I create a favicon from PNG or JPG?",
      answer:
        "Yes. Upload a common image format and generate a favicon-style output for your website.",
    },
  ],
  "image-to-pdf": [
    {
      question: "Why convert images to PDF?",
      answer:
        "PDF is useful for sharing, printing, archiving or submitting one or more images as a document.",
    },
    {
      question: "Can I make a PDF from photos?",
      answer:
        "Yes. JPG, PNG or WEBP images can be converted into a downloadable PDF document.",
    },
    {
      question: "Will the PDF keep my image layout?",
      answer:
        "The PDF is generated from the selected image content so it can be opened consistently in standard PDF viewers.",
    },
  ],
  "watermark-image": [
    {
      question: "Why add a watermark to an image?",
      answer:
        "Watermarks help identify ownership, brand an image or discourage reuse without permission.",
    },
    {
      question: "Can I add a text watermark?",
      answer:
        "Yes. This tool is designed for adding a text watermark to common image formats.",
    },
    {
      question: "Will watermarking protect my image completely?",
      answer:
        "A watermark can discourage casual reuse, but it is not a complete security or copyright enforcement system.",
    },
  ],
  "flip-image": [
    {
      question: "What does flipping an image mean?",
      answer:
        "Flipping mirrors an image horizontally or vertically, changing the direction of the content.",
    },
    {
      question: "When should I flip an image?",
      answer:
        "Flip images to correct mirrored photos, adjust composition or create a reversed version for design work.",
    },
    {
      question: "Is flipping the same as rotating?",
      answer:
        "No. Flipping mirrors the image, while rotating turns it by an angle such as 90 or 180 degrees.",
    },
  ],
  "pdf-to-image": [
    {
      question: "Why convert PDF pages to images?",
      answer:
        "Image output is useful when you need a PDF page as a PNG for previews, uploads, thumbnails or sharing.",
    },
    {
      question: "What image format does PDF to Image create?",
      answer:
        "This tool converts PDF pages into PNG images for broad compatibility and clear page previews.",
    },
    {
      question: "Can I convert multi-page PDFs?",
      answer:
        "Yes. PDF pages can be rendered as images so you can download page previews from the document.",
    },
  ],
  "pdf-merge": [
    {
      question: "How do I merge PDF files online?",
      answer:
        "Select two or more PDF files, keep them in the order you want, then merge them into one downloadable PDF.",
    },
    {
      question: "Are my PDFs uploaded to a server?",
      answer:
        "The merge happens in your browser, so your selected PDF files do not need to be uploaded for processing.",
    },
    {
      question: "Can I merge more than two PDFs?",
      answer:
        "Yes. You can select multiple PDF files and they will be combined into a single PDF in the selected order.",
    },
  ],
  "pdf-split": [
    {
      question: "How do I split a PDF by page range?",
      answer:
        "Upload one PDF, enter a range like 1-3, and download a new PDF containing only those selected pages.",
    },
    {
      question: "Can I export separate pages and ranges together?",
      answer:
        "Yes. You can use mixed input such as 1-3,6,8-10 to export ranges and individual pages into one new PDF.",
    },
    {
      question: "Are my PDFs uploaded when splitting?",
      answer:
        "No. The PDF is read and split in your browser, so the selected file does not need to be uploaded for processing.",
    },
  ],
  "compress-pdf": [
    {
      question: "How does this PDF compressor work?",
      answer:
        "It renders each PDF page to a canvas, converts the page image to JPEG at your selected quality, and rebuilds a new PDF.",
    },
    {
      question: "Will selectable PDF text remain editable?",
      answer:
        "No. Because pages are rendered as optimized images, selectable text and vector content may become flattened in the compressed PDF.",
    },
    {
      question: "Are my PDFs uploaded while compressing?",
      answer:
        "No. The PDF is rendered, compressed and rebuilt in your browser, so the selected file does not need to be uploaded to a server.",
    },
  ],
  "extract-pdf-pages": [
    {
      question: "How do I extract pages from a PDF?",
      answer:
        "Upload one PDF, enter pages like 1,3,5 or a range like 2-4, then download a new PDF containing only those pages.",
    },
    {
      question: "Can I combine page ranges and single pages?",
      answer:
        "Yes. You can enter mixed selections such as 1-3,6,8-10 to export those pages into one new PDF.",
    },
    {
      question: "Are my PDFs uploaded when extracting pages?",
      answer:
        "No. The selected PDF is processed in your browser, so it does not need to be uploaded to a server.",
    },
  ],
  "rotate-pdf": [
    {
      question: "How do I rotate a PDF online?",
      answer:
        "Upload one PDF, choose 90, 180 or 270 degrees, then download a rotated copy of the PDF.",
    },
    {
      question: "Does PDF Rotate rotate every page?",
      answer:
        "Yes. This tool applies the selected rotation to all pages in the uploaded PDF.",
    },
    {
      question: "Are my PDFs uploaded when rotating?",
      answer:
        "No. The PDF is rotated in your browser, so the selected file does not need to be uploaded for processing.",
    },
  ],
  "delete-pdf-pages": [
    {
      question: "How do I delete pages from a PDF?",
      answer:
        "Upload one PDF, enter pages to remove such as 2,4,7 or 3-5, then download a new PDF with the remaining pages.",
    },
    {
      question: "Can I delete a range of PDF pages?",
      answer:
        "Yes. Use a range like 3-5, individual pages like 2,4,7, or mixed input such as 1,3-5,9.",
    },
    {
      question: "Are my PDFs uploaded when deleting pages?",
      answer:
        "No. Page deletion happens in your browser, so the PDF does not need to be uploaded to a server.",
    },
  ],
  "grayscale-image": [
    {
      question: "How do I convert an image to grayscale?",
      answer:
        "Upload a JPG, PNG or WEBP image, convert it in your browser, then download the grayscale result as a PNG.",
    },
    {
      question: "What format is the grayscale image download?",
      answer:
        "The converted grayscale image downloads as a PNG for broad compatibility and consistent quality.",
    },
    {
      question: "Are my images uploaded when converting to grayscale?",
      answer:
        "No. The grayscale conversion uses your browser canvas, so the selected image does not need to be uploaded to a server.",
    },
  ],
  "watermark-pdf": [
    {
      question: "How do I add a watermark to a PDF?",
      answer:
        "Upload one PDF, enter the watermark text you want, and download a new PDF with that text applied to every page.",
    },
    {
      question: "Does the watermark apply to every page?",
      answer:
        "Yes. This tool draws the same text watermark across all pages in the uploaded PDF.",
    },
    {
      question: "Are my PDFs uploaded when adding a watermark?",
      answer:
        "No. The watermark is added in your browser, so the selected PDF does not need to be uploaded to a server.",
    },
  ],
  "add-page-numbers-pdf": [
    {
      question: "How do I add page numbers to a PDF?",
      answer:
        "Upload one PDF and create a new copy with page numbers added to the bottom center of each page.",
    },
    {
      question: "Will every page get a number?",
      answer:
        "Yes. The tool labels each page in order using a Page 1 of N style format.",
    },
    {
      question: "Are my PDFs uploaded when adding page numbers?",
      answer:
        "No. Page numbers are added in your browser, so the selected PDF does not need to be uploaded for processing.",
    },
  ],
  "organize-pdf": [
    {
      question: "How do I reorder PDF pages?",
      answer:
        "Upload one PDF, drag the page cards into the order you want, then rebuild and download the organized PDF.",
    },
    {
      question: "Can I delete pages while organizing a PDF?",
      answer:
        "Yes. Use the remove button on a page card to leave that page out of the downloaded PDF.",
    },
    {
      question: "Are my PDFs uploaded when organizing pages?",
      answer:
        "No. Page thumbnails, reordering and PDF rebuilding happen in your browser using PDF.js and pdf-lib.",
    },
  ],
  "video-metadata": [
    {
      question: "What metadata can I view from a video?",
      answer:
        "This tool shows file name, file size, duration, resolution, video width and video height for supported browser video files.",
    },
    {
      question: "Are videos uploaded to a server?",
      answer:
        "No. Video metadata is read in your browser using the video element, so the selected file does not need to be uploaded.",
    },
    {
      question: "Which video formats are supported?",
      answer:
        "The tool accepts MP4, WEBM and MOV files when your browser can read their metadata.",
    },
  ],
  "audio-metadata": [
    {
      question: "What audio metadata does this show?",
      answer:
        "This tool shows file name, file size and duration for supported audio files.",
    },
    {
      question: "Are audio files uploaded to a server?",
      answer:
        "No. Audio metadata is read in your browser using the audio element, so the selected file does not need to be uploaded.",
    },
    {
      question: "Which audio formats are supported?",
      answer:
        "The tool accepts MP3, WAV, OGG and M4A files when your browser can read their metadata.",
    },
  ],
  "mp4-to-mp3": [
    {
      question: "Does this tool create MP3 files?",
      answer:
        "No. Browser-native MP3 encoding is not reliable without a heavier encoder, so this tool extracts supported MP4 audio and exports WAV.",
    },
    {
      question: "Is the audio extracted on my device?",
      answer:
        "Yes. The MP4 is decoded in your browser and the extracted audio is downloaded as a WAV file.",
    },
    {
      question: "Why does some MP4 audio fail to extract?",
      answer:
        "Browser support depends on the audio codec inside the MP4. If your browser cannot decode it, the tool cannot extract it client-side.",
    },
  ],
  "mp3-cutter": [
    {
      question: "Does MP3 Cutter export MP3?",
      answer:
        "No. Precise MP3 stream cutting is not available through standard browser APIs, so the trimmed selection downloads as WAV.",
    },
    {
      question: "How do I trim an MP3?",
      answer:
        "Upload an MP3, enter start and end times in seconds, then export the selected audio as a WAV file.",
    },
    {
      question: "Are my audio files uploaded while trimming?",
      answer:
        "No. The MP3 is decoded and trimmed in your browser using the Web Audio API.",
    },
  ],
  "change-audio-volume": [
    {
      question: "Can I make audio louder or quieter?",
      answer:
        "Yes. Use the volume slider from 10% to 200%, then export the adjusted audio as WAV.",
    },
    {
      question: "Does this preserve MP3 output?",
      answer:
        "No. Browser-native MP3 encoding is not reliable without a heavier encoder, so adjusted audio downloads as WAV.",
    },
    {
      question: "Is volume processing browser-based?",
      answer:
        "Yes. Volume adjustment uses the Web Audio API in your browser without server processing.",
    },
  ],
  "video-to-gif": [
    {
      question: "Does this tool create a GIF?",
      answer:
        "No. Real GIF encoding is heavy without a dedicated encoder, so this MVP exports a short animated WebM clip instead.",
    },
    {
      question: "How do I make a short animated clip?",
      answer:
        "Upload MP4 or WEBM video, choose a start time and duration, then export the selected segment as WebM.",
    },
    {
      question: "Are videos uploaded while creating the clip?",
      answer:
        "No. The clip is rendered and recorded in your browser using canvas and MediaRecorder.",
    },
  ],
  "compress-video": [
    {
      question: "Does Video Optimizer compress MP4 files?",
      answer:
        "It does not create optimized MP4 output. It uses browser-native recording to export a WebM version and shows the real output size.",
    },
    {
      question: "Can the optimized video be larger?",
      answer:
        "Yes. If the selected quality or source video does not reduce well, the tool shows the accurate output size and saved percentage.",
    },
    {
      question: "Are videos uploaded when optimizing?",
      answer:
        "No. The video frames are processed in your browser with canvas and MediaRecorder.",
    },
  ],
  "audio-converter": [
    {
      question: "What format does Audio Converter create?",
      answer:
        "This tool converts supported audio files to WAV using browser audio decoding.",
    },
    {
      question: "Can it export MP3 or OGG?",
      answer:
        "No. Reliable MP3 or OGG encoding would require an additional encoder, so this launch version clearly exports WAV.",
    },
    {
      question: "Are audio files uploaded while converting?",
      answer:
        "No. Audio conversion runs in your browser with the Web Audio API.",
    },
  ],
};

export function getToolFaqs(slug: string, tool: ToolFaqContext): ToolFaq[] {
  return (
    toolFaqs[slug] ?? [
      {
        question: `Is this ${tool.title} free?`,
        answer:
          "Yes. This tool is free to use online with no software installation required.",
      },
      {
        question: "Are my files uploaded to a server?",
        answer:
          "Files are processed directly in your browser where possible, helping keep the process fast and private.",
      },
      {
        question: `Why convert ${tool.inputLabel} to ${tool.outputLabel}?`,
        answer: `Converting ${tool.inputLabel} to ${tool.outputLabel} can help with compatibility, sharing, website uploads and file format requirements.`,
      },
    ]
  );
}
