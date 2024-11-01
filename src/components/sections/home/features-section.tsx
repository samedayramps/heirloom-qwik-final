import { component$ } from "@builder.io/qwik";
import WhitePaintBlock from '~/assets/images/white-paint-block.webp?jsx';
import Texture from '~/assets/images/22-texture.webp?jsx';
import { FEATURES_CONTENT } from '~/constants/features';

// Types
interface FeatureCardProps {
  title: string;
  content: string;
}

interface FeatureStyles {
  section: string;
  overlay: string;
  container: string;
  content: string;
  title: string;
  intro: string;
  grid: string;
  card: {
    wrapper: string;
    content: string;
    title: string;
    text: string;
  };
}

// Styles
const styles: FeatureStyles = {
  section: "relative bg-[#52453A] w-full py-16 overflow-hidden",
  overlay: "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 z-0",
  container: "container relative z-10",
  content: "max-w-6xl mx-auto",
  title: "font-playfair text-3xl md:text-4xl text-white mb-8 text-center",
  intro: "font-opensans text-white md:text-justify max-w-3xl mx-auto mb-12 leading-relaxed px-4",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-8",
  card: {
    wrapper: "w-full h-full rounded-lg relative flex flex-col",
    content: "p-6 flex flex-col h-full relative z-10",
    title: "font-playfair text-xl mb-4 text-center",
    text: "font-opensans leading-relaxed md:text-justify flex-1"
  }
} as const;

// Feature Card Component
const FeatureCard = component$((props: FeatureCardProps) => (
  <div class={styles.card.wrapper}>
    <WhitePaintBlock 
      class="absolute inset-0 w-full h-full object-fill rounded-lg"
      aria-hidden="true"
    />
    <div class={styles.card.content}>
      <h3 class={styles.card.title}>{props.title}</h3>
      <p class={styles.card.text}>{props.content}</p>
    </div>
  </div>
));

// Main Features Section Component
export const FeaturesSection = component$(() => {
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
            {FEATURES_CONTENT.title.main}{' '}
            <span class="font-ephesis">{FEATURES_CONTENT.title.accent}</span>
          </h2>
          <p class={styles.intro}>{FEATURES_CONTENT.intro}</p>
          <div class={styles.grid}>
            {FEATURES_CONTENT.features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
