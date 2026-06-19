'use client';

import Link from 'next/link';

// Vármegye -> városok mapping (átemelve a RelatedLinks-ből)
const countyCities: Record<string, string[]> = {
  'Pest vármegye': ['Érd', 'Budaörs', 'Szentendre', 'Gödöllő', 'Vác', 'Dunakeszi', 'Szigetszentmiklós', 'Vecsés', 'Gyál', 'Monor', 'Cegléd', 'Nagykőrös'],
  'Hajdú-Bihar vármegye': ['Debrecen', 'Hajdúböszörmény', 'Hajdúszoboszló', 'Balmazújváros', 'Püspökladány', 'Hajdúnánás'],
  'Győr-Moson-Sopron vármegye': ['Győr', 'Sopron', 'Mosonmagyaróvár', 'Csorna', 'Kapuvár', 'Tét'],
  'Baranya vármegye': ['Pécs', 'Komló', 'Mohács', 'Szigetvár', 'Siklós', 'Szentlőrinc'],
  'Borsod-Abaúj-Zemplén vármegye': ['Miskolc', 'Ózd', 'Kazincbarcika', 'Sátoraljaújhely', 'Tiszaújváros', 'Szerencs'],
  'Szabolcs-Szatmár-Bereg vármegye': ['Nyíregyháza', 'Mátészalka', 'Kisvárda', 'Vásárosnamény', 'Fehérgyarmat'],
  'Bács-Kiskun vármegye': ['Kecskemét', 'Baja', 'Kiskunfélegyháza', 'Kiskunhalas', 'Kalocsa'],
  'Békés vármegye': ['Békéscsaba', 'Gyula', 'Orosháza', 'Szarvas', 'Békés'],
  'Csongrád-Csanád vármegye': ['Szeged', 'Hódmezővásárhely', 'Makó', 'Csongrád', 'Szentes'],
  'Fejér vármegye': ['Székesfehérvár', 'Dunaújváros', 'Mór', 'Gárdony', 'Sárbogárd'],
  'Heves vármegye': ['Eger', 'Gyöngyös', 'Hatvan', 'Füzesabony', 'Heves'],
  'Komárom-Esztergom vármegye': ['Tatabánya', 'Esztergom', 'Komárom', 'Oroszlány', 'Bábolna'],
  'Nógrád vármegye': ['Salgótarján', 'Balassagyarmat', 'Pásztó', 'Bátonyterenye'],
  'Somogy vármegye': ['Kaposvár', 'Siófok', 'Marcali', 'Nagyatád', 'Barcs'],
  'Tolna vármegye': ['Szekszárd', 'Paks', 'Dombóvár', 'Bonyhád', 'Tolna'],
  'Vas vármegye': ['Szombathely', 'Körmend', 'Celldömölk', 'Sárvár', 'Kőszeg'],
  'Veszprém vármegye': ['Veszprém', 'Pápa', 'Ajka', 'Balatonfüred', 'Balatonalmádi'],
  'Zala vármegye': ['Zalaegerszeg', 'Nagykanizsa', 'Keszthely', 'Lenti', 'Letenye'],
  'Jász-Nagykun-Szolnok vármegye': ['Szolnok', 'Jászberény', 'Törökszentmiklós', 'Karcag', 'Mezőtúr']
};

