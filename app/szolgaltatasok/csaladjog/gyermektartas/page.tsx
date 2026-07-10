import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Gyermekelhelyezés és szülői felügyelet ügyvéd Veszprém',
  description: 'Gyermekelhelyezés, szülői felügyelet, kapcsolattartás és gyermektartás ügyekben nyújtok jogi segítséget Veszprémben. 25+ év tapasztalat, egyéni megoldások.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/gyermekelhelyezes'
  },
  openGraph: {
    title: 'Gyermekelhelyezés és szülői felügyelet ügyvéd Veszprém',
    description: 'Gyermekelhelyezés, szülői felügyelet, kapcsolattartás és gyermektartás ügyekben nyújtok jogi segítséget Veszprémben.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/gyermekelhelyezes',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
    images: [
      {
        url: 'https://ugyvedimegoldas.hu/images/gyermekelhelyezes-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Gyermekelhelyezés és szülői felügyelet ügyvéd Veszprém'
      }
    ]
  },
  keywords: 'gyermekelhelyezés, szülői felügyelet, kapcsolattartás, gyermektartás, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }]
}

export default function Gyermekelhelyezes() {
  return (
    <ServiceTemplate
      heroTitle="Gyermekelhelyezés és szülői felügyelet ügyvéd Veszprém"
      heroSubtitle="Célom a gyermek érdekeinek maradéktalan érvényesítése és a családi konfliktusok békés, jogszerű rendezése."
      heroCtaText="Időpont kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        { label: 'Gyermekelhelyezés', href: '/szolgaltatasok/csaladjog/gyermekelhelyezes' }
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év családjogi tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '👨‍👩‍👧', text: 'Gyermekközpontú megközelítés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🤝', text: 'Békés megoldások támogatása' }
      ]}

      content={
        <>
          {/* ===== MIBEN TUDOK SEGÍTENI? ===== */}
          <h2>Miben tudok segíteni?</h2>
          
          <p>
            A gyermekelhelyezés (a hatályos jogban pontosabban: a szülői felügyeleti jog 
            gyakorlásának rendezése és a gyermek lakóhelyének meghatározása) az egyik legérzékenyebb 
            és legmeghatározóbb döntés egy szülő életében. <strong>Veszprémben</strong> és az ország 
            egész területén képviselem ügyfeleimet a gyermekelhelyezéssel kapcsolatos bírósági 
            és bíróságon kívüli eljárásokban. Célom, hogy a gyermek érdekeinek érvényesítése 
            mellett segítsek eligazodni az érzelmileg is megterhelő helyzetekben.
          </p>

          <p>
            <strong>Teljes körű segítséget nyújtok:</strong>
          </p>
          <ul>
            <li><strong>Gyermekelhelyezési perekben</strong> – bírósági képviselet az eljárás minden szakaszában</li>
            <li><strong>Szülői felügyeleti jog rendezésében</strong> – a jogok és kötelezettségek tisztázása</li>
            <li><strong>Kapcsolattartás (láthatás) kialakításában</strong> – a gyermek és a szülő kapcsolatának biztosítása</li>
            <li><strong>Gyermektartás megállapításában</strong> – a gyermek anyagi biztonságának garantálása</li>
            <li><strong>Közös megegyezés előkészítésében</strong> – peren kívüli egyezség létrehozása</li>
            <li><strong>Gyermekvédelmi eljárásokban</strong> – a gyámügyi hatósággal való együttműködésben</li>
          </ul>

          <p>
            Minden esetben arra törekszem, hogy <strong>a gyermek érdeke</strong> érvényesüljön, miközben 
            segítek megtalálni a szülők számára is elfogadható megoldást.
          </p>

          {/* ===== MILYEN ÜGYEK TARTOZNAK IDÉ? ===== */}
          <h2>Milyen ügyek tartoznak ide?</h2>

          <p>
            A köznyelv továbbra is gyakran használja a „gyermekelhelyezés” kifejezést, azonban a 
            hatályos magyar jogban elsősorban a <strong>szülői felügyeleti jog gyakorlásának 
            rendezéséről</strong>, a <strong>gyermek lakóhelyének meghatározásáról</strong>, 
            valamint a <strong>kapcsolattartás</strong> szabályozásáról beszélünk. Ezek a kérdések 
            szorosan összefüggenek a szülők különválása esetén.
          </p>

          <h3>1. Szülői felügyeleti jog gyakorlása</h3>
          <p>
            A szülői felügyeleti jog magában foglalja a gyermek nevelésével, gondozásával, 
            egészségügyi ellátásával és vagyonának kezelésével kapcsolatos jogokat és 
            kötelezettségeket. A bíróság dönthet úgy, hogy a szülők a szülői felügyeleti jogot 
            közösen vagy külön gyakorolják. A bíróság minden esetben egyedileg vizsgálja, hogy 
            melyik megoldás szolgálja leginkább a gyermek érdekét.
          </p>

          <h3>2. A gyermek lakóhelyének meghatározása</h3>
          <p>
            Ha a szülők nem tudnak megegyezni arról, hogy a gyermek melyik szülőnél éljen, a 
            bíróság dönt a gyermek lakóhelyéről. A bíróság mérlegeli a szülők körülményeit, a 
            gyermek életkorát, iskolai és társas kapcsolatait, valamint a gyermek véleményét is 
            (ha a gyermek megfelelő ítélőképességgel rendelkezik).
          </p>

          <h3>3. Kapcsolattartás (korábban: láthatási jog)</h3>
          <p>
            A kapcsolattartás biztosítja, hogy a gyermek a különélő szülővel rendszeres kapcsolatban 
            maradhasson. A bíróság – vagy a felek egyezsége – határozza meg a találkozások 
            gyakoriságát, időtartamát és helyszínét, figyelembe véve a gyermek életkorát és igényeit.
          </p>

          <h3>4. Gyermektartás</h3>
          <p>
            A gyermeket nem nevelő szülő köteles gyermektartást fizetni. Az összeg meghatározása 
            a szülők jövedelmi viszonyaitól és a gyermek szükségleteitől függ.
          </p>

          <h3>5. Gyermek nevének megváltoztatása</h3>
          <p>
            A különélő szülő kérheti a gyermek nevének megváltoztatását, amelyhez a másik szülő 
            hozzájárulása vagy bírósági engedély szükséges.
          </p>

          {/* ===== A BÍRÓSÁG SZEMPONTJAI ===== */}
          <h2>Mit vizsgál a bíróság?</h2>

          <p>
            A bíróság <strong>mindig a gyermek legfőbb érdekét</strong> tartja szem előtt. Ennek érdekében 
            több szempontot is vizsgál:
          </p>

          <ul>
            <li><strong>A gyermek életkora és fejlettsége</strong> – milyen érzelmi és fizikai igényei vannak</li>
            <li><strong>Anyagi körülmények</strong> – melyik szülő tudja jobban biztosítani a gyermek szükségleteit</li>
            <li><strong>Lakhatási körülmények</strong> – a gyermek számára megfelelő lakókörnyezet</li>
            <li><strong>Iskola, barátok, közösség</strong> – a megszokott környezet megtartása</li>
            <li><strong>A szülők nevelési képességei</strong> – érzelmi és fizikai gondoskodás</li>
            <li><strong>A gyermek véleménye</strong> – a bíróság meghallgatja a megfelelő ítélőképességgel rendelkező gyermeket</li>
            <li><strong>A testvérek együtt tartása</strong> – lehetőség szerint a testvérek ne kerüljenek szét</li>
          </ul>

          <p>
            <strong>Fontos:</strong> a bíróság nem alkalmaz automatikus szabályokat (pl. "kisgyermek az anyánál"). 
            Minden esetben egyedi mérlegelés történik, amelynek középpontjában a gyermek érdeke áll.
          </p>

          <p>
            A bíróság gyermekvédelmi és más szakértői véleményeket is beszerezhet az ítélet 
            megalapozása érdekében.
          </p>

          {/* ===== KÖZÖS MEGEGYEZÉS ===== */}
          <h2>Lehet megegyezni peren kívül is?</h2>

          <p>
            <strong>Igen, erre törekedni érdemes.</strong> A felek közös megegyezéssel rendezhetik 
            a szülői felügyelet gyakorlását, a gyermek lakóhelyét, a kapcsolattartást és a 
            gyermektartás kérdését. Ez az út általában gyorsabb, olcsóbb és kevésbé megterhelő 
            érzelmileg minden érintett számára, különösen a gyermek számára.
          </p>

          <p>
            A közös megegyezést érdemes <strong>ügyvéd segítségével</strong> elkészíteni, hogy az 
            jogilag is megfelelő legyen, és a későbbi vitákat elkerüljük. Amennyiben a felek 
            megegyeznek, a bíróság jóváhagyja az egyezséget.
          </p>

          {/* ===== MI A TEENDŐ PER ESETÉN? ===== */}
          <h2>Mi a teendő, ha bírósági eljárásra kerül sor?</h2>

          <p>
            Ha a szülők nem tudnak megegyezni, és bírósági eljárásra kerül sor, az alábbi lépések 
            várhatnak Önre:
          </p>

          <ol>
            <li><strong>Keresetlevél benyújtása</strong> – a kérelem benyújtása a bírósághoz</li>
            <li><strong>Előkészítő iratok</strong> – a szükséges dokumentumok beszerzése és benyújtása</li>
            <li><strong>Bírósági tárgyalások</strong> – a felek és a gyermek meghallgatása</li>
            <li><strong>Bizonyítási eljárás</strong> – szakértői vélemények, gyámügyi hatósági jelentések beszerzése</li>
            <li><strong>Ítélethirdetés</strong> – a bíróság dönt a szülői felügyelet gyakorlásáról és a gyermek lakóhelyéről</li>
          </ol>

          <p>
            Az eljárás során <strong>elengedhetetlen egy tapasztalt családjogi ügyvéd</strong> segítsége, 
            aki képviseli érdekeit és segít a bizonyítási anyagok összeállításában.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'gyermekelhelyezési per indult vagy várható',
          'nem tudnak megegyezni a szülők a gyermek jövőjéről',
          'szeretnék békés úton, egyezséggel rendezni a helyzetet',
          'a másik szülő akadályozza a kapcsolattartás gyakorlását',
          'megváltoztak a körülmények (költözés, új kapcsolat)',
          'gyámügyi hatósági eljárás indult a családnál',
          'bizonytalan a jogi helyzetben, tanácsra van szüksége'
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/kapcsolat'
      }}

      timelineTitle="Hogyan zajlik az eljárás?"

      timelineSteps={[
        {
          number: 1,
          title: 'Kapcsolatfelvétel',
          description: 'Vegye fel velem a kapcsolatot telefonon vagy e-mailben, és vázolja a helyzetet.'
        },
        {
          number: 2,
          title: 'Személyes konzultáció',
          description: 'Áttekintjük az ügy részleteit, a gyermek helyzetét, és a lehetséges jogi megoldásokat.'
        },
        {
          number: 3,
          title: 'Stratégia kialakítása',
          description: 'Közösen meghatározzuk a legjobb jogi stratégiát: egyezség vagy bírósági eljárás.'
        },
        {
          number: 4,
          title: 'Iratok előkészítése',
          description: 'Elkészítem a szükséges jogi iratokat: keresetlevelet, egyezségi javaslatot, vagy nyilatkozatokat.'
        },
        {
          number: 5,
          title: 'Képviselet az eljárásban',
          description: 'Képviselem Önt a bíróság előtt és az egyeztetéseken, a gyermek érdekeit szem előtt tartva.'
        }
      ]}

      faqTitle="Gyakori kérdések a gyermekelhelyezésről"

      faqItems={[
        {
          question: 'Kinél helyezik el a gyermeket válás esetén?',
          answer: 'A bíróság mindig a gyermek legfőbb érdekét vizsgálja. Nincs automatikus szabály, minden esetben egyedi mérlegelés történik. A bíróság figyelembe veszi a gyermek véleményét is, ha a gyermek megfelelő ítélőképességgel rendelkezik.'
        },
        {
          question: 'Mit jelent a szülői felügyeleti jog?',
          answer: 'A szülői felügyeleti jog magában foglalja a gyermek nevelésével, gondozásával, egészségügyi ellátásával és vagyonának kezelésével kapcsolatos jogokat és kötelezettségeket. A bíróság dönthet úgy, hogy a szülők közösen vagy külön gyakorolják ezeket a jogokat.'
        },
        {
          question: 'Milyen gyakran tarthatja a kapcsolatot a különélő szülő a gyermekkel?',
          answer: 'A kapcsolattartás gyakorisága függ a gyermek életkorától, a szülők és a gyermek közötti kapcsolattól, valamint a távolságtól. Általában minden második hétvégén, ünnepekkor és a szünidő egy részében biztosított a találkozás. A bíróság vagy a felek egyezsége minden esetben egyedileg határozza meg.'
        },
        {
          question: 'Mennyi ideig tart egy gyermekelhelyezési per?',
          answer: 'Egy gyermekelhelyezési per időtartama általában 6-12 hónap, de függ az ügy bonyolultságától, a szakértői vélemények beszerzésének idejétől és a felek együttműködésétől. Egyezség esetén az eljárás jelentősen rövidebb lehet.'
        },
        {
          question: 'Számít-e a gyermek véleménye a bíróság döntésénél?',
          answer: 'Igen, a bíróság meghallgatja a megfelelő ítélőképességgel rendelkező gyermeket. A gyermek véleményét súlyozottan veszi figyelembe a bíróság, de a döntést mindig a gyermek legfőbb érdeke alapján hozza meg.'
        },
        {
          question: 'Lehet módosítani a szülői felügyeletről szóló ítéletet?',
          answer: 'Igen, ha a körülmények jelentősen megváltoznak (pl. költözés, anyagi helyzet romlása, a gyermek iskolaváltása), kérhető a szülői felügyeleti jog gyakorlásának módosítása. Ehhez új bírósági eljárásra van szükség.'
        },
        {
          question: 'Mi történik, ha a gyermek külföldre költözik?',
          answer: 'Ha a szülő külföldre kíván költözni a gyermekkel, ahhoz a másik szülő hozzájárulása vagy bírósági engedély szükséges. A bíróság vizsgálja, hogy a költözés a gyermek érdekeit szolgálja-e.'
        },
        {
          question: 'Milyen költségekkel jár a gyermekelhelyezési per?',
          answer: 'A peres eljárás költségei közé tartozik az ügyvédi munkadíj, a bírósági illeték, a szakértői díjak és az esetleges tanúk költségei. Az egyezséges megoldás általában költséghatékonyabb. Ügyvédenként eltérőek a díjak, érdemes előzetesen tájékozódni.'
        }
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          name: 'Dr. Léner Pintér Sára',
          description: 'Gyermekelhelyezés, szülői felügyelet, kapcsolattartás és gyermektartás ügyekben nyújtok jogi segítséget Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/gyermekelhelyezes',
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
          name: 'Gyermekelhelyezés és szülői felügyelet ügyvéd Veszprém',
          description: 'Teljes körű családjogi képviselet gyermekelhelyezés, szülői felügyelet, kapcsolattartás és gyermektartás ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/gyermekelhelyezes',
          telephone: '+36 20 490 5530',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Füredi u. 11.',
            addressLocality: 'Veszprém',
            postalCode: '8200',
            addressCountry: 'HU'
          },
          areaServed: 'Veszprém',
          priceRange: '$$',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Családjogi szolgáltatások',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Szülői felügyeleti jog rendezése'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Kapcsolattartás rendezése'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Gyermekelhelyezés'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Gyermektartás'
                }
              }
            ]
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Kinél helyezik el a gyermeket válás esetén?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A bíróság mindig a gyermek legfőbb érdekét vizsgálja. Nincs automatikus szabály, minden esetben egyedi mérlegelés történik. A bíróság figyelembe veszi a gyermek véleményét is, ha a gyermek megfelelő ítélőképességgel rendelkezik.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mit jelent a szülői felügyeleti jog?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A szülői felügyeleti jog magában foglalja a gyermek nevelésével, gondozásával, egészségügyi ellátásával és vagyonának kezelésével kapcsolatos jogokat és kötelezettségeket. A bíróság dönthet úgy, hogy a szülők közösen vagy külön gyakorolják ezeket a jogokat.'
              }
            },
            {
              '@type': 'Question',
              name: 'Milyen gyakran tarthatja a kapcsolatot a különélő szülő a gyermekkel?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A kapcsolattartás gyakorisága függ a gyermek életkorától, a szülők és a gyermek közötti kapcsolattól, valamint a távolságtól. Általában minden második hétvégén, ünnepekkor és a szünidő egy részében biztosított a találkozás.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mennyi ideig tart egy gyermekelhelyezési per?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Egy gyermekelhelyezési per időtartama általában 6-12 hónap, de függ az ügy bonyolultságától, a szakértői vélemények beszerzésének idejétől és a felek együttműködésétől.'
              }
            },
            {
              '@type': 'Question',
              name: 'Számít-e a gyermek véleménye a bíróság döntésénél?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, a bíróság meghallgatja a megfelelő ítélőképességgel rendelkező gyermeket. A gyermek véleményét súlyozottan veszi figyelembe a bíróság, de a döntést mindig a gyermek legfőbb érdeke alapján hozza meg.'
              }
            },
            {
              '@type': 'Question',
              name: 'Lehet módosítani a szülői felügyeletről szóló ítéletet?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, ha a körülmények jelentősen megváltoznak (pl. költözés, anyagi helyzet romlása, a gyermek iskolaváltása), kérhető a szülői felügyeleti jog gyakorlásának módosítása. Ehhez új bírósági eljárásra van szükség.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mi történik, ha a gyermek külföldre költözik?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ha a szülő külföldre kíván költözni a gyermekkel, ahhoz a másik szülő hozzájárulása vagy bírósági engedély szükséges. A bíróság vizsgálja, hogy a költözés a gyermek érdekeit szolgálja-e.'
              }
            },
            {
              '@type': 'Question',
              name: 'Milyen költségekkel jár a gyermekelhelyezési per?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A peres eljárás költségei közé tartozik az ügyvédi munkadíj, a bírósági illeték, a szakértői díjak és az esetleges tanúk költségei. Az egyezséges megoldás általában költséghatékonyabb.'
              }
            }
          ]
        }
      ]}
    />
  )
}