import { routeAction$, zod$, z } from '@builder.io/qwik-city';

export const createLeadFormAction = () => routeAction$(
  async (data, { fail }) => {
    try {
      // First send to Pipedream
      const pipedreamResponse = await fetch('https://eo61u3encsl1c2v.m.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!pipedreamResponse.ok) {
        console.error('Pipedream submission failed');
      }

      // Then send email notifications with absolute URL
      const emailResponse = await fetch('https://heirloomweddingfilms.com/.netlify/functions/send-lead-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email notification failed:', errorText);
        return fail(500, {
          message: 'Failed to send confirmation email. Please try again.'
        });
      }

      return {
        success: true,
        message: 'Thank you for your submission! We\'ll be in touch soon.'
      };
    } catch (error) {
      console.error('Form submission error:', error);
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
    message: z.string().optional()
  })
);
