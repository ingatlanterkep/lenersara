'use client';

import Link from 'next/link';

interface RelatedLinksProps {
  listingType: string;  // 'elado' vagy 'kiado'
  type: string;         // 'lakas', 'haz', 'iroda', 'telek'
  city: string | null;  // város neve vagy null
}

// Segédfüggvények - a komponens ELŐTT kell definiálni
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

// Vármegye -> URL mapping (a slug formátumhoz)
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

// Város -> vármegye mapping (automatikus felismeréshez)
const cityToCounty: Record<string, string> = {};
for (const [county, cities] of Object.entries(countyCities)) {
  for (const city of cities) {
    cityToCounty[city.toLowerCase()] = county;
  }
}
// Kézzel hozzáadott nagyvárosok
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
  
  // 1. Ha Budapest kerület: mutassuk a többi kerületet
  if (isDistrict) {
    const otherDistricts = budapestDistricts.filter(d => d !== city);
    
    return (
      <div className="related-links-section">
        <h3>Budapest kerületei</h3>
        <div className="related-links-grid">
          {otherDistricts.map(district => (
            <Link
              key={district}
              href={`/${listingType}/${type}/${district}`}
              className="related-link"
            >
              {formatLocationName(district)}
            </Link>
          ))}
        </div>
        
        <h3 className="mt-4">Eladó/kiadó ingatlanok Budapesten</h3>
        <div className="related-links-grid">
          {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
            <Link
              key={otherType}
              href={`/${listingType}/${otherType}/budapest`}
              className="related-link"
            >
              {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
            </Link>
          ))}
          {listingType === 'elado' && (
            <Link href={`/kiado/${type}/budapest`} className="related-link">
              Kiadó {getTypeDisplayName(type)}
            </Link>
          )}
          {listingType === 'kiado' && (
            <Link href={`/elado/${type}/budapest`} className="related-link">
              Eladó {getTypeDisplayName(type)}
            </Link>
          )}
        </div>
      </div>
    );
  }
  
  // 2. Ha Budapest (város)
  if (city === 'budapest') {
    return (
      <div className="related-links-section">
        <h3>Budapest kerületei</h3>
        <div className="related-links-grid">
          {budapestDistricts.slice(0, 12).map(district => (
            <Link
              key={district}
              href={`/${listingType}/${type}/${district}`}
              className="related-link"
            >
              {formatLocationName(district)}
            </Link>
          ))}
        </div>
        <div className="related-links-grid mt-2">
          {budapestDistricts.slice(12).map(district => (
            <Link
              key={district}
              href={`/${listingType}/${type}/${district}`}
              className="related-link"
            >
              {formatLocationName(district)}
            </Link>
          ))}
        </div>
        
        <h3 className="mt-4">Eladó/kiadó ingatlanok Budapesten</h3>
        <div className="related-links-grid">
          {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
            <Link
              key={otherType}
              href={`/${listingType}/${otherType}/budapest`}
              className="related-link"
            >
              {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
            </Link>
          ))}
          <Link href={`/${listingType === 'elado' ? 'kiado' : 'elado'}/${type}/budapest`} className="related-link">
            {listingType === 'elado' ? 'Kiadó' : 'Eladó'} {getTypeDisplayName(type)}
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
      <div className="related-links-section">
        <h3>{countyName} városai</h3>
        <div className="related-links-grid">
          {citiesInCounty.slice(0, 10).map(cityName => (
            <Link
              key={cityName}
              href={`/${listingType}/${type}/${cityName.toLowerCase()}`}
              className="related-link"
            >
              {cityName}
            </Link>
          ))}
        </div>
        
        <h3 className="mt-4">Ingatlantípusok {countyName}-ben</h3>
        <div className="related-links-grid">
          {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
            <Link
              key={otherType}
              href={`/${listingType}/${otherType}/${city}`}
              className="related-link"
            >
              {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
            </Link>
          ))}
          <Link href={`/${listingType === 'elado' ? 'kiado' : 'elado'}/${type}/${city}`} className="related-link">
            {listingType === 'elado' ? 'Kiadó' : 'Eladó'} {getTypeDisplayName(type)}
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
    <div className="related-links-section">
      {/* Kapcsolódó városok ugyanabban a vármegyében */}
      {otherCities.length > 0 && county && county !== 'Ismeretlen' && (
        <>
          <h3>Kapcsolódó városok {county}-ben</h3>
          <div className="related-links-grid">
            {otherCities.slice(0, 8).map(cityName => (
              <Link
                key={cityName}
                href={`/${listingType}/${type}/${cityName.toLowerCase()}`}
                className="related-link"
              >
                {cityName}
              </Link>
            ))}
          </div>
        </>
      )}
      
      {/* Vármegye szintű link - csak akkor jelenik meg, ha van érvényes countySlug */}
      {countySlug && (
        <>
          <h3 className="mt-4">Tovább a vármegyei szintre</h3>
          <div className="related-links-grid">
            <Link
              href={`/${listingType}/${type}/${countySlug}`}
              className="related-link font-semibold"
            >
              {county} összes {listingType === 'elado' ? 'eladó' : 'kiadó'} {getTypeDisplayName(type)}
            </Link>
          </div>
        </>
      )}
      
      {/* Eladó/Kiadó típusok ugyanitt */}
      <h3 className="mt-4">Ingatlantípusok {formatLocationName(normalizedCity)}-ban/-en</h3>
      <div className="related-links-grid">
        {VALID_PROPERTY_TYPES.filter(t => t !== type).map(otherType => (
          <Link
            key={otherType}
            href={`/${listingType}/${otherType}/${city}`}
            className="related-link"
          >
            {listingType === 'elado' ? 'Eladó' : 'Kiadó'} {getTypeDisplayName(otherType)}
          </Link>
        ))}
        <Link href={`/${listingType === 'elado' ? 'kiado' : 'elado'}/${type}/${city}`} className="related-link">
          {listingType === 'elado' ? 'Kiadó' : 'Eladó'} {getTypeDisplayName(type)}
        </Link>
      </div>
    </div>
  );
}