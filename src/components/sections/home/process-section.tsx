import { component$ } from '@builder.io/qwik';
import { Stepper } from '../../stepper/stepper';
import texture from '~/assets/images/9-texture.webp'; // Using existing texture

// Static content
const CONTENT = {
  title: {
    main: "Your",
    accent: "experience",
    end: "with us"
  },
  subtitle: "From our first hello to the moment you receive your heirloom film, we're here to make everything easy and enjoyable.",
  steps: [
    {
      number: 1,
      title: 'Initial Call',
      description: "We'll have a friendly chat about your wedding vision and answer your questions. This helps us both decide if we're the perfect match for your special day."
    },
    {
      number: 2,
      title: 'Custom Plan',
      description: "Before the big day, we'll meet to get to know you, your family, and your wedding details. This ensures we capture your unique story in the most authentic way."
    },
    {
      number: 3,
      title: 'Wedding Day',
      description: "On your wedding day, we'll be there from start to finish. We'll capture all the special moments discreetly, allowing you to fully enjoy your celebration."
    },
    {
      number: 4,
      title: 'Film Delivery',
      description: "Within 90 days, you'll get your wedding film. Gather your loved ones to relive the magic – it's not just a video, but a family heirloom."
    }
  ]
} as const;

// Background styles consistent with other sections
const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

export const ProcessSection = component$(() => {
  // Convert readonly array to mutable array for the Stepper component
  const steps = [...CONTENT.steps];

  return (
    <section class="relative bg-[#faf9f6] w-full py-16 overflow-hidden">
      {/* Background texture */}
      <div 
        class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
        style={BACKGROUND_STYLES}
        aria-hidden="true"
      />
      
      <div class="container relative z-10">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-playfair text-3xl md:text-4xl text-gray-800 mb-4 text-center">
            {CONTENT.title.main}{' '}
            <span class="font-ephesis">{CONTENT.title.accent}</span>{' '}
            {CONTENT.title.end}
          </h2>
          <p class="text-center font-opensans text-gray-600 mb-12 max-w-3xl mx-auto">
            {CONTENT.subtitle}
          </p>
          
          <Stepper steps={steps} />
        </div>
      </div>
    </section>
  );
});
