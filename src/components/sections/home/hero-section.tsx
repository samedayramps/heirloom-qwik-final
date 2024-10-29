import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HERO_CONTENT } from "~/constants/hero";

// Types
interface HeroStyles {
  section: string;
  container: string;
  content: string;
  heading: string;
  accent: string;
  description: string;
  cta: string;
}

// Styles optimized for above-the-fold content
const styles: HeroStyles = {
  section: "relative w-full py-16 overflow-hidden",
  container: "container relative z-10",
  content: "max-w-6xl mx-auto text-center",
  heading: "font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-2",
  accent: "font-ephesis",
  description: "font-opensans text-base md:text-lg text-gray-600 mb-6",
  cta: "inline-block bg-[#2d2d2d] text-white font-opensans font-light py-2 px-6 rounded-full text-sm uppercase tracking-wider hover:bg-gray-800 transition duration-300"
} as const;

export const HeroSection = component$(() => {
  return (
    <section class={styles.section}>
      <div class={styles.container}>
        <div class={styles.content}>
          <h1 class={styles.heading}>
            {HERO_CONTENT.heading}{' '}
            <span class={styles.accent}>{HERO_CONTENT.accentText}</span>
          </h1>
          
          <p class={styles.description}>
            {HERO_CONTENT.description}
          </p>
          
          <Link 
            href={HERO_CONTENT.ctaLink} 
            class={styles.cta}
            prefetch
          >
            {HERO_CONTENT.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
});
