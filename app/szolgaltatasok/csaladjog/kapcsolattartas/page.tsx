import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Kapcsolattartás ügyvéd Veszprém | Gyermek láthatása',
  description: 'Kapcsolattartás rendezése Veszprémben. A különélő szülő és gyermek közötti kapcsolattartás megállapítása, módosítása, pótlása és végrehajtása. Több mint 25 év tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/kapcsolattartas'
  },
  openGraph: {
    title: 'Kapcsolattartás ügyvéd Veszprém | Gyermek láthatása',
    description: 'Kapcsolattartás rendezése Veszprémben. A különélő szülő és gyermek közötti kapcsolattartás megállapítása, módosítása, pótlása és végrehajtása.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/kapcsolattartas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article'
  },
  keywords: 'kapcsolattartás, gyermek láthatása, láthatási jog, kapcsolattartás rendezése, kapcsolattartás módosítása, elmaradt kapcsolattartás, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }]
}

export default function Kapcsolattartas() {
  return (
    <ServiceTemplate
      heroTitle="Kapcsolattartás"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Miben tudok segíteni: kapcsolattartás rendezése, módosítása, pótlása, végrehajtása, egyezség."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        { label: 'Kapcsolattartás', href: '/szolgaltatasok/csaladjog/kapcsolattartas' }
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
          {/* ===== MI A KAPCSOLATTARTÁS? ===== */}
          <h2>Mi a kapcsolattartás?</h2>

          <p>
            A kapcsolattartás (korábbi nevén: láthatási jog) azt a jogot biztosítja a 
            különélő szülő számára, hogy <strong>rendszeres kapcsolatot tarthasson 
            fenn a gyermekével</strong>. Ez a jog nemcsak a szülőt illeti meg, hanem 
            a gyermek alapvető joga is, hogy mindkét szülőjével kapcsolatban maradjon.
          </p>

          <p>
            A kapcsolattartás célja, hogy a gyermek és a különélő szülő közötti érzelmi 
            kötődés fennmaradjon, és a gyermek ne veszítse el kapcsolatát az egyik 
            szülőjével. A kapcsolattartás nemcsak a szülő joga, hanem a gyermek 
            érdeke is.
          </p>

          <p>
            <strong>A kapcsolattartás magában foglalja:</strong>
          </p>

          <ul>
            <li>a személyes találkozásokat (hétvégék, ünnepek, szünidők),</li>
            <li>a telefonos és online kommunikációt,</li>
            <li>a közös programokon való részvételt,</li>
            <li>az iskolai és egyéb eseményeken való részvételt.</li>
          </ul>

          <p>
            A kapcsolattartás részletes szabályait a bíróság ítélete vagy a szülők 
            egyezsége határozza meg. A kapcsolattartás gyakorisága és formája mindig 
            a gyermek életkorához és szükségleteihez igazodik.
          </p>

          {/* ===== HOGYAN ÁLLAPÍTJÁK MEG A KAPCSOLATTARTÁST? ===== */}
          <h2>Hogyan állapítják meg a kapcsolattartást?</h2>

          <p>
            A kapcsolattartás módját és gyakoriságát <strong>a bíróság vagy a szülők 
            egyezsége</strong> határozza meg. A döntés során az alábbi szempontokat 
            veszik figyelembe:
          </p>

          <p>
            <strong>1. A gyermek életkora</strong>
          </p>

          <ul>
            <li>kisgyermek esetén gyakoribb, de rövidebb találkozók javasoltak,</li>
            <li>idősebb gyermek esetén hosszabb időtartamú találkozók is lehetségesek,</li>
            <li>a gyermek életkorával a találkozók időtartama és gyakorisága változhat.</li>
          </ul>

          <p>
            <strong>2. Az iskola és a távolság</strong>
          </p>

          <ul>
            <li>a szülők közötti távolság befolyásolja a találkozások gyakoriságát,</li>
            <li>az iskolai elfoglaltságokhoz igazodó időpontok (pl. hétvégék, szünetek),</li>
            <li>a gyermek iskolai és egyéb programjainak figyelembevétele.</li>
          </ul>

          <p>
            <strong>3. A gyermek érdeke</strong>
          </p>

          <ul>
            <li>a gyermek testi és lelki fejlődésének biztosítása,</li>
            <li>a gyermek megszokott környezetének és rutinjának tiszteletben tartása,</li>
            <li>a gyermek véleményének figyelembevétele (ha megfelelő ítélőképességgel rendelkezik).</li>
          </ul>

          <p>
            <strong>4. A szülők együttműködése</strong>
          </p>

          <ul>
            <li>a szülők közötti kommunikáció minősége,</li>
            <li>a szülők hajlandósága a gyermek érdekeinek előtérbe helyezésére,</li>
            <li>a szülők közötti konfliktusok mértéke.</li>
          </ul>

          <p>
            A kapcsolattartás gyakorisága általában <strong>minden második hétvégén</strong>, 
            <strong>ünnepekkor</strong> és a <strong>szünidők egy részében</strong> 
            biztosított. Az egyes esetekben a bíróság vagy a felek egyezsége egyedileg 
            határozza meg a pontos időpontokat és feltételeket.
          </p>

          {/* ===== MIKOR MÓDOSÍTHATÓ A KAPCSOLATTARTÁS? ===== */}
          <h2>Mikor módosítható a kapcsolattartás?</h2>

          <p>
            A kapcsolattartásra vonatkozó szabályok <strong>nem véglegesek</strong>. 
            Ha a körülmények jelentősen megváltoznak, kérhető a kapcsolattartás 
            módosítása. Ilyen változás lehet:
          </p>

          <ul>
            <li>
              <strong>Költözés</strong> – ha az egyik szülő más városba vagy országba 
              költözik, ami befolyásolja a találkozások lehetőségét.
            </li>
            <li>
              <strong>A gyermek életkori változásai</strong> – a gyermek idősebbé 
              válásával más igények merülhetnek fel (pl. több idő a barátokkal, 
              különórák).
            </li>
            <li>
              <strong>A szülő élethelyzetének változása</strong> – új munkahely, 
              betegség, új családi körülmények.
            </li>
            <li>
              <strong>A gyermek igényeinek változása</strong> – iskolaváltás, 
              különleges programok, egészségügyi okok.
            </li>
          </ul>

          <p>
            A módosítási kérelem benyújtható bírósághoz, de a felek közös megegyezéssel 
            is módosíthatják a kapcsolattartás feltételeit. A módosításhoz szükség van 
            arra, hogy <strong>az új körülmények jelentős és tartós változást</strong> 
            idézzenek elő a felek életében.
          </p>

          {/* ===== MI TÖRTÉNIK, HA AKADÁLYOZZÁK A KAPCSOLATTARTÁST? ===== */}
          <h2>Mi történik, ha akadályozzák a kapcsolattartást?</h2>

          <p>
            Ha a gyermeket nevelő szülő <strong>akadályozza a kapcsolattartást</strong>, 
            az súlyos jogkövetkezményekkel járhat. A kapcsolattartás akadályozása 
            nemcsak a szülő jogait sérti, hanem a gyermek érdekét is.
          </p>

          <p>
            <strong>Mit tehet a különélő szülő?</strong>
          </p>

          <ul>
            <li>
              <strong>Felszólítás</strong> – első lépésben írásban felszólítható 
              a szülő a kapcsolattartás biztosítására.
            </li>
            <li>
              <strong>Bírósági eljárás</strong> – ha a szülő nem teljesít, 
              bírósági eljárás indítható a kapcsolattartás kikényszerítésére.
            </li>
            <li>
              <strong>Végrehajtási eljárás</strong> – a bírósági ítélet alapján 
              végrehajtási eljárás indítható a kapcsolattartás biztosítására.
            </li>
            <li>
              <strong>Szülői felügyeleti jog megvonása</strong> – súlyos esetben 
              a bíróság akár a szülői felügyeleti jogot is megvonhatja.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a kapcsolattartás akadályozása <strong>a gyermek 
            érdekeit sérti</strong>, és a bíróság súlyosan veszi figyelembe az ilyen 
            eseteket. A kapcsolattartás akadályozása a szülői felügyeleti jog 
            gyakorlásának felülvizsgálatához is vezethet.
          </p>

          {/* ===== ELMARADT KAPCSOLATTARTÁS ===== */}
          <h2>Elmaradt kapcsolattartás – pótlás és következmények</h2>

          <p>
            Ha a kapcsolattartás valamilyen okból elmarad, a különélő szülőnek joga 
            van a <strong>pótlásra</strong>. Az elmaradt kapcsolattartás pótlása 
            különösen fontos a szülő-gyermek kapcsolat fenntartása érdekében.
          </p>

          <p>
            <strong>Mikor beszélünk elmaradt kapcsolattartásról?</strong>
          </p>

          <ul>
            <li>a szülő nem tudja átvenni a gyermeket a megbeszélt időpontban,</li>
            <li>a gyermeket nevelő szülő nem adja oda a gyermeket,</li>
            <li>a kapcsolattartás valamilyen külső ok miatt meghiúsul (pl. betegség, utazás).</li>
          </ul>

          <p>
            <strong>A pótlás módja:</strong>
          </p>

          <ul>
            <li>
              <strong>Közös megegyezés</strong> – a szülők megállapodhatnak az 
              elmaradt találkozó pótlásának időpontjáról.
            </li>
            <li>
              <strong>Bírósági döntés</strong> – ha a szülők nem tudnak megegyezni, 
              a bíróság dönthet a pótlás módjáról és időpontjáról.
            </li>
            <li>
              <strong>Pótlás más időpontban</strong> – az elmaradt találkozó 
              általában a következő hétvégén vagy egy másik egyeztetett időpontban 
              pótolható.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a kapcsolattartás rendszeres elmaradása 
            <strong>a gyermek érzelmi fejlődését károsíthatja</strong>, ezért 
            törekedni kell a rendszeres és zavartalan kapcsolattartásra.
          </p>

          {/* ===== LEHET MEGEGYEZNI? ===== */}
          <h2>Lehet megegyezni a kapcsolattartásról?</h2>

          <p>
            <strong>Igen, és ez a legkedvezőbb megoldás minden érintett számára.</strong>
          </p>

          <p>
            A szülők a bírósági eljárás előtt vagy alatt is köthetnek egyezséget a 
            kapcsolattartás módjáról és gyakoriságáról. Az egyezség előnyei:
          </p>

          <ul>
            <li>gyorsabb és olcsóbb, mint a peres eljárás,</li>
            <li>a szülők maguk alakítják ki a gyermek számára legmegfelelőbb megoldást,</li>
            <li>csökkenti a konfliktusok továbbélésének kockázatát,</li>
            <li>a bíróság jóváhagyása esetén az egyezség végrehajtható.</li>
          </ul>

          <p>
            Az egyezséget érdemes <strong>ügyvéd segítségével</strong> elkészíteni, 
            hogy az jogilag is megfelelő legyen, és a későbbi vitákat elkerüljük.
          </p>

          {/* ===== MIÉRT ÉRDEMES ÜGYVÉDHEZ FORDULNI? ===== */}
          <h2>Miért érdemes ügyvédhez fordulni?</h2>

          <p>
            A kapcsolattartás rendezése az egyik legérzékenyebb családjogi kérdés, 
            amely hosszú távon meghatározza a szülő-gyermek kapcsolatot. Az ügyvéd 
            segítsége több szempontból is elengedhetetlen:
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
              <strong>Iratok elkészítése</strong> – a bírósági beadványok, 
              keresetlevelek és egyezségi javaslatok szakszerű elkészítése.
            </li>
            <li>
              <strong>Képviselet</strong> – az ügyvéd képviseli Önt a bíróságon és 
              az egyeztetéseken.
            </li>
            <li>
              <strong>Végrehajtás segítése</strong> – ha a kapcsolattartást 
              akadályozzák, az ügyvéd segít a jogi lépések megtételében.
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
          'a szülők nem tudnak megegyezni a kapcsolattartás módjáról',
          'bírósági eljárás indult vagy várható a kapcsolattartás rendezésére',
          'szeretnék békés úton, egyezséggel rendezni a kapcsolattartást',
          'megváltoztak a körülmények és módosítani kell a kapcsolattartást',
          'a másik szülő akadályozza a kapcsolattartást',
          'elmaradt kapcsolattartás pótlására van szükség',
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
          description: 'Áttekintjük a kapcsolattartás kérdését, a gyermek helyzetét és a lehetséges jogi megoldásokat.'
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

      faqTitle="Gyakori kérdések a kapcsolattartásról"

      faqItems={[
        {
          question: 'Mi történik, ha a szülő nem adja oda a gyermeket a kapcsolattartásra?',
          answer: 'Ha a szülő nem adja oda a gyermeket, az a kapcsolattartás akadályozásának minősül. A különélő szülő bírósághoz fordulhat, amely elrendelheti a kapcsolattartás biztosítását. Súlyos esetben a bíróság a szülői felügyeleti jog gyakorlását is felülvizsgálhatja.'
        },
        {
          question: 'Pótolható az elmaradt kapcsolattartás?',
          answer: 'Igen, az elmaradt kapcsolattartás pótolható. A szülők közös megegyezéssel állapodhatnak meg a pótlás időpontjáról. Ha nincs egyetértés, a bíróság dönthet a pótlás módjáról és időpontjáról.'
        },
        {
          question: 'Módosítható a kapcsolattartás módja?',
          answer: 'Igen, ha a körülmények jelentősen megváltoznak (pl. költözés, a gyermek életkori változásai), kérhető a kapcsolattartás módosítása. Ehhez új bírósági eljárásra van szükség.'
        },
        {
          question: 'Hogyan működik a kapcsolattartás, ha az egyik szülő külföldön él?',
          answer: 'Külföldön élő szülő esetén a kapcsolattartás általában ritkább, de hosszabb találkozókat jelent (pl. szünidők, ünnepek). A kapcsolattartás módját a bíróság vagy a szülők egyezsége határozza meg, figyelembe véve a távolságot és a költségeket.'
        },
        {
          question: 'Hogyan működik a kapcsolattartás ünnepek és szünidők alatt?',
          answer: 'A kapcsolattartás ünnepek és szünidők alatt általában hosszabb időtartamú találkozókat jelent. A bíróság vagy a szülők egyezsége meghatározza, hogy a gyermek mely ünnepeket és a szünidő mekkora részét töltse a különélő szülőnél.'
        }
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          name: 'Dr. Léner Pintér Sára',
          description: 'Kapcsolattartás rendezése Veszprémben. A különélő szülő és gyermek közötti kapcsolattartás megállapítása, módosítása, pótlása és végrehajtása.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/kapcsolattartas',
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
          name: 'Kapcsolattartás ügyvéd Veszprém',
          description: 'Teljes körű családjogi képviselet kapcsolattartás ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/kapcsolattartas',
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
              name: 'Mi történik, ha a szülő nem adja oda a gyermeket a kapcsolattartásra?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ha a szülő nem adja oda a gyermeket, az a kapcsolattartás akadályozásának minősül. A különélő szülő bírósághoz fordulhat, amely elrendelheti a kapcsolattartás biztosítását. Súlyos esetben a bíróság a szülői felügyeleti jog gyakorlását is felülvizsgálhatja.'
              }
            },
            {
              '@type': 'Question',
              name: 'Pótolható az elmaradt kapcsolattartás?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, az elmaradt kapcsolattartás pótolható. A szülők közös megegyezéssel állapodhatnak meg a pótlás időpontjáról. Ha nincs egyetértés, a bíróság dönthet a pótlás módjáról és időpontjáról.'
              }
            },
            {
              '@type': 'Question',
              name: 'Módosítható a kapcsolattartás módja?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, ha a körülmények jelentősen megváltoznak (pl. költözés, a gyermek életkori változásai), kérhető a kapcsolattartás módosítása. Ehhez új bírósági eljárásra van szükség.'
              }
            },
            {
              '@type': 'Question',
              name: 'Hogyan működik a kapcsolattartás, ha az egyik szülő külföldön él?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Külföldön élő szülő esetén a kapcsolattartás általában ritkább, de hosszabb találkozókat jelent (pl. szünidők, ünnepek). A kapcsolattartás módját a bíróság vagy a szülők egyezsége határozza meg, figyelembe véve a távolságot és a költségeket.'
              }
            }
          ]
        }
      ]}
    />
  )
}