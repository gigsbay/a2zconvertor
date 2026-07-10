export type BlogSummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
};

export const blogSummaries: BlogSummary[] = [
  {
    slug: "how-to-convert-jpg-to-png-online",
    title: "How to Convert JPG to PNG Online for Free",
    description: "Learn how to convert a JPG image to PNG online for free, when PNG is useful, and how to download a clean image file using A2ZConvertor.",
    category: "Image Conversion",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
  },
  {
    slug: "how-to-compress-images-for-email",
    title: "How to Compress Images for Email",
    description: "Learn how to reduce image file size before sending photos by email, without installing software or making the image difficult to view.",
    category: "Image Compression",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
  },
  {
    slug: "how-to-resize-images-for-instagram",
    title: "How to Resize Images for Instagram",
    description: "Learn how to resize images for Instagram posts, stories and profile pictures using a simple online image resizer.",
    category: "Social Images",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
  },
  {
    slug: "how-to-convert-pdf-to-image",
    title: "How to Convert PDF to Image Online",
    description: "Learn how to turn PDF pages into image files for previews, sharing, presentations, thumbnails and quick uploads.",
    category: "PDF Tools",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
  },
  {
    slug: "jpg-vs-png",
    title: "JPG vs PNG: Which Image Format Should You Use?",
    description: "Understand the difference between JPG and PNG, when to use each format, and how to convert between them online.",
    category: "Image Formats",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "8 min read",
  },
  {
    slug: "webp-vs-jpg",
    title: "WEBP vs JPG: Which Is Better for Websites?",
    description: "Compare WEBP and JPG for websites, speed, quality and compatibility, and learn how to convert between the two formats.",
    category: "Web Images",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "8 min read",
  },
  {
    slug: "how-to-create-a-favicon",
    title: "How to Create a Favicon for Your Website",
    description: "Learn what a favicon is, why your website needs one, and how to create a favicon from an image using an online favicon generator.",
    category: "Website Basics",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
  },
  {
    slug: "how-to-reduce-image-file-size",
    title: "How to Reduce Image File Size Without Losing Quality",
    description: "Learn practical ways to make image files smaller for websites, email, forms and social media without making them look bad.",
    category: "Image Optimization",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "8 min read",
  },
];

export const blogSlugs = blogSummaries.map((post) => post.slug);
