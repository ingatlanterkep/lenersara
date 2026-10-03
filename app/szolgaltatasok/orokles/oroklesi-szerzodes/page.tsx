import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tartalom feltöltés alatt | Ügyvédi Megoldás',
  description:
    'Az oldal tartalma jelenleg feltöltés alatt áll. Kérjük, látogasson vissza később.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ContentComingSoonPage() {
  return (
    <div className="section page-content">
      <div className="container">

        <div className="section-card">

          <div className="prose" style={{ maxWidth: '100%' }}>
            <h1 className="typo-h2-decorated">
              Tartalom feltöltés alatt
              <span className="decorative-line"></span>
              <span className="decorative-dot">●</span>
            </h1>

            <p>
              Az oldal részletes tartalma jelenleg feltöltés alatt áll.
              Kérjük, látogasson vissza később.
            </p>

            <p>
              Amennyiben jogi kérdésben segítségre van szüksége,
              személyes vagy online konzultációra is lehetőség van.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Link href="/#kapcsolat" className="btn btn-accent">
              Konzultáció kérése
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}