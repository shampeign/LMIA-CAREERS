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
  { label: "Pricing", href: "/pricing", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
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
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
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
