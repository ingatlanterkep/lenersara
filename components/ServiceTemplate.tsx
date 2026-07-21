import { ReactNode } from 'react'
import Hero from './Hero'
import Breadcrumb from './Breadcrumb'
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
  heroDescription: string
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
  heroDescription,
  breadcrumbItems,
  trustItems,
  content,
  whenToContact,
  timelineTitle = 'Hogyan zajlik az eljárás?',
  timelineSteps,
  faqTitle = 'Gyakori kérdések',
  faqItems,
  structuredData,
  disclaimer = 'Az itt található információk általános tájékoztatást szolgálnak, és nem helyettesítik az egyedi jogi tanácsadást. Minden ügy egyedi körülményei miatt érdemes személyes konzultációt kérni.',
}: ServiceTemplateProps) {
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

          <div className="section-card">
            <div className="prose" style={{ maxWidth: '100%' }}>
              {content}
            </div>
          </div>

          {/* "Mikor forduljon ügyvédhez?" */}
          {whenToContact && (
            <div className="section-card" style={{ marginTop: '2rem' }}>
              <div className="when-to-contact">

                        <h2 className="typo-h2-decorated">
                  {whenToContact.title || 'Mikor érdemes ügyvédhez fordulni?'}
        <span className="decorative-line"></span>
        <span className="decorative-dot">●</span>
      </h2>
                <ul className="when-to-contact-list">
                  {whenToContact.items.map((item, index) => (
                    <li key={index} className="when-to-contact-item">
                      <span className="when-to-contact-dot">●</span>
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

{/* Timeline - VÍZSZINTES SZÁMVONAL */}
<div className="section-card" style={{ marginTop: '2rem' }}>
        <h2 className="typo-h2-decorated">
{timelineTitle}
        <span className="decorative-line"></span>
        <span className="decorative-dot">●</span>
      </h2>
  <div className="timeline-numberline">
    <div className="timeline-numberline-track"></div>
    <div className={`timeline-numberline-steps ${timelineSteps.length <= 4 ? `has-${timelineSteps.length}-steps` : ''}`}>
      {timelineSteps.map((step, index) => (
        <div key={step.number} className="timeline-numberline-step">
          <div className="timeline-numberline-dot">
            <span className="timeline-numberline-number">{step.number}</span>
          </div>
          <div className="timeline-numberline-content">
            <h3 className="timeline-numberline-title">{step.title}</h3>
            <p className="timeline-numberline-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
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