import { useState } from "react";
import { Link } from "@tanstack/react-router";

const tabs = [
  {
    id: "intelligence",
    label: "Employer Intelligence",
    title: "Employer Intelligence",
    description:
      "Browse our comprehensive directory of Canadian employers with documented TFWP hiring history. Filter by industry, province, wage range, and sponsorship scores.",
    placeholder: "Employer directory with filters, sponsorship scores, and LMIA approval data",
  },
  {
    id: "matching",
    label: "AI Job Matching",
    title: "AI Job Matching",
    description:
      "Our AI analyzes your skills and experience to match you with the most relevant job opportunities. Get personalized match scores and never miss a fit.",
    placeholder: "AI-powered job cards with match scores, skill gap analysis, and recommendations",
  },
  {
    id: "analytics",
    label: "Analytics Dashboard",
    title: "Analytics Dashboard",
    description:
      "Track LMIA trends, wage data, approval rates, and occupation insights. Make data-driven decisions about where to focus your job search.",
    placeholder: "Charts showing LMIA approvals by province, wage trends, and top occupations",
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <section className="bg-white px-6 pt-28 pb-20 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Headline */}
        <h1 className="text-center text-[56px] font-bold leading-[1.05] tracking-[-0.04em] text-[#0A0A0B] sm:text-[72px]">
          Find Canadian employers who are hiring
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-8 max-w-xl text-center text-[18px] leading-[1.6] text-[#6B7280]">
          Discover employers with TFWP hiring history, get AI-matched to jobs, and optimize every application.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-4 text-[16px] font-semibold text-white hover:bg-[#1D4ED8]"
          >
            Get Started
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Tabbed Feature Showcase */}
        <div className="mt-20">
          {/* Tab buttons */}
          <div className="flex justify-center border-b border-[#F0F0F0]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 pb-4 text-[15px] font-medium border-b-2 -mb-[1px] ${
                  activeTab === tab.id
                    ? "border-[#0A0A0B] text-[#0A0A0B]"
                    : "border-transparent text-[#9CA3AF] hover:text-[#4B5563]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0B]">
                {active.title}
              </h3>
              <p className="mt-4 text-[17px] leading-relaxed text-[#6B7280]">
                {active.description}
              </p>
              <Link
                to={
                  active.id === "intelligence"
                    ? "/employers"
                    : active.id === "matching"
                      ? "/jobs"
                      : "/analytics"
                }
                className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
              >
                Explore {active.label}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            {/* Placeholder mockup area */}
            <div className="rounded-xl border border-[#F0F0F0] bg-[#F8F9FA] p-8">
              <div className="flex items-center justify-center rounded-lg bg-white py-16">
                <p className="text-center text-[15px] text-[#9CA3AF] max-w-xs">
                  {active.placeholder}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
