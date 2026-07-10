'use client'

import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  {
    name: 'Szolgáltatások',
    href: '/szolgaltatasok',
    subItems: [
      { name: 'Családjog', href: '/szolgaltatasok/csaladjog' },
      { name: 'Ingatlanjog', href: '/szolgaltatasok/ingatlanjog' },
      { name: 'Öröklési ügyek', href: '/szolgaltatasok/orokles' },
      { name: 'Mediáció', href: '/szolgaltatasok/mediacio' },
      { name: 'Egyéb jogi szolgáltatások', href: '/szolgaltatasok/egyeb' },
    ]
  },
  { name: 'Rólam', href: '/rolam' },
  { name: 'Díjszabás', href: '/dijszabas' },
  { name: 'Hasznos információk', href: '/tudastar' },
  { name: 'Kapcsolat', href: '/kapcsolat' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          dr. Léner-Pintér Sára egyéni ügyvéd
        </Link>

        <div className="navbar-menu">
          {navigation.map((item) => (
            <div key={item.name} className="navbar-dropdown">
              {item.subItems ? (
                <>
                  <button
                    className="navbar-dropdown-button"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    {item.name}
                  </button>
                  <div className="navbar-dropdown-menu">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="navbar-dropdown-item"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href} className="navbar-link">
                  {item.name}
                </Link>
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
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  {item.name}
                </button>
                {isServicesOpen && (
                  <div className="mobile-submenu">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="mobile-submenu-item"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className="mobile-menu-item"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}