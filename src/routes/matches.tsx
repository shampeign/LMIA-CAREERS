import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLoadingSkeleton } from "~/components/PageLoadingSkeleton";
import { getJobMatches, type JobMatch } from "~/server/matching";
import { getProfile } from "~/server/profile";
import { getEmployers } from "~/server/employers";

const MatchesPage = lazy(() => import("./matches.lazy"));

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Your Job Matches — LMIA Career AI" },
      {
        name: "description",
        content:
          "View your AI-powered job matches from Canadian LMIA employers. Compare match scores, skill breakdowns, and find your best-fit opportunities.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/matches" }],
  }),
  component: () => (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <MatchesPage />
    </Suspense>
  ),
  loader: async () => {
    try {
      const profile = await getProfile();
      let matches: JobMatch[] = [];
      if (profile) {
        try { matches = await getJobMatches(); } catch {}
      }
      const employers = await getEmployers();
      return { profile, matches, employers };
    } catch {
      return { profile: null, matches: [], employers: [] };
    }
  },
});
