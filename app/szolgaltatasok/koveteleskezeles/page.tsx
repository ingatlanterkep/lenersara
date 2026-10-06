import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Követeléskezelés Veszprém | dr. Léner-Pintér Sára',
  description:
    'Ügyvédi követeléskezelés és követelésérvényesítés Veszprémben magánszemélyek és vállalkozások részére. Több mint 25 év szakmai tapasztalat.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/koveteleskezeles'
  },
  openGraph: {
    title: 'Követeléskezelés Veszprém | dr. Léner-Pintér Sára',
    description:
      'Jogi segítség lejárt pénzkövetelések rendezéséhez és érvényesítéséhez Veszprémben.',
    url:
      'https://ugyvedimegoldas.hu/szolgaltatasok/koveteleskezeles',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function Koveteleservenyesites() {
  return (
    <CategoryTemplate
      heroTitle="Követeléskezelés Veszprémben"
      heroSubtitle="dr. Léner-Pintér Sára"
      heroDescription="Jogi segítség lejárt pénzkövetelések rendezéséhez és hatékony érvényesítéséhez."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        {
          label: 'Követeléskezelés',
          href: '/szolgaltatasok/koveteleskezeles'
        }
      ]}

      introTitle="Ügyvédi követeléskezelés Veszprémben"
      introContent={
        <>
          <p>
            Egy lejárt és ki nem fizetett követelés rendezése során fontos,
            hogy a szükséges jogi lépések időben, megfelelő sorrendben és a
            rendelkezésre álló dokumentumok alapján történjenek. Veszprémi
            ügyvédi irodámban magánszemélyek és vállalkozások részére nyújtok
            segítséget pénzkövetelések jogi értékelésében, rendezésében és
            érvényesítésében.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal arra törekszem, hogy
            ügyfeleim érthető tájékoztatást kapjanak a szóba jöhető
            lehetőségekről, az egyes eljárások várható költségeiről,
            időigényéről és kockázatairól. Az alábbi szolgáltatások közül
            kiválaszthatja az ügy aktuális szakaszához leginkább kapcsolódó
            területet.
          </p>
        </>
      }

      subServicesTitle="Követeléskezelési szolgáltatások"
      subServices={[
        {
          title: 'Fizetési felszólítás',
          href:
            '/szolgaltatasok/koveteleskezeles/fizetesi-felszolitas',
          description:
            'Ügyvédi felszólítás, egyezségi lehetőségek és a követelés peren kívüli rendezésének előkészítése.',
          icon:
            '/images/koveteles/fizetesi-felszolitas.png'
        },
        {
          title: 'Fizetési meghagyás',
          href:
            '/szolgaltatasok/koveteleskezeles/fizetesi-meghagyas',
          description:
            'Jogi segítség a fizetési meghagyásos eljárás megindításához és az eljárás során szükséges lépésekhez.',
          icon:
            '/images/koveteles/fizetesi-meghagyas.png'
        },
        {
          title: 'Végrehajtási eljárások',
          href:
            '/szolgaltatasok/koveteleskezeles/vegrehajtas',
          description:
            'Jogi segítség végrehajtható követelések érvényesítéséhez és végrehajtási ügyekben.',
          icon:
            '/images/koveteles/vegrehajtas.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet a követeléskezelő ügyvéd?</h2>

          <p>
            Követelés érvényesítése előtt célszerű megvizsgálni, hogy pontosan
            milyen jogcímen, mekkora összeg és milyen dokumentumok alapján
            követelhető. Fontos lehet annak tisztázása is, hogy a tartozás
            esedékessé vált-e, nem telt-e el az elévülési idő, illetve
            rendelkezésre állnak-e az igényt alátámasztó bizonyítékok.
          </p>

          <p>
            Az ügyvédi követeléskezelés az eset körülményeitől függően
            magában foglalhatja az iratok áttekintését, a követelés jogi
            megalapozottságának értékelését, az adóssal történő egyeztetést,
            valamint a szükséges eljárás előkészítését és megindítását.
          </p>

          <h2>A követelésérvényesítés megfelelő módjának kiválasztása</h2>

          <p>
            Nem minden tartozás esetében ugyanaz a jogi megoldás célszerű.
            Bizonyos ügyekben lehetőség nyílhat gyorsabb, peren kívüli
            rendezésre, míg más esetekben hivatalos eljárás megindítása válhat
            szükségessé. A megfelelő út kiválasztását befolyásolhatja a
            követelés összege, jogcíme, dokumentáltsága, az adós
            együttműködése és vagyoni helyzete is.
          </p>

          <p>
            A jogi lépések megkezdése előtt érdemes mérlegelni az eljárás
            várható költségeit és azt is, hogy sikeres igényérvényesítés esetén
            milyen esély van a követelés tényleges megtérülésére. A cél nem
            pusztán egy eljárás megindítása, hanem az adott helyzethez igazodó,
            gazdaságilag is észszerű megoldás kiválasztása.
          </p>

          <h2>Követelések magánszemélyek és vállalkozások között</h2>

          <p>
            Ki nem fizetett tartozás számos jogviszonyból keletkezhet. A
            követelés alapja lehet például kölcsön, szolgáltatás, vállalkozási
            vagy más szerződés, elmaradt díj, elszámolási különbözet vagy
            egyéb pénzfizetési kötelezettség.
          </p>

          <p>
            A követelés érvényesítéséhez lényeges lehet a szerződések,
            számlák, teljesítésigazolások, átutalási bizonylatok, levelezések,
            felszólítások és egyéb kapcsolódó dokumentumok együttes
            áttekintése. Ezek alapján pontosabban meghatározható, hogy milyen
            igény és milyen módon érvényesíthető.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük a követelés keletkezésének
            körülményeit, összegét, esedékességét, valamint az adóssal folytatott
            korábbi egyeztetéseket. Megvizsgáljuk a rendelkezésre álló
            dokumentumokat, és felvázolom a szóba jöhető jogi lehetőségeket,
            azok várható előnyeit és kockázatait.
          </p>

          <p>
            A konzultációra érdemes előkészíteni minden, a követeléshez
            kapcsolódó iratot, különösen a szerződéseket, számlákat,
            teljesítésigazolásokat, fizetési bizonylatokat, levelezéseket és
            korábbi felszólításokat. A dokumentumok ismeretében megalapozottabban
            határozható meg a következő jogi lépés.
          </p>

          <h2>Személyre szabott követelésérvényesítés</h2>

          <p>
            Minden követelés más körülmények között keletkezik, ezért az
            alkalmazható jogi megoldást mindig az ügy iratai, az érintett felek
            helyzete és a követelés sajátosságai alapján kell meghatározni.
            Célom, hogy ügyfeleim átlátható tájékoztatást kapjanak, és olyan
            követeléskezelési stratégia készüljön, amely a jogi lehetősgek
            mellett a várható megtérülést is figyelembe veszi.
          </p>

          <p>
            Személyes konzultációra Veszprémben, előzetes egyeztetés alapján
            pedig online konzultációra is lehetőség van.
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
            'Ügyvédi követeléskezelés és követelésérvényesítés Veszprémben magánszemélyek és vállalkozások részére.',
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
            'https://ugyvedimegoldas.hu/szolgaltatasok/koveteleskezeles#service',
          name: 'Követeléskezelési és követelésérvényesítési szolgáltatás',
          description:
            'Jogi tanácsadás és ügyvédi segítség lejárt pénzkövetelések rendezéséhez és érvényesítéséhez Veszprémben.',
          url:
            'https://ugyvedimegoldas.hu/szolgaltatasok/koveteleskezeles',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType:
            'Követeléskezelés és követelésérvényesítés'
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
              item: 'https://ugyvedimegoldas.hu/#szolgaltatasok'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Követeléskezelés',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/koveteleskezeles'
            }
          ]
        }
      ]}
    />
  )
}