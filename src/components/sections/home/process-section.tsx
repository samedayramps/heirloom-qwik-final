import { component$ } from '@builder.io/qwik';
import { Stepper } from '~/components/stepper/stepper';
import texture from '~/assets/images/9-texture.webp?jsx';
import { PROCESS_CONTENT } from '~/constants/process';

// Move styles to separate constant for consistency
const styles = {
  section: [
    "relative bg-[#faf9f6] w-full py-16 overflow-hidden"
  ].join(" "),
  overlay: [
    "absolute inset-0 opacity-30 mix-blend-overlay",
    "pointer-events-none transition-opacity duration-700"
  ].join(" "),
  container: "container relative z-10",
  content: "max-w-6xl mx-auto",
  title: [
    "font-playfair text-3xl md:text-4xl text-gray-800",
    "mb-6 text-center"
  ].join(" "),
  subtitle: "font-opensans text-gray-600 leading-relaxed md:text-justify",
  stepperWrapper: "mt-12"
} as const;

export const ProcessSection = component$(() => {
  return (
    <section class={styles.section}>
      <div 
        class={styles.overlay}
        style={{
          backgroundImage: `url(${texture})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'repeat-y',
        }}
        aria-hidden="true"
      />
      
      <div class={styles.container}>
        <div class={styles.content}>
          <h2 class={styles.title}>
            {PROCESS_CONTENT.title.main}{' '}
            <span class="font-ephesis">{PROCESS_CONTENT.title.accent}</span>
          </h2>
          <p class={styles.subtitle}>
            {PROCESS_CONTENT.subtitle}
          </p>
          
          <div class={styles.stepperWrapper}>
            <Stepper steps={PROCESS_CONTENT.steps} />
          </div>
        </div>
      </div>
    </section>
  );
});
