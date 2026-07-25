import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { getProfile } from "~/server/profile";
import { getJobMatches, type JobMatch } from "~/server/matching";
import { employers } from "~/data/employers";
import { useState, useEffect } from "react";
import type { Profile } from "~/server/profile";
import { MatchScoreBadge } from "~/components/MatchScoreBadge";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  loader: async () => {
    try {
      const profile = await getProfile();
      let matches: JobMatch[] = [];
      if (profile) {
        try {
          matches = await getJobMatches();
        } catch {
          // getJobMatches will return [] if no profile
        }
      }
      return { profile, matches };
    } catch {
      return { profile: null, matches: [] };
    }
  },
});

// ── Helpers ────────────────────────────────────────────────────────────────

function computeCompleteness(profile: Profile | null): number {
  if (!profile) return 0;
  const fields = [
    !!profile.full_name,
    !!profile.work_authorization,
    !!profile.education,
    !!profile.experience,
    (profile.skills?.length ?? 0) > 0,
    !!profile.preferred_province,
    !!profile.preferred_salary,
    !!profile.resume_text,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

function getMissingFields(profile: Profile | null): string {
  if (!profile) return "complete your profile";
  const missing: string[] = [];
  if (!profile.full_name) missing.push("your name");
  if (!profile.work_authorization) missing.push("work authorization");
  if (!profile.education) missing.push("education");
  if (!profile.experience) missing.push("experience");
  if (!(profile.skills?.length)) missing.push("skills");
  if (!profile.preferred_province) missing.push("preferred province");
  if (!profile.preferred_salary) missing.push("salary range");
  if (!profile.resume_text) missing.push("resume");
  if (missing.length === 0) return "";
  if (missing.length === 1) return `add ${missing[0]}`;
  return `add ${missing.slice(0, -1).join(", ")} and ${missing[missing.length - 1]}`;
}

// ── Page ───────────────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50 dark:bg-gray-950">
        <SignedIn>
          <DashboardContent />
        </SignedIn>
        <SignedOut>
          <Unauthenticated />
        </SignedOut>
      </main>
      <Footer />
    </>
  );
}

// ── Dashboard Content ──────────────────────────────────────────────────────

