import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { createLeadFormAction } from '~/lib/actions/lead';

// Import section components
import { HeroSection } from "~/components/sections/hero-section";
import { AboutSection } from "~/components/sections/about-section";
import { FeaturesSection } from "~/components/sections/features-section";
import { FAQSection } from "~/components/sections/faq-section";

// Re-export the action
export const useLeadFormAction = createLeadFormAction();

// Define metadata for better SEO
const META = {
  title: "HEIRLOOM Wedding Films - Cinematic Wedding Videography",
  description: "Crafting cinematic wedding films that capture your unique love story. Full-day coverage, 30+ minute films, and a personalized experience.",
} as const;

export default component$(() => {
  return (
    <main class="w-full relative">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <FAQSection />
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
