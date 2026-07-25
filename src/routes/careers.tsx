import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLoadingSkeleton } from "~/components/PageLoadingSkeleton";

const CareersPage = lazy(() => import("./careers.lazy"));

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — LMIA Career AI" },
      {
        name: "description",
        content:
          "Join the LMIA Career AI team. We're on a mission to bring transparency to Canadian employer hiring data for TFWP job seekers worldwide.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/careers" }],
  }),
  component: () => (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <CareersPage />
    </Suspense>
  ),
});
