import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HERO_CONTENT } from "~/constants/hero";
import HeroFallback from "~/assets/images/harlie-garret-thumbnail.jpg?jsx";

// Move styles to separate file for better maintainability
const styles = {
  section: [
    "relative w-full py-2 md:py-4 overflow-hidden bg-[#faf9f6]"
  ].join(" "),
  container: "container relative z-10",
  content: "max-w-2xl mx-auto text-center",
  heading: [
    "font-playfair text-3xl md:text-4xl lg:text-5xl",
    "text-gray-800 mb-8 leading-[1.2]"
  ].join(" "),
  accent: "font-ephesis leading-[0.5] inline-block",
  description: "font-opensans text-base md:text-lg text-gray-600 mb-8",
  link: [
    "inline-block font-opensans text-gray-700 border border-gray-700",
    "rounded-full px-8 py-3 hover:bg-[#2d2d2d] hover:text-white",
    "transition-colors duration-300"
  ].join(" "),
  divider: "w-24 h-px bg-[#d5c6ad] mb-8 mx-auto",
  fallbackImage: "absolute inset-0 w-full h-full object-cover -z-10"
} as const;

export const HeroSection = component$(() => {
  return (
    <section class={styles.section}>
      <HeroFallback class={styles.fallbackImage} />
      
      <div class={styles.container}>
        <div class={styles.content}>
          <h1 class={styles.heading}>
            {HERO_CONTENT.heading}
            <span class={styles.accent}> {HERO_CONTENT.accentText}</span>
          </h1>
          
          <div class={styles.divider} aria-hidden="true" />
          
          <p class={styles.description}>
            {HERO_CONTENT.description}
          </p>
          
          <Link 
            href={HERO_CONTENT.ctaLink} 
            class={styles.link}
            prefetch
          >
            {HERO_CONTENT.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
});
