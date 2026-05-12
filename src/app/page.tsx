import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { InteractivePreview } from "@/components/sections/interactive-preview";
import { WhoItsFor } from "@/components/sections/who-its-for";
import { Waitlist } from "@/components/sections/waitlist";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <InteractivePreview />
      <WhoItsFor />
      <Waitlist />
    </>
  );
}
