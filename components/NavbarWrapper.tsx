// components/NavbarWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isNavbarMenuOpen, setNavbarMenuOpen] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const [isStreetViewMode, setIsStreetViewMode] = useState(false);
  const [viewMode, setViewMode] = useState('map');
  const [showFilterSidebar, setShowFilterSidebar] = useState(true);
  const [showLayerSidebar, setShowLayerSidebar] = useState(true);

  // Függvény a login státusz frissítéséhez
  const updateLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    console.log('[NavbarWrapper] Login status frissítve:', !!token);
  };

  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    setCookiesAccepted(hasConsent);
    
    updateLoginStatus(); // Kezdeti állapot
    
    // FIGYELJÜK a localStorage változásokat
    window.addEventListener('storage', updateLoginStatus);
    
    // FIGYELJÜK a custom event-et (amit a login oldal küldhet)
    window.addEventListener('loginStatusChanged', updateLoginStatus);
    
    return () => {
      window.removeEventListener('storage', updateLoginStatus);
      window.removeEventListener('loginStatusChanged', updateLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Értesítjük a többi komponenst
    window.dispatchEvent(new Event('loginStatusChanged'));
    window.location.href = '/';
  };

  return (
    <Navbar
      cookiesAccepted={cookiesAccepted}
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
      isNavbarMenuOpen={isNavbarMenuOpen}
      setNavbarMenuOpen={setNavbarMenuOpen}
      showFilterSidebar={showFilterSidebar}
      setShowFilterSidebar={setShowFilterSidebar}
      showLayerSidebar={showLayerSidebar}
      setShowLayerSidebar={setShowLayerSidebar}
      isNavbarCollapsed={isNavbarCollapsed}
      setIsNavbarCollapsed={setIsNavbarCollapsed}
      isStreetViewMode={isStreetViewMode}
      setIsStreetViewMode={setIsStreetViewMode}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  );
}