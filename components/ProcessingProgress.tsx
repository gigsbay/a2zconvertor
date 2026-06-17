type ProcessingProgressProps = {
  label: string;
  value: number;
};

export default function ProcessingProgress({
  label,
  value,
}: ProcessingProgressProps) {
  const percent = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-slate-300">{label}</span>
        <span className="font-bold text-blue-300">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
