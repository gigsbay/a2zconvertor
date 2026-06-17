# Launch QA Checklist

Use this matrix for manual launch verification. For each tool, open the route,
upload a small valid sample file, run the primary action, download the result,
and confirm the output opens in a normal viewer.

| Tool | Route | Expected upload type | Expected output type | Manual test steps | Pass/Fail | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| JPG to PNG | `/convert/jpg-to-png` | JPG/JPEG image | PNG image | Upload JPG; convert; download PNG; open output; confirm image content is preserved. |  |  |
| PNG to JPG | `/convert/png-to-jpg` | PNG image | JPG image | Upload PNG; convert; download JPG; open output; confirm image content is preserved. |  |  |
| WEBP to JPG | `/convert/webp-to-jpg` | WEBP image | JPG image | Upload WEBP; convert; download JPG; open output; confirm image content is preserved. |  |  |
| WEBP to PNG | `/convert/webp-to-png` | WEBP image | PNG image | Upload WEBP; convert; download PNG; open output; confirm image content is preserved. |  |  |
| JPG to WEBP | `/convert/jpg-to-webp` | JPG/JPEG image | WEBP image | Upload JPG; convert; download WEBP; open output in browser; confirm image content is preserved. |  |  |
| PNG to WEBP | `/convert/png-to-webp` | PNG image | WEBP image | Upload PNG; convert; download WEBP; open output in browser; confirm image content is preserved. |  |  |
| Compress Image | `/convert/compress-image` | JPG, PNG or WEBP image | Compressed image | Upload image; adjust quality if available; compress; download result; confirm file opens and size/result look reasonable. |  |  |
| Resize Image | `/convert/resize-image` | JPG, PNG or WEBP image | Resized image | Upload image; set new dimensions; resize; download result; confirm dimensions changed and image opens. |  |  |
| Crop Image | `/convert/crop-image` | JPG, PNG or WEBP image | Cropped image | Upload image; choose crop area; crop; download result; confirm only selected area remains. |  |  |
| Rotate Image | `/convert/rotate-image` | JPG, PNG or WEBP image | Rotated image | Upload image; choose rotation angle; rotate; download result; confirm orientation changed. |  |  |
| Image to Base64 | `/convert/image-to-base64` | JPG, PNG or WEBP image | Base64 text | Upload image; convert; copy output; confirm Base64 text is generated and starts with a data/image prefix if shown. |  |  |
| Favicon Generator | `/convert/favicon-generator` | JPG, PNG or WEBP image | Favicon image | Upload square-ish image; generate favicon; download result; confirm output opens and is icon-sized. |  |  |
| Image to PDF | `/convert/image-to-pdf` | JPG, PNG or WEBP image | PDF document | Upload image; create PDF; download result; open PDF; confirm image appears on the page. |  |  |
| Watermark Image | `/convert/watermark-image` | JPG, PNG or WEBP image | Watermarked image | Upload image; enter watermark text; apply; download result; confirm watermark appears. |  |  |
| Flip Image | `/convert/flip-image` | JPG, PNG or WEBP image | Flipped image | Upload image; choose horizontal or vertical flip; download result; confirm image is mirrored as expected. |  |  |
| PDF to Image | `/convert/pdf-to-image` | PDF document | PNG image | Upload PDF; convert page to image; download PNG; confirm page preview opens as an image. |  |  |
| PDF Merge | `/convert/pdf-merge` | Multiple PDF documents | Merged PDF document | Upload two or more PDFs; merge; download result; open PDF; confirm pages appear in selected order. |  |  |
| PDF Split | `/convert/pdf-split` | PDF document | Split PDF document | Upload PDF; enter `1-2` or another valid range; export; download result; confirm selected pages only. |  |  |
| Compress PDF | `/convert/compress-pdf` | PDF document | Compressed PDF document | Upload PDF; set quality slider; compress; download result; confirm size metrics are accurate and PDF opens. |  |  |
| PDF Extract Pages | `/convert/extract-pdf-pages` | PDF document | Extracted PDF document | Upload PDF; enter `1,3` or `2-4`; export; download result; confirm selected pages only. |  |  |
| PDF Rotate | `/convert/rotate-pdf` | PDF document | Rotated PDF document | Upload PDF; select 90, 180 or 270 degrees; rotate; download result; confirm all pages rotate. |  |  |
| PDF Delete Pages | `/convert/delete-pdf-pages` | PDF document | Updated PDF document | Upload PDF; enter pages to remove such as `2` or `3-4`; export; download result; confirm removed pages are gone. |  |  |
| Grayscale Image | `/convert/grayscale-image` | JPG, PNG or WEBP image | Grayscale PNG image | Upload image; convert; preview/download result; confirm output is grayscale. |  |  |
| PDF Watermark | `/convert/watermark-pdf` | PDF document | Watermarked PDF document | Upload PDF; enter watermark text; apply; download result; confirm watermark appears on every page. |  |  |
| Add Page Numbers to PDF | `/convert/add-page-numbers-pdf` | PDF document | Numbered PDF document | Upload PDF; add page numbers; download result; confirm every page shows the correct page number. |  |  |
| Video Metadata Viewer | `/convert/video-metadata` | MP4, WEBM or MOV video | Metadata display | Upload video; confirm file name, size, duration, resolution, width and height are shown. |  |  |
| Audio Metadata Viewer | `/convert/audio-metadata` | MP3, WAV, OGG or M4A audio | Metadata display | Upload audio; confirm file name, size and duration are shown. |  |  |
| Extract Audio from MP4 | `/convert/mp4-to-mp3` | MP4 video | WAV audio | Upload MP4; extract audio; download WAV; confirm output opens and UI does not claim MP3 output. |  |  |
| MP3 Cutter | `/convert/mp3-cutter` | MP3 audio | Trimmed WAV audio | Upload MP3; set start and end times; trim; download WAV; confirm duration matches selection. |  |  |
| Change Audio Volume | `/convert/change-audio-volume` | MP3, WAV or OGG audio | Adjusted WAV audio | Upload audio; set volume slider; export WAV; confirm output opens and volume changes. |  |  |
| Video to Animated WebM | `/convert/video-to-gif` | MP4 or WEBM video | Animated WebM video | Upload video; set start and duration; export WebM; confirm UI does not claim GIF output. |  |  |
| Video Optimizer | `/convert/compress-video` | MP4 or WEBM video | Optimized WebM video | Upload video; set quality; optimize; confirm original/output sizes are accurate and output opens. |  |  |
| Convert Audio to WAV | `/convert/audio-converter` | MP3, WAV, OGG or M4A audio | WAV audio | Upload audio; convert to WAV; download result; confirm output opens. |  |  |

## Site-Wide Launch Checks

| Area | Manual test steps | Pass/Fail | Notes |
| --- | --- | --- | --- |
| Homepage | Open `/`; verify hero search, featured tools, stats, categories and popular tool sections render. |  |  |
| Tools index | Open `/tools`; search for an image tool and a PDF tool; test category filters. |  |  |
| Sitemap | Open `/sitemap.xml`; confirm static pages and every `/convert/[slug]` URL are listed. |  |  |
| Robots | Open `/robots.txt`; confirm crawling is allowed and sitemap URL is present. |  |  |
| Footer links | Click Privacy Policy, Terms of Service and Contact from the footer. |  |  |
| Internal links | Click representative tool cards from homepage, `/tools`, related tools and footer links. |  |  |
