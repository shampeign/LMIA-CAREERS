import { Link } from "@tanstack/react-router";

const employers = [
  {
    name: "Maple Leaf Foods",
    industry: "Food Processing",
    province: "Ontario",
    description:
      "One of Canada's largest food processing companies with multiple facilities across the country.",
    logo: "ML",
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
  {
    name: "Suncor Energy",
    industry: "Oil & Gas",
    province: "Alberta",
    description:
      "Leading integrated energy company with operations in oil sands development and renewable energy.",
    logo: "SE",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  },
  {
    name: "Shopify",
    industry: "Technology",
    province: "Ontario",
    description:
      "Global commerce platform headquartered in Ottawa, hiring across engineering, product, and operations.",
    logo: "SH",
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  },
  {
    name: "Ledcor Group",
    industry: "Construction",
    province: "British Columbia",
    description:
      "Diversified construction company with major infrastructure and building projects across Canada.",
    logo: "LG",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  {
    name: "Agropur",
    industry: "Dairy Processing",
    province: "Quebec",
    description:
      "Major dairy cooperative with processing plants and distribution centers nationwide.",
    logo: "AG",
    color: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
  },
  {
    name: "Irving Group",
    industry: "Manufacturing",
    province: "New Brunswick",
    description:
      "Diversified industrial conglomerate with operations in forestry, transportation, and shipbuilding.",
    logo: "IG",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  },
];

export function FeaturedEmployers() {
  return (
    <section id="employers" className="bg-white px-4 py-20 dark:bg-gray-950 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Featured Employers
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Employers who have hired through{" "}
            <span className="text-blue-600 dark:text-blue-400">TFWP</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Browse employers with publicly documented hiring history. More added weekly.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {employers.map((employer) => (
            <div
              key={employer.name}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                {/* Logo placeholder */}
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl font-bold ${employer.color}`}
                  aria-hidden="true"
                >
                  {employer.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{employer.name}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-medium dark:bg-gray-700">
                      {employer.industry}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {employer.province}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {employer.description}
              </p>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            to="/employers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View All Employers
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
