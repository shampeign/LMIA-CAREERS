import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { employers } from "~/data/employers";
import { employerLMIAData } from "~/data/employer-lmia";
import type { EmployerLMIA } from "~/data/employer-lmia";
import { getProfile } from "~/server/profile";

export const Route = createFileRoute("/employers/$slug")({
  loader: async ({ params }) => {
    const employer = employers.find((e) => e.slug === params.slug);
    if (!employer) throw notFound();

    // Auth & plan check: redirect if not signed in or on free plan
    let profile = null;
    try {
      profile = await getProfile();
    } catch {
      // Not signed in
    }

    if (!profile) {
      throw redirect({ to: "/sign-in" });
    }

    if (profile.plan === "free") {
      throw redirect({ to: "/#pricing" });
    }

    const lmia = employerLMIAData[employer.slug] ?? null;
    return { employer, lmia, profile };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.employer.name} — LMIA Profile & Analytics | LMIA Career AI` },
      {
        name: "description",
        content: `${loaderData.employer.name} — LMIA employer profile with TFWP hiring history, occupations, wage data, approval trends, and active job listings. Based on publicly available Canadian government data.`,
      },
    ],
  }),
  component: EmployerProfile,
});

type Tab = "overview" | "occupations" | "wages" | "history" | "jobs";

function EmployerProfile() {
  const { employer, lmia } = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [occSortKey, setOccSortKey] = useState<string>("approvals");
  const [occSortDir, setOccSortDir] = useState<"asc" | "desc">("desc");
  const [occSearch, setOccSearch] = useState("");

  const initials = employer.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "occupations", label: "Occupations" },
    { key: "wages", label: "Wages" },
    { key: "history", label: "History" },
    { key: "jobs", label: "Jobs" },
  ];

  const sortedOccupations = useMemo(() => {
    if (!lmia) return [];
    const filtered = occSearch
      ? lmia.topOccupations.filter(
          (o) =>
            o.nocName.toLowerCase().includes(occSearch.toLowerCase()) ||
            o.nocCode.includes(occSearch)
        )
      : lmia.topOccupations;
    return [...filtered].sort((a: any, b: any) => {
      const aVal = a[occSortKey as keyof typeof a];
      const bVal = b[occSortKey as keyof typeof b];
      const mod = occSortDir === "asc" ? 1 : -1;
      if (typeof aVal === "number" && typeof bVal === "number") return (aVal - bVal) * mod;
      return String(aVal).localeCompare(String(bVal)) * mod;
    });
  }, [lmia, occSearch, occSortKey, occSortDir]);

  const handleSort = (key: string) => {
    if (occSortKey === key) {
      setOccSortDir(occSortDir === "asc" ? "desc" : "asc");
    } else {
      setOccSortKey(key);
      setOccSortDir("desc");
    }
  };

  const gaugeRadius = 54;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const score = lmia?.sponsorshipScore ?? 0;
  const gaugeOffset = gaugeCircumference - (score / 100) * gaugeCircumference;
  const scoreColor =
    score >= 70 ? "#10B981" : score >= 45 ? "#F59E0B" : "#EF4444";

  const formatNum = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-[#FAFAFA]">
        {/* Back link */}
        <div className="border-b border-[#F0F0F0] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
            <Link
              to="/employers"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6B7280] transition-colors hover:text-[#0A0A0B]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Employers
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-white border-b border-[#F0F0F0]">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              {/* Left: Company info */}
              <div className="flex-1">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-[20px] font-bold text-white">
                    {initials}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#0A0A0B] lg:text-[36px]">
                        {employer.name}
                      </h1>
                      {lmia && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[12px] font-semibold text-green-700 border border-green-200">
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified LMIA Employer
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px] text-[#6B7280]">
                      <span>{employer.industry}</span>
                      <span className="text-[#D1D5DB]">·</span>
                      <span>{employer.province}</span>
                      <span className="text-[#D1D5DB]">·</span>
                      <span>{employer.employeeCount} employees</span>
                      <span className="text-[#D1D5DB]">·</span>
                      <span>Est. {employer.founded}</span>
                    </div>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
                      {employer.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Sponsorship Score */}
              {lmia && (
                <div className="flex shrink-0 flex-col items-center">
                  <div className="relative h-[140px] w-[140px]">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle cx="60" cy="60" r={gaugeRadius} fill="none" stroke="#F0F0F0" strokeWidth="10" />
                      <circle
                        cx="60" cy="60" r={gaugeRadius}
                        fill="none"
                        stroke={scoreColor}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={gaugeCircumference}
                        strokeDashoffset={gaugeOffset}
                        style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[32px] font-bold tracking-[-0.03em]" style={{ color: scoreColor }}>
                        {score}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                        Score
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-[13px] font-medium text-[#6B7280]">Sponsorship Score</p>
                </div>
              )}
            </div>

            {/* Stat Cards */}
            {lmia && (
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard label="LMIA Approvals" value={String(lmia.totalApprovals)} />
                <StatCard label="Approval Rate" value={`${lmia.approvalRate}%`} trend="up" />
                <StatCard label="Foreign Workers" value={formatNum(lmia.foreignWorkersEstimated)} />
                <StatCard label="Positions" value={String(lmia.approvedPositions)} />
                <StatCard label="Avg. Hourly Wage" value={`$${lmia.wageAverage.toFixed(2)}`} />
              </div>
            )}
          </div>
        </section>

        {/* Content area */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-6xl lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              {/* Main */}
              <div className="min-w-0">
                {lmia ? (
                  <>
                    {/* Tabs */}
                    <div className="mb-8 flex gap-2 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm border border-[#F0F0F0]">
                      {tabs.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => setActiveTab(t.key)}
                          className={`shrink-0 rounded-xl px-5 py-2.5 text-[14px] font-semibold transition-all ${
                            activeTab === t.key
                              ? "bg-[#0A0A0B] text-white shadow-sm"
                              : "text-[#6B7280] hover:text-[#0A0A0B]"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab content */}
                    <div className="space-y-6">
                      {activeTab === "overview" && <OverviewTab lmia={lmia} employer={employer} />}
                      {activeTab === "occupations" && (
                        <OccupationsTab
                          occupations={sortedOccupations}
                          occSearch={occSearch}
                          setOccSearch={setOccSearch}
                          occSortKey={occSortKey}
                          occSortDir={occSortDir}
                          handleSort={handleSort}
                        />
                      )}
                      {activeTab === "wages" && <WagesTab lmia={lmia} />}
                      {activeTab === "history" && <HistoryTab lmia={lmia} />}
                      {activeTab === "jobs" && <JobsTab employer={employer} />}
                    </div>
                  </>
                ) : (
                  <div className="rounded-3xl border border-[#F0F0F0] bg-white p-10 shadow-sm text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAFAFA]">
                      <svg className="h-8 w-8 text-[#D1D5DB]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    </div>
                    <h2 className="mt-4 text-[20px] font-bold text-[#0A0A0B]">LMIA Data Not Available</h2>
                    <p className="mt-2 text-[15px] text-[#6B7280]">
                      We don't have LMIA intelligence data for this employer yet. Check back soon.
                    </p>
                  </div>
                )}

                {/* Score breakdown card (below tabs) */}
                {lmia && (
                  <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
                    <h3 className="text-[16px] font-bold text-[#0A0A0B]">Sponsorship Score Breakdown</h3>
                    <div className="mt-5 space-y-4">
                      <ScoreBar label="Activity" value={lmia.scoreBreakdown.activity} description="Based on hiring volume" />
                      <ScoreBar label="Consistency" value={lmia.scoreBreakdown.consistency} description="Based on yearly history" />
                      <ScoreBar label="Approval Rate" value={lmia.scoreBreakdown.approvalRate} description="Approval success ratio" />
                      <ScoreBar label="Diversity" value={lmia.scoreBreakdown.diversity} description="Occupation variety" />
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                    Company Details
                  </h3>
                  <dl className="mt-5 space-y-4">
                    <DetailRow label="Industry" value={employer.industry} />
                    <DetailRow label="Province" value={employer.province} />
                    <DetailRow label="Headquarters" value={employer.city} />
                    <DetailRow label="Founded" value={employer.founded} />
                    <DetailRow label="Employees" value={employer.employeeCount} />
                    <div>
                      <dt className="text-[12px] font-medium text-[#9CA3AF]">Website</dt>
                      <dd className="mt-1">
                        <a
                          href={employer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[14px] font-medium text-[#2563EB] hover:text-[#1D4ED8] break-all"
                        >
                          {employer.website.replace("https://", "")}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>

                {lmia && (
                  <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                      Quick Stats
                    </h3>
                    <dl className="mt-5 space-y-4">
                      <DetailRow label="Approval Rate" value={`${lmia.approvalRate}%`} />
                      <DetailRow label="Total Approvals" value={String(lmia.totalApprovals)} />
                      <DetailRow label="Wage Range" value={`$${lmia.wageMin}–$${lmia.wageMax}/hr`} />
                      <DetailRow label="Top Stream" value={getTopStream(lmia)} />
                    </dl>
                  </div>
                )}

                <a
                  href={employer.careerPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8]"
                >
                  Visit Career Page
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ──── Sub-components ────

function StatCard({ label, value, trend }: { label: string; value: string; trend?: "up" | "down" }) {
  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA] p-4">
      <p className="text-[12px] font-medium text-[#9CA3AF]">{label}</p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[24px] font-bold tracking-[-0.02em] text-[#0A0A0B]">{value}</span>
        {trend === "up" && (
          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] font-medium text-[#9CA3AF]">{label}</dt>
      <dd className="mt-0.5 text-[14px] font-semibold text-[#0A0A0B]">{value}</dd>
    </div>
  );
}

function ScoreBar({ label, value, description }: { label: string; value: number; description: string }) {
  const color = value >= 75 ? "bg-green-500" : value >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#0A0A0B]">{label}</span>
        <span className="text-[13px] font-bold text-[#0A0A0B]">{value}</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F0F0F0]">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
      <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{description}</p>
    </div>
  );
}

function getTopStream(lmia: EmployerLMIA): string {
  const { streams } = lmia;
  const top = Object.entries(streams).sort(([, a], [, b]) => b - a)[0];
  const labels: Record<string, string> = {
    highWage: "High-Wage",
    lowWage: "Low-Wage",
    prStream: "PR Stream",
    agriculture: "Agriculture",
    globalTalent: "Global Talent",
    caregiver: "Caregiver",
  };
  return labels[top[0]] ?? top[0];
}

// ──── Tab Components ────

function OverviewTab({ lmia, employer }: { lmia: EmployerLMIA; employer: any }) {
  const streamEntries = Object.entries(lmia.streams).filter(([, v]) => v > 0);
  const maxStream = Math.max(...streamEntries.map(([, v]) => v), 1);
  const streamLabels: Record<string, string> = {
    highWage: "High-Wage",
    lowWage: "Low-Wage",
    prStream: "PR Stream",
    agriculture: "Agriculture",
    globalTalent: "Global Talent",
    caregiver: "Caregiver",
  };

  return (
    <div className="space-y-6">
      {/* Program Stream Distribution */}
      <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#0A0A0B]">Program Stream Distribution</h3>
        <div className="mt-6 space-y-4">
          {streamEntries.map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-[13px] font-medium text-[#6B7280]">{streamLabels[key] ?? key}</span>
              <div className="flex flex-1 items-center gap-3">
                <div className="h-6 flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
                  <div
                    className="h-full rounded-full bg-[#2563EB] transition-all duration-500"
                    style={{ width: `${(value / maxStream) * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[13px] font-bold text-[#0A0A0B]">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Province Distribution */}
      {lmia.hiringProvinces.length > 0 && (
        <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
          <h3 className="text-[18px] font-bold text-[#0A0A0B]">Hiring by Province</h3>
          <div className="mt-6 space-y-3">
            {lmia.hiringProvinces.map((p) => (
              <div key={p.province} className="flex items-center gap-3">
                <span className="w-10 shrink-0 text-[13px] font-semibold text-[#0A0A0B]">{p.province}</span>
                <div className="flex flex-1 items-center gap-2">
                  <div className="h-5 flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
                    <div
                      className="h-full rounded-full bg-[#2563EB]/80 transition-all duration-500"
                      style={{ width: `${p.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-[12px] font-medium text-[#6B7280]">{p.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Occupations */}
      <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#0A0A0B]">Top Occupations</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#F0F0F0]">
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">NOC</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Occupation</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">TEER</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Approvals</th>
                <th className="pb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Avg Wage</th>
              </tr>
            </thead>
            <tbody>
              {lmia.topOccupations.slice(0, 5).map((occ, i) => (
                <tr key={i} className="border-b border-[#F0F0F0] last:border-0">
                  <td className="py-3 pr-4 font-mono text-[13px] font-semibold text-[#0A0A0B]">{occ.nocCode}</td>
                  <td className="py-3 pr-4 text-[13px] text-[#4B5563]">{occ.nocName}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center rounded-full bg-[#F0F0F0] px-2 py-0.5 text-[11px] font-bold text-[#6B7280]">
                      {occ.teerLevel}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-[13px] font-semibold text-[#0A0A0B]">{occ.approvals}</td>
                  <td className="py-3 text-[13px] font-semibold text-[#0A0A0B]">${occ.avgWage.toFixed(2)}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* About */}
      <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#0A0A0B]">About {employer.name}</h3>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#6B7280]">
          {employer.aiSummary.split("\n\n").map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function OccupationsTab({
  occupations,
  occSearch,
  setOccSearch,
  occSortKey,
  occSortDir,
  handleSort,
}: {
  occupations: any[];
  occSearch: string;
  setOccSearch: (s: string) => void;
  occSortKey: string;
  occSortDir: string;
  handleSort: (key: string) => void;
}) {
  const sortHeaders = [
    { key: "nocCode", label: "NOC Code" },
    { key: "nocName", label: "Occupation" },
    { key: "teerLevel", label: "TEER" },
    { key: "approvals", label: "Approvals" },
    { key: "positions", label: "Positions" },
    { key: "avgWage", label: "Avg Wage" },
  ];

  return (
    <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[18px] font-bold text-[#0A0A0B]">LMIA Occupations</h3>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search by NOC or name..."
            value={occSearch}
            onChange={(e) => setOccSearch(e.target.value)}
            className="w-64 rounded-xl border border-[#F0F0F0] bg-white py-2 pl-10 pr-4 text-[14px] text-[#0A0A0B] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/20"
          />
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-[#F0F0F0]">
              {sortHeaders.map((h) => (
                <th
                  key={h.key}
                  onClick={() => handleSort(h.key)}
                  className="cursor-pointer select-none pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF] transition-colors hover:text-[#4B5563]"
                >
                  <span className="inline-flex items-center gap-1">
                    {h.label}
                    {occSortKey === h.key && (
                      <span className="text-[10px]">{occSortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {occupations.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[14px] text-[#9CA3AF]">
                  No occupations match your search.
                </td>
              </tr>
            ) : (
              occupations.map((occ, i) => (
                <tr key={i} className="border-b border-[#F0F0F0] last:border-0">
                  <td className="py-3 pr-4 font-mono text-[13px] font-semibold text-[#0A0A0B]">{occ.nocCode}</td>
                  <td className="py-3 pr-4 text-[13px] text-[#4B5563]">{occ.nocName}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      occ.teerLevel <= 1 ? "bg-blue-50 text-blue-700" :
                      occ.teerLevel <= 3 ? "bg-amber-50 text-amber-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      TEER {occ.teerLevel}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-[13px] font-semibold text-[#0A0A0B]">{occ.approvals}</td>
                  <td className="py-3 pr-4 text-[13px] font-semibold text-[#0A0A0B]">{occ.positions}</td>
                  <td className="py-3 text-[13px] font-semibold text-[#0A0A0B]">${occ.avgWage.toFixed(2)}/hr</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WagesTab({ lmia }: { lmia: EmployerLMIA }) {
  const wageRange = lmia.wageMax - lmia.wageMin;
  const medianPct = ((lmia.wageMedian - lmia.wageMin) / wageRange) * 100;
  const avgPct = ((lmia.wageAverage - lmia.wageMin) / wageRange) * 100;

  return (
    <div className="space-y-6">
      {/* Wage Range Visualization */}
      <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#0A0A0B]">Wage Range</h3>
        <div className="mt-8 px-2">
          <div className="relative h-4">
            {/* Track */}
            <div className="absolute inset-y-0 left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#F0F0F0]" />
            {/* Range bar */}
            <div className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#2563EB]/20" style={{ left: 0, right: 0 }} />
            {/* Median marker */}
            <div className="absolute top-0 h-4 w-1 -translate-x-1/2 rounded-full bg-[#2563EB]" style={{ left: `${medianPct}%` }} />
            {/* Average marker */}
            <div className="absolute top-0 h-4 w-1 -translate-x-1/2 rounded-full bg-[#10B981]" style={{ left: `${avgPct}%` }} />
          </div>
          <div className="mt-3 flex justify-between text-[12px] text-[#6B7280]">
            <span>${lmia.wageMin.toFixed(2)}</span>
            <span className="font-semibold" style={{ marginLeft: `${medianPct > 10 ? medianPct - 10 : 0}%` }}>
              Median ${lmia.wageMedian.toFixed(2)}
            </span>
            <span>${lmia.wageMax.toFixed(2)}</span>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="rounded-xl bg-[#FAFAFA] p-4 text-center">
              <p className="text-[12px] font-medium text-[#9CA3AF]">Minimum</p>
              <p className="mt-1 text-[18px] font-bold text-[#0A0A0B]">${lmia.wageMin.toFixed(2)}</p>
              <p className="text-[11px] text-[#9CA3AF]">/hour</p>
            </div>
            <div className="rounded-xl bg-[#FAFAFA] p-4 text-center">
              <p className="text-[12px] font-medium text-[#9CA3AF]">Median</p>
              <p className="mt-1 text-[18px] font-bold text-[#0A0A0B]">${lmia.wageMedian.toFixed(2)}</p>
              <p className="text-[11px] text-[#9CA3AF]">/hour</p>
            </div>
            <div className="rounded-xl bg-[#FAFAFA] p-4 text-center">
              <p className="text-[12px] font-medium text-[#9CA3AF]">Average</p>
              <p className="mt-1 text-[18px] font-bold text-[#0A0A0B]">${lmia.wageAverage.toFixed(2)}</p>
              <p className="text-[11px] text-[#9CA3AF]">/hour</p>
            </div>
            <div className="rounded-xl bg-[#FAFAFA] p-4 text-center">
              <p className="text-[12px] font-medium text-[#9CA3AF]">Maximum</p>
              <p className="mt-1 text-[18px] font-bold text-[#0A0A0B]">${lmia.wageMax.toFixed(2)}</p>
              <p className="text-[11px] text-[#9CA3AF]">/hour</p>
            </div>
          </div>
        </div>
      </div>

      {/* Occupation Wages */}
      <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#0A0A0B]">Wages by Occupation</h3>
        <div className="mt-6 space-y-4">
          {lmia.topOccupations.map((occ, i) => {
            const barPct = ((occ.avgWage - lmia.wageMin) / (lmia.wageMax - lmia.wageMin)) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="w-40 shrink-0 truncate text-[13px] font-medium text-[#4B5563]" title={occ.nocName}>
                  {occ.nocName.length > 24 ? occ.nocName.slice(0, 22) + "…" : occ.nocName}
                </span>
                <div className="flex flex-1 items-center gap-2">
                  <div className="h-5 flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
                    <div
                      className="h-full rounded-full bg-[#2563EB]/70"
                      style={{ width: `${Math.max(barPct, 5)}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-[13px] font-bold text-[#0A0A0B]">${occ.avgWage.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HistoryTab({ lmia }: { lmia: EmployerLMIA }) {
  const maxTotal = Math.max(...lmia.yearlyHistory.map((y) => y.total), 1);
  const rates = lmia.yearlyHistory.map((y) => y.approvalRate);
  const rateMin = Math.min(...rates);
  const rateMax = Math.max(...rates);
  const rateRange = rateMax - rateMin || 1;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#0A0A0B]">Yearly LMIA Hiring History</h3>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#F0F0F0]">
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Year</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Q1</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Q2</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Q3</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Q4</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Total</th>
                <th className="pb-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Rate</th>
                <th className="pb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Trend</th>
              </tr>
            </thead>
            <tbody>
              {lmia.yearlyHistory.map((y, i) => {
                const barWidth = (y.total / maxTotal) * 100;
                const rateColor =
                  y.approvalRate >= 95 ? "text-green-600" : y.approvalRate >= 90 ? "text-amber-600" : "text-red-600";
                return (
                  <tr key={y.year} className="border-b border-[#F0F0F0] last:border-0">
                    <td className="py-3 pr-4 text-[13px] font-bold text-[#0A0A0B]">{y.year}</td>
                    <td className="py-3 pr-4 text-[13px] text-[#4B5563]">{y.q1}</td>
                    <td className="py-3 pr-4 text-[13px] text-[#4B5563]">{y.q2}</td>
                    <td className="py-3 pr-4 text-[13px] text-[#4B5563]">{y.q3}</td>
                    <td className="py-3 pr-4 text-[13px] text-[#4B5563]">{y.q4}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#F0F0F0]" style={{ width: "60px" }}>
                          <div className="h-full rounded-full bg-[#2563EB]/30" style={{ width: `${barWidth}%` }} />
                        </div>
                        <span className="text-[13px] font-bold text-[#0A0A0B]">{y.total}</span>
                      </div>
                    </td>
                    <td className={`py-3 pr-4 text-[13px] font-bold ${rateColor}`}>{y.approvalRate}%</td>
                    <td className="py-3">
                      <svg className="h-5 w-16" viewBox={`0 0 64 20`} preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={lmia.yearlyHistory
                            .map(
                              (yh, j) =>
                                `${(j / (lmia.yearlyHistory.length - 1)) * 64},${
                                  20 - ((yh.approvalRate - rateMin) / rateRange) * 16 - 2
                                }`
                            )
                            .join(" ")}
                        />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function JobsTab({ employer }: { employer: any }) {
  return (
    <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
      <h3 className="text-[18px] font-bold text-[#0A0A0B]">Current Open Positions</h3>
      {employer.openPositions.length === 0 ? (
        <p className="mt-4 text-[14px] text-[#9CA3AF]">No open positions currently listed.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {employer.openPositions.map((job: any, i: number) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[15px] font-semibold text-[#0A0A0B]">{job.title}</p>
                <p className="mt-1 text-[13px] text-[#6B7280]">
                  {job.location} · {job.type}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {job.salary && (
                  <span className="rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-[#0A0A0B] border border-[#F0F0F0]">
                    {job.salary}
                  </span>
                )}
                <a
                  href={employer.careerPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-[#1D4ED8]"
                >
                  Apply
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
