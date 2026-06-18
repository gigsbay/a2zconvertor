import { tools } from "@/data/tools";

type Tool = (typeof tools)[number];

const popularFallbackSlugs = [
  "compress-image",
  "jpg-to-png",
  "pdf-merge",
  "compress-pdf",
  "image-to-pdf",
  "text-case-converter",
];

export function getRelatedTools(currentTool: Tool, limit = 6) {
  const currentWords = getToolWords(currentTool);
  const candidates = tools.filter((tool) => tool.slug !== currentTool.slug);
  const selected: Tool[] = [];

  addUnique(
    selected,
    candidates
      .filter((tool) => tool.category === currentTool.category)
      .sort((a, b) => similarityScore(b, currentWords) - similarityScore(a, currentWords)),
    limit
  );

  addUnique(
    selected,
    candidates
      .filter(
        (tool) =>
          tool.category !== currentTool.category &&
          similarityScore(tool, currentWords) > 0
      )
      .sort((a, b) => similarityScore(b, currentWords) - similarityScore(a, currentWords)),
    limit
  );

  addUnique(
    selected,
    popularFallbackSlugs
      .map((slug) => candidates.find((tool) => tool.slug === slug))
      .filter((tool): tool is Tool => Boolean(tool)),
    limit
  );

  addUnique(selected, candidates, limit);

  return selected.slice(0, limit);
}

function getToolWords(tool: Tool) {
  return new Set(
    `${tool.slug} ${tool.name}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2 && !ignoredWords.has(word))
  );
}

function similarityScore(tool: Tool, currentWords: Set<string>) {
  return [...getToolWords(tool)].filter((word) => currentWords.has(word)).length;
}

function addUnique(target: Tool[], source: Tool[], limit: number) {
  for (const tool of source) {
    if (target.length >= limit) return;
    if (!target.some((item) => item.slug === tool.slug)) {
      target.push(tool);
    }
  }
}

const ignoredWords = new Set([
  "tool",
  "tools",
  "online",
  "converter",
  "convert",
  "free",
]);
