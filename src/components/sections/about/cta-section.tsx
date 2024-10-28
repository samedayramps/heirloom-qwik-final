import { component$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { LetsTalkButton } from '~/components/ui/lets-talk-button';
import textureImage from '~/assets/images/18-texture.webp';

interface CTASectionProps {
  onTalkClick$: PropFunction<() => void>;
}

const CONTENT = {
  title: {
    main: "Want a wedding film that lasts",
    accent: "generations",
    end: "?"
  }
} as const;

const BACKGROUND_STYLES = {
  backgroundImage: `url(${textureImage})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

export const CtaSection = component$<CTASectionProps>(({ onTalkClick$ }) => {
  return (
    <section class="relative bg-[#315141] w-full py-24 overflow-hidden">
      <div 
        class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
        style={BACKGROUND_STYLES}
        aria-hidden="true"
      />
      <div class="container relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="font-playfair text-3xl md:text-4xl text-white mb-8">
            {CONTENT.title.main}{' '}
            <span class="font-ephesis">{CONTENT.title.accent}</span>
            {CONTENT.title.end}
          </h2>
          <LetsTalkButton onTalkClick$={onTalkClick$} />
        </div>
      </div>
    </section>
  );
}); 