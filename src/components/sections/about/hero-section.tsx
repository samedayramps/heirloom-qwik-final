import { component$ } from '@builder.io/qwik';

const CONTENT = {
  title: "You should want to watch your wedding film every anniversary.",
  intro: "After 8 years of filming weddings, I realized a simple truth: while wedding films make great social posts, they should be created for something more enduring:",
  points: [
    "Something you'll want to watch every anniversary",
    "Gathering with love ones to watch it together",
    "An heirloom your future generations will treasure"
  ]
} as const;

export const HeroSection = component$(() => {
  return (
    <section class="relative bg-[#faf9f6] w-full py-24 overflow-hidden">
      <div class="container relative z-10">
        <div class="max-w-4xl mx-auto">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-6xl text-gray-800 mb-8 text-center">
            {CONTENT.title}
          </h1>
          
          {/* Decorative divider */}
          <div class="w-24 h-px bg-[#d5c6ad] mx-auto mb-12"></div>
          
          {/* Added intro text and points */}
          <div class="max-w-3xl mx-auto">
            <p class="font-opensans text-gray-700 leading-relaxed mb-8 text-left">
              {CONTENT.intro}
            </p>
            <ul class="font-opensans text-gray-700 leading-relaxed space-y-4 max-w-2xl">
              {CONTENT.points.map((point) => (
                <li key={point} class="flex items-start">
                  <span class="mr-3 text-xl">•</span>
                  <span class="italic">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}); 