import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — LMIA Career AI" },
      {
        name: "description",
        content:
          "Disclaimer for LMIA Career AI. We do not provide immigration advice. Our platform uses publicly available data for informational purposes only.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/disclaimer" }],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Header */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
              Legal
            </span>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
              LMIA Disclaimer
            </h1>
            <p className="mt-4 text-[15px] text-[#9CA3AF]">
              Important information about our platform
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-10 text-[16px] leading-[1.8] text-[#4B5563]">
            {/* Primary disclaimer - prominent */}
            <div className="rounded-3xl border-2 border-[#F59E0B]/30 bg-[#F59E0B]/5 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <svg
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#F59E0B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <div>
                  <p className="text-[17px] font-semibold text-[#0A0A0B] leading-snug">
                    LMIA Career AI is an independent platform. We are NOT affiliated with, endorsed
                    by, or connected to Immigration, Refugees and Citizenship Canada (IRCC),
                    Employment and Social Development Canada (ESDC), or Service Canada.
                  </p>
                </div>
              </div>
            </div>

            {/* Key disclaimers */}
            <section className="space-y-6">
              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                <h2 className="text-[18px] font-bold text-[#0A0A0B] mb-3">
                  We Do Not Process Immigration Applications
                </h2>
                <p>
                  LMIA Career AI does not process, facilitate, or submit visa applications, work
                  permits, or Labour Market Impact Assessment (LMIA) applications of any kind. We
                  are a career intelligence platform — not an immigration consultancy, law firm, or
                  government service.
                </p>
              </div>

              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                <h2 className="text-[18px] font-bold text-[#0A0A0B] mb-3">
                  No Guarantees of Employment or Immigration Outcomes
                </h2>
                <p>
                  We do not guarantee employment, job offers, visa approval, work permit issuance,
                  permanent residency, or any other immigration outcomes. The Platform provides
                  information and tools to assist your job search — hiring decisions are made solely
                  by employers, and immigration decisions are made solely by government authorities.
                </p>
              </div>

              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                <h2 className="text-[18px] font-bold text-[#0A0A0B] mb-3">
                  Data Sourced from Public Records
                </h2>
                <p>
                  Employer data displayed on the Platform is sourced from publicly available
                  government information, including TFWP LMIA records. This data may not reflect
                  current hiring activity, and employer circumstances change over time. Always
                  verify information directly with employers and through official government
                  channels.
                </p>
              </div>

              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                <h2 className="text-[18px] font-bold text-[#0A0A0B] mb-3">
                  Verify with Official Sources
                </h2>
                <p className="mb-4">
                  We strongly encourage you to verify any information found on our Platform with
                  official government sources. Key resources include:
                </p>
                <ul className="space-y-3" role="list">
                  <li>
                    <a
                      href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-[#2563EB] hover:underline"
                    >
                      Immigration, Refugees and Citizenship Canada (IRCC)
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.canada.ca/en/employment-social-development.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-[#2563EB] hover:underline"
                    >
                      Employment and Social Development Canada (ESDC)
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.canada.ca/en/employment-social-development/services/foreign-workers.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-[#2563EB] hover:underline"
                    >
                      Temporary Foreign Worker Program (TFWP)
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A0A0B] mb-3">
                Questions?
              </h2>
              <p>
                If you have questions about this disclaimer or need clarification on any point,
                please reach out at{" "}
                <a
                  href="mailto:contact@lmiacareersai.com"
                  className="font-medium text-[#2563EB] hover:underline"
                >
                  contact@lmiacareersai.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
