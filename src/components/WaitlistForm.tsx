import { useState, type FormEvent } from "react";
import { submitWaitlistEmail } from "~/server/waitlist";

interface WaitlistFormProps {
  variant?: "hero" | "cta";
}

export function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await submitWaitlistEmail({ data: email.trim() });
      if (result.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400";

  const buttonClasses =
    "inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-gray-900";

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/30"
        role="alert"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/50">
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-base font-semibold text-green-800 dark:text-green-200">
          You're on the list!
        </p>
        <p className="mt-1 text-sm text-green-600 dark:text-green-400">
          We'll notify you when we launch. Stay tuned!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div
        className={`flex gap-3 ${variant === "hero" ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}
      >
        <label htmlFor={`waitlist-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
          aria-label="Email address"
        />
        <button type="submit" disabled={loading} className={buttonClasses}>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Joining...
            </span>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        No spam, ever. We'll only email you when we launch.
      </p>
    </form>
  );
}
