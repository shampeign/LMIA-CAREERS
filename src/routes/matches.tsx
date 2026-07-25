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
import { useEmployerPreview } from "~/components/EmployerPreviewContext";
import type { Profile } from "~/server/profile";

const industries = [
  "Food Processing", "Oil & Gas", "Technology", "Construction",
  "Agriculture", "Mining", "Manufacturing", "Transportation",
  "Retail", "Finance", "Telecommunications",
] as const;

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Your Job Matches — LMIA Career AI" },
      {
        name: "description",
        content:
          "View your AI-powered job matches from Canadian LMIA employers. Compare match scores, skill breakdowns, and find your best-fit opportunities.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/matches" }],
  }),
  component: MatchesPage,
  loader: async () => {
    try {
      const profile = await getProfile();
      let matches: JobMatch[] = [];
      if (profile) {
        try { matches = await getJobMatches(); } catch {}
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
      <main className="min-h-dvh bg-[#FAFAFA]">
        <SignedIn><MatchesContent /></SignedIn>
        <SignedOut><Unauthenticated /></SignedOut>
      </main>
      <Footer />
    </>
  );
}

function MatchesContent() {
  const { user } = useUser();
  const { openModal } = useEmployerPreview();
  const { profile, matches: initialMatches } = Route.useLoaderData();
  const isFreeUser = profile?.plan === "free";
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
    if (selectedIndustry) result = result.filter((m) => m.job.category === selectedIndustry);
    if (scoreFilter === "strong") result = result.filter((m) => m.matchScore >= 80);
    else if (scoreFilter === "good") result = result.filter((m) => m.matchScore >= 50 && m.matchScore < 80);
    else if (scoreFilter === "low") result = result.filter((m) => m.matchScore < 50);
    return result;
  }, [initialMatches, selectedProvince, selectedIndustry, scoreFilter]);

  const avgScore = filteredMatches.length > 0
    ? Math.round(filteredMatches.reduce((sum, m) => sum + m.matchScore, 0) / filteredMatches.length)
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="inline-flex items-center gap-1 text-[15px] font-medium text-[#6B7280] transition-colors hover:text-[#0A0A0B]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Dashboard
          </Link>
          <span className="text-[#E5E7EB]">/</span>
          <span className="text-[15px] font-medium text-[#0A0A0B]">Best Matches</span>
        </div>
        <h1 className="mt-5 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B]">
          Your Best Job Matches
        </h1>
        <p className="mt-3 text-[16px] text-[#6B7280]">
          AI-powered matching based on your skills, experience, education, location, and salary preferences.
        </p>
      </div>

      {!hasProfile && (
        <div className="mb-10 rounded-3xl border border-[#DBEAFE] bg-[#EFF6FF] p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#1E40AF]">Set Up Your Profile to See Matches</h3>
              <p className="mt-2 text-[15px] text-[#3B82F6]">Add your skills, experience, education, and preferences to get personalized job matches scored 0-100%.</p>
            </div>
            <Link to="/onboarding" className="inline-flex items-center gap-2 self-start rounded-2xl bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] sm:self-center">
              Set Up Profile
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      )}

      {hasProfile && !hasSkills && (
        <div className="mb-10 rounded-3xl border border-[#FDE68A] bg-[#FFFBEB] p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#92400E]">Add Your Skills for Better Matches</h3>
              <p className="mt-2 text-[15px] text-[#D97706]">You have a profile but haven't added skills yet. Skills are the most important factor (40%) in our matching algorithm.</p>
            </div>
            <Link to="/onboarding" className="inline-flex items-center gap-2 self-start rounded-2xl bg-[#D97706] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#B45309] sm:self-center">
              Add Skills
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      )}

      {hasSkills && (
        <>
          <div className="mb-8 grid gap-5 sm:grid-cols-4">
            {[
              { label: "Total Matches", value: String(filteredMatches.length), color: "text-[#0A0A0B]" },
              { label: "Average Match", value: `${avgScore}%`, color: "text-[#0A0A0B]" },
              { label: "Strong Matches (80%+)", value: String(filteredMatches.filter((m) => m.matchScore >= 80).length), color: "text-[#16A34A]" },
              { label: "Top Score", value: filteredMatches.length > 0 ? `${filteredMatches[0].matchScore}%` : "—", color: "text-[#2563EB]" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                <p className="text-xs font-medium text-[#9CA3AF]">{stat.label}</p>
                <p className={`mt-2 text-[28px] font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10">
              <option value="">All Provinces</option>
              {provinces.map((p) => (<option key={p} value={p}>{p}</option>))}
            </select>
            <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[15px] text-[#0A0A0B] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10">
              <option value="">All Industries</option>
              {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
            </select>
            <div className="flex gap-1.5">
              {(["all", "strong", "good", "low"] as const).map((f) => (
                <button key={f} onClick={() => setScoreFilter(f)} className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${scoreFilter === f ? "bg-[#2563EB] text-white" : "border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F8F9FA]"}`}>
                  {f === "all" ? "All Scores" : f === "strong" ? "80%+" : f === "good" ? "50-79%" : "<50%"}
                </button>
              ))}
            </div>
            {(selectedProvince || selectedIndustry || scoreFilter !== "all") && (
              <button onClick={() => { setSelectedProvince(""); setSelectedIndustry(""); setScoreFilter("all"); }} className="rounded-2xl px-4 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#0A0A0B]">
                Clear Filters
              </button>
            )}
          </div>

          {filteredMatches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg className="h-16 w-16 text-[#E5E7EB]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              <h3 className="mt-6 text-xl font-bold text-[#0A0A0B]">No matches found</h3>
              <p className="mt-2 text-[15px] text-[#6B7280]">Try adjusting your filters or adding more skills to your profile.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredMatches.map((match) => {
                const emp = employers.find((e) => e.slug === match.job.employerSlug);
                const isExpanded = expandedMatch === match.job.id;
                return (
                  <div key={match.job.id} className="overflow-hidden rounded-3xl border border-[#F0F0F0] bg-white shadow-sm transition-all">
                    <div className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-5">
                        <MatchScoreBadge score={match.matchScore} size="md" />
                        <div>
                          {isFreeUser ? (
                            <a href="/#pricing" className="text-xl font-bold text-[#0A0A0B] transition-colors hover:text-[#2563EB]">
                              {match.job.title}
                            </a>
                          ) : (
                            <Link to="/jobs/$jobId" params={{ jobId: match.job.id }} className="text-xl font-bold text-[#0A0A0B] transition-colors hover:text-[#2563EB]">
                              {match.job.title}
                            </Link>
                          )}
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-[#6B7280]">
                            {emp && <button type="button" onClick={() => openModal(emp)} className="font-medium text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer">{emp.name}</button>}
                            {emp && <span>·</span>}
                            <span>{match.job.location}</span>
                            <span>·</span>
                            <span className="font-medium text-[#16A34A]">{match.job.salary}</span>
                            {match.job.remote && <><span>·</span><span className="rounded-full bg-[#F0FDF4] px-2.5 py-0.5 text-xs font-medium text-[#16A34A]">Remote</span></>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isFreeUser ? (
                          <a href="/#pricing" className="rounded-2xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]">View Job</a>
                        ) : (
                          <Link to="/jobs/$jobId" params={{ jobId: match.job.id }} className="rounded-2xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]">View Job</Link>
                        )}
                        <button onClick={() => setExpandedMatch(isExpanded ? null : match.job.id)} className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA]">
                          {isExpanded ? "Hide" : "Details"}
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="border-t border-[#F0F0F0] bg-[#FAFAFA] p-8">
                        <div className="grid gap-8 lg:grid-cols-2">
                          <div>
                            <h4 className="mb-4 text-sm font-semibold text-[#0A0A0B]">Match Breakdown</h4>
                            <div className="space-y-3">
                              <MatchBreakdownBar label="Skills" score={match.breakdown.skillsScore} max={40} />
                              <MatchBreakdownBar label="Experience" score={match.breakdown.experienceScore} max={20} />
                              <MatchBreakdownBar label="Education" score={match.breakdown.educationScore} max={15} />
                              <MatchBreakdownBar label="Location" score={match.breakdown.locationScore} max={15} />
                              <MatchBreakdownBar label="Salary" score={match.breakdown.salaryScore} max={10} />
                            </div>
                          </div>
                          <div className="space-y-5">
                            {match.matchedSkills.length > 0 && (
                              <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#16A34A]">Matched Skills ({match.matchedSkills.length})</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {match.matchedSkills.map((s, i) => (
                                    <span key={i} className="inline-flex items-center rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-medium text-[#16A34A]">{s}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {match.missingSkills.length > 0 && (
                              <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">Skills to Develop ({match.missingSkills.length})</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {match.missingSkills.map((s, i) => (
                                    <span key={i} className="inline-flex items-center rounded-full bg-[#F0F0F0] px-3 py-1 text-xs font-medium text-[#6B7280]">{s}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {match.matchScore < 70 && match.tips.length > 0 && (
                              <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
                                <h4 className="text-xs font-semibold text-[#92400E]">Improve Your Match</h4>
                                <ul className="mt-2 space-y-1">
                                  {match.tips.map((tip, i) => (<li key={i} className="text-xs text-[#D97706]">{tip}</li>))}
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

function Unauthenticated() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F0F0F0]">
        <svg className="h-8 w-8 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
      </div>
      <h2 className="mt-8 text-[28px] font-bold text-[#0A0A0B]">Sign In Required</h2>
      <p className="mt-3 max-w-sm text-[16px] text-[#6B7280]">Sign in to see your personalized job matches based on your profile, skills, and preferences.</p>
      <div className="mt-8 flex items-center gap-3">
        <SignInButton mode="modal">
          <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3 text-[16px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F8F9FA]">Sign In</button>
        </SignInButton>
        <Link to="/sign-up" className="rounded-2xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]">Sign Up</Link>
      </div>
    </div>
  );
}
