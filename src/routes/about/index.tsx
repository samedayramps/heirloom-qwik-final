import { component$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import texture from '~/assets/images/16-texture-square.webp';
import { LetsTalkButton } from "~/components/ui/lets-talk-button";

// Define metadata for better SEO
const META = {
  title: "About HEIRLOOM Wedding Films - Our Story & Approach",
  description: "Learn about our unique approach to wedding videography. We create cinematic films that capture authentic moments and emotions, turning them into cherished family heirlooms.",
} as const;

// Static content
const CONTENT = {
  hero: {
    title: "You should want to watch your wedding film every anniversary."
  },
  mission: {
    intro: "After 8 years of filming weddings, I realized a simple truth: while wedding films make great social posts, they should be created for something more enduring:",
    points: [
      "Something you'll want to watch every anniversary",
      "Gathering with love ones to watch it together",
      "An heirloom your future generations will treasure"
    ],
    outro: "In 2024, I created HEIRLOOM with one focus: wedding films that become more precious over time. The kind of film that shows you something new each time you watch it—whether that's next month, next year, or decades from now.",
    details: "This approach goes beyond just capturing beautiful shots. We focus on the moments you'll want to relive: the tears in your dad's eyes, the way your partner looked at you during first dance, your grandmother's smile as she shares her marriage advice. These are the details that make your film worth rewatching for generations."
  },
  approach: {
    content: "In order to create these films, we limit our weddings each year and take time to get to know each couple.\n\nWe love meeting for drinks or jumping on a video call before your wedding to hear your story. We want to know how you met, what makes you laugh, and all about the special people celebrating with you. This helps us capture the moments that matter on your wedding day—not just between you two, but with the family and friends who mean the most."
  },
  cta: {
    title: {
      main: "Want a wedding film that lasts",
      accent: "generations",
      end: "?"
    },
    buttonText: "LET'S TALK"
  }
} as const;

// Background styles
const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

export default component$(() => {
  // Add handler for opening lead form
  const handleTalkClick = $(() => {
    const event = new CustomEvent('toggleLeadForm');
    window.dispatchEvent(event);
  });

  return (
    <main class="w-full relative">
      {/* Hero Section */}
      <section class="relative bg-[#faf9f6] w-full py-24 overflow-hidden">
        <div class="container relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="font-playfair text-3xl md:text-4xl lg:text-6xl text-gray-800">
              {CONTENT.hero.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section class="relative bg-[#d5c6ad] w-full py-16 overflow-hidden">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
          style={BACKGROUND_STYLES}
          aria-hidden="true"
        />
        <div class="container relative z-10">
          <div class="max-w-3xl mx-auto">
            <p class="font-opensans text-gray-700 leading-relaxed mb-8 text-left">
              {CONTENT.mission.intro}
            </p>
            <ul class="font-opensans text-gray-700 leading-relaxed max-w-2xl space-y-4 mb-12">
              {CONTENT.mission.points.map((point) => (
                <li key={point} class="flex items-start">
                  <span class="mr-3 text-xl">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p class="font-opensans text-gray-700 leading-relaxed max-w-2xl mb-8">
              {CONTENT.mission.outro}
            </p>
            <p class="font-opensans text-gray-700 leading-relaxed max-w-2xl">
              {CONTENT.mission.details}
            </p>
          </div>
        </div>
      </section>

      {/* Approach Section - now with light background */}
      <section class="relative bg-[#faf9f6] w-full py-16 overflow-hidden">
        <div class="container relative z-10">
          <div class="max-w-3xl mx-auto">
            <div class="font-opensans text-gray-700 leading-relaxed space-y-6 text-left">
              {CONTENT.approach.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - now with dark green background */}
      <section class="relative bg-[#315141] w-full py-24 overflow-hidden">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
          style={BACKGROUND_STYLES}
          aria-hidden="true"
        />
        <div class="container relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="font-playfair text-3xl md:text-4xl text-white mb-8">
              {CONTENT.cta.title.main}{' '}
              <span class="font-ephesis">{CONTENT.cta.title.accent}</span>
              {CONTENT.cta.title.end}
            </h2>
            <LetsTalkButton 
              onTalkClick$={handleTalkClick}
            />
          </div>
        </div>
      </section>
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
