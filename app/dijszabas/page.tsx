import ServiceTemplate from '@/components/ServiceTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Díjszabás - Ügyvédi munkadíjak és mediációs árak | dr. Léner-Pintér Sára',
  description: 'Tekintse meg ügyvédi és mediációs szolgáltatásaim díjszabását. Konzultáció, okiratszerkesztés, képviselet és mediáció árai Veszprémben.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/dijszabas'
  },
  openGraph: {
    title: 'Díjszabás - Ügyvédi munkadíjak és mediációs árak',
    description: 'Tekintse meg ügyvédi és mediációs szolgáltatásaim díjszabását Veszprémben.',
    url: 'https://ugyvedimegoldas.hu/dijszabas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  },
  keywords: 'ügyvédi díjszabás, mediáció ár, ügyvédi munkadíj, jogi tanácsadás díja, Veszprém'
}

export default function DijszabasPage() {
  return (
    <ServiceTemplate
      heroTitle=""
      heroSubtitle=""
      heroDescription=""
      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Díjszabás', href: '/dijszabas' }
      ]}
      trustItems={[
        { icon: '⚖️', text: '25 év jogi tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '💡', text: 'Egyéni díjmegállapítás' },
        { icon: '📋', text: 'Előzetes egyeztetés' },
        { icon: '🤝', text: 'Emberi hozzáállás' }
      ]}
      content={
        <>
          {/* ===== OLDAL BEVEZETŐ ===== */}
          <div className="category-intro mb-8">
            <h1 className="typo-h1-page">Díjszabás</h1>
            <p className="typo-body-intro mt-4">
              Az ügyvédi munkadíj tartalmazza az{' '}
              <span className="typo-highlight">emberi hozzáállás</span>, szaktudás
              és tapasztalat rendelkezésre bocsátását, hogy ügyei{' '}
              <span className="typo-highlight">hatékonyan és gyorsan</span>{' '}
              megoldódjanak!
            </p>
          </div>

          {/* ===== ÁLTALÁNOS INFORMÁCIÓK ===== */}
          <div className="section-card !p-8">
            <h2 className="typo-h2-left-decorated !text-2xl">
              Általános információk
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <p className="typo-body">
                  Az Ön ügyével foglalkozó ügyvéd kiválasztása az Ön szabadsága. 
                  A kiválasztott ügyvédnek járó ügyvédi munkadíj a felek közti 
                  szabad megegyezés tárgya, melyet esetemben az Ügyfél számla 
                  ellenében készpénzben vagy utalással teljesít.
                </p>
                <p className="typo-body mt-3">
                  A munkadíj összegét együttesen határozom meg az Ügyfelekkel az 
                  ügy jellegének figyelembevételével és azt a megbízási 
                  szerződésben rögzítjük.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="space-y-3">
                  <div>
                    <span className="typo-contact-label">Nyitva tartás</span>
                    <p className="typo-contact-value">Hétfő–Péntek: 9:00–18:00</p>
                  </div>
                  <div>
                    <span className="typo-contact-label">Telefon</span>
                    <p className="typo-contact-value">+36 20 490 5530</p>
                  </div>
                  <div>
                    <span className="typo-contact-label">E-mail</span>
                    <p className="typo-contact-value">drlpsmobil@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SZOLGÁLTATÁSOK KÁRTYÁKBAN ===== */}
          <div className="section-card !p-8 mt-6">
            <h2 className="typo-h2-left-decorated !text-2xl">
              Ügyvédi szolgáltatások
            </h2>
            <div className="service-grid-modern mt-4">
              {/* Konzultáció */}
              <div className="service-card-modern !shadow-sm">
                <div className="service-card-content !p-6">
                  <h3 className="typo-service-title !text-lg !border-none !pb-0">Konzultáció</h3>
                  <ul className="typo-list-dash mt-3 space-y-2 text-gray-600">
                    <li>
                      <span className="typo-body-strong">Első konzultáció:</span>{' '}
                      30.000 Ft/óra
                    </li>
                    <li>
                      <span className="typo-body-strong">Továbbá:</span>{' '}
                      25.000 Ft/óra
                    </li>
                  </ul>
                  <p className="typo-body-small text-gray-500 mt-3">
                    Az ügy bonyolultságától és időtartamától függően változhat.
                  </p>
                </div>
              </div>

              {/* Okiratszerkesztés */}
              <div className="service-card-modern !shadow-sm">
                <div className="service-card-content !p-6">
                  <h3 className="typo-service-title !text-lg !border-none !pb-0">Okiratszerkesztés</h3>
                  <ul className="typo-list-dash mt-3 space-y-2 text-gray-600">
                    <li>
                      <span className="typo-body-strong">Egyszerű szerződések:</span>{' '}
                      50.000 Ft-tól
                    </li>
                    <li>
                      <span className="typo-body-strong">Összetett szerződések:</span>{' '}
                      100.000 Ft-tól
                    </li>
                  </ul>
                  <p className="typo-body-small text-gray-500 mt-3">
                    Pl. adásvétel, cégalapítás, engedélyezési dokumentáció.
                  </p>
                </div>
              </div>

              {/* Képviselet */}
              <div className="service-card-modern !shadow-sm">
                <div className="service-card-content !p-6">
                  <h3 className="typo-service-title !text-lg !border-none !pb-0">Képviselet</h3>
                  <ul className="typo-list-dash mt-3 space-y-2 text-gray-600">
                    <li>
                      <span className="typo-body-strong">Bírósági képviselet:</span>{' '}
                      150.000 Ft-tól
                    </li>
                    <li>
                      <span className="typo-body-strong">Hatósági eljárás:</span>{' '}
                      100.000 Ft-tól
                    </li>
                  </ul>
                  <p className="typo-body-small text-gray-500 mt-3">
                    Peres és peren kívüli eljárásokban óradíjas vagy fix összeg.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== MEDIÁCIÓ RÉSZLETESEN ===== */}
          <div className="section-card !p-8 mt-6">
            <h2 className="typo-h2-left-decorated !text-2xl">Mediáció</h2>
            <p className="typo-body mt-2 text-gray-600">
              Várható költségek, melyek az eset függvényében és a felek számától 
              függően változhatnak:
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="typo-table typo-table-compact w-full">
                <thead>
                  <tr>
                    <th>Szolgáltatás</th>
                    <th className="text-right">Díj</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mediációs ülés (közös, 2 fő)</td>
                    <td className="text-right font-medium">20.000 Ft/óra</td>
                  </tr>
                  <tr>
                    <td>Egyéni mediáció / egyéni beszélgetés</td>
                    <td className="text-right font-medium">17.000 Ft/óra</td>
                  </tr>
                  <tr>
                    <td>Válási mediáció</td>
                    <td className="text-right font-medium">17.500 Ft/óra</td>
                  </tr>
                  <tr>
                    <td>Családi mediáció</td>
                    <td className="text-right font-medium">
                      15.000 Ft/óra (2 fő felett +1.000 Ft/fő)
                    </td>
                  </tr>
                  <tr>
                    <td>Szülőtársi mediáció</td>
                    <td className="text-right font-medium">12.500 Ft/óra/fő</td>
                  </tr>
                  <tr>
                    <td>Válási konzultáció (személyes)</td>
                    <td className="text-right font-medium">40.000 Ft/óra</td>
                  </tr>
                  <tr>
                    <td>Válási konzultáció (online)</td>
                    <td className="text-right font-medium">36.000 Ft/óra</td>
                  </tr>
                  <tr>
                    <td>Mediációs megállapodás / szerződés elkészítése</td>
                    <td className="text-right font-medium">50.000 Ft/dokumentum</td>
                  </tr>
                  <tr>
                    <td>Mediációs előkészítő ülés</td>
                    <td className="text-right font-medium">17.000 Ft/alkalommal</td>
                  </tr>
                  <tr className="border-t-2 border-gray-200 font-medium">
                    <td className="text-primary">Kapcsolatfelvétel, előzetes megbeszélés</td>
                    <td className="text-right text-accent font-bold">0 Ft</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="typo-body-small text-gray-500 mt-4">
              * A fenti árak tájékoztató jellegűek, az eset függvényében változhatnak.
            </p>
          </div>

          {/* ===== TOVÁBBI PÉLDÁK ===== */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="section-card !p-6 !mb-0">
              <h3 className="typo-h4-uppercase text-accent">
                Családjogi, Közigazgatási &amp; Munkajog
              </h3>
              <p className="typo-body mt-2">
                A díj az Ügyféllel történt konzultáció és az ügy bonyolultsága 
                alapján kerül meghatározásra.
              </p>
            </div>
            <div className="section-card !p-6 !mb-0">
              <h3 className="typo-h4-uppercase text-accent">Bérleti szerződés</h3>
              <p className="typo-body mt-2">
                <span className="typo-body-strong">Díj:</span> 1 havi bérleti 
                díjnak megfelelő összeg, de legalább{' '}
                <span className="typo-highlight">95.000 Ft</span>
              </p>
            </div>
          </div>

          {/* ===== FONTOS MEGJEGYZÉS ===== */}
          <div className="section-card !p-8 mt-6 bg-blue-50/30 border-blue-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <h4 className="typo-body-strong text-primary text-lg">
                  Fontos tudnivaló
                </h4>
                <p className="typo-body text-gray-700">
                  <strong>Az ügyvédi díj nem tartalmazza</strong> az eljárási 
                  díjakat, illetékeket, utazási költséget, tulajdoni lap és 
                  térképmásolat díját, az elektronikus eljárás díját, 
                  postaköltséget, kamarai hozzájárulást, cégkivonat és egyéb 
                  készkiadások költségét.
                </p>
                <p className="typo-body-small mt-3 text-gray-600">
                  A fenti árak tájékoztató jellegűek. Pontos árajánlatot az ügy 
                  megismerése után tudok adni.
                </p>
              </div>
            </div>
          </div>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'bizonytalan a jogi helyzetében, tanácsra van szüksége',
          'szerződést, okiratot szeretne elkészíttetni',
          'bírósági vagy hatósági eljárás indult Ön ellen',
          'szeretné békés úton rendezni a családi vagy üzleti konfliktusát',
          'mediációval oldaná meg a vitás helyzetet',
          'gyermekelhelyezési vagy családjogi ügyben van szüksége segítségre',
          'cég alapításához vagy működtetéséhez kér jogi támogatást'
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/kapcsolat'
      }}

      timelineTitle="Hogyan zajlik a díjmegállapodás?"

      timelineSteps={[
        {
          number: 1,
          title: 'Kapcsolatfelvétel',
          description: 'Vegye fel velem a kapcsolatot telefonon vagy e-mailben, és vázolja az ügyet.'
        },
        {
          number: 2,
          title: 'Személyes konzultáció',
          description: 'Áttekintjük az ügy részleteit, bonyolultságát és várható időigényét.'
        },
        {
          number: 3,
          title: 'Díj meghatározása',
          description: 'Közösen rögzítjük a munkadíj összegét és a fizetési feltételeket.'
        },
        {
          number: 4,
          title: 'Megbízási szerződés',
          description: 'Aláírjuk a megbízási szerződést, amely tartalmazza a díjazás pontos összegét.'
        },
        {
          number: 5,
          title: 'Munka elvégzése',
          description: 'Elvégzem a vállalt jogi feladatokat, Ön pedig számla ellenében teljesít.'
        }
      ]}

      faqTitle="Gyakori kérdések a díjszabásról"

      faqItems={[
        {
          question: 'Mennyibe kerül egy első konzultáció?',
          answer: 'Az első konzultáció díja 30.000 Ft/óra. A konzultáció során áttekintjük az ügyét, és tájékoztatást adok a lehetséges jogi lépésekről és a várható költségekről.'
        },
        {
          question: 'Milyen fizetési módokat fogad el?',
          answer: 'A munkadíjat készpénzben vagy banki utalással egyenlítheti ki, számla ellenében. A fizetés részleteiről a megbízási szerződésben állapodunk meg.'
        },
        {
          question: 'Mi az, amit az ügyvédi díj nem tartalmaz?',
          answer: 'Az ügyvédi díj nem tartalmazza az eljárási díjakat, illetékeket, utazási költséget, tulajdoni lap és térképmásolat díját, az elektronikus eljárás díját, postaköltséget, kamarai hozzájárulást, cégkivonat és egyéb készkiadások költségét.'
        },
        {
          question: 'Lehet-e egyezséget kötni a díjról?',
          answer: 'Igen, a munkadíj összegét együttesen határozom meg az Ügyfelekkel az ügy jellegének figyelembevételével, és azt a megbízási szerződésben rögzítjük.'
        },
        {
          question: 'Mennyibe kerül egy bérleti szerződés elkészítése?',
          answer: 'A bérleti szerződés elkészítésének díja 1 havi bérleti díjnak megfelelő összeg, de legalább 95.000 Ft.'
        },
        {
          question: 'Változhat a díj az eljárás során?',
          answer: 'A munkadíj az ügyek egy részében (pl. peres eljárásokban, peren kívüli eljárásokban, és ügyvitelben) az adott ügy súlyához, bonyolultságához, illetve a munka mennyiségéhez igazodóan kerül kialakításra. A változásról minden esetben előzetesen tájékoztatom Önt.'
        },
        {
          question: 'Ingyenes az előzetes megbeszélés?',
          answer: 'Igen, a kapcsolatfelvétel és az előzetes megbeszélés díjtalan. Ez alkalmat ad arra, hogy felmérjük az ügyét, és tájékozódjon a további lépésekről.'
        },
        {
          question: 'Mediáció esetén hogyan alakulnak a költségek?',
          answer: 'A mediációs ülés díja 20.000 Ft/óra (2 fő esetén). A pontos költségek függnek a felek számától, az ülések számától és az ügy bonyolultságától. Minden esetben előzetes egyeztetés alapján határozzuk meg a várható költségeket.'
        }
      ]}

      disclaimer="Az itt található információk általános tájékoztatást szolgálnak, és nem helyettesítik az egyedi jogi tanácsadást. A díjak tájékoztató jellegűek, a pontos árak az ügy megismerése után kerülnek meghatározásra a megbízási szerződésben."
    />
  )
}