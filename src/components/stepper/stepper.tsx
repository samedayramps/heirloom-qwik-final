import { component$ } from '@builder.io/qwik';

export interface Step {
  number: number;
  title: string;
  description: string;
}

// Reusable classes for better maintainability
const CLASSES = {
  stepNumber: "relative z-10 flex-shrink-0 w-10 h-10 bg-[#d5c6ad] rounded-full flex items-center justify-center",
  stepText: "font-opensans text-[#faf9f6] text-base font-medium",
  title: "font-playfair text-xl text-gray-800 mb-2",
  description: "font-opensans text-gray-600 leading-relaxed",
  connector: {
    base: "bg-[#d5c6ad] rounded-full transform transition-transform duration-500 scale-100",
    horizontal: "h-0.5 flex-1 mx-2",
    vertical: "w-0.5 flex-1 my-2"
  }
} as const;

export const Stepper = component$<{ steps: Step[] }>(({ steps }) => {
  return (
    <div class="relative">
      {/* Desktop version */}
      <div class="hidden md:block">
        <ul class="grid grid-cols-4">
          {steps.map((step, index) => (
            <li 
              key={step.number} 
              class="relative transform transition-transform duration-500 translate-y-0 opacity-100"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div class="flex items-center w-full">
                <div class={CLASSES.stepNumber}>
                  <span class={CLASSES.stepText}>{step.number}</span>
                </div>
                {index !== steps.length - 1 && (
                  <div 
                    class={[CLASSES.connector.base, CLASSES.connector.horizontal].join(" ")}
                    style={{ transitionDelay: `${index * 100}ms` }}
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
      </div>

      {/* Mobile version */}
      <ul class="md:hidden">
        {steps.map((step, index) => (
          <li 
            key={step.number} 
            class="flex group transform transition-transform duration-500 translate-x-0 opacity-100"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div class="flex flex-col items-center">
              <div class={CLASSES.stepNumber}>
                <span class={CLASSES.stepText}>{step.number}</span>
              </div>
              {index !== steps.length - 1 && (
                <div 
                  class={[CLASSES.connector.base, CLASSES.connector.vertical].join(" ")}
                  style={{ transitionDelay: `${index * 100}ms` }}
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
