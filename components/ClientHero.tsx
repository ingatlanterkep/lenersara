// components/ClientHero.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ClientHero({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Ellenőrizzük, hogy a felhasználó melyik oldalról jött
    const referrer = document.referrer
    const isInternalNavigation = referrer.includes(window.location.hostname)
    
    // Ha belső navigáció és nem a főoldal, rejtsük el a Hero-t
    if (isInternalNavigation && pathname !== '/') {
      setIsVisible(false)
      // 500ms múlva visszaállítjuk (hogy a következő navigációnál újra látszódjon)
      setTimeout(() => setIsVisible(true), 500)
    } else {
      setIsVisible(true)
    }
  }, [pathname])

  return (
    <div className={`hero-section ${isVisible ? 'visible' : 'hidden'}`}>
      {children}
    </div>
  )
}