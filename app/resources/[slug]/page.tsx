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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {

  const { slug } = await params;

  const article = articles.find(
    (item) => item.slug === slug
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
  };
}


export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  console.log("SLUG:", slug);
  console.log("ARTICLES:", articles);


  const article = articles.find(
    (item) => item.slug === slug
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
          author: {
            "@type": "Organization",
            name: "A2ZConvertor",
          },
        }}
      />


      <article className="mx-auto max-w-4xl px-6 py-16">

        <h1 className="text-4xl font-black">
          {article.title}
        </h1>

        <p className="mt-4 text-slate-400">
          {article.date} · {article.category}
        </p>


        <div className="prose prose-invert mt-10 max-w-none whitespace-pre-line">
          {article.content}
        </div>

      </article>


      <Footer />

    </main>
  );
}