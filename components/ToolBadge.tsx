export type ToolBadgeKind = "free" | "ai" | "affiliate";

export const toolBadgeStyles: Record<ToolBadgeKind, { label: string; className: string }> = {
  free: {
    label: "FREE TOOL",
    className: "border-blue-300/30 bg-blue-400/10 text-blue-200",
  },
  ai: {
    label: "AI TOOL",
    className: "border-purple-300/30 bg-purple-400/10 text-purple-200",
  },
  affiliate: {
    label: "RECOMMENDED PARTNER",
    className: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  },
};

export default function ToolBadge({ kind, className = "" }: { kind: ToolBadgeKind; className?: string }) {
  const badge = toolBadgeStyles[kind];

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${badge.className} ${className}`}>
      {badge.label}
    </span>
  );
}