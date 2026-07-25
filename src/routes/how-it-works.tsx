import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — LMIA Career AI" },
      {
        name: "description",
        content:
          "Learn how LMIA Career AI works: discover LMIA employers, get AI-matched to jobs, optimize your resume, and track your applications — all in one platform.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const steps = [
  {
    number: "01",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Browse Employers",
    description:
      "Explore our directory of 30+ Canadian employers with documented TFWP hiring history. Use powerful filters — NOC code, wage range, province, TEER level, program stream — to find companies that match your profile and career goals.",
    details: [
      "Search by employer name, industry, or province",
      "Filter by NOC code to find employers hiring in your occupation",
      "View LMIA approval rates, wage data, and sponsorship scores",
      "See open positions with direct links to career pages",
    ],
  },
  {
    number: "02",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Unlock Intelligence",
    description:
      "Upgrade to access full employer analytics: deep-dive into LMIA approval trends, occupation breakdowns, wage distributions, and proprietary sponsorship scores that help you prioritize your applications.",
    details: [
      "Full employer profiles with LMIA history and trend data",
      "Proprietary sponsorship scores to gauge employer likelihood",
      "Historical approval data across program streams",
      "Occupation-level breakdowns with TEER levels and wages",
    ],
  },
  {
    number: "03",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Find Matching Jobs",
    description:
      "Our AI engine matches your skills, experience, and preferences to active positions from employers with TFWP history. Stop searching — let the right opportunities find you.",
    details: [
      "AI analyzes your resume, skills, and career preferences",
      "Personalized job matches ranked by relevance and fit",
      "Real-time updates when new matching positions are posted",
      "Save and track opportunities in your dashboard",
    ],
  },
  {
    number: "04",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: "Apply with Confidence",
    description:
      "Access employer career pages directly, optimize your resume with AI assistance, craft tailored cover letters, and prepare with interview simulations — everything you need to submit winning applications.",
    details: [
      "Direct links to employer career pages and job postings",
      "AI-powered resume optimization for Canadian employers",
      "Cover letter generation tailored to specific roles",
      "Interview preparation with role-specific practice scenarios",
    ],
  },
];

function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white px-6 py-32 sm:py-40">
          <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
              How It Works
            </span>
            <h1 className="mt-4 text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0A0B] sm:text-[56px]">
              Your path to a Canadian job,{" "}
              <span className="text-[#2563EB]">step by step</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.7] text-[#6B7280]">
              Four steps from discovering the right employers to landing your next role.
              Our platform guides you through every stage of the job search.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-white px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-16">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`flex flex-col gap-8 lg:flex-row lg:gap-12 ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step number & icon */}
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#2563EB]/10 text-[#2563EB]">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl font-bold text-[#F0F0F0] select-none">
                        {step.number}
                      </span>
                      <h2 className="text-[28px] font-bold text-[#0A0A0B]">
                        {step.title}
                      </h2>
                    </div>
                    <p className="mt-4 text-[17px] leading-[1.8] text-[#6B7280]">
                      {step.description}
                    </p>
                    <ul className="mt-6 space-y-3" role="list">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-[15px] text-[#4B5563]"
                        >
                          <svg
                            className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A0A0B] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[36px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[44px]">
              Ready to get started?
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-[#9CA3AF]">
              Join our waitlist for early access. No spam — just one email when we launch.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/employers"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                Browse Employers
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="/#waitlist"
                className="rounded-2xl border border-[#374151] px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:border-[#6B7280] hover:bg-white/5"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
