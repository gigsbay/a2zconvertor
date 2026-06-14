import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedTools from "@/components/home/FeaturedTools";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import PopularTools from "@/components/home/PopularTools";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "A2ZConvertor",
      url: "https://a2zconvertor.co.uk",
      description:
        "Free online image conversion, compression and resizing tools.",
      publisher: {
        "@type": "Organization",
        name: "A2ZConvertor",
        url: "https://a2zconvertor.co.uk",
      },
    }),
  }}
/>
      <Hero />

      <FeaturedTools />
      <Stats />

      <Categories />
      <PopularTools />

      <Footer />
    </main>
  );
}