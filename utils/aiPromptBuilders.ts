const outputShapes: Record<string, string> = {
  "hashtag-generator": '{"broad":[],"niche":[],"intent":[],"branded":[]}',
  "blog-title-generator": '{"titles":[]}',
  "email-template-generator": '{"subjects":[],"body":"","shorterVersion":"","followUp":""}',
  "text-summarizer": '{"shortSummary":"","bulletSummary":[],"keyTakeaways":[]}',
  "instagram-caption-generator": '{"mainCaptions":[],"shortCaptions":[],"ctaLines":[],"hashtags":[]}',
  "tiktok-hashtag-generator": '{"broad":[],"niche":[],"contentStyle":[],"audience":[]}',
  "youtube-title-generator": '{"titles":[{"title":"","characterCount":0}]}',
  "social-media-bio-generator": '{"shortBio":"","professionalBio":"","creatorBio":"","punchyBio":"","ctaLine":""}',
  "content-ideas-generator": '{"educational":[],"entertaining":[],"promotional":[],"personalBehindTheScenes":[]}',
};

export function buildAIPrompt(toolSlug: string, inputs: Record<string, string | boolean>) {
  const shape = outputShapes[toolSlug];
  if (!shape) throw new Error("Unsupported AI tool.");
  return [
    "You are helping a user create practical, copy-ready content.",
    `Tool: ${toolSlug}.`,
    `User inputs: ${JSON.stringify(inputs)}.`,
    "Return valid JSON only, with no markdown fences or commentary.",
    `Use exactly this JSON shape: ${shape}.`,
    "Make every item specific to the supplied inputs, unique and non-repetitive.",
    "Do not promise virality, followers, reach, rankings, engagement, sales or other guaranteed results.",
    toolSlug === "text-summarizer"
      ? "Preserve the source meaning. Do not add facts, opinions or conclusions that are absent from the input."
      : "Keep suggestions useful, honest and ready for the user to edit.",
  ].join("\n");
}
