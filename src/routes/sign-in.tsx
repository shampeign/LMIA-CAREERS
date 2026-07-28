import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — LMIA Career AI" },
      {
        name: "description",
        content: "Sign in to your LMIA Career AI account to access job matches, employer analytics, and AI-powered career tools.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/sign-in" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100dvh-73px)] items-center justify-center bg-[#FAFAFA] px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#1A1A2E]">
              Welcome Back
            </h1>
            <p className="mt-3 text-[16px] text-[#6B7280]">
              Sign in to your LMIA Career AI account
            </p>
          </div>
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm",
                headerTitle: "text-[#1A1A2E]",
                headerSubtitle: "text-[#6B7280]",
                socialButtonsBlockButton:
                  "border-[#E5E7EB] text-[#1A1A2E] rounded-2xl",
                formButtonPrimary:
                  "bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-2xl px-6 py-3",
                footerActionLink:
                  "text-[#2563EB] hover:text-[#1D4ED8]",
                formFieldInput:
                  "rounded-2xl border-[#E5E7EB] text-[#1A1A2E] focus:border-[#2563EB] focus:ring-[#2563EB]/10",
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
