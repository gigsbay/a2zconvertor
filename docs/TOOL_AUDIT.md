# Tool Audit

Last updated: June 17, 2026

This audit reflects the tools currently listed in `data/tools.ts` on `main`.
Statuses are launch-readiness labels, not defect reports:

- Complete: suitable for launch as-is.
- Needs UX improvement: usable, but the workflow or messaging should be polished.
- Needs bug testing: more manual testing is recommended because the tool has higher file-processing complexity, browser compatibility risk, or output-format nuance.

## Production Tool Inventory

### Audio Tools

| Tool | Slug | Status | Notes |
| --- | --- | --- | --- |
| Audio Metadata Viewer | `audio-metadata` | Complete | Simple metadata display with low processing risk. |
| MP3 Cutter | `mp3-cutter` | Needs bug testing | Browser decoding and WAV export should be tested with varied MP3 bitrates and long files. |
| Change Audio Volume | `change-audio-volume` | Needs bug testing | Web Audio API support and clipping behavior should be checked across MP3, WAV, OGG and M4A. |
| Convert Audio to WAV | `audio-converter` | Needs bug testing | Decode support differs by browser and codec, especially for M4A/OGG. |

### Image Tools

| Tool | Slug | Status | Notes |
| --- | --- | --- | --- |
| JPG to PNG | `jpg-to-png` | Complete | Core image conversion. |
| PNG to JPG | `png-to-jpg` | Complete | Core image conversion. |
| WEBP to JPG | `webp-to-jpg` | Complete | Browser support should be broadly good. |
| WEBP to PNG | `webp-to-png` | Complete | Browser support should be broadly good. |
| JPG to WEBP | `jpg-to-webp` | Complete | Core image conversion. |
| PNG to WEBP | `png-to-webp` | Complete | Core image conversion. |
| Compress Image | `compress-image` | Needs bug testing | Verify real size savings and quality controls across large images. |
| Resize Image | `resize-image` | Complete | Straightforward canvas output. |
| Crop Image | `crop-image` | Needs UX improvement | Visual crop flow exists, but crop interactions should be checked on mobile/touch. |
| Rotate Image | `rotate-image` | Complete | Simple canvas transform. |
| Image to Base64 | `image-to-base64` | Complete | Simple text output. |
| Favicon Generator | `favicon-generator` | Needs bug testing | Verify generated icon dimensions and browser download behavior. |
| Watermark Image | `watermark-image` | Complete | Simple canvas text overlay. |
| Flip Image | `flip-image` | Complete | Simple canvas transform. |
| Grayscale Image | `grayscale-image` | Complete | Simple canvas pixel transform. |
| Meme Generator | `meme-generator` | Complete | Canvas text overlay with download. |

### PDF Tools

| Tool | Slug | Status | Notes |
| --- | --- | --- | --- |
| Image to PDF | `image-to-pdf` | Needs bug testing | Test multi-size images, orientation and memory usage. |
| PDF to Image | `pdf-to-image` | Needs bug testing | PDF.js rendering should be tested with large and scanned PDFs. |
| PDF Merge | `pdf-merge` | Needs bug testing | Multi-file PDF copy logic should be checked with encrypted, rotated and large PDFs. |
| PDF Split | `pdf-split` | Needs bug testing | Range parsing and output order should be tested thoroughly. |
| Compress PDF | `compress-pdf` | Needs bug testing | Rendering pages as images flattens text; verify size reporting and browser memory. |
| PDF Extract Pages | `extract-pdf-pages` | Needs bug testing | Similar range-selection risk to PDF Split. |
| PDF Rotate | `rotate-pdf` | Needs bug testing | Verify dimensions and inherited page rotation metadata. |
| PDF Delete Pages | `delete-pdf-pages` | Needs bug testing | Ensure invalid ranges and all-pages-deleted cases are handled. |
| PDF Watermark | `watermark-pdf` | Needs bug testing | Test text positioning, transparency and rotated pages. |
| Add Page Numbers to PDF | `add-page-numbers-pdf` | Needs bug testing | Test pages with different sizes and rotations. |
| Organize PDF | `organize-pdf` | Needs UX improvement | Drag/drop and thumbnail rendering should be tested on mobile and longer PDFs. |

### Text Tools

