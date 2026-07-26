import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageLoadingSkeleton } from "~/components/PageLoadingSkeleton";
import { getEmployerBySlug } from "~/server/employers";
import { getProfile } from "~/server/profile";

const EmployerProfile = lazy(() => import("./$slug.lazy"));

export const Route = createFileRoute("/employers/$slug")({
  loader: async ({ params }) => {
    const employer = await getEmployerBySlug(params.slug);
    if (!employer) throw notFound();

    let profile = null;
    try {
      profile = await getProfile();
    } catch {
      // Not signed in
    }
    if (!profile) {
      throw redirect({ to: "/sign-in" });
    }
    if (profile.plan === "free") {
      throw redirect({ to: "/pricing" });
    }

    const lmia = employer.lmia ?? null;
    return { employer, lmia, profile };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.employer.name} — LMIA Profile & Analytics | LMIA Career AI` },
      {
        name: "description",
        content: `${loaderData.employer.name} — LMIA employer profile with TFWP hiring history, occupations, wage data, approval trends, and active job listings. Based on publicly available Canadian government data.`,
      },
    ],
  }),
  component: () => (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <EmployerProfile />
    </Suspense>
  ),
});
