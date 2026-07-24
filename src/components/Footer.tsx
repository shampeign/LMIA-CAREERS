import { Link } from "@tanstack/react-router";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#how-it-works" },
      { label: "Employers", href: "/employers", isRoute: true },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "mailto:hello@lmiacareer.ai" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white px-4 py-16 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                L
              </span>
              LMIA Career AI
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Helping job seekers discover Canadian employers with TFWP hiring history and optimize
              their applications with AI.
            </p>
            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              Not an immigration consultancy. We do not process visa applications or provide legal
              advice.
            </p>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {"isRoute" in link && link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
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

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-100 pt-6 dark:border-gray-800">
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} LMIA Career AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
