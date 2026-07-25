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
      className="sticky top-0 z-50 border-b border-[#F0F0F0] bg-white/90 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold text-[#0A0A0B] tracking-[-0.02em]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A0A0B] text-sm font-bold text-white">
            L
          </span>
          <span>LMIA Career AI</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-[15px] font-medium text-[#4B5563] transition-colors hover:text-[#0A0A0B]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-[#4B5563] transition-colors hover:text-[#0A0A0B]"
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
                className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-[#4B5563] transition-colors hover:bg-[#F8F9FA] hover:text-[#0A0A0B]"
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-[15px] font-semibold text-white transition-all hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              to="/dashboard"
              className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-[#4B5563] transition-colors hover:bg-[#F8F9FA] hover:text-[#0A0A0B]"
            >
              Dashboard
            </Link>
            <Link
              to="/onboarding"
              className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-[#4B5563] transition-colors hover:bg-[#F8F9FA] hover:text-[#0A0A0B]"
            >
              Profile
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-[#4B5563] hover:bg-[#F8F9FA] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <svg
              className="h-6 w-6"
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
              className="h-6 w-6"
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

      {/* Mobile menu - fullscreen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-white md:hidden">
          <div className="flex flex-col px-6 pt-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-[#0A0A0B] hover:bg-[#F8F9FA]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-[#0A0A0B] hover:bg-[#F8F9FA]"
                >
                  {link.label}
                </a>
              ),
            )}

            <div className="mt-8 space-y-3 border-t border-[#F0F0F0] pt-8">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full rounded-xl px-4 py-4 text-left text-lg font-medium text-[#4B5563] hover:bg-[#F8F9FA]"
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
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-4 text-lg font-medium text-[#4B5563] hover:bg-[#F8F9FA]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/onboarding"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-4 text-lg font-medium text-[#4B5563] hover:bg-[#F8F9FA]"
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