const countyToSlug: Record<string, string> = {
  'Pest vármegye': 'pest-varmegye',
  'Hajdú-Bihar vármegye': 'hajdu-bihar-varmegye',
  'Győr-Moson-Sopron vármegye': 'gyor-moson-sopron-varmegye',
  'Baranya vármegye': 'baranya-varmegye',
  'Borsod-Abaúj-Zemplén vármegye': 'borsod-abauj-zemplen-varmegye',
  'Szabolcs-Szatmár-Bereg vármegye': 'szabolcs-szatmar-bereg-varmegye',
  'Bács-Kiskun vármegye': 'bacs-kiskun-varmegye',
  'Békés vármegye': 'bekes-varmegye',
  'Csongrád-Csanád vármegye': 'csongrad-csanad-varmegye',
  'Fejér vármegye': 'fejer-varmegye',
  'Heves vármegye': 'heves-varmegye',
  'Komárom-Esztergom vármegye': 'komarom-esztergom-varmegye',
  'Nógrád vármegye': 'nograd-varmegye',
  'Somogy vármegye': 'somogy-varmegye',
  'Tolna vármegye': 'tolna-varmegye',
  'Vas vármegye': 'vas-varmegye',
  'Veszprém vármegye': 'veszprem-varmegye',
  'Zala vármegye': 'zala-varmegye',
  'Jász-Nagykun-Szolnok vármegye': 'jasz-nagykun-szolnok-varmegye'
};

const ALL_TYPES = [
  { slug: 'lakas', name: 'lakás', display: 'lakások' },
  { slug: 'haz', name: 'ház', display: 'házak' },
  { slug: 'telek', name: 'telek', display: 'telkek' },
  { slug: 'iroda', name: 'iroda', display: 'irodák' },
  { slug: 'garazs', name: 'garázs', display: 'garázsok' },
  { slug: 'nyaralo', name: 'nyaraló', display: 'nyaralók' },
];

const budapestDistricts = [
  'budapest-i-kerulet', 'budapest-ii-kerulet', 'budapest-iii-kerulet',
  'budapest-iv-kerulet', 'budapest-v-kerulet', 'budapest-vi-kerulet',
  'budapest-vii-kerulet', 'budapest-viii-kerulet', 'budapest-ix-kerulet',
  'budapest-x-kerulet', 'budapest-xi-kerulet', 'budapest-xii-kerulet',
  'budapest-xiii-kerulet', 'budapest-xiv-kerulet', 'budapest-xv-kerulet',
  'budapest-xvi-kerulet', 'budapest-xvii-kerulet', 'budapest-xviii-kerulet',
  'budapest-xix-kerulet', 'budapest-xx-kerulet', 'budapest-xxi-kerulet',
  'budapest-xxii-kerulet', 'budapest-xxiii-kerulet'
];

