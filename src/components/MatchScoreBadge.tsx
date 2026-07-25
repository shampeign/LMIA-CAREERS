// Shared match score badge component used across jobs, dashboard, and matches pages

interface MatchScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
  if (score >= 50) return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400";
  return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
}

function getScoreBorder(score: number): string {
  if (score >= 80) return "border-green-300 dark:border-green-700";
  if (score >= 50) return "border-amber-300 dark:border-amber-700";
  return "border-red-300 dark:border-red-700";
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
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={
              score >= 80
                ? "text-green-500"
                : score >= 50
                  ? "text-amber-500"
                  : "text-red-500"
            }
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-bold ${sizeClasses[size]}`}
          style={{ color: "currentColor" }}
        >
          <span
            className={
              score >= 80
                ? "text-green-700 dark:text-green-400"
                : score >= 50
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-red-700 dark:text-red-400"
            }
          >
            {score}%
          </span>
        </span>
      </div>
      {showLabel && (
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${color} ${borderColor}`}
        >
          {score >= 80 ? "Strong Match" : score >= 50 ? "Good Match" : "Low Match"}
        </span>
      )}
    </div>
  );
}

export function MatchBreakdownBar({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-gray-500 dark:text-gray-500">
          {Math.round(score)}/{max}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ${
            pct >= 80
              ? "bg-green-500"
              : pct >= 50
                ? "bg-amber-500"
                : "bg-red-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
