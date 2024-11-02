import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

interface VideoModalProps {
  videoUrl: string;
  onClose$: PropFunction<() => void>;
}

export const VideoModal = component$<VideoModalProps>(({ videoUrl, onClose$ }) => {
  const iframeLoaded = useSignal(false);

  useTask$(({ cleanup }) => {
    const frame = requestAnimationFrame(() => {
      iframeLoaded.value = true;
    });
    cleanup(() => cancelAnimationFrame(frame));
  });

  // Convert m3u8 URL to Bunny player embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('/').slice(-2)[0];
    return `https://iframe.mediadelivery.net/embed/333221/${videoId}?autoplay=true&loop=false&muted=false&preload=true`;
  };

  return (
    <div class="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4">
      <button 
        onClick$={onClose$}
        class="absolute top-4 right-4 text-white text-xl p-2"
        aria-label="Close video"
      >
        ✕
      </button>
      
      <div class="w-full max-w-5xl aspect-video bg-black/5 rounded-lg overflow-hidden">
        {iframeLoaded.value ? (
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe 
              src={getEmbedUrl(videoUrl)}
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
    </div>
  );
}); 