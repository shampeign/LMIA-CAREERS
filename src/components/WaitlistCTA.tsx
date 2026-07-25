import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/tanstack-start";

export function WaitlistCTA() {
  return (
    <section className="bg-white px-6 py-40">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0A0B]">
          Ready to start your Canadian career?
        </h2>
        <p className="mt-6 text-[18px] leading-relaxed text-[#4B5563]">
          Sign up and get access to our employer directory, AI job matching, and application tools.
        </p>
        <p className="mt-3 text-[14px] text-[#9CA3AF]">
          Trusted by job seekers from 40+ countries
        </p>
        <div className="mt-10">
          <SignedOut>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
              >
                Get Started
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
            >
              Go to Dashboard
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}
