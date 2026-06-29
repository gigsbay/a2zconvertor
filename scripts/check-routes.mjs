import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const requiredFiles = [
  "app/sitemap.ts",
  "app/robots.ts",
  "app/api/ai/status/route.ts",
  "app/convert/[slug]/page.tsx",
  "app/resources/[slug]/page.tsx",
  "app/tools/page.tsx",
  "app/ai-tools/page.tsx",
  "app/pdf-tools/page.tsx",
  "app/image-tools/page.tsx",
  "app/video-tools/page.tsx",
  "app/audio-tools/page.tsx",
];

const requiredToolSlugs = [
  "png-to-jpg",
  "jpg-to-png",
  "webp-to-jpg",
  "compress-image",
  "resize-image",
  "compress-pdf",
  "hashtag-generator",
  "instagram-caption-generator",
  "ai-hook-generator",
  "ai-video-script-generator",
  "ai-ad-copy-generator",
];

const requiredResourceSlugs = [
  "how-to-compress-pdf-for-email",
  "ai-ad-copy-examples",
  "free-ai-social-media-tools",
  "free-ai-writing-tools",
  "best-free-pdf-tools",
  "best-pdf-compressor-tools",
  "ai-hook-ideas",
  "short-video-script-ideas",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing file: ${file}`);
}

const toolsSource = read("data/tools.ts");
for (const slug of requiredToolSlugs) {
  if (!toolsSource.includes(`slug: "${slug}"`)) failures.push(`Missing tool slug: ${slug}`);
}

const resourceIndex = read("data/resourceIndex.ts");
const resourcePages = read("data/resourcePages.ts");
for (const slug of requiredResourceSlugs) {
  if (!resourceIndex.includes(`slug: "${slug}"`) && !resourcePages.includes(`"${slug}"`)) {
    failures.push(`Missing resource slug: ${slug}`);
  }
}

if (failures.length > 0) {
  console.error("Route inventory check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Route inventory check passed.");