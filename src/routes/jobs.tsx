import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@clerk/tanstack-start";
import { useState, useMemo, useEffect } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { jobs, provinces, jobTypes } from "~/data/jobs";
import { employers } from "~/data/employers";
import { getJobMatches, type JobMatch } from "~/server/matching";
import { getProfile } from "~/server/profile";
import type { Profile } from "~/server/profile";
import { MatchScoreBadge } from "~/components/MatchScoreBadge";
import { useEmployerPreview } from "~/components/EmployerPreviewContext";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Job Search — LMIA Career AI" },
      {
        name: "description",
        content:
          "Search 62+ jobs from Canadian LMIA employers. Filter by province, job type, wage range, and match score. Find your next opportunity in Canada.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/jobs" }],
  }),
  component: JobListings,
  loader: async () => {
    let matches: JobMatch[] = [];
    let profile: Profile | null = null;
    try {
      matches = await getJobMatches();
    } catch {
      // Not signed in or no profile
    }
    try {
      profile = await getProfile();
    } catch {
      // Not signed in
    }
    return { matches, profile };
  },
});

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

const salaryRanges = [
  { label: "Under $40,000", min: 0, max: 40000 },
  { label: "$40,000 - $60,000", min: 40000, max: 60000 },
  { label: "$60,000 - $80,000", min: 60000, max: 80000 },
  { label: "$80,000 - $100,000", min: 80000, max: 100000 },
  { label: "$100,000 - $130,000", min: 100000, max: 130000 },
  { label: "$130,000+", min: 130000, max: Infinity },
];

function parseSalary(salary: string): number {
  const match = salary.match(/\$?([\d,]+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ""), 10);
  }
  return 0;
}

