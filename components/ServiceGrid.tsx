// components/ServiceGrid.tsx
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
  return (
    <div>
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="service-grid-modern">
        {services.map((service) => (
          <Link key={service.title} href={service.href} className="service-card-modern">
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
              <h3 className="service-card-title-modern">{service.title}</h3>
              <p className="service-card-description-modern">{service.description}</p>
              <div className="service-card-footer">
                <span className="service-card-link-modern">Tovább a részletekhez →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}