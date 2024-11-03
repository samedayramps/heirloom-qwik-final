import { routeAction$, zod$, z } from '@builder.io/qwik-city';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  weddingDate: z.string().optional(),
  weddingVenue: z.string().optional(),
  message: z.string().optional()
});

// Email sending function
const sendLeadEmails = async (data: z.infer<typeof formSchema>) => {
  const response = await fetch('https://heirloomweddingfilms.com/.netlify/functions/send-lead-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Email notification failed:', errorText);
    throw new Error('Failed to send confirmation email');
  }

  return response;
};

// Main action creator
export const createLeadFormAction = () => routeAction$(
  async (data, { fail }) => {
    try {
      await sendLeadEmails(data);
      
      return {
        success: true,
        message: 'Thank you for your submission! We\'ll be in touch soon.'
      };
    } catch (error) {
      console.error('Form submission error:', error);
      return fail(500, {
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  },
  zod$(formSchema)
);
