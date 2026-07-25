import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Sign Up — LMIA Career AI" },
      {
        name: "description",
        content: "Create your free LMIA Career AI account. Get AI-matched to Canadian LMIA jobs, optimize your resume, and track applications.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/sign-up" }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100dvh-73px)] items-center justify-center bg-white/5 px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-[32px] font-bold tracking-[-0.03em] text-white">
              Create Your Account
            </h1>
            <p className="mt-3 text-[16px] text-[#6B7280]">
              Join LMIA Career AI and accelerate your Canadian job search
            </p>
          </div>
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/onboarding"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "rounded-2xl  border border-white/10 bg-white/5 p-8",
                headerTitle: "text-white",
                headerSubtitle: "text-[#6B7280]",
                socialButtonsBlockButton:
                  "border-white/10 text-white rounded-2xl",
                formButtonPrimary:
                  "bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-2xl px-6 py-3",
                footerActionLink:
                  "text-[#2563EB] hover:text-[#1D4ED8]",
                formFieldInput:
                  "rounded-2xl border-white/10 text-white focus:border-[#2563EB] focus:ring-[#2563EB]/10",
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
