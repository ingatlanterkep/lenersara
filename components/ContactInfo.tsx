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
      <h2 className="section-title">Elérhetőség</h2>
      
      <div className="contact-container">
        {/* Bal oldal - Elérhetőségek */}
        <div className="contact-info-list">
          <div className="contact-info-item">
            <span className="contact-info-icon">📞</span>
            <div>
              <h3 className="contact-info-label">Telefon</h3>
              <p className="contact-info-value">{phone}</p>
              <p className="contact-info-note">Hétköznap 8-18 óráig</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-icon">✉️</span>
            <div>
              <h3 className="contact-info-label">Email</h3>
              <p className="contact-info-value">{email}</p>
              <p className="contact-info-note">24 órán belül válaszolok</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-icon">📍</span>
            <div>
              <h3 className="contact-info-label">Cím</h3>
              <p className="contact-info-value">{address}</p>
              <p className="contact-info-note">Veszprém központjában</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-icon">🕐</span>
            <div>
              <h3 className="contact-info-label">Fogadási idő</h3>
              <p className="contact-info-value">{openingHours}</p>
              <p className="contact-info-note">Egyeztetés alapján hétvégén is</p>
            </div>
          </div>
          <div className="contact-info-cta-wrapper">
            <Link href="/kapcsolat" className="btn btn-accent">
              Kapcsolatfelvétel
            </Link>
          </div>
        </div>

        {/* Jobb oldal - Térkép */}
        <div className="contact-map-wrapper">
          <div className="contact-map">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.75rem' }}
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