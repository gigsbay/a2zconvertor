export type ResourcePage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string; bullets: string[] }[];
  toolSlugs: string[];
  faqs: { question: string; answer: string }[];
};

export const resourcePages: ResourcePage[] = [
  makeResource("best-free-pdf-tools", "Best Free PDF Tools for Everyday Tasks", "Compare useful free PDF tools for merging, splitting, compressing and organizing documents.", "The best PDF tool is the one that completes a specific task without making you install a large editor.", ["pdf-merge", "pdf-split", "compress-pdf", "organize-pdf"], ["Merge files before sharing", "Extract or delete pages", "Compress copies for email"]),
  makeResource("best-free-image-tools", "Best Free Image Tools for Quick Edits", "Find free browser tools for converting, compressing, resizing and cleaning images.", "Simple image tasks should be fast, clear and honest about output quality.", ["compress-image", "resize-image", "crop-image", "remove-image-metadata"], ["Convert common formats", "Prepare website images", "Remove embedded metadata"]),
  makeResource("best-pdf-compressor-tools", "Best PDF Compressor Tools and Trade-offs", "Understand browser, desktop and online PDF compression options before choosing a tool.", "PDF compression quality depends on whether a document is text, vector artwork or scanned images.", ["compress-pdf", "pdf-to-image", "pdf-merge"], ["Check whether text stays selectable", "Compare the real output size", "Keep an original copy"]),
  makeResource("best-tools-for-students", "Best Free File Tools for Students", "Useful browser tools for assignments, lecture notes, presentations and study workflows.", "Students often need to combine PDFs, resize images and clean up documents quickly on shared devices.", ["pdf-merge", "compress-pdf", "image-to-pdf", "text-summarizer"], ["Prepare assignment uploads", "Reduce attachment sizes", "Create quick study summaries"]),
  makeResource("best-tools-for-small-businesses", "Best Free File Tools for Small Businesses", "Practical browser tools for proposals, product images, invoices and everyday administration.", "Small teams can handle many routine file tasks without buying a large software suite for every device.", ["compress-image", "watermark-image", "pdf-merge", "add-page-numbers-pdf"], ["Prepare customer documents", "Optimise website images", "Brand and organise files"]),
  makeResource("how-to-compress-pdf-without-uploading", "How to Compress a PDF Without Uploading It", "Learn how browser-based PDF compression can reduce a file locally and what quality trade-offs to expect.", "Client-side compression keeps the processing workflow on your device after the page loads.", ["compress-pdf", "pdf-split", "delete-pdf-pages"], ["Choose an appropriate quality", "Review flattened text limitations", "Verify the output before deleting the original"]),
  makeResource("how-to-remove-photo-metadata", "How to Remove Photo Metadata in Your Browser", "Remove common EXIF details from photos with a browser canvas re-export.", "Photos can contain camera, date and location metadata that may not be needed when sharing.", ["remove-image-metadata", "image-color-picker", "compress-image"], ["Choose PNG or JPG output", "Understand that re-export can change size", "Check the cleaned download"]),
  makeResource("browser-based-file-conversion", "Browser-Based File Conversion: Privacy and Limits", "Understand how client-side file tools work, their privacy benefits and their performance limits.", "Modern browsers can decode, edit and rebuild many file formats without sending the file to an application server.", ["jpg-to-png", "pdf-merge", "audio-converter", "video-thumbnail-extractor"], ["Files can remain on-device", "Large files still use device memory", "Browser codec support varies"]),
  makeAIResource("free-ai-social-media-tools", "Best Free AI Social Media Tools for Creators", "Compare free AI tools for captions, hashtags, YouTube titles, bios and practical content planning.", "Free AI social media tools can remove the blank-page problem, but the strongest results still come from clear context and careful editing.", ["instagram-caption-generator", "tiktok-hashtag-generator", "youtube-title-generator", "social-media-bio-generator", "content-ideas-generator", "ai-hook-generator", "ai-carousel-post-generator", "ai-video-script-generator"], ["Match each tool to a specific publishing task", "Give Gemini a clear niche, audience and tone", "Treat output as an editable starting point", "Avoid claims that guarantee reach or virality"], [
    ["Are these social media AI tools free?", "Yes. The current allowance is five successful Gemini generations per day."],
    ["Will generated content increase my followers?", "No tool can guarantee followers, reach or engagement. Use the ideas to improve your workflow, then judge performance from real audience response."],
    ["Do I need an account or API key?", "No. The public tools use A2ZConvertor's limited owner-funded Gemini connection."],
  ]),
  makeAIResource("instagram-caption-ideas", "Instagram Caption Ideas: A Practical Free AI Guide", "Learn how to create stronger Instagram caption ideas for products, services, events and personal posts.", "A useful caption gives the reader context, a reason to care and a natural next step without sounding forced.", ["instagram-caption-generator", "hashtag-generator", "content-ideas-generator"], ["Start with the real subject of the post", "Choose a tone that matches the account", "Use short captions when the visual carries the story", "Edit facts and calls to action before posting"], [
    ["What should I enter in the caption generator?", "Describe the post, audience, purpose and preferred tone. Specific context produces more useful captions."],
    ["Should every Instagram caption include hashtags?", "No. Use only relevant hashtags when they genuinely help categorize the post."],
    ["Can AI write captions in my brand voice?", "It can suggest a starting point, but you should edit wording, facts and tone to match your real voice."],
  ]),
  makeAIResource("tiktok-hashtag-ideas", "TikTok Hashtag Ideas Without Viral Guarantees", "Build relevant TikTok hashtag groups for a niche, audience and content style without relying on fake viral promises.", "TikTok hashtags work best as accurate labels for the content, not as magic switches for distribution.", ["tiktok-hashtag-generator", "hashtag-generator", "content-ideas-generator"], ["Mix broad and niche descriptions", "Describe the intended audience accurately", "Remove tags that do not match the video", "Test performance without assuming causation"], [
    ["How many TikTok hashtags should I use?", "There is no universal number. Use a concise set that accurately describes the topic, format and intended audience."],
    ["Can a hashtag make a video viral?", "No. Distribution depends on many factors including the content itself and audience response."],
    ["Are generated hashtags current trends?", "The generator creates relevant suggestions from your input; it does not claim access to live trend rankings."],
  ]),
  makeAIResource("youtube-title-ideas", "YouTube Title Ideas That Stay Accurate", "Create clear YouTube title ideas for tutorials, reviews, beginner guides and list videos without misleading clickbait.", "A strong YouTube title tells the right viewer what the video offers while staying faithful to the actual content.", ["youtube-title-generator", "video-thumbnail-extractor", "content-ideas-generator"], ["Lead with the viewer's problem or outcome", "Keep important words easy to scan", "Avoid claims the video cannot support", "Compare title and thumbnail as one message"], [
    ["What makes a good YouTube title?", "It should be specific, readable and accurate about what the viewer will learn or see."],
    ["Should I always keep titles under a fixed length?", "No fixed number guarantees performance, but concise titles are easier to scan and less likely to be truncated."],
    ["Does the generator create clickbait?", "It is prompted to avoid misleading clickbait, but you remain responsible for checking every title against the video."],
  ]),
  makeAIResource("content-ideas-for-small-businesses", "Free AI Content Ideas for Small Businesses", "Plan useful educational, promotional and behind-the-scenes content ideas for a small business.", "Small-business content is easier to sustain when ideas come from customer questions, real work, useful examples and clear offers.", ["content-ideas-generator", "instagram-caption-generator", "social-media-bio-generator"], ["Turn common customer questions into educational posts", "Show process and proof without exposing private data", "Balance useful posts with clear offers", "Adapt each idea to one realistic platform format"], [
    ["Can AI create a complete content strategy?", "It can help brainstorm, but strategy still needs customer insight, positioning, resources and real performance data."],
    ["What business information should I avoid entering?", "Do not submit confidential customer, employee, financial or commercially sensitive information."],
    ["How do I make generated ideas less generic?", "Include your niche, audience, platform, goal and a specific customer problem."],
  ]),
  makeAIResource("ai-hook-ideas", "AI Hook Ideas for Posts, Videos and Articles", "Create stronger hooks for social posts, short videos, emails and articles without using fake urgency.", "A good hook gives the right person a reason to keep reading or watching, while staying honest about what the content actually delivers.", ["ai-hook-generator", "instagram-caption-generator", "youtube-title-generator", "content-ideas-generator"], ["Name the audience and topic clearly", "Choose a platform before writing hooks", "Remove exaggerated claims", "Test several angles before publishing"], [
    ["What makes an AI hook useful?", "Useful hooks are specific, accurate and matched to the reader or viewer. They should create interest without promising impossible outcomes."],
    ["Can I use these hooks for ads?", "Yes, but review them carefully for platform policy, accuracy and claims before running paid campaigns."],
    ["How many hooks should I test?", "Try several angles and keep the ones that match your content, audience and brand voice."],
  ]),
  makeAIResource("carousel-post-ideas", "Carousel Post Ideas for Creators and Small Businesses", "Plan educational and promotional carousel posts with slide-by-slide structure and editable copy.", "Carousel posts work best when each slide has one job: hook, explain, prove, summarize or invite the next action.", ["ai-carousel-post-generator", "ai-hook-generator", "instagram-caption-generator", "content-ideas-generator"], ["Start with one clear takeaway", "Keep each slide short", "Use the final slide for a natural CTA", "Edit examples to match your real offer"], [
    ["How many slides should a carousel include?", "There is no fixed rule, but 5-8 focused slides are often easier to read than a crowded long carousel."],
    ["Can AI design the carousel images?", "This tool writes the structure and copy. You still need to design the visuals in your preferred editor."],
    ["Should every carousel sell something?", "No. Educational and trust-building carousels can be useful even when the CTA is soft."],
  ]),
  makeAIResource("linkedin-post-ideas", "LinkedIn Post Ideas That Sound Professional", "Draft LinkedIn posts for lessons, announcements, founder updates and useful professional observations.", "A strong LinkedIn post usually combines a clear point, a human example and a useful takeaway for the reader.", ["ai-linkedin-post-generator", "ai-hook-generator", "blog-title-generator", "email-template-generator"], ["Choose a professional audience", "Keep the point focused", "Avoid inflated authority claims", "Add your real story or evidence"], [
    ["Can AI write in my LinkedIn voice?", "It can create a starting draft, but you should rewrite wording and examples so the post sounds like you."],
    ["Are story-style posts always better?", "No. Some updates need a concise professional format. Pick the style that fits the topic."],
    ["Can I use this for company pages?", "Yes, but verify claims, dates, product details and brand tone before publishing."],
  ]),
  makeAIResource("short-video-script-ideas", "Short Video Script Ideas for Reels, TikTok and Shorts", "Create short video scripts with hooks, on-screen text ideas and simple calls to action.", "Short videos need a quick opening, one clear message and an ending that tells the viewer what to do next.", ["ai-video-script-generator", "ai-hook-generator", "youtube-title-generator", "video-thumbnail-extractor"], ["Pick one message per video", "Match the script to a realistic duration", "Use on-screen text to reinforce key points", "Avoid unsupported performance claims"], [
    ["Does this tool edit or export video?", "No. It creates an editable script and on-screen text ideas. Use your video editor to record and publish."],
    ["Can it write scripts for any platform?", "It can adapt tone and structure for common short-video platforms, but you should edit for your exact format."],
    ["Will a script make my video go viral?", "No. The script is only a starting point; performance depends on execution, audience fit and platform factors."],

  ]),
  makeAIResource("free-ai-writing-tools", "Best Free AI Writing Tools for Everyday Drafts", "Use free AI writing tools for titles, emails, summaries and hashtags while keeping human review in the workflow.", "Free AI writing tools are most useful for first drafts, alternatives and structure, not for replacing factual checks or professional judgement.", ["blog-title-generator", "email-template-generator", "text-summarizer", "hashtag-generator"], ["Use titles to explore different angles", "Review email tone and every factual detail", "Check summaries against the original source", "Never submit confidential text without permission"], [
    ["Are AI writing tools accurate?", "They can make mistakes or omit context. Verify facts, names, figures and important claims."],
    ["Can I use the summarizer instead of reading the source?", "No. Use it as a review aid and confirm important meaning in the original."],
    ["Is my text used for AI generation?", "Yes. Submitted text is sent through A2ZConvertor's backend to Gemini for the requested generation."],
  ]),
];

