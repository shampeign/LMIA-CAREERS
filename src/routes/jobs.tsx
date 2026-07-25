import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { jobs, provinces, jobTypes } from "~/data/jobs";
import { employers } from "~/data/employers";

export const Route = createFileRoute("/jobs")({
  component: JobListings,
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
  // Extract the first number (e.g., "$52,000 - $65,000" → 52000)
  const match = salary.match(/\$?([\d,]+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ""), 10);
  }
  return 0;
}

function JobListings() {
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

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
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        {/* Hero banner */}
        <section className="bg-white px-4 py-12 dark:bg-gray-900 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Job Board
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Find Jobs with{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Verified Employers
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Browse current job openings from Canadian employers with publicly
                documented TFWP hiring history. Search, filter, and find your next
                opportunity.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-[61px] z-40 border-b border-gray-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
          <div className="mx-auto max-w-7xl space-y-3">
            {/* Search bar */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
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
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Filter pills/dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Province filter */}
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setVisibleCount(12);
                }}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
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
                  setVisibleCount(12);
                }}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                aria-label="Filter by industry"
              >
                <option value="">All Industries</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>

              {/* Job Type filter */}
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setVisibleCount(12);
                }}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                aria-label="Filter by job type"
              >
                <option value="">All Types</option>
                {jobTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* Salary filter */}
              <select
                value={selectedSalary}
                onChange={(e) => {
                  setSelectedSalary(e.target.value);
                  setVisibleCount(12);
                }}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                aria-label="Filter by salary range"
              >
                <option value="">All Salaries</option>
                {salaryRanges.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>

              {/* Remote toggle */}
              <button
                onClick={() => {
                  setRemoteOnly(!remoteOnly);
                  setVisibleCount(12);
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  remoteOnly
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-7xl">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    Loading jobs...
                  </span>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {displayed.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {filtered.length}
                    </span>{" "}
                    jobs
                  </>
                )}
              </p>
              {savedJobs.size > 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {savedJobs.size} saved
                </p>
              )}
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="space-y-3">
                      <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="flex gap-2">
                        <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </div>
                      <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                  className="h-16 w-16 text-gray-300 dark:text-gray-600"
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
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  No jobs match your search
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your filters or search terms to find more
                  opportunities.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Job cards grid */}
            {!loading && filtered.length > 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayed.map((job) => {
                    const employer = getEmployer(job.employerSlug);
                    const isSaved = savedJobs.has(job.id);
                    return (
                      <div
                        key={job.id}
                        className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                      >
                        {/* Save button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSaveJob(job.id);
                          }}
                          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                          aria-label={isSaved ? "Unsave job" : "Save job"}
                        >
                          {isSaved ? (
                            <svg
                              className="h-5 w-5 text-blue-600"
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

                        {/* Job title */}
                        <h3 className="pr-8 text-lg font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>

                        {/* Employer name */}
                        {employer && (
                          <Link
                            to="/employers/$slug"
                            params={{ slug: employer.slug }}
                            className="mt-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {employer.name}
                          </Link>
                        )}

                        {/* Badges */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
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
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {job.type}
                          </span>
                          {job.remote && (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              Remote
                            </span>
                          )}
                        </div>

                        {/* Salary and date */}
                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {job.salary}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500">
                            {new Date(job.postedDate).toLocaleDateString("en-CA", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Description snippet */}
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {job.description}
                        </p>

                        {/* Actions */}
                        <div className="mt-4 flex items-center gap-3">
                          <Link
                            to="/jobs/$jobId"
                            params={{ jobId: job.id }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                          >
                            View Details
                            <svg
                              className="h-3.5 w-3.5"
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
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Load more / Show less */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + 12)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                    >
                      Load More Jobs
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
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {!hasMore && filtered.length > 12 && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisibleCount(12)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Show Less
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
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
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
