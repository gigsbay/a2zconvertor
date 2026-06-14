export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="/" className="text-2xl font-black tracking-tight">
          A2Z<span className="text-blue-500">Convertor</span>
        </a>

        <div className="hidden gap-8 text-sm text-slate-300 md:flex">
          <a href="/tools">All Tools</a>
          <a href="/image-tools">Images</a>
          <a href="/pdf-tools">PDF</a>
          <a href="/video-tools">Video</a>
          <a href="/audio-tools">Audio</a>
          <a href="/ai-tools">AI Tools</a>
        </div>

        <a
          href="/tools"
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white"
        >
          Search Tools
        </a>
      </div>
    </nav>
  );
}