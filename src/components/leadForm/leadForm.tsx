import { component$, type QRL, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useLeadFormAction } from '~/routes/index';
import { FormInput } from './form-input';

export const LeadForm = component$<{ onClose$: QRL<() => void> }>(({ onClose$ }) => {
  const action = useLeadFormAction();
  const isSubmitting = useSignal(false);

  return (
    <div class="fixed inset-0 z-[100] overflow-y-auto">
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick$={onClose$}
      />

      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-white rounded-3xl shadow-xl">
          <button 
            onClick$={onClose$}
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="p-6">
            <h3 class="text-2xl text-center font-playfair mb-6">Let's Talk</h3>

            {action.value?.failed && (
              <div class="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {action.value.message}
              </div>
            )}

            {action.value?.success && (
              <div class="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {action.value.message}
              </div>
            )}

            <Form
              action={action}
              onSubmit$={() => {
                isSubmitting.value = true;
                // Ensure spinner shows for at least 1 second
                setTimeout(() => {
                  isSubmitting.value = false;
                }, 1000);
              }}
              onSubmitCompleted$={() => {
                isSubmitting.value = false;
                if (action.value?.success) {
                  setTimeout(onClose$, 2000);
                }
              }}
              class="space-y-4"
            >
              <div class="flex space-x-4">
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

              <div class="flex space-x-4">
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

              <div class="flex space-x-4">
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
                <label for="message" class="block text-gray-700 text-sm font-bold mb-2">
                  Message (Please include how you heard about us)
                </label>
                <textarea
                  id="message"
                  name="message"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={4}
                  placeholder="Share your thoughts and let us know how you found us..."
                />
              </div>

              <div class="flex items-center justify-center mt-8">
                <button 
                  type="submit" 
                  class="bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-bold py-3 px-8 rounded-full text-sm uppercase tracking-wider relative disabled:opacity-70 disabled:cursor-not-allowed"
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
    </div>
  );
});
