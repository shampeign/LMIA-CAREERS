import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        <SignedIn>
          <DashboardContent />
        </SignedIn>
        <SignedOut>
          <DashboardUnauthenticated />
        </SignedOut>
      </main>
      <Footer />
    </>
  );
}

function DashboardContent() {
  const { user } = useUser();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Welcome header */}
      <div className="mb-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Dashboard
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Your personalized LMIA Career AI dashboard is coming soon. We&apos;re
          building powerful tools to help you find and land your dream job in
          Canada.
        </p>
      </div>

      {/* Placeholder cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Job Matches card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            AI Job Matches
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Get matched with Canadian employers that fit your skills and
            experience.
          </p>
          <div className="mt-4 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            Coming Soon
          </div>
        </div>

        {/* Resume Optimizer card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/40">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Resume Optimizer
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            AI-powered resume tailoring to match Canadian employer
            expectations.
          </p>
          <div className="mt-4 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            Coming Soon
          </div>
        </div>

        {/* Track Applications card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/40">
            <svg
              className="h-6 w-6 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Application Tracker
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Track your job applications, interviews, and follow-ups in one
            place.
          </p>
          <div className="mt-4 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            Coming Soon
          </div>
        </div>
      </div>

      {/* Browse employers CTA */}
      <div className="mt-12 rounded-2xl bg-blue-600 p-8 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Start Exploring Employers
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-blue-100">
          Browse our directory of Canadian employers with documented TFWP hiring
          history while we build out your personalized dashboard.
        </p>
        <Link
          to="/employers"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
        >
          Browse Employers
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function DashboardUnauthenticated() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
        <svg
          className="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </div>
      <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
        Sign In Required
      </h2>
      <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
        You need to sign in to access your dashboard. Create an account to get
        started with AI-powered job matching.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <SignInButton mode="modal">
          <button
            type="button"
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Sign In
          </button>
        </SignInButton>
        <Link
          to="/sign-up"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
