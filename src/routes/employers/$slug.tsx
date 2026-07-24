import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { employers } from "~/data/employers";

export const Route = createFileRoute("/employers/$slug")({
  loader: ({ params }) => {
    const employer = employers.find((e) => e.slug === params.slug);
    if (!employer) throw notFound();
    return employer;
  },
  component: EmployerProfile,
});

function EmployerProfile() {
  const employer = Route.useLoaderData();

  const initials = employer.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const industryColors: Record<string, string> = {
    "Food Processing": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    "Oil & Gas": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    Technology: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Construction: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Agriculture: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Mining: "bg-stone-100 text-stone-700 dark:bg-stone-900/40 dark:text-stone-300",
    Manufacturing: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    Transportation: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    Retail: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    Healthcare: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    Hospitality: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  };

  const industryColor =
    industryColors[employer.industry] ??
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        {/* Back link */}
        <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Link
              to="/employers"
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
              Back to Directory
            </Link>
          </div>
        </div>

        {/* Company header */}
        <section className="bg-white px-4 py-10 dark:bg-gray-900 sm:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              {/* Logo placeholder */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {initials}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  {employer.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${industryColor}`}
                  >
                    {employer.industry}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {employer.province}
                  </span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    {employer.city}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {employer.description}
                </p>
              </div>
              {/* CTA */}
              <a
                href={employer.careerPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Visit Career Page
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
            </div>
          </div>
        </section>

        {/* Content grid */}
        <section className="px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main column (2/3) */}
              <div className="space-y-8 lg:col-span-2">
                {/* AI Summary */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      About {employer.name}
                    </h2>
                    <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      AI-Generated Summary
                    </span>
                  </div>
                  <div className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {employer.aiSummary.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Hiring History */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                  <h2 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                    TFWP Hiring History
                  </h2>
                  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Publicly documented positions filled through the Temporary
                    Foreign Worker Program.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="pb-3 pr-4 font-semibold text-gray-900 dark:text-white">
                            Position
                          </th>
                          <th className="pb-3 pr-4 font-semibold text-gray-900 dark:text-white">
                            Location
                          </th>
                          <th className="pb-3 pr-4 font-semibold text-gray-900 dark:text-white">
                            Year
                          </th>
                          <th className="pb-3 font-semibold text-gray-900 dark:text-white">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {employer.hiringHistory.map((record, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-100 last:border-0 dark:border-gray-700/50"
                          >
                            <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">
                              {record.position}
                            </td>
                            <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">
                              {record.location}
                            </td>
                            <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">
                              {record.year}
                            </td>
                            <td className="py-3">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  record.status === "Approved"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                }`}
                              >
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Open Positions */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                  <h2 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                    Open Positions
                  </h2>
                  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Current job openings at {employer.name}. Visit their career
                    page for the full list.
                  </p>
                  <div className="space-y-4">
                    {employer.openPositions.map((pos, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {pos.title}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="inline-flex items-center gap-1">
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
                                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                />
                              </svg>
                              {pos.location}
                            </span>
                            <span className="inline-flex items-center gap-1">
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
                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {pos.type}
                            </span>
                            <span className="inline-flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
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
                                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {pos.salary}
                            </span>
                          </div>
                        </div>
                        <a
                          href={employer.careerPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Apply
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
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar (1/3) */}
              <aside className="space-y-6">
                {/* Company details card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Company Details
                  </h3>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Website
                      </dt>
                      <dd className="mt-0.5">
                        <a
                          href={employer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {employer.website.replace("https://", "")}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Career Page
                      </dt>
                      <dd className="mt-0.5">
                        <a
                          href={employer.careerPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View open positions →
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Industry
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {employer.industry}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Company Size
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {employer.employeeCount} employees
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Founded
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {employer.founded}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Headquarters
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                        {employer.city}, {employer.province}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Locations card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Office Locations
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {employer.locations.map((loc, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <svg
                          className="h-4 w-4 flex-shrink-0 text-gray-400"
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
                        <span>
                          {loc.city}, {loc.province}
                        </span>
                      </li>
                    ))}
                  </ul>
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
