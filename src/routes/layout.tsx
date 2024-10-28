import { component$, Slot, useSignal, $ } from "@builder.io/qwik";
import Navbar from '../components/navbar/navbar'; // Ensure this path is correct
import { LeadForm } from '../components/leadForm/leadForm';
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  // Lift modal state to layout level
  const showLeadForm = useSignal(false);

  // Handler to open modal
  const handleOpenModal = $(() => {
    showLeadForm.value = true;
  });

  // Handler to close modal
  const handleCloseModal = $(() => {
    showLeadForm.value = false;
  });

  return (
    <div class="min-h-screen bg-[#faf9f6] relative">
      {/* Updated gradient from 20% to 0% opacity */}
      <div class="fixed top-0 left-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10" />
      
      <Navbar onTalkClick$={handleOpenModal} />
      {/* Add a main element with padding-top to compensate for fixed navbar */}
      <main class="pt-16"> {/* assuming navbar is 64px (4rem) tall */}
        <Slot />
      </main>
      
      {/* Lead Form Modal */}
      {showLeadForm.value && (
        <LeadForm onClose$={handleCloseModal} />
      )}
    </div>
  );
});
