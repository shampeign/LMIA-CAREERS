import { Link } from "@tanstack/react-router";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#how-it-works" },
      { label: "Jobs", href: "/jobs", isRoute: true },
      { label: "Employers", href: "/employers", isRoute: true },
      { label: "Analytics", href: "/analytics", isRoute: true },
      { label: "Pricing", href: "/pricing", isRoute: true },
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
    <footer className="bg-[#0B0E14] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </span>
              LMIA Career AI
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#9CA3AF]">
              Helping job seekers discover Canadian employers with TFWP hiring history and optimize
              their applications with AI.
            </p>
            <p className="mt-4 text-sm text-[#6B7280]">
              Not an immigration consultancy. We do not process visa applications or provide legal advice.
            </p>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-[15px] font-semibold text-white">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {"isRoute" in link && link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-[15px] text-[#9CA3AF] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[15px] text-[#9CA3AF] hover:text-white transition-colors"
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

        <div className="mt-16 border-t border-white/10 pt-8">
          {/* Trust badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-base">🇨🇦</span>
              Built in Canada
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Data sourced from public ESDC LMIA disclosures
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Clerk-secured accounts
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
              </svg>
              Neon database encryption
            </span>
          </div>
          <p className="text-center text-sm text-[#6B7280]">
            &copy; {new Date().getFullYear()} LMIA Career AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