function makeAIResource(
  slug: string,
  title: string,
  description: string,
  intro: string,
  toolSlugs: string[],
  bullets: string[],
  faqs: [string, string][]
): ResourcePage {
  return {
    slug, title, description, intro, toolSlugs,
    sections: [
      { heading: "Start with a clear brief", body: "Useful AI output begins with specific context. State the real topic, intended audience, platform and tone instead of relying on one vague keyword.", bullets: bullets.slice(0, 2) },
      { heading: "Turn suggestions into publishable work", body: "Read every result, remove repetition and rewrite anything that does not sound like you. Check names, facts, promises and calls to action before publishing.", bullets: bullets.slice(2) },
      { heading: "Use the free allowance wisely", body: "A2ZConvertor provides five successful Gemini generations per day. Combine your requirements into one thoughtful brief and use Regenerate only when a genuinely different result is needed.", bullets: ["No account or API key required", "General inputs are limited to 1,200 characters", "The text summarizer accepts up to 2,500 characters"] },
      { heading: "What AI cannot promise", body: "Generated ideas cannot guarantee reach, followers, rankings, sales or engagement. Results depend on execution, audience fit, timing, platform behaviour and many factors outside a writing tool.", bullets: ["Verify factual claims", "Protect confidential information", "Measure real outcomes"] },
    ],
    faqs: faqs.map(([question, answer]) => ({ question, answer })),
  };
}
function makeResource(
  slug: string,
  title: string,
  description: string,
  intro: string,
  toolSlugs: string[],
  bullets: string[]
): ResourcePage {
  return {
    slug,
    title,
    description,
    intro,
    sections: [
      { heading: "What to look for", body: "Choose tools that clearly state where processing happens, what format is downloaded and whether quality or editability changes.", bullets },
      { heading: "A practical workflow", body: "Start with a copy of the original file, use the narrowest tool for the task and inspect the result before sharing it.", bullets: ["Keep the original", "Use realistic settings", "Open the downloaded result"] },
    ],
    toolSlugs,
    faqs: [
      { question: "Are browser tools always free?", answer: "A2ZConvertor tools are free, while recommended third-party software may offer paid plans." },
      { question: "Do my files leave my device?", answer: "The linked A2ZConvertor tools are designed for browser-based processing where supported." },
      { question: "When should I use desktop software?", answer: "Desktop software may be better for very large files, batch workflows or advanced editing." },
    ],
  };
}

export function getResourcePage(slug: string) {
  return resourcePages.find((page) => page.slug === slug);
}
