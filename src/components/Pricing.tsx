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
      "Browse jobs (view-only)",
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
      "Access to apply links",
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
      "Access to apply links",
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
    <section id="pricing" className="bg-[#FAFAFA] px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
            Pricing
          </span>
          <h2 className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0B] sm:text-[48px]">
            Plans for every stage of your{" "}
            <span className="text-[#2563EB]">career journey</span>
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280]">
            Start free, upgrade when you're ready to accelerate.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border bg-white p-10 shadow-sm transition-all hover:border-[#E5E7EB] hover:shadow-md ${
                tier.featured
                  ? "border-[#2563EB] ring-1 ring-[#2563EB]"
                  : "border-[#F0F0F0]"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#2563EB] px-5 py-1.5 text-sm font-semibold text-white shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-bold text-[#0A0A0B]">{tier.name}</h3>
              <p className="mt-2 text-[15px] text-[#6B7280]">{tier.description}</p>

              {/* Price */}
              <div className="mt-8">
                <span className="text-5xl font-bold text-[#0A0A0B]">
                  {tier.price}
                </span>
                <span className="text-[15px] text-[#6B7280]">{tier.period}</span>
              </div>

              {/* Features */}
              <ul className="mt-10 flex-1 space-y-4" role="list">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[15px] text-[#4B5563]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#waitlist"
                className={`mt-10 block rounded-2xl px-8 py-4 text-center text-[16px] font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:ring-offset-2 ${
                  tier.featured
                    ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm"
                    : "border border-[#E5E7EB] bg-white text-[#0A0A0B] hover:bg-[#F8F9FA]"
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
