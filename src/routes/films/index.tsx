import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import texture from '~/assets/images/22-texture.webp';
import type { Film } from './content';
import { META, CONTENT } from './content';

// Background styles
const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

// Video Modal Component with lazy loading
const VideoModal = component$<{
  isOpen: boolean;
  videoUrl: string;
  onClose$: PropFunction<() => void>;
}>(({ isOpen, videoUrl, onClose$ }) => {
  const vimeoId = videoUrl.split('/').pop();
  const iframeLoaded = useSignal(false);

  // Using useTask$ instead of useVisibleTask$ for better performance
  useTask$(({ track }) => {
    track(() => isOpen);
    if (isOpen) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        iframeLoaded.value = true;
      }, 300);
    } else {
      iframeLoaded.value = false;
    }
  });

  if (!isOpen) return null;

  return (
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      onClick$={onClose$}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button 
        onClick$={onClose$}
        class="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
        aria-label="Close modal"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      {/* Video container with loading state */}
      <div class="w-full max-w-7xl aspect-video px-4" onClick$={(e) => e.stopPropagation()}>
        {iframeLoaded.value ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
            class="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullscreen
            loading="lazy"
          />
        ) : (
          <div class="w-full h-full bg-black/50 animate-pulse flex items-center justify-center">
            <div class="loading-spinner" />
          </div>
        )}
      </div>
    </div>
  );
});

// Film Card Component
const FilmCard = component$<{
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  description: string;
  onPlay$: PropFunction<() => void>;
}>(({ title, location, date, thumbnail, description, onPlay$ }) => {
  return (
    <button 
      onClick$={onPlay$}
      class="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl text-left w-full"
    >
      <div class="aspect-video overflow-hidden">
        <img 
          src={thumbnail}
          alt={`${title} wedding film thumbnail`}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover transform transition duration-500 group-hover:scale-105"
        />
      </div>
      
      <div class="p-6">
        <h3 class="font-playfair text-xl text-gray-800 mb-2">{title}</h3>
        <div class="font-opensans text-sm text-gray-600 space-y-1">
          <p>{location}</p>
          <p>{date}</p>
        </div>
        <p class="font-opensans text-gray-700 mt-3">{description}</p>
      </div>
    </button>
  );
});

export default component$(() => {
  const activeVideoUrl = useSignal('');
  const isModalOpen = useSignal(false);

  const handleClose = $(() => {
    isModalOpen.value = false;
    activeVideoUrl.value = '';
  });

  return (
    <main class="w-full">
      <VideoModal 
        isOpen={isModalOpen.value}
        videoUrl={activeVideoUrl.value}
        onClose$={handleClose}
      />

      {/* Hero Section */}
      <section class="bg-[#faf9f6] py-24">
        <div class="container">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4">
              {CONTENT.hero.title.main}{' '}
              <span class="font-ephesis">{CONTENT.hero.title.accent}</span>{' '}
              {CONTENT.hero.title.end}
            </h1>
            <p class="font-opensans text-lg md:text-xl text-gray-600">
              {CONTENT.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Films Grid Section */}
      <section class="bg-[#d5c6ad] py-16">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={BACKGROUND_STYLES}
          aria-hidden="true"
        />
        
        <div class="container relative z-10">
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONTENT.films.map((film: Film) => (
                <FilmCard 
                  key={film.title}
                  {...film}
                  onPlay$={() => {
                    activeVideoUrl.value = film.videoUrl;
                    isModalOpen.value = true;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: META.title,
  meta: [
    {
      name: "description",
      content: META.description,
    },
  ],
};
