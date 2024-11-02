import { component$, useSignal, type PropFunction } from '@builder.io/qwik';

const VIDEOS = [
  "c3aa2012-b651-4733-b1db-2a31b900fdb8",
  "c8d9850a-8944-4260-a684-2cce331542b2",
  "d7742ad2-6c27-494d-a936-875e70d5df54"
] as const;

interface PopupProps {
  onClose$: PropFunction<() => void>;
}

export const Popup = component$<PopupProps>(({ onClose$ }) => {
  const activeVideoId = useSignal<string | null>(null);
  const iframeLoaded = useSignal(false);

  const getEmbedUrl = (videoId: string) => {
    return `https://iframe.mediadelivery.net/embed/333221/${videoId}?autoplay=true&loop=false&muted=false&preload=true`;
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4 relative">
        <button 
          onClick$={onClose$}
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <svg 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        <h2 class="font-playfair text-2xl sm:text-3xl font-bold mb-4 text-center">
          Ty Walls Films is now Heirloom Wedding Films
        </h2>
        <p class="mb-6 sm:mb-8 text-base sm:text-lg text-center text-gray-700">
          After 8 years of filming weddings, I have decided to provide my clients with the perfect wedding film for those that want to have something worthy of passing down and watching every anniversary
        </p>
        
        {!activeVideoId.value ? (
          <div class="grid grid-cols-3 gap-2 sm:gap-4">
            {VIDEOS.map((videoId, index) => (
              <button
                key={videoId}
                onClick$={() => {
                  activeVideoId.value = videoId;
                  iframeLoaded.value = false;
                }}
                class="aspect-video bg-gray-100 rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <span class="sr-only">Watch video {index + 1}</span>
                <svg 
                  class="w-8 h-8 sm:w-12 sm:h-12 text-gray-500"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zM8 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div class="aspect-video bg-black/5 rounded-lg overflow-hidden">
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
              class="mt-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}); 