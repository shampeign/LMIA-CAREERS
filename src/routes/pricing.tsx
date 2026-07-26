import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Pricing } from "~/components/Pricing";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — LMIA Career AI" },
      {
        name: "description",
        content:
          "Choose the right plan for your Canadian job search. Free employer directory access, Professional AI tools at CA$19/mo, or Premium with interview simulator at CA$39/mo.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <Navbar />
      <Pricing />
      <Footer />
    </>
  );
}
