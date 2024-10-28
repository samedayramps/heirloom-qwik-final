import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import texture from '~/assets/images/16-texture-square.webp';

// Define metadata for better SEO
const META = {
  title: "About HEIRLOOM Wedding Films - Our Story & Approach",
  description: "Learn about our unique approach to wedding videography. We create cinematic films that capture authentic moments and emotions, turning them into cherished family heirlooms.",
} as const;

// Static content
const CONTENT = {
  hero: {
    title: {
      main: "Crafting",
      accent: "timeless",
      end: "memories"
    },
    subtitle: "Wedding films that tell your unique story"
  },
  mission: {
    title: "Our Mission",
    content: "At HEIRLOOM, we believe that your wedding film should be more than just a video—it should be a masterpiece that captures the essence of your love story, preserving it for generations to come. Our approach combines cinematic artistry with authentic storytelling, ensuring that every precious moment is captured with intention and care."
  },
  values: {
    title: "Our Values",
    items: [
      {
        title: "Authenticity",
        description: "We focus on genuine moments and real emotions, creating films that truly reflect who you are."
      },
      {
        title: "Artistry",
        description: "Every film is crafted with meticulous attention to detail, from composition to color grading."
      },
      {
        title: "Legacy",
        description: "We create films that will be cherished not just by you, but by your children and grandchildren."
      }
    ]
  },
  approach: {
    title: "Our Approach",
    content: "We take on a limited number of weddings each year to ensure we can give each couple the attention they deserve. This allows us to truly get to know you and understand your vision, resulting in a film that perfectly captures your unique story."
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
  return (
    <main class="w-full relative">
      {/* Hero Section */}
      <section class="relative bg-[#faf9f6] w-full py-24 overflow-hidden">
        <div class="container relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4">
              {CONTENT.hero.title.main}{' '}
              <span class="font-ephesis">{CONTENT.hero.title.accent}</span>{' '}
              {CONTENT.hero.title.end}
            </h1>
            <p class="font-opensans text-lg md:text-xl text-gray-600">
              {CONTENT.hero.subtitle}
            </p>
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
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="font-playfair text-3xl md:text-4xl text-gray-800 mb-6">
              {CONTENT.mission.title}
            </h2>
            <p class="font-opensans text-gray-700 leading-relaxed">
              {CONTENT.mission.content}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section class="relative bg-[#faf9f6] w-full py-16 overflow-hidden">
        <div class="container relative z-10">
          <div class="max-w-6xl mx-auto">
            <h2 class="font-playfair text-3xl md:text-4xl text-gray-800 mb-12 text-center">
              {CONTENT.values.title}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CONTENT.values.items.map((item) => (
                <div key={item.title} class="text-center">
                  <h3 class="font-playfair text-2xl text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p class="font-opensans text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section class="relative bg-[#315141] w-full py-16 overflow-hidden">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
          style={BACKGROUND_STYLES}
          aria-hidden="true"
        />
        <div class="container relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="font-playfair text-3xl md:text-4xl text-white mb-6">
              {CONTENT.approach.title}
            </h2>
            <p class="font-opensans text-gray-100 leading-relaxed">
              {CONTENT.approach.content}
            </p>
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
