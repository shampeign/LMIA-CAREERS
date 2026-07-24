const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Essential tools to get started on your job search.",
    features: [
      "Employer directory access",
      "Basic job search & filters",
      "Save up to 10 jobs",
      "Community forum access",
    ],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Professional",
    price: "$19",
    period: "/month",
    description: "AI-powered tools to accelerate your applications.",
    features: [
      "Everything in Free",
      "AI resume optimization",
      "AI cover letter generator",
      "Unlimited job saves",
      "Application tracker",
      "Priority employer alerts",
    ],
    cta: "Join Waitlist",
    featured: true,
  },
  {
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "Complete preparation for serious candidates.",
    features: [
      "Everything in Professional",
      "AI interview simulator",
      "Personalized job matching",
      "Salary & market insights",
      "1-on-1 career coaching (monthly)",
      "Priority support",
    ],
    cta: "Join Waitlist",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-white px-4 py-20 dark:bg-gray-950 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Plans for every stage of your{" "}
            <span className="text-blue-600 dark:text-blue-400">career journey</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start free, upgrade when you're ready to accelerate.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800 ${
                tier.featured
                  ? "border-blue-500 shadow-blue-100 ring-2 ring-blue-500 dark:border-blue-400 dark:shadow-blue-900/30 dark:ring-blue-400"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Plan name */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tier.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {tier.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{tier.period}</span>
              </div>

              {/* Features */}
              <ul className="mt-8 flex-1 space-y-3" role="list">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#waitlist"
                className={`mt-8 block rounded-xl px-6 py-3 text-center text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                  tier.featured
                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
