import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-32 sm:py-40 lg:py-48">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-[56px] font-bold leading-[1.08] tracking-[-0.03em] text-[#0A0A0B] sm:text-[64px]">
            Find Canadian employers{" "}
            <span className="text-[#2563EB]">who are hiring</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-xl text-[18px] leading-[1.7] text-[#6B7280]">
            Discover employers with documented TFWP hiring history, get AI-matched to jobs that fit
            your skills, and optimize every application — all in one place.
          </p>

          {/* Waitlist form */}
          <div className="mt-12 flex justify-center">
            <WaitlistForm variant="hero" />
          </div>

          {/* Social proof */}
          <p className="mt-6 text-[15px] text-[#9CA3AF]">
            Join 1,200+ job seekers already on the waitlist
          </p>
        </div>
      </div>
    </section>
  );
}
