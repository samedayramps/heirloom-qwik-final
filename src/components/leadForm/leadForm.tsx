import { component$, type QRL, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useLeadFormAction } from '~/routes/index';
import { FormInput } from './form-input';

export const LeadForm = component$<{ 
  onClose$: QRL<() => void>;
  onSuccess$: QRL<() => void>;
  isVisible: boolean;
}>(({ onClose$, onSuccess$, isVisible }) => {
  const action = useLeadFormAction();
  const isSubmitting = useSignal(false);

  return (
    <>
      {/* Backdrop */}
      <div 
        class={[
          'fixed inset-0 bg-black/70 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        ]}
        onClick$={onClose$}
      />

      {/* Modal Container */}
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <div 
          class={[
            'w-full max-w-md bg-white/95 rounded-3xl shadow-2xl border border-white/20 transition-all duration-300 transform',
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          ]}
        >
          <button 
            onClick$={onClose$}
            class="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-300"
            aria-label="Close"
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {/* Form Content */}
          <div class="p-8">
            <h3 class="text-3xl text-center font-playfair mb-8 text-gray-800">Let's Talk</h3>

            {action.value?.failed && (
              <div class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r">
                {action.value.message}
              </div>
            )}

            <Form
              action={action}
              onSubmit$={() => {
                isSubmitting.value = true;
              }}
              onSubmitCompleted$={async () => {
                if (action.value?.success) {
                  // Show spinner for 1 second
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  isSubmitting.value = false;
                  
                  // Close form with animation
                  onClose$();
                  
                  // Wait for form close animation to complete
                  await new Promise(resolve => setTimeout(resolve, 300));
                  
                  // Show toast
                  onSuccess$();
                } else {
                  isSubmitting.value = false;
                }
              }}
              class="space-y-6"
            >
              <div class="grid grid-cols-2 gap-4">
                <FormInput
                  id="firstName"
                  label="First Name"
                  type="text"
                  required
                  error={action.value?.fieldErrors?.firstName}
                />
                <FormInput
                  id="lastName"
                  label="Last Name"
                  type="text"
                  required
                  error={action.value?.fieldErrors?.lastName}
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  required
                  error={action.value?.fieldErrors?.email}
                />
                <FormInput
                  id="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  error={action.value?.fieldErrors?.phoneNumber}
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <FormInput
                  id="weddingDate"
                  label="Wedding Date"
                  type="date"
                  error={action.value?.fieldErrors?.weddingDate}
                />
                <FormInput
                  id="weddingVenue"
                  label="Wedding Venue"
                  type="text"
                  error={action.value?.fieldErrors?.weddingVenue}
                />
              </div>

              <div class="w-full">
                <label for="message" class="block text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d5c6ad] focus:ring-2 focus:ring-[#d5c6ad]/20 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm"
                  rows={4}
                  placeholder="Share your thoughts and let us know how you found us..."
                />
              </div>

              <div class="flex items-center justify-center pt-4">
                <button 
                  type="submit" 
                  class="bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-bold py-4 px-10 rounded-full text-sm uppercase tracking-wider relative disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200"
                  disabled={isSubmitting.value}
                >
                  {isSubmitting.value ? (
                    <div class="flex items-center">
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
            </Form>
          </div>
        </div>
      </div>
    </>
  );
});
