// contexts/HeroVisibilityContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface HeroVisibilityContextType {
  isHeroVisible: boolean
  setHeroVisible: (visible: boolean) => void
  shouldShowHeroOnPage: (path: string) => boolean
}

const HeroVisibilityContext = createContext<HeroVisibilityContextType | undefined>(undefined)

export function HeroVisibilityProvider({ children }: { children: ReactNode }) {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const pathname = usePathname()

  // Ellenőrizzük, hogy belső navigációból érkeztünk-e
  useEffect(() => {
    const wasInternalNavigation = sessionStorage.getItem('internalNavigation') === 'true'
    const isHomePage = pathname === '/'
    
    console.log('HeroVisibility:', { wasInternalNavigation, isHomePage, pathname }) // Debug
    
    // Ha belső navigáció és nem a főoldal, rejtsük el a Hero-t
    if (wasInternalNavigation && !isHomePage) {
      setIsHeroVisible(false)
    } else {
      setIsHeroVisible(true)
    }
    
    // Töröljük a sessionStorage-t, hogy ne maradjon fenn
    sessionStorage.removeItem('internalNavigation')
  }, [pathname])

  const setHeroVisible = (visible: boolean) => {
    setIsHeroVisible(visible)
  }

  const shouldShowHeroOnPage = (path: string) => {
    const wasInternalNavigation = sessionStorage.getItem('internalNavigation') === 'true'
    if (wasInternalNavigation && path !== '/') {
      return false
    }
    return true
  }

  return (
    <HeroVisibilityContext.Provider value={{
      isHeroVisible,
      setHeroVisible,
      shouldShowHeroOnPage
    }}>
      {children}
    </HeroVisibilityContext.Provider>
  )
}

export function useHeroVisibility() {
  const context = useContext(HeroVisibilityContext)
  if (!context) {
    throw new Error('useHeroVisibility must be used within a HeroVisibilityProvider')
  }
  return context
}