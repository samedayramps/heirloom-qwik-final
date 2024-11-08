import { component$, type QRL, useSignal, $ } from '@builder.io/qwik';
import { FormInput } from './form-input';

// Types
interface LeadFormProps {
  onClose$: QRL<() => void>;
  onSuccess$: QRL<() => void>;
}

interface FormStyles {
  backdrop: string;
  container: string;
  modal: (isExiting: boolean) => string;
  closeButton: string;
  content: string;
  title: string;
  error: string;
  form: string;
  grid: string;
  messageLabel: string;
  messageInput: string;
  submitWrapper: string;
  submitButton: (isSubmitting: boolean) => string;
}

// Styles
const styles: FormStyles = {
  backdrop: "fixed inset-0 bg-black/70 transition-opacity duration-500",
  container: "fixed inset-0 flex items-center justify-center p-4 md:p-4",
  modal: (isExiting: boolean) => [
    'w-full max-w-md bg-[#faf9f6] rounded-3xl shadow-2xl border border-white/20 relative',
    isExiting ? 'animate-popup-exit' : 'animate-popup-appear'
  ].join(' '),
  closeButton: "absolute -top-4 -right-4 bg-[#faf9f6] rounded-full p-2 shadow-lg text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-300",
  content: "p-3 md:p-8",
  title: "text-2xl md:text-3xl text-center font-playfair mb-2 md:mb-8 text-gray-800",
  error: "mb-3 md:mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r",
  form: "space-y-2 md:space-y-6",
  grid: "grid grid-cols-2 gap-4",
  messageLabel: "block text-gray-700 text-sm font-medium mb-1 md:mb-2",
  messageInput: "w-full px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#d5c6ad] focus:ring-2 focus:ring-[#d5c6ad]/20 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm",
  submitWrapper: "flex items-center justify-center pt-1 md:pt-4",
  submitButton: (isSubmitting: boolean) => [
    'w-full md:w-auto bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-bold py-3 md:py-4 px-6 md:px-10 rounded-full text-sm uppercase tracking-wider relative',
    'disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200',
    isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
  ].join(' ')
} as const;

export const LeadForm = component$<LeadFormProps>(({ 
  onClose$, 
  onSuccess$
}) => {
  const isSubmitting = useSignal(false);
  const isExiting = useSignal(false);

  const handleClose = $(() => {
    isExiting.value = true;
    setTimeout(() => {
      onClose$();
    }, 500);
  });

  const handleSubmit = $(async (event: any) => {
    event.preventDefault();
    isSubmitting.value = true;

    try {
      const form = event.target;
      const data = new FormData(form);
      
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as any).toString()
      });

      if (response.ok) {
        isSubmitting.value = false;
        onClose$();
        setTimeout(() => {
          onSuccess$();
        }, 300);
      } else {
        console.error('Form submission failed:', response);
        isSubmitting.value = false;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      isSubmitting.value = false;
    }
  });

  return (
    <div class="fixed inset-0 z-50">
      <div 
        class={[
          styles.backdrop,
          isExiting.value ? "opacity-0" : "animate-backdrop-appear"
        ].join(" ")}
        onClick$={handleClose}
      />

      <div class={styles.container}>
        <div class={styles.modal(isExiting.value)}>
          <button 
            onClick$={handleClose}
            class={styles.closeButton}
            aria-label="Close"
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class={styles.content}>
            <h3 class={styles.title}>Let's Talk</h3>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit$={handleSubmit}
              class={styles.form}
            >
              <p class="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <input type="hidden" name="form-name" value="contact" />

              <div class={styles.grid}>
                <FormInput
                  id="firstName"
                  label="First Name"
                  type="text"
                  required
                />
                <FormInput
                  id="lastName"
                  label="Last Name"
                  type="text"
                  required
                />
              </div>

              <div class={styles.grid}>
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  required
                />
                <FormInput
                  id="phoneNumber"
                  label="Phone Number"
                  type="tel"
                />
              </div>

              <div class={styles.grid}>
                <FormInput
                  id="weddingDate"
                  label="Wedding Date"
                  type="date"
                  class="h-[46px] w-full"
                />
                <FormInput
                  id="weddingVenue"
                  label="Wedding Venue"
                  type="text"
                />
              </div>

              <div class="w-full">
                <label for="message" class={styles.messageLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  class={styles.messageInput}
                  rows={3}
                  placeholder="Share any additional details about your wedding..."
                />
              </div>

              <div class={styles.submitWrapper}>
                <button 
                  type="submit" 
                  class={styles.submitButton(isSubmitting.value)}
                  disabled={isSubmitting.value}
                >
                  {isSubmitting.value ? (
                    <div class="flex items-center justify-center">
                      <svg 
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          class="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          stroke-width="4"
                        />
                        <path 
                          class="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