function DashboardContent() {
  const { user } = useUser();
  const { profile: initialProfile, matches: initialMatches } = Route.useLoaderData();
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [matches, setMatches] = useState<JobMatch[]>(initialMatches);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const completeness = computeCompleteness(profile);
  const missingText = getMissingFields(profile);
  const hasProfile = !!profile;
  const hasSkills = hasProfile && (profile?.skills?.length ?? 0) > 0;
  const needsOnboarding = !hasProfile || completeness < 30;

  const userName =
    profile?.full_name || user?.firstName || "there";

  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  useEffect(() => {
    setMatches(initialMatches);
  }, [initialMatches]);

  const topMatches = matches.slice(0, 5);
  const matchCount = matches.length;

  const navItems = [
    {
      label: "Dashboard",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      to: "/dashboard",
    },
    {
      label: "Profile",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      to: "/onboarding",
    },
    {
      label: "Best Matches",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
      to: "/matches",
    },
    {
      label: "Saved Jobs",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      ),
      to: "/dashboard",
    },
    {
      label: "Applications",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      to: "/dashboard",
    },
    {
      label: "Settings",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      to: "/dashboard",
    },
  ];

  return (
    <div className="flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-[57px] left-0 z-50 h-[calc(100dvh-57px)] w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 dark:border-gray-700 dark:bg-gray-900 lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* User info */}
          <div className="border-b border-gray-100 px-5 py-5 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {userName}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {profile?.work_authorization || "Job Seeker"}
                </p>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400 [&.active]:bg-blue-50 [&.active]:text-blue-700 dark:[&.active]:bg-blue-900/20 dark:[&.active]:text-blue-400"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Employer link */}
          <div className="border-t border-gray-100 px-3 py-4 dark:border-gray-700">
            <Link
              to="/employers"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              Browse Employers
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile header bar */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden dark:border-gray-700 dark:bg-gray-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Open sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Dashboard
          </span>
        </div>

        <div className="px-4 py-8 sm:px-6 lg:px-8">
          {/* Onboarding banner */}
          {needsOnboarding && (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-900/20 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Complete your profile to unlock AI job matches
                  </h3>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                    {missingText
                      ? `You still need to ${missingText}.`
                      : "Fill out your profile to get personalized employer matches."}
                  </p>
                </div>
                <Link
                  to="/onboarding"
                  className="inline-flex items-center gap-2 self-start rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 sm:self-center"
                >
                  Complete Profile
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Welcome back, {userName}!
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here&apos;s an overview of your job search activity.
            </p>
          </div>

          {/* Stats row */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Profile Complete"
              value={`${completeness}%`}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              }
              color="blue"
            />
            <StatCard
              label="Jobs Matched"
              value={String(matchCount)}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              }
              color="green"
            />
            <StatCard
              label="Saved Jobs"
              value="5"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              }
              color="purple"
            />
            <StatCard
              label="Applications"
              value="3"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              }
              color="amber"
            />
          </div>

          {/* Two-column grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Top Job Matches */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Top Job Matches
                  </h2>
                  <Link
                    to="/matches"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View All Matches
                  </Link>
                </div>

                {!hasSkills && hasProfile && (
                  <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/20">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Complete your profile</strong> with skills and preferences to see your personalized job matches.
                    </p>
                    <Link
                      to="/onboarding"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Add Skills & Preferences
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                )}

                {!hasProfile && (
                  <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/20">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Complete your profile</strong> to get AI-powered job matches tailored to your skills and experience.
                    </p>
                    <Link
                      to="/onboarding"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Set Up Your Profile
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                )}

                {hasSkills && topMatches.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {topMatches.map((match) => {
                      const emp = employers.find((e) => e.slug === match.job.employerSlug);
                      return (
                        <Link
                          key={match.job.id}
                          to="/jobs/$jobId"
                          params={{ jobId: match.job.id }}
                          className="group block rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-blue-800"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <MatchScoreBadge score={match.matchScore} size="sm" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                {match.job.title}
                              </h3>
                              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                {emp?.name || "Employer"}
                              </p>
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                  {match.job.location}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                  {match.job.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {hasSkills && topMatches.length === 0 && (
                  <div className="py-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      No job matches found. Try adding more skills to your profile.
                    </p>
                  </div>
                )}
              </div>

              {/* Recent activity */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  <ActivityItem
                    title="Profile created"
                    time="Just now"
                    icon={null}
                    active
                  />
                  <ActivityItem
                    title="AI job matching"
                    time="Coming soon"
                    icon={null}
                  />
                  <ActivityItem
                    title="Resume analysis"
                    time="Coming soon"
                    icon={null}
                  />
                  <ActivityItem
                    title="Interview preparation"
                    time="Coming soon"
                    icon={null}
                  />
                </div>
              </div>
            </div>

            {/* Side column */}
            <div className="space-y-6">
              {/* Resume score */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Resume AI Score
                </h2>
                {profile?.resume_text ? (
                  <div className="mt-4 text-center">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        —
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Resume uploaded
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      AI scoring coming soon
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 text-center">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Upload your resume to get an AI score
                    </p>
                    <Link
                      to="/onboarding"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Upload Now
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile completeness card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Profile Completeness
                </h2>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {completeness}%
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      complete
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${completeness}%` }}
                    />
                  </div>
                  {missingText && (
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      {completeness}% complete — {missingText}
                    </p>
                  )}
                  {!missingText && completeness === 100 && (
                    <p className="mt-3 text-sm text-green-600 dark:text-green-400">
                      Your profile is complete!
                    </p>
                  )}
                  <Link
                    to="/onboarding"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {completeness < 100 ? "Complete Profile" : "Edit Profile"}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Quick tips */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Quick Tips
                </h2>
                <ul className="mt-3 space-y-3">
                  <li className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      1
                    </span>
                    Complete your profile to get matched with relevant employers.
                  </li>
                  <li className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      2
                    </span>
                    Upload your resume for AI-powered optimization.
                  </li>
                  <li className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      3
                    </span>
                    Browse employers and save jobs you&apos;re interested in.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "amber";
}) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    green:
      "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    amber:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[color]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

// ── Activity Item ──────────────────────────────────────────────────────────

function ActivityItem({
  title,
  time,
  icon,
  active,
}: {
  title: string;
  time: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 flex h-3 w-3 flex-shrink-0 rounded-full ${
          active
            ? "bg-blue-600 dark:bg-blue-400"
            : "bg-gray-300 dark:bg-gray-600"
        }`}
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
      {icon}
    </div>
  );
}

// ── Unauthenticated ────────────────────────────────────────────────────────

function Unauthenticated() {
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
