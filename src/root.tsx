import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import Navbar from './components/navbar/navbar';
import { RouterHead } from './components/router-head/router-head';
import "./global.css";

const isDev = import.meta.env.MODE === 'development';

export default component$(() => {
  const showLeadForm = useSignal(false);
  const showToast = useSignal(false);

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

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />
        <RouterHead />
      </head>
      <body lang="en">
        <Navbar onTalkClick$={handleOpenModal} />
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
        
        {/* Dynamically import LeadForm */}
        {showLeadForm.value && (
          <div 
            class="fixed inset-0 z-[100] transition-all duration-300 opacity-100 pointer-events-auto"
          >
            {import('./components/leadForm/leadForm').then(({ LeadForm }) => (
              <LeadForm 
                isVisible={showLeadForm.value} 
                onClose$={handleCloseModal} 
                onSuccess$={handleShowToast}
              />
            ))}
          </div>
        )}
      </body>
    </QwikCityProvider>
  );
});
