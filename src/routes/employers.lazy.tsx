import { Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { getEmployers } from "~/server/employers";
import type { Employer } from "~/data/employers";
import type { EmployerLMIA } from "~/data/employer-lmia";
import { useEmployerPreview } from "~/components/EmployerPreviewContext";
import {
  WAGE_RANGES,
  APPROVAL_COUNT_RANGES,
  APPROVAL_RATE_OPTIONS,
  SPONSORSHIP_SCORE_OPTIONS,
  PROGRAM_STREAMS,
  TEER_LEVELS,
  SORT_OPTIONS,
  getSponsorshipColor,
  getApprovalRateColor,
  formatApprovals,
  type NocCodeEntry,
} from "~/data/filter-constants";

// ── Static lookup lists (not from DB — these are UI labels) ──

const provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"] as const;

const industries = [
  "Food Processing",
  "Oil & Gas",
  "Technology",
  "Construction",
  "Agriculture",
  "Mining",
  "Manufacturing",
  "Transportation",
  "Retail",
  "Finance",
  "Telecommunications",
] as const;

// ── Helper: collect all unique NOC codes from loaded employers ──

function buildNocCodeList(employers: Employer[]): NocCodeEntry[] {
  const seen = new Set<string>();
  const result: NocCodeEntry[] = [];
  for (const e of employers) {
    for (const occ of e.lmia?.topOccupations ?? []) {
      if (!seen.has(occ.nocCode)) {
        seen.add(occ.nocCode);
        result.push({ code: occ.nocCode, name: occ.nocName });
      }
    }
  }
  result.sort((a, b) => a.code.localeCompare(b.code));
  return result;
}

const streamLabels: Record<string, string> = {
  highWage: "High Wage",
  lowWage: "Low Wage",
  prStream: "PR Stream",
  agriculture: "Agriculture",
  globalTalent: "Global Talent",
  caregiver: "Caregiver",
};

const teerLabels: Record<number, string> = {
  0: "TEER 0 — Management",
  1: "TEER 1",
  2: "TEER 2",
  3: "TEER 3",
  4: "TEER 4",
  5: "TEER 5",
};

// ── Component ──────────────────────────────────────────────

export default function EmployerDirectory() {
  const { openModal } = useEmployerPreview();

  // Data
  const [allEmployers, setAllEmployers] = useState<Employer[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Basic filters
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // LMIA filters
  const [nocSearch, setNocSearch] = useState("");
  const [selectedNocCode, setSelectedNocCode] = useState("");
  const [wageRangeIdx, setWageRangeIdx] = useState(0);
  const [approvalCountIdx, setApprovalCountIdx] = useState(0);
  const [approvalRateIdx, setApprovalRateIdx] = useState(0);
  const [sponsorshipScoreIdx, setSponsorshipScoreIdx] = useState(0);
  const [selectedStreams, setSelectedStreams] = useState<Set<string>>(new Set());
  const [selectedTeerLevels, setSelectedTeerLevels] = useState<Set<number>>(new Set());

  // UI state
  const [sortBy, setSortBy] = useState("relevance");
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [nocSuggestionsOpen, setNocSuggestionsOpen] = useState(false);

  const nocInputRef = useRef<HTMLInputElement>(null);
  const nocDropdownRef = useRef<HTMLDivElement>(null);

  // Load data
  useEffect(() => {
    getEmployers().then((data) => {
      setAllEmployers(data);
      setDataLoading(false);
    }).catch(() => {
      setDataLoading(false);
    });
  }, []);

  // Simulated initial loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!dataLoading) {
      setLoading(false);
    }
  }, [dataLoading]);

  // Close NOC suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        nocDropdownRef.current &&
        !nocDropdownRef.current.contains(e.target as Node) &&
        nocInputRef.current &&
        !nocInputRef.current.contains(e.target as Node)
      ) {
        setNocSuggestionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Compute NOC suggestions
  const allNocCodes = useMemo(() => buildNocCodeList(allEmployers), [allEmployers]);
  const nocSuggestions = useMemo(() => {
    if (!nocSearch) return allNocCodes.slice(0, 15);
    const q = nocSearch.toLowerCase();
    return allNocCodes
      .filter(
        (n) =>
          n.code.toLowerCase().includes(q) || n.name.toLowerCase().includes(q),
      )
      .slice(0, 15);
  }, [nocSearch, allNocCodes]);

  // Count active LMIA filters
  const activeLmiaFilterCount = useMemo(() => {
    let count = 0;
    if (selectedNocCode) count++;
    if (wageRangeIdx > 0) count++;
    if (approvalCountIdx > 0) count++;
    if (approvalRateIdx > 0) count++;
    if (sponsorshipScoreIdx > 0) count++;
    if (selectedStreams.size > 0) count++;
    if (selectedTeerLevels.size > 0) count++;
    return count;
  }, [
    selectedNocCode,
    wageRangeIdx,
    approvalCountIdx,
    approvalRateIdx,
    sponsorshipScoreIdx,
    selectedStreams,
    selectedTeerLevels,
  ]);

  const hasBasicFilters = search || selectedProvince || selectedIndustry;
  const hasAnyFilter = hasBasicFilters || activeLmiaFilterCount > 0;

  // Filtering
  const filtered = useMemo(() => {
    const wageRange = WAGE_RANGES[wageRangeIdx];
    const approvalRange = APPROVAL_COUNT_RANGES[approvalCountIdx];
    const approvalRateMin = APPROVAL_RATE_OPTIONS[approvalRateIdx].value;
    const sponsorshipMin = SPONSORSHIP_SCORE_OPTIONS[sponsorshipScoreIdx].value;

    return allEmployers.filter((e) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.industry.toLowerCase().includes(q) ||
        e.province.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q);

      const matchesProvince =
        !selectedProvince || e.province === selectedProvince;
      const matchesIndustry =
        !selectedIndustry || e.industry === selectedIndustry;

      // NOC code filter
      let matchesNoc = true;
      if (selectedNocCode) {
        matchesNoc =
          !!e.lmia?.topOccupations?.some((occ) =>
            occ.nocCode.includes(selectedNocCode),
          );
      }

      // Wage range filter
      let matchesWage = true;
      if (wageRangeIdx > 0 && e.lmia) {
        matchesWage =
          e.lmia.wageAverage >= wageRange.min &&
          e.lmia.wageAverage <= wageRange.max;
      } else if (wageRangeIdx > 0 && !e.lmia) {
        matchesWage = false;
      }

      // Approval count filter
      let matchesApprovalCount = true;
      if (approvalCountIdx > 0 && e.lmia) {
        matchesApprovalCount =
          e.lmia.totalApprovals >= approvalRange.min &&
          e.lmia.totalApprovals <= approvalRange.max;
      } else if (approvalCountIdx > 0 && !e.lmia) {
        matchesApprovalCount = false;
      }

      // Approval rate filter
      let matchesApprovalRate = true;
      if (approvalRateMin > 0 && e.lmia) {
        matchesApprovalRate = e.lmia.approvalRate >= approvalRateMin;
      } else if (approvalRateMin > 0 && !e.lmia) {
        matchesApprovalRate = false;
      }

      // Sponsorship score filter
      let matchesSponsorship = true;
      if (sponsorshipMin > 0 && e.lmia) {
        matchesSponsorship = e.lmia.sponsorshipScore >= sponsorshipMin;
      } else if (sponsorshipMin > 0 && !e.lmia) {
        matchesSponsorship = false;
      }

      // Program stream filter
      let matchesStream = true;
      if (selectedStreams.size > 0 && e.lmia) {
        matchesStream = Array.from(selectedStreams).some((streamKey) => {
          const val = e.lmia!.streams[streamKey as keyof EmployerLMIA["streams"]];
          return typeof val === "number" && val > 0;
        });
      } else if (selectedStreams.size > 0 && !e.lmia) {
        matchesStream = false;
      }

      // TEER level filter
      let matchesTeer = true;
      if (selectedTeerLevels.size > 0 && e.lmia) {
        matchesTeer = e.lmia.topOccupations.some((occ) =>
          selectedTeerLevels.has(occ.teerLevel),
        );
      } else if (selectedTeerLevels.size > 0 && !e.lmia) {
        matchesTeer = false;
      }

      return (
        matchesSearch &&
        matchesProvince &&
        matchesIndustry &&
        matchesNoc &&
        matchesWage &&
        matchesApprovalCount &&
        matchesApprovalRate &&
        matchesSponsorship &&
        matchesStream &&
        matchesTeer
      );
    });
  }, [
    allEmployers,
    search,
    selectedProvince,
    selectedIndustry,
    selectedNocCode,
    wageRangeIdx,
    approvalCountIdx,
    approvalRateIdx,
    sponsorshipScoreIdx,
    selectedStreams,
    selectedTeerLevels,
  ]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "approvals":
        arr.sort(
          (a, b) => (b.lmia?.totalApprovals ?? -1) - (a.lmia?.totalApprovals ?? -1),
        );
        break;
      case "approvalRate":
        arr.sort(
          (a, b) =>
            (b.lmia?.approvalRate ?? -1) - (a.lmia?.approvalRate ?? -1),
        );
        break;
      case "sponsorshipScore":
        arr.sort(
          (a, b) =>
            (b.lmia?.sponsorshipScore ?? -1) -
            (a.lmia?.sponsorshipScore ?? -1),
        );
        break;
      case "avgWage":
        arr.sort(
          (a, b) => (b.lmia?.wageAverage ?? -1) - (a.lmia?.wageAverage ?? -1),
        );
        break;
      case "name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return arr;
  }, [filtered, sortBy]);

  const displayed = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const clearAllFilters = () => {
    setSearch("");
    setSelectedProvince("");
    setSelectedIndustry("");
    setNocSearch("");
    setSelectedNocCode("");
    setWageRangeIdx(0);
    setApprovalCountIdx(0);
    setApprovalRateIdx(0);
    setSponsorshipScoreIdx(0);
    setSelectedStreams(new Set());
    setSelectedTeerLevels(new Set());
    setSortBy("relevance");
    setVisibleCount(9);
  };

  const toggleStream = (key: string) => {
    setSelectedStreams((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setVisibleCount(9);
  };

  const toggleTeer = (level: number) => {
    setSelectedTeerLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
    setVisibleCount(9);
  };

  // ── Filter Panel (reusable) ──────────────────────────────

  const FilterPanel = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      {/* NOC Code */}
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
          NOC Code
        </label>
        <div className="relative">
          <input
            ref={isMobile ? undefined : nocInputRef}
            type="text"
            placeholder="Search by NOC code (e.g. 7511, 6322)..."
            value={nocSearch}
            onChange={(e) => {
              setNocSearch(e.target.value);
              setSelectedNocCode("");
              setNocSuggestionsOpen(true);
              setVisibleCount(9);
            }}
            onFocus={() => setNocSuggestionsOpen(true)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] text-[#1A1A2E] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
          />
          {selectedNocCode && (
            <button
              onClick={() => {
                setSelectedNocCode("");
                setNocSearch("");
                setVisibleCount(9);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A2E]"
              aria-label="Clear NOC code"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
          {/* NOC suggestions dropdown */}
          {nocSuggestionsOpen && nocSearch && !selectedNocCode && (
            <div
              ref={isMobile ? undefined : nocDropdownRef}
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white shadow-lg"
            >
              {nocSuggestions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-[#6B7280]">
                  No matching NOC codes
                </div>
              ) : (
                nocSuggestions.map((noc) => (
                  <button
                    key={noc.code}
                    onClick={() => {
                      setSelectedNocCode(noc.code);
                      setNocSearch(`${noc.code} — ${noc.name}`);
                      setNocSuggestionsOpen(false);
                      setVisibleCount(9);
                    }}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-white transition-colors"
                  >
                    <span className="shrink-0 rounded-lg bg-[#F3F4F6] px-2 py-0.5 text-xs font-semibold text-[#4B5563]">
                      {noc.code}
                    </span>
                    <span className="text-sm text-[#4B5563] leading-snug line-clamp-1">
                      {noc.name}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Wage Range */}
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
          Wage Range
        </label>
        <select
          value={wageRangeIdx}
          onChange={(e) => {
            setWageRangeIdx(Number(e.target.value));
            setVisibleCount(9);
          }}
          className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] text-[#1A1A2E] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
        >
          {WAGE_RANGES.map((r, i) => (
            <option key={i} value={i}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* LMIA Approval Count */}
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
          LMIA Approvals
        </label>
        <select
          value={approvalCountIdx}
          onChange={(e) => {
            setApprovalCountIdx(Number(e.target.value));
            setVisibleCount(9);
          }}
          className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] text-[#1A1A2E] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
        >
          {APPROVAL_COUNT_RANGES.map((r, i) => (
            <option key={i} value={i}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Approval Rate */}
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
          Approval Rate
        </label>
        <select
          value={approvalRateIdx}
          onChange={(e) => {
            setApprovalRateIdx(Number(e.target.value));
            setVisibleCount(9);
          }}
          className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] text-[#1A1A2E] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
        >
          {APPROVAL_RATE_OPTIONS.map((r, i) => (
            <option key={i} value={i}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sponsorship Score */}
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
          Sponsorship Score
        </label>
        <select
          value={sponsorshipScoreIdx}
          onChange={(e) => {
            setSponsorshipScoreIdx(Number(e.target.value));
            setVisibleCount(9);
          }}
          className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] text-[#1A1A2E] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
        >
          {SPONSORSHIP_SCORE_OPTIONS.map((r, i) => (
            <option key={i} value={i}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Program Stream */}
      <div>
        <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
          Program Stream
        </label>
        <div className="flex flex-wrap gap-2">
          {PROGRAM_STREAMS.map((stream) => {
            const active = selectedStreams.has(stream.key);
            return (
              <button
                key={stream.key}
                onClick={() => toggleStream(stream.key)}
                className={`rounded-full border px-3.5 py-2 text-[13px] font-medium ${
                  active
                    ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                    : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1A1A2E]"
                }`}
              >
                {stream.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TEER Level */}
      <div>
        <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
          TEER Level
        </label>
        <div className="flex flex-wrap gap-2">
          {TEER_LEVELS.map((level) => {
            const active = selectedTeerLevels.has(level);
            return (
              <button
                key={level}
                onClick={() => toggleTeer(level)}
                className={`rounded-full border px-3.5 py-2 text-[13px] font-medium ${
                  active
                    ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                    : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1A1A2E]"
                }`}
              >
                {teerLabels[level]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear LMIA filters */}
      {activeLmiaFilterCount > 0 && (
        <button
          onClick={() => {
            setNocSearch("");
            setSelectedNocCode("");
            setWageRangeIdx(0);
            setApprovalCountIdx(0);
            setApprovalRateIdx(0);
            setSponsorshipScoreIdx(0);
            setSelectedStreams(new Set());
            setSelectedTeerLevels(new Set());
            setVisibleCount(9);
          }}
          className="text-[14px] font-medium text-[#2563EB] hover:underline"
        >
          Clear LMIA Filters
        </button>
      )}
    </div>
  );

  // ── Render ────────────────────────────────────────────────

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[white]">
        {/* Hero banner */}
        <section className="bg-[white] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase text-[#6B7280]">
                Employer Directory
              </span>
              <h1 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1A1A2E] sm:text-[48px]">
                Canadian Employers with{" "}
                <span className="text-[#2563EB]">TFWP Hiring History</span>
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
                Browse employers who have publicly documented hiring through the
                Temporary Foreign Worker Program. Use advanced LMIA filters to
                find the best opportunities for your skills.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Quick Filters */}
        <section className="sticky top-[73px] z-40 border-b border-[#E5E7EB] bg-[white]/90 px-6 py-5 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search employers, industries, or provinces..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(9);
                }}
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white py-3 pl-11 pr-4 text-[15px] text-[#1A1A2E] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
              />
            </div>

            {/* Province filter */}
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setVisibleCount(9);
              }}
              className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-[15px] text-[#1A1A2E] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
              aria-label="Filter by province"
            >
              <option value="">All Provinces</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Industry filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => {
                setSelectedIndustry(e.target.value);
                setVisibleCount(9);
              }}
              className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-[15px] text-[#1A1A2E] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
              aria-label="Filter by industry"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>

            {/* Filters toggle button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`relative inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-[15px] font-medium transition-colors ${
                filtersOpen || activeLmiaFilterCount > 0
                  ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                  : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#D1D5DB]"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              Filters
              {activeLmiaFilterCount > 0 && (
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#2563EB] px-1.5 text-[11px] font-bold text-white">
                  {activeLmiaFilterCount}
                </span>
              )}
            </button>

            {/* Mobile filters button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] font-medium text-[#4B5563] md:hidden"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              <span className="text-sm font-semibold">
                Filters{activeLmiaFilterCount > 0 ? ` (${activeLmiaFilterCount})` : ""}
              </span>
            </button>

            {/* Clear filters */}
            {hasAnyFilter && (
              <button
                onClick={clearAllFilters}
                className="rounded-2xl px-5 py-3 text-[15px] font-medium text-[#6B7280] transition-colors hover:bg-white hover:text-[#1A1A2E]"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Collapsible filter panel (desktop) */}
          {filtersOpen && (
            <div className="mx-auto mt-5 max-w-6xl border-t border-[#E5E7EB] pt-5 hidden md:block">
              <FilterPanel />
            </div>
          )}
        </section>

        {/* Mobile filter modal */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
                <h2 className="text-lg font-bold text-[#1A1A2E]">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-xl p-2 text-[#6B7280] hover:bg-white"
                  aria-label="Close filters"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(100dvh - 130px)" }}>
                <FilterPanel isMobile />
              </div>
              <div className="border-t border-[#E5E7EB] p-4">
                <button
                  onClick={() => {
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full rounded-2xl bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            {/* Results header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[15px] text-[#6B7280]">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
                    Loading employers...
                  </span>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-[#1A1A2E]">
                      {displayed.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[#1A1A2E]">
                      {sorted.length}
                    </span>{" "}
                    employers
                  </>
                )}
              </p>

              {/* Sort dropdown */}
              {!loading && sorted.length > 0 && (
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setVisibleCount(9);
                  }}
                  className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[14px] text-[#1A1A2E] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
                  aria-label="Sort employers"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border border-[#E5E7EB] bg-white p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#F3F4F6]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 rounded-lg bg-[#F3F4F6]" />
                        <div className="flex gap-2">
                          <div className="h-6 w-20 rounded-full bg-[#F3F4F6]" />
                          <div className="h-6 w-14 rounded-full bg-[#F3F4F6]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <div className="h-4 w-full rounded-lg bg-[#F3F4F6]" />
                      <div className="h-4 w-3/4 rounded-lg bg-[#F3F4F6]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && sorted.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg
                  className="h-16 w-16 text-[#E5E7EB]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <h3 className="mt-6 text-xl font-bold text-[#1A1A2E]">
                  No employers match your criteria
                </h3>
                <p className="mt-2 text-[15px] text-[#6B7280]">
                  Try adjusting your filters to find more employers.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 rounded-2xl bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Employer cards */}
            {!loading && sorted.length > 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayed.map((employer) => {
                    const lmiaData = employer.lmia;
                    const topOcc = lmiaData?.topOccupations?.[0];
                    const scoreColor = getSponsorshipColor(
                      lmiaData?.sponsorshipScore,
                    );
                    const rateColor = getApprovalRateColor(
                      lmiaData?.approvalRate,
                    );
                    const initials = employer.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <div
                        key={employer.slug}
                        className="group block rounded-2xl border border-[#E5E7EB] bg-white p-6  hover:"
                      >
                        {/* Header: logo + name + badges */}
                        <div className="flex items-start gap-4">
                          <Link
                            to="/employers/$slug"
                            params={{ slug: employer.slug }}
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F3F4F6] text-sm font-bold text-[#4B5563] transition-colors hover:bg-[#F3F4F6]"
                            aria-hidden="true"
                          >
                            {initials}
                          </Link>
                          <div className="min-w-0 flex-1">
                            <button
                              type="button"
                              onClick={() => openModal(employer)}
                              className="text-left text-lg font-bold text-[#1A1A2E] leading-tight transition-colors hover:text-[#2563EB] cursor-pointer"
                            >
                              {employer.name}
                            </button>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[11px] font-medium text-[#4B5563]">
                                {employer.industry}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#6B7280]">
                                {employer.province}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* LMIA metrics row */}
                        {lmiaData && (
                          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#E5E7EB] pt-4">
                            <div className="text-center">
                              <p className="text-[20px] font-bold text-[#1A1A2E] leading-none">
                                {formatApprovals(lmiaData.totalApprovals)}
                              </p>
                              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.03em] text-[#6B7280] leading-tight">
                                Approvals
                              </p>
                            </div>
                            <div className="text-center">
                              <p
                                className="text-[20px] font-bold leading-none"
                                style={{ color: rateColor }}
                              >
                                {lmiaData.approvalRate.toFixed(1)}%
                              </p>
                              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.03em] text-[#6B7280] leading-tight">
                                Approval Rate
                              </p>
                            </div>
                            <div className="text-center">
                              <p
                                className="text-[20px] font-bold leading-none"
                                style={{ color: scoreColor }}
                              >
                                {lmiaData.sponsorshipScore}
                              </p>
                              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.03em] text-[#6B7280] leading-tight">
                                Score
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Top occupation + wage + jobs */}
                        <div className="mt-4 space-y-2">
                          {topOcc && (
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="h-4 w-4 shrink-0 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                              </svg>
                              <span className="truncate text-[#4B5563]">
                                {topOcc.nocName}
                              </span>
                              <span className="shrink-0 rounded-md bg-[#F3F4F6] px-1.5 py-0.5 text-[11px] font-semibold text-[#6B7280]">
                                {topOcc.nocCode}
                              </span>
                            </div>
                          )}
                          {lmiaData && (
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="h-4 w-4 shrink-0 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-[#4B5563]">
                                Avg.{" "}
                                <span className="font-semibold text-[#1A1A2E]">
                                  ${lmiaData.wageAverage.toFixed(2)}/hr
                                </span>
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 shrink-0 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            <span className="text-[#4B5563]">
                              <span className="font-semibold text-[#1A1A2E]">
                                {employer.openPositions.length}
                              </span>{" "}
                              open position{employer.openPositions.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        {/* Bottom CTAs */}
                        <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
                          <a
                            href={employer.careerPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-2xl bg-[#2563EB] px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                          >
                            Visit Career Page
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                          <div className="flex items-center gap-3">
                            <Link
                              to="/employers/$slug"
                              params={{ slug: employer.slug }}
                              className="text-[13px] font-medium text-[#6B7280] transition-colors hover:text-[#2563EB]"
                            >
                              Details →
                            </Link>
                            {lmiaData && (
                              <div
                                className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-[#1A1A2E]"
                                style={{ backgroundColor: scoreColor }}
                                title={`Sponsorship Score: ${lmiaData.sponsorshipScore}`}
                              >
                                {lmiaData.sponsorshipScore}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + 9)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#1A1A2E] transition-colors hover:bg-white hover:text-[#2563EB]"
                    >
                      Load More Employers
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Show less */}
                {!hasMore && sorted.length > 9 && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount(9)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#1A1A2E] transition-colors hover:bg-white"
                    >
                      Show Less
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
