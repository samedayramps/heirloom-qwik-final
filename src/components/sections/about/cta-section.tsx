import { component$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { LetsTalkButton } from '~/components/ui/lets-talk-button';
import Texture from '~/assets/images/18-texture.webp?jsx';
import { CTA_CONTENT } from '~/constants/about-page/cta';

// Types
interface CTAStyles {
  section: string;
  overlay: string;
  container: string;
  content: string;
  title: string;
  accent: string;
}

interface CTASectionProps {
  onTalkClick$: PropFunction<() => void>;
}

// Styles
const styles: CTAStyles = {
  section: "relative bg-[#315141] w-full py-24 overflow-hidden",
  overlay: "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700",
  container: "container relative z-10",
  content: "max-w-3xl mx-auto text-center",
  title: "font-playfair text-3xl md:text-4xl text-white mb-8",
  accent: "font-ephesis"
} as const;

export const CtaSection = component$<CTASectionProps>(({ onTalkClick$ }) => {
  return (
    <section class={styles.section}>
      <Texture 
        class={styles.overlay}
        aria-hidden="true"
      />
      <div class={styles.container}>
        <div class={styles.content}>
          <h2 class={styles.title}>
            {CTA_CONTENT.title.main}{' '}
            <span class={styles.accent}>{CTA_CONTENT.title.accent}</span>
            {CTA_CONTENT.title.end}
          </h2>
          <LetsTalkButton onTalkClick$={onTalkClick$} />
        </div>
      </div>
    </section>
  );
}); 