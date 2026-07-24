import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { employers, provinces, industries } from "~/data/employers";

export const Route = createFileRoute("/employers")({
  component: EmployerDirectory,
});

function EmployerDirectory() {
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return employers.filter((e) => {
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

      return matchesSearch && matchesProvince && matchesIndustry;
    });
  }, [search, selectedProvince, selectedIndustry]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const clearFilters = () => {
    setSearch("");
    setSelectedProvince("");
    setSelectedIndustry("");
  };

  const hasActiveFilters = search || selectedProvince || selectedIndustry;

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        {/* Hero banner */}
        <section className="bg-white px-4 py-12 dark:bg-gray-900 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Employer Directory
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Canadian Employers with{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  TFWP Hiring History
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Browse employers who have publicly documented hiring through the
                Temporary Foreign Worker Program. Use the filters below to find
                opportunities in your field and province.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-[61px] z-40 border-b border-gray-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
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
                placeholder="Search employers, industries, or provinces..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(9);
                }}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Province filter */}
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setVisibleCount(9);
              }}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
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
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              aria-label="Filter by industry"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                Clear Filters
              </button>
            )}
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
                    Loading employers...
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
                    employers
                  </>
                )}
              </p>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="flex gap-2">
                          <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                          <div className="h-5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
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
                  No employers match your search
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your filters or search terms to find what
                  you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Employer cards grid */}
            {!loading && filtered.length > 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayed.map((employer) => (
                    <Link
                      key={employer.slug}
                      to="/employers/$slug"
                      params={{ slug: employer.slug }}
                      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="flex items-start gap-4">
                        {/* Logo placeholder */}
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          aria-hidden="true"
                        >
                          {employer.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                            {employer.name}
                          </h3>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {employer.industry}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              {employer.province}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {employer.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                          />
                        </svg>
                        <span className="truncate">{employer.website.replace("https://", "")}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load more button */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + 9)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                    >
                      Load More Employers
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

                {/* Show less */}
                {!hasMore && filtered.length > 9 && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisibleCount(9)}
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
