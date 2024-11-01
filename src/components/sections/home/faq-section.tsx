import { component$, useSignal, type QRL } from "@builder.io/qwik";
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

// Styles as constants
const styles = {
  section: "relative bg-[#315141] py-24 px-4 overflow-hidden",
  container: "container relative z-10",
  content: "max-w-4xl mx-auto text-center",
  title: "font-playfair text-3xl md:text-4xl text-white mb-12 flex items-center justify-center gap-8",
  faqList: "space-y-3 text-left",
} as const;

// FAQ Item Component
export const FAQItem = component$((props: { 
  item: FAQItem; 
  index: number;
  isOpen: boolean;
  onToggle$: QRL<() => void>;
}) => {
  const itemStyles = {
    base: "bg-white rounded-lg overflow-hidden transform transition-all duration-500 ease-in-out translate-y-0 opacity-100 hover:bg-gray-50",
    button: "w-full text-left px-6 py-5 flex justify-between items-center",
    question: "text-xl font-playfair",
    content: [
      "transition-all duration-500 ease-in-out overflow-hidden",
      props.isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
    ].join(" "),
    answer: [
      "px-6 pb-5 text-gray-600 font-opensans transform transition-all duration-500 ease-in-out",
      props.isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    ].join(" "),
    chevron: [
      "transform transition-transform duration-300 ease-in-out",
      props.isOpen ? "rotate-180" : ""
    ].join(" ")
  };

  return (
    <div class={itemStyles.base}>
      <button
        onClick$={props.onToggle$}
        class={itemStyles.button}
        aria-expanded={props.isOpen}
      >
        <span class={itemStyles.question}>{props.item.question}</span>
        <span class={itemStyles.chevron}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M19 9L12 16L5 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <div class={itemStyles.content}>
        <div class={itemStyles.answer}>{props.item.answer}</div>
      </div>
    </div>
  );
});

// Main FAQ Section Component
export const FAQSection = component$<FAQSectionProps>(({ onTalkClick$ }) => {
  const openIndex = useSignal<number | null>(null);

  return (
    <section class={styles.section}>
      <div class="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none">
        <div class="absolute inset-0 w-full">
          <Texture 
            class="w-full object-cover"
            style="transform-origin: top; transform: scale(1.1)"
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div class={styles.container}>
        <div class={styles.content}>
          <h2 class={styles.title}>
            {FAQ_CONTENT.title}
            <LetsTalkButton 
              onTalkClick$={() => {
                document.body.style.overflow = 'hidden';
                onTalkClick$();
              }}
            />
          </h2>

          <div class={styles.faqList}>
            {FAQ_CONTENT.items.map((item, index) => (
              <FAQItem 
                key={index} 
                item={item} 
                index={index}
                isOpen={openIndex.value === index}
                onToggle$={() => {
                  openIndex.value = openIndex.value === index ? null : index;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