function JobListings() {
  const { matches, profile } = Route.useLoaderData();
  const { openModal } = useEmployerPreview();
  const isFreeUser = profile?.plan === "free";
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const matchMap = useMemo(() => {
    const map = new Map<string, JobMatch>();
    for (const m of matches) {
      map.set(m.job.id, m);
    }
    return map;
  }, [matches]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.toLowerCase();
      const employer = employers.find((e) => e.slug === job.employerSlug);
      const employerName = employer?.name ?? "";

      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        employerName.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);

      const provinceAbbr = job.location.split(", ").pop() ?? "";
      const matchesProvince =
        !selectedProvince || provinceAbbr === selectedProvince;
      const matchesIndustry =
        !selectedIndustry || job.category === selectedIndustry;
      const matchesType = !selectedType || job.type === selectedType;
      const matchesRemote = !remoteOnly || job.remote;

      let matchesSalary = true;
      if (selectedSalary) {
        const range = salaryRanges.find((r) => r.label === selectedSalary);
        if (range) {
          const salaryVal = parseSalary(job.salary);
          matchesSalary = salaryVal >= range.min && salaryVal < range.max;
        }
      }

      return (
        matchesSearch &&
        matchesProvince &&
        matchesIndustry &&
        matchesType &&
        matchesRemote &&
        matchesSalary
      );
    });
  }, [search, selectedProvince, selectedIndustry, selectedType, remoteOnly, selectedSalary]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const clearFilters = () => {
    setSearch("");
    setSelectedProvince("");
    setSelectedIndustry("");
    setSelectedType("");
    setRemoteOnly(false);
    setSelectedSalary("");
  };

  const hasActiveFilters =
    search || selectedProvince || selectedIndustry || selectedType || remoteOnly || selectedSalary;

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  const getEmployer = (slug: string) => employers.find((e) => e.slug === slug);

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Hero banner */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                Job Board
              </span>
              <h1 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
                Find Jobs with{" "}
                <span className="text-[#2563EB]">
                  Verified Employers
                </span>
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
                Browse current job openings from Canadian employers with publicly
                documented TFWP hiring history. Search, filter, and find your next
                opportunity.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-[73px] z-40 border-b border-[#F0F0F0] bg-white/90 px-6 py-5 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl space-y-3">
            {/* Search bar */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search jobs by title, company, location, or keyword..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white py-3 pl-11 pr-4 text-[15px] text-[#0A0A0B] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
              />
            </div>

            {/* Filter pills/dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setVisibleCount(12);
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
                aria-label="Filter by province"
              >
                <option value="">All Provinces</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <select
                value={selectedIndustry}
                onChange={(e) => {
                  setSelectedIndustry(e.target.value);
                  setVisibleCount(12);
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
                aria-label="Filter by industry"
              >
                <option value="">All Industries</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setVisibleCount(12);
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
                aria-label="Filter by job type"
              >
                <option value="">All Types</option>
                {jobTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={selectedSalary}
                onChange={(e) => {
                  setSelectedSalary(e.target.value);
                  setVisibleCount(12);
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
                aria-label="Filter by salary range"
              >
                <option value="">All Salaries</option>
                {salaryRanges.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setRemoteOnly(!remoteOnly);
                  setVisibleCount(12);
                }}
                className={`inline-flex items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-[15px] font-medium transition-colors ${
                  remoteOnly
                    ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                    : "border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F8F9FA]"
                }`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                Remote Only
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-2xl px-4 py-2.5 text-[15px] font-medium text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#0A0A0B]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-[15px] text-[#9CA3AF]">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
                    Loading jobs...
                  </span>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-[#0A0A0B]">
                      {displayed.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[#0A0A0B]">
                      {filtered.length}
                    </span>{" "}
                    jobs
                  </>
                )}
              </p>
              {savedJobs.size > 0 && (
                <p className="text-sm text-[#9CA3AF]">
                  {savedJobs.size} saved
                </p>
              )}
            </div>

            {loading && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-3xl border border-[#F0F0F0] bg-white p-8"
                  >
                    <div className="space-y-3">
                      <div className="h-6 w-3/4 rounded-lg bg-[#F0F0F0]" />
                      <div className="h-5 w-1/2 rounded-lg bg-[#F0F0F0]" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 rounded-full bg-[#F0F0F0]" />
                        <div className="h-6 w-20 rounded-full bg-[#F0F0F0]" />
                      </div>
                      <div className="h-4 w-full rounded-lg bg-[#F0F0F0]" />
                      <div className="h-4 w-2/3 rounded-lg bg-[#F0F0F0]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg
                  className="h-16 w-16 text-[#E5E7EB]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <h3 className="mt-6 text-xl font-bold text-[#0A0A0B]">
                  No jobs match your search
                </h3>
                <p className="mt-2 text-[15px] text-[#6B7280]">
                  Try adjusting your filters or search terms to find more
                  opportunities.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-2xl bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayed.map((job) => {
                    const employer = getEmployer(job.employerSlug);
                    const isSaved = savedJobs.has(job.id);
                    const jobMatch = matchMap.get(job.id);
                    return (
                      <div
                        key={job.id}
                        className="group relative flex flex-col rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm transition-all hover:border-[#E5E7EB] hover:shadow-md"
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSaveJob(job.id);
                          }}
                          className="absolute right-6 top-6 rounded-full p-2 text-[#9CA3AF] transition-colors hover:bg-[#F8F9FA] hover:text-[#2563EB]"
                          aria-label={isSaved ? "Unsave job" : "Save job"}
                        >
                          {isSaved ? (
                            <svg
                              className="h-5 w-5 text-[#2563EB]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                              />
                            </svg>
                          )}
                        </button>

                        {jobMatch && (
                          <div className="absolute right-6 top-16">
                            <MatchScoreBadge score={jobMatch.matchScore} size="sm" />
                          </div>
                        )}

                        <h3 className="pr-10 text-lg font-bold text-[#0A0A0B]">
                          {job.title}
                        </h3>

                        {employer && (
                          <button
                            type="button"
                            onClick={() => openModal(employer)}
                            className="mt-1.5 text-left text-[15px] font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8] cursor-pointer"
                          >
                            {employer.name}
                          </button>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F0F0] px-3 py-1 text-xs font-medium text-[#4B5563]">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                              />
                            </svg>
                            {job.location}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#FAFAFA] px-3 py-1 text-xs font-medium text-[#6B7280]">
                            {job.type}
                          </span>
                          {job.remote && (
                            <span className="inline-flex items-center rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-medium text-[#16A34A]">
                              Remote
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-4 text-[15px]">
                          <span className="font-semibold text-[#16A34A]">
                            {job.salary}
                          </span>
                          <span className="text-[#9CA3AF]">
                            {new Date(job.postedDate).toLocaleDateString("en-CA", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <p className="mt-4 line-clamp-2 text-[15px] leading-relaxed text-[#6B7280]">
                          {job.description}
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                          {isFreeUser ? (
                            <a
                              href="/#pricing"
                              className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                            >
                              View Details
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                              </svg>
                            </a>
                          ) : (
                            <Link
                              to="/jobs/$jobId"
                              params={{ jobId: job.id }}
                              className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                            >
                              View Details
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + 12)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA] hover:text-[#2563EB]"
                    >
                      Load More Jobs
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                  </div>
                )}

                {!hasMore && filtered.length > 12 && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount(12)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA]"
                    >
                      Show Less
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
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
