import { component$ } from '@builder.io/qwik';
// Import the image and use relative path from assets
import textureImage from '~/assets/images/16-texture-square.webp';

// Separate the text content for better maintainability
const CONTENT = {
  title: {
    main: "Our",
    accent: "unique",
    end: "approach"
  },
  paragraphs: [
    "At HEIRLOOM Wedding Films, we craft cinematic stories that you'll cherish for a lifetime and pass down through generations. Whether it's a traditional ceremony close to home or an exotic destination elopement, we're here to capture your unique love story in full.",
    "We take the time to get to know you, so your film truly reflects who you are. As passionate storytellers, we're constantly honing our craft to match the depth of your love. We love working with couples who are excited about preserving their memories as much as we are about capturing them."
  ]
} as const;

// Extract background styles to reduce inline styles
const BACKGROUND_STYLES = {
  backgroundImage: `url(${textureImage})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

export const AboutSection = component$(() => {
  return (
    <section class="relative bg-[#d5c6ad] w-full py-16 overflow-hidden">
      {/* Background texture */}
      <div 
        class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
        style={BACKGROUND_STYLES}
        aria-hidden="true"
      />

      {/* Content container */}
      <div class="container relative z-10">
        <div class="max-w-6xl mx-auto">
          {/* Title */}
          <h2 class="font-playfair text-3xl md:text-4xl text-gray-800 mb-6 text-center">
            {CONTENT.title.main}{' '}
            <span class="font-ephesis">{CONTENT.title.accent}</span>{' '}
            {CONTENT.title.end}
          </h2>

          {/* Text content */}
          <div class="font-opensans text-gray-700 space-y-4">
            {CONTENT.paragraphs.map((paragraph, index) => (
              <p key={index} class="leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
