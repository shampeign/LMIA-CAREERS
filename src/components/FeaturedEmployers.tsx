import { Link } from "@tanstack/react-router";

const employers = [
  {
    name: "Maple Leaf Foods",
    industry: "Food Processing",
    province: "Ontario",
    description:
      "One of Canada's largest food processing companies with multiple facilities across the country.",
    logo: "ML",
  },
  {
    name: "Suncor Energy",
    industry: "Oil & Gas",
    province: "Alberta",
    description:
      "Leading integrated energy company with operations in oil sands development and renewable energy.",
    logo: "SE",
  },
  {
    name: "Shopify",
    industry: "Technology",
    province: "Ontario",
    description:
      "Global commerce platform headquartered in Ottawa, hiring across engineering, product, and operations.",
    logo: "SH",
  },
  {
    name: "Ledcor Group",
    industry: "Construction",
    province: "British Columbia",
    description:
      "Diversified construction company with major infrastructure and building projects across Canada.",
    logo: "LG",
  },
  {
    name: "Agropur",
    industry: "Dairy Processing",
    province: "Quebec",
    description:
      "Major dairy cooperative with processing plants and distribution centers nationwide.",
    logo: "AG",
  },
  {
    name: "Irving Group",
    industry: "Manufacturing",
    province: "New Brunswick",
    description:
      "Diversified industrial conglomerate with operations in forestry, transportation, and shipbuilding.",
    logo: "IG",
  },
];

export function FeaturedEmployers() {
  return (
    <section id="employers" className="bg-[#FAFAFA] px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
            Featured Employers
          </span>
          <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
            Employers who have hired through{" "}
            <span className="text-[#2563EB]">TFWP</span>
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
            Browse employers with publicly documented hiring history. More added weekly.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {employers.map((employer) => (
            <div
              key={employer.name}
              className="group rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm transition-all hover:border-[#E5E7EB] hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* Logo placeholder */}
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F0F0F0] text-sm font-bold text-[#4B5563]"
                  aria-hidden="true"
                >
                  {employer.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-[#0A0A0B]">{employer.name}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#F0F0F0] px-3 py-1 text-xs font-medium text-[#4B5563]">
                      {employer.industry}
                    </span>
                    <span className="rounded-full bg-[#FAFAFA] px-3 py-1 text-xs font-medium text-[#6B7280]">
                      {employer.province}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-[#6B7280]">
                {employer.description}
              </p>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-14 text-center">
          <Link
            to="/employers"
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
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
