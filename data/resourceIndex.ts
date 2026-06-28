export type ResourceSummary = {
  slug: string;
  title: string;
  description: string;
};

export const resourceSummaries: ResourceSummary[] = [
  {
    slug: "best-free-pdf-tools",
    title: "Best Free PDF Tools for Everyday Tasks",
    description:
      "Compare useful free PDF tools for merging, splitting, compressing and organizing documents.",
  },
  {
    slug: "best-free-image-tools",
    title: "Best Free Image Tools for Quick Edits",
    description:
      "Find free browser tools for converting, compressing, resizing and cleaning images.",
  },
  {
    slug: "best-pdf-compressor-tools",
    title: "Best PDF Compressor Tools and Trade-offs",
    description:
      "Understand browser, desktop and online PDF compression options before choosing a tool.",
  },
  {
    slug: "best-tools-for-students",
    title: "Best Free File Tools for Students",
    description:
      "Useful browser tools for assignments, lecture notes, presentations and study workflows.",
  },
  {
    slug: "best-tools-for-small-businesses",
    title: "Best Free File Tools for Small Businesses",
    description:
      "Practical browser tools for proposals, product images, invoices and everyday administration.",
  },
  {
    slug: "how-to-compress-pdf-without-uploading",
    title: "How to Compress a PDF Without Uploading It",
    description:
      "Learn how browser-based PDF compression can reduce a file locally and what quality trade-offs to expect.",
  },
  {
    slug: "how-to-remove-photo-metadata",
    title: "How to Remove Photo Metadata in Your Browser",
    description:
      "Remove common EXIF details from photos with a browser canvas re-export.",
  },
  {
    slug: "browser-based-file-conversion",
    title: "Browser-Based File Conversion: Privacy and Limits",
    description:
      "Understand how client-side file tools work, their privacy benefits and their performance limits.",
  },
  {
    slug: "free-ai-social-media-tools",
    title: "Best Free AI Social Media Tools for Creators",
    description:
      "Compare free AI tools for captions, hashtags, YouTube titles, bios and practical content planning.",
  },
  {
    slug: "instagram-caption-ideas",
    title: "Instagram Caption Ideas: A Practical Free AI Guide",
    description:
      "Learn how to create stronger Instagram caption ideas for products, services, events and personal posts.",
  },
  {
    slug: "tiktok-hashtag-ideas",
    title: "TikTok Hashtag Ideas Without Viral Guarantees",
    description:
      "Build relevant TikTok hashtag groups for a niche, audience and content style without relying on fake viral promises.",
  },
  {
    slug: "youtube-title-ideas",
    title: "YouTube Title Ideas That Stay Accurate",
    description:
      "Create clear YouTube title ideas for tutorials, reviews, beginner guides and list videos without misleading clickbait.",
  },
  {
    slug: "content-ideas-for-small-businesses",
    title: "Free AI Content Ideas for Small Businesses",
    description:
      "Plan useful educational, promotional and behind-the-scenes content ideas for a small business.",
  },
  {
    slug: "ai-hook-ideas",
    title: "AI Hook Ideas for Posts, Videos and Articles",
    description:
      "Create stronger hooks for social posts, short videos, emails and articles without using fake urgency.",
  },
  {
    slug: "carousel-post-ideas",
    title: "Carousel Post Ideas for Creators and Small Businesses",
    description:
      "Plan educational and promotional carousel posts with slide-by-slide structure and editable copy.",
  },
  {
    slug: "linkedin-post-ideas",
    title: "LinkedIn Post Ideas That Sound Professional",
    description:
      "Draft LinkedIn posts for lessons, announcements, founder updates and useful professional observations.",
  },
  {
    slug: "short-video-script-ideas",
    title: "Short Video Script Ideas for Reels, TikTok and Shorts",
    description:
      "Create short video scripts with hooks, on-screen text ideas and simple calls to action.",
  },
  {
    slug: "free-ai-writing-tools",
    title: "Best Free AI Writing Tools for Everyday Drafts",
    description:
      "Use free AI writing tools for titles, emails, summaries and hashtags while keeping human review in the workflow.",
  },
  {
    slug: "how-to-write-better-ai-prompts-for-social-media",
    title: "How to Write Better AI Prompts for Social Media",
    description:
      "Learn practical prompt patterns for better AI captions, hooks, content ideas and social media drafts.",
  },
  {
    slug: "instagram-content-ideas-for-small-business",
    title: "Instagram Content Ideas for Small Business",
    description:
      "Plan practical Instagram posts for local businesses, service providers, shops and solo founders.",
  },
  {
    slug: "tiktok-content-ideas-for-beginners",
    title: "TikTok Content Ideas for Beginners",
    description:
      "Find beginner-friendly TikTok content ideas that focus on clarity, usefulness and realistic execution.",
  },
  {
    slug: "youtube-shorts-ideas-for-creators",
    title: "YouTube Shorts Ideas for Creators",
    description:
      "Plan YouTube Shorts ideas with hooks, titles and short scripts that stay accurate.",
  },
  {
    slug: "ai-ad-copy-examples",
    title: "AI Ad Copy Examples and Safer Prompt Ideas",
    description:
      "Use AI ad copy examples for social ads, landing pages and product offers without making fake claims.",
  },
  {
    slug: "product-description-examples",
    title: "Product Description Examples for Better Online Listings",
    description:
      "Learn simple product description patterns and use AI to draft editable product copy.",
  },
  {
    slug: "how-to-compress-pdf-for-email",
    title: "How to Compress a PDF for Email",
    description:
      "Reduce PDF file size for email attachments while understanding quality and text trade-offs.",
  },
  {
    slug: "how-to-merge-pdf-files-online",
    title: "How to Merge PDF Files Online",
    description:
      "Combine multiple PDFs into one document with a browser-based workflow.",
  },
  {
    slug: "how-to-convert-image-to-pdf",
    title: "How to Convert Image to PDF",
    description:
      "Turn JPG, PNG or WEBP images into a PDF for sharing, printing or uploading.",
  },
  {
    slug: "how-to-convert-webp-to-jpg",
    title: "How to Convert WEBP to JPG",
    description:
      "Convert WEBP images to JPG when a website, app or document workflow does not accept WEBP.",
  },
  {
    slug: "how-to-remove-image-metadata",
    title: "How to Remove Image Metadata Online",
    description:
      "Remove common EXIF and embedded image metadata with a browser canvas re-export.",
  },
  {
    slug: "best-free-online-file-converters",
    title: "Best Free Online File Converters for Everyday Workflows",
    description:
      "Compare free browser-based converters for images, PDFs, audio, video and creator workflows.",
  },
];

export function getResourceSummary(slug: string) {
  return resourceSummaries.find((resource) => resource.slug === slug);
}
