import { component$ } from '@builder.io/qwik';
import { Stepper } from '~/components/stepper/stepper';
import texture from '~/assets/images/9-texture.webp?jsx';
import { PROCESS_CONTENT } from '~/constants/process';

// Types
interface ProcessStyles {
  section: string;
  overlay: string;
  container: string;
  content: string;
  title: string;
  subtitle: string;
}

// Styles
const styles: ProcessStyles = {
  section: "relative bg-[#faf9f6] w-full py-16 overflow-hidden",
  overlay: "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700",
  container: "container relative z-10",
  content: "max-w-6xl mx-auto",
  title: "font-playfair text-3xl md:text-4xl text-gray-800 mb-6 text-center",
  subtitle: "font-opensans text-gray-600 leading-relaxed md:text-justify",
} as const;

export const ProcessSection = component$(() => {
  const steps = [...PROCESS_CONTENT.steps];

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
          
          <div class="mt-12">
            <Stepper steps={steps} />
          </div>
        </div>
      </div>
    </section>
  );
});
