// Declare gtag as a global variable
declare const gtag: Function;

import { onCLS, onFID, onLCP } from 'web-vitals';

if (typeof window !== 'undefined') {
  function sendToAnalytics(metric: any) {
    const { name, value } = metric;
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: name,
      value: Math.round(name === 'CLS' ? value * 1000 : value), // Google Analytics expects integers
      non_interaction: true, // Avoid affecting bounce rate
    });
  }

  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
} 