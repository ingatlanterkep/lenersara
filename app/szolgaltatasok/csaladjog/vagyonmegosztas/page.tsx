import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Házastársi vagyonmegosztás ügyvéd Veszprém',
  description: 'Házastársi vagyonmegosztás Veszprémben. Közös vagyon és különvagyon megosztása, egyezség készítése, bírósági képviselet. Több mint 25 év tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/vagyonmegosztas'
  },
  openGraph: {
    title: 'Házastársi vagyonmegosztás ügyvéd Veszprém',
    description: 'Házastársi vagyonmegosztás Veszprémben. Közös vagyon és különvagyon megosztása, egyezség készítése, bírósági képviselet.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/vagyonmegosztas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article'
  },
  keywords: 'házastársi vagyonmegosztás, közös vagyon, különvagyon, vagyonmegosztási per, házassági vagyonjog, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }]
}

export default function Vagyonmegosztas() {
  return (
    <ServiceTemplate
      heroTitle="Házastársi vagyonmegosztás"
      heroSubtitle="Ügyvédi segítség veszprémben"
      heroDescription="Amiben segíteni tudok: vagyonmegosztás, egyezség, ingatlan, hitel, vállalkozás, per."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        { label: 'Vagyonmegosztás', href: '/szolgaltatasok/csaladjog/vagyonmegosztas' }
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '💰', text: 'Vagyonjogi ügyek specialista' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🤝', text: 'Békés megoldások támogatása' }
      ]}

      content={
        <>
          {/* ===== MI TARTOZIK A KÖZÖS VAGYONBA? ===== */}
          <h2>Mi tartozik a közös vagyonba?</h2>

          <p>
            A házastársak közös vagyonába (más néven: házastársi vagyonközösség) 
            <strong>mindazok a vagyontárgyak tartoznak</strong>, amelyeket a 
            házastársak a házasságkötés időpontjától kezdve, együtt vagy külön, de a 
            házasság fennállása alatt szereztek.
          </p>

          <p>
            <strong>A közös vagyonba tartoznak különösen:</strong>
          </p>

          <ul>
            <li>
              <strong>Ingatlanok</strong> – a házasság alatt vásárolt vagy épített 
              lakások, házak, telkek és egyéb ingatlanok.
            </li>
            <li>
              <strong>Járművek</strong> – a házasság alatt vásárolt gépjárművek, 
              motorok és egyéb járművek.
            </li>
            <li>
              <strong>Pénzbeli megtakarítások</strong> – bankbetétek, értékpapírok, 
              részvények és egyéb pénzügyi eszközök.
            </li>
            <li>
              <strong>Vállalkozások</strong> – a házasság alatt alapított vagy 
              megszerzett vállalkozások, üzletrészek.
            </li>
            <li>
              <strong>Berendezések és felszerelések</strong> – a közös háztartásban 
              használt vagyontárgyak, bútorok, műszaki cikkek.
            </li>
            <li>
              <strong>Jövedelmek</strong> – a házastársak munkabére, vállalkozói 
              bevétele és egyéb rendszeres jövedelme.
            </li>
            <li>
              <strong>Hitelek és tartozások</strong> – a közös vagyon terhei, amelyek 
              a házasság alatt keletkeztek.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a közös vagyonba tartozik minden, amit a 
            házastársak a házasság fennállása alatt szereztek, függetlenül attól, hogy 
            melyikük nevére került a tulajdonjog. A közös vagyonból mindkét 
            házastárs egyenlő arányban részesedik, hacsak a bíróság vagy a felek 
            egyezsége másként nem rendelkezik.
          </p>

          {/* ===== MI NEM TARTOZIK A KÖZÖS VAGYONBA? ===== */}
          <h2>Mi nem tartozik a közös vagyonba? – A különvagyon</h2>

          <p>
            A különvagyon azok a vagyontárgyak, amelyek <strong>nem képezik részét 
            a házastársi vagyonközösségnek</strong>, és a vagyonmegosztás során 
            nem oszthatók meg. A különvagyonba tartozó vagyontárgyak a tulajdonos 
            házastárs kizárólagos tulajdonát képezik.
          </p>

          <p>
            <strong>A különvagyonba tartoznak különösen:</strong>
          </p>

          <ul>
            <li>
              <strong>Házasságkötés előtt szerzett vagyon</strong> – minden olyan 
              vagyontárgy, amely a házasságkötés időpontjában már a házastárs 
              tulajdonában volt.
            </li>
            <li>
              <strong>Örökség</strong> – a házasság alatt örökléssel szerzett 
              vagyontárgyak.
            </li>
            <li>
              <strong>Ajándék</strong> – a házasság alatt ajándékként kapott 
              vagyontárgyak, kivéve, ha az ajándékozó kifejezetten a közös vagyon 
              gyarapítását célozta.
            </li>
            <li>
              <strong>Különvagyonból származó jövedelem</strong> – a különvagyon 
              hasznosításából származó jövedelem (pl. különvagyonba tartozó ingatlan 
              bérbeadásából származó bevétel).
            </li>
            <li>
              <strong>Személyes használati tárgyak</strong> – a házastárs személyes 
              használatára szolgáló tárgyak (pl. ruha, ékszer, szerszámok).
            </li>
            <li>
              <strong>Személyes juttatások</strong> – olyan juttatások, amelyek 
              kifejezetten a házastárs személyéhez kötődnek (pl. személyi sérülés 
              miatti kártérítés).
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a különvagyonba tartozó vagyontárgyak 
            <strong>nem oszthatók meg</strong> a vagyonmegosztás során. Azonban ha a 
            különvagyon értéke a házasság alatt jelentősen megnőtt a másik házastárs 
            közreműködése miatt, a bíróság figyelembe veheti ezt a körülményt.
          </p>

          {/* ===== HOGYAN TÖRTÉNIK A MEGOSZTÁS? ===== */}
          <h2>Hogyan történik a házastársi vagyon megosztása?</h2>

          <p>
            A házastársi vagyon megosztása <strong>történhet közös megegyezéssel 
            vagy bírósági eljárásban</strong>. A vagyonmegosztás során a közös 
            vagyonban lévő vagyontárgyakat a felek között el kell osztani.
          </p>

          <p>
            <strong>A vagyonmegosztás lépései:</strong>
          </p>

          <ul>
            <li>
              <strong>1. A vagyon feltérképezése</strong> – a közös vagyonba tartozó 
              vagyontárgyak és tartozások azonosítása, értékük meghatározása.
            </li>
            <li>
              <strong>2. A különvagyon elkülönítése</strong> – a különvagyonba 
              tartozó vagyontárgyak kiszűrése a közös vagyonból.
            </li>
            <li>
              <strong>3. A közös vagyon értékének meghatározása</strong> – a közös 
              vagyonban lévő vagyontárgyak piaci értékének megállapítása.
            </li>
            <li>
              <strong>4. A vagyontárgyak elosztása</strong> – a felek megegyeznek 
              vagy a bíróság dönt a vagyontárgyak elosztásáról.
            </li>
            <li>
              <strong>5. A vagyonmegosztási szerződés vagy ítélet</strong> – a 
              megállapodás vagy a bírósági döntés jogerőre emelkedése.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a vagyonmegosztás során a felek törekedhetnek 
            arra, hogy a vagyontárgyakat <strong>természetben</strong> osszák meg 
            (pl. egyiké az ingatlan, másiké az autó), vagy <strong>pénzbeli 
            ellenérték</strong> fizetésével rendezhetik a különbözetet.
          </p>

          <p>
            A vagyonmegosztás <strong>válással összefüggésben és attól függetlenül 
            is felmerülhet</strong>. A házastársak a házasság fennállása alatt is 
            kérhetik a vagyonközösség megszüntetését, például ha a házastársak 
            különváltan élnek.
          </p>

          {/* ===== MIKOR LEHET PER? ===== */}
          <h2>Mikor lehet vagyonmegosztási pert indítani?</h2>

          <p>
            Vagyonmegosztási pert akkor lehet indítani, ha a házastársak 
            <strong>nem tudnak megegyezni</strong> a közös vagyon megosztásáról. 
            A per indításának feltételei:
          </p>

          <ul>
            <li>
              a házasság felbontása iránti per már folyamatban van, vagy a házasság 
              már felbontásra került,
            </li>
            <li>
              a házastársak különváltan élnek, és a vagyonközösség megszüntetését 
              kérik,
            </li>
            <li>
              a házastársak között vita van arról, hogy mely vagyontárgyak tartoznak 
              a közös vagyonba.
            </li>
          </ul>

          <p>
            <strong>A vagyonmegosztási per menete:</strong>
          </p>

          <ul>
            <li>
              <strong>Keresetlevél benyújtása</strong> – a per a keresetlevél 
              benyújtásával indul, amelyben a felperes kéri a közös vagyon 
              megosztását.
            </li>
            <li>
              <strong>Bizonyítási eljárás</strong> – a felek bizonyítják a 
              vagyontárgyak értékét és a közös vagyonba tartozásukat.
            </li>
            <li>
              <strong>Szakértői vélemények</strong> – a bíróság szakértőt rendelhet 
              ki a vagyontárgyak értékének megállapítására.
            </li>
            <li>
              <strong>Tárgyalások</strong> – a bíróság meghallgatja a feleket és 
              dönt a vagyonmegosztásról.
            </li>
            <li>
              <strong>Ítélet</strong> – a bíróság ítéletben határozza meg a 
              vagyonmegosztás módját.
            </li>
          </ul>

          <p>
            <strong>Fontos:</strong> a vagyonmegosztási per <strong>hosszadalmas 
            és költséges</strong> lehet, ezért érdemes először megkísérelni a 
            megegyezést.
          </p>

          {/* ===== LEHET EGYEZSÉGET KÖTNI? ===== */}
          <h2>Lehet egyezséget kötni a vagyonmegosztásról?</h2>

          <p>
            <strong>Igen, és ez a legkedvezőbb megoldás.</strong>
          </p>

          <p>
            A házastársak <strong>bármikor</strong> köthetnek egyezséget a közös 
            vagyon megosztásáról. Az egyezség előnyei:
          </p>

          <ul>
            <li>gyorsabb és olcsóbb, mint a peres eljárás,</li>
            <li>a felek maguk alakítják ki a számukra legmegfelelőbb megoldást,</li>
            <li>kevésbé megterhelő érzelmileg,</li>
            <li>a bíróság jóváhagyása esetén az egyezség végrehajtható.</li>
          </ul>

          <p>
            Az egyezség tartalmazhatja a vagyontárgyak elosztását, a pénzbeli 
            ellentételezést, a tartozások rendezését és a felek egyéb megállapodásait.
          </p>

          <p>
            Az egyezséget érdemes <strong>ügyvéd segítségével</strong> elkészíteni, 
            hogy az jogilag is megfelelő legyen, és a későbbi vitákat elkerüljük.
          </p>

          {/* ===== MIÉRT ÉRDEMES ÜGYVÉDHEZ FORDULNI? ===== */}
          <h2>Miért érdemes ügyvédhez fordulni vagyonmegosztás esetén?</h2>

          <p>
            A házastársi vagyonmegosztás az egyik legösszetettebb családjogi kérdés, 
            amely hosszú távon meghatározza a felek anyagi helyzetét. Az ügyvéd 
            segítsége több szempontból is elengedhetetlen:
          </p>

          <ul>
            <li>
              <strong>Szakértelem</strong> – az ügyvéd ismeri a vonatkozó 
              jogszabályokat és a bírósági gyakorlatot, így fel tudja mérni a 
              lehetséges kimeneteleket.
            </li>
            <li>
              <strong>Objektív szemlélet</strong> – érzelmileg megterhelő helyzetben 
              az ügyvéd segít racionális döntéseket hozni.
            </li>
            <li>
              <strong>Iratok elkészítése</strong> – a vagyonmegosztási szerződések, 
              keresetlevelek és egyezségi javaslatok szakszerű elkészítése.
            </li>
            <li>
              <strong>Képviselet</strong> – az ügyvéd képviseli Önt a bíróságon és 
              az egyeztetéseken.
            </li>
            <li>
              <strong>Vagyon feltérképezése</strong> – az ügyvéd segít a közös 
              vagyonba tartozó vagyontárgyak azonosításában és értékük 
              meghatározásában.
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
          'a házastársak nem tudnak megegyezni a vagyonmegosztásról',
          'bírósági eljárás indult vagy várható a vagyonmegosztásra',
          'szeretnék békés úton, egyezséggel rendezni a vagyonmegosztást',
          'bizonytalan abban, hogy mi tartozik a közös vagyonba',
          'ingatlan, vállalkozás vagy jelentős értékű vagyon megosztása szükséges',
          'a másik fél nem ismeri el a különvagyonba tartozó vagyontárgyakat',
          'bizonytalan a jogi helyzetben, tanácsra van szüksége'
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/kapcsolat'
      }}

      timelineTitle="Hogyan zajlik a vagyonmegosztás?"

      timelineSteps={[
        {
          number: 1,
          title: 'Kapcsolatfelvétel',
          description: 'Vegye fel velem a kapcsolatot telefonon vagy e-mailben, és vázolja a helyzetet.'
        },
        {
          number: 2,
          title: 'Személyes konzultáció',
          description: 'Áttekintjük a vagyoni helyzetet, a közös vagyonba tartozó vagyontárgyakat és a lehetséges jogi megoldásokat.'
        },
        {
          number: 3,
          title: 'Vagyon feltérképezése',
          description: 'Azonosítjuk a közös vagyonba tartozó vagyontárgyakat és tartozásokat, valamint a különvagyont.'
        },
        {
          number: 4,
          title: 'Stratégia kialakítása',
          description: 'Közösen meghatározzuk a legjobb jogi stratégiát: egyezség vagy bírósági eljárás.'
        },
        {
          number: 5,
          title: 'Képviselet az eljárásban',
          description: 'Képviselem Önt a bíróság előtt és az egyeztetéseken, az Ön érdekeit szem előtt tartva.'
        }
      ]}

      faqTitle="Gyakori kérdések a házastársi vagyonmegosztásról"

      faqItems={[
        {
          question: 'Mi számít közös vagyonnak?',
          answer: 'A közös vagyonba tartoznak mindazok a vagyontárgyak, amelyeket a házastársak a házasságkötés időpontjától kezdve, együtt vagy külön, de a házasság fennállása alatt szereztek. Ide tartoznak az ingatlanok, járművek, megtakarítások, vállalkozások, jövedelmek és a házasság alatt felvett hitelek is.'
        },
        {
          question: 'Mi számít különvagyonnak?',
          answer: 'A különvagyonba tartoznak a házasságkötés előtt szerzett vagyontárgyak, az örökség, az ajándék, a különvagyonból származó jövedelem, valamint a személyes használati tárgyak és személyes juttatások. A különvagyon nem osztható meg a vagyonmegosztás során.'
        },
        {
          question: 'Mi történik a közös lakással?',
          answer: 'A közös lakás a közös vagyon része, így a vagyonmegosztás során el kell dönteni, hogy kié legyen. A felek megegyezhetnek abban, hogy az egyikük megtartja a lakást és kifizeti a másiknak az értékének felét, vagy eladják a lakást és megosztják a vételárat.'
        },
        {
          question: 'Mi történik a házasság alatt felvett hitelekkel?',
          answer: 'A házasság alatt felvett hitelek a közös vagyon terhei, így a vagyonmegosztás során rendezni kell a felelősséget. A felek megegyezhetnek abban, hogy ki vállalja a hitel törlesztését, vagy a hitelt a vagyonmegosztás részeként rendezik.'
        },
        {
          question: 'Mi történik az autóval?',
          answer: 'A házasság alatt vásárolt autó a közös vagyon része, így a vagyonmegosztás során el kell dönteni, hogy kié legyen. A felek megegyezhetnek abban, hogy az egyikük megtartja az autót és kifizeti a másiknak az értékének felét.'
        },
        {
          question: 'Mi történik a vállalkozással?',
          answer: 'A házasság alatt alapított vagy megszerzett vállalkozás a közös vagyon része. A vállalkozás megosztása bonyolult kérdés, amelyhez szakértői véleményre és alapos jogi elemzésre van szükség. A felek megegyezhetnek abban, hogy az egyikük viszi tovább a vállalkozást és kifizeti a másiknak az értékének megfelelő összeget.'
        }
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          name: 'Dr. Léner Pintér Sára',
          description: 'Házastársi vagyonmegosztás Veszprémben. Közös vagyon és különvagyon megosztása, egyezség készítése, bírósági képviselet.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/vagyonmegosztas',
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
          name: 'Házastársi vagyonmegosztás ügyvéd Veszprém',
          description: 'Teljes körű családjogi képviselet házastársi vagyonmegosztás ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/vagyonmegosztas',
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
              name: 'Mi számít közös vagyonnak?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A közös vagyonba tartoznak mindazok a vagyontárgyak, amelyeket a házastársak a házasságkötés időpontjától kezdve, együtt vagy külön, de a házasság fennállása alatt szereztek. Ide tartoznak az ingatlanok, járművek, megtakarítások, vállalkozások, jövedelmek és a házasság alatt felvett hitelek is.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mi számít különvagyonnak?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A különvagyonba tartoznak a házasságkötés előtt szerzett vagyontárgyak, az örökség, az ajándék, a különvagyonból származó jövedelem, valamint a személyes használati tárgyak és személyes juttatások. A különvagyon nem osztható meg a vagyonmegosztás során.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mi történik a közös lakással?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A közös lakás a közös vagyon része, így a vagyonmegosztás során el kell dönteni, hogy kié legyen. A felek megegyezhetnek abban, hogy az egyikük megtartja a lakást és kifizeti a másiknak az értékének felét, vagy eladják a lakást és megosztják a vételárat.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mi történik a házasság alatt felvett hitelekkel?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A házasság alatt felvett hitelek a közös vagyon terhei, így a vagyonmegosztás során rendezni kell a felelősséget. A felek megegyezhetnek abban, hogy ki vállalja a hitel törlesztését, vagy a hitelt a vagyonmegosztás részeként rendezik.'
              }
            }
          ]
        }
      ]}
    />
  )
}