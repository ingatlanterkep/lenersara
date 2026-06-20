'use client';

import Link from 'next/link';
import { allArticles } from './AllArticles';
import { Post } from '@/types/post';

// Vármegye -> városok mapping
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

interface HomePageSEOProps {
  seoQuickPosts?: Post[];
}

export default function HomePageSEO({ seoQuickPosts = [] }: HomePageSEOProps) {
  const latestArticles = allArticles.slice(0, 3);

  // Segédfüggvények a kártyákhoz
  const generateSlug = (title: string) => {
    if (!title) return 'unknown';
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath || typeof imagePath !== 'string') return '/placeholder.jpg';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
    return `${baseUrl}${imagePath}`;
  };

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
              Böngésszen <strong>100.000+ aktív ingatlanhirdetés</strong> között 
              <strong>2000+ városból</strong>, szűrjön ár, méret, szobaszám és lokáció szerint, 
              és találja meg álmai otthonát vagy következő befektetését!
            </p>
          </div>

          {/* ===== STATISZTIKAI KÁRTYÁK ===== */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-number">100.000+</div>
              <div className="stat-label">aktív hirdetés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2000+</div>
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

          {/* ===== FRISS HIRDETÉSEK - AHOGY A GYŰJTŐOLDALON IS ===== */}
          {seoQuickPosts && seoQuickPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#0078A8] mb-6 text-center">
                🏠 Frissen felkerült ingatlanok
              </h2>
              <div className="similar-posts-grid">
                {seoQuickPosts.slice(0, 12).map((post: Post) => (
                  <a
                    key={post._id}
                    href={`/ingatlan/${post._id}/${generateSlug(post.title || '')}`}
                    className="similar-post-card"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="similar-post-image">
                      {post.images && post.images.length > 0 ? (
                        <img
                          src={getFullImageUrl(post.images[0].url)}
                          alt={post.title || ''}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="no-image">Nincs kép</div>
                      )}
                    </div>
                    <div className="similar-post-content">
                      <h3 className="text-sm font-semibold line-clamp-2">{post.title || 'Nincs cím'}</h3>
                      <p className="similar-post-price font-bold text-[#0078A8]">
                        {post.listing_type === 'elado' || post.listing_type === 'eladó'
                          ? `${Math.round((post.price || 0))} M Ft`
                          : `${Math.round((post.rental_price || 0))} E Ft/hó`}
                      </p>
                      {post.area && post.area > 0 && (
                        <p className="similar-post-area text-xs text-gray-600">Terület: {post.area} m²</p>
                      )}
                      <p className="similar-post-address text-xs text-gray-500">
                        {post.address?.city || ''}{post.address?.region ? `, ${post.address.region}` : ''}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ===== NÉPSZERŰ VÁROSOK ===== */}
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

          {/* ===== LEGNÉPSZERŰBB KERESÉSEK ===== */}
          <div className="seo-recommended" style={{ marginTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              🔥 Legnépszerűbb ingatlankeresések
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                { text: 'Eladó lakás Budapest', href: '/elado/lakas/budapest' },
                { text: 'Eladó ház Budapest', href: '/elado/haz/budapest' },
                { text: 'Kiadó lakás Budapest', href: '/kiado/lakas/budapest' },
                { text: 'Eladó lakás Debrecen', href: '/elado/lakas/debrecen' },
                { text: 'Eladó ház Debrecen', href: '/elado/haz/debrecen' },
                { text: 'Eladó lakás Szeged', href: '/elado/lakas/szeged' },
                { text: 'Eladó lakás Pécs', href: '/elado/lakas/pecs' },
                { text: 'Eladó lakás Győr', href: '/elado/lakas/gyor' },
                { text: 'Eladó lakás Miskolc', href: '/elado/lakas/miskolc' },
                { text: 'Eladó lakás Nyíregyháza', href: '/elado/lakas/nyiregyhaza' },
                { text: 'Eladó ház Székesfehérvár', href: '/elado/haz/szekesfehervar' },
                { text: 'Eladó lakás Kecskemét', href: '/elado/lakas/kecskemet' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="quick-search-btn"
                  style={{ flex: '0 0 auto' }}
                >
                  <span className="btn-text">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ===== MEGYÉK ===== */}
          <div className="seo-recommended" style={{ marginTop: '1.5rem' }}>
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

          {/* ===== FAQ ===== */}
          <div className="seo-recommended" style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              ❓ Gyakori kérdések
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>
                  Hogyan működik a térképes ingatlankereső?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                  Az Ingatlan-Térkép interaktív térképen jeleníti meg az eladó és kiadó ingatlanokat. 
                  Kattintson a térképen egy pontra a hirdetés részleteiért, vagy használja a szűrőket 
                  a keresés pontosításához.
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>
                  Melyik kerületben érdemes lakást venni Budapesten?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                  A legnépszerűbb kerületek: XIII. kerület (Újlipótváros), XI. kerület (Újbuda), 
                  II. kerület (Rózsadomb), V. kerület (Belváros). Mindegyik más-más előnyökkel 
                  rendelkezik, érdemes a saját igények szerint választani.
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>
                  Hogyan találhatok olcsóbb ingatlant?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                  Érdemes a fővároson kívüli városokban (Debrecen, Szeged, Pécs, Győr) vagy 
                  Budapest külső kerületeiben (XV., XVI., XVII., XVIII., XIX., XX., XXI., XXIII.) 
                  keresgélni, ahol alacsonyabbak az árak.
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>
                  Milyen településeken kereshetek?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                  Több mint 2000 város és település érhető el a térképen, Budapest összes kerületével 
                  és az összes megyével együtt.
                </p>
              </div>
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

          {/* ===== 3 LEGFRISSEBB BLOG POSZT ===== */}
          <div className="seo-recommended" style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#0078A8' }}>
              📰 Legfrissebb híreink és elemzéseink
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {latestArticles.map((article) => (
                <Link 
                  key={article.slug} 
                  href={`/blog/${article.slug}`}
                  style={{ 
                    display: 'block',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: '#fff'
                  }}
                  className="hover:shadow-md hover:border-[#0078A8]"
                >
                  {article.image && (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      style={{ 
                        width: '100%', 
                        height: '120px', 
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '0.75rem'
                      }}
                      loading="lazy"
                    />
                  )}
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: '#0078A8',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: '#666',
                    marginBottom: '0.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {article.excerpt}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#999' }}>
                    {article.author} • {article.date}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}