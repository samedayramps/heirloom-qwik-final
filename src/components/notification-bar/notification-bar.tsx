import { component$, type PropFunction } from '@builder.io/qwik';

interface NotificationBarProps {
  onClick$: PropFunction<() => void>;
}

export const NotificationBar = component$<NotificationBarProps>(({ onClick$ }) => {
  return (
    <div class="sticky top-0 w-full text-white py-2 px-4 text-center z-50 animate-notification-pulse">
      <button
        onClick$={onClick$}
        class="container mx-auto flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
      >
        <span>Get 15% OFF your wedding film. Learn more</span>
        <svg 
          class="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width={2} 
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}); 