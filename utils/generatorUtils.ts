const stopWords = new Set([
  "about", "after", "also", "and", "are", "but", "for", "from", "have",
  "into", "that", "the", "their", "this", "with", "your",
]);

export function extractKeywords(input: string, limit = 6) {
  return Array.from(
    new Set(
      input.toLowerCase().match(/[a-z0-9]+/g)?.filter(
        (word) => word.length > 2 && !stopWords.has(word)
      ) ?? []
    )
  ).slice(0, limit);
}

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function random(seed: number) {
  let state = seed || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleWithSeed<T>(items: T[], seedText: string) {
  const result = [...items];
  const next = random(hashSeed(seedText));
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(next() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

export function uniqueOutputs(items: string[], limit = items.length) {
  const seen = new Set<string>();
  return items
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter((item) => {
      const key = item.toLowerCase();
      if (!item || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

export function variedOutputs(
  items: string[],
  seedText: string,
  limit: number
) {
  const shuffled = shuffleWithSeed(uniqueOutputs(items), seedText);
  const usedOpeners = new Set<string>();
  const varied = shuffled.filter((item) => {
    const opener = item.toLowerCase().split(/\s+/).slice(0, 2).join(" ");
    if (usedOpeners.has(opener)) return false;
    usedOpeners.add(opener);
    return true;
  });
  return uniqueOutputs([...varied, ...shuffled], limit);
}

export function titleCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

export function hashtag(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function copySafeText(groups: string[][]) {
  return groups
    .filter((group) => group.length)
    .map((group) => group.join("\n"))
    .join("\n\n");
}
