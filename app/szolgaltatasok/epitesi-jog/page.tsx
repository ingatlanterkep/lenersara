import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Építési jogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
  description:
    'Építési jogi segítség Veszprémben tanácsadás, szerződéskészítés és jogviták esetén. Több mint 25 év szakmai tapasztalat építésjogi kérdésekben.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/epitesi-jog'
  },
  openGraph: {
    title: 'Építési jogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
    description:
      'Jogi segítség építési jogi ügyekben Veszprémben: tanácsadás, szerződések, hatósági eljárások és jogviták.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/epitesi-jog',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function EpitesiJog() {
  return (
    <CategoryTemplate
      heroTitle="Építési jogi ügyvéd Veszprémben"
      heroSubtitle="dr. Léner-Pintér Sára"
      heroDescription="Jogi segítség építési szerződésekkel, hatósági ügyekkel és építési jogvitákkal kapcsolatos kérdésekben."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Építési jog', href: '/szolgaltatasok/epitesi-jog' }
      ]}

      introTitle="Építési jogi segítség Veszprémben"
      introContent={
        <>
          <p>
            Az építési jog számos olyan élethelyzetet ölel fel, amelyben egy
            időben meghozott jogi döntés jelentősen csökkentheti a későbbi
            kockázatokat és jogviták kialakulásának esélyét. Veszprémi ügyvédi
            irodámban építési jogi tanácsadással, okiratok elkészítésével,
            szerződések véleményezésével, valamint építési jogi kérdésekben
            nyújtok segítséget magánszemélyek és vállalkozások részére.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal arra törekszem, hogy
            ügyfeleim átlátható és érthető jogi tájékoztatást kapjanak, és az
            adott ügy sajátosságaihoz igazodó, jogilag megalapozott döntést
            hozhassanak. Az alábbi szolgáltatások közül kiválaszthatja az Ön
            helyzetéhez leginkább kapcsolódó építési jogi területet.
          </p>
        </>
      }

      subServicesTitle="Építési jogi szolgáltatások"
      subServices={[
        {
          title: 'Építési szerződések',
          href: '/szolgaltatasok/epitesi-jog/epitesi-szerzodesek',
          description:
            'Építési és kivitelezési szerződések elkészítése, áttekintése és véleményezése, valamint szerződésekből eredő jogviták kezelése.',
          icon: '/images/epitesi-jog/epitesi-szerzodes.png'
        },
        {
          title: 'Építésügyi hatósági ügyek',
          href: '/szolgaltatasok/epitesi-jog/hatosagi-ugyek',
          description:
            'Segítség építésügyi hatósági eljárásokban, építési engedélyekkel, használatbavételi engedéllyel és hatósági ellenőrzésekkel kapcsolatban.',
          icon: '/images/epitesi-jog/hatosagi-ugyek.png'
        },
        {
          title: 'Építési jogviták',
          href: '/szolgaltatasok/epitesi-jog/epitesi-jogvitak',
          description:
            'Jogi képviselet építési beruházásokkal kapcsolatos vitákban, teljesítési igények érvényesítésében és kártérítési ügyekben.',
          icon: '/images/epitesi-jog/epitesi-jogvitak.png'
        },
        {
          title: 'Ingatlan és építményi jog',
          href: '/szolgaltatasok/epitesi-jog/ingatlan-es-epitmenyi-jog',
          description:
            'Jogi segítség a telekszerzés, az ingatlan-nyilvántartási ügyek és az építményi jog alapításának teljes folyamatában.',
          icon: '/images/epitesi-jog/ingatlan-es-epitmenyi-jog.png'
        },
        {
          title: 'Szomszédjogi kérdések',
          href: '/szolgaltatasok/epitesi-jog/szomszedjogi-kerdesek',
          description:
            'Jogi segítség a szomszédjogi viták megelőzésében és rendezésében, a szolgalmi jogok alapításában, valamint a peres és peren kívüli eljárásokban.',
          icon: '/images/epitesi-jog/szomszedjogi-kerdesek.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet egy építési jogi ügyvéd?</h2>

          <p>
            Az építési beruházások során gyakran merülnek fel olyan jogi kérdések,
            amelyek megfelelő előkészítéssel megelőzhetők vagy egyszerűbben
            rendezhetők. Egy építési jogi konzultáció során áttekinthetők a
            rendelkezésre álló iratok, a jogi lehetőségek, valamint az adott ügyben
            várható eljárások és kockázatok.
          </p>

          <p>
            Az építési jogi segítség nem kizárólag jogvita esetén lehet hasznos.
            Sok esetben már egy szerződés megkötése, egy beruházás előkészítése
            vagy egy hatósági eljárás előtt érdemes jogi tanácsot kérni annak
            érdekében, hogy a későbbiekben elkerülhetők legyenek a vitás helyzetek.
          </p>

          <h2>Jogi támogatás az építkezés teljes folyamatában</h2>

          <p>
            Az építési jog az ingatlanfejlesztés és az építkezés szinte valamennyi
            szakaszát érintheti, az előkészítéstől kezdve egészen a beruházás
            befejezéséig. Az ügy sajátosságaitól függően szükség lehet
            szerződések áttekintésére, jogi vélemény készítésére, okiratok
            szerkesztésére vagy hatósági és bírósági eljárásokban történő
            képviseletre.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük az ügy előzményeit, a rendelkezésre
            álló dokumentumokat és az Ön célját. Ennek alapján ismertetem a szóba
            jöhető jogi megoldásokat, azok várható előnyeit, kockázatait és a
            szükséges további lépéseket.
          </p>

          <p>
            Amennyiben rendelkezésre állnak szerződések, tervdokumentációk,
            hatósági iratok vagy egyéb kapcsolódó dokumentumok, érdemes azokat a
            konzultációra magával hozni, mert ezek ismeretében pontosabb jogi
            álláspont alakítható ki.
          </p>

          <h2>Személyre szabott építési jogi segítség</h2>

          <p>
            Minden építési ügy más, ezért az alkalmazható jogi megoldás mindig az
            adott beruházás, az érintett felek és a konkrét körülmények
            figyelembevételével határozható meg. Célom, hogy ügyfeleim
            megalapozott döntést hozhassanak, és jogi kérdéseikre érthető,
            gyakorlatias választ kapjanak.
          </p>

          <p>
            Személyes konzultációra Veszprémben, előzetes egyeztetés alapján pedig
            online konzultációra is lehetőség van.
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
            'Építési jogi segítség Veszprémben tanácsadás, szerződéskészítés és jogviták esetén.',
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
            'https://ugyvedimegoldas.hu/szolgaltatasok/epitesi-jog#service',
          name: 'Építési jogi ügyvédi szolgáltatás',
          description:
            'Jogi tanácsadás, okiratszerkesztés és képviselet építési jogi ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/epitesi-jog',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Építési jogi ügyvédi szolgáltatás'
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
              name: 'Építési jog',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/epitesi-jog'
            }
          ]
        }
      ]}
    />
  )
}