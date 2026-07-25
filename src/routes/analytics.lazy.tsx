import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { employerLMIAData } from "~/data/employer-lmia";
import { employers } from "~/data/employers";
import { getProfile } from "~/server/profile";
import { useMemo, useState, useEffect } from "react";
export default function AnalyticsPage() {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        if (profile && (profile.plan === "professional" || profile.plan === "premium")) {
          setIsPaid(true);
        }
      })
      .catch(() => {});
  }, []);

  // ── State for search/sort ──────────────────────────────────
  const [employerSearch, setEmployerSearch] = useState("");
  const [employerSort, setEmployerSort] = useState<{ col: string; dir: "asc" | "desc" }>({ col: "approvals", dir: "desc" });
  const [occupationSearch, setOccupationSearch] = useState("");
  const [occupationSort, setOccupationSort] = useState<{ col: string; dir: "asc" | "desc" }>({ col: "approvals", dir: "desc" });

  // ── All data computations ───────────────────────────────────
  const data = useMemo(() => {
    const lmiaEntries = Object.entries(employerLMIAData);
    const count = lmiaEntries.length;

    // SECTION 1: Platform Overview
    const totalApprovals = lmiaEntries.reduce((s, [, d]) => s + d.totalApprovals, 0);
    const avgApprovalRate =
      totalApprovals > 0
        ? lmiaEntries.reduce((s, [, d]) => s + d.approvalRate * d.totalApprovals, 0) / totalApprovals
        : 0;

    // Top hiring province
    const provMap: Record<string, number> = {};
    for (const [, d] of lmiaEntries) {
      for (const p of d.hiringProvinces) {
        provMap[p.province] = (provMap[p.province] || 0) + p.approvals;
      }
    }
    const topProvince = Object.entries(provMap).sort((a, b) => b[1] - a[1])[0];
    const provinceData = Object.entries(provMap)
      .map(([province, approvals]) => ({ province, approvals }))
      .sort((a, b) => b.approvals - a.approvals);
    const maxProvince = provinceData.length > 0 ? provinceData[0].approvals : 1;

    // SECTION 2: Industry distribution
    const industryMap: Record<string, number> = {};
    for (const emp of employers) {
      if (!employerLMIAData[emp.slug]) continue;
      industryMap[emp.industry] = (industryMap[emp.industry] || 0) + 1;
    }
    const industryData = Object.entries(industryMap)
      .map(([industry, count]) => ({ industry, count }))
      .sort((a, b) => b.count - a.count);
    const maxIndustry = industryData.length > 0 ? industryData[0].count : 1;

    // SECTION 3: Top Occupations (merge by nocCode)
    const occMap: Record<string, { nocCode: string; nocName: string; teerLevel: number; approvals: number; positions: number; totalWage: number; wageCount: number }> = {};
    for (const [, d] of lmiaEntries) {
      for (const o of d.topOccupations) {
        if (!occMap[o.nocCode]) {
          occMap[o.nocCode] = { nocCode: o.nocCode, nocName: o.nocName, teerLevel: o.teerLevel, approvals: 0, positions: 0, totalWage: 0, wageCount: 0 };
        }
        occMap[o.nocCode].approvals += o.approvals;
        occMap[o.nocCode].positions += o.positions;
        occMap[o.nocCode].totalWage += o.avgWage * o.approvals;
        occMap[o.nocCode].wageCount += o.approvals;
      }
    }
    const topOccupations = Object.values(occMap)
      .map((o) => ({ ...o, avgWage: o.wageCount > 0 ? o.totalWage / o.wageCount : 0 }))
      .sort((a, b) => b.approvals - a.approvals);

    // PAID 1: Employer Intelligence Database
    const employerIntel = employers
      .filter((e) => employerLMIAData[e.slug])
      .map((e) => {
        const lmia = employerLMIAData[e.slug];
        const topOcc = lmia.topOccupations.length > 0 ? lmia.topOccupations[0].nocName : "N/A";
        return {
          slug: e.slug,
          name: e.name,
          industry: e.industry,
          province: e.province,
          approvals: lmia.totalApprovals,
          approvalRate: lmia.approvalRate,
          score: lmia.sponsorshipScore,
          topOccupation: topOcc,
          avgWage: lmia.wageMedian,
        };
      })
      .sort((a, b) => b.approvals - a.approvals);

    // PAID 2: Occupation Deep Dive (all occupations)
    const allOccupations = Object.values(occMap)
      .map((o) => {
        const hiringEmployers = lmiaEntries.filter(([, d]) =>
          d.topOccupations.some((to) => to.nocCode === o.nocCode)
        ).length;
        const wages = lmiaEntries
          .filter(([, d]) => d.topOccupations.some((to) => to.nocCode === o.nocCode))
          .flatMap(([, d]) =>
            d.topOccupations.filter((to) => to.nocCode === o.nocCode).map((to) => to.avgWage)
          );
        return {
          ...o,
          avgWage: o.wageCount > 0 ? o.totalWage / o.wageCount : 0,
          employersCount: hiringEmployers,
          minWage: wages.length > 0 ? Math.min(...wages) : 0,
          maxWage: wages.length > 0 ? Math.max(...wages) : 0,
        };
      })
      .sort((a, b) => b.approvals - a.approvals);

    // PAID 3: Wage Analytics by Industry
    const indWageMap: Record<string, { employers: number; wages: number[]; totalApprovals: number }> = {};
    for (const emp of employers) {
      const lmia = employerLMIAData[emp.slug];
      if (!lmia) continue;
      const ind = emp.industry;
      if (!indWageMap[ind]) indWageMap[ind] = { employers: 0, wages: [], totalApprovals: 0 };
      indWageMap[ind].employers++;
      indWageMap[ind].wages.push(lmia.wageMedian);
      indWageMap[ind].totalApprovals += lmia.totalApprovals;
    }
    const industryWages = Object.entries(indWageMap)
      .map(([industry, v]) => {
        const sorted = v.wages.sort((a, b) => a - b);
        return {
          industry,
          min: sorted[0],
          median: sorted[Math.floor(sorted.length / 2)],
          max: sorted[sorted.length - 1],
          avg: sorted.reduce((s, w) => s + w, 0) / sorted.length,
          employers: v.employers,
          approvals: v.totalApprovals,
        };
      })
      .sort((a, b) => b.median - a.median);

    // PAID 4: Employer Sponsorship Rankings
    const sponsorshipRankings = employers
      .filter((e) => employerLMIAData[e.slug])
      .map((e) => {
        const lmia = employerLMIAData[e.slug];
        return {
          name: e.name,
          slug: e.slug,
          score: lmia.sponsorshipScore,
          approvals: lmia.totalApprovals,
          approvalRate: lmia.approvalRate,
        };
      })
      .sort((a, b) => b.score - a.score);

    // PAID 5: Yearly Trends
    const yearMap: Record<number, { total: number; highWage: number; lowWage: number; prStream: number; agriculture: number; globalTalent: number; caregiver: number }> = {};
    for (const [, d] of lmiaEntries) {
      const streamTotal = d.streams.highWage + d.streams.lowWage + d.streams.prStream + d.streams.agriculture + d.streams.globalTalent + d.streams.caregiver || 1;
      for (const y of d.yearlyHistory) {
        if (!yearMap[y.year]) yearMap[y.year] = { total: 0, highWage: 0, lowWage: 0, prStream: 0, agriculture: 0, globalTalent: 0, caregiver: 0 };
        const ratio = y.total / (d.totalApprovals || 1);
        yearMap[y.year].total += y.total;
        yearMap[y.year].highWage += Math.round(d.streams.highWage * ratio);
        yearMap[y.year].lowWage += Math.round(d.streams.lowWage * ratio);
        yearMap[y.year].prStream += Math.round(d.streams.prStream * ratio);
        yearMap[y.year].agriculture += Math.round(d.streams.agriculture * ratio);
        yearMap[y.year].globalTalent += Math.round(d.streams.globalTalent * ratio);
        yearMap[y.year].caregiver += Math.round(d.streams.caregiver * ratio);
      }
    }
    const yearlyData = Object.entries(yearMap)
      .map(([y, v]) => ({ year: +y, ...v }))
      .sort((a, b) => a.year - b.year);

    return {
      count,
      totalApprovals,
      avgApprovalRate,
      topProvince,
      provinceData,
      maxProvince,
      industryData,
      maxIndustry,
      topOccupations,
      employerIntel,
      allOccupations,
      industryWages,
      sponsorshipRankings,
      yearlyData,
    };
  }, []);

  // ── Derived values ──────────────────────────────────────────
  const maxYearlyTotal = data.yearlyData.length > 0 ? Math.max(...data.yearlyData.map((y) => y.total)) : 1;
  const yearBarHeight = 220;

  // ── Sort helpers ────────────────────────────────────────────
  function sortBy<T>(arr: T[], col: string, dir: "asc" | "desc", getter: (item: T) => string | number): T[] {
    const sorted = [...arr].sort((a, b) => {
      const va = getter(a);
      const vb = getter(b);
      if (typeof va === "string" && typeof vb === "string") return va.localeCompare(vb);
      return (va as number) - (vb as number);
    });
    return dir === "desc" ? sorted.reverse() : sorted;
  }

  // ── Filtered/sorted data for paid sections ──────────────────
  const filteredEmployers = useMemo(() => {
    let list = employerSearch
      ? data.employerIntel.filter((e) =>
          e.name.toLowerCase().includes(employerSearch.toLowerCase()) ||
          e.industry.toLowerCase().includes(employerSearch.toLowerCase()) ||
          e.province.toLowerCase().includes(employerSearch.toLowerCase())
        )
      : data.employerIntel;
    return sortBy(list, employerSort.col, employerSort.dir, (e) => (e as any)[employerSort.col] ?? "");
  }, [data.employerIntel, employerSearch, employerSort]);

  const filteredOccupations = useMemo(() => {
    let list = occupationSearch
      ? data.allOccupations.filter((o) =>
          o.nocName.toLowerCase().includes(occupationSearch.toLowerCase()) ||
          o.nocCode.includes(occupationSearch)
        )
      : data.allOccupations;
    return sortBy(list, occupationSort.col, occupationSort.dir, (o) => (o as any)[occupationSort.col] ?? "");
  }, [data.allOccupations, occupationSearch, occupationSort]);

  function handleEmployerSort(col: string) {
    setEmployerSort((prev) => ({
      col,
      dir: prev.col === col && prev.dir === "desc" ? "asc" : "desc",
    }));
  }

  function handleOccupationSort(col: string) {
    setOccupationSort((prev) => ({
      col,
      dir: prev.col === col && prev.dir === "desc" ? "asc" : "desc",
    }));
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="min-h-dvh bg-[#0B0E14]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-white lg:text-4xl">
            LMIA Employer Intelligence
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-[#6B7280]">
            Comprehensive analytics on LMIA hiring patterns across {data.count} Canadian employers. All aggregate data is publicly sourced from ESDC disclosures.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════
            FREE SECTION 1: Platform Overview
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Platform Overview" badge="Free" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total LMIA Approvals"
              value={fmt(data.totalApprovals)}
              subtitle="Across all employers"
              trend="Cumulative"
            />
            <StatCard
              label="Avg. Approval Rate"
              value={fmtPct(data.avgApprovalRate)}
              subtitle="Weighted average"
              trend="High confidence"
            />
            <StatCard
              label="Active Employers"
              value={String(data.count)}
              subtitle="With documented LMIA"
              trend="Live data"
            />
            <StatCard
              label="Top Hiring Province"
              value={data.topProvince ? data.topProvince[0] : "N/A"}
              subtitle={data.topProvince ? `${fmt(data.topProvince[1])} approvals` : ""}
              trend="#1"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FREE SECTION 2: Market Trends
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Market Trends" badge="Free" />
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Province chart */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ">
              <h3 className="mb-4 text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Top Provinces by LMIA Activity</h3>
              <svg viewBox={`0 0 400 ${Math.min(data.provinceData.length, 8) * 40 + 20}`} className="w-full">
                {data.provinceData.slice(0, 8).map((p, i) => {
                  const y = 15 + i * 40;
                  const barW = Math.max((p.approvals / data.maxProvince) * 250, 16);
                  const intensity = 0.3 + (p.approvals / data.maxProvince) * 0.7;
                  const color = `rgba(37, 99, 235, ${intensity.toFixed(2)})`;
                  return (
                    <g key={p.province}>
                      <text x="0" y={y + 16} className="text-xs font-medium" fill="#0A0A0B" style={{ fontSize: "12px" }}>{p.province}</text>
                      <rect x="40" y={y + 4} width={barW} height="22" fill={color} rx="4" />
                      <text x={44 + barW + 8} y={y + 19} className="text-xs font-semibold" fill="#0A0A0B">{fmt(p.approvals)}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            {/* Industry chart */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ">
              <h3 className="mb-4 text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Top Industries by Employer Count</h3>
              <svg viewBox={`0 0 400 ${Math.min(data.industryData.length, 8) * 40 + 20}`} className="w-full">
                {data.industryData.slice(0, 8).map((ind, i) => {
                  const y = 15 + i * 40;
                  const barW = Math.max((ind.count / data.maxIndustry) * 250, 16);
                  const intensity = 0.3 + (ind.count / data.maxIndustry) * 0.7;
                  const color = `rgba(16, 185, 129, ${intensity.toFixed(2)})`;
                  return (
                    <g key={ind.industry}>
                      <text x="0" y={y + 16} className="text-xs font-medium" fill="#0A0A0B" style={{ fontSize: "12px" }}>{ind.industry}</text>
                      <rect x="40" y={y + 4} width={barW} height="22" fill={color} rx="4" />
                      <text x={44 + barW + 8} y={y + 19} className="text-xs font-semibold" fill="#0A0A0B">{ind.count}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FREE SECTION 3: Popular Occupations
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Popular Occupations" badge="Free" />
          <div className="rounded-2xl border border-white/10 bg-white/5  overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 font-semibold text-white">Occupation</th>
                    <th className="px-6 py-4 font-semibold text-white">NOC Code</th>
                    <th className="px-6 py-4 font-semibold text-white">TEER</th>
                    <th className="px-6 py-4 font-semibold text-white">Approvals</th>
                    <th className="px-6 py-4 font-semibold text-white">Avg Wage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {data.topOccupations.slice(0, 10).map((occ) => (
                    <tr key={occ.nocCode} className="transition-colors hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white max-w-[300px] truncate">{occ.nocName}</td>
                      <td className="px-6 py-4 text-[#6B7280] font-mono text-xs">{occ.nocCode}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#2563EB]/10 px-2.5 py-0.5 text-xs font-semibold text-[#2563EB]">TEER {occ.teerLevel}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">{fmt(occ.approvals)}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{fmtWage(occ.avgWage)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PREMIUM PROMPT CARD
            ════════════════════════════════════════════════════════════ */}
        {!isPaid && (
          <section className="mb-12">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B0E14] to-[#111827] border border-white/10 p-10">
              <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h2 className="text-2xl font-bold text-white lg:text-3xl tracking-[-0.02em]">
                    🔒 Unlock Complete LMIA Employer Intelligence
                  </h2>
                  <p className="mt-3 max-w-xl text-[#6B7280]">
                    Get full access to detailed employer profiles, LMIA statistics, wage analytics, 
                    employer comparisons, advanced search, downloadable reports, and market insights.
                  </p>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#D1D5DB]">
                    <li className="flex items-center gap-2">✓ Full employer profiles</li>
                    <li className="flex items-center gap-2">✓ Detailed LMIA statistics</li>
                    <li className="flex items-center gap-2">✓ Wage analytics</li>
                    <li className="flex items-center gap-2">✓ Employer comparisons</li>
                    <li className="flex items-center gap-2">✓ Advanced search</li>
                    <li className="flex items-center gap-2">✓ Downloadable reports</li>
                    <li className="flex items-center gap-2">✓ Market insights</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button type="button" className="rounded-xl bg-[#2563EB] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 whitespace-nowrap">
                        Start Free Trial
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Link to="/sign-up" className="rounded-xl bg-[#2563EB] px-8 py-3.5 text-base font-semibold text-white text-center hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 whitespace-nowrap">
                      Start Free Trial
                    </Link>
                  </SignedIn>
                  <a href="/#pricing" className="rounded-xl border border-[#374151] px-8 py-3.5 text-base font-semibold text-white text-center hover:bg-white/10 whitespace-nowrap">
                    View Pricing
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════
            PAID SECTION 1: Employer Intelligence Database
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Employer Intelligence Database" badge={isPaid ? "Pro" : "Locked"} />
          <div className="rounded-2xl border border-white/10 bg-white/5  overflow-hidden relative">
            {/* Search */}
            <div className="px-6 pt-6 pb-4 border-b border-white/10">
              <input
                type="text"
                placeholder="Search employers by name, industry, or province..."
                value={employerSearch}
                onChange={(e) => setEmployerSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              />
            </div>
            <div className={`overflow-x-auto ${!isPaid ? "max-h-[320px] overflow-hidden" : ""}`}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <SortTh label="Employer" col="name" current={employerSort} onClick={handleEmployerSort} />
                    <SortTh label="Industry" col="industry" current={employerSort} onClick={handleEmployerSort} />
                    <SortTh label="Province" col="province" current={employerSort} onClick={handleEmployerSort} />
                    <SortTh label="Approvals" col="approvals" current={employerSort} onClick={handleEmployerSort} />
                    <SortTh label="Appr. Rate" col="approvalRate" current={employerSort} onClick={handleEmployerSort} />
                    <SortTh label="Score" col="score" current={employerSort} onClick={handleEmployerSort} />
                    <th className="px-6 py-4 font-semibold text-white">Top Occupation</th>
                    <th className="px-6 py-4 font-semibold text-white">Avg Wage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {(isPaid ? filteredEmployers : filteredEmployers.slice(0, 5)).map((emp) => (
                    <tr key={emp.slug} className="transition-colors hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white">
                        <Link to={`/employers/${emp.slug}`} className="text-[#2563EB] hover:underline">
                          {emp.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-[#6B7280]">{emp.industry}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{emp.province}</td>
                      <td className="px-6 py-4 font-semibold text-white">{fmt(emp.approvals)}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{fmtPct(emp.approvalRate)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-12 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${emp.score}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-white">{emp.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#6B7280] max-w-[180px] truncate">{emp.topOccupation}</td>
                      <td className="px-6 py-4 text-[#2563EB] font-semibold">{fmtWage(emp.avgWage)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!isPaid && <LockOverlay rows={5} />}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PAID SECTION 2: Occupation Deep Dive
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Occupation Deep Dive" badge={isPaid ? "Pro" : "Locked"} />
          <div className="rounded-2xl border border-white/10 bg-white/5  overflow-hidden relative">
            <div className="px-6 pt-6 pb-4 border-b border-white/10">
              <input
                type="text"
                placeholder="Search occupations by name or NOC code..."
                value={occupationSearch}
                onChange={(e) => setOccupationSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              />
            </div>
            <div className={`overflow-x-auto ${!isPaid ? "max-h-[320px] overflow-hidden" : ""}`}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <SortTh label="Occupation" col="nocName" current={occupationSort} onClick={handleOccupationSort} />
                    <SortTh label="NOC" col="nocCode" current={occupationSort} onClick={handleOccupationSort} />
                    <SortTh label="TEER" col="teerLevel" current={occupationSort} onClick={handleOccupationSort} />
                    <SortTh label="Employers" col="employersCount" current={occupationSort} onClick={handleOccupationSort} />
                    <SortTh label="Approvals" col="approvals" current={occupationSort} onClick={handleOccupationSort} />
                    <SortTh label="Avg Wage" col="avgWage" current={occupationSort} onClick={handleOccupationSort} />
                    <SortTh label="Min Wage" col="minWage" current={occupationSort} onClick={handleOccupationSort} />
                    <SortTh label="Max Wage" col="maxWage" current={occupationSort} onClick={handleOccupationSort} />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {(isPaid ? filteredOccupations : filteredOccupations.slice(0, 5)).map((occ) => (
                    <tr key={occ.nocCode} className="transition-colors hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white max-w-[300px] truncate">{occ.nocName}</td>
                      <td className="px-6 py-4 text-[#6B7280] font-mono text-xs">{occ.nocCode}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#2563EB]/10 px-2 py-0.5 text-xs font-semibold text-[#2563EB]">TEER {occ.teerLevel}</span>
                      </td>
                      <td className="px-6 py-4 text-[#6B7280]">{occ.employersCount}</td>
                      <td className="px-6 py-4 font-semibold text-white">{fmt(occ.approvals)}</td>
                      <td className="px-6 py-4 text-[#2563EB] font-semibold">{fmtWage(occ.avgWage)}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{fmtWage(occ.minWage)}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{fmtWage(occ.maxWage)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!isPaid && <LockOverlay rows={5} />}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PAID SECTION 3: Wage Analytics by Industry
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Wage Analytics by Industry" badge={isPaid ? "Pro" : "Locked"} />
          <div className="rounded-2xl border border-white/10 bg-white/5  overflow-hidden relative">
            <div className={`overflow-x-auto ${!isPaid ? "max-h-[260px] overflow-hidden" : ""}`}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 font-semibold text-white">Industry</th>
                    <th className="px-6 py-4 font-semibold text-white">Employers</th>
                    <th className="px-6 py-4 font-semibold text-white">Total Approvals</th>
                    <th className="px-6 py-4 font-semibold text-white">Avg Wage</th>
                    <th className="px-6 py-4 font-semibold text-white">Median Wage</th>
                    <th className="px-6 py-4 font-semibold text-white">Min Wage</th>
                    <th className="px-6 py-4 font-semibold text-white">Max Wage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {(isPaid ? data.industryWages : data.industryWages.slice(0, 3)).map((iw, i) => (
                    <tr key={iw.industry} className="transition-colors hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white">
                        {!isPaid && i >= 3 ? <>🔒 {iw.industry}</> : iw.industry}
                      </td>
                      <td className="px-6 py-4 text-[#6B7280]">{!isPaid && i >= 3 ? "🔒" : iw.employers}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{!isPaid && i >= 3 ? "🔒" : fmt(iw.approvals)}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{!isPaid && i >= 3 ? "🔒" : fmtWage(iw.avg)}</td>
                      <td className="px-6 py-4 font-semibold text-[#2563EB]">{!isPaid && i >= 3 ? "🔒" : fmtWage(iw.median)}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{!isPaid && i >= 3 ? "🔒" : fmtWage(iw.min)}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{!isPaid && i >= 3 ? "🔒" : fmtWage(iw.max)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!isPaid && <LockOverlay />}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PAID SECTION 4: Employer Sponsorship Rankings
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Employer Sponsorship Rankings" badge={isPaid ? "Pro" : "Locked"} />
          <div className="rounded-2xl border border-white/10 bg-white/5  overflow-hidden relative">
            <div className={`overflow-x-auto ${!isPaid ? "max-h-[340px] overflow-hidden" : ""}`}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 font-semibold text-white">Rank</th>
                    <th className="px-6 py-4 font-semibold text-white">Employer</th>
                    <th className="px-6 py-4 font-semibold text-white">Score</th>
                    <th className="px-6 py-4 font-semibold text-white">Approvals</th>
                    <th className="px-6 py-4 font-semibold text-white">Appr. Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {(isPaid ? data.sponsorshipRankings : data.sponsorshipRankings.slice(0, 5)).map((er, i) => {
                    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : String(i + 1);
                    return (
                      <tr key={er.slug} className="transition-colors hover:bg-white/5">
                        <td className="px-6 py-4">
                          <span className={i < 3 ? "text-lg" : "text-sm text-[#6B7280]"}>{medal}</span>
                        </td>
                        <td className="px-6 py-4 font-medium text-white">
                          <Link to={`/employers/${er.slug}`} className="text-[#2563EB] hover:underline">
                            {er.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-white/10">
                              <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${er.score}%` }} />
                            </div>
                            <span className="font-semibold text-white">{er.score}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#6B7280]">{fmt(er.approvals)}</td>
                        <td className="px-6 py-4 text-[#6B7280]">{fmtPct(er.approvalRate)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {!isPaid && <LockOverlay rows={5} />}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PAID SECTION 5: Hiring Trends
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <SectionHeader title="Hiring Trends & Forecasts" badge={isPaid ? "Pro" : "Locked"} />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6  relative">
            {/* Yearly LMIA Approvals Bar Chart */}
            <h3 className="mb-4 text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Yearly LMIA Approvals</h3>
            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${Math.max(data.yearlyData.length * 110, 400)} 320`} className="w-full" style={{ minWidth: "400px" }}>
                {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                  const val = Math.round(maxYearlyTotal * pct);
                  const y = 20 + (1 - pct) * yearBarHeight;
                  return (
                    <g key={pct}>
                      <line x1="40" y1={y} x2={Math.max(data.yearlyData.length * 110, 380)} y2={y} stroke="#F0F0F0" strokeWidth="1" />
                      <text x="32" y={y + 4} textAnchor="end" className="text-xs" fill="#9CA3AF">{val}</text>
                    </g>
                  );
                })}
                {data.yearlyData.map((y, i) => {
                  const x = 60 + i * 100;
                  const barW = 64;
                  const segments = [
                    { key: "highWage", val: y.highWage },
                    { key: "lowWage", val: y.lowWage },
                    { key: "prStream", val: y.prStream },
                    { key: "agriculture", val: y.agriculture },
                    { key: "globalTalent", val: y.globalTalent },
                    { key: "caregiver", val: y.caregiver },
                  ].filter((s) => s.val > 0);
                  const totalH = segments.reduce((s, seg) => s + seg.val, 0);
                  const scale = maxYearlyTotal > 0 ? yearBarHeight / maxYearlyTotal : 0;
                  let cumY = 20 + yearBarHeight;
                  return (
                    <g key={y.year}>
                      {segments.map((seg, si) => {
                        const h = seg.val * scale;
                        cumY -= h;
                        return (
                          <rect
                            key={seg.key}
                            x={x}
                            y={cumY}
                            width={barW}
                            height={h}
                            fill={STREAM_COLORS[seg.key]}
                            rx="3"
                            opacity={!isPaid ? 0.4 : 1}
                          >
                            <title>{STREAM_LABELS[seg.key]}: {seg.val}</title>
                          </rect>
                        );
                      })}
                      {isPaid && (
                        <text x={x + barW / 2} y={20 + yearBarHeight - totalH * scale - 8} textAnchor="middle" className="text-xs font-semibold" fill="#0A0A0B">{fmt(y.total)}</text>
                      )}
                      <text x={x + barW / 2} y={20 + yearBarHeight + 20} textAnchor="middle" className="text-sm" fill="#6B7280">{y.year}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
              {Object.entries(STREAM_LABELS).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: STREAM_COLORS[key], opacity: !isPaid ? 0.4 : 1 }} />
                  <span className="text-xs text-[#6B7280]">{label}</span>
                </div>
              ))}
            </div>
            {!isPaid && (
                <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-[#6B7280]">
                  🔒 Upgrade to see detailed trend data
                </span>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            DATA TRANSPARENCY FOOTER
            ════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Data Transparency</h3>
                <p className="text-xs text-[#6B7280]">
                  Data Sources: Publicly available LMIA disclosure data from Employment and Social Development Canada (ESDC).
                </p>
                <p className="text-xs text-[#6B7280]">
                  Last updated: Quarterly. Disclaimer: Analytics are for informational purposes only. LMIA Career AI does not guarantee employment, LMIA approval, or immigration outcomes.
                </p>
              </div>
              <Link
                to="/disclaimer"
                className="shrink-0 rounded-xl bg-white/5 px-4 py-2 text-xs font-medium text-[#6B7280] transition-colors hover:bg-white/10 hover:text-white"
              >
                Full Disclaimer →
              </Link>
            </div>
          </div>
        </section>

        {/* Last updated */}
        <p className="text-center text-xs text-[#6B7280]">
          Data sourced from publicly documented LMIA employer records. Last updated: {new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}.
        </p>
      </main>
      <Footer />
    </div>
  );
}

// ── Sortable Table Header ─────────────────────────────────────
function SortTh({ label, col, current, onClick }: { label: string; col: string; current: { col: string; dir: string }; onClick: (col: string) => void }) {
  const isActive = current.col === col;
  return (
    <th className="px-6 py-4 font-semibold text-white cursor-pointer select-none hover:text-[#2563EB] transition-colors" onClick={() => onClick(col)}>
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive && (
          <span className="text-[#2563EB]">{current.dir === "asc" ? "↑" : "↓"}</span>
        )}
      </span>
    </th>
  );
}
