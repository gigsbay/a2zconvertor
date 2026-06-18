# Browser-Only Tool Feasibility Research

Research date: June 18, 2026

## Executive Summary

| Tool | Client-side feasibility | Build before launch? |
| --- | --- | --- |
| PDF to Word | Partial | No |
| Word to PDF | Partial | No |
| Repair PDF | No, not dependably | No |
| OCR / Searchable PDF | Yes, with significant constraints | No |
| HEIC Converter | Yes | No for the current launch; strongest post-launch candidate |

The launch is close enough that none of these tools should be added before the
current release. HEIC conversion is the safest next candidate after launch.
OCR is possible but needs a performance, licensing and quality-validation
spike. The other three should not be marketed as full-fidelity browser
converters or repair tools with the available open-source libraries.

## PDF to Word

**Feasible client-side:** Partial.

PDF.js can parse and render PDFs and expose text data, while `docx` can generate
DOCX files in a browser. These capabilities can produce a text-first DOCX, but
they do not reconstruct Word's semantic layout from arbitrary PDF drawing
instructions. Tables, columns, reading order, positioned images, headers,
footers and scanned pages require substantial custom analysis.

**Recommended libraries:**

- `pdfjs-dist` for page parsing, text extraction and image rendering.
- `docx` for generating the output DOCX.
- An OCR engine would also be required for scanned PDFs.
- A commercial document SDK should be evaluated if high-fidelity conversion is
  a product requirement.

**Bundle size and performance risk:** Medium to high.

PDF.js is already present, but DOCX generation, embedded images, font handling
and optional OCR add memory and CPU cost. Large or image-heavy documents would
need progress reporting, page limits and cancellation.

**Expected output quality:** Low to medium.

Simple, text-heavy, single-column PDFs could become editable Word documents.
Complex layouts would frequently lose spacing, reading order, tables and exact
pagination. A rasterized DOCX could look closer but would not be meaningfully
editable.

**Launch recommendation:** Do not build before launch.

Only ship later if the tool is honestly named and scoped as something like
"PDF to Editable Text/DOCX" with clear limitations, or after selecting a
high-fidelity commercial engine.

## Word to PDF

**Feasible client-side:** Partial.

Mammoth can convert DOCX to browser HTML, but deliberately prioritizes clean
semantic HTML over exact visual fidelity. `docx-preview` aims to render DOCX
into HTML while preserving more page styling, but it remains limited by HTML
layout capabilities. That rendered HTML could be printed by the browser or
captured into a PDF, but neither path guarantees Word-compatible pagination.

**Recommended libraries:**

- `docx-preview` for the closest browser-rendered document preview.
- `mammoth` when semantic content is more important than visual fidelity.
- Browser print-to-PDF for a user-driven workflow.
- `html2canvas` plus `jsPDF` only for an explicitly flattened, image-based PDF.

**Bundle size and performance risk:** Medium to high.

DOCX parsing requires ZIP/XML processing, document styles, images and fonts.
Rasterizing every page increases memory sharply and can freeze mobile browsers
on long documents.

**Expected output quality:** Medium for simple documents, low for complex ones.

Basic paragraphs, headings, lists and images can work. Exact page breaks,
floating content, text boxes, tracked changes, advanced tables, equations and
font substitution can differ from Microsoft Word. Image-based output may look
closer but loses selectable text and accessibility.

**Launch recommendation:** Do not build before launch.

Avoid promising "Word to PDF" until a representative DOCX test suite proves
acceptable pagination and font behavior. A later "Preview DOCX / Print to PDF"
tool could be honest if the browser print step is explicit.

## Repair PDF

**Feasible client-side:** No, not as a dependable general-purpose tool.

`pdf-lib` can load and rewrite many valid PDFs, which may normalize a file that
is already parseable. That is not equivalent to repairing damaged cross-
reference tables, malformed objects, truncated streams or missing data.

qpdf has mature heuristic recovery behavior, including cross-reference table
reconstruction, but the upstream project is a native C++ command-line/library
tool and does not provide an official browser package for this use case.
Maintaining a custom qpdf WebAssembly build would add considerable security,
testing, download-size and memory risk.

**Recommended libraries:**

- qpdf in a trusted server or desktop environment for real repair workflows.
- `pdf-lib` only for a narrowly named "Rewrite PDF" or "Normalize PDF" tool
  that accepts already parseable files.

**Bundle size and performance risk:** High.

A custom native-to-WASM build would be large and would process untrusted,
possibly adversarial documents in browser memory. Corrupt PDFs also require
strict limits and extensive fuzz/security testing.

