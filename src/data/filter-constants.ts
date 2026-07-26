// Shared filter/sort constants used by employer directory.
// Extracted here so both server and client code can reference them.

export const WAGE_RANGES = [
  { label: "Any Wage", min: 0, max: Infinity },
  { label: "Under $20/hr", min: 0, max: 19.99 },
  { label: "$20 – $29/hr", min: 20, max: 29.99 },
  { label: "$30 – $39/hr", min: 30, max: 39.99 },
  { label: "$40 – $49/hr", min: 40, max: 49.99 },
  { label: "$50+/hr", min: 50, max: Infinity },
];

export const APPROVAL_COUNT_RANGES = [
  { label: "Any", min: 0, max: Infinity },
  { label: "50+", min: 50, max: Infinity },
  { label: "100+", min: 100, max: Infinity },
  { label: "200+", min: 200, max: Infinity },
  { label: "300+", min: 300, max: Infinity },
];

export const APPROVAL_RATE_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "90%+", value: 90 },
  { label: "92%+", value: 92 },
  { label: "94%+", value: 94 },
  { label: "96%+", value: 96 },
];

export const SPONSORSHIP_SCORE_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "40+", value: 40 },
  { label: "50+", value: 50 },
  { label: "60+", value: 60 },
  { label: "70+", value: 70 },
];

export const PROGRAM_STREAMS = [
  { key: "highWage", label: "High Wage" },
  { key: "lowWage", label: "Low Wage" },
  { key: "prStream", label: "PR Stream" },
  { key: "agriculture", label: "Agriculture" },
  { key: "globalTalent", label: "Global Talent" },
  { key: "caregiver", label: "Caregiver" },
];

export const TEER_LEVELS = [0, 1, 2, 3, 4, 5];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "approvals", label: "Most Approvals" },
  { value: "approvalRate", label: "Highest Approval Rate" },
  { value: "sponsorshipScore", label: "Sponsorship Score" },
  { value: "avgWage", label: "Average Wage" },
  { value: "name", label: "Name (A–Z)" },
];

export function getSponsorshipColor(score: number | undefined): string {
  if (score === undefined) return "#9CA3AF";
  if (score >= 80) return "#16A34A";
  if (score >= 60) return "#2563EB";
  if (score >= 40) return "#F59E0B";
  return "#DC2626";
}

export function getApprovalRateColor(rate: number | undefined): string {
  if (rate === undefined) return "#9CA3AF";
  if (rate >= 95) return "#16A34A";
  if (rate >= 90) return "#2563EB";
  if (rate >= 85) return "#F59E0B";
  return "#DC2626";
}

export function formatApprovals(n: number | undefined): string {
  if (n === undefined) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export interface NocCodeEntry {
  code: string;
  name: string;
}
