import { ReactNode } from 'react'
import Hero from './Hero'
import Breadcrumb from './Breadcrumb'
import TrustBar from './TrustBar'
import ContactInfo from './ContactInfo'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface SubService {
  title: string
  href: string
  description: string
  icon?: string
}

interface CategoryTemplateProps {
  heroTitle: string
  heroSubtitle: string
  heroCtaText?: string
  heroCtaLink?: string
  breadcrumbItems: BreadcrumbItem[]
  trustItems: { icon: string; text: string }[]
  content: ReactNode
  subServicesTitle?: string
  subServices: SubService[]
  structuredData?: Record<string, any>[]
  disclaimer?: string
}

export default function CategoryTemplate({
  heroTitle,
  heroSubtitle,
  heroCtaText = 'Konzultáció kérése',
  heroCtaLink = '/kapcsolat',
  breadcrumbItems,
  trustItems,
  content,
  subServicesTitle = 'Részletes szolgáltatások',
  subServices,
  structuredData,
  disclaimer = 'Az itt található információk általános tájékoztatást szolgálnak, és nem helyettesítik az egyedi jogi tanácsadást. Minden ügy egyedi körülményei miatt érdemes személyes konzultációt kérni.',
}: CategoryTemplateProps) {
  return (
    <>
      {/* TELJES KÉPERNYŐMAGASSÁGÚ HERO SZEKCIÓ */}
      <div className="hero-section">
        <Hero 
          title={heroTitle}
          subtitle={heroSubtitle}
          ctaText={heroCtaText}
          ctaLink={heroCtaLink}
        />

        <TrustBar items={trustItems} />
      </div>

      {/* TARTALOM */}
      <div className="section page-content">
        <div className="container">
          
          {/* Breadcrumb */}
          <div className="breadcrumb-wrapper">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Tartalom - BUBORÉK */}
          <div className="section-card">
            <div className="prose" style={{ maxWidth: '100%' }}>
              {content}
            </div>
          </div>

          {/* Alszolgáltatások - BUBORÉK */}
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <h2 className="section-title">{subServicesTitle}</h2>
            <div className="service-grid">
              {subServices.map((service) => (
                <Link 
                  key={service.href} 
                  href={service.href} 
                  className="service-card"
                >
                  {service.icon && <div className="service-card-icon">{service.icon}</div>}
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-description">{service.description}</p>
                  <span className="service-card-link">Részletek →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Elérhetőség - BUBORÉK */}
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <ContactInfo 
              phone="+36 20 123 4567"
              email="info@ugyvedi-iroda.hu"
              address="8200 Veszprém, Fő utca 1."
              openingHours="Hétfő-Péntek: 8:00 - 18:00"
            />
          </div>

          {/* Jogi figyelmeztetés */}
          <div className="disclaimer-wrapper" style={{ marginTop: '1.5rem' }}>
            <div className="alert alert-warning" style={{ fontSize: '0.8rem', opacity: 0.5 }}>
              <p>{disclaimer}</p>
            </div>
          </div>

        </div>
      </div>

      {structuredData && structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
    </>
  )
}