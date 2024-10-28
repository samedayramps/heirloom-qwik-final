import { component$, type QRL } from "@builder.io/qwik";

interface LetsTalkButtonProps {
  onTalkClick$: QRL<() => void>;
  class?: string;
}

export const LetsTalkButton = component$<LetsTalkButtonProps>(({ 
  onTalkClick$, 
  class: className 
}) => {
  const baseClasses = "bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-opensans font-bold py-3 px-6 text-sm rounded-full transition-all duration-300";
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <button
      onClick$={onTalkClick$}
      class={classes}
    >
      LET'S TALK
    </button>
  );
}); 