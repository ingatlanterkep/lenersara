import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Szülői felügyelet és gyermek lakóhelye ügyvéd Veszprém',
  description: 'Szülői felügyelet és gyermek lakóhelyének meghatározása Veszprémben. Közös vagy kizárólagos felügyelet, egyezség készítése, bírósági képviselet. Több mint 25 év tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-felugyelet'
  },
  openGraph: {
    title: 'Szülői felügyelet és gyermek lakóhelye ügyvéd Veszprém',
    description: 'Szülői felügyelet és gyermek lakóhelyének meghatározása Veszprémben. Közös vagy kizárólagos felügyelet, egyezség készítése, bírósági képviselet.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-felugyelet',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article'
  },
  keywords: 'szülői felügyelet, gyermek lakóhelye, gyermekelhelyezés, közös felügyelet, kizárólagos felügyelet, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }]
}

export default function SzuloiFelugyelet() {
  return (
    <ServiceTemplate
      heroTitle="Szülői felügyelet és gyermek lakóhelye"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Miben tudok segíteni: szülői felügyelet rendezése, közös vagy kizárólagos felügyelet, gyermek lakóhelyének meghatározása, meglévő döntés módosítása, egyezség készítése, bírósági képviselet."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        { label: 'Szülői felügyelet', href: '/szolgaltatasok/csaladjog/szuloi-felugyelet' }
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '👨‍👩‍👧', text: 'Gyermekközpontú megközelítés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🤝', text: 'Békés megoldások támogatása' }
      ]}

      content={
        <>
          {/* ===== MI A SZÜLŐI FELÜGYELET? ===== */}
          <h2>Mi a szülői felügyelet?</h2>

          <p>
            A szülői felügyelet a szülők azon joga és kötelezettsége, amely a gyermek 
            nevelésével, gondozásával, egészségügyi ellátásával, taníttatásával és 
            vagyonának kezelésével kapcsolatos. A szülői felügyeleti jog magában foglalja 
            a gyermekkel kapcsolatos mindennapi döntések meghozatalát, valamint a gyermek 
            fejlődésének és biztonságának biztosítását.
          </p>

          <p>
            A szülői felügyeleti jog a gyermek születésétől annak nagykorúságáig (18. 
            életévének betöltéséig) áll fenn, kivéve, ha a bíróság vagy a gyámhatóság 
            azt korlátozza vagy megszünteti. A szülői felügyeleti jog gyakorlása 
            kizárólag a gyermek érdekét szolgálhatja, és a szülők ezt a jogot nem 
            ruházhatják át másra.
          </p>

          <p>
            <strong>A szülői felügyeleti jog magában foglalja:</strong>
          </p>
          <ul>
            <li>a gyermek nevelésének és gondozásának jogát és kötelezettségét,</li>
            <li>a gyermek egészségügyi ellátásával kapcsolatos döntések meghozatalát,</li>
            <li>a gyermek iskolájának és taníttatásának meghatározását,</li>
            <li>a gyermek vagyonának kezelését és gyarapítását,</li>
            <li>a gyermek személyes ügyeiben való döntéshozatalt.</li>
          </ul>

          <p>
            A szülői felügyeleti jog gyakorlása nem korlátozódik a mindennapi 
            gondoskodásra; kiterjed a gyermek jövőjét érintő fontos döntésekre is, 
            például az iskolaválasztásra, a lakóhely megváltoztatására vagy a 
            külföldi utazások engedélyezésére.
          </p>

          {/* ===== MIT JELENT A GYERMEK LAKÓHELYÉNEK MEGHATÁROZÁSA? ===== */}
          <h2>Mit jelent a gyermek lakóhelyének meghatározása?</h2>

          <p>
            A gyermek lakóhelyének meghatározása azt jelenti, hogy a bíróság vagy a 
            szülők egyezsége dönt arról, hogy a gyermek melyik szülővel éljen, és hol 
            legyen a bejelentett lakóhelye. Ez a döntés meghatározza a gyermek mindennapi 
            életének színterét: hol jár iskolába, hol vannak a barátai, milyen 
            közösségben nevelkedik.
          </p>

          <p>
            <strong>Mikor kell dönteni a gyermek lakóhelyéről?</strong>
          </p>

          <p>
            A szülők különválása vagy válása esetén szinte mindig szükséges rendezni, 
            hogy a gyermek melyik szülőnél éljen. Ha a szülők együtt élnek, a gyermek 
            lakóhelye a szülők közös lakóhelye. Ha a szülők különköltöznek, újra kell 
            gondolni a gyermek életének helyszínét.
          </p>

          <p>
            A gyermek lakóhelyéről a szülők közös megegyezéssel is dönthetnek, de ha 
            nincs egyetértés, a bíróság hoz döntést. A bíróság ítélete akkor is 
            szükséges, ha a szülők egyezsége nem felel meg a gyermek érdekeinek, vagy 
            ha a körülmények utólag jelentősen megváltoznak.
          </p>

          <p>
            <strong>Mikor kerül sor a gyermek lakóhelyének meghatározására?</strong>
          </p>

          <ul>
            <li>a szülők különválása vagy válása esetén,</li>
            <li>ha a szülők nem tudnak megegyezni a gyermek elhelyezéséről,</li>
            <li>ha a gyermek veszélyeztetettsége miatt a gyámhatóság intézkedik,</li>
            <li>ha a korábbi döntés módosítása szükséges a megváltozott körülmények miatt.</li>
          </ul>

          {/* ===== MIT VIZSGÁL A BÍRÓSÁG? ===== */}
          <h2>Mit vizsgál a bíróság a gyermek lakóhelyének meghatározásakor?</h2>

          <p>
            A bíróság a gyermek lakóhelyének meghatározásakor <strong>mindig a gyermek 
            legfőbb érdekét</strong> veszi figyelembe. Ez azt jelenti, hogy a döntés 
            középpontjában a gyermek testi, szellemi és érzelmi fejlődésének biztosítása áll.
          </p>

          <p>
            <strong>A bíróság az alábbi szempontokat vizsgálja:</strong>
          </p>

          <ul>
            <li>
              <strong>A gyermek érdeke</strong> – minden más szempontot megelőz, a 
              döntés középpontjában a gyermek testi és lelki egészsége, fejlődése áll.
            </li>
            <li>
              <strong>A gyermek életkora és fejlettsége</strong> – kisgyermek esetén 
              más szempontok érvényesülnek, mint egy tinédzser esetében.
            </li>
            <li>
              <strong>A megszokott környezet</strong> – az iskola, a barátok, a 
              lakóhely, a közösség megtartása fontos a gyermek stabilitása szempontjából.
            </li>
            <li>
              <strong>Az iskolai és társas kapcsolatok</strong> – a gyermek 
              beilleszkedése, baráti köre, iskolai teljesítménye.
            </li>
            <li>
              <strong>A testvérek együtt tartása</strong> – lehetőség szerint a 
              testvérek ne kerüljenek szét, mert ez súlyos érzelmi nehézségeket okozhat.
            </li>
            <li>
              <strong>A szülők együttműködési készsége</strong> – mennyire képesek a 
              szülők közösen gondoskodni a gyermekről, együttműködni a nevelés kérdéseiben.
            </li>
            <li>
              <strong>A gyermek véleménye</strong> – ha a gyermek megfelelő 
              ítélőképességgel rendelkezik (általában 12-14 éves kortól), a bíróság 
              meghallgatja és figyelembe veszi a véleményét.
            </li>
          </ul>

          <p>
            A bíróság a döntése meghozatala előtt szakértői véleményeket is beszerezhet, 
            például gyermekvédelmi szakértői véleményt vagy pszichológusi szakvéleményt, 
            amely segít felmérni a gyermek helyzetét és a szülők nevelési képességeit.
          </p>

          {/* ===== KÖZÖS SZÜLŐI FELÜGYELET ===== */}
          <h2>Közös szülői felügyelet</h2>

          <p>
            A közös szülői felügyelet azt jelenti, hogy a szülők a gyermek nevelésével, 
            gondozásával és fejlődésével kapcsolatos <strong>jogokat és kötelezettségeket 
            közösen gyakorolják</strong>. Ez a megoldás egyre gyakoribb, és a bíróságok 
            is előnyben részesítik, ha a szülők képesek együttműködni a gyermek érdekében.
          </p>

          <p>
            <strong>Mikor működik a közös szülői felügyelet?</strong>
          </p>

          <ul>
            <li>ha a szülők képesek együttműködni a gyermek nevelésével kapcsolatos fontos kérdésekben,</li>
            <li>ha a szülők közötti távolság lehetővé teszi a gyermek rendszeres kapcsolattartását mindkét szülővel,</li>
            <li>ha a szülők közösen tudják biztosítani a gyermek iskolai és egészségügyi ellátását,</li>
            <li>ha a szülők között nincs olyan konfliktus, amely a gyermek fejlődését veszélyeztetné.</li>
          </ul>

          <p>
            <strong>Mikor nem működik a közös szülői felügyelet?</strong>
          </p>

          <ul>
            <li>ha a szülők közötti konfliktus olyan súlyos, hogy lehetetlenné teszi az együttműködést,</li>
            <li>ha az egyik szülő bántalmazó, elhanyagoló vagy más módon veszélyezteti a gyermeket,</li>
            <li>ha a szülők közötti távolság akadályozza a gyermek mindkét szülővel való rendszeres kapcsolattartását.</li>
          </ul>

          <p>
            <strong>Fontos:</strong> a közös szülői felügyelet nem jelenti azt, hogy a 
            gyermek fele-fele arányban él mindkét szülőnél. A közös felügyelet a 
            döntéshozatalra vonatkozik, míg a gyermek lakóhelye általában az egyik 
            szülőnél van. A bíróság minden esetben egyedileg vizsgálja, hogy a közös 
            szülői felügyelet megfelel-e a gyermek érdekének.
          </p>

          {/* ===== MIKOR MÓDOSÍTHATÓ A SZÜLŐI FELÜGYELETRŐL SZÓLÓ DÖNTÉS? ===== */}
          <h2>Mikor módosítható a szülői felügyeletről szóló döntés?</h2>

          <p>
            A szülői felügyeletről szóló bírósági ítélet vagy szülői egyezség nem 
            feltétlenül végleges. Ha a körülmények jelentősen megváltoznak, kérhető 
            a döntés módosítása. Ilyen változás lehet például:
          </p>

          <ul>
            <li>
              <strong>Költözés</strong> – ha az egyik szülő más városba vagy országba 
              költözik, ami befolyásolja a gyermek lakóhelyét és a kapcsolattartást.
            </li>
            <li>
              <strong>Élethelyzet változása</strong> – új párkapcsolat, új házasság, 
              új gyermek születése, amely hatással lehet a gyermek környezetére.
            </li>
            <li>
              <strong>Új körülmények</strong> – a szülő anyagi helyzetének jelentős 
              változása, betegség, vagy más olyan tényező, amely befolyásolja a 
              gyermek gondozásának képességét.
            </li>
            <li>
              <strong>A gyermek igényeinek változása</strong> – a gyermek életkorának 
              előrehaladtával más igények merülhetnek fel (pl. iskolaváltás, különórák).
            </li>
          </ul>

          <p>
            A módosítási kérelem benyújtásához szükség van arra, hogy az új körülmények 
            <strong>jelentős és tartós változást</strong> idézzenek elő a gyermek 
            életében, és a módosítás a gyermek érdekét szolgálja. A bíróság minden 
            esetben egyedileg vizsgálja a kérelmet.
          </p>

          {/* ===== LEHET EGYEZSÉGET KÖTNI? ===== */}
          <h2>Lehet egyezséget kötni a szülői felügyeletről?</h2>

          <p>
            <strong>Igen, és ez a legkedvezőbb megoldás minden érintett számára.</strong>
          </p>

          <p>
            A szülők a bírósági eljárás előtt vagy alatt is köthetnek egyezséget a 
            szülői felügyelet gyakorlásáról és a gyermek lakóhelyéről. Az egyezség 
            előnyei:
          </p>

          <ul>
            <li>gyorsabb és olcsóbb, mint a peres eljárás,</li>
            <li>kevésbé megterhelő érzelmileg a szülőknek és a gyermeknek,</li>
            <li>a felek maguk alakítják ki a számukra legmegfelelőbb megoldást,</li>
            <li>csökkenti a konfliktusok továbbélésének kockázatát.</li>
          </ul>

          <p>
            Az egyezséget érdemes <strong>ügyvéd segítségével</strong> elkészíteni, 
            hogy az jogilag is megfelelő legyen, és a későbbi vitákat elkerüljük. A 
            bíróság az egyezséget akkor hagyja jóvá, ha az megfelel a gyermek 
            érdekének.
          </p>

          {/* ===== MIÉRT ÉRDEMES ÜGYVÉDHEZ FORDULNI? ===== */}
          <h2>Miért érdemes ügyvédhez fordulni?</h2>

          <p>
            A szülői felügyelet és a gyermek lakóhelyének meghatározása az egyik 
            legfontosabb és legérzékenyebb döntés egy szülő életében. Az ügyvéd 
            segítsége több szempontból is elengedhetetlen:
          </p>

          <ul>
            <li>
              <strong>Jogi ismeretek</strong> – az ügyvéd ismeri a vonatkozó 
              jogszabályokat és a bírósági gyakorlatot, így fel tudja mérni a 
              lehetséges kimeneteleket.
            </li>
            <li>
              <strong>Objektív szemlélet</strong> – érzelmileg megterhelő helyzetben 
              az ügyvéd segít racionális döntéseket hozni.
            </li>
            <li>
              <strong>Iratok elkészítése</strong> – a bírósági beadványok, 
              keresetlevelek és egyezségi javaslatok szakszerű elkészítése.
            </li>
            <li>
              <strong>Képviselet</strong> – az ügyvéd képviseli Önt a bíróságon és 
              az egyeztetéseken, így Önnek nem kell egyedül szembenéznie az eljárással.
            </li>
          </ul>

          <p>
            Célom, hogy <strong>a gyermek érdekének érvényesítése</strong> mellett 
            segítsek megtalálni a szülők számára is elfogadható, békés megoldást.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'a szülők nem tudnak megegyezni a gyermek lakóhelyéről',
          'bírósági eljárás indult vagy várható a szülői felügyelet rendezésére',
          'szeretnék békés úton, egyezséggel rendezni a szülői felügyeletet',
          'megváltoztak a körülmények és módosítani kell a korábbi döntést',
          'költözés miatt újra kell gondolni a gyermek lakóhelyét',
          'a másik szülő nem tartja be a szülői felügyeletre vonatkozó megállapodást',
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
          description: 'Áttekintjük a szülői felügyelet és a gyermek lakóhelyének kérdését, a gyermek helyzetét, és a lehetséges jogi megoldásokat.'
        },
        {
          number: 3,
          title: 'Stratégia kialakítása',
          description: 'Közösen meghatározzuk a legjobb jogi stratégiát: egyezség vagy bírósági eljárás.'
        },
        {
          number: 4,
          title: 'Iratok előkészítése',
          description: 'Elkészítem a szükséges jogi iratokat: keresetlevelet, egyezségi javaslatot vagy nyilatkozatokat.'
        },
        {
          number: 5,
          title: 'Képviselet az eljárásban',
          description: 'Képviselem Önt a bíróság előtt és az egyeztetéseken, a gyermek érdekeit szem előtt tartva.'
        }
      ]}

      faqTitle="Gyakori kérdések a szülői felügyeletről és a gyermek lakóhelyéről"

      faqItems={[
        {
          question: 'Mit jelent a szülői felügyelet?',
          answer: 'A szülői felügyelet a szülők azon joga és kötelezettsége, amely a gyermek nevelésével, gondozásával, egészségügyi ellátásával, taníttatásával és vagyonának kezelésével kapcsolatos. A szülői felügyeleti jog a gyermek születésétől annak nagykorúságáig áll fenn.'
        },
        {
          question: 'Mi a különbség a közös és kizárólagos szülői felügyelet között?',
          answer: 'Közös szülői felügyelet esetén a szülők együttesen gyakorolják a gyermek nevelésével kapcsolatos jogokat és kötelezettségeket. Kizárólagos felügyeletnél csak az egyik szülő gyakorolja ezeket a jogokat, a másik szülőt megilleti a kapcsolattartás joga.'
        },
        {
          question: 'Ki dönt a gyermek lakóhelyéről?',
          answer: 'A szülők közös megegyezéssel is dönthetnek a gyermek lakóhelyéről. Ha nincs egyetértés, a bíróság hoz döntést a gyermek legfőbb érdekének figyelembevételével.'
        },
        {
          question: 'Mikor módosítható a szülői felügyeletről szóló döntés?',
          answer: 'Ha a körülmények jelentősen megváltoznak (pl. költözés, élethelyzet változása, új körülmények), kérhető a szülői felügyeleti jog gyakorlásának módosítása. Ehhez új bírósági eljárásra van szükség.'
        },
        {
          question: 'Számít-e a gyermek véleménye a bíróság döntésénél?',
          answer: 'Igen, a bíróság meghallgatja a megfelelő ítélőképességgel rendelkező gyermeket. A gyermek véleményét súlyozottan veszi figyelembe a bíróság, de a döntést mindig a gyermek legfőbb érdeke alapján hozza meg.'
        },
        {
          question: 'Külföldre lehet költözni a gyermekkel?',
          answer: 'Ha a szülő külföldre kíván költözni a gyermekkel, ahhoz a másik szülő hozzájárulása vagy bírósági engedély szükséges. A bíróság vizsgálja, hogy a költözés a gyermek érdekeit szolgálja-e.'
        }
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          name: 'Dr. Léner Pintér Sára',
          description: 'Szülői felügyelet és gyermek lakóhelyének meghatározása Veszprémben. Közös vagy kizárólagos felügyelet, egyezség készítése, bírósági képviselet.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-felugyelet',
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
          name: 'Szülői felügyelet és gyermek lakóhelye ügyvéd Veszprém',
          description: 'Teljes körű családjogi képviselet szülői felügyelet és gyermek lakóhelyének meghatározása ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-felugyelet',
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
              name: 'Mit jelent a szülői felügyelet?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A szülői felügyelet a szülők azon joga és kötelezettsége, amely a gyermek nevelésével, gondozásával, egészségügyi ellátásával, taníttatásával és vagyonának kezelésével kapcsolatos. A szülői felügyeleti jog a gyermek születésétől annak nagykorúságáig áll fenn.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mi a különbség a közös és kizárólagos szülői felügyelet között?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Közös szülői felügyelet esetén a szülők együttesen gyakorolják a gyermek nevelésével kapcsolatos jogokat és kötelezettségeket. Kizárólagos felügyeletnél csak az egyik szülő gyakorolja ezeket a jogokat, a másik szülőt megilleti a kapcsolattartás joga.'
              }
            },
            {
              '@type': 'Question',
              name: 'Ki dönt a gyermek lakóhelyéről?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A szülők közös megegyezéssel is dönthetnek a gyermek lakóhelyéről. Ha nincs egyetértés, a bíróság hoz döntést a gyermek legfőbb érdekének figyelembevételével.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mikor módosítható a szülői felügyeletről szóló döntés?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ha a körülmények jelentősen megváltoznak (pl. költözés, élethelyzet változása, új körülmények), kérhető a szülői felügyeleti jog gyakorlásának módosítása. Ehhez új bírósági eljárásra van szükség.'
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
              name: 'Külföldre lehet költözni a gyermekkel?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ha a szülő külföldre kíván költözni a gyermekkel, ahhoz a másik szülő hozzájárulása vagy bírósági engedély szükséges. A bíróság vizsgálja, hogy a költözés a gyermek érdekeit szolgálja-e.'
              }
            }
          ]
        }
      ]}
    />
  )
}