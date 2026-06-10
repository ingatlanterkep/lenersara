'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RelatedLinksProps {
  listingType: string;
  type: string;
  city: string | null;
}

function getTypeDisplayName(type: string): string {
  const names: Record<string, string> = {
    lakas: 'lakások',
    haz: 'házak',
    iroda: 'irodák',
    telek: 'telkek',
    garazs: 'garázsok',
    nyaralo: 'nyaralók',
  };
  return names[type] || 'ingatlanok';
}

function getTypeSingular(type: string): string {
  const names: Record<string, string> = {
    lakas: 'lakás',
    haz: 'ház',
    iroda: 'iroda',
    telek: 'telek',
    garazs: 'garázs',
    nyaralo: 'nyaraló',
  };
  return names[type] || 'ingatlan';
}

function getListingTypeText(listingType: string): string {
  return listingType === 'elado' ? 'eladó' : 'kiadó';
}

function getOppositeListingType(listingType: string): string {
  return listingType === 'elado' ? 'kiado' : 'elado';
}

// URL dekódoló helper
function decodeCityName(encodedCity: string | null): string | null {
  if (!encodedCity) return null;
  try {
    return decodeURIComponent(encodedCity);
  } catch {
    return encodedCity;
  }
}

// Minden létező ingatlantípus (slug -> display)
const ALL_TYPES = [
  { slug: 'lakas', name: 'lakás', display: 'lakások' },
  { slug: 'haz', name: 'ház', display: 'házak' },
  { slug: 'telek', name: 'telek', display: 'telkek' },
  { slug: 'iroda', name: 'iroda', display: 'irodák' },
  { slug: 'garazs', name: 'garázs', display: 'garázsok' },
  { slug: 'nyaralo', name: 'nyaraló', display: 'nyaralók' },
];

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

