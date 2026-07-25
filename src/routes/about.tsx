import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/about")({
  component: About,
});

const values = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Transparency",
    description:
      "We believe in open access to employer data. Every insight on our platform is sourced from publicly available information — no hidden sources, no guesses.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Data Accuracy",
    description:
      "We are relentless about keeping our data current and accurate. Employer profiles are regularly refreshed as new public records become available.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "User Privacy",
    description:
      "Your data belongs to you. We never sell personal information, and we are transparent about how we use the data you share with us to improve your experience.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "No Immigration Promises",
    description:
      "We are not immigration consultants or lawyers. We provide employer intelligence and career tools — not visa advice, work permit processing, or guaranteed outcomes of any kind.",
  },
];

const whatWeDo = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
      </svg>
    ),
    title: "Employer Intelligence",
    description:
      "We aggregate and organize publicly available data on Canadian employers with TFWP hiring history. Browse LMIA trends, wage data, sponsorship scores, and occupation breakdowns — all in one searchable directory.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI-Powered Matching",
    description:
      "Our AI engine analyzes your skills, experience, and career preferences to match you with the most relevant Canadian employers. Spend less time searching and more time preparing winning applications.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Career Preparation",
    description:
      "Optimize your resume for Canadian employers, craft compelling cover letters with AI assistance, and practice with interview simulations tailored to the roles and companies you're targeting.",
  },
];

function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white px-6 py-32 sm:py-40">
          <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
              About Us
            </span>
            <h1 className="mt-4 text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0A0B] sm:text-[56px]">
              Canada's LMIA Employer{" "}
              <span className="text-[#2563EB]">Intelligence Platform</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.7] text-[#6B7280]">
              Helping international talent discover employers with proven histories of hiring foreign
              workers — so you can focus your energy where it matters most.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0A0A0B]">
              Our Story
            </h2>
            <div className="mt-8 space-y-5 text-[17px] leading-[1.8] text-[#6B7280]">
              <p>
                LMIA Career AI was born from a simple frustration: finding Canadian employers who
                actively hire foreign workers shouldn't feel like detective work. For years, job
                seekers have pieced together clues from scattered government datasets, job boards,
                and word-of-mouth — a slow, exhausting process that often leads to dead ends.
              </p>
              <p>
                We set out to change that. By aggregating publicly available TFWP data, organizing
                it into searchable employer profiles, and layering on AI tools that help you act on
                that information, we've built the platform we wish existed when we started.
              </p>
              <p>
                Today, LMIA Career AI serves job seekers worldwide who want to build their careers
                in Canada. We're independent, self-funded, and focused on one mission: making
                Canadian employment opportunities more transparent and accessible for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="bg-[#FAFAFA] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                What We Do
              </span>
              <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
                Everything you need to{" "}
                <span className="text-[#2563EB]">land a Canadian job</span>
              </h2>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {whatWeDo.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-[#F0F0F0] bg-white p-10 shadow-sm transition-all hover:border-[#E5E7EB] hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 text-[22px] font-bold text-[#0A0A0B]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#6B7280]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                Our Values
              </span>
              <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
                What guides{" "}
                <span className="text-[#2563EB]">everything we build</span>
              </h2>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group rounded-3xl border border-[#F0F0F0] bg-white p-10 shadow-sm transition-all hover:border-[#E5E7EB] hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                    {value.icon}
                  </div>
                  <h3 className="mt-5 text-[20px] font-bold text-[#0A0A0B]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#6B7280]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Note */}
        <section className="bg-[#FAFAFA] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[18px] leading-[1.8] text-[#6B7280]">
              Built by a team passionate about making Canadian employment accessible. We're job
              seekers, immigrants, and technologists who believe transparency changes everything.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A0A0B] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[36px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[44px]">
              Ready to explore?
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-[#9CA3AF]">
              Browse our employer directory or join the waitlist for early access to AI-powered
              matching and career tools.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/employers"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                Explore Employers
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
