import { component$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HeroSection } from "~/components/sections/about/hero-section";
import { MissionSection } from "~/components/sections/about/mission-section";
import { CtaSection } from "~/components/sections/about/cta-section";

// Define metadata for better SEO
const META = {
  title: "About HEIRLOOM Wedding Films - Our Story and Approach",
  description: "Learn about our unique approach to wedding videography. We create cinematic films that capture authentic moments and emotions, turning them into cherished family heirlooms.",
} as const;

export default component$(() => {
  const handleTalkClick = $(() => {
    const event = new CustomEvent('toggleLeadForm');
    window.dispatchEvent(event);
  });

  return (
    <main class="w-full relative">
      <HeroSection />
      <MissionSection />
      <CtaSection onTalkClick$={handleTalkClick} />
    </main>
  );
});

export const head: DocumentHead = {
  title: META.title,
  meta: [
    {
      name: "description",
      content: META.description,
    },
  ],
};
