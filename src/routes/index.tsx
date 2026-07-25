import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components/Hero";
import { HowItWorks } from "~/components/HowItWorks";
import { FeaturedEmployers } from "~/components/FeaturedEmployers";
import { WaitlistCTA } from "~/components/WaitlistCTA";
import { Testimonials } from "~/components/Testimonials";
import { Pricing } from "~/components/Pricing";
import { FAQ } from "~/components/FAQ";
import { Footer } from "~/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "LMIA Career AI — Find Canadian Employers Who Are Hiring",
      },
      {
        name: "description",
        content:
          "Discover Canadian employers with TFWP hiring history. Browse 30+ employers, 62+ jobs, LMIA analytics, sponsorship scores, and AI-powered job matching.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lmiacareersai.com" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedEmployers />
      <WaitlistCTA />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
