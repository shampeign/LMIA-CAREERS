import { WaitlistForm } from "./WaitlistForm";

export function WaitlistCTA() {
  return (
    <section id="waitlist" className="bg-blue-600 px-4 py-20 dark:bg-blue-700 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Be the first to know when we launch
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Join our waitlist and get early access to the platform. No spam — just a single email when
          we're live.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm variant="cta" />
        </div>
      </div>
    </section>
  );
}
