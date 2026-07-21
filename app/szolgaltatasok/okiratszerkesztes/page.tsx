import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Okiratszerkesztés Veszprém | Ügyvédi okiratok készítése',
  description:
    'Ügyvédi okiratszerkesztés Veszprémben. Meghatalmazások, polgári jogi szerződések, nyilatkozatok, tartozáselismerések, egyedi okiratok és szerződések véleményezése. Több mint 25 év szakmai tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/okiratszerkesztes'
  },
  openGraph: {
    title: 'Okiratszerkesztés Veszprém | Ügyvédi okiratok készítése',
    description:
      'Ügyvédi közreműködéssel készített szerződések, nyilatkozatok és egyéb jogi okiratok a jogszabályoknak megfelelően, az Ön egyedi élethelyzetéhez igazítva.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/okiratszerkesztes',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function Okiratszerkesztes() {
  return (
    <CategoryTemplate
      heroTitle="Okiratszerkesztés"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Ügyvédi közreműködéssel készített szerződések, nyilatkozatok és egyéb jogi okiratok a jogszabályoknak megfelelően, az Ön egyedi élethelyzetéhez igazítva."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Okiratszerkesztés', href: '/szolgaltatasok/okiratszerkesztes' }
      ]}

      introTitle="Ügyvédi okiratszerkesztés Veszprémben"
      introContent={
        <>
          <p>
            Számos élethelyzetben szükség lehet olyan szerződésre, nyilatkozatra vagy
            egyéb jogi okiratra, amely pontosan tükrözi a felek akaratát és megfelel a
            hatályos jogszabályoknak. A megfelelően elkészített okirat nemcsak a felek
            jogainak és kötelezettségeinek egyértelmű rögzítését szolgálja, hanem
            hozzájárulhat a későbbi jogviták megelőzéséhez is.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal nyújtok segítséget különböző
            polgári jogi okiratok elkészítésében, véleményezésében és szükség szerinti
            módosításában. Az alábbi szolgáltatások közül kiválaszthatja az Ön ügyéhez
            leginkább kapcsolódó területet.
          </p>
        </>
      }

      subServicesTitle="Okiratszerkesztési szolgáltatások"
      subServices={[
        {
          title: 'Polgári jogi szerződések',
          href: '/szolgaltatasok/okiratszerkesztes/polgari-jogi-szerzodesek',
          description:
            'Polgári jogi szerződések elkészítése és véleményezése az adott jogviszonyhoz igazodva, a felek érdekeinek figyelembevételével.',
          icon: '/images/okiratszerkesztes/szerzodesek.png'
        },
        {
          title: 'Meghatalmazások',
          href: '/szolgaltatasok/okiratszerkesztes/meghatalmazasok',
          description:
            'Meghatalmazások elkészítése különböző ügyintézésekhez, képviselethez és jognyilatkozatok megtételéhez.',
          icon: '/images/okiratszerkesztes/meghatalmazas.png'
        },
        {
          title: 'Nyilatkozatok',
          href: '/szolgaltatasok/okiratszerkesztes/nyilatkozatok',
          description:
            'Jogi nyilatkozatok elkészítése, amelyek egyértelműen és megfelelő formában rögzítik a nyilatkozó akaratát.',
          icon: '/images/okiratszerkesztes/nyilatkozat.png'
        },
        {
          title: 'Tartozáselismerés és fizetési megállapodások',
          href: '/szolgaltatasok/okiratszerkesztes/tartozaselismeres',
          description:
            'Tartozáselismerő nyilatkozatok és fizetési megállapodások elkészítése az egyedi körülmények figyelembevételével.',
          icon: '/images/okiratszerkesztes/tartozaselismeres.png'
        },
        {
          title: 'Egyedi okiratok készítése',
          href: '/szolgaltatasok/okiratszerkesztes/egyedi-okiratok',
          description:
            'Olyan okiratok elkészítése, amelyekre nincs egységes minta, és amelyek az adott ügy sajátosságaihoz igazodnak.',
          icon: '/images/okiratszerkesztes/egyedi-okirat.png'
        },
        {
          title: 'Okiratok véleményezése',
          href: '/szolgaltatasok/okiratszerkesztes/okiratok-velemenyezese',
          description:
            'Már elkészült szerződések és egyéb okiratok jogi áttekintése, a lehetséges kockázatok és módosítási javaslatok ismertetése.',
          icon: '/images/okiratszerkesztes/velemenyezes.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miért fontos a megfelelően elkészített jogi okirat?</h2>

          <p>
            Egy szerződés vagy más jogi okirat hosszú időre meghatározhatja a felek
            jogait és kötelezettségeit. A pontatlan vagy hiányos megfogalmazás
            félreértésekhez, későbbi jogvitákhoz vagy akár érvényesíthetőségi
            problémákhoz is vezethet. Ezért célszerű már az okirat elkészítése előtt
            áttekinteni az adott jogviszony sajátosságait és a felek céljait.
          </p>

          <p>
            Az ügyvédi közreműködéssel készített okiratok célja, hogy a felek
            megállapodását jogilag megfelelő formában rögzítsék, figyelembe véve a
            vonatkozó jogszabályokat és az ügy egyedi körülményeit.
          </p>

          <h2>Milyen esetekben lehet szükség okiratszerkesztésre?</h2>

          <p>
            A mindennapi életben számos olyan helyzet adódhat, amikor célszerű írásban
            rendezni a felek közötti megállapodást vagy jognyilatkozatot. Ilyen lehet
            például egy polgári jogi szerződés elkészítése, meghatalmazás adása,
            tartozás rendezése vagy egyéb olyan nyilatkozat megtétele, amelynek később
            jogi jelentősége lehet.
          </p>

          <p>
            Nem minden ügy igényel azonos tartalmú vagy formájú okiratot. Az
            alkalmazható megoldást minden esetben az adott jogviszony, a felek szándéka
            és az elérni kívánt cél határozza meg.
          </p>

          <h2>Okirat készítése vagy meglévő szerződés ellenőrzése?</h2>

          <p>
            Nem minden esetben szükséges új okirat készítése. Gyakran előfordul, hogy az
            ügyfél már rendelkezik egy szerződéstervezettel vagy egy másik fél által
            előkészített dokumentummal, azonban szeretné annak tartalmát jogi szempontból
            is áttekinteni.
          </p>

          <p>
            Az okirat véleményezése során feltárhatók azok a rendelkezések, amelyek
            később kockázatot jelenthetnek, illetve szükség esetén javaslat tehető azok
            módosítására vagy pontosítására.
          </p>

          <h2>Hogyan zajlik a konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük, hogy milyen jogviszony rendezéséhez
            szükséges okirat elkészítése vagy véleményezése. Ennek alapján
            meghatározzuk, milyen dokumentumokra, adatokra vagy nyilatkozatokra lesz
            szükség.
          </p>

          <p>
            Ha már rendelkezésre áll szerződéstervezet vagy más okirat, annak áttekintése
            után ismertetem az esetleges módosítási lehetőségeket és a további szükséges
            lépéseket. Új okirat készítése esetén közösen pontosítjuk a felek akaratát,
            hogy az megfelelően jelenjen meg az elkészülő dokumentumban.
          </p>

          <h2>Személyre szabott jogi megoldások</h2>

          <p>
            Nincs két teljesen azonos ügy. Egy szerződés vagy nyilatkozat tartalmát
            minden esetben az adott élethelyzethez, a felek céljaihoz és a jogviszony
            sajátosságaihoz kell igazítani.
          </p>

          <p>
            Célom, hogy ügyfeleim olyan jogi okiratot kapjanak, amely világosan rögzíti
            a megállapodásukat, megfelel a hatályos jogszabályoknak, és hosszú távon is
            biztonságos alapot jelenthet jogaik érvényesítéséhez. Személyes
            konzultációra Veszprémben, előzetes egyeztetés alapján pedig online
            konzultációra is lehetőség van.
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
            'Ügyvédi okiratszerkesztés Veszprémben. Meghatalmazások, polgári jogi szerződések, nyilatkozatok, tartozáselismerések, egyedi okiratok és szerződések véleményezése.',
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
            'https://ugyvedimegoldas.hu/szolgaltatasok/okiratszerkesztes#service',
          name: 'Okiratszerkesztési ügyvédi szolgáltatás',
          description:
            'Jogi tanácsadás és okiratszerkesztés polgári jogi szerződések, meghatalmazások, nyilatkozatok és egyéb jogi okiratok esetén Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/okiratszerkesztes',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Okiratszerkesztési ügyvédi szolgáltatás'
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
              name: 'Okiratszerkesztés',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/okiratszerkesztes'
            }
          ]
        }
      ]}
    />
  )
}