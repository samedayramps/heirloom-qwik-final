import { component$ } from '@builder.io/qwik';
import Texture from '~/assets/images/16-texture-square.webp?jsx';
import { MISSION_CONTENT } from '~/constants/about-page/mission';

// Types
interface MissionStyles {
  section: string;
  overlay: string;
  container: string;
  content: string;
  paragraph: string;
  signature: string;
}

// Styles
const styles: MissionStyles = {
  section: "relative bg-[#d5c6ad] w-full py-16 overflow-hidden",
  overlay: "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700",
  container: "container relative z-10",
  content: "max-w-3xl mx-auto",
  paragraph: "font-opensans text-gray-700 leading-relaxed mb-8",
  signature: "font-opensans text-gray-700 leading-relaxed text-right"
} as const;

export const MissionSection = component$(() => {
  return (
    <section class={styles.section}>
      <Texture 
        class={styles.overlay}
        aria-hidden="true"
      />
      <div class={styles.container}>
        <div class={styles.content}>
          <p class={styles.paragraph}>{MISSION_CONTENT.outro}</p>
          <p class={styles.paragraph}>{MISSION_CONTENT.details}</p>
          <p class={styles.paragraph}>{MISSION_CONTENT.approach}</p>
          <p class={styles.signature}>{MISSION_CONTENT.signature}</p>
        </div>
      </div>
    </section>
  );
}); 