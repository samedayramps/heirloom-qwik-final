import { routeAction$, zod$, z } from '@builder.io/qwik-city';

// eslint-disable-next-line qwik/loader-location
export const createLeadFormAction = () => routeAction$(
  async (data, { fail }) => {
    try {
      const response = await fetch('https://eo61u3encsl1c2v.m.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        return fail(500, {
          message: 'Failed to submit form'
        });
      }

      // Send email notification
      fetch('/.netlify/functions/send-lead-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return {
        success: true,
        message: 'Thank you for your submission! We\'ll be in touch soon.'
      };
    } catch (error) {
      return fail(500, {
        message: 'An unexpected error occurred'
      });
    }
  },
  zod$({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().optional(),
    weddingDate: z.string().optional(),
    weddingVenue: z.string().optional(),
    message: z.string().optional(),
    referralSource: z.string().optional()
  })
);
