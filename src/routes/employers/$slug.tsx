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

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Back link */}
        <div className="border-b border-[#F0F0F0] bg-white">
          <div className="mx-auto max-w-4xl px-6 py-4 lg:px-8">
            <Link
              to="/employers"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[#6B7280] transition-colors hover:text-[#0A0A0B]"
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
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              {/* Logo placeholder */}
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl bg-[#F0F0F0] text-3xl font-bold text-[#4B5563]">
                {initials}
              </div>
              <div className="flex-1">
                <h1 className="text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B]">
                  {employer.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#F0F0F0] px-4 py-1.5 text-sm font-medium text-[#4B5563]">
                    {employer.industry}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#6B7280]">
                    {employer.province}
                  </span>
                  <span className="text-[15px] text-[#9CA3AF]">
                    {employer.city}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#6B7280]">
                  {employer.description}
                </p>
              </div>
              {/* CTA */}
              <a
                href={employer.careerPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:ring-offset-2"
              >
                Visit Career Page
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Company details */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main content */}
              <div className="space-y-8 lg:col-span-2">
                <div className="rounded-3xl border border-[#F0F0F0] bg-white p-10 shadow-sm">
                  <h2 className="text-[24px] font-bold text-[#0A0A0B]">About {employer.name}</h2>
                  <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#6B7280]">
                    {employer.about.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {employer.hiringHistory && employer.hiringHistory.length > 0 && (
                  <div className="rounded-3xl border border-[#F0F0F0] bg-white p-10 shadow-sm">
                    <h2 className="text-[24px] font-bold text-[#0A0A0B]">TFWP Hiring History</h2>
                    <div className="mt-6 space-y-4">
                      {employer.hiringHistory.map((entry: any, i: number) => (
                        <div key={i} className="flex items-start justify-between gap-4 border-b border-[#F0F0F0] pb-4 last:border-0 last:pb-0">
                          <div>
                            <p className="text-[15px] font-semibold text-[#0A0A0B]">{entry.role}</p>
                            <p className="mt-1 text-sm text-[#6B7280]">{entry.location}</p>
                          </div>
                          <span className="text-sm text-[#9CA3AF]">{entry.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                    Company Info
                  </h3>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">Industry</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-[#0A0A0B]">{employer.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">Province</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-[#0A0A0B]">{employer.province}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">City</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-[#0A0A0B]">{employer.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#9CA3AF]">Website</dt>
                      <dd className="mt-1">
                        <a href={employer.website} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-[#2563EB] hover:text-[#1D4ED8]">
                          {employer.website.replace("https://", "")}
                        </a>
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
