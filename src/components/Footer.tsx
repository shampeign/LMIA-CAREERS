import { Link } from "@tanstack/react-router";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#how-it-works" },
      { label: "Jobs", href: "/jobs", isRoute: true },
      { label: "Employers", href: "/employers", isRoute: true },
      { label: "Analytics", href: "/analytics", isRoute: true },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about", isRoute: true },
      { label: "How It Works", href: "/how-it-works", isRoute: true },
      { label: "Careers", href: "/careers", isRoute: true },
      { label: "Contact", href: "mailto:contact@lmiacareersai.com" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", isRoute: true },
      { label: "Terms of Service", href: "/terms", isRoute: true },
      { label: "Disclaimer", href: "/disclaimer", isRoute: true },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-[#F0F0F0] bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-bold text-[#0A0A0B]">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0B] text-sm font-bold text-white">
                L
              </span>
              LMIA Career AI
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#6B7280]">
              Helping job seekers discover Canadian employers with TFWP hiring history and optimize
              their applications with AI.
            </p>
            <p className="mt-4 text-sm text-[#9CA3AF]">
              Not an immigration consultancy. We do not process visa applications or provide legal advice.
            </p>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-[15px] font-semibold text-[#0A0A0B]">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {"isRoute" in link && link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-[15px] text-[#6B7280] hover:text-[#0A0A0B]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[15px] text-[#6B7280] hover:text-[#0A0A0B]"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#F0F0F0] pt-8">
          <p className="text-center text-sm text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} LMIA Career AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
