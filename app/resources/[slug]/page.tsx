import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";

import { articles } from "@/data/articles";
import { absoluteUrl } from "@/data/site";

export const dynamic = "force-static";


export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {

  const article = articles.find(
    (item) => item.slug === params.slug
  );

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | A2ZConvertor`,
    description: article.description,

    alternates: {
      canonical: absoluteUrl(`/resources/${article.slug}`),
    },

    openGraph: {
      title: `${article.title} | A2ZConvertor`,
      description: article.description,
      url: absoluteUrl(`/resources/${article.slug}`),
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: `${article.title} | A2ZConvertor`,
      description: article.description,
    },
  };
}



export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {

  const article = articles.find(
    (item) => item.slug === params.slug
  );


  if (!article) {
    notFound();
  }


  return (

    <main className="min-h-screen bg-slate-950 text-white">

      <Navbar />


      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",

          headline: article.title,

          description: article.description,

          datePublished: article.date,

          author: {
            "@type": "Organization",
            name: "A2ZConvertor",
          },

          publisher: {
            "@type": "Organization",
            name: "A2ZConvertor",
          },

          mainEntityOfPage: absoluteUrl(
            `/resources/${article.slug}`
          ),
        }}
      />


      <article className="mx-auto max-w-4xl px-6 py-16">

        <h1 className="text-4xl font-black leading-tight md:text-5xl">
          {article.title}
        </h1>


        <p className="mt-4 text-slate-400">
          {article.date} · {article.category}
        </p>


        <div
          className="
          prose 
          prose-invert 
          mt-10 
          max-w-none
          whitespace-pre-line
          "
        >
          {article.content}
        </div>


      </article>


      <Footer />

    </main>

  );
}