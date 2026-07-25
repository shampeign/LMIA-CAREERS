import { createFileRoute } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { employerLMIAData } from "~/data/employer-lmia";
import { employers } from "~/data/employers";
import { useMemo } from "react";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

// ── Colour palette ───────────────────────────────────────────
const STREAM_COLORS: Record<string, string> = {
  highWage: "#2563EB",
  lowWage: "#F59E0B",
  prStream: "#10B981",
  agriculture: "#8B5CF6",
  globalTalent: "#EC4899",
  caregiver: "#06B6D4",
};

const TEER_COLORS: Record<number, string> = {
  0: "#2563EB",
  1: "#6366F1",
  2: "#10B981",
  3: "#F59E0B",
  4: "#F97316",
  5: "#EF4444",
};

const STREAM_LABELS: Record<string, string> = {
  highWage: "High Wage",
  lowWage: "Low Wage",
  prStream: "PR Stream",
  agriculture: "Agriculture",
  globalTalent: "Global Talent",
  caregiver: "Caregiver",
};

// ── Helpers ──────────────────────────────────────────────────
function fmt(n: number): string {
  return n.toLocaleString("en-CA");
}

function fmtPct(n: number): string {
  return n.toFixed(1) + "%";
}

function fmtWage(n: number): string {
  return "$" + n.toFixed(2) + "/hr";
}

