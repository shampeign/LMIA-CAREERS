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
