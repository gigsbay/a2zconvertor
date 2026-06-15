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
      <Hero />
      <FeaturedTools />
      <Stats />

      <Categories />
      <PopularTools />
      <Footer />
    </main>
  );
}