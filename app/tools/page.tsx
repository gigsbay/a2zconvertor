import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolsBrowser from "@/components/tools/ToolsBrowser";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl">
              All Tools
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-slate-400">
              Browse all available A2ZConvertor tools. Search by format,
              category or task.
            </p>
          </div>

          <ToolsBrowser />
        </div>
      </section>

      <Footer />
    </main>
  );
}