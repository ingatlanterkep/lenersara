import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kapcsolat | Dr. Kovács Péter ügyvéd Veszprém',
  description: 'Vegye fel a kapcsolatot Dr. Kovács Péter ügyvéddel Veszprémben. Telefon, email, cím és online konzultáció.',
}

export default function Kapcsolat() {
  return (
    <div className="section section-white">
      <div className="container">
        <h1 className="section-title">Kapcsolat</h1>
        <p className="section-subtitle">
          Vegye fel velem a kapcsolatot, és egyeztessünk időpontot a személyes konzultációra.
        </p>
        
        <div className="contact-page-grid">
          <div className="contact-page-info">
            <div className="contact-page-item">
              <span className="contact-page-icon">📞</span>
              <div>
                <h3>Telefon</h3>
                <p>+36 20 123 4567</p>
                <p className="contact-page-note">Hétköznap 8:00-18:00</p>
              </div>
            </div>
            
            <div className="contact-page-item">
              <span className="contact-page-icon">✉️</span>
              <div>
                <h3>Email</h3>
                <p>info@ugyvedi-iroda.hu</p>
                <p className="contact-page-note">24 órán belül válaszolok</p>
              </div>
            </div>
            
            <div className="contact-page-item">
              <span className="contact-page-icon">📍</span>
              <div>
                <h3>Cím</h3>
                <p>8200 Veszprém, Fő utca 1.</p>
                <p className="contact-page-note">Veszprém központjában</p>
              </div>
            </div>
            
            <div className="contact-page-item">
              <span className="contact-page-icon">🕐</span>
              <div>
                <h3>Fogadási idő</h3>
                <p>Hétfő-Péntek: 8:00-18:00</p>
                <p className="contact-page-note">Egyeztetés alapján hétvégén is</p>
              </div>
            </div>
            
            <div className="contact-page-item">
              <span className="contact-page-icon">💻</span>
              <div>
                <h3>Online konzultáció</h3>
                <p>Videóhívás keretében</p>
                <p className="contact-page-note">Teams, Zoom, Google Meet</p>
              </div>
            </div>
          </div>
          
          <div className="contact-page-map">
            <div className="contact-page-map-placeholder">
              <span>🗺️</span>
              <p>Google Térkép</p>
              <p className="contact-page-note">(Ide kerül a beágyazott térkép)</p>
            </div>
          </div>
        </div>
        
        <div className="contact-page-form">
          <h2>Írjon üzenetet</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Név</label>
              <input type="text" id="name" placeholder="Adja meg a nevét" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Adja meg az email címét" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefonszám</label>
              <input type="tel" id="phone" placeholder="Adja meg a telefonszámát" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Üzenet</label>
              <textarea id="message" rows={5} placeholder="Írja le röviden a problémáját" />
            </div>
            <button type="submit" className="btn btn-primary">
              Üzenet küldése
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}