function formatDistrictName(district: string): string {
  return district
    .replace(/^budapest-/i, '')
    .replace(/-kerulet$/, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function HomePageSEO() {
  return (
    <div className="seo-below-map-section">
      <div className="container relative z-10 mx-auto px-4 py-12 max-w-7xl">
        <div className="article-wrapper bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">
          
          {/* ===== H1 ÉS BEVEZETŐ ===== */}
          <h1 className="seo-h1">Ingatlan-Térkép – Keressen otthonokat Magyarország térképén</h1>
          
          <div className="seo-intro">
            <p>
              Az <strong>Ingatlan-Térkép</strong> segítségével egyszerűen és gyorsan 
              találhat eladó vagy kiadó ingatlanokat Magyarország bármely pontján. 
              Az interaktív térképen azonnal láthatja az ingatlanok pontos helyét, 
              a környékbeli infrastruktúrát és a valós idejű árakat.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              Böngésszen <strong>50.000+ aktív ingatlanhirdetés</strong> között, 
              szűrjön ár, méret, szobaszám és lokáció szerint, és találja meg 
              álmai otthonát vagy következő befektetését!
            </p>
          </div>

          {/* ===== STATISZTIKAI KÁRTYÁK ===== */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-number">50.000+</div>
              <div className="stat-label">aktív hirdetés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">város és település</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">térképes keresés</div>
            </div>
          </div>

          {/* ===== KATEGÓRIA GYORS GOMBOK ===== */}
          <div className="seo-cta-buttons" style={{ marginBottom: '2rem' }}>
            <a href="/elado/lakas" className="btn-primary">🏠 Eladó lakások</a>
            <a href="/kiado/lakas" className="btn-secondary">🔑 Kiadó lakások</a>
            <a href="/elado/haz" className="btn-tertiary">🏡 Eladó házak</a>
          </div>

          {/* ===== NÉPSZERŰ VÁROSOK (BELSŐ LINKELÉS) ===== */}
          <div className="seo-recommended">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              📍 Népszerű városok – keressen ingatlant itt is
            </h2>
            <div className="quick-search-grid">
              {Object.entries(countyCities).slice(0, 6).map(([county, cities]) => (
                <div key={county} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.25rem',
                  padding: '0.5rem',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong style={{ fontSize: '0.75rem', color: '#666' }}>{county}</strong>
                  {cities.slice(0, 3).map(city => {
                    const slug = city.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link 
                        key={city} 
                        href={`/elado/lakas/${slug}`}
                        className="quick-search-btn"
                        style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                      >
                        <span className="btn-text">{city}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* ===== BUDAPEST KERÜLETEK ===== */}
          <div className="seo-recommended">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              🏙️ Budapest kerületei
            </h2>
            <div className="quick-search-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {budapestDistricts.map(district => (
                <Link 
                  key={district} 
                  href={`/elado/lakas/${district}`}
                  className="quick-search-btn"
                  style={{ flex: '0 0 auto' }}
                >
                  <span className="btn-text">{formatDistrictName(district)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ===== TELJES LISTA - MINDEN VÁRMEGYE ===== */}
          <div className="seo-recommended">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              📌 Összes vármegye
            </h2>
            <div className="quick-search-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {Object.entries(countyToSlug).map(([name, slug]) => (
                <Link 
                  key={slug} 
                  href={`/elado/lakas/${slug}`}
                  className="quick-search-btn"
                  style={{ flex: '0 0 auto' }}
                >
                  <span className="btn-text">{name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ===== MIÉRT TÉRKÉPEN KERESS? ===== */}
          <div className="seo-recommended" style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              🗺️ Miért érdemes térképen keresni?
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <li style={{ padding: '0.5rem', background: '#f0f7ff', borderRadius: '8px' }}>
                <strong>📍 Pontos hely</strong><br />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>Lásd az ingatlan pontos fekvését utca és házszám szinten.</span>
              </li>
              <li style={{ padding: '0.5rem', background: '#f0f7ff', borderRadius: '8px' }}>
                <strong>🏪 Környékbeli szolgáltatások</strong><br />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>Iskolák, boltok, tömegközlekedés egy pillantás alatt.</span>
              </li>
              <li style={{ padding: '0.5rem', background: '#f0f7ff', borderRadius: '8px' }}>
                <strong>💰 Árösszehasonlítás</strong><br />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>Tudd meg, mennyibe kerül a környékbeli ingatlan.</span>
              </li>
              <li style={{ padding: '0.5rem', background: '#f0f7ff', borderRadius: '8px' }}>
                <strong>🚶 Street View</strong><br />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>Nézd meg a környéket a Google Street View segítségével.</span>
              </li>
            </ul>
          </div>

          {/* ===== BLOG POSZTOK HÍRFEED ===== */}
          <div className="seo-recommended" style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              📰 Legfrissebb híreink és elemzéseink
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Link href="/blog" style={{ color: '#0078A8', fontWeight: 500, textDecoration: 'none' }}>
                  Melyik kerület a legjobb befektetésre?
                </Link>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                  Tudd meg, hol érdemes ingatlant vásárolni 2026-ban.
                </p>
              </div>
              <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Link href="/blog" style={{ color: '#0078A8', fontWeight: 500, textDecoration: 'none' }}>
                  Lakás vagy ház? Melyiket válaszd?
                </Link>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                  Összehasonlítottuk a két ingatlantípust.
                </p>
              </div>
              <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <Link href="/blog" style={{ color: '#0078A8', fontWeight: 500, textDecoration: 'none' }}>
                  Ingatlanárak alakulása 2026-ban
                </Link>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                  Hogyan változnak az árak az év során?
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}