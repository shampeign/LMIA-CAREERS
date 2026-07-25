import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/subscription/success")({
  head: () => ({
    meta: [
      { title: "Payment Successful — LMIA Career AI" },
      {
        name: "description",
        content: "Your payment was successful. Your plan is being activated.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/subscription/success" }],
  }),
  component: SubscriptionSuccess,
});

function SubscriptionSuccess() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100dvh-73px)] items-center justify-center bg-[#0B0E14] px-6 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#16A34A]/10">
            <svg
              className="h-10 w-10 text-[#16A34A]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-[36px] font-bold tracking-[-0.03em] text-white">
            Payment Successful! 🎉
          </h1>

          <p className="mt-4 text-[16px] leading-relaxed text-[#9CA3AF]">
            Your Professional/Premium plan is being activated. You'll have full
            access shortly.
          </p>

          <div className="mt-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Return to Dashboard
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
