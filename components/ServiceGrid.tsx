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

interface SpecialService extends Service {
  subtitle?: string
  ctaText?: string
}

interface ServiceGridProps {
  services: Service[]
  specialServices?: SpecialService[]
  title?: string
  subtitle?: string
}

export default function ServiceGrid({ 
  services, 
  specialServices = [],
  title = 'Szolgáltatásaink',
  subtitle 
}: ServiceGridProps) {
  
  const handleServiceClick = () => {
    sessionStorage.setItem('internalNavigation', 'true')
  }

  // Összes szolgáltatás (normál + speciális) egy listában
  const allServices = [...services, ...specialServices]

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
        {allServices.map((service) => {
          // Ellenőrizzük, hogy special service-e
          const isSpecial = specialServices.some(s => s.title === service.title)
          
          return (
            <Link 
              key={service.title} 
              href={service.href} 
              className="service-card-modern"
              onClick={handleServiceClick}
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
                  <span className="service-card-tag">
                    {isSpecial ? '⭐ Kiemelt' : service.title}
                  </span>
                </div>
              </div>
              <div className="service-card-content">
                <h3 className="typo-service-title">
                  {service.title}
                  {isSpecial && (
                    <span style={{ 
                      fontSize: '0.7rem', 
                      color: '#7c3aed', 
                      marginLeft: '0.5rem',
                      fontWeight: 600,
                      background: '#ede9fe',
                      padding: '0.15rem 0.6rem',
                      borderRadius: '12px',
                      display: 'inline-block'
                    }}>
                      Speciális
                    </span>
                  )}
                </h3>
                {(service as SpecialService).subtitle && (
                  <p style={{ 
                    color: '#6b21a5', 
                    fontWeight: 500, 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {(service as SpecialService).subtitle}
                  </p>
                )}
                <p className="typo-service-description">{service.description}</p>
                <div className="service-card-footer">
                  <span className="typo-service-link">
                    {(service as SpecialService).ctaText || 'Tovább a részletekhez →'}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}