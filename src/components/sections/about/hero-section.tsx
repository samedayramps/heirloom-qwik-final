import { component$ } from '@builder.io/qwik';
import { ABOUT_HERO_CONTENT } from '~/constants/about-page/hero';
import HeroImage from '~/assets/images/ty-walls-black-and-white2.webp?jsx';

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
  grid: string;
  imageWrapper: string;
  image: string;
}

// Styles optimized for above-the-fold content
const styles: HeroStyles = {
  section: "relative bg-[#faf9f6] w-full py-12 md:py-16 overflow-hidden",
  container: "container relative z-10",
  grid: "grid md:grid-cols-2 gap-8 items-center",
  content: "max-w-xl",
  title: "font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-8",
  divider: "w-24 h-px bg-[#d5c6ad] mb-12",
  textContainer: "max-w-xl",
  intro: "font-opensans text-gray-700 leading-relaxed mb-8 text-left",
  list: "font-opensans text-gray-700 leading-relaxed space-y-4",
  listItem: "flex items-start",
  bullet: "mr-3 text-xl",
  point: "italic",
  imageWrapper: "relative h-full aspect-[4/3] md:aspect-[4/5]",
  image: "w-full h-full object-contain"
} as const;

export const HeroSection = component$(() => {
  return (
    <section class={styles.section}>
      <div class={styles.container}>
        <div class={styles.grid}>
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