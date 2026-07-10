export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  keywords: string[];
  toolLinks: { label: string; href: string }[];
  relatedPosts?: string[];
  content: {
    intro: string[];
    sections: { heading: string; body: string[] }[];
    faq: { question: string; answer: string }[];
  };
};

type BlogPostSeed = Omit<BlogPost, "content"> & {
  audience: string;
  practicalUse: string;
  sectionHeadings: string[];
};

const seeds: BlogPostSeed[] = [
  {
    slug: "how-to-convert-jpg-to-png-online",
    title: "How to Convert JPG to PNG Online for Free",
    description: "Learn how to convert a JPG image to PNG online for free, when PNG is useful, and how to download a clean image file using A2ZConvertor.",
    category: "Image Conversion",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
    keywords: ["jpg to png", "convert jpg to png online", "free image converter", "png image"],
    toolLinks: [{ label: "JPG to PNG Converter", href: "/convert/jpg-to-png" }],
    relatedPosts: ["jpg-vs-png", "how-to-reduce-image-file-size", "webp-vs-jpg"],
    audience: "someone preparing an image for a website, project, upload form or design file",
    practicalUse: "create a PNG copy while keeping the original JPG safe",
    sectionHeadings: ["What is the difference between JPG and PNG?", "When should you convert JPG to PNG?", "How to convert JPG to PNG online", "Common use cases", "Tips before uploading your image", "Related tools"],
  },
  {
    slug: "how-to-compress-images-for-email",
    title: "How to Compress Images for Email",
    description: "Learn how to reduce image file size before sending photos by email, without installing software or making the image difficult to view.",
    category: "Image Compression",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
    keywords: ["compress images for email", "reduce image size", "email attachment size", "image compressor"],
    toolLinks: [{ label: "Compress Image", href: "/convert/compress-image" }],
    relatedPosts: ["how-to-reduce-image-file-size", "how-to-resize-images-for-instagram", "jpg-vs-png"],
    audience: "people sending photos, invoices, forms, job applications or school projects by email",
    practicalUse: "make images easier to attach and download without making them hard to view",
    sectionHeadings: ["Why large images cause email problems", "What image compression does", "How to compress images for email", "Best file size for email attachments", "When to resize instead of compress", "Related tools"],
  },
  {
    slug: "how-to-resize-images-for-instagram",
    title: "How to Resize Images for Instagram",
    description: "Learn how to resize images for Instagram posts, stories and profile pictures using a simple online image resizer.",
    category: "Social Images",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
    keywords: ["resize image for instagram", "instagram image size", "resize photo online", "instagram post size"],
    toolLinks: [{ label: "Resize Image", href: "/convert/resize-image" }],
    relatedPosts: ["how-to-compress-images-for-email", "how-to-reduce-image-file-size", "jpg-vs-png"],
    audience: "creators, students, small businesses and casual users posting from mobile or desktop",
    practicalUse: "prepare cleaner Instagram posts, stories and profile images before upload",
    sectionHeadings: ["Why image size matters on Instagram", "Common Instagram image sizes", "How to resize an image online", "Tips to avoid blurry uploads", "When to crop instead of resize", "Related tools"],
  },
  {
    slug: "how-to-convert-pdf-to-image",
    title: "How to Convert PDF to Image Online",
    description: "Learn how to turn PDF pages into image files for previews, sharing, presentations, thumbnails and quick uploads.",
    category: "PDF Tools",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
    keywords: ["pdf to image", "convert pdf to image online", "pdf page to jpg", "pdf preview"],
    toolLinks: [{ label: "PDF to Image", href: "/convert/pdf-to-image" }],
    relatedPosts: ["how-to-compress-images-for-email", "how-to-reduce-image-file-size", "jpg-vs-png"],
    audience: "people who need a PDF page preview for sharing, slides, thumbnails or quick uploads",
    practicalUse: "turn one or more PDF pages into image files that are easier to preview and share",
    sectionHeadings: ["Why convert PDF pages to images?", "Common situations where PDF to image helps", "How to convert PDF to image online", "Image quality tips", "Privacy and file handling note", "Related tools"],
  },
  {
    slug: "jpg-vs-png",
    title: "JPG vs PNG: Which Image Format Should You Use?",
    description: "Understand the difference between JPG and PNG, when to use each format, and how to convert between them online.",
    category: "Image Formats",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "8 min read",
    keywords: ["jpg vs png", "jpg or png", "image format comparison", "png to jpg"],
    toolLinks: [{ label: "JPG to PNG Converter", href: "/convert/jpg-to-png" }, { label: "PNG to JPG Converter", href: "/convert/png-to-jpg" }],
    relatedPosts: ["how-to-convert-jpg-to-png-online", "webp-vs-jpg", "how-to-reduce-image-file-size"],
    audience: "normal users choosing a format for photos, websites, documents and social media",
    practicalUse: "decide whether JPG or PNG fits the job before converting files",
    sectionHeadings: ["Quick answer", "What is JPG?", "What is PNG?", "JPG vs PNG comparison", "Which one is better for photos?", "Which one is better for logos and graphics?", "How to convert between JPG and PNG", "Related tools"],
  },
  {
    slug: "webp-vs-jpg",
    title: "WEBP vs JPG: Which Is Better for Websites?",
    description: "Compare WEBP and JPG for websites, speed, quality and compatibility, and learn how to convert between the two formats.",
    category: "Web Images",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "8 min read",
    keywords: ["webp vs jpg", "webp or jpg", "website image format", "jpg to webp"],
    toolLinks: [{ label: "WEBP to JPG Converter", href: "/convert/webp-to-jpg" }, { label: "JPG to WEBP Converter", href: "/convert/jpg-to-webp" }],
    relatedPosts: ["jpg-vs-png", "how-to-reduce-image-file-size", "how-to-compress-images-for-email"],
    audience: "bloggers, website owners, developers and small businesses improving site speed",
    practicalUse: "choose between faster web images and broader file compatibility",
    sectionHeadings: ["Quick answer", "What is WEBP?", "What is JPG?", "WEBP vs JPG for websites", "Compatibility considerations", "When to convert WEBP to JPG", "When to convert JPG to WEBP", "Related tools"],
  },
  {
    slug: "how-to-create-a-favicon",
    title: "How to Create a Favicon for Your Website",
    description: "Learn what a favicon is, why your website needs one, and how to create a favicon from an image using an online favicon generator.",
    category: "Website Basics",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "7 min read",
    keywords: ["create favicon", "favicon generator", "website icon", "favicon from image"],
    toolLinks: [{ label: "Favicon Generator", href: "/convert/favicon-generator" }],
    relatedPosts: ["jpg-vs-png", "how-to-convert-jpg-to-png-online", "webp-vs-jpg"],
    audience: "someone building a website, blog, portfolio or small business site",
    practicalUse: "create a simple browser tab icon that makes a site feel finished",
    sectionHeadings: ["What is a favicon?", "Why favicons matter", "What image should you use?", "How to create a favicon online", "Favicon design tips", "Where favicons appear", "Related tools"],
  },
  {
    slug: "how-to-reduce-image-file-size",
    title: "How to Reduce Image File Size Without Losing Quality",
    description: "Learn practical ways to make image files smaller for websites, email, forms and social media without making them look bad.",
    category: "Image Optimization",
    publishedAt: "2026-07-09",
    updatedAt: "2026-07-10",
    readingTime: "8 min read",
    keywords: ["reduce image file size", "make image smaller", "compress image without losing quality", "image optimization"],
    toolLinks: [{ label: "Compress Image", href: "/convert/compress-image" }],
    relatedPosts: ["how-to-compress-images-for-email", "how-to-resize-images-for-instagram", "webp-vs-jpg"],
    audience: "people dealing with upload limits, slow websites, email attachments and online forms",
    practicalUse: "make image files smaller while keeping the result clear enough for real use",
    sectionHeadings: ["Why image file size matters", "Compress vs resize: what is the difference?", "How to reduce image file size online", "Choosing the right image format", "Tips to keep image quality clear", "Related tools"],
  },
];

