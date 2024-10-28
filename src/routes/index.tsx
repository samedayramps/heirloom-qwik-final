import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { createLeadFormAction } from '~/lib/actions/lead';

// Import section components
import { HeroSection } from "~/components/sections/hero-section";
import { AboutSection } from "~/components/sections/about-section";
import { FeaturesSection } from "~/components/sections/features-section";

// Re-export the action
export const useLeadFormAction = createLeadFormAction();

export default component$(() => {
  return (
    <>
      {/* Main container with proper spacing */}
      <main class="w-full relative">
        {/* Each section as a separate component */}
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
