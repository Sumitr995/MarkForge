import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { WhyMarkItDown } from "@/components/sections/why-markitdown";
import { Pipeline } from "@/components/sections/pipeline";
import { Showcase } from "@/components/sections/showcase";
// import { Testimonials } from "@/components/sections/testimonials"; // hidden for now — early readers, add later
import { FAQ } from "@/components/sections/faq";
// import { Pricing } from "@/components/sections/pricing"; // hidden for now — coming soon
import { Trust } from "@/components/sections/trust";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <WhyMarkItDown />
      <Pipeline />
      <Showcase />
      {/* <Testimonials /> */}
      <FAQ />
      {/* <Pricing /> */}
      <Trust />
      <CTA />
    </>
  );
}
