// components/Hero.tsx - TELJESEN ÚJ VERZIÓ
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useHeroVisibility } from '@/components/HeroVisibilityContext'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  phone?: string
  email?: string
  imageSrc?: string
  imageAlt?: string
  hideOnInternal?: boolean
  className?: string // Új prop
}

export default function Hero({
  title,
  subtitle,
  description,
  phone = '+36 20 490 5530',
  email = 'drlpsmobil@gmail.com',
  imageSrc = '/images/dr-léner-pintér-sára.png',
  imageAlt = 'dr. Léner-Pintér Sára',
  hideOnInternal = true,
  className = ''
}: HeroProps) {
  const [showPhone, setShowPhone] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const { isHeroVisible } = useHeroVisibility()

  // Ha el kell rejteni, NE rendereljünk SEMMIT
  if (hideOnInternal && !isHeroVisible) {
    return null
  }

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      window.location.href = `tel:${phone.replace(/\s/g, '')}`
      return
    }
    e.preventDefault()
    setShowPhone(!showPhone)
    setShowEmail(false)
  }

  const handleEmailClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      window.location.href = `mailto:${email}`
      return
    }
    e.preventDefault()
    setShowEmail(!showEmail)
    setShowPhone(false)
  }

  return (
    <div className={`hero ${className}`}>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {description && <p className="hero-description">{description}</p>}

          <blockquote className="hero-quote">
            <p>Az ügyvéd igazi feladata megbékíteni egymással a szemben álló feleket.</p>
            <footer>— Mahatma Gandhi</footer>
          </blockquote>

          <div className="hero-buttons">
            <button onClick={handlePhoneClick} className="btn btn-primary">
              Hívjon
            </button>
            <button onClick={handleEmailClick} className="btn btn-secondary">
              Írjon
            </button>
          </div>

          {showPhone && (
            <div className="hero-contact-reveal">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hero-contact-link">
                {phone}
              </a>
            </div>
          )}
          {showEmail && (
            <div className="hero-contact-reveal">
              <a href={`mailto:${email}`} className="hero-contact-link">
                {email}
              </a>
            </div>
          )}
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-frame">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={560}
              height={720}
              className="hero-image"
              priority
            />
          </div>
        </div>

        <div className="hero-right-points">
          {/* Pontok itt lehetnek */}
        </div>
      </div>
    </div>
  )
}