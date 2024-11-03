import { component$ } from "@builder.io/qwik";
import WhitePaintBlock from '~/assets/images/white-paint-block.webp?jsx';
import Texture from '~/assets/images/22-texture.webp?jsx';
import { FEATURES_CONTENT } from '~/constants/features';

// Move styles to separate constant for consistency
const styles = {
  section: [
    "relative bg-[#52453A] w-full py-16 overflow-hidden"
  ].join(" "),
  background: [
    "absolute top-0 left-0 w-full opacity-30",
    "mix-blend-overlay pointer-events-none"
  ].join(" "),
  container: "container relative z-10",
  content: "max-w-6xl mx-auto",
  title: [
    "font-playfair text-3xl md:text-4xl text-white",
    "mb-6 text-center"
  ].join(" "),
  intro: "font-opensans text-white leading-relaxed md:text-justify",
  card: {
    wrapper: [
      "w-full max-w-2xl mx-auto mt-12 rounded-lg relative"
    ].join(" "),
    content: "p-3 md:p-8 relative z-10",
    list: [
      "font-opensans space-y-4 max-w-xl mx-auto",
      "flex flex-col items-center"
    ].join(" "),
    item: {
      wrapper: "w-full group",
      button: [
        "w-full text-left px-4 py-2 rounded-lg",
        "transition-colors duration-300"
      ].join(" "),
      title: [
        "font-opensans text-base text-[#52453A]",
        "transition-colors duration-300 flex items-center gap-2"
      ].join(" "),
      description: "font-opensans text-base text-[#52453A]/70 pl-6",
      expanded: [
        "grid grid-rows-[0fr] group-hover:grid-rows-[1fr]",
        "transition-all duration-300 ease-in-out"
      ].join(" ")
    },
    header: {
      wrapper: "text-center mb-8",
      title: [
        "font-playfair text-2xl text-[#52453A] relative",
        "inline-block after:content-[''] after:absolute",
        "after:left-0 after:right-0 after:-bottom-2",
        "after:h-[2px] after:bg-[#52453A]/30"
      ].join(" ")
    }
  }
} as const;

export const FeaturesSection = component$(() => {
  return (
    <section class={styles.section}>
      <div class={styles.background}>
        <Texture 
          class="w-full h-[1000px] object-cover object-top"
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div class={styles.container}>
        <div class={styles.content}>
          <h2 class={styles.title}>
            {FEATURES_CONTENT.title.main}{' '}
            <span class="font-ephesis">{FEATURES_CONTENT.title.accent}</span>
          </h2>
          <p class={styles.intro}>{FEATURES_CONTENT.intro}</p>
          
          {/* Features Card */}
          <div class={styles.card.wrapper}>
            <WhitePaintBlock 
              class="absolute inset-0 w-full h-full object-fill rounded-lg"
              aria-hidden="true"
              loading="lazy"
            />
            <div class={styles.card.content}>
              <div class={styles.card.header.wrapper}>
                <h3 class={styles.card.header.title}>
                  {FEATURES_CONTENT.card.title}
                </h3>
              </div>
              <ul class={styles.card.list}>
                {FEATURES_CONTENT.features.map((feature) => (
                  <li key={feature.title} class={styles.card.item.wrapper}>
                    <button class={styles.card.item.button}>
                      <h3 class={styles.card.item.title}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 shrink-0"
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fill-rule="evenodd" 
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                            clip-rule="evenodd" 
                          />
                        </svg>
                        {feature.title}
                      </h3>
                      <div class={styles.card.item.expanded}>
                        <div class="overflow-hidden">
                          <p class={styles.card.item.description}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
