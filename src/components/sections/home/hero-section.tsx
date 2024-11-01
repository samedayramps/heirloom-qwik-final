import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HERO_CONTENT } from "~/constants/hero";
import HeroImage from '~/assets/images/textured-wedding-photo3.webp?jsx';

// Types
interface HeroStyles {
  section: string;
  container: string;
  content: string;
  heading: string;
  accent: string;
  description: string;
  link: string;
  grid: string;
  imageWrapper: string;
  image: string;
  textContent: string;
  divider: string;
}

// Styles optimized for above-the-fold content
const styles: HeroStyles = {
  section: "relative w-full py-6 md:py-4 overflow-hidden bg-[#faf9f6]",
  container: "container relative z-10",
  grid: "grid md:grid-cols-2 gap-8 items-center",
  textContent: "max-w-xl mx-auto md:mx-0 text-center md:text-left",
  content: "max-w-xl",
  heading: "font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-8 leading-[1.2]",
  accent: "font-ephesis leading-[0.5] inline-block",
  description: "font-opensans text-base md:text-lg text-gray-600 mb-8",
  link: "inline-block font-opensans text-gray-700 border border-gray-700 rounded-full px-8 py-3 hover:bg-[#2d2d2d] hover:text-white transition-colors duration-300",
  imageWrapper: "relative h-full aspect-[4/3] md:aspect-[4/5] order-first md:order-last",
  image: "w-full h-full object-contain",
  divider: "w-24 h-px bg-[#d5c6ad] mb-8 mx-auto md:mx-0"
} as const;

export const HeroSection = component$(() => {
  return (
    <section class={styles.section}>
      <div class={styles.container}>
        <div class={styles.grid}>
          <div class={styles.textContent}>
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

          <div class={styles.imageWrapper}>
            <HeroImage
              class={styles.image}
              alt="Elegant Wedding Photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
