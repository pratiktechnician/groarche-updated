import React, { useEffect } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function SEOAndAnalytics() {
  const c = GROARCHE_DATA.company;

  useEffect(() => {
    // Set document title & meta tags dynamically
    document.title = "GroArche Learning Solutions – Developing Human Potential. Delivering Meaningful Performance.";

    // Inject JSON-LD Schema
    const schemaOrg = {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "name": c.name,
      "url": "https://groarche.pro/",
      "logo": "https://groarche.pro/wp-content/uploads/2024/12/cropped-GroArche-logo-192x192.jpg",
      "description": c.heroSubheadline,
      "founder": {
        "@type": "Person",
        "name": GROARCHE_DATA.founder.name,
        "jobTitle": GROARCHE_DATA.founder.title,
        "sameAs": c.socials.linkedin
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": c.address.street,
        "addressLocality": c.address.city,
        "addressRegion": c.address.state,
        "postalCode": c.address.postalCode,
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": c.contact.phoneRaw,
        "contactType": "customer service",
        "email": c.contact.email,
        "availableLanguage": ["English", "Hindi", "Bengali"]
      },
      "sameAs": [
        c.socials.linkedin,
        c.socials.facebook,
        c.socials.instagram
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'groarche-jsonld';
    script.innerHTML = JSON.stringify(schemaOrg);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('groarche-jsonld');
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  return null;
}

// Global Event Analytics Dispatcher
export const trackAnalyticsEvent = (eventName, data = {}) => {
  console.log(`[GroArche Analytics Event]: ${eventName}`, data);
  if (window.gtag) {
    window.gtag('event', eventName, data);
  }
};
