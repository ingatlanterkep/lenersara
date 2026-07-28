import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Peres képviselet Veszprém | dr. Léner-Pintér Sára',
  description:
    'Peres ügyvédi képviselet Veszprémben polgári jogi ügyekben. Jogi tanácsadás, perelőkészítés és bírósági képviselet több mint 25 év szakmai tapasztalattal.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/peres-kepviselet'
  },
  openGraph: {
    title: 'Peres képviselet Veszprém | dr. Léner-Pintér Sára',
    description:
      'Jogi segítség és bírósági képviselet polgári jogi ügyekben Veszprémben, a per előkészítésétől az eljárás lezárásáig.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/peres-kepviselet',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function PeresKepviselet() {
  return (
    <CategoryTemplate
      heroTitle="Peres képviselet Veszprémben"
      heroSubtitle="dr. Léner-Pintér Sára"
      heroDescription="Jogi tanácsadás, perelőkészítés és bírósági képviselet polgári jogi ügyekben."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        {
          label: 'Peres képviselet',
          href: '/szolgaltatasok/peres-kepviselet'
        }
      ]}

      introTitle="Peres ügyvédi képviselet Veszprémben"
      introContent={
        <>
          <p>
            Egy polgári jogvita során a megfelelő jogi stratégia, a
            rendelkezésre álló bizonyítékok pontos értékelése és az eljárási
            szabályok betartása alapvetően befolyásolhatja az ügy kimenetelét.
            Veszprémi ügyvédi irodámban peres és pert megelőző jogi segítséget,
            perelőkészítést, valamint bíróság előtti képviseletet nyújtok
            magánszemélyek és vállalkozások részére.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal arra törekszem, hogy
            ügyfeleim már a szükséges jogi lépések megtétele előtt érthető
            tájékoztatást kapjanak lehetőségeikről, a per várható
            következményeiről és kockázatairól. Az alábbi szolgáltatások közül
            kiválaszthatja az Ön ügyéhez leginkább kapcsolódó területet.
          </p>
        </>
      }

      subServicesTitle="Peres képviseleti szolgáltatások"
      subServices={[
        {
          title: 'Polgári peres képviselet',
          href:
            '/szolgaltatasok/peres-kepviselet/polgari-per',
          description:
            'Jogi képviselet polgári perekben, a per megindításának előkészítésétől a jogerős döntésig.',
          icon:
            '/images/peres-kepviselet/polgari-per.png'
        },
        {
          title: 'Szerződéses jogviták',
          href:
            '/szolgaltatasok/peres-kepviselet/szerzodeses-jogvitak',
          description:
            'Jogi segítség szerződésszegéssel, hibás teljesítéssel és elszámolási vitákkal kapcsolatos ügyekben.',
          icon:
            '/images/peres-kepviselet/szerzodeses-jogvitak.png'
        },
        {
          title: 'Kártérítési és sérelemdíj perek',
          href:
            '/szolgaltatasok/peres-kepviselet/karteritesi-perek',
          description:
            'Kártérítési és sérelemdíj-igények érvényesítése, vitatása és bíróság előtti képviselete.',
          icon:
            '/images/peres-kepviselet/karteritesi-perek.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet egy peres ügyvéd?</h2>

          <p>
            Egy jogvita esetén nem mindig egyértelmű, hogy érdemes-e pert
            indítani, milyen igény érvényesíthető, illetve milyen bizonyítékok
            szükségesek az álláspont alátámasztásához. A jogi konzultáció során
            áttekintjük az ügy előzményeit, a rendelkezésre álló iratokat, a
            felek közötti jogviszonyt és az elérni kívánt eredményt.
          </p>

          <p>
            A peres képviselet nem kizárólag a bírósági tárgyaláson való
            részvételt jelenti. A jogi segítség kiterjedhet a per megindítása
            előtti felszólításokra és egyeztetésekre, a kereset vagy az
            ellenkérelem előkészítésére, a bizonyítékok rendszerezésére, a
            beadványok elkészítésére, valamint az ügyfél bíróság előtti
            képviseletére is.
          </p>

          <h2>Perindítás előtt érdemes felmérni a lehetőségeket</h2>

          <p>
            A peres eljárás megindítása előtt fontos megvizsgálni a jogi igény
            megalapozottságát, a rendelkezésre álló bizonyítékokat, a várható
            költségeket, az eljárás időigényét és az esetleges végrehajthatóságot
            is. Egy kedvező bírósági döntés önmagában nem minden esetben
            jelenti azt, hogy a követelés ténylegesen és rövid időn belül
            behajtható.
          </p>

          <p>
            Az ügy körülményeitől függően célszerű lehet azt is mérlegelni,
            hogy a jogvita rendezhető-e egyezséggel. Egy megfelelően
            előkészített megállapodás sok esetben gyorsabb és kiszámíthatóbb
            megoldást jelenthet, mint egy hosszabb bírósági eljárás. Ha azonban
            nincs lehetőség megegyezésre, szükségessé válhat a jogok bírósági
            úton történő érvényesítése.
          </p>

          <h2>Felperesi és alperesi képviselet</h2>

          <p>
            Peres ügyben jogi segítségre nemcsak annak lehet szüksége, aki
            követelést kíván érvényesíteni. Ha Önnel szemben indítottak pert,
            különösen fontos a kereset és a mellékelt bizonyítékok mielőbbi
            áttekintése, valamint az előírt határidők betartása. A késedelmes
            vagy hiányos nyilatkozatok jelentősen ronthatják a védekezés
            lehetőségeit.
          </p>

          <p>
            A képviselet során az ügyfél álláspontjához és eljárási helyzetéhez
            igazodó jogi stratégia kialakítására törekszem, függetlenül attól,
            hogy az ügyfél felperesként vagy alperesként vesz részt az
            eljárásban.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük a jogvita történetét, a
            felek közötti korábbi egyeztetéseket, a rendelkezésre álló
            dokumentumokat és az Ön célját. Ennek alapján ismertetem a szóba
            jöhető jogi lehetőségeket, a szükséges eljárási lépéseket, valamint
            az ügy várható kockázatait.
          </p>

          <p>
            A konzultáció előtt érdemes összegyűjteni minden olyan iratot,
            amely a jogvitához kapcsolódhat. Ilyen lehet különösen a felek
            közötti szerződés, megállapodás, felszólítás, levelezés, számla,
            jegyzőkönyv, szakvélemény, fénykép, határozat vagy korábbi
            bírósági irat.
          </p>

          <h2>Személyre szabott jogi stratégia</h2>

          <p>
            Nincs két teljesen azonos peres ügy. A megfelelő jogi megoldást
            befolyásolja a felek közötti jogviszony, az ügy előzménye, a
            rendelkezésre álló bizonyítékok, az elévülési és eljárási
            határidők, valamint az ügyfél által elérni kívánt eredmény.
          </p>

          <p>
            Célom, hogy ügyfeleim a döntéseik előtt világos és gyakorlatias
            tájékoztatást kapjanak, és az ügyük körülményeihez igazodó,
            megalapozott jogi stratégiát alakítsunk ki. Személyes
            konzultációra Veszprémben, előzetes egyeztetés alapján pedig
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
            'Peres ügyvédi képviselet és bírósági képviselet polgári jogi ügyekben Veszprémben.',
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
            'https://ugyvedimegoldas.hu/szolgaltatasok/peres-kepviselet#service',
          name: 'Peres ügyvédi képviselet',
          description:
            'Jogi tanácsadás, perelőkészítés és bírósági képviselet polgári jogi ügyekben Veszprémben.',
          url:
            'https://ugyvedimegoldas.hu/szolgaltatasok/peres-kepviselet',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Peres ügyvédi képviselet'
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
              name: 'Peres képviselet',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/peres-kepviselet'
            }
          ]
        }
      ]}
    />
  )
}