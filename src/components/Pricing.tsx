import { Link } from "@tanstack/react-router";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "No login required — jump right in.",
    features: [
      "Employer directory browsing",
      "Waitlist signup",
      "Basic search/filter by province and industry",
    ],
    cta: "Get Started Free",
    href: "/employers",
    external: false,
    featured: false,
  },
  {
    name: "Professional",
    price: "CA$19",
    period: "/mo",
    description: "AI-powered tools to accelerate your applications.",
    features: [
      "AI-powered employer intelligence",
      "Resume optimization",
      "Cover letter generator",
      "Apply links",
      "Unlimited saves",
      "Application tracker",
      "Priority alerts",
    ],
    cta: "Subscribe",
    href: "https://buy.stripe.com/3cI3cv00xfnacUN3rHaEE03",
    external: true,
    featured: true,
  },
  {
    name: "Premium",
    price: "CA$39",
    period: "/mo",
    description: "Complete career preparation for serious candidates.",
    features: [
      "Everything in Professional, plus:",
      "AI interview simulator",
      "Personalized job matching",
      "Salary insights",
      "1-on-1 coaching",
      "Priority support",
    ],
    cta: "Subscribe",
    href: "https://buy.stripe.com/eVq9ATdRndf26wpfapaEE02",
    external: true,
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#FAFAFA] px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2563EB]">
            Pricing
          </p>
          <h2 className="mt-4 text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1A1A2E] sm:text-[52px]">
            Plans for every stage of your career journey
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed text-[#6B7280]">
            Start free, upgrade when you're ready to accelerate.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-10 ${
                tier.featured
                  ? "border-[#2563EB] bg-[#EFF6FF] shadow-lg shadow-[#2563EB]/10"
                  : "border-[#E5E7EB] bg-white hover:shadow-md transition-shadow"
              }`}
            >
              {tier.featured && (
                <span className="mb-6 inline-block self-start rounded-full bg-[#2563EB] px-4 py-1.5 text-sm font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-[#1A1A2E]">{tier.name}</h3>
              <p className="mt-2 text-[15px] text-[#6B7280]">{tier.description}</p>

              <div className="mt-8">
                <span className="text-5xl font-bold text-[#1A1A2E]">
                  {tier.price}
                </span>
                <span className="text-[15px] text-[#9CA3AF]">{tier.period}</span>
              </div>

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

              {tier.external ? (
                <a
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-10 block rounded-full px-8 py-4 text-center text-[16px] font-semibold transition-colors ${
                    tier.featured
                      ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                      : "border-2 border-[#E5E7EB] text-[#1A1A2E] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {tier.cta}
                </a>
              ) : (
                <Link
                  to={tier.href}
                  className={`mt-10 block rounded-full px-8 py-4 text-center text-[16px] font-semibold transition-colors ${
                    tier.featured
                      ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                      : "border-2 border-[#E5E7EB] text-[#1A1A2E] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
