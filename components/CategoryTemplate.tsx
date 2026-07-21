import { ReactNode } from 'react'
import Hero from './Hero'
import Breadcrumb from './Breadcrumb'
import ContactInfo from './ContactInfo'
import SubServiceGrid from './SubServiceGrid'
import ServiceDescription from './ServiceDescription'

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
  heroDescription?: string
  heroCtaText?: string
  heroCtaLink?: string
  breadcrumbItems: BreadcrumbItem[]
  // Bevezető szöveg a kártyák felett (100-200 szó)
  introTitle?: string
  introContent: ReactNode
  // Részletes tartalom (kiterjedtebb írás)
  detailedContent: ReactNode
  // Alkategóriák
  subServicesTitle?: string
  subServices: SubService[]
  structuredData?: Record<string, any>[]
  disclaimer?: string
}

export default function CategoryTemplate({
  heroTitle,
  heroSubtitle,
  heroDescription,
  breadcrumbItems,
  introTitle,
  introContent,
  detailedContent,
  subServicesTitle = 'Részletes szolgáltatások',
  subServices,
  structuredData,
  disclaimer = 'Az itt található információk általános tájékoztatást szolgálnak, és nem helyettesítik az egyedi jogi tanácsadást. Minden ügy egyedi körülményei miatt érdemes személyes konzultációt kérni.',
}: CategoryTemplateProps) {
  return (
    <>
      <div className="hero-section">
        <Hero 
          title={heroTitle}
          subtitle={heroSubtitle}
          description={heroDescription}
        />
      </div>

      <div className="section page-content">
        <div className="container">
          
          <div className="breadcrumb-wrapper">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* 1. SZOLGÁLTATÁS KÁRTYÁK - rövid bevezetővel */}
          <div className="section-card">
            {/* Bevezető */}
            {introTitle && <h2 className="typo-h2-decorated">{introTitle}</h2>}
            <div className="category-intro">
              {introContent}
            </div>
            
            {/* Kártyák */}
            <SubServiceGrid 
              items={subServices}
              title={subServicesTitle}
            />
          </div>

          {/* 2. RÉSZLETES TARTALOM - kiterjedtebb írás */}
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <ServiceDescription>
              {detailedContent}
            </ServiceDescription>
          </div>

          {/* 3. KAPCSOLAT */}
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <ContactInfo 
              phone="+36 20 490 5530"
              email="drlpsmobil@gmail.com"
              address="8200 Veszprém, Füredi u. 11."
              openingHours="Hétfő-Péntek: 9:00 - 18:00"
            />
          </div>

          {/* Disclaimer */}
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