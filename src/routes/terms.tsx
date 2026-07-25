import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — LMIA Career AI" },
      {
        name: "description",
        content:
          "Terms of Service for LMIA Career AI. Read our terms and conditions for using our Canadian employer intelligence platform.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/terms" }],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  const lastUpdated = "July 2025";

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
              Terms of Service
            </h1>
            <p className="mt-4 text-[15px] text-[#9CA3AF]">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-12 text-[16px] leading-[1.8] text-[#4B5563]">
            {/* 1. Acceptance */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using LMIA Career AI ("the Platform," "we," "us," or "our"), you agree
                to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms,
                please do not use the Platform. We may update these Terms from time to time, and your
                continued use of the Platform after any changes constitutes your acceptance of the
                revised Terms.
              </p>
            </section>

            {/* 2. Description of Service */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                2. Description of Service
              </h2>
              <p>
                LMIA Career AI is an employer intelligence platform that aggregates publicly available
                data about Canadian employers with documented hiring history under the Temporary
                Foreign Worker Program (TFWP). We provide tools including employer search and
                discovery, AI-powered job matching, resume optimization, and career preparation
                resources.
              </p>
              <p className="mt-4">
                <strong>Important:</strong> LMIA Career AI is not an immigration consultancy. We do
                not process visa applications, work permits, LMIA applications, or provide legal
                advice of any kind. We are an independent platform and are not affiliated with
                Immigration, Refugees and Citizenship Canada (IRCC), Employment and Social
                Development Canada (ESDC), or Service Canada.
              </p>
            </section>

            {/* 3. User Accounts */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                3. User Accounts and Responsibilities
              </h2>
              <p>
                To access certain features, you may need to create an account. You are responsible
                for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account. You agree to provide accurate, current,
                and complete information during the registration process and to update such
                information as needed. You must be at least 18 years old to create an account.
              </p>
            </section>

            {/* 4. Subscription and Payment */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                4. Subscription and Payment Terms
              </h2>
              <p>
                Certain features of the Platform may require a paid subscription. Subscription fees,
                billing cycles, and cancellation policies will be clearly presented at the time of
                purchase. All fees are in Canadian dollars (CAD) unless otherwise stated. You may
                cancel your subscription at any time; cancellation takes effect at the end of the
                current billing period. We do not provide refunds for partial billing periods unless
                required by applicable law.
              </p>
            </section>

            {/* 5. Intellectual Property */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                5. Intellectual Property
              </h2>
              <p>
                The Platform, including its design, code, branding, analytics, and proprietary
                scoring systems, is owned by LMIA Career AI and is protected by Canadian and
                international intellectual property laws. You may not copy, modify, distribute, or
                reverse-engineer any part of the Platform without our prior written consent.
              </p>
              <p className="mt-4">
                Employer data displayed on the Platform is sourced from publicly available
                government records. Individual employer names, logos, and trademarks remain the
                property of their respective owners.
              </p>
            </section>

            {/* 6. Third-Party Links */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                6. Third-Party Links
              </h2>
              <p>
                The Platform may contain links to third-party websites, including employer career
                pages and external job postings. We do not endorse or control these third-party
                websites and are not responsible for their content, accuracy, or practices. You
                access third-party links at your own risk.
              </p>
            </section>

            {/* 7. Disclaimer of Warranties */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p>
                The Platform is provided on an "as is" and "as available" basis. We make no
                warranties, express or implied, regarding the accuracy, completeness, or reliability
                of the information displayed. Employer data is sourced from publicly available
                information and may not reflect current hiring activity. We do not guarantee
                employment, visa approval, or any immigration outcomes.
              </p>
            </section>

            {/* 8. Limitation of Liability */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, LMIA Career AI and its team members shall
                not be liable for any indirect, incidental, special, or consequential damages
                arising from your use of or inability to use the Platform, including but not limited
                to lost opportunities, employment outcomes, or immigration decisions made based on
                Platform data.
              </p>
            </section>

            {/* 9. Governing Law */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                9. Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of Canada and
                the province of Ontario, without regard to conflict of law principles. Any disputes
                arising from these Terms shall be resolved in the courts of Ontario.
              </p>
            </section>

            {/* 10. Contact */}
            <section>
              <h2 className="text-[22px] font-bold text-[#0A0A0B] mb-4">
                10. Contact Information
              </h2>
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="mt-3">
                <a
                  href="mailto:contact@lmiacareersai.com"
                  className="font-medium text-[#2563EB] hover:underline"
                >
                  contact@lmiacareersai.com
                </a>
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
