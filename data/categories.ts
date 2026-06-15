import { tools } from "./tools";

const categoryNames = [
  "Image Tools",
  "PDF Tools",
  "Video Tools",
  "Audio Tools",
  "Document Tools",
  "AI Tools",
];

export const categories = categoryNames.map((category) => ({
  name: category,
  slug: `/${category.toLowerCase().replace(/\s+/g, "-")}`,
  tools: tools.filter((tool) => tool.category === category).length,
}));