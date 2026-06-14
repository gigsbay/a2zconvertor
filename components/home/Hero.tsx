export default function Hero() {
  return (
    <section className="px-6 py-28 text-center">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          100+ free online file tools coming soon
        </div>

        <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
          Convert, Compress & Edit Files Online
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-lg text-slate-400 md:text-xl">
          A fast, free and secure online toolkit for images, PDFs, videos,
          audio files and documents.
        </p>

        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl">
          <input
            placeholder="Search JPG to PNG, Compress PDF, MP4 to GIF..."
            className="w-full rounded-xl bg-slate-950 px-6 py-5 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
          <span className="rounded-full border border-white/10 px-4 py-2">
            JPG to PNG
          </span>
          <span className="rounded-full border border-white/10 px-4 py-2">
            Compress PDF
          </span>
          <span className="rounded-full border border-white/10 px-4 py-2">
            MP4 to GIF
          </span>
        </div>
      </div>
    </section>
  );
}