export const blogPosts: BlogPost[] = seeds.map((seed) => ({
  ...seed,
  content: buildContent(seed),
}));

function buildContent(seed: BlogPostSeed): BlogPost["content"] {
  return {
    intro: buildIntro(seed),
    sections: seed.sectionHeadings.map((heading) => ({ heading, body: bodyFor(seed, heading) })),
    faq: faqFor(seed),
  };
}

function buildIntro(seed: BlogPostSeed) {
  return [
    `${seed.title.replace(/:.*$/, "")} is a small task that can save time when you are ${seed.audience}. The right file format or file size makes uploads smoother, emails lighter and finished work easier to share.`,
    `This guide keeps things practical. You will learn when the task is useful, what to check before changing a file, and how to use A2ZConvertor to ${seed.practicalUse}. Keep your original file as a backup, then download a clean copy for the job you are doing.`
  ];
}

function bodyFor(seed: BlogPostSeed, heading: string) {
  const toolNames = seed.toolLinks.map((tool) => tool.label).join(" or ");
  const firstTool = seed.toolLinks[0]?.label ?? "the relevant A2ZConvertor tool";

  if (heading === "Quick answer") {
    return [
      `The quick answer is to choose the format that fits where the file will be used. For everyday photos and broad compatibility, JPG is usually simple. For crisp graphics, transparent assets or screenshots, PNG can be better. For modern websites, WEBP can reduce file size while keeping good visual quality.`,
      `If a platform asks for a specific format, follow that requirement first. If you are optimizing for speed, compare file size and visual quality before replacing the original.`
    ];
  }

  if (heading.includes("difference between JPG and PNG")) {
    return [
      "JPG is designed mainly for photos and realistic images. It keeps files smaller by simplifying some image data, which is usually fine for camera photos, product shots and everyday sharing.",
      "PNG is often better for screenshots, logos, diagrams and images with text or sharp edges. It can also support transparency. Converting JPG to PNG creates a PNG copy, but it does not restore detail that was missing in the original JPG."
    ];
  }

  if (heading.includes("When should you convert JPG to PNG")) {
    return [
      "Convert JPG to PNG when a website, school portal, design app or document workflow specifically asks for PNG. It is also useful when you want a format that handles crisp graphics and screenshots well.",
      "Do not expect every PNG to be smaller. A photo converted from JPG to PNG may become larger. If your goal is a lighter file, compression or WEBP may be a better next step."
    ];
  }

  if (heading.includes("large images cause email")) {
    return [
      "Phone and camera photos are often much larger than an email recipient needs. A few full-size photos can make a message slow to upload, slow to download or too large for the recipient's mailbox.",
      "Compression is helpful for job applications, invoices, school work, scanned forms and quick photo sharing. The aim is not to make the image tiny at any cost; it is to keep the file practical while preserving the important details."
    ];
  }

  if (heading.includes("image compression does")) {
    return [
      "Image compression reduces file data so the image takes less space. With JPG and WEBP files, this usually means balancing file size against visible quality.",
      "A moderate compression level often looks fine for email and online forms. Very strong compression can create rough edges, blocky areas or fuzzy text, so always open the compressed file once before sending it."
    ];
  }

  if (heading.includes("Instagram")) {
    return [
      "Instagram displays images in fixed shapes across feeds, profiles, stories and reels covers. If your image does not fit the space, Instagram may crop important details or soften the final upload.",
      "Resize a copy before posting so you control the final dimensions. For text graphics, product posts and profile pictures, leave padding around the subject so nothing important is cut off."
    ];
  }

  if (heading.includes("Common Instagram image sizes")) {
    return [
      "A common square post size is 1080 by 1080 pixels. Portrait feed posts often work well around 1080 by 1350 pixels, while stories and reels covers commonly use 1080 by 1920 pixels.",
      "Sizes can change over time, but the principle stays the same: prepare the image for the place it will appear. If the image is the wrong shape, crop first rather than stretching it."
    ];
  }

  if (heading.includes("PDF")) {
    return [
      "PDF is great for keeping a document together, but an image is often easier when you only need a preview. You might need one page for a presentation, a thumbnail, a quick message or an upload form that does not accept PDFs.",
      "When converting PDF pages, check readability after download. Small text, scanned pages and detailed tables need a closer look before you send or publish the image."
    ];
  }

  if (heading.includes("Privacy")) {
    return [
      "Treat personal documents carefully. Convert and share only the pages you actually need, especially if the PDF contains addresses, signatures, ID numbers or financial details.",
      "After converting, open the image and make sure it does not reveal extra information around the edges or on pages you did not mean to share."
    ];
  }

  if (heading.includes("What is JPG")) {
    return [
      "JPG is a familiar photo format supported by phones, cameras, websites, email systems and document editors. It is popular because it can keep photo files reasonably small.",
      "The tradeoff is lossy compression. JPG is excellent for final photo copies, but it is not always ideal for logos, screenshots or graphics with small text."
    ];
  }

  if (heading.includes("What is PNG")) {
    return [
      "PNG is often used for screenshots, logos, icons, diagrams and images where sharp edges matter. It can preserve crisp lines and can support transparency.",
      "PNG files may be larger than JPG files, especially for photos. Use it when clarity, transparency or compatibility with a PNG-only workflow matters more than the smallest possible file."
    ];
  }

  if (heading.includes("WEBP")) {
    return [
      "WEBP is designed for the web and can often create smaller files than JPG at similar visible quality. That can help image-heavy pages load faster for visitors.",
      "JPG is still useful because it works almost everywhere. If you are sending images to clients, uploading to older systems or using simple office workflows, JPG may avoid compatibility problems."
    ];
  }

  if (heading.includes("favicon")) {
    return [
      "A favicon is the small icon shown in browser tabs, bookmarks, history lists and sometimes search previews. It helps visitors recognize your website when several tabs are open.",
      "Use a simple square image with strong contrast. A logo mark, initial or simple symbol usually works better than a detailed photo or a full business name."
    ];
  }

  if (heading.includes("file size matters") || heading.includes("Compress vs resize")) {
    return [
      "Large images can slow websites, fail upload limits and make emails awkward. Smaller files are easier to send and faster to load, but they still need to be clear enough for the purpose.",
      "Compression reduces file data. Resizing changes pixel dimensions. If an image is physically huge, resize it first. If the dimensions are already right, compression is usually the better first step."
    ];
  }

  if (heading.includes("How to")) {
    return [
      `Open ${firstTool}, upload your file and download the new copy when the browser finishes processing. Keep the original file untouched until you have checked that the output looks right.`,
      `For important work, rename the downloaded file clearly and preview it before sending, submitting or publishing it. If the output is too large, blurry or the wrong shape, go back to the original and adjust the format, compression or dimensions.`
    ];
  }

  if (heading.includes("Related tools")) {
    return [
      `The most relevant tool for this guide is ${toolNames}. You can also browse all A2ZConvertor tools if you need to resize, compress, crop or convert the file in another way.`,
      "Related guides at the bottom of this page explain nearby decisions, such as choosing between formats, preparing images for email or reducing file size for websites and forms."
    ];
  }

  return [
    `For ${seed.audience}, this step is mostly about choosing the right output for the destination. Think about whether the file needs to be smaller, sharper, easier to upload or easier for someone else to open.`,
    `Use ${toolNames} when you are ready to create a clean copy. A quick preview after download is worth it, because it catches quality, size and formatting issues before the file reaches someone else.`
  ];
}

function faqFor(seed: BlogPostSeed) {
  const firstTool = seed.toolLinks[0]?.label ?? "A2ZConvertor";
  return [
    { question: `Can I use ${firstTool} without installing software?`, answer: `Yes. ${firstTool} is available through A2ZConvertor in the browser for quick everyday file tasks.` },
    { question: "Should I keep my original file?", answer: "Yes. Keep the original until you have checked the downloaded copy and know it works for your upload, email or website." },
    { question: "Will the result always be smaller?", answer: "Not always. Some conversions improve compatibility rather than file size. If size matters, use compression or resizing after checking the output." },
    { question: "How do I know the output is good enough?", answer: "Open the downloaded file and check the important details, such as text, faces, edges, logos or document numbers." },
    { question: "Where should I go next?", answer: "Use the related tools and related guides on this page, or browse the full tools directory for other file conversion and optimization tasks." },
  ];
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const preferred = post.relatedPosts
    ?.map((slug) => getBlogPost(slug))
    .filter((related): related is BlogPost => Boolean(related)) ?? [];
  const fallback = blogPosts.filter(
    (candidate) => candidate.slug !== post.slug && !preferred.some((related) => related.slug === candidate.slug),
  );
  return [...preferred, ...fallback].slice(0, limit);
}
