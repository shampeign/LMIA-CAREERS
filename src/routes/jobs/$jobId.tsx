import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { jobs } from "~/data/jobs";
import { employers } from "~/data/employers";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: ({ params }) => {
    const job = jobs.find((j) => j.id === params.jobId);
    if (!job) throw notFound();
    const employer = employers.find((e) => e.slug === job.employerSlug);
    const relatedJobs = jobs
      .filter((j) => j.id !== job.id && j.category === job.category)
      .slice(0, 3);
    return { job, employer, relatedJobs };
  },
  component: JobDetail,
});

function JobDetail() {
  const { job, employer, relatedJobs } = Route.useLoaderData();
  const [saved, setSaved] = useState(false);

  if (!employer) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-dvh items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Employer Not Found
            </h1>
            <Link
              to="/jobs"
              className="mt-4 inline-block text-blue-600 hover:text-blue-700"
            >
              ← Back to Jobs
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const employerInitials = employer.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        {/* Back link */}
        <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Jobs
            </Link>
          </div>
        </div>

        {/* Job header */}
        <section className="bg-white px-4 py-8 dark:bg-gray-900 sm:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  {job.title}
                </h1>
                <Link
                  to="/employers/$slug"
                  params={{ slug: employer.slug }}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {employer.name}
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
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>

                {/* Key details badges */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-gray-400"
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
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Remote
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400">
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
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 sm:flex-col sm:items-stretch">
                <a
                  href={employer.careerPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                >
                  Apply Now
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
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    saved
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {saved ? (
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
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
                  {saved ? "Saved" : "Save Job"}
                </button>
              </div>
            </div>

            {/* Dates */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Posted:{" "}
                {new Date(job.postedDate).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {job.deadline && (
                <span>
                  Deadline:{" "}
                  {new Date(job.deadline).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Content grid */}
        <section className="px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main column (2/3) */}
              <div className="space-y-8 lg:col-span-2">
                {/* Job Description */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Job Description
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {job.description.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Requirements
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {job.requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Education and Experience */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Education
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      {job.educationRequired}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Experience
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      {job.experienceRequired}
                    </p>
                  </div>
                </div>

                {/* Related jobs */}
                {relatedJobs.length > 0 && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Related Jobs
                    </h2>
                    <div className="mt-4 space-y-4">
                      {relatedJobs.map((rj) => {
                        const rjEmp = employers.find((e) => e.slug === rj.employerSlug);
                        return (
                          <Link
                            key={rj.id}
                            to="/jobs/$jobId"
                            params={{ jobId: rj.id }}
                            className="block rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-white hover:shadow-sm dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                          >
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {rj.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              {rjEmp && <span>{rjEmp.name}</span>}
                              {rjEmp && <span>·</span>}
                              <span>{rj.location}</span>
                              <span>·</span>
                              <span className="font-medium text-green-600 dark:text-green-400">
                                {rj.salary}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar (1/3) */}
              <aside className="space-y-6">
                {/* Employer Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {employerInitials}
                    </div>
                    <div>
                      <Link
                        to="/employers/$slug"
                        params={{ slug: employer.slug }}
                        className="font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                      >
                        {employer.name}
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {employer.industry}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {employer.description}
                  </p>
                  <Link
                    to="/employers/$slug"
                    params={{ slug: employer.slug }}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Company Profile
                    <svg
                      className="h-3 w-3"
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

                {/* AI Match Score placeholder */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                      />
                    </svg>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      AI Match Score
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Sign in to see how well your profile matches this job and get
                    personalized recommendations.
                  </p>
                  <Link
                    to="/sign-up"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign Up to See Your Score
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
                </div>

                {/* Quick facts */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Job Details
                  </h3>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Category
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {job.category}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Job Type
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {job.type}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Location
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {job.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Remote
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {job.remote ? "Yes" : "No"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
