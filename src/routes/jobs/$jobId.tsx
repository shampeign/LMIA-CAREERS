import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { SignedIn } from "@clerk/tanstack-start";
import { useState, useEffect } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { jobs } from "~/data/jobs";
import { employers } from "~/data/employers";
import { getProfile } from "~/server/profile";
import { getJobMatch } from "~/server/matching";
import type { JobMatch } from "~/server/matching";
import { MatchScoreBadge, MatchBreakdownBar } from "~/components/MatchScoreBadge";
import { useEmployerPreview } from "~/components/EmployerPreviewContext";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: async ({ params }) => {
    const job = jobs.find((j) => j.id === params.jobId);
    if (!job) throw notFound();

    // Auth & plan check: redirect if not signed in or on free plan
    let profile = null;
    try {
      profile = await getProfile();
    } catch {
      // Not signed in
    }

    if (!profile) {
      throw redirect({ to: "/sign-in" });
    }

    if (profile.plan === "free") {
      throw redirect({ to: "/#pricing" });
    }

    let match: JobMatch | null = null;
    try {
      match = await getJobMatch(params.jobId);
    } catch {
      // No match data
    }

    return { job, match, profile };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.job.title} — LMIA Career AI` },
      {
        name: "description",
        content: `${loaderData.job.title} at a Canadian LMIA employer. ${loaderData.job.location}, ${loaderData.job.type}. View match score, requirements, and apply on LMIA Career AI.`,
      },
    ],
  }),
  component: JobDetailPage,
});

function JobDetailPage() {
  const { job, match: initialMatch, profile } = Route.useLoaderData();
  const [match, setMatch] = useState<JobMatch | null>(initialMatch);

  useEffect(() => {
    setMatch(initialMatch);
  }, [initialMatch]);

  const employer = employers.find((e) => e.slug === job.employerSlug);

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Back link */}
        <div className="border-b border-[#F0F0F0] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[#6B7280] transition-colors hover:text-[#0A0A0B]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Jobs
            </Link>
          </div>
        </div>

        {/* Job header */}
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h1 className="text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B]">
                  {job.title}
                </h1>
                {employer && (
                  <button
                    type="button"
                    onClick={() => openModal(employer)}
                    className="mt-3 inline-block text-left text-[18px] font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8] cursor-pointer"
                  >
                    {employer.name}
                  </button>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F0F0] px-4 py-1.5 text-sm font-medium text-[#4B5563]">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="rounded-full bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#6B7280]">{job.type}</span>
                  {job.remote && (
                    <span className="rounded-full bg-[#F0FDF4] px-4 py-1.5 text-sm font-medium text-[#16A34A]">Remote</span>
                  )}
                  <span className="text-lg font-bold text-[#16A34A]">{job.salary}</span>
                </div>
                <p className="mt-6 text-sm text-[#9CA3AF]">
                  Posted {new Date(job.postedDate).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>

              {/* Sidebar - Match score */}
              <div className="space-y-5">
                <SignedIn>
                  {match ? (
                    <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                      <div className="flex items-center gap-4">
                        <MatchScoreBadge score={match.matchScore} size="lg" />
                        <div>
                          <h3 className="text-lg font-bold text-[#0A0A0B]">Your Match</h3>
                          <p className="text-sm text-[#6B7280]">
                            {match.matchScore >= 80 ? "Strong match!" : match.matchScore >= 50 ? "Good potential" : "Below threshold"}
                          </p>
                        </div>
                      </div>
                      {match.matchScore >= 50 && (
                        <div className="mt-6 space-y-2.5">
                          <MatchBreakdownBar label="Skills" score={match.breakdown.skillsScore} max={40} />
                          <MatchBreakdownBar label="Experience" score={match.breakdown.experienceScore} max={20} />
                          <MatchBreakdownBar label="Education" score={match.breakdown.educationScore} max={15} />
                          <MatchBreakdownBar label="Location" score={match.breakdown.locationScore} max={15} />
                          <MatchBreakdownBar label="Salary" score={match.breakdown.salaryScore} max={10} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                      <p className="text-sm text-[#6B7280]">
                        Complete your profile with skills and preferences to see your match score.
                      </p>
                      <Link
                        to="/onboarding"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                      >
                        Complete Your Profile
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </SignedIn>

                <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">Job Details</h3>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">Category</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-[#0A0A0B]">{job.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">Job Type</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-[#0A0A0B]">{job.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">Location</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-[#0A0A0B]">{job.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">Remote</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-[#0A0A0B]">{job.remote ? "Yes" : "No"}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job description */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-[#F0F0F0] bg-white p-10 shadow-sm">
              <h2 className="text-[24px] font-bold text-[#0A0A0B]">Job Description</h2>
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#6B7280]">
                {job.description.split("\n\n").map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {job.requirements && (
                <>
                  <h3 className="mt-10 text-[20px] font-bold text-[#0A0A0B]">Requirements</h3>
                  <ul className="mt-4 space-y-3">
                    {job.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-[16px] text-[#6B7280]">
                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-[#2563EB]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.responsibilities && (
                <>
                  <h3 className="mt-10 text-[20px] font-bold text-[#0A0A0B]">Responsibilities</h3>
                  <ul className="mt-4 space-y-3">
                    {job.responsibilities.map((resp: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-[16px] text-[#6B7280]">
                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-[#2563EB]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Apply button — all users reaching this page are on a paid plan */}
            <div className="mt-8 text-center">
              <a
                href={employer?.careerPage || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8]"
              >
                Apply on Company Site
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
