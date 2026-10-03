import ServiceTemplate from '@/components/ServiceTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Díjszabás - Ügyvédi munkadíjak és mediációs árak | dr. Léner-Pintér Sára',
  description:
    'Tekintse meg ügyvédi és mediációs szolgáltatásaim díjszabását. Konzultáció, okiratszerkesztés, képviselet és mediáció árai Veszprémben.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/dijszabas'
  },
  openGraph: {
    title: 'Díjszabás - Ügyvédi munkadíjak és mediációs árak',
    description:
      'Tekintse meg ügyvédi és mediációs szolgáltatásaim díjszabását Veszprémben.',
    url: 'https://ugyvedimegoldas.hu/dijszabas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  },
  keywords:
    'ügyvédi díjszabás, mediáció ár, ügyvédi munkadíj, jogi tanácsadás díja, Veszprém'
}

export default function DijszabasPage() {
  return (
    <ServiceTemplate
    showHero={false}
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
          <div className="category-intro">
            <h1 className="typo-h1-page">Díjszabás</h1>

            <p>
              Az ügyvédi munkadíj tartalmazza az emberi hozzáállás,
              szaktudás és tapasztalat rendelkezésre bocsátását, hogy
              ügyei hatékonyan és gyorsan megoldódjanak.
            </p>
          </div>

          <h2>
            Ügyvédi munkadíjak és mediációs díjak
          </h2>

          <p>
            Az Ön ügyével foglalkozó ügyvéd kiválasztása az Ön szabadsága.
            A kiválasztott ügyvédnek járó ügyvédi munkadíj a felek közti
            szabad megegyezés tárgya, melyet esetemben az Ügyfél számla
            ellenében készpénzben vagy utalással teljesít.
          </p>

          <p>
            A munkadíj összegét együttesen határozom meg az Ügyfelekkel
            az ügy jellegének figyelembevételével, és azt a megbízási
            szerződésben rögzítjük.
          </p>

          <div className="table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Terület</th>
                  <th>Szolgáltatás</th>
                  <th>Díj</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Konzultáció</td>
                  <td>Első konzultáció</td>
                  <td><strong>30.000 Ft/óra</strong></td>
                </tr>

                <tr>
                  <td>Konzultáció</td>
                  <td>További konzultáció</td>
                  <td><strong>25.000 Ft/óra</strong></td>
                </tr>

                <tr>
                  <td>Okiratszerkesztés</td>
                  <td>Egyszerű szerződések</td>
                  <td><strong>50.000 Ft-tól</strong></td>
                </tr>

                <tr>
                  <td>Okiratszerkesztés</td>
                  <td>Összetett szerződések</td>
                  <td><strong>100.000 Ft-tól</strong></td>
                </tr>

                <tr>
                  <td>Okiratszerkesztés</td>
                  <td>Bérleti szerződés</td>
                  <td>
                    <strong>
                      1 havi bérleti díj, de legalább 95.000 Ft
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td>Képviselet</td>
                  <td>Bírósági képviselet</td>
                  <td><strong>150.000 Ft-tól</strong></td>
                </tr>

                <tr>
                  <td>Képviselet</td>
                  <td>Hatósági eljárás</td>
                  <td><strong>100.000 Ft-tól</strong></td>
                </tr>

                <tr>
                  <td>
                    Családjog, közigazgatási jog és munkajog
                  </td>
                  <td>
                    Az ügy bonyolultsága alapján
                  </td>
                  <td>
                    <strong>Egyedi díjmegállapítás</strong>
                  </td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Mediációs ülés – közös, 2 fő</td>
                  <td><strong>20.000 Ft/óra</strong></td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Egyéni mediáció / egyéni beszélgetés</td>
                  <td><strong>17.000 Ft/óra</strong></td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Válási mediáció</td>
                  <td><strong>17.500 Ft/óra</strong></td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Családi mediáció</td>
                  <td>
                    <strong>
                      15.000 Ft/óra
                      <br />
                      2 fő felett +1.000 Ft/fő
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Szülőtársi mediáció</td>
                  <td><strong>12.500 Ft/óra/fő</strong></td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Válási konzultáció – személyes</td>
                  <td><strong>40.000 Ft/óra</strong></td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Válási konzultáció – online</td>
                  <td><strong>36.000 Ft/óra</strong></td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>
                    Mediációs megállapodás / szerződés elkészítése
                  </td>
                  <td><strong>50.000 Ft/dokumentum</strong></td>
                </tr>

                <tr>
                  <td>Mediáció</td>
                  <td>Mediációs előkészítő ülés</td>
                  <td><strong>17.000 Ft/alkalom</strong></td>
                </tr>

                <tr>
                  <td>Előzetes egyeztetés</td>
                  <td>Kapcsolatfelvétel, előzetes megbeszélés</td>
                  <td><strong>0 Ft</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Fontos tudnivalók a díjakról</h2>

          <p>
            A feltüntetett árak tájékoztató jellegűek. A munkadíj az
            ügy jellegétől, súlyától, bonyolultságától, időtartamától és
            a szükséges munka mennyiségétől függően változhat. A pontos
            munkadíjat az ügy megismerése után, előzetesen egyeztetjük és
            a megbízási szerződésben rögzítjük.
          </p>

          <div className="callout callout-info">
            <strong>Az ügyvédi díj nem tartalmazza</strong> az eljárási
            díjakat, illetékeket, utazási költséget, tulajdoni lap és
            térképmásolat díját, az elektronikus eljárás díját,
            postaköltséget, kamarai hozzájárulást, cégkivonat és egyéb
            készkiadások költségét.
          </div>
        </>
      }
      timelineTitle="Kapcsolat"
      timelineSteps={[]}
      faqTitle="Gyakori kérdések a díjszabásról"
      faqItems={[
        {

          question: 'Mennyibe kerül egy első konzultáció?',
          answer:
            'Az első konzultáció díja 30.000 Ft/óra. A konzultáció során áttekintjük az ügyét, és tájékoztatást adok a lehetséges jogi lépésekről és a várható költségekről.'
        },
        {
          question: 'Milyen fizetési módokat fogad el?',
          answer:
            'A munkadíjat készpénzben vagy banki utalással egyenlítheti ki, számla ellenében. A fizetés részleteiről a megbízási szerződésben állapodunk meg.'
        },
        {
          question: 'Mi az, amit az ügyvédi díj nem tartalmaz?',
          answer:
            'Az ügyvédi díj nem tartalmazza az eljárási díjakat, illetékeket, utazási költséget, tulajdoni lap és térképmásolat díját, az elektronikus eljárás díját, postaköltséget, kamarai hozzájárulást, cégkivonat és egyéb készkiadások költségét.'
        },
        {
          question: 'Lehet-e egyezséget kötni a díjról?',
          answer:
            'Igen, a munkadíj összegét együttesen határozom meg az Ügyfelekkel az ügy jellegének figyelembevételével, és azt a megbízási szerződésben rögzítjük.'
        }
      ]}
      disclaimer="Az itt található információk általános tájékoztatást szolgálnak, és nem helyettesítik az egyedi jogi tanácsadást. A díjak tájékoztató jellegűek, a pontos árak az ügy megismerése után kerülnek meghatározásra a megbízási szerződésben."
    />
  )
}