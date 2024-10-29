import { component$, Slot, useSignal, $, useOnWindow, useTask$ } from "@builder.io/qwik";
import Navbar from '../components/navbar/navbar';
import { Toast } from '../components/ui/toast';
import type { RequestHandler } from "@builder.io/qwik-city";

// Add cache control headers for static assets
export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Aggressive caching for static routes
  cacheControl({
    public: true,
    maxAge: 3600,
    staleWhileRevalidate: 60 * 60 * 24 * 365,
    sMaxAge: 60 * 60 * 24,
  });
};

// Optimize styles by using CSS background instead of image
const styles = {
  wrapper: "min-h-screen bg-[#faf9f6] relative flex flex-col",
  overlay: [
    "fixed top-0 left-0 w-full h-16",
    "bg-gradient-to-b from-black/20 to-transparent",
    "pointer-events-none z-10"
  ].join(' '),
  main: "pt-16 flex-grow",
  modal: "fixed inset-0 z-[100] transition-all duration-300 opacity-100 pointer-events-auto",
  texture: [
    "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none",
    "bg-[url('/assets/16-texture-square.webp')]",
    "bg-cover bg-center bg-repeat-y"
  ].join(' ')
} as const;

// Debounce scroll handler
const SCROLL_DEBOUNCE = 150; // ms

export const onRequest: RequestHandler = async ({ redirect, url }) => {
  if (url.pathname.startsWith('/blog')) {
    throw redirect(301, '/');
  }
};

export default component$(() => {
  const showLeadForm = useSignal(false);
  const showToast = useSignal(false);
  const footerLoaded = useSignal(false);
  const scrollTimeout = useSignal<number | undefined>();

  // Modal handlers
  const handleOpenModal = $(() => {
    showLeadForm.value = true;
    document.body.style.overflow = 'hidden';
  });

  const handleCloseModal = $(() => {
    showLeadForm.value = false;
    document.body.style.overflow = 'unset';
  });

  // Toast handlers
  const handleShowToast = $(() => {
    showToast.value = true;
  });

  const handleHideToast = $(() => {
    showToast.value = false;
  });

  // Event listeners
  useOnWindow('toggleLeadForm', $(() => {
    handleOpenModal();
  }));

  // Debounced scroll handler for footer loading
  useOnWindow('scroll', $(() => {
    if (scrollTimeout.value) {
      clearTimeout(scrollTimeout.value);
    }

    scrollTimeout.value = setTimeout(() => {
      if (!footerLoaded.value) {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (documentHeight - scrollPosition < 200) {
          footerLoaded.value = true;
        }
      }
    }, SCROLL_DEBOUNCE) as any;
  }));

  // Cleanup scroll timeout
  useTask$(({ cleanup }) => {
    cleanup(() => {
      if (scrollTimeout.value) {
        clearTimeout(scrollTimeout.value);
      }
    });
  });

  return (
    <div class={styles.wrapper}>
      {/* Replace image with CSS background */}
      <div class={styles.texture} aria-hidden="true" />
      <div class={styles.overlay} aria-hidden="true" />
      
      <Navbar onTalkClick$={handleOpenModal} />
      
      <main class={styles.main}>
        <Slot />
      </main>
      
      {/* Optimize lazy loading */}
      {footerLoaded.value && (
        <div>
          {import('../components/footer/footer').then(({ Footer }) => <Footer />)}
        </div>
      )}
      
      {/* Optimize modal loading */}
      {showLeadForm.value && (
        <div class={styles.modal}>
          {import('../components/leadForm/leadForm').then(({ LeadForm }) => (
            <LeadForm 
              isVisible={showLeadForm.value} 
              onClose$={handleCloseModal}
              onSuccess$={handleShowToast}
            />
          ))}
        </div>
      )}

      {showToast.value && (
        <Toast onClose$={handleHideToast} duration={5000} />
      )}
    </div>
  );
});
