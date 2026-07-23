// contexts/ScrollContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface ScrollContextType {
  shouldShowHero: boolean
  setShouldShowHero: (value: boolean) => void
  saveScrollPosition: (path: string, position: number) => void
  getScrollPosition: (path: string) => number
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [shouldShowHero, setShouldShowHero] = useState(true)
  const pathname = usePathname()
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({})

  // Oldal váltáskor mentjük az aktuális pozíciót
  useEffect(() => {
    const saveCurrentPosition = () => {
      if (pathname) {
        setScrollPositions(prev => ({
          ...prev,
          [pathname]: window.scrollY
        }))
      }
    }

    window.addEventListener('beforeunload', saveCurrentPosition)
    window.addEventListener('scroll', saveCurrentPosition)

    return () => {
      window.removeEventListener('beforeunload', saveCurrentPosition)
      window.removeEventListener('scroll', saveCurrentPosition)
    }
  }, [pathname])

  // Oldal betöltésekor visszaállítjuk a pozíciót
  useEffect(() => {
    if (pathname && scrollPositions[pathname] !== undefined) {
      // Ha van mentett pozíció, oda görgetünk
      window.scrollTo(0, scrollPositions[pathname])
      // és elrejtjük a Hero-t, ha nem a tetején vagyunk
      setShouldShowHero(scrollPositions[pathname] < 100)
    } else {
      // Ha nincs mentett pozíció, mutassuk a Hero-t
      setShouldShowHero(true)
    }
  }, [pathname, scrollPositions])

  const saveScrollPosition = (path: string, position: number) => {
    setScrollPositions(prev => ({
      ...prev,
      [path]: position
    }))
  }

  const getScrollPosition = (path: string) => {
    return scrollPositions[path] || 0
  }

  return (
    <ScrollContext.Provider value={{
      shouldShowHero,
      setShouldShowHero,
      saveScrollPosition,
      getScrollPosition
    }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}