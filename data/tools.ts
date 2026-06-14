export const tools = [
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    title: "JPG to PNG Converter",
    description:
      "Convert JPG and JPEG images into PNG format online for free.",
    inputFormat: "jpeg",
    inputLabel: "JPG",
    outputFormat: "png",
    outputLabel: "PNG",
    category: "Image Tools",
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    title: "PNG to JPG Converter",
    description:
      "Convert PNG images into JPG format online for free.",
    inputFormat: "png",
    inputLabel: "PNG",
    outputFormat: "jpg",
    outputLabel: "JPG",
    category: "Image Tools",
  },
  {
    slug: "webp-to-jpg",
    name: "WEBP to JPG",
    title: "WEBP to JPG Converter",
    description:
      "Convert WEBP images into JPG format online for free.",
    inputFormat: "webp",
    inputLabel: "WEBP",
    outputFormat: "jpg",
    outputLabel: "JPG",
    category: "Image Tools",
  },
  {
    slug: "webp-to-png",
    name: "WEBP to PNG",
    title: "WEBP to PNG Converter",
    description:
      "Convert WEBP images into PNG format online for free.",
    inputFormat: "webp",
    inputLabel: "WEBP",
    outputFormat: "png",
    outputLabel: "PNG",
    category: "Image Tools",
  },
];

export const popularTools = tools;

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}