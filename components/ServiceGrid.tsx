// components/ServiceGrid.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Service {
  title: string
  description: string
  href: string
  icon: string
}

interface ServiceGridProps {
  services: Service[]
  title?: string
  subtitle?: string
}

export default function ServiceGrid({ 
  services, 
  title = 'Szolgáltatásaink',
  subtitle 
}: ServiceGridProps) {
  
  const handleServiceClick = () => {
    // JELEZZÜK, hogy belső navigáció történik
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
        {services.map((service) => (
          <Link 
            key={service.title} 
            href={service.href} 
            className="service-card-modern"
            onClick={handleServiceClick}  // ← EZ ÚJ!
          >
            <div className="service-card-image-wrapper">
              <Image 
                src={service.icon} 
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
                <span className="typo-service-link">Tovább a részletekhez →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}