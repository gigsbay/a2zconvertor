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
        "Cropping removes unwanted outer areas so the image focuses on the part you want to keep.",
    },
    {
      question: "Does cropping change image dimensions?",
      answer:
        "Yes. The exported image uses the selected crop area, so its width and height usually change.",
    },
    {
      question: "When is cropping useful?",
      answer:
        "Cropping is useful for profile photos, product images, thumbnails and removing distracting edges.",
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
