import { component$, $, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import { createLeadFormAction } from '~/lib/actions/lead';
import { LeadForm } from '~/components/leadForm/leadForm';
import { Toast } from '~/components/ui/toast';
import { VideoHeroSection } from "~/components/sections/home/video-hero-section";

// Define metadata for better SEO
const META = {
  title: "HEIRLOOM Wedding Films - Cinematic Wedding Videography",
  description: "Crafting cinematic wedding films that capture your unique love story. Full-day coverage, 30+ minute films, and a personalized experience.",
} as const;

// Re-export the action
export const useLeadFormAction = createLeadFormAction();

export default component$(() => {
  const showForm = useSignal(false);
  const showToast = useSignal(false);

  // Memoize event handler
  const handleLeadFormToggle = $(() => {
    const event = new CustomEvent('toggleLeadForm');
    window.dispatchEvent(event);
  });

  return (
    <main class="w-full relative">
      {/* Video Hero Section */}
      <VideoHeroSection />

      {/* Lazy load below-the-fold content */}
      <div data-component="about">
        {import("~/components/sections/home/about-section").then((mod) => (
          <mod.AboutSection />
        ))}
      </div>

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
            onTalkClick$={handleLeadFormToggle}
          />
        ))}
      </div>

      {showForm.value && (
        <LeadForm
          onClose$={() => showForm.value = false}
          onSuccess$={() => showToast.value = true}
        />
      )}

      {showToast.value && (
        <Toast
          duration={3000}
          onClose$={() => showToast.value = false}
        />
      )}
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
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    },
    {
      property: "og:title",
      content: META.title
    },
    {
      property: "og:description", 
      content: META.description
    }
  ],
};

