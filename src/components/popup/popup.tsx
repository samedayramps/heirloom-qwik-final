import { component$, useSignal, type PropFunction, useVisibleTask$, $ } from '@builder.io/qwik';
import { POPUP_CONTENT, VIDEOS } from '~/constants/site';
import { LetsTalkButton } from '~/components/ui/lets-talk-button';

interface PopupProps {
  onClose$: PropFunction<() => void>;
  onTalkClick$: PropFunction<() => void>;
}

// Helper function to get embed URL
const getEmbedUrl = (videoId: string) => {
  return `https://iframe.mediadelivery.net/embed/333221/${videoId}?autoplay=true&loop=false&muted=false&preload=true`;
};

// Video Grid Component
const VideoGrid = component$<{ onSelect$: PropFunction<(id: string) => void> }>(({ onSelect$ }) => {
  return (
    <div class="grid grid-cols-3 gap-3 sm:gap-5 mb-5">
      {VIDEOS.map((video: { id: string; thumbnail: string }, index: number) => (
        <button
          key={video.id}
          onClick$={() => onSelect$(video.id)}
          class="relative aspect-video bg-gray-100 rounded-lg hover:opacity-90 transition-all duration-300 group overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          <span class="sr-only">{POPUP_CONTENT.watchVideoAriaLabel(index)}</span>
          <img 
            src={video.thumbnail} 
            alt="" 
            width={640}
            height={360}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
            <svg 
              class="w-12 h-12 sm:w-14 sm:h-14 text-white transform group-hover:scale-110 transition-transform duration-300"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zM8 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
});

// Video Player Component
const VideoPlayer = component$<{videoId: string; onBack$: PropFunction<() => void>}>(({
  videoId,
  onBack$
}) => {
  const iframeLoaded = useSignal(false);
  
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    iframeLoaded.value = true;
  });

  return (
    <div>
      <div class="aspect-video bg-black/5 rounded-lg overflow-hidden shadow-lg">
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          {iframeLoaded.value && (
            <iframe 
              src={getEmbedUrl(videoId)}
              loading="lazy"
              style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowFullscreen
            />
          )}
        </div>
      </div>
      <button
        onClick$={onBack$}
        class="mt-6 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 font-opensans-regular text-base md:text-lg"
      >
        <svg 
          class="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width={2} 
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {POPUP_CONTENT.backToVideos}
      </button>
    </div>
  );
});

// Main Popup component
export const Popup = component$<PopupProps>(({ onClose$, onTalkClick$ }) => {
  const activeVideoId = useSignal<string | null>(null);
  const isExiting = useSignal(false);

  const handleClose = $(() => {
    isExiting.value = true;
    setTimeout(() => {
      onClose$();
    }, 500); // Match animation duration
  });
  
  return (
    <div class="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        class={[
          "fixed inset-0 bg-black/50 transition-opacity duration-500",
          isExiting.value ? "opacity-0" : "animate-backdrop-appear"
        ].join(" ")}
        onClick$={handleClose}
      />

      {/* Modal */}
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <div 
          class={[
            "bg-[#faf9f6] p-6 sm:p-10 rounded-xl shadow-xl max-w-3xl w-full mx-auto relative",
            isExiting.value ? "animate-popup-exit" : "animate-popup-appear"
          ].join(" ")}
        >
          <button 
            onClick$={handleClose}
            class="absolute -top-4 -right-4 bg-[#faf9f6] rounded-full p-2 shadow-lg text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-300"
            aria-label={POPUP_CONTENT.closeAriaLabel}
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <h2 class="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
            {POPUP_CONTENT.title}
          </h2>

          <p class="font-opensans-regular text-base md:text-lg text-center text-gray-800 leading-relaxed"
             dangerouslySetInnerHTML={POPUP_CONTENT.description}
          />

          <div class="relative py-5">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-1/3 border-t-2 border-[#D5C6AD]"></div>
            </div>
          </div>

          <p class="font-opensans-regular text-base md:text-lg text-center text-gray-800 leading-relaxed mb-6">
            {POPUP_CONTENT.tertiaryDescription}
          </p>
          
          {activeVideoId.value ? (
            <VideoPlayer 
              videoId={activeVideoId.value}
              onBack$={() => activeVideoId.value = null} 
            />
          ) : (
            <>
              <VideoGrid onSelect$={(id) => activeVideoId.value = id} />
              <div class="flex flex-col sm:flex-row items-center justify-center gap-2 bg-gray-50 py-1.5 px-4 rounded-xl">
                <p class="font-opensans-semibold text-base md:text-lg text-gray-900 text-center">
                  {POPUP_CONTENT.ctaText}
                </p>
                <LetsTalkButton
                  onTalkClick$={onTalkClick$}
                  class="w-full sm:w-auto"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}); 