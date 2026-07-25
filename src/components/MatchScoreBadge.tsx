// Shared match score badge component used across jobs, dashboard, and matches pages

interface MatchScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-[#F0FDF4] text-[#16A34A]";
  if (score >= 50) return "bg-[#FFFBEB] text-[#D97706]";
  return "bg-[#FEF2F2] text-[#DC2626]";
}

function getScoreBorder(score: number): string {
  if (score >= 80) return "border-[#BBF7D0]";
  if (score >= 50) return "border-[#FDE68A]";
  return "border-[#FECACA]";
}

export function MatchScoreBadge({ score, size = "md", showLabel = false }: MatchScoreBadgeProps) {
  const sizeClasses = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
  };

  const strokeWidth = size === "sm" ? 3 : size === "lg" ? 4 : 3.5;
  const radius = size === "sm" ? 14 : size === "lg" ? 26 : 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = getScoreColor(score);
  const borderColor = getScoreBorder(score);

  return (
    <div className="relative inline-flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-[#F0F0F0]" />
          <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
            className={score >= 80 ? "text-[#16A34A]" : score >= 50 ? "text-[#D97706]" : "text-[#DC2626]"}
            style={{ transition: "stroke-dashoffset 0.6s ease" }} />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center font-bold ${sizeClasses[size]}`}>
          <span className={score >= 80 ? "text-[#16A34A]" : score >= 50 ? "text-[#D97706]" : "text-[#DC2626]"}>{score}%</span>
        </span>
      </div>
      {showLabel && (
        <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${color} ${borderColor}`}>
          {score >= 80 ? "Strong Match" : score >= 50 ? "Good Match" : "Low Match"}
        </span>
      )}
    </div>
  );
}

export function MatchBreakdownBar({ label, score, max }: { label: string; score: number; max: number }) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#4B5563]">{label}</span>
        <span className="text-[#9CA3AF]">{Math.round(score)}/{max}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#F0F0F0]">
        <div className={`h-1.5 rounded-full transition-all duration-500 ${pct >= 80 ? "bg-[#16A34A]" : pct >= 50 ? "bg-[#D97706]" : "bg-[#DC2626]"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
