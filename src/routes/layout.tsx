import { component$, Slot, useSignal, $, useOnWindow, useOnDocument } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Navbar from '../components/navbar/navbar';
import { Toast } from '../components/ui/toast';
import { Popup } from '../components/popup/popup';
import { isBrowser } from '@builder.io/qwik/build';

// Cache configuration for better performance
const CACHE_CONFIG = {
  staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 days
  maxAge: 5 // 5 seconds
} as const;

// Add proper caching headers
export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl(CACHE_CONFIG);
};

export default component$(() => {
  // State management using signals
  const showLeadForm = useSignal(false);
  const showToast = useSignal(false);
  const showPopup = useSignal(false);
  const footerLoaded = useSignal(false);

  // Memoize handlers with $
  const handleOpenModal = $(() => {
    showLeadForm.value = true;
    document.body.style.overflow = 'hidden';
  });

  const handleCloseModal = $(() => {
    showLeadForm.value = false;
    document.body.style.overflow = 'unset';
  });

  const handleShowToast = $(() => {
    showToast.value = true;
  });

  const handleHideToast = $(() => {
    showToast.value = false;
  });

  const handleClosePopup = $(() => {
    showPopup.value = false;
  });

  // Handle popup visibility on document load
  useOnDocument('DOMContentLoaded', $(() => {
    if (isBrowser) {
      const hasSeenPopup = localStorage.getItem('hasSeenPopup');
      
      if (!hasSeenPopup) {
        setTimeout(() => {
          showPopup.value = true;
          localStorage.setItem('hasSeenPopup', 'true');
        }, 3000);
      }
    }
  }));

  // Optimized scroll handler
  useOnWindow(
    'scroll',
    $(() => {
      if (!footerLoaded.value) {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (documentHeight - scrollPosition < 200) {
          footerLoaded.value = true;
        }
      }
    })
  );

  return (
    <div class="min-h-screen bg-[#faf9f6] relative flex flex-col">
      <Navbar onTalkClick$={handleOpenModal} />
      
      <main class="flex-grow">
        <Slot />
      </main>
      
      {/* Lazy load components when needed */}
      {showPopup.value && (
        <Popup 
          onClose$={handleClosePopup}
          onTalkClick$={handleOpenModal}
        />
      )}
      
      {/* Lazy load footer when in viewport */}
      {footerLoaded.value && (
        <div>
          {import('../components/footer/footer').then((mod) => (
            <mod.Footer />
          ))}
        </div>
      )}
      
      {/* Lazy load LeadForm when needed */}
      {showLeadForm.value && (
        <div class="fixed inset-0 z-[100] transition-all duration-300">
          {import('../components/leadForm/leadForm').then((mod) => (
            <mod.LeadForm 
              onClose$={handleCloseModal}
              onSuccess$={handleShowToast}
            />
          ))}
        </div>
      )}

      {/* Only render Toast when needed */}
      {showToast.value && (
        <Toast 
          onClose$={handleHideToast}
          duration={5000}
        />
      )}
    </div>
  );
});
