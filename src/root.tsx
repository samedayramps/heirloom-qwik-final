import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import Navbar from './components/navbar/navbar';
import { RouterHead } from './components/router-head/router-head';
import { LeadForm } from './components/leadForm/leadForm';
import "./global.css";

const isDev = import.meta.env.MODE === 'development';

export default component$(() => {
  // Add state for modal
  const showLeadForm = useSignal(false);
  const showToast = useSignal(false);

  // Handler for opening modal
  const handleOpenModal = $(() => {
    showLeadForm.value = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  });

  // Handler for closing modal
  const handleCloseModal = $(() => {
    showLeadForm.value = false;
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  });

  // Handler for showing toast
  const handleShowToast = $(() => {
    showToast.value = true;
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />
        <RouterHead />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Ephesis&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body lang="en">
        <Navbar onTalkClick$={handleOpenModal} />
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
        
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
      </body>
    </QwikCityProvider>
  );
});
