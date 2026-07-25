import { Link } from "@tanstack/react-router";

export function WaitlistCTA() {
  return (
    <section className="bg-[#0A0A0B] px-6 py-40">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
          Ready to start your Canadian career?
        </h2>
        <p className="mt-6 text-[18px] leading-relaxed text-[#9CA3AF]">
          Sign up and get access to our employer directory, AI job matching, and application tools.
        </p>
        <div className="mt-10">
          <Link
            to="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white hover:bg-[#1D4ED8]"
          >
            Get Started
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
