import { component$, useSignal, type QRL, $ } from "@builder.io/qwik";
import { FAQ_CONTENT } from "~/constants/faq";
import Texture from '~/assets/images/18-texture.webp?jsx';
import { LetsTalkButton } from "~/components/ui/lets-talk-button";

// Types
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  onTalkClick$: QRL<() => void>;
}

// Move FAQItem to separate component for better code organization
export const FAQItem = component$((props: { 
  item: FAQItem; 
  isOpen: boolean;
  onToggle$: QRL<() => void>;
}) => {
  // Inline operations in template for better optimization
  return (
    <div class={[
      "bg-white rounded-lg overflow-hidden transform transition-all duration-500",
      "ease-in-out translate-y-0 opacity-100 hover:bg-gray-50"
    ].join(" ")}>
      <button
        onClick$={props.onToggle$}
        class="w-full text-left px-6 py-5 flex justify-between items-center"
        aria-expanded={props.isOpen}
      >
        <span class="text-xl font-playfair">{props.item.question}</span>
        <span class={[
          "transform transition-transform duration-300 ease-in-out",
          props.isOpen ? "rotate-180" : ""
        ].join(" ")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" 
              stroke-linecap="round" stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <div class={[
        "transition-all duration-500 ease-in-out overflow-hidden",
        props.isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      ].join(" ")}>
        <div class={[
          "px-6 pb-5 text-gray-600 font-opensans transform transition-all",
          "duration-500 ease-in-out",
          props.isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        ].join(" ")}>
          {props.item.answer}
        </div>
      </div>
    </div>
  );
});

export const FAQSection = component$<FAQSectionProps>(({ onTalkClick$ }) => {
  const openIndex = useSignal<number | null>(null);

  // Memoize toggle handler with proper $ import
  const handleToggle = $((index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
  });

  return (
    <section class="relative bg-[#315141] py-16 px-4 overflow-hidden">
      <div class="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none">
        <Texture 
          class="w-full object-cover"
          style="transform-origin: top; transform: scale(1.1)"
          aria-hidden="true"
        />
      </div>
      
      <div class="container relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="font-playfair text-3xl md:text-4xl text-white mb-12 flex items-center justify-center gap-8">
            {FAQ_CONTENT.title}
            <LetsTalkButton onTalkClick$={onTalkClick$} />
          </h2>

          <div class="space-y-3 text-left">
            {FAQ_CONTENT.items.map((item, index) => (
              <FAQItem 
                key={index}
                item={item}
                isOpen={openIndex.value === index}
                onToggle$={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