| Tool | Slug | Status | Notes |
| --- | --- | --- | --- |
| Hashtag Generator | `hashtag-generator` | Complete | Rule/template-based text generation. |
| Blog Title Generator | `blog-title-generator` | Complete | Rule/template-based title generation. |
| Email Template Generator | `email-template-generator` | Complete | Rule/template-based email draft generation. |
| Text Summarizer | `text-summarizer` | Needs bug testing | Rule-based extraction should be tested with short, long and punctuation-heavy input. |
| Text Case Converter | `text-case-converter` | Complete | Simple deterministic text transform. |

### Video Tools

| Tool | Slug | Status | Notes |
| --- | --- | --- | --- |
| Video Metadata Viewer | `video-metadata` | Complete | Metadata-only tool with low processing risk. |
| Extract Audio from MP4 | `mp4-to-mp3` | Needs bug testing | Output is WAV; browser codec support should be tested with multiple MP4 audio codecs. |
| Video to Animated WebM | `video-to-gif` | Needs UX improvement | Honest WebM output is good, but name/copy should be monitored for user expectation drift. |
| Video Optimizer | `compress-video` | Needs bug testing | MediaRecorder output and size savings vary by browser and source video. |

## Duplicate Or Overlapping Functionality

- `pdf-split`, `extract-pdf-pages`, `delete-pdf-pages` and `organize-pdf` overlap around selecting, removing and reordering PDF pages. They are different user intents, but should share parsing rules, validation copy and page-range behavior where possible.
- `pdf-to-image` and `image-to-pdf` are complementary conversion directions and should remain separate.
- `compress-image`, `jpg-to-webp` and `png-to-webp` can overlap for users who simply want a smaller image. Keep copy clear: format conversion is not always the same as compression.
- `audio-converter`, `mp4-to-mp3`, `mp3-cutter` and `change-audio-volume` all export WAV because reliable browser MP3 encoding is not currently used. The repeated WAV messaging should stay consistent.
- `video-to-gif` and `compress-video` both depend on canvas/MediaRecorder-style browser output. Their UX should make output format and browser support obvious.

## Categories With Fewer Than 3 Tools

None.

Current category counts:

| Category | Tool Count |
| --- | ---: |
| Image Tools | 16 |
| PDF Tools | 11 |
| Text Tools | 5 |
| Audio Tools | 4 |
| Video Tools | 4 |

## Competitor Notes

Sources reviewed:

- [Ezgif](https://ezgif.com/) lists GIF, video, audio, transform, optimize, effects, split and text tools, including video cutter, video crop, video reverse, GIF conversions, metadata viewer and format converters.
- [iLovePDF](https://www.ilovepdf.com/) lists PDF merge, split, compress, Office/PDF conversions, organize, repair, OCR, crop, edit, unlock/protect, sign, redact and compare tools.
- [Smallpdf PDF tools](https://smallpdf.com/pdf-tools) lists PDF converter, OCR, Office/PDF conversions, edit, annotate, reader, crop, redact, form filler, unlock/protect, flatten and sign tools.
- [TinyPNG](https://tinypng.com/) emphasizes WebP/PNG/JPEG compression, AVIF/JXL/WebP/JPEG/PNG conversion, batch upload, image resizing, converting and cropping through Tinify products.

## Top 10 Missing Tools To Prioritize

1. **PDF to Word** - High-demand PDF conversion seen on iLovePDF and Smallpdf. Requires careful feasibility review because high-quality DOCX output may need a server or specialized library.
2. **Word to PDF** - Common counterpart to PDF to Word. Browser-only feasibility depends on input parsing/rendering quality.
3. **PDF OCR / Searchable PDF** - Listed by iLovePDF and Smallpdf. Likely not launch-safe without OCR dependencies, but strong demand.
4. **Crop PDF** - Competitor staple and close to existing PDF page tools. Could be feasible with `pdf-lib` page boxes if UX is kept simple.
5. **Repair PDF** - iLovePDF offers repair. Feasibility may be limited client-side, but worth researching as a trust-building PDF utility.
6. **Protect PDF / Add Password** - Common iLovePDF and Smallpdf security tool. Only build if client-side encryption is genuinely supported.
7. **Unlock PDF** - Common PDF security tool. Must be handled honestly and safely; only for user-owned PDFs where client-side support is real.
8. **Video Crop** - Ezgif has video crop. Current site has a feasibility concern because reliable client-side export may require a heavy encoder.
9. **Video Cut / Trim** - Ezgif has video cutter. Current feasibility note says not to ship without dependable export.
10. **AVIF / HEIC Image Converter** - Ezgif and TinyPNG both point toward modern image formats. AVIF may be browser-feasible; HEIC likely needs deeper compatibility research.

