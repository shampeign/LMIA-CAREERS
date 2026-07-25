import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLoadingSkeleton } from "~/components/PageLoadingSkeleton";

const OnboardingPage = lazy(() => import("./onboarding.lazy"));

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Complete Your Profile — LMIA Career AI" },
      {
        name: "description",
        content:
          "Complete your LMIA Career AI profile to get personalized job matches. Tell us about your skills, experience, and preferences for Canadian job opportunities.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/onboarding" }],
  }),
  component: () => (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <OnboardingPage />
    </Suspense>
  ),
});
