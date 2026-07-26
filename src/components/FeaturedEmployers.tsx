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
    <section id="employers" className="bg-[#0B0E14] px-6 py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Employers who have hired through TFWP
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-[#9CA3AF]">
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
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 hover:border-white/20 hover:bg-white/10 transition-colors"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-semibold text-white truncate">
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
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#2563EB] hover:text-[#3B82F6] transition-colors"
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
