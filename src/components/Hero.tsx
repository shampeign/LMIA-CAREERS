import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 dark:bg-gray-950 sm:py-28 lg:py-36">
      {/* Background AI-themed illustration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-900/20" />
        {/* Animated dots - neural network feel */}
        <div className="absolute left-1/4 top-1/3 h-2 w-2 animate-float rounded-full bg-blue-400/40 dark:bg-blue-500/30" />
        <div className="animation-delay-200 absolute left-1/3 top-1/4 h-3 w-3 animate-float rounded-full bg-blue-500/30 dark:bg-blue-400/20" />
        <div className="animation-delay-400 absolute right-1/4 top-1/3 h-2.5 w-2.5 animate-float rounded-full bg-indigo-400/30 dark:bg-indigo-500/20" />
        <div className="animation-delay-600 absolute right-1/3 bottom-1/4 h-2 w-2 animate-float rounded-full bg-blue-400/40 dark:bg-blue-500/30" />
        <div className="absolute bottom-1/3 left-1/2 h-1.5 w-1.5 animate-float rounded-full bg-indigo-500/40 dark:bg-indigo-400/30" />
        {/* Grid lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            AI-Powered Job Search for Canada
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Find Canadian Employers{" "}
            <span className="text-blue-600 dark:text-blue-400">Who Are Hiring</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Discover employers with documented TFWP hiring history, get AI-matched to jobs that fit
            your skills, and optimize every application — from resume to interview — all in one place.
          </p>

          {/* Waitlist form */}
          <div className="mt-10 flex justify-center">
            <WaitlistForm variant="hero" />
          </div>

          {/* Social proof */}
          <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
            Join 1,200+ job seekers already on the waitlist
          </p>
        </div>
      </div>
    </section>
  );
}