**Expected output quality:** Unpredictable.

Some structural damage can be recovered heuristically; missing or truncated
content cannot be recreated. A browser wrapper must never imply guaranteed
repair.

**Launch recommendation:** Do not build.

Do not add an active "Repair PDF" tool with `pdf-lib` alone. It would overstate
what the implementation can do.

## OCR / Searchable PDF

**Feasible client-side:** Yes, with significant constraints.

Tesseract.js runs OCR in browsers through WebAssembly, but it does not directly
support PDF files. A custom pipeline would need PDF.js to render every page,
Tesseract.js to recognize each rendered image, and pdf-lib to add an invisible
text layer.

Scribe.js provides a more integrated browser pipeline for image and PDF OCR and
can write searchable PDFs. However, it is AGPL-3.0 licensed, requires same-
origin assets in the browser, and should receive a licensing review before use.

**Recommended libraries:**

- Preferred technical spike: `scribe.js-ocr`, subject to license review.
- More controlled alternative: existing `pdfjs-dist` plus `tesseract.js` and
  `pdf-lib`.
- Web Workers are required to keep the interface responsive.

**Bundle size and performance risk:** Very high.

OCR requires a WebAssembly engine, worker code and one or more language models.
Every page must be rasterized and analyzed. Long or high-resolution PDFs can
consume substantial CPU, memory and battery, especially on phones.

**Expected output quality:** Medium and source-dependent.

Clean, high-resolution printed English text can work well. Accuracy falls with
handwriting, skew, low contrast, unusual fonts, tables and mixed languages.
Searchable text positioning must also be validated so selection aligns with the
page image.

**Launch recommendation:** Do not build before launch.

Run a post-launch proof of concept with page limits, language selection,
cancel/progress controls and a representative scanned-document QA set. Complete
the AGPL compatibility review before choosing Scribe.js.

## HEIC Converter

**Feasible client-side:** Yes.

libheif supports JavaScript/WebAssembly builds and has an official browser demo.
It can decode HEIF/HEIC images for JPEG or PNG output. `heic2any` is a simpler
browser-focused wrapper that converts HEIC to JPEG, PNG or GIF using workers.

**Recommended libraries:**

- `libheif-js` or a maintained libheif WebAssembly build for the strongest
  codec foundation.
- `heic2any` for a simpler prototype, with additional maintenance and browser
  testing because its latest published GitHub release is older.
- Canvas for final JPG/PNG export after decoding.

**Bundle size and performance risk:** Medium to high.

The codec is WebAssembly-based and meaningfully larger than native canvas image
tools. High-resolution iPhone photos and multi-image HEIC containers can use
significant memory. The decoder should be lazy-loaded and processing should
show progress.

**Expected output quality:** High for decoded pixels, with metadata caveats.

JPEG quality can be user-controlled and PNG can preserve decoded image detail.
`heic2any` explicitly does not copy original metadata, and special containers
such as bursts or animations require careful behavior and copy.

**Launch recommendation:** Do not add during the current launch freeze.

This is the best post-launch candidate from this research. Build HEIC to JPG
and HEIC to PNG first, lazy-load the decoder, document metadata removal, and
test Chrome, Edge, Firefox and Safari with still images, transparency, large
photos and multi-image containers.

## Recommended Priority After Launch

1. HEIC to JPG / PNG.
2. OCR / Searchable PDF proof of concept and license review.
3. Word preview with an explicit browser Print to PDF workflow.
4. Text-first PDF to DOCX experiment.
5. Do not pursue browser-only Repair PDF without a maintained recovery engine.

## Primary Sources

- [PDF.js](https://mozilla.github.io/pdf.js/)
- [docx browser support](https://github.com/dolanmiu/docx)
- [Mammoth DOCX to HTML](https://github.com/mwilliamson/mammoth.js)
- [docx-preview](https://github.com/VolodymyrBaydalka/docxjs)
- [jsPDF](https://github.com/parallax/jsPDF)
- [html2canvas](https://github.com/niklasvh/html2canvas)
- [pdf-lib](https://github.com/Hopding/pdf-lib)
- [qpdf recovery options](https://qpdf.readthedocs.io/en/stable/cli.html)
- [Tesseract.js](https://github.com/naptha/tesseract.js)
- [Scribe.js searchable PDF support](https://github.com/scribeocr/scribe.js)
- [libheif JavaScript/WASM support](https://github.com/strukturag/libheif)
- [heic2any limitations](https://github.com/alexcorvi/heic2any)
