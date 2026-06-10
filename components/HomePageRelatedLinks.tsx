'use client';

import Link from 'next/link';

interface RelatedLinksProps {
  listingType: string;  // 'elado' vagy 'kiado'
  type: string;         // 'lakas', 'haz', 'iroda', 'telek'
  city: string | null;  // város neve vagy null
}

// Segédfüggvények
const VALID_PROPERTY_TYPES = ['lakas', 'haz', 'iroda', 'telek'];

function getTypeDisplayName(type: string): string {
  const names: Record<string, string> = {
    lakas: 'lakások',
    haz: 'házak',
    iroda: 'irodák',
    telek: 'telkek'
  };
  return names[type] || 'ingatlanok';
}

// Vármegye -> városok mapping
const countyCities: Record<string, string[]> = {
  'Pest vármegye': ['Érd', 'Budaörs', 'Szentendre', 'Gödöllő', 'Vác', 'Dunakeszi', 'Szigetszentmiklós', 'Vecsés', 'Gyál', 'Monor', 'Cegléd', 'Nagykőrös', 'Pomáz', 'Pilisvörösvár', 'Budakalász', 'Törökbálint', 'Biatorbágy', 'Kistarcsa', 'Maglód', 'Üllő', 'Fót', 'Dunavarsány', 'Taksony'],
  'Hajdú-Bihar vármegye': ['Debrecen', 'Hajdúböszörmény', 'Hajdúszoboszló', 'Balmazújváros', 'Püspökladány', 'Hajdúnánás', 'Derecske', 'Nyíradony', 'Hajdúhadház', 'Téglás'],
  'Győr-Moson-Sopron vármegye': ['Győr', 'Sopron', 'Mosonmagyaróvár', 'Csorna', 'Kapuvár', 'Tét', 'Jánossomorja', 'Beled', 'Lébény', 'Fertőd', 'Fertőszentmiklós'],
  'Baranya vármegye': ['Pécs', 'Komló', 'Mohács', 'Szigetvár', 'Siklós', 'Szentlőrinc', 'Pécsvárad', 'Bóly', 'Harkány', 'Sásd', 'Villány'],
  'Borsod-Abaúj-Zemplén vármegye': ['Miskolc', 'Ózd', 'Kazincbarcika', 'Sátoraljaújhely', 'Tiszaújváros', 'Szerencs', 'Mezőkövesd', 'Edelény', 'Encs', 'Gönc', 'Tokaj'],
  'Szabolcs-Szatmár-Bereg vármegye': ['Nyíregyháza', 'Mátészalka', 'Kisvárda', 'Vásárosnamény', 'Fehérgyarmat', 'Tiszavasvári', 'Nagykálló', 'Baktalórántháza', 'Ibrány', 'Nyírbátor'],
  'Bács-Kiskun vármegye': ['Kecskemét', 'Baja', 'Kiskunfélegyháza', 'Kiskunhalas', 'Kalocsa', 'Kiskőrös', 'Kunszentmiklós', 'Kiskunmajsa', 'Tiszakécske', 'Lajosmizse'],
  'Békés vármegye': ['Békéscsaba', 'Gyula', 'Orosháza', 'Szarvas', 'Békés', 'Mezőberény', 'Gyomaendrőd', 'Mezőkovácsháza', 'Battonya', 'Csorvás'],
  'Csongrád-Csanád vármegye': ['Szeged', 'Hódmezővásárhely', 'Makó', 'Csongrád', 'Szentes', 'Kistelek', 'Mórahalom', 'Sándorfalva', 'Algyő', 'Mindszent'],
  'Fejér vármegye': ['Székesfehérvár', 'Dunaújváros', 'Mór', 'Gárdony', 'Sárbogárd', 'Bicske', 'Enying', 'Martonvásár', 'Velence', 'Adony'],
  'Heves vármegye': ['Eger', 'Gyöngyös', 'Hatvan', 'Füzesabony', 'Heves', 'Lőrinci', 'Pétervására', 'Bélapátfalva', 'Kisköre', 'Kál'],
  'Komárom-Esztergom vármegye': ['Tatabánya', 'Esztergom', 'Komárom', 'Oroszlány', 'Bábolna', 'Nyergesújfalu', 'Kisbér', 'Tata', 'Ács', 'Nagyigmánd'],
  'Nógrád vármegye': ['Salgótarján', 'Balassagyarmat', 'Pásztó', 'Bátonyterenye', 'Rétság', 'Szécsény', 'Mátraterenye', 'Kazár', 'Karancslapujtő'],
  'Somogy vármegye': ['Kaposvár', 'Siófok', 'Marcali', 'Nagyatád', 'Barcs', 'Balatonföldvár', 'Tab', 'Lengyeltóti', 'Csurgó', 'Fonyód'],
  'Tolna vármegye': ['Szekszárd', 'Paks', 'Dombóvár', 'Bonyhád', 'Tolna', 'Tamási', 'Simontornya', 'Dunaszentgyörgy', 'Bátaszék', 'Nagymányok'],
  'Vas vármegye': ['Szombathely', 'Körmend', 'Celldömölk', 'Sárvár', 'Kőszeg', 'Vasvár', 'Csepreg', 'Répcelak', 'Bük', 'Jánosháza'],
  'Veszprém vármegye': ['Veszprém', 'Pápa', 'Ajka', 'Balatonfüred', 'Balatonalmádi', 'Tapolca', 'Zirc', 'Devecser', 'Sümeg', 'Várpalota'],
  'Zala vármegye': ['Zalaegerszeg', 'Nagykanizsa', 'Keszthely', 'Lenti', 'Letenye', 'Zalaszentgrót', 'Hévíz', 'Pacsa', 'Becsehely', 'Nova'],
  'Jász-Nagykun-Szolnok vármegye': ['Szolnok', 'Jászberény', 'Törökszentmiklós', 'Karcag', 'Mezőtúr', 'Kunhegyes', 'Kunszentmárton', 'Tiszafüred', 'Jászapáti', 'Újszász']
};

