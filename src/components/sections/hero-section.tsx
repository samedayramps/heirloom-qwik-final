import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

// Static content can be moved outside to prevent recreation
const CONTENT = {
  heading: "Your wedding day, remembered for",
  accentText: "generations",
  description: "30+ Minute Wedding Films — All Day Coverage Included",
  ctaText: "Watch Films",
  ctaLink: "/films"
} as const;

export const HeroSection = component$(() => {
  return (
    <section class="relative w-full py-16 overflow-hidden">
      <div class="container relative z-10">
        <div class="max-w-6xl mx-auto text-center">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-2">
            {CONTENT.heading}{' '}
            <span class="font-ephesis">{CONTENT.accentText}</span>
          </h1>
          
          <p class="font-opensans text-base md:text-lg text-gray-600 mb-6">
            {CONTENT.description}
          </p>
          
          <Link 
            href={CONTENT.ctaLink} 
            class="inline-block bg-[#2d2d2d] text-white font-opensans font-light py-2 px-6 rounded-full text-sm uppercase tracking-wider hover:bg-gray-800 transition duration-300"
            prefetch
          >
            {CONTENT.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
});
