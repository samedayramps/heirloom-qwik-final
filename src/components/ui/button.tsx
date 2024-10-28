import { component$, $, type QRL } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface ButtonProps {
  text: string;
  href?: string;
  onClick$?: QRL<() => void>;
  class?: string;
  preventScroll?: boolean;
}

export const Button = component$<ButtonProps>(({ 
  text, 
  href, 
  onClick$, 
  class: className,
  preventScroll = false 
}) => {
  const baseClasses = "bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-opensans font-bold py-3 px-6 text-sm rounded-full transition-all duration-300";
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  const handleClick = $(() => {
    if (preventScroll) {
      document.body.style.overflow = 'hidden';
    }
    onClick$?.();
  });

  if (href) {
    return (
      <Link href={href} class={classes}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick$={handleClick} class={classes}>
      {text}
    </button>
  );
}); 