import { tools } from "./tools";

const categoryNames = Array.from(new Set(tools.map((tool) => tool.category)));

export const categories = categoryNames.map((category) => ({
  name: category,
  slug: `/${category.toLowerCase().replace(/\s+/g, "-")}`,
  tools: tools.filter((tool) => tool.category === category).length,
}));
