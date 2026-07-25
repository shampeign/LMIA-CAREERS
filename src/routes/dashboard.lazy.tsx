import { Link, getRouteApi } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { employers } from "~/data/employers";
import { jobs as allJobs } from "~/data/jobs";
import { useState, useEffect } from "react";
import type { Profile } from "~/server/profile";
import { MatchScoreBadge } from "~/components/MatchScoreBadge";
export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#0B0E14]">
        <SignedIn><DashboardContent /></SignedIn>
        <SignedOut><Unauthenticated /></SignedOut>
      </main>
      <Footer />
    </>
  );
}

function DashboardContent() {
  const { user } = useUser();
  const routeApi = getRouteApi("/dashboard");
  const { profile: initialProfile, matches: initialMatches, savedJobIds: initialSaved } = routeApi.useLoaderData();
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [matches, setMatches] = useState<JobMatch[]>(initialMatches);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(initialSaved);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { setProfile(initialProfile); }, [initialProfile]);
  useEffect(() => { setMatches(initialMatches); }, [initialMatches]);
  useEffect(() => { setSavedJobIds(initialSaved); }, [initialSaved]);

  const savedJobsList = allJobs.filter((j) => savedJobIds.includes(j.id));
  const completeness = computeCompleteness(profile);
  const missingText = getMissingFields(profile);
  const hasProfile = !!profile;
  const hasSkills = hasProfile && (profile?.skills?.length ?? 0) > 0;
  const needsOnboarding = !hasProfile || completeness < 30;
  const userName = profile?.full_name || user?.firstName || "there";

  const topMatches = matches.slice(0, 5);
  const matchCount = matches.length;

  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
    { label: "Profile", to: "/onboarding", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
    { label: "Best Matches", to: "/matches", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg> },
    { label: "Saved Jobs", to: "/dashboard", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg> },
    { label: "Applications", to: "/dashboard", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg> },
    { label: "Settings", to: "/dashboard", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  return (
    <div className="flex">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed top-[73px] left-0 z-50 h-[calc(100dvh-73px)] w-64 transform border-r border-white/10 bg-white/5 transition-transform duration-200 lg:sticky lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A0A0B] text-sm font-bold text-white">{userName.charAt(0).toUpperCase()}</div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-white">{userName}</p>
                <p className="truncate text-sm text-[#6B7280]">{profile?.work_authorization || "Job Seeker"}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-5">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium text-[#B0B8C4] transition-colors hover:bg-white/5 hover:text-white [&.active]:bg-white/10 [&.active]:text-white">
                {item.icon}{item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-white/10 px-4 py-5">
            <Link to="/employers" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium text-[#B0B8C4] transition-colors hover:bg-white/5 hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>
              Browse Employers
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-6 py-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-xl p-2 text-[#B0B8C4] hover:bg-white/5" aria-label="Open sidebar">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          </button>
          <span className="text-[15px] font-semibold text-white">Dashboard</span>
        </div>

        <div className="px-6 py-10 lg:px-10">
          {needsOnboarding && (
            <div className="mb-10 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#92400E]">Complete your profile to unlock AI job matches</h3>
                  <p className="mt-2 text-sm text-[#D97706]">{missingText ? `You still need to ${missingText}.` : "Fill out your profile to get personalized employer matches."}</p>
                </div>
                <Link to="/onboarding" className="inline-flex items-center gap-2 self-start rounded-2xl bg-[#D97706] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B45309] sm:self-center">
                  Complete Profile
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          )}

          {hasProfile && (profile?.plan || "free") === "free" && (
            <div className="mb-10 rounded-2xl border border-[#DBEAFE] bg-gradient-to-r from-[#EFF6FF] to-[#F8FAFC] p-6 sm:p-8">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-lg font-bold text-[#1E40AF]">You&apos;re on the Free plan</h3>
                  <p className="mt-2 text-sm text-[#3B82F6]">Upgrade to unlock application links, AI resume optimization, and premium features.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://buy.stripe.com/bJefZheVr1wk0810fvaEE00"
                    className="inline-flex items-center gap-2 self-start rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                  >
                    Upgrade to Professional — $19/mo
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </a>
                  <a
                    href="https://buy.stripe.com/5KQ14ndRn1wk9IB0fvaEE01"
                    className="inline-flex items-center gap-2 self-start rounded-2xl border border-[#2563EB] bg-transparent px-5 py-3 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB]/10"
                  >
                    Upgrade to Premium — $39/mo
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="mb-10">
            <h1 className="text-[36px] font-bold tracking-[-0.03em] text-white">Welcome back, {userName}!</h1>
            <p className="mt-2 text-[16px] text-[#6B7280]">Here&apos;s an overview of your job search activity.</p>
          </div>

          <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Profile Complete", value: `${completeness}%`, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>, iconBg: "bg-[#DBEAFE] text-[#2563EB]" },
              { label: "Jobs Matched", value: String(matchCount), icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>, iconBg: "bg-[#F0FDF4] text-[#16A34A]" },
              { label: "Saved Jobs", value: String(savedJobIds.length), icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>, iconBg: "bg-[#F3E8FF] text-[#9333EA]" },
              { label: "Applications", value: "3", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>, iconBg: "bg-[#FFFBEB] text-[#D97706]" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 ">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.iconBg}`}>{stat.icon}</div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-[#6B7280]">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Top Job Matches</h2>
                  <Link to="/matches" className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]">View All Matches</Link>
                </div>
                {!hasSkills && hasProfile && (
                  <div className="mb-6 rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">
                    <p className="text-sm text-[#1E40AF]"><strong>Complete your profile</strong> with skills and preferences to see your personalized job matches.</p>
                    <Link to="/onboarding" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]">Add Skills & Preferences <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                  </div>
                )}
                {!hasProfile && (
                  <div className="mb-6 rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">
                    <p className="text-sm text-[#1E40AF]"><strong>Complete your profile</strong> to get AI-powered job matches tailored to your skills and experience.</p>
                    <Link to="/onboarding" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]">Set Up Your Profile <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                  </div>
                )}
                {hasSkills && topMatches.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {topMatches.map((match) => {
                      const emp = employers.find((e) => e.slug === match.job.employerSlug);
                      return (
                        <Link key={match.job.id} to="/jobs/$jobId" params={{ jobId: match.job.id }} className="group block rounded-2xl border border-white/10 bg-white/5 p-5 hover:">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0"><MatchScoreBadge score={match.matchScore} size="sm" /></div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-[#2563EB]">{match.job.title}</h3>
                              <p className="mt-1 text-xs text-[#6B7280]">{emp?.name || "Employer"}</p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-[#B0B8C4]">{match.job.location}</span>
                                <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-[#6B7280]">{match.job.category}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
                {hasSkills && topMatches.length === 0 && (
                  <div className="py-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-[#E5E7EB]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    <p className="mt-4 text-sm text-[#6B7280]">No job matches found. Try adding more skills to your profile.</p>
                  </div>
                )}
              </div>

              {/* Saved Jobs */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Saved Jobs</h2>
                  <span className="text-sm text-[#6B7280]">{savedJobsList.length} saved</span>
                </div>
                {savedJobsList.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {savedJobsList.slice(0, 6).map((job) => {
                      const emp = employers.find((e) => e.slug === job.employerSlug);
                      return (
                        <Link key={job.id} to="/jobs/$jobId" params={{ jobId: job.id }} className="group block rounded-2xl border border-white/10 bg-white/5 p-5 hover:">
                          <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-[#2563EB]">{job.title}</h3>
                          <p className="mt-1 text-xs text-[#6B7280]">{emp?.name || "Employer"} &middot; {job.location}</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-[#B0B8C4]">{job.type}</span>
                            <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-[#6B7280]">{job.salary}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-[#E5E7EB]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                    <p className="mt-4 text-sm text-[#6B7280]">No saved jobs yet. Browse jobs and bookmark the ones you like.</p>
                    <Link to="/jobs" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]">Browse Jobs <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ">
                <h2 className="mb-6 text-xl font-bold text-white">Recent Activity</h2>
                <div className="space-y-5">
                  {[
                    { title: "Profile created", time: "Just now", active: true },
                    { title: "AI job matching", time: "Coming soon" },
                    { title: "Resume analysis", time: "Coming soon" },
                    { title: "Interview preparation", time: "Coming soon" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className={`mt-1 flex h-3 w-3 flex-shrink-0 rounded-full ${item.active ? "bg-[#2563EB]" : "bg-white/10"}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-[#6B7280]">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ">
                <h2 className="text-sm font-semibold text-white">Resume AI Score</h2>
                {profile?.resume_text ? (
                  <div className="mt-6 text-center">
                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/10"><span className="text-3xl font-bold text-[#6B7280]">—</span></div>
                    <p className="mt-4 text-sm font-medium text-white">Resume uploaded</p>
                    <p className="mt-1 text-xs text-[#6B7280]">AI scoring coming soon</p>
                  </div>
                ) : (
                  <div className="mt-6 text-center">
                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                      <svg className="h-10 w-10 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    </div>
                    <p className="mt-4 text-sm font-medium text-white">Upload your resume to get an AI score</p>
                    <Link to="/onboarding" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]">Upload Now <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ">
                <h2 className="text-sm font-semibold text-white">Profile Completeness</h2>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-white">{completeness}%</span>
                    <span className="text-sm text-[#6B7280]">complete</span>
                  </div>
                  <div className="mt-4 h-2.5 w-full rounded-full bg-white/10"><div className="h-2.5 rounded-full bg-[#2563EB] duration-500" style={{ width: `${completeness}%` }} /></div>
                  {missingText && <p className="mt-4 text-sm text-[#6B7280]">{completeness}% complete — {missingText}</p>}
                  {!missingText && completeness === 100 && <p className="mt-4 text-sm text-[#16A34A]">Your profile is complete!</p>}
                  <Link to="/onboarding" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]">{completeness < 100 ? "Complete Profile" : "Edit Profile"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ">
                <h2 className="text-sm font-semibold text-white">Quick Tips</h2>
                <ul className="mt-5 space-y-4">
                  {[
                    "Complete your profile to get matched with relevant employers.",
                    "Upload your resume for AI-powered optimization.",
                    "Browse employers and save jobs you're interested in.",
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#6B7280]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-[#B0B8C4]">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Job Alerts Placeholder */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ">
                <div className="mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  <h2 className="text-sm font-semibold text-white">Job Alerts</h2>
                </div>
                <p className="text-sm text-[#6B7280]">
                  We&apos;ll notify you when new jobs match your profile and preferences.
                </p>
                <div className="mt-4">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <svg className="h-4 w-4 flex-shrink-0 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span className="text-sm text-[#6B7280]">{user?.emailAddresses?.[0]?.emailAddress || "your@email.com"}</span>
                  </div>
                  <p className="mt-3 text-xs text-[#6B7280]">
                    Coming soon — we&apos;re building this feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Unauthenticated() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
        <svg className="h-8 w-8 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
      </div>
      <h2 className="mt-8 text-[28px] font-bold text-white">Sign In Required</h2>
      <p className="mt-3 max-w-sm text-[16px] text-[#6B7280]">You need to sign in to access your dashboard. Create an account to get started with AI-powered job matching.</p>
      <div className="mt-8 flex items-center gap-3">
        <SignInButton mode="modal">
          <button type="button" className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-white/5">Sign In</button>
        </SignInButton>
        <Link to="/sign-up" className="rounded-2xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]">Sign Up</Link>
      </div>
    </div>
  );
}
