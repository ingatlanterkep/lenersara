// components/CategoryTemplate.tsx
'use client'  // ← EZ FONTOS!

import { ReactNode } from 'react'
import Hero from './Hero'
import Breadcrumb from './Breadcrumb'
import ContactInfo from './ContactInfo'
import SubServiceGrid from './SubServiceGrid'
import ServiceDescription from './ServiceDescription'
import { useHeroVisibility } from '@/components/HeroVisibilityContext'  // ← contexts mappa

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
  introTitle?: string
  introContent: ReactNode
  detailedContent: ReactNode
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
  const { isHeroVisible } = useHeroVisibility()
  
  // Ellenőrizzük, hogy a Hero látszik-e
  const showHero = isHeroVisible

  return (
    <>
      {/* Csak akkor rendereljük a hero-section-t, ha látszik a Hero */}
      {showHero && (
        <div className="hero-section">
          <Hero 
            title={heroTitle}
            subtitle={heroSubtitle}
            description={heroDescription}
            hideOnInternal={true}
          />
        </div>
      )}

      <div className="section page-content">
        <div className="container">
          
          <div className="breadcrumb-wrapper">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="section-card">
            {introTitle && <h2 className="typo-h2-decorated">{introTitle}</h2>}
            <div className="category-intro">
              {introContent}
            </div>
            
            <SubServiceGrid 
              items={subServices}
              title={subServicesTitle}
            />
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <ServiceDescription>
              {detailedContent}
            </ServiceDescription>
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <ContactInfo 
              phone="+36 20 490 5530"
              email="drlpsmobil@gmail.com"
              address="8200 Veszprém, Füredi u. 11."
              openingHours="Hétfő-Péntek: 9:00 - 18:00"
            />
          </div>

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