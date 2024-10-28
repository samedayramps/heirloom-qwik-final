import { component$, useSignal, type QRL } from "@builder.io/qwik";
import texture from '~/assets/images/18-texture.webp';
import { LetsTalkButton } from "~/components/ui/lets-talk-button";

// Static content and types
interface FAQItem {
  question: string;
  answer: string;
}

const CONTENT = {
  title: "Have questions?",
  buttonText: "LET'S TALK",
  items: [
    {
      question: "When will we receive our wedding film?",
      answer: "Your wedding film will be delivered within 12-16 weeks after your wedding date. We take great care in crafting each film to ensure it perfectly captures your special day.",
    },
    {
      question: "What's the process after booking?",
      answer: "After booking, we'll schedule a consultation to discuss your vision, timeline, and important moments you want captured. We'll stay in touch throughout the planning process and coordinate with your other vendors to ensure everything runs smoothly.",
    },
    {
      question: "Do you travel for weddings?",
      answer: "Yes! We travel nationwide and internationally for weddings. Travel fees may apply depending on the location. Contact us for specific details about your destination.",
    },
  ]
} as const;

// Background styles
const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

const TRANSITION_CLASSES = {
  item: "bg-white rounded-lg overflow-hidden transform transition-all duration-500 ease-in-out translate-y-0 opacity-100 hover:bg-gray-50 transition-colors duration-300",
  button: "w-full text-left px-6 py-5 flex justify-between items-center transition-colors duration-300",
  chevron: "transform transition-transform duration-300 ease-in-out",
  content: "transition-all duration-500 ease-in-out overflow-hidden",
  text: "px-6 pb-5 text-gray-600 font-opensans transform transition-all duration-500 ease-in-out",
  talkButton: "bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-opensans font-bold py-3 px-6 text-sm rounded-full transition-all duration-300"
} as const;

// Separate FAQ Item component for better organization
const FAQItem = component$((props: { 
  item: FAQItem; 
  index: number;
  isOpen: boolean;
  onToggle$: () => void;
}) => {
  return (
    <div class={[
      TRANSITION_CLASSES.item,
      `transition-delay-${props.index * 100}`
    ].join(" ")}>
      <button
        onClick$={props.onToggle$}
        class={TRANSITION_CLASSES.button}
        aria-expanded={props.isOpen}
      >
        <span class="text-xl font-playfair">{props.item.question}</span>
        <span class={[
          TRANSITION_CLASSES.chevron,
          props.isOpen ? "rotate-180" : ""
        ].join(" ")}>
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
      <div
        class={[
          TRANSITION_CLASSES.content,
          props.isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        ].join(" ")}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div class={[
          TRANSITION_CLASSES.text,
          props.isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        ].join(" ")}>
          {props.item.answer}
        </div>
      </div>
    </div>
  );
});

interface FAQSectionProps {
  onTalkClick$: QRL<() => void>;
}

export const FAQSection = component$<FAQSectionProps>(({ onTalkClick$ }) => {
  const openIndex = useSignal<number | null>(null);

  return (
    <section class="relative bg-[#315141] py-24 overflow-hidden">
      <div 
        class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
        style={BACKGROUND_STYLES}
        aria-hidden="true"
      />
      
      <div class="container relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="font-playfair text-3xl md:text-4xl text-white mb-16 flex items-center justify-center gap-8">
            {CONTENT.title}{" "}
            <LetsTalkButton 
              onTalkClick$={() => {
                document.body.style.overflow = 'hidden';
                onTalkClick$();
              }}
            />
          </h2>

          <div class="space-y-4 text-left">
            {CONTENT.items.map((item, index) => (
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
