import { component$, Slot, useSignal, $ } from "@builder.io/qwik";
import Navbar from '../components/navbar/navbar'; // Ensure this path is correct
import { Footer } from '../components/footer/footer';
import { LeadForm } from '../components/leadForm/leadForm';
import { Toast } from '../components/ui/toast';
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
  const showToast = useSignal(false);

  // Handler to open modal
  const handleOpenModal = $(() => {
    showLeadForm.value = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  });

  // Handler to close modal
  const handleCloseModal = $(() => {
    showLeadForm.value = false;
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  });

  // Handler to show toast
  const handleShowToast = $(() => {
    showToast.value = true;
  });

  // Handler to hide toast
  const handleHideToast = $(() => {
    showToast.value = false;
  });

  return (
    <div class="min-h-screen bg-[#faf9f6] relative flex flex-col">
      {/* Updated gradient from 20% to 0% opacity */}
      <div class="fixed top-0 left-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10" />
      
      <Navbar onTalkClick$={handleOpenModal} />
      
      <main class="pt-16 flex-grow">
        <Slot />
      </main>
      
      <Footer />
      
      {/* Lead Form Modal - Always render but control visibility with opacity/pointer-events */}
      <div 
        class={[
          'fixed inset-0 z-[100] transition-all duration-300',
          showLeadForm.value 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        ]}
      >
        <LeadForm 
          isVisible={showLeadForm.value} 
          onClose$={handleCloseModal}
          onSuccess$={handleShowToast}
        />
      </div>

      {/* Toast */}
      {showToast.value && (
        <Toast
          onClose$={handleHideToast}
          duration={5000}
        />
      )}
    </div>
  );
});
