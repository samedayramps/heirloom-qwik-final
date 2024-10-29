import { component$ } from '@builder.io/qwik';

export interface Step {
  readonly number: number;
  readonly title: string;
  readonly description: string;
}

// Reusable classes for better maintainability
const CLASSES = {
  stepNumber: "relative z-10 flex-shrink-0 w-10 h-10 bg-[#d5c6ad] rounded-full flex items-center justify-center",
  stepText: "font-opensans text-[#faf9f6] text-base font-medium",
  title: "font-playfair text-xl text-gray-800 mb-2",
  description: "font-opensans text-gray-600 leading-relaxed",
  connector: {
    base: "bg-[#d5c6ad] rounded-full transition-transform duration-500 ease-in-out",
    horizontal: "h-0.5 flex-1 mx-2",
    vertical: "w-0.5 flex-1 my-2"
  },
  // Use Tailwind's built-in animation classes
  animation: {
    item: "animate-fade-in transition-all duration-500 ease-in-out",
    container: "motion-safe:animate-fade-in-up"
  }
} as const;

export const Stepper = component$<{ steps: Step[] }>(({ steps }) => {
  return (
    <div class="relative">
      {/* Desktop version */}
      <ul class="hidden md:grid md:grid-cols-4 gap-0">
        {steps.map((step, index) => (
          <li 
            key={step.number} 
            class={`${CLASSES.animation.item} opacity-0`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div class="flex items-center w-full">
              <div class={CLASSES.stepNumber}>
                <span class={CLASSES.stepText}>{step.number}</span>
              </div>
              {index !== steps.length - 1 && (
                <div 
                  class={`${CLASSES.connector.base} ${CLASSES.connector.horizontal}`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div class="mt-4 pr-6">
              <h3 class={CLASSES.title}>{step.title}</h3>
              <p class={CLASSES.description}>{step.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Mobile version */}
      <ul class="md:hidden">
        {steps.map((step, index) => (
          <li 
            key={step.number} 
            class={`flex ${CLASSES.animation.item} opacity-0`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div class="flex flex-col items-center">
              <div class={CLASSES.stepNumber}>
                <span class={CLASSES.stepText}>{step.number}</span>
              </div>
              {index !== steps.length - 1 && (
                <div 
                  class={`${CLASSES.connector.base} ${CLASSES.connector.vertical}`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div class="ml-6 pb-6">
              <h3 class={CLASSES.title}>{step.title}</h3>
              <p class={CLASSES.description}>{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
