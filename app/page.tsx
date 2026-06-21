import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PopularTools from "@/components/home/PopularTools";
import AIHomeCTA from "@/components/home/AIHomeCTA";
import WhyA2Z from "@/components/home/WhyA2Z";
import HomeFAQ from "@/components/home/HomeFAQ";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <PopularTools />
      <AIHomeCTA />
      <WhyA2Z />
      <HomeFAQ />
      <Footer />
    </main>
  );
}
