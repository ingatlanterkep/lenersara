import { ReactNode } from 'react'
import Hero from './Hero'
import Breadcrumb from './Breadcrumb'
import TrustBar from './TrustBar'
import Timeline from './Timeline'
import FAQ from './FAQ'
import ContactInfo from './ContactInfo'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface TimelineStep {
  number: number
  title: string
  description: string
}

interface FAQItem {
  question: string
  answer: string
}

interface ServiceTemplateProps {
  heroTitle: string
  heroSubtitle: string
  heroCtaText?: string
  heroCtaLink?: string
  breadcrumbItems: BreadcrumbItem[]
  trustItems: { icon: string; text: string }[]
  content: ReactNode
  whenToContact?: {
    title?: string
    items: string[]
    ctaText?: string
    ctaLink?: string
  }
  timelineTitle?: string
  timelineSteps: TimelineStep[]
  faqTitle?: string
  faqItems: FAQItem[]
  structuredData?: Record<string, any>[]
  disclaimer?: string
}

export default function ServiceTemplate({
  heroTitle,
  heroSubtitle,
  heroCtaText = 'Konzultáció kérése',
  heroCtaLink = '/kapcsolat',
  breadcrumbItems,
  trustItems,
  content,
  whenToContact,
  timelineTitle = 'Hogyan zajlik a konzultáció?',
  timelineSteps,
  faqTitle = 'Gyakori kérdések',
  faqItems,
  structuredData,
  disclaimer = 'Az itt található információk általános tájékoztatást szolgálnak, és nem helyettesítik az egyedi jogi tanácsadást. Minden ügy egyedi körülményei miatt érdemes személyes konzultációt kérni.',
}: ServiceTemplateProps) {
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

          {/* "Mikor forduljon ügyvédhez?" - BUBORÉK */}
          {whenToContact && (
            <div className="section-card" style={{ marginTop: '2rem' }}>
              <div className="when-to-contact">
                <h2 className="section-title">
                  {whenToContact.title || 'Mikor érdemes ügyvédhez fordulni?'}
                </h2>
                <ul className="when-to-contact-list">
                  {whenToContact.items.map((item, index) => (
                    <li key={index} className="when-to-contact-item">
                      <span className="when-to-contact-check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="when-to-contact-note">
                  Minden ügy egyedi, ezért a pontos lehetőségeket csak az iratok és a körülmények 
                  áttekintése után lehet megítélni.
                </p>
                <div className="when-to-contact-cta">
                  <Link 
                    href={whenToContact.ctaLink || '/kapcsolat'} 
                    className="btn btn-accent"
                  >
                    {whenToContact.ctaText || 'Konzultáció időpont kérése'}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Timeline - BUBORÉK */}
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <h2 className="section-title">{timelineTitle}</h2>
            <div className="timeline-horizontal">
              {timelineSteps.map((step, index) => (
                <div key={step.number} className="timeline-horizontal-item">
                  <div className="timeline-horizontal-number">{step.number}</div>
                  {index < timelineSteps.length - 1 && (
                    <div className="timeline-horizontal-line" />
                  )}
                  <h3 className="timeline-horizontal-title">{step.title}</h3>
                  <p className="timeline-horizontal-description">{step.description}</p>
                </div>
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

      {/* FAQ - KÉK HÁTTÉR */}
      <div className="faq-section-blue-full">
        <div className="container">
          <FAQ items={faqItems} title={faqTitle} blue />
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