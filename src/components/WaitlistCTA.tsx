import { WaitlistForm } from "./WaitlistForm";

export function WaitlistCTA() {
  return (
    <section id="waitlist" className="bg-[#0A0A0B] px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[48px]">
          Be the first to know when we launch
        </h2>
        <p className="mt-6 text-[18px] leading-relaxed text-[#9CA3AF]">
          Join our waitlist and get early access to the platform. No spam — just a single email when
          we're live.
        </p>
        <div className="mt-10 flex justify-center">
          <WaitlistForm variant="cta" />
        </div>
      </div>
    </section>
  );
}
