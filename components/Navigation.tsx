// components/Navigation.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { scrollToSection } from '../utils/ScrollToSection'

const navigation = [
  {
    name: 'Szolgáltatások',
    href: '/#szolgaltatasok',
    sectionId: 'szolgaltatasok',
    subItems: [
      { name: 'Családjog', href: '/szolgaltatasok/csaladjog' },
      { name: 'Ingatlanjog', href: '/szolgaltatasok/ingatlanjog' },
      { name: 'Öröklési ügyek', href: '/szolgaltatasok/orokles' },
      { name: 'Mediáció', href: '/szolgaltatasok/mediacio' },
      { name: 'Egyéb jogi szolgáltatások', href: '/szolgaltatasok/egyeb' },
    ]
  },
  { 
    name: 'Rólam', 
    href: '/#rolam',
    sectionId: 'rolam' 
  },
  { name: 'Díjszabás', href: '/dijszabas' },
  { name: 'Hasznos információk', href: '/tudastar' },
  { 
    name: 'Kapcsolat', 
    href: '/#kapcsolat',
    sectionId: 'kapcsolat' 
  },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Szolgáltatások gomb kezelése - navigál + lenyit
  const handleServicesClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Megakadályozza a buborékolást
    
    // Váltogatjuk a menü állapotát
    setIsServicesOpen(!isServicesOpen)
    
    // JELEZZÜK, hogy belső navigáció történik
    sessionStorage.setItem('internalNavigation', 'true')
    
    const currentPath = window.location.pathname
    const sectionId = 'szolgaltatasok'
    
    // Ha nem a főoldalon vagyunk, menjünk oda
    if (currentPath !== '/') {
      await router.push('/')
      // Várjunk, amíg betöltődik az oldal
      setTimeout(() => {
        scrollToSection(sectionId)
      }, 300)
    } else {
      // Ha már a főoldalon vagyunk, görgessünk
      const success = scrollToSection(sectionId)
      if (!success) {
        router.push('/')
      }
    }
    
    // Ne zárjuk be a menüt, maradjon nyitva
    // setIsOpen(false) - EZT NE HÍVJUK
  }

  const handleNavigation = async (e: React.MouseEvent, item: typeof navigation[0]) => {
    e.preventDefault()
    
    // JELEZZÜK, hogy belső navigáció történik
    sessionStorage.setItem('internalNavigation', 'true')
    
    // Ha van sectionId, akkor próbáljuk meg a görgetést
    if (item.sectionId) {
      const currentPath = window.location.pathname
      
      // Ha nem a főoldalon vagyunk, menjünk oda először
      if (currentPath !== '/') {
        await router.push('/')
        // Várjunk egy kicsit, amíg betöltődik az oldal
        setTimeout(() => {
          scrollToSection(item.sectionId!)
        }, 300)
      } else {
        // Ha már a főoldalon vagyunk, csak görgessünk
        const success = scrollToSection(item.sectionId!)
        if (!success) {
          router.push('/')
        }
      }
    } else {
      // Ha nincs sectionId, normál navigáció
      router.push(item.href)
    }
    
    setIsOpen(false)
    setIsServicesOpen(false)
  }

  // Almenü navigáció
  const handleSubNavigation = (href: string) => {
    sessionStorage.setItem('internalNavigation', 'true')
    router.push(href)
    setIsOpen(false)
    setIsServicesOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo" onClick={() => {
          sessionStorage.setItem('internalNavigation', 'true')
        }}>
          Ügyvédi Megoldás
        </Link>

        <div className="navbar-menu">
          {navigation.map((item) => (
            <div key={item.name} className="navbar-dropdown">
              {item.subItems ? (
                <>
                  <button
                    className="navbar-dropdown-button"
                    onClick={handleServicesClick}  // ← MÓDOSÍTVA
                  >
                    {item.name}
                  </button>
                  <div className={`navbar-dropdown-menu ${isServicesOpen ? 'open' : ''}`}>
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="navbar-dropdown-item"
                        onClick={(e) => {
                          e.preventDefault()
                          handleSubNavigation(sub.href)
                        }}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  className="navbar-link"
                  onClick={(e) => handleNavigation(e, item)}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navigation.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button
                  className="mobile-menu-item"
                  onClick={(e) => {
                    e.preventDefault()
                    // Mobil menüben is ugyanaz a viselkedés
                    setIsServicesOpen(!isServicesOpen)
                    sessionStorage.setItem('internalNavigation', 'true')
                    const currentPath = window.location.pathname
                    const sectionId = 'szolgaltatasok'
                    
                    if (currentPath !== '/') {
                      router.push('/')
                      setTimeout(() => {
                        scrollToSection(sectionId)
                      }, 300)
                    } else {
                      scrollToSection(sectionId)
                    }
                  }}
                >
                  {item.name}
                </button>
                {isServicesOpen && (
                  <div className="mobile-submenu">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="mobile-submenu-item"
                        onClick={(e) => {
                          e.preventDefault()
                          handleSubNavigation(sub.href)
                        }}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.href}
                className="mobile-menu-item"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(e, item)
                }}
              >
                {item.name}
              </a>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}