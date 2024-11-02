import { component$, useSignal, type PropFunction } from '@builder.io/qwik';
import { POPUP_CONTENT, VIDEOS } from '~/constants/site';
import { LetsTalkButton } from '~/components/ui/lets-talk-button';

interface PopupProps {
  onClose$: PropFunction<() => void>;
  onTalkClick$: PropFunction<() => void>;
}

export const Popup = component$<PopupProps>(({ onClose$, onTalkClick$ }) => {
  const activeVideoId = useSignal<string | null>(null);
  const iframeLoaded = useSignal(false);

  const getEmbedUrl = (videoId: string) => {
    return `https://iframe.mediadelivery.net/embed/333221/${videoId}?autoplay=true&loop=false&muted=false&preload=true`;
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div class="bg-[#faf9f6] p-6 sm:p-10 rounded-xl shadow-xl max-w-3xl w-full mx-auto relative">
        <button 
          onClick$={onClose$}
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={POPUP_CONTENT.closeAriaLabel}
        >
          <svg 
            class="w-7 h-7" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width={1.5} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        <h2 class="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
          {POPUP_CONTENT.title}
        </h2>

        <div class="space-y-4">
          <p class="font-opensans-regular text-base md:text-lg text-center text-gray-800 leading-relaxed"
             dangerouslySetInnerHTML={POPUP_CONTENT.description}
          />
          <p class="font-opensans-regular text-base md:text-lg text-center text-gray-800 leading-relaxed">
            {POPUP_CONTENT.secondaryDescription}
          </p>
        </div>

        <div class="relative py-10">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-1/3 border-t-2 border-[#D5C6AD]"></div>
          </div>
        </div>

        <p class="font-opensans-regular text-base md:text-lg text-center text-gray-800 leading-relaxed mb-12">
          {POPUP_CONTENT.tertiaryDescription}
        </p>
        
        {!activeVideoId.value ? (
          <>
            <div class="grid grid-cols-3 gap-3 sm:gap-5 mb-8">
              {VIDEOS.map((video, index) => (
                <button
                  key={video.id}
                  onClick$={() => {
                    activeVideoId.value = video.id;
                    iframeLoaded.value = false;
                  }}
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

            <p class="font-opensans-regular text-base md:text-lg text-center text-gray-800 leading-relaxed mb-10">
              {POPUP_CONTENT.quaternaryDescription}
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-50 py-5 px-8 rounded-xl">
              <p class="font-opensans-semibold text-base md:text-lg text-gray-900 text-center">
                {POPUP_CONTENT.ctaText}
              </p>
              <LetsTalkButton
                onTalkClick$={onTalkClick$}
                class="w-full sm:w-auto"
              />
            </div>
          </>
        ) : (
          <div>
            <div class="aspect-video bg-black/5 rounded-lg overflow-hidden shadow-lg">
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe 
                  src={getEmbedUrl(activeVideoId.value)}
                  loading="lazy"
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullscreen
                  onLoad$={() => iframeLoaded.value = true}
                />
              </div>
            </div>
            <button
              onClick$={() => activeVideoId.value = null}
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
        )}
      </div>
    </div>
  );
}); 