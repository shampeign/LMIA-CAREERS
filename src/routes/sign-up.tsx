import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-start";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100dvh-61px)] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Your Account
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
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
                card: "rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                headerTitle: "text-gray-900 dark:text-white",
                headerSubtitle: "text-gray-500 dark:text-gray-400",
                socialButtonsBlockButton:
                  "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200",
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold",
                footerActionLink:
                  "text-blue-600 hover:text-blue-700 dark:text-blue-400",
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
