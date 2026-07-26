import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — LMIA Career AI" },
      {
        name: "description",
        content:
          "Privacy Policy for LMIA Career AI. Learn how we collect, use, and protect your personal data on our employer intelligence platform.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/privacy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const lastUpdated = `July ${new Date().getFullYear()}`;

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#0B0E14]">
        {/* Header */}
        <section className="bg-[#0B0E14] px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase text-[#6B7280]">
              Legal
            </span>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[48px]">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[15px] text-[#6B7280]">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-12 text-[16px] leading-[1.8] text-[#B0B8C4]">
            {/* Intro */}
            <section>
              <p>
                At LMIA Career AI, we take your privacy seriously. This Privacy Policy explains how we
                collect, use, store, and protect your personal information when you use our platform.
                We comply with Canada's Personal Information Protection and Electronic Documents Act
                (PIPEDA) and other applicable privacy laws.
              </p>
            </section>

            {/* 1. Information We Collect */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-3">We collect the following types of information:</p>
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Account Information:</strong> When you sign up, we collect your email
                    address and authentication credentials. Account authentication is managed
                    through Clerk, our identity provider.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Profile Data:</strong> Information you voluntarily provide including
                    your name, skills, work experience, education, career preferences, and target
                    roles or industries.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Resume Content:</strong> If you upload a resume, we extract and store
                    the text content to power our AI matching engine. We do not sell or share your
                    resume with third parties.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Usage Data:</strong> We collect anonymous usage data such as pages
                    visited, features used, and time spent on the platform to improve our service.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Waitlist Sign-ups:</strong> If you join our waitlist, we collect your
                    email address solely for the purpose of notifying you when we launch.
                  </span>
                </li>
              </ul>
            </section>

            {/* 2. How We Use Information */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use your information for the following purposes:</p>
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>To match you with relevant employers and job opportunities using our AI engine.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>To optimize your resume and generate tailored career preparation materials.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>To communicate with you about platform updates, features, and your account.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>To improve and develop the Platform based on aggregated usage patterns.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>To comply with legal obligations and enforce our Terms of Service.</span>
                </li>
              </ul>
            </section>

            {/* 3. Data Storage and Security */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                3. Data Storage and Security
              </h2>
              <p>
                We store your data using Neon (serverless Postgres) with encryption at rest and in
                transit. Authentication is managed through Clerk, which provides secure,
                industry-standard identity management. We implement reasonable technical and
                organizational measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 4. Cookies and Analytics */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                4. Cookies and Analytics
              </h2>
              <p>
                We use essential cookies required for platform functionality (such as authentication
                sessions) and may use analytics cookies to understand how users interact with the
                Platform. You can control cookie preferences through your browser settings. We do
                not use advertising or tracking cookies from third-party ad networks.
              </p>
            </section>

            {/* 5. Third-Party Services */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                5. Third-Party Services
              </h2>
              <p>
                We rely on trusted third-party services to operate the Platform. These providers
                have their own privacy policies, and we encourage you to review them:
              </p>
              <ul className="mt-3 space-y-2" role="list">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Clerk</strong> — User authentication and identity management.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Neon</strong> — Database hosting (serverless Postgres).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Vercel</strong> — Application hosting and deployment.
                  </span>
                </li>
              </ul>
            </section>

            {/* 6. Data Retention */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                6. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as your account is active or as
                needed to provide you with the Platform's services. If you delete your account, we
                will remove your personal data within 30 days, except where retention is required
                by law or for legitimate business purposes (such as fraud prevention or resolving
                disputes).
              </p>
            </section>

            {/* 7. User Rights */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                7. Your Rights
              </h2>
              <p className="mb-3">
                Under Canadian privacy law (PIPEDA), you have the right to:
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Access</strong> your personal information and request a copy of the data
                    we hold about you.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Correction</strong> — Request corrections to inaccurate or incomplete
                    personal information.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Deletion</strong> — Request deletion of your personal information,
                    subject to legal retention requirements.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                  <span>
                    <strong>Withdraw Consent</strong> — Withdraw your consent for data processing at
                    any time, which may limit your ability to use certain features.
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at the email address below. We
                will respond to your request within 30 days as required by PIPEDA.
              </p>
            </section>

            {/* 8. Contact */}
            <section>
              <h2 className="text-[22px] font-bold text-white mb-4">
                8. Contact Information
              </h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your privacy
                rights, please contact us at:
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
