import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Családjogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
  description:
    'Családjogi segítség Veszprémben válás, szülői felügyelet, kapcsolattartás, gyermektartás és házastársi vagyonjog esetén. Több mint 25 év szakmai tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog'
  },
  openGraph: {
    title: 'Családjogi ügyvéd Veszprém | dr. Léner-Pintér Sára',
    description:
      'Jogi segítség családjogi ügyekben Veszprémben: válás, szülői felügyelet, kapcsolattartás, gyermektartás és házastársi vagyonjog.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function Csaladjog() {
  return (
    <CategoryTemplate
      heroTitle="Családjogi ügyvéd Veszprémben"
      heroSubtitle="dr. Léner-Pintér Sára"
      heroDescription="Jogi segítség válással, szülői felügyelettel, kapcsolattartással, gyermektartással és házastársi vagyonjoggal kapcsolatos ügyekben."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' }
      ]}

      introTitle="Családjogi segítség Veszprémben"
      introContent={
        <>
          <p>
            A családjogi kérdések gyakran egy jelentős élethelyzeti változáshoz
            kapcsolódnak, és a jogi döntések hosszú távon is hatással lehetnek
            az érintettek és gyermekeik életére. Veszprémi ügyvédi irodámban
            válással, szülői felügyelettel, a gyermek lakóhelyével,
            kapcsolattartással, gyermektartással és házastársi vagyonjoggal
            kapcsolatos ügyekben nyújtok jogi segítséget.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal arra törekszem, hogy
            ügyfeleim érthető tájékoztatást kapjanak a lehetőségeikről, és az
            ügyük körülményeihez igazodó, jogilag megalapozott döntést
            hozhassanak. Az alábbi témák közül kiválaszthatja az Ön helyzetéhez
            legközelebb álló szolgáltatást.
          </p>
        </>
      }

      subServicesTitle="Családjogi szolgáltatások"
      subServices={[
        {
          title: 'Válóper',
          href: '/szolgaltatasok/csaladjog/valoper',
          description:
            'Jogi segítség a házasság felbontásához, az egyezség előkészítéséhez és a válóper során felmerülő kérdések rendezéséhez.',
          icon: '/images/csaladjog/válóper.png'
        },
        {
          title: 'Szülői felügyelet és a gyermek lakóhelye',
          href: '/szolgaltatasok/csaladjog/szuloi-felugyelet',
          description:
            'A szülői felügyelet gyakorlásának és a gyermek lakóhelyének rendezése megállapodás vagy bírósági eljárás keretében.',
          icon: '/images/csaladjog/szülői-felügyelet.png'
        },
        {
          title: 'Gyermektartás',
          href: '/szolgaltatasok/csaladjog/gyermektartas',
          description:
            'Jogi segítség a gyermektartásdíj megállapításához, módosításához, érvényesítéséhez vagy megszüntetéséhez.',
          icon: '/images/csaladjog/gyermektartás.png'
        },
        {
          title: 'Kapcsolattartás',
          href: '/szolgaltatasok/csaladjog/kapcsolattartas',
          description:
            'A különélő szülő és a gyermek közötti kapcsolattartás rendezése, módosítása vagy végrehajtásával kapcsolatos jogi segítség.',
          icon: '/images/csaladjog/kapcsolattartás.png'
        },
        {
          title: 'Házastársi vagyonmegosztás',
          href: '/szolgaltatasok/csaladjog/vagyonmegosztas',
          description:
            'A házastársi közös vagyon és a különvagyon körének tisztázása, valamint a vagyoni igények rendezése.',
          icon: '/images/csaladjog/vagyonmegosztás.png'
        },
        {
          title: 'Házassági vagyonjogi szerződés',
          href: '/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
          description:
            'Házassági vagyonjogi szerződés készítése a felek vagyoni viszonyainak előzetes és egyértelmű rendezéséhez.',
          icon: '/images/csaladjog/házassági-vagyonjogi-szerződés.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet a családjogi tanácsadás?</h2>

          <p>
            A családjogi ügyekben sokszor már az eljárás megindítása előtt
            érdemes tisztázni, hogy milyen jogok, kötelezettségek és lehetséges
            megoldások merülhetnek fel. A megfelelő jogi tájékoztatás segítséget
            adhat annak mérlegeléséhez, hogy van-e lehetőség megállapodásra,
            milyen iratokra lehet szükség, illetve milyen eljárási lépések
            várhatók.
          </p>

          <p>
            A jogi segítség nem kizárólag a bírósági képviseletet jelentheti.
            Szükség lehet egy megállapodás vagy beadvány elkészítésére, meglévő
            iratok áttekintésére, a lehetséges jogi következmények
            értékelésére, illetve az egyeztetések során történő képviseletre is.
            Az alkalmazható megoldás mindig az adott ügy tényeitől és az
            érintettek körülményeitől függ.
          </p>

          <h2>Megállapodás vagy bírósági eljárás?</h2>

          <p>
            Családjogi ügyekben sok esetben célszerű először megvizsgálni, hogy
            a vitás kérdések rendezhetők-e a felek megállapodásával. Egy
            kellően pontos, átgondolt és jogilag megfelelő egyezség
            csökkentheti a későbbi félreértések és újabb viták kockázatát.
          </p>

          <p>
            Ha nincs lehetőség megállapodásra, vagy az egyik fél nem működik
            együtt, bírósági vagy más hatósági eljárás válhat szükségessé.
            Ilyenkor különösen fontos a kérelmek, nyilatkozatok, bizonyítékok és
            határidők megfelelő kezelése. Gyermeket érintő kérdésekben a
            döntések során a gyermek érdeke kiemelt jelentőségű.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük az ügy előzményeit, a jelenlegi
            helyzetet és az Ön által elérni kívánt eredményt. Ennek alapján
            felvázolom a szóba jöhető jogi lehetőségeket, azok előnyeit,
            kockázatait és várható következményeit.
          </p>

          <p>
            Amennyiben rendelkezésre állnak korábbi megállapodások, bírósági
            vagy hatósági határozatok, levelezések, szerződések vagy más
            kapcsolódó iratok, ezeket érdemes a konzultációra előkészíteni. Az
            iratok és a körülmények ismeretében pontosabban meghatározható, hogy
            milyen további lépések lehetnek indokoltak.
          </p>

          <h2>Személyre szabott jogi segítség</h2>

          <p>
            Nincs két teljesen azonos családjogi ügy. Az alkalmazható jogi
            megoldást befolyásolhatja többek között a felek korábbi
            megállapodása, a gyermekek helyzete, a kialakult családi és vagyoni
            körülmények, valamint az, hogy van-e lehetőség együttműködésre.
          </p>

          <p>
            Célom, hogy ügyfeleim a döntéseik előtt világos és érthető
            tájékoztatást kapjanak, és olyan jogi megoldást alakítsunk ki, amely
            az adott élethelyzethez igazodik. Személyes konzultációra
            Veszprémben, előzetes egyeztetés alapján pedig online konzultációra
            is lehetőség van.
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
            'Családjogi segítség Veszprémben válással, szülői felügyelettel, kapcsolattartással, gyermektartással és házastársi vagyonjoggal kapcsolatos ügyekben.',
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
            'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog#service',
          name: 'Családjogi ügyvédi szolgáltatás',
          description:
            'Jogi tanácsadás, okiratszerkesztés és képviselet családjogi ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Családjogi ügyvédi szolgáltatás'
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
              name: 'Családjog',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog'
            }
          ]
        }
      ]}
    />
  )
}