// components/HomeTemplate.tsx
import Hero from './Hero'
import TrustBar from './TrustBar'
import ServiceGrid from './ServiceGrid'
import AuthorFull from './AuthorFull'
import ContactInfo from './ContactInfo'
import FAQ from './FAQ'

interface Service {
  title: string
  description: string
  href: string
  icon: string
}

interface HomeTemplateProps {
  services: Service[]
  trustItems: { icon: string; text: string }[]
  faqItems: { question: string; answer: string }[]
}

export default function HomeTemplate({ services, trustItems, faqItems }: HomeTemplateProps) {
  return (
    <>
      <div className="hero-section">
<Hero 
  title='Dr. <span class="highlight">Ügyvéd</span> Úr'
  subtitle="Ügyvéd, mediátor"
  description="Több mint 25 éves szakmai tapasztalattal segítek ügyfeleimnek családjogi, ingatlanjogi és öröklési ügyekben. Irodám Veszprém szívében található, de online konzultációra is van lehetőség."
  ctaText="Hívjon most: +36 20 490 5530"
  ctaLink="tel:+36204905530"
  secondaryCtaText="Írjon nekem"
  secondaryCtaLink="/kapcsolat"
  phone="+36 20 490 5530"
  email="drlpsmobil@gmail.com"
  openingHours="Hétfő-Péntek: 9:00 - 18:00"
  imageSrc="/images/dr-léner-pintér-sára-ügyvédasszony.png"
  imageAlt="Dr. Ügyvéd Úr - ügyvéd, mediátor"
/>

        <TrustBar items={trustItems} />
      </div>

      {/* A többi rész változatlan */}
      <div className="section page-content">
        <div className="container">
          <div className="section-card">
            <ServiceGrid 
              services={services}
              title="Jogi szolgáltatások"
              subtitle="Átfogó jogi segítségnyújtás magánszemélyek és vállalkozások számára"
            />
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <AuthorFull />
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <ContactInfo 
              phone="+36 20 490 5530"
              email="drlpsmobil@gmail.com"
              address="8200 Veszprém, Füredi u. 11."
              openingHours="Hétfő-Péntek: 9:00 - 18:00"
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