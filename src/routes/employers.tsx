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
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Hero banner */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                Employer Directory
              </span>
              <h1 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
                Canadian Employers with{" "}
                <span className="text-[#2563EB]">
                  TFWP Hiring History
                </span>
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
                Browse employers who have publicly documented hiring through the
                Temporary Foreign Worker Program. Use the filters below to find
                opportunities in your field and province.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-[73px] z-40 border-b border-[#F0F0F0] bg-white/90 px-6 py-5 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
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
                placeholder="Search employers, industries, or provinces..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(9);
                }}
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white py-3 pl-11 pr-4 text-[15px] text-[#0A0A0B] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
              />
            </div>

            {/* Province filter */}
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setVisibleCount(9);
              }}
              className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
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
              className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
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
                className="rounded-2xl px-5 py-3 text-[15px] font-medium text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#0A0A0B]"
              >
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            {/* Results count */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-[15px] text-[#9CA3AF]">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
                    Loading employers...
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
                    className="animate-pulse rounded-3xl border border-[#F0F0F0] bg-white p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#F0F0F0]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 rounded-lg bg-[#F0F0F0]" />
                        <div className="flex gap-2">
                          <div className="h-6 w-20 rounded-full bg-[#F0F0F0]" />
                          <div className="h-6 w-14 rounded-full bg-[#F0F0F0]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <div className="h-4 w-full rounded-lg bg-[#F0F0F0]" />
                      <div className="h-4 w-3/4 rounded-lg bg-[#F0F0F0]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
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
                  No employers match your search
                </h3>
                <p className="mt-2 text-[15px] text-[#6B7280]">
                  Try adjusting your filters or search terms to find what
                  you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-2xl bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
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
                      className="group block rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm transition-all hover:border-[#E5E7EB] hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        {/* Logo placeholder */}
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F0F0F0] text-sm font-bold text-[#4B5563]"
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
                          <h3 className="text-lg font-bold text-[#0A0A0B] transition-colors group-hover:text-[#2563EB]">
                            {employer.name}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-[#F0F0F0] px-3 py-1 text-xs font-medium text-[#4B5563]">
                              {employer.industry}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-[#FAFAFA] px-3 py-1 text-xs font-medium text-[#6B7280]">
                              {employer.province}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-5 line-clamp-2 text-[15px] leading-relaxed text-[#6B7280]">
                        {employer.description}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-sm text-[#9CA3AF]">
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
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + 9)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA] hover:text-[#2563EB]"
                    >
                      Load More Employers
                      <svg
                        className="h-5 w-5"
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
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount(9)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-[16px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA]"
                    >
                      Show Less
                      <svg
                        className="h-5 w-5"
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
