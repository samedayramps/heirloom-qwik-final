import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Texture from '~/assets/images/16-texture-square.webp?jsx';
import { ABOUT_CONTENT } from '~/constants/about';

// Move styles to separate constant for consistency
const styles = {
  section: [
    "relative bg-[#d5c6ad] w-full py-16 overflow-hidden"
  ].join(" "),
  container: "container relative z-10",
  content: "max-w-6xl mx-auto",
  title: [
    "font-playfair text-3xl md:text-4xl text-gray-800",
    "mb-6 text-center"
  ].join(" "),
  accent: "font-ephesis",
  textContainer: [
    "font-opensans text-gray-700 space-y-4"
  ].join(" "),
  paragraph: "leading-relaxed md:text-justify",
  linkWrapper: "mt-6",
  link: [
    "font-opensans text-gray-700 relative",
    "after:absolute after:bottom-[-4px] after:left-0",
    "after:h-[1px] after:w-full after:bg-[#2d2d2d]",
    "hover:after:h-[2px] after:transition-all",
    "after:rounded-full duration-300"
  ].join(" ")
} as const;

export const AboutSection = component$(() => {
  return (
    <section class={styles.section}>
      <div class="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none">
        <Texture 
          class="w-full h-full object-cover"
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div class={styles.container}>
        <div class={styles.content}>
          <h2 class={styles.title}>
            {ABOUT_CONTENT.title.main}{' '}
            <span class={styles.accent}>{ABOUT_CONTENT.title.accent}</span>{' '}
            {ABOUT_CONTENT.title.end}
          </h2>

          <div class={styles.textContainer}>
            {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
              <p key={index} class={styles.paragraph}>{paragraph}</p>
            ))}
          </div>

          <div class={styles.linkWrapper}>
            <Link 
              href="/about" 
              class={styles.link}
              prefetch
            >
              {ABOUT_CONTENT.linkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});
