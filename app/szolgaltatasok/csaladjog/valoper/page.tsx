import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Válóper ügyvéd Veszprém | Házasság felbontása',
  description: 'Válóper és házasság felbontása Veszprémben. Közös megegyezéses válás, peres válás, keresetlevél, egyezség és bírósági képviselet. Több mint 25 év tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/valoper'
  },
  openGraph: {
    title: 'Válóper ügyvéd Veszprém | Házasság felbontása',
    description: 'Válóper és házasság felbontása Veszprémben. Közös megegyezéses válás, peres válás, keresetlevél, egyezség és bírósági képviselet.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/valoper',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article'
  },
  keywords: 'válóper, házasság felbontása, közös megegyezéses válás, válóper ügyvéd, házasság bontás, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }]
}

export default function Valoper() {
  return (
    <ServiceTemplate
      heroTitle="Válóper"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Amiben segíteni tudok: közös megegyezéses válás, peres válás, keresetlevél, egyezség, bírósági képviselet."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        { label: 'Válóper', href: '/szolgaltatasok/csaladjog/valoper' }
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🤝', text: 'Békés megoldások támogatása' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '📋', text: 'Válóperes ügyek specialista' }
      ]}

      content={
        <>
          {/* ===== MIT ÉRDEMES TUDNI A VÁLÓPER MEGINDÍTÁSA ELŐTT? ===== */}
          <h2>Mit érdemes tudni a válóper megindítása előtt?</h2>

          <p>
            A házasság felbontásának alapvető feltétele, hogy a házastársi életközösség
            <strong>véglegesen és helyrehozhatatlanul megromlott</strong>. A bíróság
            akkor bontja fel a házasságot, ha megállapítja, hogy az életközösség
            véglegesen megszűnt, és a felek között a házassági kapcsolat helyreállítására
            nincs reális esély.
          </p>

          <p>
            A válóperes eljárás során a bíróság azt vizsgálja, hogy a házastársak között
            fennáll-e még a házassági életközösség. A gyakorlatban a bíróság nem törekszik
            a felek kibékítésére, hanem azt vizsgálja, hogy a házasság ténylegesen és
            véglegesen megszűnt-e.
          </p>

          <p>
            A válóper megindítása előtt érdemes átgondolni, hogy milyen kérdésekben
            tudnak a felek megegyezni, és miben van szükség bírósági döntésre. Minél
            több kérdésben sikerül megegyezni, annál gyorsabb és kevésbé konfliktusos
            lehet az eljárás.
          </p>

          {/* ===== KÖZÖS MEGEGYEZÉS VAGY PERES VÁLÁS? ===== */}
          <h2>Közös megegyezés vagy peres válás?</h2>

          <p>
            A házasság felbontásának két fő módja van: a <strong>közös megegyezéses
            válás</strong> és a <strong>peres válás</strong>. A választás attól függ,
            hogy a felek képesek-e együttműködni a válás feltételeinek rendezésében.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-gray-50)' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid var(--color-gray-200)' }}>Közös megegyezéses válás</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid var(--color-gray-200)' }}>Peres válás</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>✅ Gyorsabb eljárás</td>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>⏳ Hosszabb eljárás</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>💰 Kisebb költség</td>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>💰 Magasabb költség</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>🤝 Együttműködés a felek között</td>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>⚔️ Vita a felek között</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>📄 Kevesebb tárgyalás</td>
                  <td style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-gray-200)' }}>📄 Több tárgyalás</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.6rem 1rem' }}>👨‍⚖️ A bíróság jóváhagyja az egyezséget</td>
                  <td style={{ padding: '0.6rem 1rem' }}>👨‍⚖️ A bíróság dönt a vitás kérdésekben</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Fontos:</strong> a válóper során a gyermektartás, a kapcsolattartás,
            a vagyonmegosztás és a szülői felügyelet kérdései is rendezhetők, de ezeket
            külön eljárásokban is lehet kezelni.
          </p>

          {/* ===== HOGYAN ZAJLIK A VÁLÓPER? ===== */}
          <h2>Hogyan zajlik a válóper?</h2>

          <p>
            A válóper eljárása az alábbi fő lépésekből áll:
          </p>

          <p>
            <strong>1. Keresetlevél benyújtása</strong>
          </p>

          <p>
            Az eljárás a <strong>keresetlevél</strong> benyújtásával kezdődik a
            bírósághoz. A keresetlevélnek tartalmaznia kell a felek adatait, a házasság
            felbontásának okát, valamint a vitás kérdésekben foglalt álláspontot. A
            keresetlevélhez csatolni kell a házassági anyakönyvi kivonatot és egyéb
            szükséges dokumentumokat.
          </p>

          <p>
            <strong>2. Előkészítő szakasz</strong>
          </p>

          <p>
            A keresetlevél benyújtása után a bíróság értesíti az alperest, aki
            <strong>válasziratot</strong> nyújthat be. Ebben a szakaszban a bíróság
            tájékoztatja a feleket az egyezség lehetőségéről.
          </p>

          <p>
            <strong>3. Tárgyalások</strong>
          </p>

          <p>
            A bíróság <strong>tárgyalásokat</strong> tart, ahol meghallgatja a feleket
            és a tanúkat. A tárgyalások során a felek előadják érveiket, és bemutatják
            a bizonyítékokat. A bíróság – szükség esetén – szakértői véleményeket is
            beszerezhet.
          </p>

          <p>
            <strong>4. Bizonyítási eljárás</strong>
          </p>

          <p>
            Ha a felek nem tudnak megegyezni, a bíróság <strong>bizonyítási eljárást</strong>
            folytat le. Ennek során a felek bizonyítékokat terjesztenek elő, és a
            bíróság értékeli azokat. A bizonyítási eljárás célja, hogy a bíróság
            megalapozott döntést hozhasson a vitás kérdésekben.
          </p>

          <p>
            <strong>5. Ítélethirdetés</strong>
          </p>

          <p>
            Az eljárás végén a bíróság <strong>ítéletet</strong> hirdet, amelyben
            dönt a házasság felbontásáról és a vitás kérdésekről. Az ítélet ellen
            fellebbezésnek van helye, ha valamelyik fél nem ért egyet a döntéssel.
          </p>

          <p>
            <strong>6. Jogerőre emelkedés</strong>
          </p>

          <p>
            Az ítélet akkor válik jogerőssé, ha a felek nem nyújtanak be fellebbezést,
            vagy a fellebbezési eljárás lezárul. A jogerős ítélet alapján a házasság
            felbontását bejegyzik az anyakönyvbe.
          </p>

          {/* ===== MENNYI IDEIG TART A VÁLÓPER? ===== */}
          <h2>Mennyi ideig tart a válóper?</h2>

          <p>
            A válóper időtartama <strong>számos tényezőtől függ</strong>:
          </p>

          <ul>
            <li>
              <strong>Közös megegyezéses válás esetén</strong> az eljárás rendszerint
              gyorsabb, akár néhány hónap alatt lezárulhat.
            </li>
            <li>
              <strong>Peres válás esetén</strong> az eljárás időtartama jelentősen
              hosszabb lehet, és összetettebb ügyekben több hónapot vagy akár
              több mint egy évet is igénybe vehet.
            </li>
          </ul>

          <p>
            <strong>A válóper időtartamát befolyásoló tényezők:</strong>
          </p>

          <ul>
            <li>a felek együttműködési készsége,</li>
            <li>a vitás kérdések száma és összetettsége,</li>
            <li>szakértői vélemények beszerzésének szükségessége,</li>
            <li>a bíróság leterheltsége,</li>
            <li>a felek közötti egyezség lehetősége.</li>
          </ul>

          <p>
            <strong>Fontos:</strong> a válóper időtartama jelentősen csökkenthető, ha
            a felek együttműködnek és törekednek a megegyezésre.
          </p>

          {/* ===== LEHET MEGEGYEZNI? ===== */}
          <h2>Lehet megegyezni a válóper során?</h2>

          <p>
            <strong>Igen, és ez a legkedvezőbb megoldás.</strong>
          </p>

          <p>
            A felek a válóper <strong>bármely szakaszában</strong> köthetnek egyezséget.
            Az egyezség tartalmazhatja a házasság felbontásának feltételeit, a
            szülői felügyelet gyakorlását, a gyermek lakóhelyét, a tartásdíjat,
            a vagyonmegosztást és a kapcsolattartást.
          </p>

          <p>
            <strong>Az egyezség előnyei:</strong>
          </p>

          <ul>
            <li>gyorsabb és olcsóbb, mint a peres eljárás,</li>
            <li>kevésbé megterhelő érzelmileg,</li>
            <li>a felek maguk alakítják ki a számukra megfelelő megoldást,</li>
            <li>a bíróság jóváhagyása esetén az egyezség végrehajtható.</li>
          </ul>

          <p>
            Az egyezséget érdemes <strong>ügyvéd segítségével</strong> elkészíteni,
            hogy az jogilag is megfelelő legyen, és a későbbi vitákat elkerüljük.
          </p>

          {/* ===== MIRE KÉSZÜLJÖN AZ ELSŐ KONZULTÁCIÓRA? ===== */}
          <h2>Mire készüljön az első konzultációra?</h2>

          <p>
            Az első konzultáció során a leghasznosabb, ha az alábbi dokumentumokat
            és információkat előkészíti:
          </p>

          <ul>
            <li>
              <strong>Házassági anyakönyvi kivonat</strong> – a házasságkötés
              időpontjának és helyszínének igazolásához.
            </li>
            <li>
              <strong>Gyermekek adatai</strong> – a gyermekek születési anyakönyvi
              kivonata, életkora, iskolai adatai.
            </li>
            <li>
              <strong>Eddigi megállapodások</strong> – ha a felek korábban már
              kötöttek valamilyen megállapodást (pl. különválási egyezség, tartási
              megállapodás).
            </li>
            <li>
              <strong>Vitás kérdések</strong> – gondolja át, hogy mely kérdésekben
              van vita a házastársával (pl. gyermekelhelyezés, vagyonmegosztás,
              tartásdíj).
            </li>
            <li>
              <strong>Elérni kívánt eredmény</strong> – milyen kimenetelt szeretne
              elérni a válóperben? Mi lenne az Ön számára az ideális megoldás?
            </li>
          </ul>

          <p>
            Ezek az információk segítenek abban, hogy a konzultáció során pontosabb
            képet kapjunk a helyzetéről, és a lehető leghatékonyabban tudjuk
            meghatározni a további lépéseket.
          </p>

          {/* ===== MIÉRT ÉRDEMES ÜGYVÉDHEZ FORDULNI? ===== */}
          <h2>Miért érdemes ügyvédhez fordulni válóper esetén?</h2>

          <p>
            A válóper az egyik legfontosabb és legérzékenyebb jogi eljárás, amely
            hosszú távon is meghatározza a felek életét. Az ügyvéd segítsége több
            szempontból is elengedhetetlen:
          </p>

          <ul>
            <li>
              <strong>Szakértelem</strong> – az ügyvéd ismeri a vonatkozó jogszabályokat
              és a bírósági gyakorlatot, így fel tudja mérni a lehetséges kimeneteleket.
            </li>
            <li>
              <strong>Objektív szemlélet</strong> – érzelmileg megterhelő helyzetben
              az ügyvéd segít racionális döntéseket hozni.
            </li>
            <li>
              <strong>Iratok elkészítése</strong> – a keresetlevél, egyezségi javaslatok
              és egyéb beadványok szakszerű elkészítése.
            </li>
            <li>
              <strong>Képviselet</strong> – az ügyvéd képviseli Önt a bíróságon és
              az egyeztetéseken, így Önnek nem kell egyedül szembenéznie az eljárással.
            </li>
            <li>
              <strong>Egyezség előkészítése</strong> – az ügyvéd segít a felek közötti
              egyezség kialakításában és jogilag megfelelő formába öntésében.
            </li>
          </ul>

          <p>
            Célom, hogy <strong>az Ön érdekeinek érvényesítése</strong> mellett
            segítsek megtalálni a lehető legkevésbé konfliktusos megoldást.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'a házasság felbontását tervezi, és tájékoztatásra van szüksége',
          'a felek nem tudnak megegyezni a válás feltételeiről',
          'szeretnék békés úton, közös megegyezéssel rendezni a válást',
          'bírósági eljárás indult vagy várható',
          'bizonytalan a jogi helyzetben, tanácsra van szüksége',
          'szeretné tudni, hogy milyen jogai és kötelezettségei vannak',
          'egyezséget szeretne kötni a házastársával'
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/kapcsolat'
      }}

      timelineTitle="Hogyan zajlik a válóper?"

      timelineSteps={[
        {
          number: 1,
          title: 'Konzultáció',
          description: 'Áttekintjük a házasság helyzetét, a válás okát és a lehetséges jogi megoldásokat.'
        },
        {
          number: 2,
          title: 'Helyzet áttekintése',
          description: 'Felmérjük a vitás kérdéseket, a rendelkezésre álló dokumentumokat és az elérni kívánt célt.'
        },
        {
          number: 3,
          title: 'Stratégia kialakítása',
          description: 'Közösen meghatározzuk a legjobb jogi stratégiát: közös megegyezés vagy peres eljárás.'
        },
        {
          number: 4,
          title: 'Beadvány elkészítése',
          description: 'Elkészítem a szükséges jogi iratokat: keresetlevelet, egyezségi javaslatot vagy nyilatkozatokat.'
        },
        {
          number: 5,
          title: 'Bírósági képviselet',
          description: 'Képviselem Önt a bíróság előtt és az egyeztetéseken, az Ön érdekeit szem előtt tartva.'
        }
      ]}

      faqTitle="Gyakori kérdések a válóperről"

      faqItems={[
        {
          question: 'Mennyi ideig tart egy válóper?',
          answer: 'A válóper időtartama függ attól, hogy a felek közös megegyezéssel vagy peres úton válnak el. Közös megegyezés esetén az eljárás rendszerint gyorsabb, akár néhány hónap alatt lezárulhat. Peres eljárás esetén az időtartam jelentősen hosszabb lehet, és összetettebb ügyekben több hónapot vagy akár több mint egy évet is igénybe vehet.'
        },
        {
          question: 'Kell ügyvéd a válóperhez?',
          answer: 'Bár a válóperhez nem kötelező ügyvédet fogadni, erősen ajánlott. Az ügyvéd segít a keresetlevél elkészítésében, a tárgyalásokon való képviseletben és az egyezség előkészítésében, valamint segít eligazodni a bonyolult jogi eljárásban.'
        },
        {
          question: 'Mi történik az első tárgyaláson?',
          answer: 'Az első tárgyaláson a bíróság áttekinti a keresetlevelet, meghallgatja a felek nyilatkozatait, és tájékoztatja a feleket az egyezség lehetőségéről. A bíróság megkísérli a feleket megegyezésre ösztönözni, és kitűzi a további tárgyalásokat.'
        },
        {
          question: 'Mi a különbség a közös megegyezéses és a peres válás között?',
          answer: 'Közös megegyezéses válás esetén a felek minden kérdésben megegyeznek, az eljárás gyorsabb és olcsóbb. Peres válás esetén a felek nem tudnak megegyezni egy vagy több kérdésben, a bíróság dönt a vitás kérdésekben, az eljárás hosszabb és költségesebb.'
        },
        {
          question: 'Meddig lehet visszavonni a válópert?',
          answer: 'A válóper bármely szakaszában visszavonható, amíg a bíróság jogerős ítéletet nem hoz. A visszavonáshoz a felek közös nyilatkozata szükséges. Az eljárás megindítása után a keresetlevél visszavonására is van lehetőség.'
        },
        {
          question: 'Mi történik, ha az egyik fél nem jelenik meg a tárgyaláson?',
          answer: 'Ha az egyik fél alapos ok nélkül nem jelenik meg a tárgyaláson, a bíróság távollétében is megtarthatja a tárgyalást, és dönthet a házasság felbontásáról. A bíróság azonban általában haladékot ad, és újabb tárgyalási időpontot tűz ki.'
        }
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          name: 'Dr. Léner Pintér Sára',
          description: 'Válóper és házasság felbontása Veszprémben. Közös megegyezéses válás, peres válás, keresetlevél, egyezség és bírósági képviselet.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/valoper',
          telephone: '+36 20 490 5530',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Füredi u. 11.',
            addressLocality: 'Veszprém',
            postalCode: '8200',
            addressCountry: 'HU'
          },
          areaServed: 'Veszprém',
          priceRange: '$$'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          name: 'Válóper ügyvéd Veszprém',
          description: 'Teljes körű családjogi képviselet válóper és házasság felbontása ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/valoper',
          telephone: '+36 20 490 5530',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Füredi u. 11.',
            addressLocality: 'Veszprém',
            postalCode: '8200',
            addressCountry: 'HU'
          },
          areaServed: 'Veszprém',
          priceRange: '$$'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Mennyi ideig tart egy válóper?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A válóper időtartama függ attól, hogy a felek közös megegyezéssel vagy peres úton válnak el. Közös megegyezés esetén az eljárás rendszerint gyorsabb, akár néhány hónap alatt lezárulhat. Peres eljárás esetén az időtartam jelentősen hosszabb lehet, és összetettebb ügyekben több hónapot vagy akár több mint egy évet is igénybe vehet.'
              }
            },
            {
              '@type': 'Question',
              name: 'Kell ügyvéd a válóperhez?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bár a válóperhez nem kötelező ügyvédet fogadni, erősen ajánlott. Az ügyvéd segít a keresetlevél elkészítésében, a tárgyalásokon való képviseletben és az egyezség előkészítésében, valamint segít eligazodni a bonyolult jogi eljárásban.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mi történik az első tárgyaláson?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Az első tárgyaláson a bíróság áttekinti a keresetlevelet, meghallgatja a felek nyilatkozatait, és tájékoztatja a feleket az egyezség lehetőségéről. A bíróság megkísérli a feleket megegyezésre ösztönözni, és kitűzi a további tárgyalásokat.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mi a különbség a közös megegyezéses és a peres válás között?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Közös megegyezéses válás esetén a felek minden kérdésben megegyeznek, az eljárás gyorsabb és olcsóbb. Peres válás esetén a felek nem tudnak megegyezni egy vagy több kérdésben, a bíróság dönt a vitás kérdésekben, az eljárás hosszabb és költségesebb.'
              }
            },
            {
              '@type': 'Question',
              name: 'Meddig lehet visszavonni a válópert?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A válóper bármely szakaszában visszavonható, amíg a bíróság jogerős ítéletet nem hoz. A visszavonáshoz a felek közös nyilatkozata szükséges. Az eljárás megindítása után a keresetlevél visszavonására is van lehetőség.'
              }
            }
          ]
        }
      ]}
    />
  )
}