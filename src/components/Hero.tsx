import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/tanstack-start";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-white to-[#EFF6FF] px-6 pt-28 pb-20 sm:pt-40 sm:pb-28">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#1A1A2E] sm:text-[68px]">
          Find Your Canadian{" "}
          <span className="text-[#2563EB]">Career</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-7 max-w-xl text-[18px] leading-relaxed text-[#6B7280] sm:text-[20px]">
          Discover employers with TFWP hiring history, get AI-matched to jobs, and optimize every application.
        </p>

        {/* Dual CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SignedOut>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white hover:bg-[#1D4ED8] shadow-lg shadow-[#2563EB]/20 transition-all hover:shadow-xl hover:shadow-[#2563EB]/30"
              >
                Get Started Free
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white hover:bg-[#1D4ED8] shadow-lg shadow-[#2563EB]/20 transition-all hover:shadow-xl hover:shadow-[#2563EB]/30"
            >
              Go to Dashboard
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </SignedIn>
          <Link
            to="/employers"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#E5E7EB] px-8 py-4 text-[16px] font-semibold text-[#1A1A2E] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            Browse Employers
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-[15px] text-[#9CA3AF]">
          Join 1,200+ job seekers already on the platform
        </p>
      </div>
    </section>
  );
}
