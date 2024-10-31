import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { CONTENT } from "../content";
import texture from '~/assets/images/22-texture.webp';

// Background styles
const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

export const useFilmData = routeLoader$(({ params, status }) => {
  const film = CONTENT.films.find(f => f.slug === params.slug);
  if (!film) {
    status(404);
    return null;
  }
  return film;
});

export default component$(() => {
  const filmSignal = useFilmData();
  const iframeLoaded = useSignal(false);

  useTask$(({ cleanup }) => {
    const frame = requestAnimationFrame(() => {
      iframeLoaded.value = true;
    });
    cleanup(() => cancelAnimationFrame(frame));
  });

  if (!filmSignal.value) {
    return (
      <div class="container py-24">
        <h1 class="text-2xl">Film not found</h1>
      </div>
    );
  }

  const film = filmSignal.value;

  return (
    <main class="w-full">
      {/* Combined Video and Content Section */}
      <section class="bg-[#faf9f6] pt-24 pb-16">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={BACKGROUND_STYLES}
          aria-hidden="true"
        />
        
        <div class="container max-w-4xl mx-auto relative z-10">
          {/* Title and Location/Date */}
          <div class="text-center mb-8">
            <h1 class="font-playfair text-4xl md:text-5xl text-gray-800 mb-4">
              {film.title}
            </h1>
            <p class="font-opensans text-gray-600">
              {film.location} • {film.date}
            </p>
          </div>
          
          {/* Video Player */}
          <div class="w-full aspect-video bg-black/5 rounded-lg overflow-hidden mb-16">
            {iframeLoaded.value ? (
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe 
                  src="https://iframe.mediadelivery.net/embed/333221/8a89aff3-22e4-4032-8acf-d2b23cc1317a?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
                  loading="lazy"
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullscreen
                />
              </div>
            ) : (
              <div class="w-full h-full flex items-center justify-center">
                <div class="loading-spinner" />
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div class="max-w-3xl mx-auto">
            <div 
              class="prose prose-lg mx-auto prose-headings:font-playfair prose-headings:font-normal prose-p:font-opensans"
              dangerouslySetInnerHTML={film.blogContent}
            />
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const film = resolveValue(useFilmData);
  return {
    title: film ? `${film.title} - Wedding Film` : 'Film Not Found',
    meta: [
      {
        name: "description",
        content: film?.description || 'Film not found',
      },
    ],
  };
}; 