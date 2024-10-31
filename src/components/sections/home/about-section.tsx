import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Texture from '~/assets/images/16-texture-square.webp?jsx';
import { ABOUT_CONTENT } from '~/constants/about';

// Types
interface AboutStyles {
  section: string;
  overlay: string;
  container: string;
  content: string;
  title: string;
  accent: string;
  textContainer: string;
  paragraph: string;
  link: string;
  linkWrapper: string;
}

// Styles
const styles: AboutStyles = {
  section: "relative bg-[#d5c6ad] w-full py-16 overflow-hidden",
  overlay: "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700",
  container: "container relative z-10",
  content: "max-w-6xl mx-auto",
  title: "font-playfair text-3xl md:text-4xl text-gray-800 mb-6 text-center",
  accent: "font-ephesis",
  textContainer: "font-opensans text-gray-700 space-y-4",
  paragraph: "leading-relaxed md:text-justify",
  linkWrapper: "mt-6",
  link: "font-opensans text-gray-700 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#2d2d2d] hover:after:h-[2px] after:transition-all after:rounded-full duration-300"
} as const;

export const AboutSection = component$(() => {
  return (
    <section class={styles.section}>
      <div class="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none">
        <Texture 
          class="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      <div class={styles.container}>
        <div class={styles.content}>
          <h2 class={styles.title}>
            {ABOUT_CONTENT.title.main}{' '}
            <span class={styles.accent}>{ABOUT_CONTENT.title.accent} </span>{' '}
            {ABOUT_CONTENT.title.end}
          </h2>

          <div class={styles.textContainer}>
            {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
              <p key={index} class={styles.paragraph}>{paragraph}</p>
            ))}
          </div>

          <div class={styles.linkWrapper}>
            <Link href="/about" class={styles.link}>
              {ABOUT_CONTENT.linkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});
