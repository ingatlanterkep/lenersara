// components/HomeTemplate.tsx
'use client'

import Hero from './Hero'
import ServiceGrid from './ServiceGrid'
import Author from './Author'
import ContactInfo from './ContactInfo'
import FAQ from './FAQ'
import Testimonials from './Testimonials'

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

interface HomeTemplateProps {
  services: Service[]
  specialServices?: SpecialService[]
  trustItems: { icon: string; text: string }[]
  faqItems: { question: string; answer: string }[]
  testimonials?: { rating: number; text: string; author: string }[]
}

export default function HomeTemplate({ 
  services, 
  specialServices = [],
  trustItems, 
  faqItems, 
  testimonials 
}: HomeTemplateProps) {
  return (
    <>
      <div className="hero-section" id="fooldal">
        <Hero
          title="dr. Léner-Pintér Sára"
          subtitle="Egyéni ügyvéd, mediátor"
          description="Veszprémi ügyvédi irodámban széleskörű jogi segítséget nyújtok családjogi, ingatlanjogi és öröklési ügyekben. Több mint 25 éves tapasztalatommal támogatom ügyfeleimet a jogi helyzetükben. A személyes konzultáció mellett online elérhetőség is biztosított."
          phone="+36 20 490 5530"
          email="drlpsmobil@gmail.com"
          imageSrc="/images/dr-léner-pintér-sára.png"
          imageAlt="dr. Léner-Pintér Sára - ügyvéd, mediátor"
          hideOnInternal={false}
        />
      </div>

      <div className="section page-content">
        <div className="container">
          <div className="section-card" id="szolgaltatasok">
            <ServiceGrid
              services={services}
              specialServices={specialServices}
              title="Jogi szolgáltatások"
              subtitle="Átfogó jogi segítségnyújtás magánszemélyek és vállalkozások számára"
            />
          </div>

          <div className="section-card" id="rolam" style={{ marginTop: '2rem' }}>
            <Author />
          </div>
          
          {testimonials && testimonials.length > 0 && (
            <div className="section-card" style={{ marginTop: '2rem' }}>
              <Testimonials items={testimonials} />
            </div>
          )}

          <div className="section-card" id="kapcsolat" style={{ marginTop: '2rem' }}>
            <ContactInfo
              phone="+36 20 490 5530"
              email="drlpsmobil@gmail.com"
              address="8200 Veszprém, Füredi u. 11."
              openingHoursDetailed={[
                { day: 'Hétfő', hours: 'Zárva', isClosed: true },
                { day: 'Kedd', hours: '9:00–17:00' },
                { day: 'Szerda', hours: '9:00–17:00' },
                { day: 'Csütörtök', hours: '9:00–17:00' },
                { day: 'Péntek', hours: '9:00–14:00' },
                { day: 'Szombat', hours: 'Zárva', isClosed: true },
                { day: 'Vasárnap', hours: 'Zárva', isClosed: true },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="faq-section-blue-full">
        <div className="container">
          <FAQ items={faqItems} title="Gyakori kérdések" blue />
        </div>
      </div>
    </>
  )
}