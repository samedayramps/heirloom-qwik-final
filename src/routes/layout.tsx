import { component$, Slot, useSignal, $, useOnWindow, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import type { TaskCtx } from '@builder.io/qwik';
import Navbar from '../components/navbar/navbar';
import { Toast } from '../components/ui/toast';
import { Popup } from '../components/popup/popup';
import { NotificationBar } from '~/components/notification-bar/notification-bar';
import type { RequestHandler } from "@builder.io/qwik-city";

// Types
interface LayoutStyles {
  wrapper: string;
  overlay: string;
  main: string;
  modal: string;
}

// Styles
const styles: LayoutStyles = {
  wrapper: "min-h-screen bg-[#faf9f6] relative flex flex-col",
  overlay: "fixed top-0 left-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10",
  main: "flex-grow pt-[96px]",
  modal: "fixed inset-0 z-[100] transition-all duration-300 opacity-100 pointer-events-auto"
} as const;

// Cache configuration
const CACHE_CONFIG = {
  staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 days
  maxAge: 5 // 5 seconds
} as const;

// Debounce scroll handler
const SCROLL_DEBOUNCE = 150; // ms

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl(CACHE_CONFIG);
};

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
  const showPopup = useSignal(false);

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

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }: TaskCtx) => {
    const timer = setTimeout(() => {
      showPopup.value = true;
    }, 3000);

    cleanup(() => clearTimeout(timer));
  });

  const handleNotificationClick = $(() => {
    showPopup.value = true;
  });

  const handleClosePopup = $(() => {
    showPopup.value = false;
  });

  return (
    <div class={styles.wrapper}>
      <NotificationBar onClick$={handleNotificationClick} />
      <div class={styles.overlay} aria-hidden="true" />
      
      <Navbar onTalkClick$={handleOpenModal} />
      
      <main class={styles.main}>
        <Slot />
      </main>
      
      {showPopup.value && (
        <Popup onClose$={handleClosePopup} />
      )}
      
      {/* Lazy load footer with error boundary */}
      {footerLoaded.value && (
        <div>
          {import('../components/footer/footer')
            .then(({ Footer }) => <Footer />)
            .catch(error => {
              console.error('Error loading footer:', error);
              return null;
            })
          }
        </div>
      )}
      
      {/* Lazy load LeadForm with error boundary */}
      {showLeadForm.value && (
        <div class={styles.modal}>
          {import('../components/leadForm/leadForm')
            .then(({ LeadForm }) => (
              <LeadForm 
                isVisible={showLeadForm.value} 
                onClose$={handleCloseModal}
                onSuccess$={handleShowToast}
              />
            ))
            .catch(error => {
              console.error('Error loading lead form:', error);
              handleCloseModal();
              return null;
            })
          }
        </div>
      )}

      {showToast.value && (
        <Toast
          onClose$={handleHideToast}
          duration={5000}
        />
      )}
    </div>
  );
});
