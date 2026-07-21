import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Házassági vagyonjogi szerződés ügyvéd Veszprém',
  description: 'Házassági vagyonjogi szerződés készítése Veszprémben. A vagyoni viszonyok előzetes rendezése házasság előtt vagy után. Több mint 25 év tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes'
  },
  openGraph: {
    title: 'Házassági vagyonjogi szerződés ügyvéd Veszprém',
    description: 'Házassági vagyonjogi szerződés készítése Veszprémben. A vagyoni viszonyok előzetes rendezése házasság előtt vagy után.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article'
  },
  keywords: 'házassági vagyonjogi szerződés, házassági szerződés, vagyonjogi szerződés, házasság előtti szerződés, vagyonrendezés, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }]
}

export default function HazassagiVagyonjogiSzerzodes() {
  return (
    <ServiceTemplate
      heroTitle="Házassági vagyonjogi szerződés ügyvéd Veszprém"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Amiben segíteni tudok: szerződés készítése, módosítása, felülvizsgálata."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        { label: 'Házassági vagyonjogi szerződés', href: '/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes' }
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '📋', text: 'Szerződések specialista' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🛡️', text: 'Megelőző jogi szemlélet' }
      ]}

      content={
        <>
          {/* ===== MI A HÁZASSÁGI VAGYONJOGI SZERZŐDÉS? ===== */}
          <h2>Mi a házassági vagyonjogi szerződés?</h2>

          <p>
            A házassági vagyonjogi szerződés (korábbi nevén: házassági szerződés) egy
            <strong>írásbeli megállapodás</strong>, amelyben a házastársak vagy a
            házasságot tervezők rendezik a vagyoni viszonyaikat. A szerződés célja,
            hogy <strong>előre meghatározza</strong>, hogy a házasság fennállása alatt
            szerzett vagyon hogyan kerüljön megosztásra, és mi tartozzon a különvagyonba.
          </p>

          <p>
            A házassági vagyonjogi szerződés <strong>nem a bizalom hiányáról</strong>
            szól, hanem a <strong>tudatos tervezésről</strong>. Lehetővé teszi, hogy
            a felek nyugodtabban kezeljék a vagyoni kérdéseket, és elkerüljék a
            későbbi vitákat és konfliktusokat. Nem kizárólag a házasság felbontása
            esetére készül – elsődleges célja, hogy a felek vagyoni viszonyait
            kiszámíthatóan és egyértelműen rendezze a házasság fennállása alatt is.
          </p>

          <p>
            <strong>A házassági vagyonjogi szerződés előnyei:</strong>
          </p>

          <ul>
            <li>
              <strong>Előre rendezhető</strong> – a felek már a házasságkötés előtt
              tisztázhatják a vagyoni viszonyokat.
            </li>
            <li>
              <strong>Különvagyon védelme</strong> – biztosítható, hogy a házasság
              előtt szerzett vagyon különvagyon maradjon.
            </li>
            <li>
              <strong>Vállalkozások védelme</strong> – a vállalkozások és üzleti
              érdekeltségek megóvhatók a vagyonközösség hatásaitól.
            </li>
            <li>
              <strong>Ingatlanok védelme</strong> – a családi ingatlanok és más
              értékes vagyontárgyak sorsa előre rendezhető.
            </li>
            <li>
              <strong>Konfliktusok elkerülése</strong> – a szerződés csökkenti a
              későbbi viták és pereskedések kockázatát.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a házassági vagyonjogi szerződés <strong>nem
            kötelező</strong>, de egyre több pár dönt úgy, hogy él ezzel a
            lehetőséggel, különösen ha jelentősebb vagyonnal, vállalkozással vagy
            ingatlannal rendelkeznek.
          </p>

          {/* ===== MIRE JÓ A HÁZASSÁGI VAGYONJOGI SZERZŐDÉS? ===== */}
          <h2>Mire jó a házassági vagyonjogi szerződés?</h2>

          <p>
            A házassági vagyonjogi szerződés <strong>több célt is szolgálhat</strong>
            a felek igényeitől függően:
          </p>

          <p>
            <strong>1. A vagyoni viszonyok előzetes rendezése</strong>
          </p>

          <p>
            A szerződés segítségével a felek már a házasságkötés előtt vagy a házasság
            kezdetén tisztázhatják, hogy milyen szabályok szerint működjenek a vagyoni
            viszonyaik. Ez különösen akkor hasznos, ha az egyik fél jelentősebb
            vagyonnal rendelkezik, vagy ha a felek eltérő anyagi háttérrel rendelkeznek.
          </p>

          <p>
            <strong>2. Különvagyon védelme</strong>
          </p>

          <p>
            A szerződés biztosíthatja, hogy a házasságkötés előtt szerzett vagyon
            (ingatlanok, megtakarítások, vállalkozások) <strong>különvagyon</strong>
            maradjon, és ne kerüljön be a közös vagyonba. Ez különösen fontos, ha az
            egyik fél családi vállalkozást visz vagy jelentős értékű ingatlannal
            rendelkezik.
          </p>

          <p>
            <strong>3. Vállalkozások és üzleti érdekeltségek védelme</strong>
          </p>

          <p>
            A felek a vállalkozással kapcsolatos vagyoni viszonyokat a törvényi
            vagyonjogi rendszertől eltérően is rendezhetik. Így biztosítható, hogy a
            vállalkozás és az abból származó jövedelem kezelése a felek igényeihez
            igazodjon.
          </p>

          <p>
            <strong>4. Ingatlanok sorsának rendezése</strong>
          </p>

          <p>
            A szerződés meghatározhatja, hogy a házasság alatt vásárolt ingatlanok
            hogyan kerüljenek megosztásra, vagy hogy a különvagyonba tartozó ingatlanok
            sorsa hogyan alakuljon a házasság felbomlása esetén.
          </p>

          <p>
            <strong>5. Öröklési kérdések közvetett rendezése</strong>
          </p>

          <p>
            A házassági vagyonjogi szerződés a házastársak vagyoni viszonyait rendezi.
            Ennek közvetett hatása lehet a későbbi hagyaték összetételére is, azonban
            az öröklési jogviszonyok rendezésére külön jogintézmények – például
            végrendelet vagy öröklési szerződés – szolgálnak.
          </p>

          {/* ===== TIPIKUS ÉLETHELYZETEK ===== */}
          <h2>Tipikus élethelyzetek – kinek érdemes szerződést kötni?</h2>

          <p>
            A házassági vagyonjogi szerződés különösen az alábbi élethelyzetekben
            nyújthat hasznos megoldást:
          </p>

          <ul>
            <li>
              <strong>Egyik fél már ingatlannal rendelkezik</strong> – biztosítható,
              hogy a házasságkötés előtt szerzett ingatlan különvagyon maradjon.
            </li>
            <li>
              <strong>Családi vállalkozás működik</strong> – a vállalkozás és a
              családi vagyon védelme érdekében érdemes előre rendezni a vagyoni
              viszonyokat.
            </li>
            <li>
              <strong>Jelentős megtakarítás vagy befektetés áll rendelkezésre</strong>
              – a megtakarítások és befektetések sorsa előre meghatározható.
            </li>
            <li>
              <strong>Második házasságot kötnek</strong> – különösen fontos a
              vagyon rendezése, ha az egyik vagy mindkét félnek korábbi
              kapcsolatból származó gyermekei vannak.
            </li>
            <li>
              <strong>Korábbi kapcsolatból született gyermekek vannak</strong> –
              a szerződés segíthet biztosítani a gyermekek öröklési jogait.
            </li>
            <li>
              <strong>A felek eltérő vagyoni háttérrel rendelkeznek</strong> –
              a szerződés segít tisztázni a vagyoni viszonyokat és elkerülni a
              későbbi konfliktusokat.
            </li>
          </ul>

          <p>
            Ezekben az esetekben a szerződés nem a bizalmatlanság jele, hanem
            <strong>a tudatos tervezés és a felelősségvállalás</strong> eszköze.
          </p>

          {/* ===== MIKOR ÉRDEMES MEGKÖTNI? ===== */}
          <h2>Mikor érdemes házassági vagyonjogi szerződést kötni?</h2>

          <p>
            A házassági vagyonjogi szerződés <strong>bármikor</strong> megköthető,
            de különösen érdemes az alábbi esetekben:
          </p>

          <ul>
            <li>
              <strong>Házasságkötés előtt</strong> – a felek már a házasság előtt
              tisztázhatják a vagyoni viszonyokat, ami segít elkerülni a későbbi
              félreértéseket.
            </li>
            <li>
              <strong>Jelentősebb vagyon esetén</strong> – ha az egyik vagy mindkét
              fél jelentős vagyonnal, ingatlannal vagy vállalkozással rendelkezik.
            </li>
            <li>
              <strong>Családi vállalkozás esetén</strong> – ha az egyik fél családi
              vállalkozást visz, és szeretné megóvni azt a vagyonközösség hatásaitól.
            </li>
            <li>
              <strong>Korábbi házasságból származó gyermekek esetén</strong> – ha az
              egyik félnek korábbi kapcsolatból származó gyermekei vannak, és szeretné
              biztosítani az öröklési jogokat.
            </li>
            <li>
              <strong>Ingatlanok védelme esetén</strong> – ha a felek szeretnék
              biztosítani, hogy a családi ingatlanok a családban maradjanak.
            </li>
            <li>
              <strong>Külföldi vonatkozású vagyon esetén</strong> – ha a felek
              külföldi vagyonnal rendelkeznek, a szerződés segíthet a nemzetközi
              jogi kérdések rendezésében.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a szerződés <strong>házasság fennállása
            alatt is</strong> megköthető, és módosítható, ha a körülmények változnak.
          </p>

          {/* ===== MIT LEHET SZABÁLYOZNI? ===== */}
          <h2>Mit lehet szabályozni a házassági vagyonjogi szerződésben?</h2>

          <p>
            A házassági vagyonjogi szerződés <strong>széles körű szabályozási
            lehetőséget</strong> biztosít a felek számára:
          </p>

          <ul>
            <li>
              <strong>A közös vagyonba tartozó vagyontárgyak meghatározása</strong>
              – a felek meghatározhatják, hogy mely vagyontárgyak tartozzanak a
              közös vagyonba.
            </li>
            <li>
              <strong>A különvagyonba tartozó vagyontárgyak meghatározása</strong>
              – a felek rögzíthetik, hogy mely vagyontárgyak maradjanak különvagyon.
            </li>
            <li>
              <strong>A vagyon megosztásának módja</strong> – a felek előre
              meghatározhatják, hogy a házasság felbomlása esetén hogyan osszák meg
              a közös vagyont.
            </li>
            <li>
              <strong>Ingatlanok sorsa</strong> – a szerződés tartalmazhat
              rendelkezéseket a házasság alatt vásárolt ingatlanok sorsáról.
            </li>
            <li>
              <strong>Vállalkozások és üzleti érdekeltségek</strong> – a felek
              szabályozhatják a vállalkozások és üzleti érdekeltségek kezelését.
            </li>
            <li>
              <strong>Tartozások és hitelek</strong> – a felek meghatározhatják,
              hogy a házasság alatt felvett hitelek és tartozások hogyan kerüljenek
              megosztásra.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a szerződés <strong>nem szabályozhatja</strong>
            a gyermekekkel kapcsolatos kérdéseket (pl. szülői felügyelet,
            kapcsolattartás, gyermektartás), mert ezek a kérdések a gyermek
            érdekének védelme miatt nem lehetnek szerződés tárgyai.
          </p>

          {/* ===== MÓDOSÍTHATÓ A HÁZASSÁGI VAGYONJOGI SZERZŐDÉS? ===== */}
          <h2>Módosítható a házassági vagyonjogi szerződés?</h2>

          <p>
            <strong>Igen, a szerződés bármikor módosítható</strong>, ha a felek
            közösen úgy döntenek. A módosításra az alábbi esetekben kerülhet sor:
          </p>

          <ul>
            <li>
              <strong>A vagyoni helyzet változása</strong> – új ingatlan vásárlása,
              vállalkozás alapítása, jelentős örökség vagy ajándék.
            </li>
            <li>
              <strong>A családi helyzet változása</strong> – gyermek születése,
              új házastárs, a családtagok eltartása.
            </li>
            <li>
              <strong>A felek igényeinek változása</strong> – a felek eltérő
              céljai miatt szükségessé váló módosítások.
            </li>
            <li>
              <strong>Jogszabályi változások</strong> – új jogszabályok hatályba
              lépése, amelyek befolyásolják a szerződés érvényességét.
            </li>
          </ul>

          <p>
            A módosításhoz <strong>írásbeli szerződésmódosításra</strong> van
            szükség, amelyet mindkét félnek alá kell írnia. A módosítás
            <strong>ügyvédi közreműködéssel</strong> történik, hogy az jogilag is
            megfelelő legyen.
          </p>

          {/* ===== MIÉRT ÉRDEMES ÜGYVÉDHEZ FORDULNI? ===== */}
          <h2>Miért érdemes ügyvédhez fordulni?</h2>

          <p>
            A házassági vagyonjogi szerződés elkészítése <strong>komoly jogi
            szakértelmet</strong> igényel. Az ügyvéd segítsége több szempontból is
            elengedhetetlen:
          </p>

          <ul>
            <li>
              <strong>Szakértelem</strong> – az ügyvéd ismeri a vonatkozó
              jogszabályokat és a bírósági gyakorlatot, így fel tudja mérni a
              szerződés lehetséges következményeit.
            </li>
            <li>
              <strong>Objektív szemlélet</strong> – az ügyvéd segít a feleknek
              tisztán látni a vagyoni kérdéseket és meghozni a megfelelő döntéseket.
            </li>
            <li>
              <strong>Szerződés elkészítése</strong> – az ügyvéd elkészíti a
              szerződést, amely minden fontos részletet tartalmaz és jogilag
              megfelelő.
            </li>
            <li>
              <strong>Érdekek védelme</strong> – az ügyvéd segít abban, hogy a
              szerződés mindkét fél érdekeit védje, és ne tartalmazzon hátrányos
              vagy tisztességtelen feltételeket.
            </li>
            <li>
              <strong>Módosítás és felülvizsgálat</strong> – az ügyvéd segít a
              szerződés módosításában és felülvizsgálatában, ha a körülmények
              változnak.
            </li>
          </ul>

          <p>
            Célom, hogy <strong>az Ön érdekeinek érvényesítése</strong> mellett
            segítsek egy olyan szerződést elkészíteni, amely hosszú távon is
            biztonságot nyújt a vagyoni viszonyok rendezésében.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'házasságkötést tervez, és szeretné előre rendezni a vagyoni viszonyokat',
          'jelentősebb vagyonnal, ingatlannal vagy vállalkozással rendelkezik',
          'szeretné megóvni a különvagyonát a házasság alatt',
          'családi vállalkozást visz, és szeretné megvédeni azt',
          'korábbi házasságból származó gyermekei vannak',
          'már meglévő szerződését szeretné módosítani vagy felülvizsgálni',
          'bizonytalan a jogi helyzetben, tanácsra van szüksége'
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/kapcsolat'
      }}

      timelineTitle="Hogyan zajlik a szerződés elkészítése?"

      timelineSteps={[
        {
          number: 1,
          title: 'Kapcsolatfelvétel',
          description: 'Vegye fel velem a kapcsolatot telefonon vagy e-mailben, és vázolja a helyzetet.'
        },
        {
          number: 2,
          title: 'Személyes konzultáció',
          description: 'Áttekintjük a vagyoni helyzetet, a felek igényeit és a szerződés lehetséges tartalmát.'
        },
        {
          number: 3,
          title: 'Szerződéstervezet elkészítése',
          description: 'Elkészítem a szerződéstervezetet, amely tartalmazza a felek megállapodását.'
        },
        {
          number: 4,
          title: 'Szerződés véleményezése és módosítása',
          description: 'A felek véleményezik a szerződéstervezetet, és szükség esetén módosítjuk azt.'
        },
        {
          number: 5,
          title: 'Szerződés aláírása',
          description: 'A felek aláírják a végleges szerződést, amely az aláírással – illetve a felek rendelkezése szerint – hatályba lép.'
        }
      ]}

      faqTitle="Gyakori kérdések a házassági vagyonjogi szerződésről"

      faqItems={[
        {
          question: 'Lehet házasságkötés előtt szerződést kötni?',
          answer: 'Igen, a házassági vagyonjogi szerződés házasságkötés előtt is megköthető. A szerződés a házasságkötés időpontjában lép hatályba. Ez a leggyakoribb időpont a szerződés megkötésére, mert a felek már előre rendezhetik a vagyoni viszonyokat.'
        },
        {
          question: 'Lehet házasságkötés után szerződést kötni?',
          answer: 'Igen, a szerződés házasság fennállása alatt is megköthető. A felek bármikor dönthetnek úgy, hogy rendezik a vagyoni viszonyaikat. A szerződés a megkötés időpontjától kezdve hatályos, de tartalmazhat rendelkezéseket a korábbi időszakra vonatkozóan is.'
        },
        {
          question: 'Kötelező házassági vagyonjogi szerződést kötni?',
          answer: 'Nem, a házassági vagyonjogi szerződés nem kötelező. A felek szabadon dönthetnek arról, hogy élnek-e ezzel a lehetőséggel. A szerződés hiányában a törvény rendelkezései szerint alakulnak a vagyoni viszonyok.'
        },
        {
          question: 'Mikor érvénytelen a házassági vagyonjogi szerződés?',
          answer: 'Az érvényesség megítélése mindig az ügy konkrét körülményeitől függ. Egyes formai vagy tartalmi hibák érvénytelenséget eredményezhetnek, ezért a szerződés elkészítésénél célszerű ügyvédi közreműködést igénybe venni.'
        },
        {
          question: 'Módosítható a házassági vagyonjogi szerződés?',
          answer: 'Igen, a szerződés bármikor módosítható, ha a felek közösen úgy döntenek. A módosításhoz írásbeli szerződésmódosításra van szükség, amelyet mindkét félnek alá kell írnia. A módosítást érdemes ügyvéd segítségével elkészíteni.'
        }
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          name: 'Dr. Léner Pintér Sára',
          description: 'Házassági vagyonjogi szerződés készítése Veszprémben. A vagyoni viszonyok előzetes rendezése házasság előtt vagy után.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
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
          name: 'Házassági vagyonjogi szerződés ügyvéd Veszprém',
          description: 'Teljes körű családjogi képviselet házassági vagyonjogi szerződések készítésében Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
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
              name: 'Lehet házasságkötés előtt szerződést kötni?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, a házassági vagyonjogi szerződés házasságkötés előtt is megköthető. A szerződés a házasságkötés időpontjában lép hatályba. Ez a leggyakoribb időpont a szerződés megkötésére, mert a felek már előre rendezhetik a vagyoni viszonyokat.'
              }
            },
            {
              '@type': 'Question',
              name: 'Lehet házasságkötés után szerződést kötni?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, a szerződés házasság fennállása alatt is megköthető. A felek bármikor dönthetnek úgy, hogy rendezik a vagyoni viszonyaikat. A szerződés a megkötés időpontjától kezdve hatályos, de tartalmazhat rendelkezéseket a korábbi időszakra vonatkozóan is.'
              }
            },
            {
              '@type': 'Question',
              name: 'Kötelező házassági vagyonjogi szerződést kötni?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nem, a házassági vagyonjogi szerződés nem kötelező. A felek szabadon dönthetnek arról, hogy élnek-e ezzel a lehetőséggel. A szerződés hiányában a törvény rendelkezései szerint alakulnak a vagyoni viszonyok.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mikor érvénytelen a házassági vagyonjogi szerződés?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Az érvényesség megítélése mindig az ügy konkrét körülményeitől függ. Egyes formai vagy tartalmi hibák érvénytelenséget eredményezhetnek, ezért a szerződés elkészítésénél célszerű ügyvédi közreműködést igénybe venni.'
              }
            },
            {
              '@type': 'Question',
              name: 'Módosítható a házassági vagyonjogi szerződés?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, a szerződés bármikor módosítható, ha a felek közösen úgy döntenek. A módosításhoz írásbeli szerződésmódosításra van szükség, amelyet mindkét félnek alá kell írnia. A módosítást érdemes ügyvéd segítségével elkészíteni.'
              }
            }
          ]
        }
      ]}
    />
  )
}