// Vármegye -> URL mapping
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
const majorCities = ['budapest', 'debrecen', 'szeged', 'miskolc', 'pécs', 'győr', 'nyíregyháza', 'kecskemét', 'székesfehérvár'];
for (const city of majorCities) {
  if (!cityToCounty[city]) {
    cityToCounty[city] = 'Ismeretlen';
  }
}

// Budapest kerületek
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
  return location
    .replace(/^budapest-/i, '')
    .replace(/-kerulet$/, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function RelatedLinks({ listingType, type, city }: RelatedLinksProps) {
  if (!city) return null;
  
  const isDistrict = budapestDistricts.includes(city as any);
  const isCounty = Object.values(countyToSlug).includes(city);
  const normalizedCity = city.toLowerCase();
  
  // 1. Ha Budapest kerület
  if (isDistrict) {
    const otherDistricts = budapestDistricts.filter(d => d !== city);
    
    return (
      <div className="seo-main-content">
        <h2>Budapest kerületei</h2>
        <div className="quick-search-grid">
          {otherDistricts.map(district => (
            <Link
              key={district}
              href={`/${listingType}/${type}/${district}`}
              className="quick-search-btn"
            >
              <span className="btn-text">{formatLocationName(district)}</span>
            </Link>
          ))}
        </div>
        
        <h2 className="mt-4">Eladó/kiadó ingatlanok Budapesten</h2>
        <div className="quick-search-grid">
          {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
            <Link
              key={otherType}
              href={`/${listingType}/${otherType}/budapest`}
              className="quick-search-btn"
            >
              <span className="btn-text">
                {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
              </span>
            </Link>
          ))}
          {listingType === 'elado' && (
            <Link href={`/kiado/${type}/budapest`} className="quick-search-btn">
              <span className="btn-text">Kiadó {getTypeDisplayName(type)}</span>
            </Link>
          )}
          {listingType === 'kiado' && (
            <Link href={`/elado/${type}/budapest`} className="quick-search-btn">
              <span className="btn-text">Eladó {getTypeDisplayName(type)}</span>
            </Link>
          )}
        </div>
      </div>
    );
  }
  
  // 2. Ha Budapest város
  if (city === 'budapest') {
    return (
      <div className="seo-main-content">
        <h2>Budapest kerületei</h2>
        <div className="quick-search-grid">
          {budapestDistricts.slice(0, 12).map(district => (
            <Link
              key={district}
              href={`/${listingType}/${type}/${district}`}
              className="quick-search-btn"
            >
              <span className="btn-text">{formatLocationName(district)}</span>
            </Link>
          ))}
        </div>
        <div className="quick-search-grid mt-2">
          {budapestDistricts.slice(12).map(district => (
            <Link
              key={district}
              href={`/${listingType}/${type}/${district}`}
              className="quick-search-btn"
            >
              <span className="btn-text">{formatLocationName(district)}</span>
            </Link>
          ))}
        </div>
        
        <h2 className="mt-4">Eladó/kiadó ingatlanok Budapesten</h2>
        <div className="quick-search-grid">
          {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
            <Link
              key={otherType}
              href={`/${listingType}/${otherType}/budapest`}
              className="quick-search-btn"
            >
              <span className="btn-text">
                {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
              </span>
            </Link>
          ))}
          <Link href={`/${listingType === 'elado' ? 'kiado' : 'elado'}/${type}/budapest`} className="quick-search-btn">
            <span className="btn-text">
              {listingType === 'elado' ? 'Kiadó' : 'Eladó'} {getTypeDisplayName(type)}
            </span>
          </Link>
        </div>
      </div>
    );
  }
  
  // 3. Ha vármegye
  if (isCounty) {
    const countyName = Object.entries(countyToSlug).find(([, slug]) => slug === city)?.[0] || '';
    const citiesInCounty = countyCities[countyName] || [];
    
    return (
      <div className="seo-main-content">
        <h2>{countyName} városai</h2>
        <div className="quick-search-grid">
          {citiesInCounty.slice(0, 10).map(cityName => (
            <Link
              key={cityName}
              href={`/${listingType}/${type}/${cityName.toLowerCase()}`}
              className="quick-search-btn"
            >
              <span className="btn-text">{cityName}</span>
            </Link>
          ))}
        </div>
        
        <h2 className="mt-4">Ingatlantípusok {countyName}-ben</h2>
        <div className="quick-search-grid">
          {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
            <Link
              key={otherType}
              href={`/${listingType}/${otherType}/${city}`}
              className="quick-search-btn"
            >
              <span className="btn-text">
                {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
              </span>
            </Link>
          ))}
          <Link href={`/${listingType === 'elado' ? 'kiado' : 'elado'}/${type}/${city}`} className="quick-search-btn">
            <span className="btn-text">
              {listingType === 'elado' ? 'Kiadó' : 'Eladó'} {getTypeDisplayName(type)}
            </span>
          </Link>
        </div>
      </div>
    );
  }
  
  // 4. Egyéb városok
  const county = cityToCounty[normalizedCity];
  const citiesInCounty = county ? countyCities[county] || [] : [];
  const otherCities = citiesInCounty.filter(c => c.toLowerCase() !== normalizedCity);
  const countySlug = county && countyToSlug[county] ? countyToSlug[county] : null;
  
  return (
    <div className="seo-main-content">
      {/* Kapcsolódó városok ugyanabban a vármegyében */}
      {otherCities.length > 0 && county && county !== 'Ismeretlen' && (
        <>
          <h2>Kapcsolódó városok {county}-ben</h2>
          <div className="quick-search-grid">
            {otherCities.slice(0, 8).map(cityName => (
              <Link
                key={cityName}
                href={`/${listingType}/${type}/${cityName.toLowerCase()}`}
                className="quick-search-btn"
              >
                <span className="btn-text">{cityName}</span>
              </Link>
            ))}
          </div>
        </>
      )}
      
      {/* Vármegye szintű link */}
      {countySlug && (
        <>
          <h2 className="mt-4">Tovább a vármegyei szintre</h2>
          <div className="quick-search-grid">
            <Link
              href={`/${listingType}/${type}/${countySlug}`}
              className="quick-search-btn"
              style={{ background: 'linear-gradient(135deg, #5099ce 0%, #3a7bb8 100%)', borderColor: 'transparent' }}
            >
              <span className="btn-text" style={{ color: 'white' }}>
                {county} összes {listingType === 'elado' ? 'eladó' : 'kiadó'} {getTypeDisplayName(type)} →
              </span>
            </Link>
          </div>
        </>
      )}
      
      {/* Eladó/Kiadó típusok ugyanitt */}
      <h2 className="mt-4">Ingatlantípusok {formatLocationName(normalizedCity)}-ban/-en</h2>
      <div className="quick-search-grid">
        {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
          <Link
            key={otherType}
            href={`/${listingType}/${otherType}/${city}`}
            className="quick-search-btn"
          >
            <span className="btn-text">
              {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
            </span>
          </Link>
        ))}
        <Link href={`/${listingType === 'elado' ? 'kiado' : 'elado'}/${type}/${city}`} className="quick-search-btn">
          <span className="btn-text">
            {listingType === 'elado' ? 'Kiadó' : 'Eladó'} {getTypeDisplayName(type)}
          </span>
        </Link>
      </div>
    </div>
  );
}