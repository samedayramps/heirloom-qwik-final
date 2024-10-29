import { component$ } from '@builder.io/qwik';
import { ABOUT_HERO_CONTENT } from '~/constants/about-page/hero';

// Types
interface HeroStyles {
  section: string;
  container: string;
  content: string;
  title: string;
  divider: string;
  textContainer: string;
  intro: string;
  list: string;
  listItem: string;
  bullet: string;
  point: string;
}

// Styles optimized for above-the-fold content
const styles: HeroStyles = {
  section: "relative bg-[#faf9f6] w-full py-24 overflow-hidden",
  container: "container relative z-10",
  content: "max-w-4xl mx-auto",
  title: "font-playfair text-3xl md:text-4xl lg:text-6xl text-gray-800 mb-8 text-center",
  divider: "w-24 h-px bg-[#d5c6ad] mx-auto mb-12",
  textContainer: "max-w-3xl mx-auto",
  intro: "font-opensans text-gray-700 leading-relaxed mb-8 text-left",
  list: "font-opensans text-gray-700 leading-relaxed space-y-4 max-w-2xl",
  listItem: "flex items-start",
  bullet: "mr-3 text-xl",
  point: "italic"
} as const;

export const HeroSection = component$(() => {
  return (
    <section class={styles.section}>
      <div class={styles.container}>
        <div class={styles.content}>
          <h1 class={styles.title}>
            {ABOUT_HERO_CONTENT.title}
          </h1>
          
          <div class={styles.divider} aria-hidden="true" />
          
          <div class={styles.textContainer}>
            <p class={styles.intro}>
              {ABOUT_HERO_CONTENT.intro}
            </p>
            <ul class={styles.list}>
              {ABOUT_HERO_CONTENT.points.map((point) => (
                <li key={point} class={styles.listItem}>
                  <span class={styles.bullet}>•</span>
                  <span class={styles.point}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}); 