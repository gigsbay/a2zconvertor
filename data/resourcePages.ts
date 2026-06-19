export type ResourcePage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string; bullets: string[] }[];
  toolSlugs: string[];
  faqs: { question: string; answer: string }[];
};

export const resourcePages: ResourcePage[] = [
  makeResource("best-free-pdf-tools", "Best Free PDF Tools for Everyday Tasks", "Compare useful free PDF tools for merging, splitting, compressing and organizing documents.", "The best PDF tool is the one that completes a specific task without making you install a large editor.", ["pdf-merge", "pdf-split", "compress-pdf", "organize-pdf"], ["Merge files before sharing", "Extract or delete pages", "Compress copies for email"]),
  makeResource("best-free-image-tools", "Best Free Image Tools for Quick Edits", "Find free browser tools for converting, compressing, resizing and cleaning images.", "Simple image tasks should be fast, clear and honest about output quality.", ["compress-image", "resize-image", "crop-image", "remove-image-metadata"], ["Convert common formats", "Prepare website images", "Remove embedded metadata"]),
  makeResource("best-pdf-compressor-tools", "Best PDF Compressor Tools and Trade-offs", "Understand browser, desktop and online PDF compression options before choosing a tool.", "PDF compression quality depends on whether a document is text, vector artwork or scanned images.", ["compress-pdf", "pdf-to-image", "pdf-merge"], ["Check whether text stays selectable", "Compare the real output size", "Keep an original copy"]),
  makeResource("best-tools-for-students", "Best Free File Tools for Students", "Useful browser tools for assignments, lecture notes, presentations and study workflows.", "Students often need to combine PDFs, resize images and clean up documents quickly on shared devices.", ["pdf-merge", "compress-pdf", "image-to-pdf", "text-summarizer"], ["Prepare assignment uploads", "Reduce attachment sizes", "Create quick study summaries"]),
  makeResource("best-tools-for-small-businesses", "Best Free File Tools for Small Businesses", "Practical browser tools for proposals, product images, invoices and everyday administration.", "Small teams can handle many routine file tasks without buying a large software suite for every device.", ["compress-image", "watermark-image", "pdf-merge", "add-page-numbers-pdf"], ["Prepare customer documents", "Optimise website images", "Brand and organise files"]),
  makeResource("how-to-compress-pdf-without-uploading", "How to Compress a PDF Without Uploading It", "Learn how browser-based PDF compression can reduce a file locally and what quality trade-offs to expect.", "Client-side compression keeps the processing workflow on your device after the page loads.", ["compress-pdf", "pdf-split", "delete-pdf-pages"], ["Choose an appropriate quality", "Review flattened text limitations", "Verify the output before deleting the original"]),
  makeResource("how-to-remove-photo-metadata", "How to Remove Photo Metadata in Your Browser", "Remove common EXIF details from photos with a browser canvas re-export.", "Photos can contain camera, date and location metadata that may not be needed when sharing.", ["remove-image-metadata", "image-color-picker", "compress-image"], ["Choose PNG or JPG output", "Understand that re-export can change size", "Check the cleaned download"]),
  makeResource("browser-based-file-conversion", "Browser-Based File Conversion: Privacy and Limits", "Understand how client-side file tools work, their privacy benefits and their performance limits.", "Modern browsers can decode, edit and rebuild many file formats without sending the file to an application server.", ["jpg-to-png", "pdf-merge", "audio-converter", "video-thumbnail-extractor"], ["Files can remain on-device", "Large files still use device memory", "Browser codec support varies"]),
];

function makeResource(
  slug: string,
  title: string,
  description: string,
  intro: string,
  toolSlugs: string[],
  bullets: string[]
): ResourcePage {
  return {
    slug,
    title,
    description,
    intro,
    sections: [
      { heading: "What to look for", body: "Choose tools that clearly state where processing happens, what format is downloaded and whether quality or editability changes.", bullets },
      { heading: "A practical workflow", body: "Start with a copy of the original file, use the narrowest tool for the task and inspect the result before sharing it.", bullets: ["Keep the original", "Use realistic settings", "Open the downloaded result"] },
    ],
    toolSlugs,
    faqs: [
      { question: "Are browser tools always free?", answer: "A2ZConvertor tools are free, while recommended third-party software may offer paid plans." },
      { question: "Do my files leave my device?", answer: "The linked A2ZConvertor tools are designed for browser-based processing where supported." },
      { question: "When should I use desktop software?", answer: "Desktop software may be better for very large files, batch workflows or advanced editing." },
    ],
  };
}

export function getResourcePage(slug: string) {
  return resourcePages.find((page) => page.slug === slug);
}
