import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLoadingSkeleton } from "~/components/PageLoadingSkeleton";
import { getProfile } from "~/server/profile";
import { getJobMatches, type JobMatch } from "~/server/matching";
import { getSavedJobs } from "~/server/saved-jobs";

const DashboardPage = lazy(() => import("./dashboard.lazy"));

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LMIA Career AI" },
      {
        name: "description",
        content:
          "Your personal LMIA Career AI dashboard. View your profile, job matches, saved employers, and application tracking — all in one place.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/dashboard" }],
  }),
  component: () => (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <DashboardPage />
    </Suspense>
  ),
  loader: async () => {
    try {
      const profile = await getProfile();
      let matches: JobMatch[] = [];
      let savedJobIds: string[] = [];
      if (profile) { try { matches = await getJobMatches(); } catch {} }
      try { savedJobIds = await getSavedJobs(); } catch {}
      return { profile, matches, savedJobIds };
    } catch { return { profile: null, matches: [], savedJobIds: [] as string[] }; }
  },
});
