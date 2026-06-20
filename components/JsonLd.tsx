// app/components/JsonLd.tsx
'use client';

import { useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    // Töröljük a régi script-eket (csak a JSON-LD-ket)
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      // Csak azokat távolítsuk el, amiket mi hoztunk létre (opcionális: ID alapján)
      if (script.id === 'dynamic-jsonld') {
        script.remove();
      }
    });

    // Új script elem létrehozása
    const script = document.createElement('script');
    script.id = 'dynamic-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    // Cleanup: komponens unmountolásakor távolítsuk el
    return () => {
      const scriptToRemove = document.querySelector('#dynamic-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null; // Nem renderelünk semmit
}