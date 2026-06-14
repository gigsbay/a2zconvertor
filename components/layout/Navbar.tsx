export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="text-2xl font-black tracking-tight">
          A2Z<span className="text-blue-500">Convertor</span>
        </div>

        <div className="hidden gap-8 text-sm text-slate-300 md:flex">
          <span>Images</span>
          <span>PDF</span>
          <span>Video</span>
          <span>Audio</span>
          <span>AI Tools</span>
        </div>

        <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
          Search Tools
        </button>
      </div>
    </nav>
  );
}