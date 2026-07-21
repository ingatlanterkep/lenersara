import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Ingatlanjogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
  description:
    'Ingatlanjogi segítség Veszprémben adásvételhez, ajándékozáshoz, haszonélvezeti joghoz, közös tulajdon megszüntetéséhez és földhivatali ügyintézéshez. Több mint 25 év szakmai tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/ingatlanjog'
  },
  openGraph: {
    title: 'Ingatlanjogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
    description:
      'Jogi segítség ingatlanügyekben Veszprémben: adásvétel, ajándékozás, haszonélvezeti jog, közös tulajdon megszüntetése és földhivatali ügyintézés.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/ingatlanjog',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function Ingatlanjog() {
  return (
    <CategoryTemplate
      heroTitle="Ingatlanjog"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Jogi segítség ingatlan adásvételhez, ajándékozáshoz, közös tulajdon megszüntetéséhez, haszonélvezeti joggal kapcsolatos ügyekhez és egyéb ingatlanjogi kérdésekben."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Ingatlanjog', href: '/szolgaltatasok/ingatlanjog' }
      ]}

      introTitle="Ingatlanjogi segítség Veszprémben"
      introContent={
        <>
          <p>
            Ingatlanjogi ügyekben gyakran jelentős értékű vagyont érintő döntéseket kell
            meghozni. Egy megfelelően elkészített szerződés, a tulajdoni viszonyok
            pontos rendezése és a jogszabályoknak megfelelő ügyintézés hozzájárulhat
            ahhoz, hogy az ingatlanügylet biztonságosan és kiszámíthatóan valósuljon meg.
            Veszprémi ügyvédi irodámban ingatlan adásvétellel, ajándékozással,
            haszonélvezeti joggal, közös tulajdon megszüntetésével, használati
            megállapodásokkal és egyéb ingatlanjogi ügyekkel kapcsolatban nyújtok jogi
            segítséget.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal segítek ügyfeleimnek az ingatlanjogi
            kérdések áttekintésében, a szükséges okiratok elkészítésében és az
            ingatlanügyletek biztonságos lebonyolításában. Az alábbi szolgáltatások közül
            kiválaszthatja az Ön ügyéhez leginkább kapcsolódó témát.
          </p>
        </>
      }

      subServicesTitle="Ingatlanjogi szolgáltatások"
      subServices={[
        {
          title: 'Ingatlan adásvételi szerződés',
          href: '/szolgaltatasok/ingatlanjog/adasvetel',
          description:
            'Adásvételi szerződés elkészítése, véleményezése és a jogi feltételek előzetes ellenőrzése a biztonságos ügylet érdekében.',
          icon: '/images/ingatlanjog/adasvetel.png'
        },
        {
          title: 'Ajándékozási szerződés',
          href: '/szolgaltatasok/ingatlanjog/ajandekozas',
          description:
            'Ajándékozási szerződés készítése, az illeték- és adóvonzatok áttekintése, valamint a tulajdonjog-átruházás jogi feltételeinek biztosítása.',
          icon: '/images/ingatlanjog/ajandekozas.png'
        },
        {
          title: 'Haszonélvezeti jog',
          href: '/szolgaltatasok/ingatlanjog/haszonelvezet',
          description:
            'Haszonélvezeti jog alapítása, megszüntetése, valamint a haszonélvező jogainak és kötelezettségeinek rendezése.',
          icon: '/images/ingatlanjog/haszonelvezet.png'
        },
        {
          title: 'Közös tulajdon megszüntetése',
          href: '/szolgaltatasok/ingatlanjog/kozostulajdon',
          description:
            'Közös tulajdon megszüntetése megállapodás vagy bírósági eljárás útján, a tulajdonostársak jogainak és érdekeinek figyelembevételével.',
          icon: '/images/ingatlanjog/kozostulajdon.png'
        },
        {
          title: 'Használati megállapodás',
          href: '/szolgaltatasok/ingatlanjog/hasznalati',
          description:
            'Használati megállapodás készítése, az ingatlan használatának és hasznosításának jogi kereteinek meghatározása.',
          icon: '/images/ingatlanjog/hasznalati.png'
        },
        {
          title: 'Szolgalmi jog',
          href: '/szolgaltatasok/ingatlanjog/szolgalmi',
          description:
            'Szolgalmi jog alapítása, módosítása vagy megszüntetése, valamint a szolgalom gyakorlásával kapcsolatos jogviták rendezése.',
          icon: '/images/ingatlanjog/szolgalmi.png'
        },
        {
          title: 'Tulajdonjog rendezése',
          href: '/szolgaltatasok/ingatlanjog/tulajdonjog',
          description:
            'Tulajdoni viszonyok rendezése, tulajdoni lapok ellenőrzése, jogi hibák feltárása és orvoslása.',
          icon: '/images/ingatlanjog/tulajdonjog.png'
        },
        {
          title: 'Földhivatali ügyintézés',
          href: '/szolgaltatasok/ingatlanjog/foldhivatal',
          description:
            'Földhivatali eljárásokban való jogi képviselet, bejegyzési kérelmek előkészítése és a földhivatali határozatok felülvizsgálata.',
          icon: '/images/ingatlanjog/foldhivatal.png'
        },        
        {
          title: 'Ingatlanjogi tanácsadás',
          href: '/szolgaltatasok/ingatlanjog/tanacsadas',
          description:
            'Földhivatali eljárásokban való jogi képviselet, bejegyzési kérelmek előkészítése és a földhivatali határozatok felülvizsgálata.',
          icon: '/images/ingatlanjog/tanacsadas.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet az ingatlanjogi tanácsadás?</h2>

          <p>
            Ingatlanjogi ügyekben már az ügylet előkészítése során érdemes tisztázni a
            tulajdoni viszonyokat, az ingatlant érintő jogokat és terheket, valamint a
            tervezett ügylet jogi feltételeit. Egy időben felismert jogi kockázat
            megelőzheti a későbbi vitákat vagy a szerződés teljesítésével kapcsolatos
            problémákat.
          </p>

          <p>
            Az ingatlanjogi segítség magában foglalhatja többek között szerződések
            elkészítését és véleményezését, tulajdoni lapok és egyéb okiratok
            áttekintését, földhivatali eljárásokkal kapcsolatos ügyintézést, valamint
            jogi képviseletet is. Az alkalmazható megoldás minden esetben az adott
            ügylet sajátosságaitól függ.
          </p>

          <h2>Biztonságos ingatlanügylet</h2>

          <p>
            Ingatlan adásvétele, ajándékozása vagy más tulajdonjogi változás során
            különösen fontos, hogy az elkészített szerződések megfeleljenek a hatályos
            jogszabályoknak és alkalmasak legyenek a földhivatali bejegyzésre. A
            megfelelően előkészített okiratok és a jogi feltételek előzetes ellenőrzése
            jelentősen csökkentheti a későbbi jogviták kialakulásának kockázatát.
          </p>

          <p>
            Az ügylet előkészítése során érdemes áttekinteni a tulajdoni lapot, az
            ingatlant érintő jogokat, terheket, valamint azokat a körülményeket is,
            amelyek befolyásolhatják a szerződés teljesítését.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük az ingatlannal kapcsolatos helyzetet,
            a rendelkezésre álló dokumentumokat és azt, hogy milyen jogi célt kíván
            elérni. Ennek alapján ismertetem a szóba jöhető jogi lehetőségeket és a
            várható további lépéseket.
          </p>

          <p>
            Amennyiben rendelkezésre állnak tulajdoni lapok, szerződések,
            földhivatali iratok vagy egyéb kapcsolódó dokumentumok, célszerű ezeket a
            konzultációra magával hozni vagy előzetesen megküldeni. Ezek ismeretében
            pontosabban felmérhető az ügy jogi háttere és a szükséges intézkedések köre.
          </p>

          <h2>Személyre szabott ingatlanjogi segítség</h2>

          <p>
            Minden ingatlanügy egyedi. Az alkalmazható jogi megoldást befolyásolhatja
            többek között az ingatlan jogi helyzete, a tulajdonosi viszonyok, a
            szerződés célja, valamint az ügyletben részt vevő felek körülményei.
          </p>

          <p>
            Célom, hogy ügyfeleim érthető tájékoztatást kapjanak a lehetőségeikről, és
            olyan jogi megoldást válasszanak, amely az adott ügylet biztonságos és
            jogszerű lebonyolítását szolgálja. Személyes konzultációra Veszprémben,
            előzetes egyeztetés alapján pedig online konzultációra is lehetőség van.
          </p>
        </>
      }

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          '@id': 'https://ugyvedimegoldas.hu/#law-office',
          name: 'dr. Léner-Pintér Sára ügyvédi iroda',
          description:
            'Ingatlanjogi segítség Veszprémben adásvételhez, ajándékozáshoz, haszonélvezeti joghoz, közös tulajdon megszüntetéséhez és földhivatali ügyintézéshez.',
          url: 'https://ugyvedimegoldas.hu/',
          telephone: '+36204905530',
          email: 'drlpsmobil@gmail.com',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Füredi u. 11.',
            addressLocality: 'Veszprém',
            postalCode: '8200',
            addressCountry: 'HU'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 47.0933,
            longitude: 17.9108
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          openingHours: 'Mo-Fr 09:00-18:00'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id':
            'https://ugyvedimegoldas.hu/szolgaltatasok/ingatlanjog#service',
          name: 'Ingatlanjogi ügyvédi szolgáltatás',
          description:
            'Jogi tanácsadás, okiratszerkesztés és képviselet ingatlanjogi ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/ingatlanjog',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Ingatlanjogi ügyvédi szolgáltatás'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Főoldal',
              item: 'https://ugyvedimegoldas.hu/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Szolgáltatások',
              item: 'https://ugyvedimegoldas.hu/szolgaltatasok'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Ingatlanjog',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/ingatlanjog'
            }
          ]
        }
      ]}
    />
  )
}