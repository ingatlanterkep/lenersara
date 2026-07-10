// components/Hero.tsx
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  phone?: string
  email?: string
  openingHours?: string
  imageSrc?: string
  imageAlt?: string
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  phone = '+36 30 123 4567',
  email = 'info@domainem.hu',
  openingHours = 'Hétfő-Péntek: 9:00 - 18:00',
  imageSrc = '/images/dr-léner-pintér-sára-ügyvédasszony.png',
  imageAlt = 'dr. Léner-Pintér Sára ügyvédasszony'
}: HeroProps) {
  return (
    <div className="hero">
      <div className="container hero-container">
        {/* BAL OLDAL - Tartalom */}
        <div className="hero-content">
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}

          {description && <p className="hero-description">{description}</p>}
          
          <div className="hero-buttons">
            {ctaText && ctaLink && (
              <Link href={ctaLink} className="btn btn-primary">
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink} className="btn btn-secondary">
                {secondaryCtaText}
              </Link>
            )}
          </div>

          {/* Citátum */}
          <blockquote className="hero-quote">
            <p>"Az ügyvéd igazi feladata megbékíteni egymással a szemben álló feleket."</p>
            <footer>— Mahatma Gandhi</footer>
          </blockquote>
        </div>

        {/* JOBB OLDAL - Fotó */}
        <div className="hero-image-wrapper">
          <div className="hero-image-frame">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={500}
              height={600}
              className="hero-image"
              priority
            />
            <div className="hero-image-badge">
              <span>25+ év tapasztalat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}