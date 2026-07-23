// components/Breadcrumb.tsx
'use client'  // ← FONTOS!

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter()

  const handleBreadcrumbClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    
    // JELEZZÜK, hogy belső navigáció történik
    sessionStorage.setItem('internalNavigation', 'true')
    
    // Navigálás
    router.push(href)
  }

  return (
    <div className="breadcrumb-bar">
      <div className="breadcrumb-bar-inner">
        <ol className="breadcrumb-bar-list">
          {items.map((item, index) => (
            <li key={item.href} className="breadcrumb-bar-item">
              {index > 0 && <span className="breadcrumb-bar-sep">/</span>}
              {index === items.length - 1 ? (
                <span className="breadcrumb-bar-current">{item.label}</span>
              ) : (
                <a
                  href={item.href}
                  className="breadcrumb-bar-link"
                  onClick={(e) => handleBreadcrumbClick(e, item.href)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}