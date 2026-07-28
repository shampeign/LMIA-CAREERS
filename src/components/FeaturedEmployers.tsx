import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getFeaturedEmployers } from "~/server/employers";
import type { Employer } from "~/data/employers";

const featuredSlugs = [
  "maple-leaf-foods",
  "suncor-energy",
  "shopify-inc",
  "ledcor-group",
  "agropur-cooperative",
  "jd-irving",
];

export function FeaturedEmployers() {
  const [featuredEmployers, setFeaturedEmployers] = useState<Employer[]>([]);

  useEffect(() => {
    getFeaturedEmployers(featuredSlugs).then(setFeaturedEmployers).catch(() => {});
  }, []);

  return (
    <section id="employers" className="bg-[#FAFAFA] px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2563EB]">
            Featured Employers
          </p>
          <h2 className="mt-4 text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1A1A2E] sm:text-[52px]">
            Employers who have hired through TFWP
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed text-[#6B7280]">
            Browse employers with publicly documented hiring history. More added weekly.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEmployers.map((employer) => {
            const initials = employer.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            return (
              <Link
                key={employer.slug}
                to="/employers/$slug"
                params={{ slug: employer.slug }}
                className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5 hover:border-[#2563EB]/30 hover:shadow-md transition-all"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-sm font-bold text-[#2563EB]"
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-semibold text-[#1A1A2E] truncate">
                    {employer.name}
                  </div>
                  <div className="text-[14px] text-[#9CA3AF]">
                    {employer.industry} &middot; {employer.province}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/employers"
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            View All Employers
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
