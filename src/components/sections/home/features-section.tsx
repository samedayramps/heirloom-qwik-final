import { component$ } from "@builder.io/qwik";
import whitePaintBlock from '~/assets/images/white-paint-block.webp';
import texture from '~/assets/images/22-texture.webp';
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
  grid: "grid grid-cols-1 md:grid-cols-3 gap-8",
  card: {
    wrapper: "w-full h-auto rounded-lg relative",
    content: "p-6 flex flex-col",
    title: "font-playfair text-xl mb-4 text-center",
    text: "font-opensans text-sm text-justify leading-relaxed"
  }
} as const;

// Background configurations
const backgroundConfig = {
  texture: {
    backgroundImage: `url(${texture})`,
    backgroundSize: '100% auto',
    backgroundPosition: 'top center',
    backgroundRepeat: 'repeat-y',
  },
  card: {
    backgroundImage: `url(${whitePaintBlock})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
} as const;

// Feature Card Component
const FeatureCard = component$((props: FeatureCardProps) => (
  <div class={styles.card.wrapper} style={backgroundConfig.card}>
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
      <div 
        class={styles.overlay}
        style={backgroundConfig.texture}
        aria-hidden="true"
      />
      <div class={styles.container}>
        <div class={styles.content}>
          <h2 class={styles.title}>
            {FEATURES_CONTENT.title.main}{' '}
            <span class="font-ephesis">{FEATURES_CONTENT.title.accent}</span>
          </h2>
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
