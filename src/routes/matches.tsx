import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/tanstack-start";
import { useState, useMemo } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { getJobMatches, type JobMatch } from "~/server/matching";
import { getProfile } from "~/server/profile";
import { employers } from "~/data/employers";
import { provinces } from "~/data/jobs";
import { MatchScoreBadge, MatchBreakdownBar } from "~/components/MatchScoreBadge";
import type { Profile } from "~/server/profile";

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

export const Route = createFileRoute("/matches")({
  component: MatchesPage,
  loader: async () => {
    try {
      const profile = await getProfile();
      let matches: JobMatch[] = [];
      if (profile) {
        try {
          matches = await getJobMatches();
        } catch {
          // Error fetching matches
        }
      }
      return { profile, matches };
    } catch {
      return { profile: null, matches: [] };
    }
  },
});

function MatchesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        <SignedIn>
          <MatchesContent />
        </SignedIn>
        <SignedOut>
          <Unauthenticated />
        </SignedOut>
      </main>
      <Footer />
    </>
  );
}

function MatchesContent() {
  const { user } = useUser();
  const { profile, matches: initialMatches } = Route.useLoaderData();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [scoreFilter, setScoreFilter] = useState<"all" | "strong" | "good" | "low">("all");
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const hasProfile = !!profile;
  const hasSkills = hasProfile && (profile?.skills?.length ?? 0) > 0;

  const filteredMatches = useMemo(() => {
    let result = initialMatches;

    if (selectedProvince) {
      result = result.filter((m) => {
        const parts = m.job.location.split(", ");
        return parts[parts.length - 1] === selectedProvince;
      });
    }

    if (selectedIndustry) {
      result = result.filter((m) => m.job.category === selectedIndustry);
    }

    if (scoreFilter === "strong") {
      result = result.filter((m) => m.matchScore >= 80);
    } else if (scoreFilter === "good") {
      result = result.filter((m) => m.matchScore >= 50 && m.matchScore < 80);
    } else if (scoreFilter === "low") {
      result = result.filter((m) => m.matchScore < 50);
    }

    return result;
  }, [initialMatches, selectedProvince, selectedIndustry, scoreFilter]);

  const avgScore =
    filteredMatches.length > 0
      ? Math.round(
          filteredMatches.reduce((sum, m) => sum + m.matchScore, 0) /
            filteredMatches.length
        )
      : 0;

  const toggleExpand = (id: string) => {
    setExpandedMatch((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Dashboard
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">Best Matches</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Your Best Job Matches
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          AI-powered matching based on your skills, experience, education, location, and salary preferences.
        </p>
      </div>

      {/* No profile / no skills prompts */}
      {!hasProfile && (
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-900/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                Set Up Your Profile to See Matches
              </h3>
              <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                Add your skills, experience, education, and preferences to get personalized job matches scored 0-100%.
              </p>
            </div>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:self-center"
            >
              Set Up Profile
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {hasProfile && !hasSkills && (
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/40 dark:bg-amber-900/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                Add Your Skills for Better Matches
              </h3>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                You have a profile but haven't added skills yet. Skills are the most important factor (40%) in our matching algorithm.
              </p>
            </div>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 sm:self-center"
            >
              Add Skills
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Stats & Filters */}
      {hasSkills && (
        <>
          {/* Stats row */}
          <div className="mb-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Matches</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{filteredMatches.length}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Average Match</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{avgScore}%</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Strong Matches (80%+)</p>
              <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                {filteredMatches.filter((m) => m.matchScore >= 80).length}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Top Score</p>
              <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {filteredMatches.length > 0 ? `${filteredMatches[0].matchScore}%` : "—"}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {/* Province filter */}
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="">All Provinces</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Industry filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>

            {/* Score filter pills */}
            <div className="flex gap-1.5">
              {(["all", "strong", "good", "low"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setScoreFilter(f)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                    scoreFilter === f
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {f === "all" ? "All Scores" : f === "strong" ? "80%+" : f === "good" ? "50-79%" : "<50%"}
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {(selectedProvince || selectedIndustry || scoreFilter !== "all") && (
              <button
                onClick={() => {
                  setSelectedProvince("");
                  setSelectedIndustry("");
                  setScoreFilter("all");
                }}
                className="rounded-xl px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Match list */}
          {filteredMatches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No matches found</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your filters or adding more skills to your profile.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMatches.map((match) => {
                const emp = employers.find((e) => e.slug === match.job.employerSlug);
                const isExpanded = expandedMatch === match.job.id;
                return (
                  <div
                    key={match.job.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* Card header */}
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <MatchScoreBadge score={match.matchScore} size="md" />
                        <div>
                          <Link
                            to="/jobs/$jobId"
                            params={{ jobId: match.job.id }}
                            className="text-lg font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                          >
                            {match.job.title}
                          </Link>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            {emp && (
                              <Link
                                to="/employers/$slug"
                                params={{ slug: emp.slug }}
                                className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                              >
                                {emp.name}
                              </Link>
                            )}
                            <span>·</span>
                            <span>{match.job.location}</span>
                            <span>·</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{match.job.salary}</span>
                            {match.job.remote && (
                              <>
                                <span>·</span>
                                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                  Remote
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to="/jobs/$jobId"
                          params={{ jobId: match.job.id }}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          View Job
                        </Link>
                        <button
                          onClick={() => toggleExpand(match.job.id)}
                          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {isExpanded ? "Hide" : "Details"}
                        </button>
                      </div>
                    </div>

                    {/* Expanded breakdown */}
                    {isExpanded && (
                      <div className="border-t border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
                        <div className="grid gap-6 lg:grid-cols-2">
                          {/* Score breakdown */}
                          <div>
                            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                              Match Breakdown
                            </h4>
                            <div className="space-y-2.5">
                              <MatchBreakdownBar label="Skills" score={match.breakdown.skillsScore} max={40} />
                              <MatchBreakdownBar label="Experience" score={match.breakdown.experienceScore} max={20} />
                              <MatchBreakdownBar label="Education" score={match.breakdown.educationScore} max={15} />
                              <MatchBreakdownBar label="Location" score={match.breakdown.locationScore} max={15} />
                              <MatchBreakdownBar label="Salary" score={match.breakdown.salaryScore} max={10} />
                            </div>
                          </div>

                          {/* Skills detail */}
                          <div className="space-y-4">
                            {match.matchedSkills.length > 0 && (
                              <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                                  Matched Skills ({match.matchedSkills.length})
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {match.matchedSkills.map((s, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {match.missingSkills.length > 0 && (
                              <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                  Skills to Develop ({match.missingSkills.length})
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {match.missingSkills.map((s, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Tips for matches below 70% */}
                            {match.matchScore < 70 && match.tips.length > 0 && (
                              <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/40 dark:bg-amber-900/20">
                                <h4 className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                                  💡 Improve Your Match
                                </h4>
                                <ul className="mt-1.5 space-y-1">
                                  {match.tips.map((tip, i) => (
                                    <li key={i} className="text-xs text-amber-700 dark:text-amber-400">
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Unauthenticated ──────────────────────────────────────────────────────────

function Unauthenticated() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>
      <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Sign In Required</h2>
      <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
        Sign in to see your personalized job matches based on your profile, skills, and preferences.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <SignInButton mode="modal">
          <button
            type="button"
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Sign In
          </button>
        </SignInButton>
        <Link
          to="/sign-up"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
