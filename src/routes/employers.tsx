import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLoadingSkeleton } from "~/components/PageLoadingSkeleton";

const EmployerDirectory = lazy(() => import("./employers.lazy"));

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "LMIA Employer Directory — Browse Canadian Employers with TFWP History | LMIA Career AI" },
      {
        name: "description",
        content:
          "Browse Canadian employers with publicly documented TFWP hiring history. Search by province, industry, sponsorship score, and active positions. Free LMIA employer intelligence.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/employers" }],
  }),
  component: () => (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <EmployerDirectory />
    </Suspense>
  ),
});
