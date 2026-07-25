import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — LMIA Career AI" },
      {
        name: "description",
        content:
          "Join the LMIA Career AI team. We're on a mission to bring transparency to Canadian employer hiring data for TFWP job seekers worldwide.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/careers" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#0B0E14]">
        {/* Hero */}
        <section className="bg-[#0B0E14] px-6 py-32 sm:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-semibold uppercase text-[#6B7280]">
              Careers
            </span>
            <h1 className="mt-4 text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[56px]">
              Help us build the future of{" "}
              <span className="text-[#2563EB]">Canadian employment intelligence</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-[#6B7280]">
              We're a small, ambitious team building Canada's leading LMIA employer intelligence
              platform. Join us and help international talent discover opportunities across the country.
            </p>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase text-[#6B7280]">
                Why LMIA Career AI
              </span>
              <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[48px]">
                Build something that{" "}
                <span className="text-[#2563EB]">matters</span>
              </h2>
              <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
                We're not just another job board. We're building the intelligence layer
                that helps thousands of people make life-changing career decisions.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "High Ownership",
                  description:
                    "You won't be a small cog in a big machine. You'll own real products, make real decisions, and see the direct impact of your work on thousands of users.",
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Small Team, Big Impact",
                  description:
                    "You'll be one of two people on the technology team. Every line of code you write, every feature you ship, and every decision you make will shape the entire platform.",
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                },
                {
                  title: "Mission-Driven",
                  description:
                    "We help international students, skilled workers, and new immigrants discover Canadian employers who hire foreign talent. Your work directly helps people build new lives.",
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  ),
                },
                {
                  title: "Remote-First",
                  description:
                    "Work from anywhere in Canada. We care about what you build, not where you sit. Flexible hours and async communication are built into how we operate.",
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  ),
                },
                {
                  title: "Growth & Learning",
                  description:
                    "You'll work across the full stack, touch every part of the platform, and learn faster than you would anywhere else. We invest in your development with tools, courses, and AI resources.",
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  ),
                },
                {
                  title: "Competitive Compensation",
                  description:
                    "We offer competitive salary, equity opportunities, flexible time off, and a home office stipend. We believe in rewarding the people who build the business.",
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-8  hover:"
                >
                  <div className="text-[#2563EB]">{item.icon}</div>
                  <h3 className="mt-5 text-[18px] font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Position */}
        <section className="bg-[#0B0E14] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase text-[#6B7280]">
                Open Position
              </span>
              <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[48px]">
                Join our{" "}
                <span className="text-[#2563EB]">technology team</span>
              </h2>
            </div>

            {/* Job Card */}
            <div className="mt-16 mx-auto max-w-3xl rounded-2xl border border-[#2563EB] bg-white/5 p-10  ring-1 ring-[#2563EB]">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-lg font-bold text-white">
                  FS
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-white">
                    Full-Stack Web Developer & Digital Platform Manager
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-[#B0B8C4]">
                      Remote (Canada)
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-[#B0B8C4]">
                      Full-Time
                    </span>
                    <span className="rounded-full bg-[#2563EB]/10 px-4 py-1.5 text-sm font-medium text-[#2563EB]">
                      Technology Team
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="mt-10 space-y-10">
                {/* Overview */}
                <div>
                  <h4 className="text-[17px] font-semibold text-white">Overview</h4>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#B0B8C4]">
                    We are looking for a proactive and skilled Full-Stack Web Developer & Digital Platform
                    Manager to build, maintain, optimize, and continuously improve our website and digital
                    platforms. You will work closely with leadership and one other technology team member to
                    ensure the platform remains secure, scalable, reliable, and user-friendly.
                  </p>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#B0B8C4]">
                    This is a high-ownership technical role where you'll help shape the future of our
                    digital products. You won't just execute tasks — you'll define how we build.
                  </p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className="text-[17px] font-semibold text-white">What You'll Do</h4>
                  <div className="mt-4 space-y-6">
                    {[
                      {
                        category: "Website Development & Maintenance",
                        items: [
                          "Build, update, and maintain company websites and digital platforms",
                          "Develop new features, pages, and functionality",
                          "Troubleshoot technical issues and debug production problems",
                          "Improve website speed, performance, accessibility, and user experience",
                        ],
                      },
                      {
                        category: "Front-End Development",
                        items: [
                          "Create responsive and engaging user interfaces",
                          "Ensure compatibility across desktop and mobile devices",
                          "Implement designs, layouts, animations, and interactive features",
                        ],
                      },
                      {
                        category: "Back-End & Platform Management",
                        items: [
                          "Manage databases, integrations, APIs, and backend functionality",
                          "Support website infrastructure and technical operations",
                          "Maintain secure and organized systems with proper documentation",
                        ],
                      },
                      {
                        category: "Technical Operations",
                        items: [
                          "Manage hosting, domains, SSL certificates, backups, and deployments",
                          "Monitor website performance and uptime",
                          "Implement security best practices and data protection measures",
                          "Maintain technical documentation for all systems",
                        ],
                      },
                      {
                        category: "Product Development",
                        items: [
                          "Work with leadership to identify and prioritize platform improvements",
                          "Recommend new technologies and solutions",
                          "Test and launch new features with a focus on quality",
                          "Use analytics and user feedback to drive product decisions",
                        ],
                      },
                    ].map((section) => (
                      <div key={section.category}>
                        <h5 className="text-[15px] font-semibold text-[#2563EB]">{section.category}</h5>
                        <ul className="mt-3 space-y-2">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <svg
                                className="mt-1 h-4 w-4 flex-shrink-0 text-[#2563EB]"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-[15px] text-[#B0B8C4]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="text-[17px] font-semibold text-white">Required Skills</h4>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Experience developing and maintaining websites or web applications",
                      "Strong knowledge of HTML, CSS, and JavaScript/TypeScript",
                      "Experience with modern frameworks such as React, Next.js, Vue, or similar",
                      "Experience with databases (PostgreSQL, MySQL, or similar) and backend systems",
                      "Knowledge of REST APIs and third-party integrations",
                      "Understanding of hosting, domains, deployment pipelines, and website security",
                      "Strong troubleshooting, debugging, and problem-solving skills",
                      "Ability to work independently and take initiative in a startup environment",
                    ].map((skill) => (
                      <li key={skill} className="flex items-start gap-3">
                        <svg
                          className="mt-1 h-4 w-4 flex-shrink-0 text-[#2563EB]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[15px] text-[#B0B8C4]">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preferred Skills */}
                <div>
                  <h4 className="text-[17px] font-semibold text-white">Preferred Skills</h4>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Startup or small-team experience",
                      "Experience building platforms with databases, dashboards, or search functionality",
                      "Knowledge of SEO and website analytics",
                      "Experience with AI tools and automation",
                      "Familiarity with cloud platforms such as AWS, Vercel, Firebase, or similar",
                      "Understanding of data privacy and cybersecurity best practices",
                    ].map((skill) => (
                      <li key={skill} className="flex items-start gap-3">
                        <svg
                          className="mt-1 h-4 w-4 flex-shrink-0 text-[#6B7280]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[15px] text-[#6B7280]">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal Candidate */}
                <div>
                  <h4 className="text-[17px] font-semibold text-white">Who You Are</h4>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#B0B8C4]">
                    We're looking for someone who:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Takes full ownership of projects and sees them through to completion",
                      "Is comfortable managing multiple technical priorities in a fast-paced environment",
                      "Genuinely enjoys solving hard problems and debugging complex issues",
                      "Thinks strategically about technology choices and their business impact",
                      "Communicates clearly and proactively with non-technical team members",
                      "Wants to help build and scale a growing platform from the ground up",
                    ].map((trait) => (
                      <li key={trait} className="flex items-start gap-3">
                        <svg
                          className="mt-1 h-4 w-4 flex-shrink-0 text-[#2563EB]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[15px] text-[#B0B8C4]">{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Role Ownership */}
                <div>
                  <h4 className="text-[17px] font-semibold text-white">What You'll Own</h4>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Website functionality",
                      "Technical maintenance",
                      "Feature development",
                      "Platform improvements",
                      "Hosting & infrastructure",
                      "Security & performance",
                      "Digital integrations",
                      "Future product development",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3"
                      >
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-[#2563EB]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[15px] font-medium text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <div className="mt-12 rounded-2xl bg-[#0A0A0B] p-8 text-center">
                <h3 className="text-[24px] font-bold text-white">Ready to build something that matters?</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-[#6B7280]">
                  Send your CV, portfolio, and any relevant certifications to the email below.
                  We review every application personally.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3">
                  <a
                    href="mailto:contact@lmiacareersai.com?subject=Application: Full-Stack Web Developer & Digital Platform Manager"
                    className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white  hover:bg-[#1D4ED8]"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Apply Now
                  </a>
                  <p className="text-sm text-[#6B7280]">
                    Email: <span className="font-semibold text-white">contact@lmiacareersai.com</span>
                  </p>
                </div>
                <p className="mt-4 text-sm text-[#6B7280]">
                  Please include your CV, portfolio links, and any relevant certifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Culture */}
        <section className="bg-[#0B0E14] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-semibold uppercase text-[#6B7280]">
              Our Culture
            </span>
            <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[48px]">
              A team that{" "}
              <span className="text-[#2563EB]">moves fast</span> and builds with purpose
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-[#6B7280]">
              We're a small, focused team that believes in shipping quality work, communicating openly,
              and treating each other like adults. No bureaucracy, no unnecessary meetings — just
              meaningful work that helps real people.
            </p>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {[
                { label: "Team Size", value: "Small & focused" },
                { label: "Work Style", value: "Remote-first, async" },
                { label: " Values", value: "Ownership, quality, impact" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 ">
                  <p className="text-sm text-[#6B7280]">{stat.label}</p>
                  <p className="mt-2 text-[17px] font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