// ── Page Component ───────────────────────────────────────────
function AnalyticsPage() {
  const data = useMemo(() => {
    const lmiaEntries = Object.entries(employerLMIAData);
    const count = lmiaEntries.length;

    // Section 1: Platform Overview
    const totalApprovals = lmiaEntries.reduce((s, [, d]) => s + d.totalApprovals, 0);
    const totalForeignWorkers = lmiaEntries.reduce((s, [, d]) => s + d.foreignWorkersEstimated, 0);
    const avgApprovalRate =
      totalApprovals > 0
        ? lmiaEntries.reduce((s, [, d]) => s + d.approvalRate * d.totalApprovals, 0) / totalApprovals
        : 0;

    // Section 2: Yearly trends — aggregate by year, estimate stream breakdown
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

    // Section 3: Top Occupations (merge by nocCode)
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
      .sort((a, b) => b.approvals - a.approvals)
      .slice(0, 10);

    // Section 4: Program Stream Distribution
    let totalStreams = 0;
    const streamAgg = { highWage: 0, lowWage: 0, prStream: 0, agriculture: 0, globalTalent: 0, caregiver: 0 };
    for (const [, d] of lmiaEntries) {
      streamAgg.highWage += d.streams.highWage;
      streamAgg.lowWage += d.streams.lowWage;
      streamAgg.prStream += d.streams.prStream;
      streamAgg.agriculture += d.streams.agriculture;
      streamAgg.globalTalent += d.streams.globalTalent;
      streamAgg.caregiver += d.streams.caregiver;
    }
    totalStreams = streamAgg.highWage + streamAgg.lowWage + streamAgg.prStream + streamAgg.agriculture + streamAgg.globalTalent + streamAgg.caregiver;
    const streamEntries = Object.entries(streamAgg)
      .filter(([, v]) => v > 0)
      .sort(([, a], [, b]) => b - a);

    // Section 5: Province Distribution
    const provMap: Record<string, number> = {};
    for (const [, d] of lmiaEntries) {
      for (const p of d.hiringProvinces) {
        provMap[p.province] = (provMap[p.province] || 0) + p.approvals;
      }
    }
    const provinceData = Object.entries(provMap)
      .map(([province, approvals]) => ({ province, approvals }))
      .sort((a, b) => b.approvals - a.approvals);
    const maxProvince = provinceData.length > 0 ? provinceData[0].approvals : 1;

    // Section 6: Wage Analysis — by industry aggregate
    const industryMap: Record<string, { employers: number; wages: number[]; totalApprovals: number }> = {};
    for (const emp of employers) {
      const lmia = employerLMIAData[emp.slug];
      if (!lmia) continue;
      const ind = emp.industry;
      if (!industryMap[ind]) industryMap[ind] = { employers: 0, wages: [], totalApprovals: 0 };
      industryMap[ind].employers++;
      industryMap[ind].wages.push(lmia.wageMedian);
      industryMap[ind].totalApprovals += lmia.totalApprovals;
    }
    const industryWages = Object.entries(industryMap)
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

    // Section 7: Employer Sponsorship Score Rankings
    const sponsorshipRankings = employers
      .filter((e) => employerLMIAData[e.slug])
      .map((e) => {
        const lmia = employerLMIAData[e.slug];
        const topOcc = lmia.topOccupations.length > 0 ? lmia.topOccupations[0].nocName : "N/A";
        return {
          name: e.name,
          slug: e.slug,
          score: lmia.sponsorshipScore,
          approvals: lmia.totalApprovals,
          approvalRate: lmia.approvalRate,
          topOccupation: topOcc,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    // Section 8: Quarterly Growth
    const qAgg: { year: number; q1: number; q2: number; q3: number; q4: number }[] = [];
    for (const [, d] of lmiaEntries) {
      for (const y of d.yearlyHistory) {
        let existing = qAgg.find((q) => q.year === y.year);
        if (!existing) { existing = { year: y.year, q1: 0, q2: 0, q3: 0, q4: 0 }; qAgg.push(existing); }
        existing.q1 += y.q1;
        existing.q2 += y.q2;
        existing.q3 += y.q3;
        existing.q4 += y.q4;
      }
    }
    qAgg.sort((a, b) => a.year - b.year);

    return {
      count,
      totalApprovals,
      totalForeignWorkers,
      avgApprovalRate,
      yearlyData,
      topOccupations,
      streamEntries,
      totalStreams,
      provinceData,
      maxProvince,
      industryWages,
      sponsorshipRankings,
      qAgg,
    };
  }, []);

  const maxYearlyTotal = data.yearlyData.length > 0 ? Math.max(...data.yearlyData.map((y) => y.total)) : 1;
  const yearBarHeight = 220;
  const maxOccVal = data.topOccupations.length > 0 ? data.topOccupations[0].approvals : 1;

  // Donut chart constants
  const donutR = 90;
  const donutInnerR = 55;
  const donutStroke = 2 * Math.PI * ((donutR + donutInnerR) / 2);
  const donutViewBox = 220;

  return (
    <>
      <SignedIn>
        <div className="min-h-dvh bg-[#FAFAFA]">
          <Navbar />
          <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
            {/* Page Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-[-0.02em] text-[#0A0A0B] lg:text-4xl">
                LMIA Analytics
              </h1>
              <p className="mt-2 text-lg text-[#6B7280]">
                Cross-employer insights into LMIA trends, wages, and hiring patterns across {data.count} Canadian employers.
              </p>
            </div>

            {/* ── Section 1: Platform Overview ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">Platform Overview</h2>
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
                  label="Est. Foreign Workers"
                  value={fmt(data.totalForeignWorkers)}
                  subtitle="Positions filled"
                  trend="Estimated"
                />
                <StatCard
                  label="Active Employers"
                  value={String(data.count)}
                  subtitle="With documented LMIA"
                  trend="Live data"
                />
              </div>
            </section>

            {/* ── Section 2: LMIA Approval Trends ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">LMIA Approval Trends</h2>
              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                <div className="overflow-x-auto">
                  <svg viewBox={`0 0 ${Math.max(data.yearlyData.length * 110, 400)} 320`} className="w-full" style={{ minWidth: "400px" }}>
                    {/* Y-axis labels */}
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
                    {/* Bars */}
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
                            const rect = (
                              <rect
                                key={seg.key}
                                x={x}
                                y={cumY}
                                width={barW}
                                height={h}
                                fill={STREAM_COLORS[seg.key]}
                                rx="3"
                              >
                                <title>{STREAM_LABELS[seg.key]}: {seg.val}</title>
                              </rect>
                            );
                            return rect;
                          })}
                          {/* Total label above bar */}
                          <text x={x + barW / 2} y={20 + yearBarHeight - totalH * scale - 8} textAnchor="middle" className="text-xs font-semibold" fill="#0A0A0B">{fmt(y.total)}</text>
                          {/* Year label */}
                          <text x={x + barW / 2} y={20 + yearBarHeight + 20} textAnchor="middle" className="text-sm" fill="#6B7280">{y.year}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {Object.entries(STREAM_LABELS).filter(([key]) => data.streamEntries.some(([k]) => k === key)).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: STREAM_COLORS[key] }} />
                      <span className="text-xs text-[#6B7280]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Section 3: Top Occupations ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">Top 10 Occupations</h2>
              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                <div className="overflow-x-auto">
                  <svg viewBox={`0 0 800 ${data.topOccupations.length * 44 + 20}`} className="w-full">
                    {data.topOccupations.map((occ, i) => {
                      const y = 15 + i * 44;
                      const barW = Math.max((occ.approvals / maxOccVal) * 500, 20);
                      const color = TEER_COLORS[occ.teerLevel] || "#6B7280";
                      return (
                        <g key={occ.nocCode}>
                          <text x="0" y={y + 18} className="text-xs" fill="#0A0A0B" style={{ fontSize: "12px" }}>
                            {occ.nocName.length > 42 ? occ.nocName.slice(0, 39) + "…" : occ.nocName}
                          </text>
                          <rect x="440" y={y + 4} width={barW} height="22" fill={color} rx="4" opacity="0.85" />
                          <text x={440 + barW + 8} y={y + 19} className="text-xs font-semibold" fill="#0A0A0B">{occ.approvals}</text>
                          <text x="530" y={y + 19} className="text-xs" fill="#6B7280">{fmtWage(occ.avgWage)}</text>
                          <text x="668" y={y + 19} className="text-xs font-medium" fill={color}>TEER {occ.teerLevel}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                {/* Column headers */}
                <div className="mt-2 flex gap-6 text-[11px] text-[#9CA3AF]">
                  <span className="w-[440px]">Occupation</span>
                  <span>Approvals</span>
                  <span className="ml-12">Avg Wage</span>
                  <span className="ml-20">Level</span>
                </div>
              </div>
            </section>

            {/* ── Section 4: Program Stream Distribution ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">Program Stream Distribution</h2>
              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center gap-6 lg:flex-row">
                  {/* Donut chart */}
                  <svg viewBox={`0 0 ${donutViewBox} ${donutViewBox}`} className="h-56 w-56 shrink-0">
                    <g transform={`translate(${donutViewBox / 2},${donutViewBox / 2})`}>
                      {(() => {
                        let cumAngle = -Math.PI / 2;
                        return data.streamEntries.map(([key, val]) => {
                          const pct = val / data.totalStreams;
                          const angle = pct * 2 * Math.PI;
                          const x1 = donutInnerR * Math.cos(cumAngle);
                          const y1 = donutInnerR * Math.sin(cumAngle);
                          const x2 = donutInnerR * Math.cos(cumAngle + angle);
                          const y2 = donutInnerR * Math.sin(cumAngle + angle);
                          const x3 = donutR * Math.cos(cumAngle + angle);
                          const y3 = donutR * Math.sin(cumAngle + angle);
                          const x4 = donutR * Math.cos(cumAngle);
                          const y4 = donutR * Math.sin(cumAngle);
                          const largeArc = angle > Math.PI ? 1 : 0;
                          const path = `M ${x1} ${y1} L ${x4} ${y4} A ${donutR} ${donutR} 0 ${largeArc} 1 ${x3} ${y3} L ${x2} ${y2} A ${donutInnerR} ${donutInnerR} 0 ${largeArc} 0 ${x1} ${y1} Z`;
                          const el = (
                            <g key={key}>
                              <path d={path} fill={STREAM_COLORS[key]} stroke="#fff" strokeWidth="2">
                                <title>{STREAM_LABELS[key]}: {fmtPct(pct * 100)}</title>
                              </path>
                            </g>
                          );
                          cumAngle += angle;
                          return el;
                        });
                      })()}
                      <circle cx="0" cy="0" r={donutInnerR - 2} fill="#fff" />
                      <text x="0" y="-8" textAnchor="middle" className="text-2xl font-bold" fill="#0A0A0B">{fmt(data.totalStreams)}</text>
                      <text x="0" y="12" textAnchor="middle" className="text-xs" fill="#9CA3AF">Total LMIA</text>
                    </g>
                  </svg>
                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {data.streamEntries.map(([key, val]) => {
                      const pct = (val / data.totalStreams) * 100;
                      return (
                        <div key={key} className="flex items-center gap-3">
                          <span className="h-4 w-4 rounded-md" style={{ backgroundColor: STREAM_COLORS[key] }} />
                          <div>
                            <div className="text-sm font-medium text-[#0A0A0B]">{STREAM_LABELS[key]}</div>
                            <div className="text-xs text-[#9CA3AF]">{fmt(val)} &middot; {fmtPct(pct)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 5: Province Distribution ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">LMIA Distribution by Province</h2>
              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                <div className="overflow-x-auto">
                  <svg viewBox={`0 0 600 ${data.provinceData.length * 44 + 20}`} className="w-full">
                    {data.provinceData.map((p, i) => {
                      const y = 15 + i * 44;
                      const barW = Math.max((p.approvals / maxProvince) * 380, 16);
                      const intensity = 0.3 + (p.approvals / maxProvince) * 0.7;
                      const color = `rgba(37, 99, 235, ${intensity.toFixed(2)})`;
                      return (
                        <g key={p.province}>
                          <text x="0" y={y + 18} className="text-xs font-medium" fill="#0A0A0B">{p.province}</text>
                          <rect x="40" y={y + 4} width={barW} height="22" fill={color} rx="4" />
                          <text x={44 + barW + 8} y={y + 19} className="text-xs font-semibold" fill="#0A0A0B">{fmt(p.approvals)}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </section>

            {/* ── Section 6: Wage Analysis ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">Wage Analysis by Industry</h2>
              <div className="rounded-3xl border border-[#F0F0F0] bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F0F0F0] bg-[#F8F9FA]">
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Industry</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Employers</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Approvals</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Min Wage</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Median Wage</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Max Wage</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Avg Wage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F0F0]">
                      {data.industryWages.map((iw) => (
                        <tr key={iw.industry} className="transition-colors hover:bg-[#F8F9FA]">
                          <td className="px-6 py-4 font-medium text-[#0A0A0B]">{iw.industry}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{iw.employers}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{fmt(iw.approvals)}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{fmtWage(iw.min)}</td>
                          <td className="px-6 py-4 font-semibold text-[#2563EB]">{fmtWage(iw.median)}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{fmtWage(iw.max)}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{fmtWage(iw.avg)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ── Section 7: Employer Sponsorship Score Rankings ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">Sponsorship Score Rankings</h2>
              <div className="rounded-3xl border border-[#F0F0F0] bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F0F0F0] bg-[#F8F9FA]">
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Rank</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Employer</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Score</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Approvals</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Appr. Rate</th>
                        <th className="px-6 py-4 font-semibold text-[#0A0A0B]">Top Occupation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F0F0]">
                      {data.sponsorshipRankings.map((er, i) => {
                        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : String(i + 1);
                        return (
                          <tr key={er.slug} className="transition-colors hover:bg-[#F8F9FA]">
                            <td className="px-6 py-4">
                              <span className={i < 3 ? "text-lg" : "text-sm text-[#6B7280]"}>{medal}</span>
                            </td>
                            <td className="px-6 py-4 font-medium text-[#0A0A0B]">{er.name}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-16 overflow-hidden rounded-full bg-[#F0F0F0]">
                                  <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${er.score}%` }} />
                                </div>
                                <span className="font-semibold text-[#0A0A0B]">{er.score}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-[#6B7280]">{fmt(er.approvals)}</td>
                            <td className="px-6 py-4 text-[#6B7280]">{fmtPct(er.approvalRate)}</td>
                            <td className="px-6 py-4 text-[#6B7280] max-w-[180px] truncate">{er.topOccupation}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ── Section 8: Hiring Growth Patterns ── */}
            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[#0A0A0B]">Quarterly Hiring Trends</h2>
              <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                {data.qAgg.length > 0 && (
                  <div className="overflow-x-auto">
                    <svg viewBox={`0 0 ${Math.max(data.qAgg.length * 4 * 45, 500)} 280`} className="w-full" style={{ minWidth: "500px" }}>
                      {data.qAgg.map((y, yi) => {
                        const quarters = [y.q1, y.q2, y.q3, y.q4];
                        const maxQ = Math.max(...quarters, 1);
                        return quarters.map((q, qi) => {
                          const x = 60 + yi * 180 + qi * 40;
                          const barH = (q / maxQ) * 160;
                          const isUp = qi > 0 && q > quarters[qi - 1];
                          const isDown = qi > 0 && q < quarters[qi - 1];
                          const color = qi === 0 ? "#2563EB" : isUp ? "#10B981" : isDown ? "#EF4444" : "#6B7280";
                          return (
                            <g key={`${y.year}-q${qi + 1}`}>
                              <rect x={x} y={30 + 160 - barH} width="28" height={barH} fill={color} rx="3" opacity="0.85">
                                <title>{y.year} Q{qi + 1}: {q}</title>
                              </rect>
                              <text x={x + 14} y={30 + 160 - barH - 6} textAnchor="middle" className="text-[10px] font-semibold" fill="#0A0A0B">{q}</text>
                              <text x={x + 14} y={208} textAnchor="middle" className="text-[10px]" fill="#9CA3AF">Q{qi + 1}</text>
                            </g>
                          );
                        });
                      }).concat(
                        // Year labels
                        data.qAgg.map((y, yi) => (
                          <text key={`yl-${y.year}`} x={60 + yi * 180 + 80} y={230} textAnchor="middle" className="text-xs font-medium" fill="#6B7280">{y.year}</text>
                        )),
                      )}
                    </svg>
                  </div>
                )}
                {/* Legend */}
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#2563EB]" /><span className="text-xs text-[#6B7280]">Q1 (baseline)</span></div>
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#10B981]" /><span className="text-xs text-[#6B7280]">QoQ Growth</span></div>
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#EF4444]" /><span className="text-xs text-[#6B7280]">QoQ Decline</span></div>
                </div>
              </div>
            </section>

            {/* Last updated */}
            <p className="text-center text-xs text-[#9CA3AF]">
              Data sourced from publicly documented LMIA employer records. Last updated: {new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}.
            </p>
          </main>
          <Footer />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-dvh flex-col items-center justify-center bg-[#FAFAFA] px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-[-0.02em] text-[#0A0A0B]">Sign in to view analytics</h1>
            <p className="mt-3 text-[#6B7280]">Access LMIA trends, wage data, and employer insights.</p>
            <SignInButton mode="modal">
              <button
                type="button"
                className="mt-8 rounded-xl bg-[#2563EB] px-8 py-3 text-base font-semibold text-white transition-all hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:ring-offset-2"
              >
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ label, value, subtitle, trend }: { label: string; value: string; subtitle: string; trend: string }) {
  return (
    <div className="rounded-3xl border border-[#F0F0F0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="text-sm text-[#6B7280]">{label}</div>
      <div className="mt-2 text-3xl font-bold tracking-[-0.02em] text-[#0A0A0B]">{value}</div>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-xs text-[#9CA3AF]">{subtitle}</span>
        <span className="rounded-full bg-[#F0F0F0] px-2 py-0.5 text-[11px] font-medium text-[#6B7280]">{trend}</span>
      </div>
    </div>
  );
}
