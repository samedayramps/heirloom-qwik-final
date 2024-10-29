import { component$, type QRL } from "@builder.io/qwik";

interface LetsTalkButtonProps {
  onTalkClick$: QRL<() => void>;
  class?: string;
  isLoading?: boolean;
}

export const LetsTalkButton = component$<LetsTalkButtonProps>(({ 
  onTalkClick$, 
  class: className,
  isLoading = false
}) => {
  const baseClasses = "bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-opensans font-bold py-3 px-6 text-sm rounded-full transition-all duration-300 disabled:opacity-70";
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <button
      onClick$={onTalkClick$}
      class={classes}
      disabled={isLoading}
      aria-busy={isLoading}
      type="button"
    >
      {isLoading ? (
        <span class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5" /* ... *//>
          Loading...
        </span>
      ) : (
        "LET'S TALK"
      )}
    </button>
  );
}); 