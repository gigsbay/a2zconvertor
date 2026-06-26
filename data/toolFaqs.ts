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
  "crop-pdf": [
    {
      question: "How does Crop PDF work?",
      answer:
        "Drag and resize the crop area on the first-page preview or fine-tune the margin fields. The tool applies those margins to each page's PDF crop box in your browser.",
    },
    {
      question: "Does cropping delete the hidden content?",
      answer:
        "No. Crop boxes change the visible page area. The original page content may still exist inside the PDF file.",
    },
    {
      question: "Are my PDFs uploaded while cropping?",
      answer:
        "No. The PDF is read, cropped and rebuilt locally in your browser.",
    },
  ],
  "meme-generator": [
    {
      question: "How do I make a meme image?",
      answer:
        "Upload a JPG, PNG or WEBP image, add top and bottom text, adjust the font size and download the final meme as a PNG.",
    },
    {
      question: "What style does the meme text use?",
      answer:
        "The text is centered, uppercase, bold, white filled and drawn with a black stroke for the classic meme look.",
    },
    {
      question: "Are images uploaded when making a meme?",
      answer:
        "No. The meme preview and PNG export are created in your browser using canvas.",
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
        "Yes. Upload MP3, WAV, OGG or M4A audio, use the volume slider from 10% to 200%, then export the adjusted audio as WAV.",
    },
    {
      question: "Does this export MP3 or M4A?",
      answer:
        "No. Browser-native MP3 and M4A encoding is not reliable without heavier encoders, so adjusted audio downloads as WAV.",
    },
    {
      question: "Can I preview the audio before downloading?",
      answer:
        "Yes. You can preview the original audio and the adjusted WAV output in your browser before downloading.",
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
  "video-thumbnail-extractor": [
    {
      question: "How do I extract a thumbnail from a video?",
      answer:
        "Upload an MP4, WEBM or MOV video, choose the timestamp you want, then capture and download that frame as PNG or JPG.",
    },
    {
      question: "Are videos uploaded when extracting thumbnails?",
      answer:
        "No. The video is previewed and captured in your browser using the video element and canvas.",
    },
    {
      question: "Why might a MOV file not work?",
      answer:
        "MOV support depends on the codecs your browser can decode. If the video cannot play in the browser, the tool cannot capture a frame from it.",
    },
  ],
  "hashtag-generator": [
    {
      question: "How does Hashtag Generator create ideas?",
      answer:
        "Gemini creates grouped hashtag ideas from your topic and category. You receive five free generations per day.",
    },
    {
      question: "How many hashtags does it generate?",
      answer:
        "It generates up to 30 hashtag ideas depending on the keywords, category and tone you choose.",
    },
    {
      question: "Can I copy all hashtags at once?",
      answer:
        "Yes. Use the Copy All button to copy the generated hashtags as one ready-to-paste line.",
    },
  ],
  "blog-title-generator": [
    {
      question: "How are blog titles generated?",
      answer:
        "Gemini creates varied title structures using the free daily allowance.",
    },
    {
      question: "Can I choose the title style?",
      answer:
        "The generator mixes how-to, listicle, beginner, comparison, mistakes and problem-solution structures in each result set.",
    },
    {
      question: "Are the titles ready to publish?",
      answer:
        "They are quick starting points. You should edit them for your audience, brand voice and search intent.",
    },
  ],
  "email-template-generator": [
    {
      question: "Does this send the email for me?",
      answer:
        "No. It creates a ready-to-edit email draft and subject line that you can copy into your email app.",
    },
    {
      question: "How is the email draft created?",
      answer:
        "Gemini creates the email from your purpose, recipient, tone and key message.",
    },
    {
      question: "Can I customize the generated email?",
      answer:
        "Yes. The output includes editable placeholders for context, requested action, timeline and your name.",
    },
  ],
  "text-summarizer": [
    {
      question: "How does this text summarizer work?",
      answer:
        "Gemini summarizes the supplied text and is instructed to preserve meaning without adding facts.",
    },
    {
      question: "How many sentences are included?",
      answer:
        "The result includes a short summary, bullet summary and key takeaways. Always verify important details against the source text.",
    },
    {
      question: "Is my text uploaded for summarizing?",
      answer:
        "The text is sent through the A2ZConvertor proxy to your selected provider for this generation request.",
    },
  ],
  "text-case-converter": [
    {
      question: "Which text cases can I convert to?",
      answer:
        "You can convert text to uppercase, lowercase, title case, sentence case and slug or kebab case.",
    },
    {
      question: "Does this work offline after the page loads?",
      answer:
        "Yes. The conversion logic runs in your browser without an external API.",
    },
    {
      question: "Can I copy the converted text?",
      answer:
        "Yes. Use the Copy Output button to copy the converted text to your clipboard.",
    },
  ],
  "avif-to-png": [
    {
      question: "Does this tool create AVIF files?",
      answer:
        "No. This launch version decodes AVIF images in your browser and exports PNG because AVIF canvas export is not reliable enough to promise.",
    },
    {
      question: "Are AVIF images uploaded to a server?",
      answer:
        "No. The AVIF image is decoded and converted locally in your browser using canvas.",
    },
    {
      question: "What if my AVIF file does not preview?",
      answer:
        "Your browser must support AVIF image decoding. Try an up-to-date Chrome, Firefox, Edge or Safari browser.",
    },
  ],
  "avif-to-jpg": [
    {
      question: "Does AVIF to JPG keep transparency?",
      answer:
        "No. JPG does not support transparency, so transparent AVIF areas are flattened onto a white background.",
    },
    {
      question: "Are AVIF images uploaded to a server?",
      answer:
        "No. The AVIF image is decoded and converted locally in your browser using canvas.",
    },
    {
      question: "Why is there no JPG to AVIF tool?",
      answer:
        "Browser canvas AVIF export is not reliable enough for a dependable converter, so this tool only converts AVIF into JPG.",
    },
  ],
  "image-color-picker": [
    {
      question: "How do I pick a color from an image?",
      answer:
        "Upload a JPG, PNG or WEBP image, then click or tap the pixel you want to inspect. The tool shows its HEX, RGB and HSL values.",
    },
    {
      question: "Can I copy the selected color value?",
      answer:
        "Yes. Each HEX, RGB and HSL result has its own copy button so you can use the format you need.",
    },
    {
      question: "Is my image uploaded to a server?",
      answer:
        "No. The image is rendered and sampled locally in your browser using canvas.",
    },
  ],
  "remove-image-metadata": [
    {
      question: "What image metadata does this tool remove?",
      answer:
        "Re-rendering through canvas removes most embedded metadata, including common EXIF camera, date and location details. It does not inspect or certify every possible proprietary metadata block.",
    },
    {
      question: "Will removing metadata change my image?",
      answer:
        "The visible image is preserved, but re-exporting can change the format, compression quality or file size. JPG output replaces transparency with white.",
    },
    {
      question: "Is my image uploaded while metadata is removed?",
      answer:
        "No. The image is decoded and re-exported locally in your browser.",
    },
  ],
  "instagram-caption-generator": [
    {
      question: "How are Instagram captions generated?",
      answer: "Gemini creates captions from your topic, tone and emoji preference.",
    },
    {
      question: "Are the captions ready to post?",
      answer: "They are starting points. Edit facts, wording and tone so the caption accurately represents your post and account.",
    },
    {
      question: "Can a caption guarantee engagement?",
      answer: "No. Engagement depends on the content, audience, timing and platform behaviour, not a caption template alone.",
    },
  ],
  "tiktok-hashtag-generator": [
    {
      question: "What types of TikTok hashtags are generated?",
      answer: "The tool creates broad, niche, content-style and audience hashtags from your topic and audience. It does not claim that any tag will create viral results.",
    },
    {
      question: "Will these hashtags make a video viral?",
      answer: "No. Hashtags can help describe and categorize content, but they cannot guarantee reach, ranking or virality.",
    },
    {
      question: "Should I use every generated hashtag?",
      answer: "Review the list and keep only tags that accurately match the video and intended audience.",
    },
  ],
  "youtube-title-generator": [
    {
      question: "How does the YouTube title generator work?",
      answer: "Gemini creates varied title structures from your topic and style.",
    },
    {
      question: "What does the title length helper show?",
      answer: "It shows the character count and flags concise titles, helping you notice ideas that may be worth shortening.",
    },
    {
      question: "Do these titles guarantee more views?",
      answer: "No. Titles should clearly match the video. Performance also depends on the thumbnail, content quality, audience and many other factors.",
    },
  ],
  "social-media-bio-generator": [
    {
      question: "Which platforms are supported?",
      answer: "You can create bio ideas for Instagram, TikTok, YouTube, LinkedIn and X.",
    },
    {
      question: "Does the bio generator use AI?",
      answer: "Yes. It uses the owner-funded Gemini connection with a daily free limit.",
    },
    {
      question: "Should I edit the generated bio?",
      answer: "Yes. Check platform length limits and make sure every statement accurately reflects your real work, experience or offer.",
    },
  ],
  "content-ideas-generator": [
    {
      question: "How many content ideas are generated?",
      answer: "The tool creates twenty ideas: five educational, five entertaining, five promotional and five personal prompts.",
    },
    {
      question: "Are the ideas customized?",
      answer: "Gemini uses your niche, audience, platform and goal. Refine every idea with real examples and audience knowledge.",
    },
    {
      question: "Do these ideas guarantee growth or sales?",
      answer: "No. They help with brainstorming only. Results depend on execution, relevance, consistency, offer quality and audience response.",
    },
  ],
  "ai-hook-generator": [
    {
      question: "What can I use AI Hook Generator for?",
      answer: "Use it to create opening lines for social posts, short videos, articles, emails or ads. The hooks are editable starting points, not guaranteed performance claims.",
    },
    {
      question: "Does it promise viral hooks?",
      answer: "No. The tool avoids guaranteed reach or virality claims and focuses on honest, specific opening angles.",
    },
    {
      question: "How do I get better hook ideas?",
      answer: "Enter a clear topic, audience or platform. The more specific the brief, the easier it is for Gemini to produce useful hooks.",
    },
  ],
  "ai-carousel-post-generator": [
    {
      question: "What does the AI Carousel Post Generator create?",
      answer: "It creates a slide-by-slide carousel outline, caption suggestion and final call to action for your chosen topic and goal.",
    },
    {
      question: "Does it design carousel images?",
      answer: "No. It writes the structure and copy. You can design the actual carousel in your preferred design tool.",
    },
    {
      question: "Can I use it for Instagram and LinkedIn?",
      answer: "Yes. Choose a platform and edit the generated copy to match that platform's layout, tone and audience.",
    },
  ],
  "ai-linkedin-post-generator": [
    {
      question: "What LinkedIn posts can it draft?",
      answer: "It can draft short, story-style and professional posts from a topic, audience and tone.",
    },
    {
      question: "Should I publish the post as-is?",
      answer: "No. Add your real experience, check claims and adjust the voice before publishing on LinkedIn.",
    },
    {
      question: "Can it write company-page posts?",
      answer: "Yes, but verify product details, dates, policies and brand tone before using the copy publicly.",
    },
  ],
  "ai-video-script-generator": [
    {
      question: "What does the AI Video Script Generator output?",
      answer: "It creates a hook, short script, on-screen text ideas, a CTA and title ideas for short-form video content.",
    },
    {
      question: "Does this tool edit my video?",
      answer: "No. It creates a script only. You still record, edit and export video in your own video editor.",
    },
    {
      question: "Can it guarantee views?",
      answer: "No. The script can help structure an idea, but views depend on many factors outside the tool.",
    },
  ],
  "ai-product-description-generator": [
    {
      question: "What product details should I enter?",
      answer: "Enter the real product type, audience, features, benefits and any important limitations. Do not rely on the tool to invent specifications.",
    },
    {
      question: "Can it create SEO product copy?",
      answer: "It can draft a product description, feature bullets, SEO title and meta description from your supplied details.",
    },
    {
      question: "Will it make up claims?",
      answer: "The prompt tells Gemini not to invent specifications, discounts or awards, but you should still verify every claim before publishing.",
    },
  ],
  "ai-ad-copy-generator": [
    {
      question: "What ad copy does it generate?",
      answer: "It creates short headlines, primary text options, CTA lines and ad angles for your product, service or offer.",
    },
    {
      question: "Does it guarantee conversions?",
      answer: "No. It provides editable ad ideas only. Performance depends on offer, targeting, creative, budget and platform rules.",
    },
    {
      question: "Should I check ad policy before using the copy?",
      answer: "Yes. Review generated copy against the ad platform's policies and your own legal or compliance requirements.",
    },
  ],};

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
