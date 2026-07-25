import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLoadingSkeleton } from "~/components/PageLoadingSkeleton";

const AnalyticsPage = lazy(() => import("./analytics.lazy"));

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "LMIA Analytics — Employer Intelligence Dashboard | LMIA Career AI" },
      {
        name: "description",
        content:
          "Explore LMIA employer analytics: stream breakdowns, approval trends, wage distributions, provincial heatmaps, and top occupations across Canadian TFWP data.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/analytics" }],
  }),
  component: () => (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <AnalyticsPage />
    </Suspense>
  ),
});
