import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { getJobById } from "~/server/jobs";
import { getEmployerBySlug } from "~/server/employers";
import { getProfile } from "~/server/profile";
import type { Profile } from "~/server/profile";
import type { Job } from "~/data/jobs";
import type { Employer } from "~/data/employers";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: async ({ params }) => {
    const job = await getJobById(params.jobId);
    if (!job) throw notFound();

    let profile: Profile | null = null;
    try {
      profile = await getProfile();
    } catch {
      // Not signed in
    }
    if (!profile) {
      throw redirect({ to: "/sign-in" });
    }
    if (profile.plan === "free") {
      throw redirect({ to: "/pricing" });
    }

    const employer = await getEmployerBySlug(job.employerSlug);
    return { job, employer, profile };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData.job.title} at ${loaderData.employer?.name ?? "Employer"} — LMIA Career AI`,
      },
      {
        name: "description",
        content: `${loaderData.job.title} — ${loaderData.job.type} position in ${loaderData.job.location}. ${loaderData.job.description.slice(0, 150)}...`,
      },
    ],
    links: [{ rel: "canonical", href: `https://lmiacareersai.com/jobs/${loaderData.job.id}` }],
  }),
  component: JobDetailPage,
});

function JobDetailPage() {
  const { job, employer, profile } = Route.useLoaderData();

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#0B0E14]">
        {/* Back link */}
        <div className="border-b border-[#F0F0F0] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6B7280] transition-colors hover:text-[#0A0A0B]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Jobs
            </Link>
          </div>
        </div>

        {/* Job hero */}
        <section className="bg-white border-b border-[#F0F0F0]">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#0A0A0B] lg:text-[36px]">
                  {job.title}
                </h1>
                {employer && (
                  <Link
                    to="/employers/$slug"
                    params={{ slug: employer.slug }}
                    className="mt-2 inline-block text-[18px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                  >
                    {employer.name}
                  </Link>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F0F0] px-4 py-2 text-[14px] font-medium text-[#4B5563]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#F0F0F0] px-4 py-2 text-[14px] font-medium text-[#4B5563]">
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="inline-flex items-center rounded-full bg-[#F0FDF4] px-4 py-2 text-[14px] font-medium text-[#16A34A]">
                      Remote
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-center gap-6">
                  <span className="text-[24px] font-bold text-[#16A34A]">
                    {job.salary}
                  </span>
                  <span className="text-[15px] text-[#6B7280]">
                    Posted {new Date(job.postedDate).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {job.deadline && (
                    <span className="text-[15px] text-[#EF4444]">
                      Deadline: {new Date(job.deadline).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-72 space-y-4">
                <SignedIn>
                  {profile && !profile.preferred_province && (
                    <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-5">
                      <p className="text-[14px] font-medium text-[#92400E]">
                        Complete your profile to get personalized job matches and match scores.
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
                <div className="rounded-2xl border border-[#F0F0F0] bg-white p-8 ">
                  <h3 className="text-sm font-semibold uppercase text-[#9CA3AF]">Job Details</h3>
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
            <div className="rounded-2xl border border-[#F0F0F0] bg-white p-10 ">
              <h2 className="text-[24px] font-bold text-[#0A0A0B]">Job Description</h2>
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#6B7280]">
                {job.description.split("\n\n").map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {job.requirements && job.requirements.length > 0 && (
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
            </div>
            {/* Apply button */}
            <div className="mt-8 text-center">
              <a
                href={employer?.careerPage || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white  hover:bg-[#1D4ED8]"
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
