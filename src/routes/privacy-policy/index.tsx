import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="container mx-auto p-4">
      <h1 class="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p class="mb-4">
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
      </p>
      <h2 class="text-2xl font-semibold mb-2">Information We Collect</h2>
      <p class="mb-4">
        We collect information about you when you visit our site, including your name, email address, and any other information you provide.
      </p>
      <h2 class="text-2xl font-semibold mb-2">How We Use Your Information</h2>
      <p class="mb-4">
        We use the information we collect to improve our website, process transactions, and communicate with you.
      </p>
      <h2 class="text-2xl font-semibold mb-2">Sharing Your Information</h2>
      <p class="mb-4">
        We do not share your personal information with third parties except as necessary to provide our services or as required by law.
      </p>
      <h2 class="text-2xl font-semibold mb-2">Contact Us</h2>
      <p>
        For more information about our privacy practices, please contact us at privacy@example.com.
      </p>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Privacy Policy',
  meta: [
    {
      name: 'description',
      content: 'Learn about our privacy practices and how we handle your personal information.',
    },
  ],
}; 