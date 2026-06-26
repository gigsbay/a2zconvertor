import { tools } from "./tools";

const categoryNames = Array.from(new Set(tools.map((tool) => tool.category)));

const categorySlugs: Record<string, string> = {
  "AI Creator Tools": "/ai-tools",
};

export const categories = categoryNames.map((category) => ({
  name: category,
  slug: categorySlugs[category] ?? `/${category.toLowerCase().replace(/\s+/g, "-")}`,
  tools: tools.filter((tool) => tool.category === category).length,
}));