// Közeli városok (földrajzilag ésszerűen csoportosítva)
const nearbyCities: Record<string, string[]> = {
  // ===================== BUDAPEST ÉS AGGLOMERÁCIÓ =====================
  'budapest': ['Érd', 'Budaörs', 'Dunakeszi', 'Gödöllő', 'Szentendre', 'Vecsés', 'Szigetszentmiklós'],
  'érd': ['Budaörs', 'Törökbálint', 'Budakeszi', 'Százhalombatta', 'Budapest', 'Diósd'],
  'budaörs': ['Érd', 'Törökbálint', 'Budakeszi', 'Biatorbágy', 'Budapest'],
  'dunakeszi': ['Budapest', 'Gödöllő', 'Szentendre', 'Fót', 'Vác'],
  'gödöllő': ['Budapest', 'Dunakeszi', 'Szentendre', 'Vecsés', 'Maglód'],
  'szentendre': ['Budapest', 'Dunakeszi', 'Vác', 'Pomáz', 'Piliscsaba'],
  'vecsés': ['Budapest', 'Monor', 'Gyömrő', 'Gödöllő'],
  'szigetszentmiklós': ['Budapest', 'Érd', 'Tököl', 'Halásztelek'],
  'biatorbágy': ['Budaörs', 'Törökbálint', 'Érd'],
  'pomáz': ['Szentendre', 'Piliscsaba', 'Budapest'],
  'vác': ['Dunakeszi', 'Szentendre', 'Balassagyarmat'],

  // ===================== BALATON ÉS KÖRNYÉKE =====================
  'siófok': ['Balatonfüred', 'Balatonalmádi', 'Zamárd', 'Balatonlelle', 'Balatonboglár', 'Keszthely'],
  'balatonfüred': ['Siófok', 'Balatonalmádi', 'Tihany', 'Balatonkenese', 'Csopak'],
  'keszthely': ['Hévíz', 'Tapolca', 'Siófok', 'Balatonfüred', 'Zalaegerszeg'],
  'hévíz': ['Keszthely', 'Tapolca', 'Zalaegerszeg'],
  'balatonalmádi': ['Balatonfüred', 'Siófok', 'Balatonkenese'],
  'balatonlelle': ['Siófok', 'Balatonboglár', 'Zamárd'],
  'balatonboglár': ['Balatonlelle', 'Siófok'],
  'zamárdi': ['Siófok', 'Balatonlelle'],
  'tihany': ['Balatonfüred'],
  'tapolca': ['Keszthely', 'Hévíz'],

  // ===================== NAGYVÁROSOK =====================
  'debrecen': ['Hajdúböszörmény', 'Hajdúszoboszló', 'Balmazújváros', 'Püspökladány'],
  'szeged': ['Hódmezővásárhely', 'Makó', 'Szentes', 'Csongrád'],
  'győr': ['Mosonmagyaróvár', 'Sopron', 'Csorna', 'Pápa'],
  'miskolc': ['Ózd', 'Kazincbarcika', 'Szerencs', 'Tiszaújváros', 'Sátoraljaújhely'],
  'pécs': ['Komló', 'Mohács', 'Szigetvár', 'Szentlőrinc'],
  'nyíregyháza': ['Mátészalka', 'Kisvárda', 'Vásárosnamény'],
  'kecskemét': ['Kiskunfélegyháza', 'Lajosmizse', 'Cegléd'],
  'székesfehérvár': ['Dunaújváros', 'Bicske', 'Mór', 'Gárdony'],
  'szombathely': ['Körmend', 'Sárvár', 'Kőszeg'],
  'veszprém': ['Ajka', 'Pápa', 'Balatonfüred', 'Balatonalmádi'],
  'zalaegerszeg': ['Nagykanizsa', 'Keszthely', 'Letenye'],
  'kaposvár': ['Siófok', 'Marcali', 'Nagyatád'],
  'tatabánya': ['Oroszlány', 'Komárom', 'Esztergom'],
  'sopron': ['Győr', 'Mosonmagyaróvár', 'Fertőd'],
  'békéscsaba': ['Gyula', 'Orosháza', 'Békés'],
  'eger': ['Gyöngyös', 'Füzesabony', 'Hatvan'],
  'szolnok': ['Törökszentmiklós', 'Karcag', 'Mezőtúr'],
  'dunaújváros': ['Székesfehérvár', 'Rácalmás', 'Adony'],

  // ===================== TOVÁBBI FONTOS VÁROSOK =====================
  'hajdúböszörmény': ['Debrecen', 'Hajdúszoboszló'],
  'hódmezővásárhely': ['Szeged', 'Makó'],
  'gyula': ['Békéscsaba', 'Orosháza'],
  'oroszlány': ['Tatabánya', 'Komárom'],
  'gyöngyös': ['Eger', 'Hatvan'],
  'nagykanizsa': ['Zalaegerszeg', 'Letenye'],
  'balassagyarmat': ['Vác', 'Salgótarján'],
  'esztergom': ['Tatabánya', 'Komárom'],
  'komárom': ['Tatabánya', 'Esztergom'],
  'cegléd': ['Kecskemét', 'Monor', 'Nagykőrös'],
  'monor': ['Vecsés', 'Cegléd'],
  'orosháza': ['Békéscsaba', 'Gyula', 'Szarvas'],
  'tiszaújváros': ['Miskolc', 'Kazincbarcika'],
  'kazincbarcika': ['Miskolc', 'Ózd', 'Tiszaújváros'],
  'ózd': ['Miskolc', 'Kazincbarcika'],
  'salgótarján': ['Balassagyarmat', 'Hatvan'],

  // Balaton további
  'balatonkenese': ['Balatonalmádi', 'Balatonfüred'],
  'csopak': ['Balatonfüred'],
  'fonyód': ['Siófok', 'Balatonboglár'],
  'badacsonytomaj': ['Tapolca', 'Keszthely'],
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

// Város -> vármegye mapping
const cityToCounty: Record<string, string> = {};
for (const [county, cities] of Object.entries(countyCities)) {
  for (const city of cities) {
    cityToCounty[city.toLowerCase()] = county;
  }
}

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

function formatLocationName(location: string): string {
  // Először dekódoljuk az URL encoded stringet
  let decoded = location;
  try {
    decoded = decodeURIComponent(location);
  } catch {
    decoded = location;
  }
  
  return decoded
    .replace(/^budapest-/i, '')
    .replace(/-kerulet$/, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Suffix helper - helyes magyar ragozáshoz
function getLocationSuffix(cityName: string): string {
  const lastChar = cityName.slice(-1).toLowerCase();
  const lastTwo = cityName.slice(-2).toLowerCase();
  
  // Kivételek
  if (lastTwo === 'gy' || lastTwo === 'ny' || lastTwo === 'ly') {
    return 'en';
  }
  if (lastChar === 'e' || lastChar === 'é') {
    return 'n';
  }
  if (['a', 'á', 'o', 'ó', 'u', 'ú'].includes(lastChar)) {
    return 'ban';
  }
  if (['e', 'é', 'i', 'í', 'ö', 'ő', 'ü', 'ű'].includes(lastChar)) {
    return 'ben';
  }
  if (lastChar === 'n') {
    return 'ben';
  }
  return 'ben';
}

// Breadcrumb komponens
function Breadcrumb({ listingType, type, city }: RelatedLinksProps) {
  const pathname = usePathname();
  const isListPage = pathname?.endsWith('/lista');
  const viewModeParam = isListPage ? '/lista' : '';
  const decodedCity = city ? formatLocationName(city) : null;
  
  const items = [
    { name: 'Főoldal', href: '/' },
    { name: getListingTypeText(listingType) === 'eladó' ? 'Eladó ingatlanok' : 'Kiadó ingatlanok', href: `/${listingType}` },
  ];
  
  if (type) {
    items.push({ 
      name: `${getListingTypeText(listingType)} ${getTypeDisplayName(type)}`, 
      href: `/${listingType}/${type}${viewModeParam}` 
    });
  }
  
  if (city) {
    const isDistrict = budapestDistricts.includes(city);
    const isCounty = Object.values(countyToSlug).includes(city);
    
    if (isDistrict) {
      items.push({ name: `Budapest`, href: `/${listingType}/${type}/budapest${viewModeParam}` });
      items.push({ name: decodedCity || formatLocationName(city), href: `/${listingType}/${type}/${city}${viewModeParam}` });
    } else if (isCounty) {
      const countyName = Object.entries(countyToSlug).find(([, slug]) => slug === city)?.[0] || decodedCity || formatLocationName(city);
      items.push({ name: countyName, href: `/${listingType}/${type}/${city}${viewModeParam}` });
    } else {
      items.push({ name: decodedCity || formatLocationName(city), href: `/${listingType}/${type}/${city}${viewModeParam}` });
    }
  }
  
  return (
    <div className="seo-breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
      {items.map((item, idx) => (
        <span key={idx}>
          {idx > 0 && <span style={{ margin: '0 0.5rem' }}>›</span>}
          {idx === items.length - 1 ? (
            <span style={{ color: '#0078A8', fontWeight: 500 }}>{item.name}</span>
          ) : (
            <Link href={item.href} style={{ color: '#0078A8', textDecoration: 'none' }}>
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

export default function RelatedLinks({ listingType, type, city }: RelatedLinksProps) {
  if (!city) return null;
  
  const isDistrict = budapestDistricts.includes(city);
  const isCounty = Object.values(countyToSlug).includes(city);
  const normalizedCity = city.toLowerCase();
  const cityDisplayName = formatLocationName(city);
  const citySuffix = getLocationSuffix(cityDisplayName);
  const listingText = getListingTypeText(listingType);
  const typeSingular = getTypeSingular(type);
  const typeDisplayName = getTypeDisplayName(type);
  const oppositeListingType = getOppositeListingType(listingType);
  const oppositeListingText = getListingTypeText(oppositeListingType);
  
  // ==================== 1. BUDAPEST KERÜLET ====================
  if (isDistrict) {
    const districtName = formatLocationName(city);
    const otherDistricts = budapestDistricts.filter(d => d !== city);
    const county = 'Pest vármegye';
    const countySlug = countyToSlug[county];
    const otherTypesInDistrict = ALL_TYPES.filter(t => t.slug !== type);
    
    return (
      <div className="seo-generated-content">
        <Breadcrumb listingType={listingType} type={type} city={city} />
        
        <div className="seo-recommended">
          <p><strong>📍 {listingText} {typeSingular} {districtName}{getLocationSuffix(districtName)}</strong></p>
          <p>Ha nem talál megfelelő ingatlant, nézze meg a kerületben elérhető többi kategóriát:</p>
          <div className="quick-search-grid">
            {otherTypesInDistrict.slice(0, 5).map(t => (
              <Link key={t.slug} href={`/${listingType}/${t.slug}/${city}`} className="quick-search-btn">
                <span className="btn-text">{listingText} {t.display}</span>
              </Link>
            ))}
            <Link href={`/${oppositeListingType}/${type}/${city}`} className="quick-search-btn">
              <span className="btn-text">{oppositeListingText} {typeDisplayName}</span>
            </Link>
          </div>
        </div>
        
        <div className="seo-recommended">
          <strong>📌 Tágabb keresés:</strong>
          <div className="quick-search-grid">
            <Link href={`/${listingType}/${type}/budapest`} className="quick-search-btn">
              <span className="btn-text">Budapest összes {listingText} {typeDisplayName}</span>
            </Link>
            <Link href={`/${listingType}/${type}/${countySlug}`} className="quick-search-btn">
              <span className="btn-text">{county} összes {listingText} {typeDisplayName}</span>
            </Link>
            <Link href={`/${listingType}/${type}`} className="quick-search-btn">
              <span className="btn-text">Országos {listingText} {typeDisplayName}</span>
            </Link>
          </div>
        </div>
        
        <div className="seo-recommended">
          <strong>📌 Budapest más kerületei:</strong>
          <div className="quick-search-grid">
            {otherDistricts.slice(0, 12).map(district => (
              <Link key={district} href={`/${listingType}/${type}/${district}`} className="quick-search-btn">
                <span className="btn-text">{formatLocationName(district)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // ==================== 2. BUDAPEST VÁROS ====================
  if (city === 'budapest') {
    const otherTypesInBudapest = ALL_TYPES.filter(t => t.slug !== type);
    
    return (
      <div className="seo-generated-content">
        <Breadcrumb listingType={listingType} type={type} city={city} />
        
        <div className="seo-recommended">
          <p><strong>📍 {listingText} {typeSingular} Budapesten</strong></p>
          <p>Ha nem talál megfelelő ingatlant, nézze meg Budapesten a többi kategóriát:</p>
          <div className="quick-search-grid">
            {otherTypesInBudapest.slice(0, 5).map(t => (
              <Link key={t.slug} href={`/${listingType}/${t.slug}/budapest`} className="quick-search-btn">
                <span className="btn-text">{listingText} {t.display}</span>
              </Link>
            ))}
            <Link href={`/${oppositeListingType}/${type}/budapest`} className="quick-search-btn">
              <span className="btn-text">{oppositeListingText} {typeDisplayName}</span>
            </Link>
          </div>
        </div>
        
        <div className="seo-recommended">
          <strong>📌 Tágabb keresés:</strong>
          <div className="quick-search-grid">
            <Link href={`/${listingType}/${type}/pest-varmegye`} className="quick-search-btn">
              <span className="btn-text">Pest vármegyei {listingText} {typeDisplayName}</span>
            </Link>
            <Link href={`/${listingType}/${type}`} className="quick-search-btn">
              <span className="btn-text">Országos {listingText} {typeDisplayName}</span>
            </Link>
          </div>
        </div>
        
        <div className="seo-recommended">
          <strong>📌 Budapest kerületei:</strong>
          <div className="quick-search-grid">
            {budapestDistricts.map(district => (
              <Link key={district} href={`/${listingType}/${type}/${district}`} className="quick-search-btn">
                <span className="btn-text">{formatLocationName(district)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // ==================== 3. VÁRMEGYE ====================
  if (isCounty) {
    const countyName = Object.entries(countyToSlug).find(([, slug]) => slug === city)?.[0] || '';
    const citiesInCounty = countyCities[countyName] || [];
    const otherTypesInCounty = ALL_TYPES.filter(t => t.slug !== type);
    
    return (
      <div className="seo-generated-content">
        <Breadcrumb listingType={listingType} type={type} city={city} />
        
        <div className="seo-recommended">
          <p><strong>📍 {listingText} {typeSingular} {countyName}{getLocationSuffix(countyName.replace(' vármegye', ''))}</strong></p>
          <p>Ha nem talál megfelelő ingatlant, nézze meg a megyében a többi kategóriát:</p>
          <div className="quick-search-grid">
            {otherTypesInCounty.slice(0, 4).map(t => (
              <Link key={t.slug} href={`/${listingType}/${t.slug}/${city}`} className="quick-search-btn">
                <span className="btn-text">{listingText} {t.display}</span>
              </Link>
            ))}
            <Link href={`/${oppositeListingType}/${type}/${city}`} className="quick-search-btn">
              <span className="btn-text">{oppositeListingText} {typeDisplayName}</span>
            </Link>
          </div>
        </div>
        
        <div className="seo-recommended">
          <strong>📌 Tágabb keresés:</strong>
          <div className="quick-search-grid">
            <Link href={`/${listingType}/${type}`} className="quick-search-btn">
              <span className="btn-text">Országos {listingText} {typeDisplayName}</span>
            </Link>
          </div>
        </div>
        
        <div className="seo-recommended">
          <strong>📌 {countyName} városai:</strong>
          <div className="quick-search-grid">
            {citiesInCounty.slice(0, 12).map(cityName => (
              <Link key={cityName} href={`/${listingType}/${type}/${cityName.toLowerCase()}`} className="quick-search-btn">
                <span className="btn-text">{cityName}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // ==================== 4. EGYÉB VÁROSOK ====================
  const rawCity = decodeCityName(city);                    // ← Dekódolás


  const county = cityToCounty[rawCity?.toLowerCase() || normalizedCity] || '';
  const countyName = county || '';
  const countySlug = county && countyToSlug[county] ? countyToSlug[county] : null;

  const otherTypesInCity = ALL_TYPES.filter(t => t.slug !== type);
  
  // Közeli városok keresése (ékezetes kulccsal is)
  let nearby = nearbyCities[rawCity?.toLowerCase() || ''] || [];
  if (nearby.length === 0) {
    nearby = nearbyCities[normalizedCity] || [];
  }

  const nearbyCitiesList = nearby.filter(c => 
    c.toLowerCase() !== (rawCity?.toLowerCase() || normalizedCity)
  );

  return (
    <div className="seo-generated-content">
      <Breadcrumb listingType={listingType} type={type} city={city} />
      
      <div className="seo-recommended">
        <p><strong>{listingText} {typeSingular} {cityDisplayName}{citySuffix}</strong></p>
        <p>Ha nem talál megfelelő ingatlant, nézze meg a városban a többi kategóriát:</p>
        <div className="quick-search-grid">
          {otherTypesInCity.slice(0, 5).map(t => (
            <Link key={t.slug} href={`/${listingType}/${t.slug}/${city}`} className="quick-search-btn">
              <span className="btn-text">{listingText} {t.display}</span>
            </Link>
          ))}
          <Link href={`/${oppositeListingType}/${type}/${city}`} className="quick-search-btn">
            <span className="btn-text">{oppositeListingText} {typeDisplayName}</span>
          </Link>
        </div>
      </div>
      
      <div className="seo-recommended">
        <strong>Tágabb keresés:</strong>
        <div className="quick-search-grid">
          {countySlug && (
            <Link href={`/${listingType}/${type}/${countySlug}`} className="quick-search-btn">
              <span className="btn-text">{countyName} összes {listingText} {typeDisplayName}</span>
            </Link>
          )}
          <Link href={`/${listingType}/${type}`} className="quick-search-btn">
            <span className="btn-text">Országos {listingText} {typeDisplayName}</span>
          </Link>
        </div>
      </div>
      
      {nearbyCitiesList.length > 0 && (
        <div className="seo-recommended">
          <strong>{listingText} {typeSingular} a környékbeli városokban:</strong>
          <div className="quick-search-grid">
            {nearbyCitiesList.slice(0, 10).map(nearCity => (
              <Link 
                key={nearCity} 
                href={`/${listingType}/${type}/${nearCity.toLowerCase().replace(/\s+/g, '-')}`} 
                className="quick-search-btn"
              >
                <span className="btn-text">{nearCity}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

}