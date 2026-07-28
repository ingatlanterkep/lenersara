import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Munkajogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
  description:
    'Munkajogi ügyvéd Veszprémben munkavállalók és munkáltatók részére. Jogi tanácsadás, okiratszerkesztés és képviselet több mint 25 év szakmai tapasztalattal.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/munkajog'
  },
  openGraph: {
    title: 'Munkajogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
    description:
      'Munkajogi tanácsadás, okiratszerkesztés és képviselet munkavállalók és munkáltatók részére Veszprémben.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/munkajog',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function Munkajog() {
  return (
    <CategoryTemplate
      heroTitle="Munkajogi ügyvéd Veszprémben"
      heroSubtitle="dr. Léner-Pintér Sára"
      heroDescription="Jogi tanácsadás és képviselet munkavállalók és munkáltatók részére a munkaviszonnyal összefüggő kérdésekben."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Munkajog', href: '/szolgaltatasok/munkajog' }
      ]}

      introTitle="Munkajogi segítség Veszprémben"
      introContent={
        <>
          <p>
            A munkajog a munkaviszony létrehozásától annak fennállásán át
            egészen a megszüntetéséig számos jogot és kötelezettséget
            szabályoz. Egy munkajogi döntés mind a munkavállaló, mind a
            munkáltató helyzetére hosszú távú hatással lehet, ezért sok esetben
            már egy intézkedés vagy nyilatkozat megtétele előtt érdemes jogi
            tanácsot kérni. Veszprémi ügyvédi irodámban munkajogi
            tanácsadással, okiratszerkesztéssel és képviselettel nyújtok
            segítséget.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal arra törekszem, hogy
            ügyfeleim érthető és gyakorlatias tájékoztatást kapjanak jogaikról,
            kötelezettségeikről és a szóba jöhető jogi megoldásokról. Az alábbi
            szolgáltatások közül kiválaszthatja az Ön helyzetéhez leginkább
            kapcsolódó munkajogi területet.
          </p>
        </>
      }

      subServicesTitle="Munkajogi szolgáltatások"
      subServices={[
        {
          title: 'Munkaszerződés és felmondás',
          href: '/szolgaltatasok/munkajog/munkaszerzodes-felmondas',
          description:
            'Munkaszerződések elkészítése, módosítása, felmondás, közös megegyezés és munkaviszony megszüntetése.',
          icon: '/images/munkajog/munkaszerzodes.png'
        },
        {
          title: 'Munkabér és munkavállalói igények',
          href: '/szolgaltatasok/munkajog/munkaber-koveteles',
          description:
            'Elmaradt munkabér, túlóra, szabadság, pótlékok és a munkaviszonyból eredő munkavállalói igények.',
          icon: '/images/munkajog/munkaber.png'
        },
        {
          title: 'Munkajogi viták és képviselet',
          href: '/szolgaltatasok/munkajog/munkajogi-vitak',
          description:
            'Jogi képviselet munkajogi perekben, munkaügyi bírósági eljárásokban és egyeztetéseken.',
          icon: '/images/munkajog/munkajogi-vitak.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet egy munkajogi ügyvéd?</h2>

          <p>
            A munkajogi szabályozás összetett, és az egyes döntések jogi
            következményei nem mindig láthatók előre. Egy munkajogi konzultáció
            során áttekinthetők az ügy körülményei, a rendelkezésre álló iratok,
            az érintett jogok és kötelezettségek, valamint a lehetséges további
            lépések és azok kockázatai.
          </p>

          <p>
            A jogi segítség az ügy helyzetétől függően jelenthet tanácsadást,
            iratok áttekintését, okiratok elkészítését, egyeztetésen való
            közreműködést vagy szükség esetén eljárási képviseletet.
          </p>

          <h2>Jogi támogatás a munkaviszony teljes időtartama alatt</h2>

          <p>
            A munkajog a munkaviszony szinte valamennyi szakaszát érintheti, a
            munkaszerződés megkötésétől kezdve a munkaviszony megszűnéséig. Az
            ügy sajátosságaitól függően szükség lehet szerződések áttekintésére,
            jogi vélemény készítésére, okiratok szerkesztésére vagy eljárásokban
            történő képviseletre.
          </p>

          <p>
            Különösen fontos a munkabérrel, túlórával, szabadsággal és egyéb
            munkakörülményekkel kapcsolatos jogok és kötelezettségek pontos
            ismerete, mivel ezek a munkaviszony mindennapi részét képezik.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük az ügy előzményeit, a
            rendelkezésre álló dokumentumokat és az Ön célját. Ennek alapján
            ismertetem a szóba jöhető jogi megoldásokat, azok várható előnyeit,
            kockázatait és a szükséges további lépéseket.
          </p>

          <p>
            Amennyiben rendelkezésre állnak munkaszerződések, munkáltatói
            intézkedések, bérelszámolások vagy egyéb kapcsolódó iratok, érdemes
            azokat a konzultációra magával hozni, mert ezek ismeretében pontosabb
            jogi álláspont alakítható ki.
          </p>

          <h2>Személyre szabott munkajogi segítség</h2>

          <p>
            Minden munkajogi ügy más, ezért az alkalmazható jogi megoldás mindig
            az adott munkaviszony, az érintett felek és a konkrét körülmények
            figyelembevételével határozható meg. Célom, hogy ügyfeleim
            megalapozott döntést hozhassanak, és munkajogi kérdéseikre érthető,
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
            'Munkajogi segítség Veszprémben munkavállalók és munkáltatók részére.',
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
            'https://ugyvedimegoldas.hu/szolgaltatasok/munkajog#service',
          name: 'Munkajogi ügyvédi szolgáltatás',
          description:
            'Jogi tanácsadás, okiratszerkesztés és képviselet munkajogi ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/munkajog',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Munkajogi ügyvédi szolgáltatás'
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
              name: 'Munkajog',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/munkajog'
            }
          ]
        }
      ]}
    />
  )
}