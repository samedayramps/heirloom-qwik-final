import { component$, useSignal, useTask$, type QRL } from '@builder.io/qwik';

interface ToastProps {
  duration?: number;
  onClose$: QRL<() => void>;
}

export const Toast = component$<ToastProps>(({ 
  duration = 3000, 
  onClose$ 
}) => {
  const isVisible = useSignal(false);

  useTask$(({ cleanup }) => {
    requestAnimationFrame(() => {
      isVisible.value = true;
    });

    const timeout = setTimeout(() => {
      isVisible.value = false;
      setTimeout(() => onClose$(), 500);
    }, duration);

    cleanup(() => clearTimeout(timeout));
  });

  return (
    <div 
      class={[
        'fixed top-24 left-1/2 -translate-x-1/2 bg-[#315141] text-[#faf9f6] py-3 px-6 rounded-[24px] shadow-lg transition-all duration-500 ease-out z-[150] w-fit mx-auto max-w-[calc(100%-32px)]',
        isVisible.value 
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4'
      ]}
    >
      <div class="flex items-center justify-center space-x-3">
        <svg 
          class="w-5 h-5 text-[#faf9f6] flex-shrink-0"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p class="font-opensans text-sm leading-snug whitespace-nowrap">
          We're excited to connect and will reach out shortly!
        </p>
      </div>
    </div>
  );
});
