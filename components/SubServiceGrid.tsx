// components/SubServiceGrid.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

interface SubService {
  title: string
  href: string
  description: string
  icon?: string
}

interface SubServiceGridProps {
  items: SubService[]
  title?: string
  subtitle?: string
}

export default function SubServiceGrid({ 
  items, 
  title = 'Kapcsolódó szolgáltatások',
  subtitle 
}: SubServiceGridProps) {
  
  const handleClick = () => {
    sessionStorage.setItem('internalNavigation', 'true')
  }

  return (
    <div>
      {title && (
        <h2 className="typo-h2-decorated">
          {title}
          <span className="decorative-line"></span>
          <span className="decorative-dot">●</span>
        </h2>
      )}
      {subtitle && <p className="typo-section-subtitle">{subtitle}</p>}
      <div className="service-grid-modern">
        {items.map((service) => (
          <Link 
            key={service.title} 
            href={service.href} 
            className="service-card-modern"
            onClick={handleClick}  // ← EZ KELL!
          >
            <div className="service-card-image-wrapper">
              <Image 
                src={service.icon || '/images/placeholder.png'} 
                alt={service.title}
                width={400}
                height={300}
                className="service-card-image"
                priority={false}
              />
              <div className="service-card-overlay">
                <span className="service-card-tag">{service.title}</span>
              </div>
            </div>
            <div className="service-card-content">
              <h3 className="typo-service-title">{service.title}</h3>
              <p className="typo-service-description">{service.description}</p>
              <div className="service-card-footer">
                <span className="typo-service-link">Részletek →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}