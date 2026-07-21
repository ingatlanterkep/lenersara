import Link from 'next/link'

interface ContactInfoProps {
  phone: string
  email: string
  address: string
  openingHours: string
  mapEmbedUrl?: string
}

export default function ContactInfo({ 
  phone, 
  email, 
  address, 
  openingHours,
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2631.829903378054!2d17.909173976261958!3d47.084804371146674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47699b1a137e19d1%3A0xa20e874601424264!2zZHIuIEzDqW5lci1QaW50w6lyIFPDoXJh!5e1!3m2!1shu!2shu!4v1783619111106!5m2!1shu!2shu" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin'
}: ContactInfoProps) {
  return (
    <>
      <h2 className="typo-h2-decorated">
        Elérhetőség
        <span className="decorative-line"></span>
        <span className="decorative-dot">●</span>
      </h2>
      
      <div className="contact-container">
        {/* BAL OLDAL - Elérhetőségek (nagyobb, olvashatóbb) */}
        <div className="contact-info-list">
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <span className="contact-info-label">Telefon</span>
              <p className="contact-info-value">{phone}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <span className="contact-info-label">Email</span>
              <p className="contact-info-value">{email}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <span className="contact-info-label">Cím</span>
              <p className="contact-info-value">{address}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div>
              <span className="contact-info-label">Fogadási idő</span>
              <p className="contact-info-value">{openingHours}</p>
            </div>
          </div>

          <div className="contact-info-cta-wrapper">
            <Link href="/kapcsolat" className="btn btn-accent typo-btn">
              Kapcsolatfelvétel →
            </Link>
          </div>
        </div>

        {/* JOBB OLDAL - Térkép (szép kerettel) */}
        <div className="contact-map-wrapper">
          <div className="contact-map">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ügyvédi iroda térképe"
            />
          </div>
        </div>
      </div>
    </>
  )
}