import { component$ } from "@builder.io/qwik";
import whitePaintBlock from '~/assets/images/white-paint-block.webp';
import texture from '~/assets/images/22-texture.webp';

const CONTENT = {
  title: {
    main: "HEIRLOOM is",
    accent: "different"
  },
  features: [
    {
      title: "The Full Story",
      content: "This isn't a quick highlight video—it's the complete story of your day. Get comfortable, pour some wine, and relive every moment. Our films typically run 30 minutes."
    },
    {
      title: "Unlimited Hours",
      content: "We film your entire day—from the wedding party getting ready until your sparkler exit. No hourly limits. No watching the clock. Just enjoy your wedding day."
    },
    {
      title: "All Your People",
      content: "Your wedding film includes everyone you love. We capture real moments and natural conversations with family and friends throughout your day. Because they're part of your story."
    }
  ]
} as const;

const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

const CARD_STYLES = {
  backgroundImage: `url(${whitePaintBlock})`,
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const;

const FeatureCard = component$((props: { title: string; content: string }) => (
  <div class="w-full h-auto rounded-lg relative" style={CARD_STYLES}>
    <div class="p-6 flex flex-col">
      <h3 class="font-playfair text-xl mb-4 text-center">{props.title}</h3>
      <p class="font-opensans text-sm text-justify leading-relaxed">{props.content}</p>
    </div>
  </div>
));

export const FeaturesSection = component$(() => {
  return (
    <section class="relative bg-[#52453A] w-full py-16 overflow-hidden">
      <div 
        class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 z-0"
        style={BACKGROUND_STYLES}
        aria-hidden="true"
      />
      <div class="container relative z-10">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-playfair text-3xl md:text-4xl text-white mb-8 text-center">
            {CONTENT.title.main}{' '}
            <span class="font-ephesis">{CONTENT.title.accent}</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONTENT.features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
