import { component$, type PropFunction, useSignal, useOnWindow, $ } from '@builder.io/qwik';
import { NOTIFICATION_CONTENT } from '~/constants/site';

interface NotificationBarProps {
  onClick$: PropFunction<() => void>;
}

export const NotificationBar = component$<NotificationBarProps>(({ onClick$ }) => {
  const isVisible = useSignal(true);

  // Add scroll listener
  useOnWindow(
    'scroll',
    $(() => {
      isVisible.value = window.scrollY < 10;
    })
  );

  return (
    <div 
      class={[
        "fixed top-0 w-full text-white py-2 px-4 text-center z-50 transition-all duration-300",
        isVisible.value ? "translate-y-0" : "-translate-y-full"
      ].join(" ")}
    >
      <button
        onClick$={onClick$}
        class="container mx-auto flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
      >
        <span>{NOTIFICATION_CONTENT.message}</span>
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