import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { createLeadFormAction } from '~/lib/actions/lead';

// Import components that are needed for initial render
import { HeroSection } from "~/components/sections/home/hero-section";
import { AboutSection } from "~/components/sections/home/about-section";

// Define metadata for better SEO
const META = {
  title: "HEIRLOOM Wedding Films - Cinematic Wedding Videography",
  description: "Crafting cinematic wedding films that capture your unique love story. Full-day coverage, 30+ minute films, and a personalized experience.",
} as const;

// Re-export the action
export const useLeadFormAction = createLeadFormAction();

export default component$(() => {
  return (
    <main class="w-full relative">
      {/* Immediately render above-the-fold content */}
      <HeroSection />
      <AboutSection />

      {/* Lazy load components below the fold using Qwik's built-in lazy loading */}
      <div data-component="features">
        {import("~/components/sections/home/features-section").then((mod) => (
          <mod.FeaturesSection />
        ))}
      </div>

      <div data-component="process">
        {import("~/components/sections/home/process-section").then((mod) => (
          <mod.ProcessSection />
        ))}
      </div>

      <div data-component="faq">
        {import("~/components/sections/home/faq-section").then((mod) => (
          <mod.FAQSection 
            onTalkClick$={() => {
              const event = new CustomEvent('toggleLeadForm');
              window.dispatchEvent(event);
            }}
          />
        ))}
      </div>
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
