import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Öröklési ügyvéd Veszprém | dr. Léner-Pintér Sára',
  description:
    'Öröklési jogi segítség Veszprémben végrendelet, hagyatéki eljárás, kötelesrész, öröklési szerződés és öröklési jogvita esetén. Több mint 25 év szakmai tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/orokles'
  },
  openGraph: {
    title: 'Öröklési ügyvéd Veszprém | dr. Léner-Pintér Sára',
    description:
      'Jogi segítség öröklési ügyekben Veszprémben: végrendelet készítése, hagyatéki képviselet, kötelesrész, öröklési szerződés és öröklési jogviták.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/orokles',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function Orokles() {
  return (
    <CategoryTemplate
      heroTitle="Öröklés"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Jogi segítség végrendelet készítéséhez, hagyatéki eljáráshoz, kötelesrész érvényesítéséhez, öröklési szerződéshez és örökösök közötti jogviták rendezéséhez."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Öröklés', href: '/szolgaltatasok/orokles' }
      ]}

      introTitle="Öröklési jogi segítség Veszprémben"
      introContent={
        <>
          <p>
            Az öröklési kérdések rendezése egyaránt jelenthet előzetes tervezést és egy
            már megnyílt hagyatékkal kapcsolatos ügyintézést. Veszprémi ügyvédi
            irodámban végrendelet készítésével, hagyatéki eljárással, kötelesrésszel,
            öröklési szerződéssel és örökösök közötti jogvitákkal kapcsolatban nyújtok
            jogi segítséget.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal arra törekszem, hogy ügyfeleim
            érthető tájékoztatást kapjanak a lehetőségeikről, a szükséges jogi
            lépésekről és döntéseik várható következményeiről. Az alábbi szolgáltatások
            közül kiválaszthatja az Ön helyzetéhez legközelebb álló témát.
          </p>
        </>
      }

      subServicesTitle="Öröklési szolgáltatások"
      subServices={[
        {
          title: 'Végrendelet készítése',
          href: '/szolgaltatasok/orokles/vegrendelet',
          description:
            'Végrendelet elkészítése, módosítása és visszavonása az örökhagyó szándékának egyértelmű, jogszabályoknak megfelelő rögzítésével.',
          icon: '/images/orokles/vegrendelet.png'
        },
        {
          title: 'Hagyatéki eljárás',
          href: '/szolgaltatasok/orokles/hagyateki-eljaras',
          description:
            'Jogi tanácsadás és képviselet hagyatéki eljárásban, különösen vitás öröklési helyzetek, egyezségi lehetőségek vagy összetettebb vagyoni viszonyok esetén.',
          icon: '/images/orokles/hagyateki-eljaras.png'
        },
        {
          title: 'Öröklési jogviták',
          href: '/szolgaltatasok/orokles/oroklesi-jogvitak',
          description:
            'Jogi segítség az örökösök közötti viták, a végrendelet érvényességével kapcsolatos kérdések és más öröklési igények rendezéséhez.',
          icon: '/images/orokles/oroklesi-jogvitak.png'
        },
        {
          title: 'Kötelesrész',
          href: '/szolgaltatasok/orokles/kotelesresz',
          description:
            'Tájékoztatás a kötelesrészre való jogosultságról, az igény lehetséges mértékéről, érvényesítéséről és az ügy egyedi körülményeinek jelentőségéről.',
          icon: '/images/orokles/kotelesresz.png'
        },
        {
          title: 'Öröklési szerződés',
          href: '/szolgaltatasok/orokles/oroklesi-szerzodes',
          description:
            'Öröklési szerződés előkészítése és elkészítése, valamint a felek jogainak, kötelezettségeinek és a szerződés várható következményeinek áttekintése.',
          icon: '/images/orokles/oroklesi-szerzodes.png'
        },
        {
          title: 'Öröklési tanácsadás és okiratok',
          href: '/szolgaltatasok/orokles/oroklesi-tanacsadas',
          description:
            'Jogi tanácsadás örökléstervezéshez, öröklési nyilatkozatokhoz, megállapodásokhoz és egyéb, hagyatékkal kapcsolatos okiratok elkészítéséhez vagy véleményezéséhez.',
          icon: '/images/orokles/oroklesi-tanacsadas.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet az öröklési jogi tanácsadás?</h2>

          <p>
            Az öröklési jogi kérdések egy része még az örökhagyó életében, megfelelő
            előzetes tervezéssel rendezhető. Ilyen lehet például a végrendelet vagy az
            öröklési szerződés elkészítése, illetve annak áttekintése, hogy a kívánt
            vagyoni rendelkezéshez melyik jogi megoldás illeszkedik leginkább.
          </p>

          <p>
            Más esetekben a jogi segítségre az örökhagyó halálát követően, a hagyatéki
            eljárás alatt vagy annak lezárása után van szükség. Ilyenkor tisztázni
            kellhet az öröklés jogcímét, az örökösök egymással szembeni igényeit, a
            hagyaték összetételét vagy egy korábbi végintézkedés jogi jelentőségét.
          </p>

          <p>
            Az öröklési jogi segítség magában foglalhatja az iratok áttekintését, jogi
            álláspont kialakítását, okiratok és nyilatkozatok elkészítését, egyezségi
            tárgyalások támogatását, valamint szükség esetén az ügyfél képviseletét is.
          </p>

          <h2>Előzetes örökléstervezés</h2>

          <p>
            Az öröklés előzetes rendezésének célja, hogy az érintett egyértelműen és
            átgondoltan rendelkezzen vagyonának későbbi sorsáról. A megfelelő megoldás
            kiválasztásakor figyelembe kell venni a családi kapcsolatokat, a
            vagyontárgyak jellegét, a meglévő tulajdoni viszonyokat és az örökhagyó
            személyes szándékát.
          </p>

          <p>
            A végrendelet, az öröklési szerződés és az egyéb vagyoni rendelkezések nem
            azonos feltételekkel és jogkövetkezményekkel járnak. Ezért fontos, hogy az
            okirat elkészítése előtt az érintett megismerje az egyes lehetőségek közötti
            lényeges különbségeket.
          </p>

          <p>
            A pontosan megfogalmazott és megfelelő formában elkészített okirat
            csökkentheti annak kockázatát, hogy az örökhagyó akarata később
            félreérthetővé vagy vitathatóvá váljon.
          </p>

          <h2>Jogi segítség a hagyatéki eljárásban</h2>

          <p>
            A hagyatéki eljárás során kerül sor az öröklés rendjének és az örökösök
            személyének megállapítására, valamint a hagyaték átadására. Az ügyvéd
            közreműködése nem minden hagyatéki eljárásban szükséges, de indokolt lehet,
            ha az öröklésben érdekeltek között vita alakult ki, bizonytalan valamely
            igény jogalapja, vagy az ügy összetett vagyoni és családi körülményeket
            érint.
          </p>

          <p>
            A jogi képviselet segítséget jelenthet a rendelkezésre álló iratok
            értelmezésében, a szükséges nyilatkozatok előkészítésében, az igények
            megfelelő előadásában és az egyezségi lehetőségek értékelésében.
          </p>

          <p>
            Ha a hagyaték ingatlant, gazdasági társaságban fennálló részesedést,
            jelentősebb követelést vagy más összetettebb vagyonelemet tartalmaz, az
            öröklési és az ingatlanjogi kérdések egymással is összekapcsolódhatnak.
          </p>

          <h2>Megállapodás vagy jogvita?</h2>

          <p>
            Az örökösök között kialakuló nézeteltérések nem minden esetben vezetnek
            peres eljáráshoz. Sok esetben érdemes először megvizsgálni, hogy a vitás
            kérdések rendezhetők-e megfelelően előkészített megállapodással.
          </p>

          <p>
            Egy jogilag átgondolt egyezség rendezheti többek között a hagyaték
            megosztását, az egyes vagyontárgyak örökösök közötti elosztását vagy az
            egymással szemben támasztott vagyoni igényeket. Ehhez azonban szükséges,
            hogy a felek tisztában legyenek a megállapodás tartalmával és annak várható
            következményeivel.
          </p>

          <p>
            Ha nincs lehetőség megállapodásra, vagy valamelyik öröklési igény bírósági
            elbírálást igényel, peres eljárás válhat szükségessé. Ilyenkor különösen
            fontos az iratok, bizonyítékok, nyilatkozatok és eljárási határidők
            megfelelő kezelése.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük az ügy előzményeit, a rendelkezésre
            álló iratokat, az érintettek közötti kapcsolatot és az Ön által elérni
            kívánt célt. Ennek alapján felvázolom a szóba jöhető jogi lehetőségeket és
            a várható következő lépéseket.
          </p>

          <p>
            Végrendelet vagy öröklési szerződés készítése esetén fontos tisztázni a
            rendelkezésre álló vagyon körét, a családi viszonyokat és azt, hogy az
            ügyfél pontosan milyen vagyoni rendelkezést szeretne tenni.
          </p>

          <p>
            Hagyatéki vagy vitás öröklési ügyben érdemes előkészíteni többek között a
            rendelkezésre álló végintézkedést, hagyatéki leltárt, közjegyzői iratokat,
            korábbi szerződéseket, tulajdoni lapokat, levelezéseket és az ügy
            szempontjából lényeges egyéb dokumentumokat.
          </p>

          <p>
            Az iratok és az egyedi körülmények ismeretében pontosabban megítélhető,
            hogy szükséges-e további nyilatkozat, egyeztetés, okiratszerkesztés vagy
            jogi képviselet.
          </p>

          <h2>Személyre szabott segítség öröklési ügyekben</h2>

          <p>
            Nincs két teljesen azonos öröklési ügy. Az alkalmazható megoldást
            befolyásolhatja az örökhagyó családi helyzete, a hagyaték összetétele, egy
            esetleges végintézkedés tartalma, a korábbi ajándékozások, az örökösök
            közötti kapcsolat és az, hogy fennáll-e közöttük vita.
          </p>

          <p>
            Célom, hogy ügyfeleim érthető tájékoztatást kapjanak jogaikról,
            lehetőségeikről és döntéseik lehetséges következményeiről. Az ügy
            körülményeinek áttekintése után közösen határozzuk meg, hogy milyen jogi
            lépések lehetnek indokoltak.
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
            'Öröklési jogi segítség Veszprémben végrendelet, hagyatéki eljárás, kötelesrész, öröklési szerződés és öröklési jogvita esetén.',
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
            'https://ugyvedimegoldas.hu/szolgaltatasok/orokles#service',
          name: 'Öröklési ügyvédi szolgáltatás',
          description:
            'Jogi tanácsadás, okiratszerkesztés és képviselet öröklési ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/orokles',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Öröklési ügyvédi szolgáltatás'
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
              name: 'Öröklés',
              item: 'https://ugyvedimegoldas.hu/szolgaltatasok/orokles'
            }
          ]
        }
      ]}
    />
  )
}