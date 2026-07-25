import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/tanstack-start";

const navLinks = [
  { label: "Jobs", href: "/jobs", isRoute: true },
  { label: "Employers", href: "/employers", isRoute: true },
  { label: "Analytics", href: "/analytics", isRoute: true },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-[#0B0E14]/95 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold text-white tracking-[-0.02em]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-sm font-bold text-white">
            L
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-[14px] font-medium text-[#9CA3AF] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-[#9CA3AF] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* Desktop auth-aware CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-full px-5 py-2 text-[14px] font-medium text-[#9CA3AF] hover:text-white transition-colors"
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="rounded-full bg-[#2563EB] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
              >
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              to="/dashboard"
              className="rounded-full px-4 py-2 text-[14px] font-medium text-[#9CA3AF] hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/onboarding"
              className="rounded-full px-4 py-2 text-[14px] font-medium text-[#9CA3AF] hover:text-white transition-colors"
            >
              Profile
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-[#9CA3AF] hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-[#0B0E14] md:hidden">
          <div className="flex flex-col px-6 pt-6">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-white hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-white hover:bg-white/5"
                >
                  {link.label}
                </a>
              ),
            )}

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full rounded-xl px-4 py-4 text-left text-lg font-medium text-[#9CA3AF] hover:bg-white/5"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 block w-full rounded-xl bg-[#2563EB] px-6 py-4 text-center text-lg font-semibold text-white hover:bg-[#1D4ED8]"
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-4 text-lg font-medium text-[#9CA3AF] hover:bg-white/5"
                >
                  Dashboard
                </Link>
                <Link
                  to="/onboarding"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-4 text-lg font-medium text-[#9CA3AF] hover:bg-white/5"
                >
                  Profile
                </Link>
                <div className="mt-4 px-4">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-10 w-10",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
