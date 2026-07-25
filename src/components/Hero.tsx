import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/tanstack-start";

export function Hero() {
  return (
    <section className="bg-[#0B0E14] px-6 pt-32 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h1 className="text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[72px]">
          Find Canadian employers who are hiring
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-8 max-w-xl text-[18px] leading-relaxed text-[#9CA3AF] sm:text-[20px]">
          Discover employers with TFWP hiring history, get AI-matched to jobs, and optimize every application.
        </p>

        {/* Dual CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SignedOut>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
              >
                For Job Seekers
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
          <Link
            to="/employers"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-[16px] font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-colors"
          >
            For Employers
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Feature visual — simple icon grid */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-60">
          {[
            { icon: "🏢", label: "Employer Directory" },
            { icon: "🤖", label: "AI Matching" },
            { icon: "📊", label: "Analytics" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-[14px] font-medium text-[#9CA3AF]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
