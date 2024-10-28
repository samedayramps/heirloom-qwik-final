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

  // Handler for opening modal
  const handleOpenModal = $(() => {
    showLeadForm.value = true;
  });

  // Handler for closing modal
  const handleCloseModal = $(() => {
    showLeadForm.value = false;
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
        
        {/* Lead Form Modal */}
        {showLeadForm.value && (
          <LeadForm onClose$={handleCloseModal} />
        )}
      </body>
    </QwikCityProvider>
  );
});
