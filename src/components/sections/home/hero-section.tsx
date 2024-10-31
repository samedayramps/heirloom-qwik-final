import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HERO_CONTENT } from "~/constants/hero";
import HarlieGarretImage from '~/assets/images/harlie-and-garret-first-look.webp?jsx';

// Types
interface HeroStyles {
  section: string;
  container: string;
  content: string;
  heading: string;
  accent: string;
  description: string;
  cta: string;
  grid: string;
  imageWrapper: string;
  image: string;
  textContent: string;
  divider: string;
}

// Styles optimized for above-the-fold content
const styles: HeroStyles = {
  section: "relative w-full py-12 md:py-16 overflow-hidden bg-[#faf9f6]",
  container: "container relative z-10",
  grid: "grid md:grid-cols-2 gap-8 items-center",
  textContent: "max-w-xl mx-auto md:mx-0 text-center md:text-left",
  content: "max-w-xl",
  heading: "font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-4 leading-[1.2]",
  accent: "font-ephesis leading-[0.5] inline-block",
  description: "font-opensans text-base md:text-lg text-gray-600 mb-8",
  cta: "inline-block bg-[#2d2d2d] text-white font-opensans font-light py-2 px-6 rounded-full text-sm uppercase tracking-wider hover:bg-gray-800 transition duration-300",
  imageWrapper: "relative h-full aspect-[4/3] md:aspect-[4/5] order-first md:order-last",
  image: "w-full h-full object-cover rounded-lg shadow-lg",
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
              class={styles.cta}
              prefetch
            >
              {HERO_CONTENT.ctaText}
            </Link>
          </div>

          <div class={styles.imageWrapper}>
            <HarlieGarretImage
              class={styles.image}
              alt="Harlie and Garret First Look"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
