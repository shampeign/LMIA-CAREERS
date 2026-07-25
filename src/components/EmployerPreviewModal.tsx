import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useEmployerPreview } from "~/components/EmployerPreviewContext";
import type { Employer } from "~/data/employers";

function getApprovalRateColor(rate: number | undefined): string {
  if (rate === undefined) return "#9CA3AF";
  if (rate >= 95) return "#16A34A";
  if (rate >= 90) return "#2563EB";
  if (rate >= 85) return "#F59E0B";
  return "#DC2626";
}

function getSponsorshipColor(score: number | undefined): string {
  if (score === undefined) return "#9CA3AF";
  if (score >= 80) return "#16A34A";
  if (score >= 60) return "#2563EB";
  if (score >= 40) return "#F59E0B";
  return "#DC2626";
}

function formatApprovals(n: number | undefined): string {
  if (n === undefined) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Circular gauge for sponsorship score
function SponsorshipGauge({ score }: { score: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const fill = (score / 100) * circumference;
  const color = getSponsorshipColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#F0F0F0"
          strokeWidth="5"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - fill}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span
        className="absolute text-[13px] font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

// Extract first 2 paragraphs from AI summary
function getFirstTwoParagraphs(summary: string): string {
  const parts = summary.split(/\n\n+/);
  return parts.slice(0, 2).join("\n\n");
}

export function EmployerPreviewModal() {
  const { isOpen, selectedEmployer, closeModal } = useEmployerPreview();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // Focus the modal
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !selectedEmployer) return null;

  const employer = selectedEmployer;
  const lmia = employer.lmia;
  const initials = getInitials(employer.name);
  const rateColor = getApprovalRateColor(lmia?.approvalRate);
  const scoreColor = getSponsorshipColor(lmia?.sponsorshipScore);
  const topOccupations = lmia?.topOccupations?.slice(0, 3) ?? [];
  const summary = employer.aiSummary || employer.description;
  const firstTwoParagraphs = getFirstTwoParagraphs(summary);

  // Program stream distribution
  const streams = lmia?.streams;
  const streamTotal = streams
    ? Object.values(streams).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview for ${employer.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 modal-backdrop"
        onClick={closeModal}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl modal-content focus:outline-none"
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 z-20 rounded-xl p-2 text-[#9CA3AF] hover:bg-[#F8F9FA] hover:text-[#0A0A0B] transition-colors"
          aria-label="Close preview"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex items-start gap-5">
            {/* Company initials logo */}
            <div
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-[20px] font-bold text-white"
              style={{ backgroundColor: scoreColor }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-[#0A0A0B]">
                {employer.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#F0F0F0] px-3 py-1 text-[13px] font-medium text-[#4B5563]">
                  {employer.industry}
                </span>
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#6B7280]">
                  {employer.province}
                </span>
                {lmia && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F0FDF4] px-3 py-1 text-[13px] font-medium text-[#16A34A]">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Verified LMIA Employer
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        {lmia && (
          <div className="mx-8 mt-6 grid grid-cols-4 gap-4 rounded-2xl bg-[#F8F9FA] p-5">
            {/* LMIA Approvals */}
            <div className="text-center">
              <p className="text-[24px] font-bold text-[#0A0A0B] leading-none">
                {formatApprovals(lmia.totalApprovals)}
              </p>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.03em] text-[#9CA3AF]">
                Approvals
              </p>
            </div>
            {/* Approval Rate */}
            <div className="text-center">
              <p
                className="text-[24px] font-bold leading-none"
                style={{ color: rateColor }}
              >
                {lmia.approvalRate.toFixed(1)}%
              </p>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.03em] text-[#9CA3AF]">
                Approval Rate
              </p>
            </div>
            {/* Sponsorship Score (gauge) */}
            <div className="flex flex-col items-center">
              <SponsorshipGauge score={lmia.sponsorshipScore} />
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.03em] text-[#9CA3AF]">
                Score
              </p>
            </div>
            {/* Avg Hourly Wage */}
            <div className="text-center">
              <p className="text-[24px] font-bold text-[#0A0A0B] leading-none">
                ${lmia.wageAverage.toFixed(2)}
              </p>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.03em] text-[#9CA3AF]">
                Avg Hourly Wage
              </p>
            </div>
          </div>
        )}

        {/* No LMIA data fallback */}
        {!lmia && (
          <div className="mx-8 mt-6 rounded-2xl bg-[#F8F9FA] p-5 text-center">
            <p className="text-[15px] text-[#9CA3AF]">
              LMIA data is being compiled for this employer. Check back soon.
            </p>
          </div>
        )}

        {/* Quick Overview */}
        <div className="p-8">
          {/* AI Summary */}
          <div className="mb-6">
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.05em] text-[#9CA3AF]">
              About
            </h3>
            <p className="text-[15px] leading-relaxed text-[#4B5563] whitespace-pre-line">
              {firstTwoParagraphs}
            </p>
          </div>

          {/* Top 3 Occupations */}
          {topOccupations.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.05em] text-[#9CA3AF]">
                Top Occupations Hired
              </h3>
              <div className="space-y-2">
                {topOccupations.map((occ, i) => (
                  <div
                    key={occ.nocCode}
                    className="flex items-center gap-3 rounded-xl bg-[#F8F9FA] px-4 py-3"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[14px] font-medium text-[#0A0A0B] flex-1 truncate">
                      {occ.nocName}
                    </span>
                    <span className="flex-shrink-0 rounded-md bg-[#E5E7EB] px-2 py-0.5 text-[11px] font-semibold text-[#4B5563]">
                      {occ.nocCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Program Stream Distribution */}
          {streams && streamTotal > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.05em] text-[#9CA3AF]">
                Program Stream Distribution
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(streams).map(([key, val]) => {
                  if (val === 0) return null;
                  const pct = ((val / streamTotal) * 100).toFixed(1);
                  const labels: Record<string, string> = {
                    highWage: "High Wage",
                    lowWage: "Low Wage",
                    prStream: "PR Stream",
                    agriculture: "Agriculture",
                    globalTalent: "Global Talent",
                    caregiver: "Caregiver",
                  };
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-[#4B5563]"
                    >
                      {labels[key] || key}
                      <span className="text-[11px] text-[#9CA3AF]">({pct}%)</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 border-t border-[#F0F0F0] pt-6">
            <Link
              to="/employers/$slug"
              params={{ slug: employer.slug }}
              onClick={closeModal}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              View Full Profile
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href={employer.careerPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-[15px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA]"
            >
              Visit Career Page
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <a
              href={employer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-[15px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA]"
            >
              Visit Website
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
