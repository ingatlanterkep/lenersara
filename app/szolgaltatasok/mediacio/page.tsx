import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Mediáció Veszprém | Békés vitarendezés | dr. Léner-Pintér Sára',
  description:
    'Mediáció Veszprémben - békés vitarendezés közvetítői eljárással. Párkapcsolati, válási, munkaügyi, iskolai és közösségi mediáció. Több mint 25 év tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/mediacio'
  },
  openGraph: {
    title: 'Mediáció Veszprém | Békés vitarendezés | dr. Léner-Pintér Sára',
    description:
      'Mediáció - békés vitarendezés közvetítői eljárással Veszprémben. Párkapcsolati, válási, munkaügyi, iskolai és közösségi mediáció.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/mediacio',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article'
  },
  keywords:
    'mediáció, békés vitarendezés, közvetítői eljárás, mediátor, válási mediáció, párkapcsolati mediáció, munkaügyi mediáció, iskolai mediáció, közösségi mediáció, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }]
}

export default function Mediacio() {
  return (
    <ServiceTemplate
      heroTitle="Mediáció - Közvetítői eljárás"
      heroSubtitle="dr. Léner-Pintér Sára"
      heroDescription="Békés vitarendezés közvetítői eljárással. Párkapcsolati, válási, munkaügyi, iskolai és közösségi mediáció."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Mediáció', href: '/szolgaltatasok/mediacio' }
      ]}

      trustItems={[
        { icon: '🤝', text: 'Igazságügyi Minisztériumi névjegyzékben szereplő mediátor' },
        { icon: '⚖️', text: 'Több mint 25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🔒', text: 'Szigorú titoktartás' },
        { icon: '💡', text: 'Gyors és költséghatékony eljárás' }
      ]}

      content={
        <>
          <h2>Mediácóról (békés vitarendezésről) kicsit bővebben</h2>

          <p>
            A mediáció a legkézenfekvőbb, legegyszerűbb és egyben legoptimálisabb 
            megoldás az emberi konfliktusok kezelésére.
          </p>

          <p>
            A mediáció célja a konfliktusból és káoszból, az esetleges félelemből 
            egy nyugodt, együttműködő, rendezett felek közti kapcsolat és 
            kommunikációs tér létrehozása.
          </p>

          <p>
            A mediáció során a felek az ügy urai maradnak, bármikor megszakíthatják 
            és újrakezdhetik a folyamatot.
          </p>

          <p>
            A mediátor nem a vita tárgyát képező témák, szakmák szakértője, hanem 
            a konfliktusoké. Nem bíró, nem ügyész és nem is ügyvéd, tehát nem 
            ítélkezik, nem vádol és nem is véd.
          </p>

          <p>
            A konfliktusban lévő személyek a mediáció során egyenrangú félként 
            nem a bűnbakot keresik, hanem a jövőre irányuló közösen elfogadható 
            és teljesíthető megoldást.
          </p>

          <p>
            <strong>A mediáció végén nincs vesztes, csak nyertes!</strong>
          </p>

          <p>
            A mediáció során elhangzottak szigorúan bizalmas információk, amiket 
            egyik fél és a mediátor sem adhat ki senki számára.
          </p>

          <p>
            A mediáció viszonylag gyors, körülbelül max. 4 hónapot vesz igénybe, 
            mivel az esetek többségében 1-3 találkozási alkalom elég a felek 
            egyezségkötéséhez.
          </p>

          <h2>Mediáció szerepe</h2>

          <p>
            Többen felvetettétek: "Tényleg, eddig is a megbékélésre törekedtél, 
            de, addig jó, amíg nincs a mediációra szükségem! Békés vitarendezés? 
            Nem ellentmondás ez?"
          </p>

          <p>
            Ezen elgondolkodva arra jutottam, hogy hasznos lehet számotokra, ha 
            leírom, hol segíthet a mediáció, amire elsőre nem gondoltatok a 
            békés vitarendezés lehetősége kapcsán.
          </p>

          <p>
            Szerintem hosszútávon nem éri meg bosszankodni, mert a harag nem csak 
            rossz tanácsadó, hanem tudományosan igazolt tény, hogy megbetegíti a 
            lelket, később pedig a testet is. Zsörtölődésre egy magyar ember 
            számára mindig adódik ok: a boltos nem volt kedves a kiszolgálásnál, 
            nem adott jól vissza; a gyerek otthon felejtette az uzsonnát; az 
            asszony megkarcolta a kocsit; a biztosító nem fizet; az eladó nem 
            veszi vissza a hibás terméket stb. - az ilyen jellegű problémáktól 
            a hosszútávon megromló kapcsolatokat eredményező párkapcsolati-, 
            szomszédok közti, üzleti-, stb. vitákig.
          </p>

          <p>
            Az a jó a mediációban, hogy alkalmazható mindenhol, ahol két fél 
            között vita és hosszantartó zsörtölődés támadhat. (Vannak kivételek, 
            erről később fogok írni). Okot szolgáltatthatnak azok, akikkel együtt 
            élünk, vagy akik szűkebb és tágabb értelemben, választottan vagy 
            alkalomszerűen benne vannak vagy belemásznak az életterünkbe. 
            Előfordulhat: ágyban, asztalnál, házban és házon kívül, munkahelyen 
            és boltban, a szerelőnél és a szolgáltatónál, és igen, még a 
            manikűr-, pedikűr-, kozmetikus-, fodrász, stb. esetében is.
          </p>

          <p>
            Néhány példával meg szeretném megmutatni, hogy mennyire gyakorlatiasan 
            lehet alkalmazni a mediációt a mindennapi idegeskedések és "amikor 
            meglátom a másik felet, már felszökik a pumpa" érzés helyett. A 
            példák lehet ismerősek lesznek:
          </p>

          <h3>1. példa</h3>

          <p>
            <strong>Egyik fél:</strong> a telekszomszéd egy ideje nem metszi a 
            fákat, az ágak átlógnak az én földemre, ezért a paradicsompalántáim 
            nem kapnak napfényt és nem hoznak termést.
          </p>

          <p>
            <strong>Másik fél:</strong> megöregedtem, már nem tudok fát metszeni, 
            kisnyugdíjasként pedig nincs annyi pénzem, hogy embert fogadjak erre 
            a munkára. Rokonságom elfoglalt. Gyerekeim és unokáim külföldön 
            élnek. Sokszor adtam át gyümölcsöt azelőtt a szomszédba, de mostanra 
            a fák sem teremnek annyit.
          </p>

          <h3>2. példa</h3>

          <p>
            <strong>Egyik fél:</strong> "a szomszéd évek óta nem javítja meg a 
            kerítését és ezért nem csak csúnya és rendezetlen látványt nyújt a 
            házam környéke, de potenciális veszélyt is jelent a házam biztonságára 
            nézve."
          </p>

          <p>
            <strong>Másik fél:</strong> "évek óta újítom fel a házat, ígéretet 
            tettem, hogy a végén egy normális kerítésszakaszt kap, de elfogyott a 
            pénzem és lassabban halad az építkezés, mint azt vártam".
          </p>

          <h3>3. példa</h3>

          <p>
            <strong>Egyik fél:</strong> az óvodában hiába szóltam, hogy ne 
            tömjék meg a gyereket, mert refluxos, mégis kötelező neki mindent 
            megenni.
          </p>

          <p>
            <strong>Másik fél:</strong> nekünk a gyermekek étkeztetésére 
            különösen oda kell figyelni. Gyakori, hogy a gyermek maga kéri az 
            ételt, mert éhes. Ha anyuka nem hoz neki megfelelő ételt, amiből 
            mintát is le tudunk adni az ÁNTSZ-nek, akkor azt kapja, mint a többi 
            gyerek.
          </p>

          <p>
            Ezekben az esetekben a napi zsörtölődés és egymást gyalázó hangnem 
            elkerülhető, ha a felek bevonnak egy szakembert, aki úgymond egyik 
            fél felé sem pártosan, "moderálja" a beszélgetést úgy, hogy mindkét 
            fél nyugodt hangnemben el tudja mondani álláspontját és közösen 
            találnak megoldást nézeteltérésükre.
          </p>

          <p>
            Mindenki vágyik a békés együttélésre, és a békét legtöbben úgy 
            képzeljük el, amiben nincs eltérő nézet, nincs belső ellenérzés senki 
            felé. Az Oxford English Dictionary az "amicable" (békés) melléknevet 
            így írja le: "characterised by friendliness and absence of discord" 
            ("a barátságossággal és a viszálykodás hiányával jellemezhető"). 
            Közismert, hogy a vita békétlenséget eredményez, belső reakciókat 
            vált ki, ami indulatkitörésekre és heves külső megnyilatkozásokra is 
            sarkallhat. A fenti példák is mutatják, hogy a viták, konfliktusok 
            elkerülhetetlenül a napjaink részét képezik, bekúsznak a hálószobába, 
            a gyerekszobába, a kórházi ágyba, a temetőig elkísérve az embert. 
            Hasznos hát tudni, hogy van módszer és van megoldás, nem muszáj 
            hosszútávon gyűlölködni, meg lehet próbálni megállapodni, megszakítva 
            ezzel a rossz közérzetet eredményező zsörtölődések láncát. Hosszú 
            távon többe kerül az orvos és az idegcsillapító, mint a megállapodás 
            esélyét jelentő mediációs eljárás.
          </p>

          <p>
            Mivel az eljárás költséghatékony, gyors, önkéntes és titkos, ezért 
            szerintem egy próbát mindenképpen megér.
          </p>

          <p>
            Fontos tudni, hogy mikor nem alkalmazható a mediáció. Következő 
            posztomban erről lesz szó.
          </p>

          <p>
            Ha megszólított bármelyik példa, és nem tudod eldönteni, hogy a te 
            esetedben lehet-e mediálni, keress bátran, szigorú titoktartás mellett, 
            szakmailag felkészülten igyekszem segítségedre lenni.
          </p>

          <p>
            <em>
              A bejegyzés tartalmának szerzői joga kizárólag dr. Léner-Pintér 
              Sára egyéni ügyvédet és mediátort illeti meg. A bejegyzés 
              tájékoztató jellegű, nem számít tanácsadásnak.
            </em>
          </p>

          <h2>Ki segíthet átmenni a nehézség hídján a biztonságot adó megegyezéshez?</h2>
          <h3>Hogyan válasszon közvetítőt?</h3>

          <h4>1. Nyomon követhető a munkája</h4>

          <p>
            Tudta Ön, hogy hivatalosan csak azok számára engedélyezett, hogy 
            közvetítői tevékenységet végezzenek, akik felvételt nyertek az 
            Igazságügyi Minisztérium által vezetett és online is elérhető 
            névjegyzékbe, azaz teljesítik ezek feltételeit és mindezt az előírt 
            hivatalos iratokkal az Igazságügyi Minisztérium felé igazolták is?
          </p>

          <p>
            A közvetítői névjegyzék azoknak a mediációval, békés vitarendezéssel 
            foglalkozó szakembereknek az adatbázisa, akik megfelelnek a 
            2002. évi LV. törvény 5. §-ában leírt feltételeknek. A közvetítői 
            névjegyzék az alábbi linken található:
          </p>

          <p>
            <a 
              href="https://inyr.im.gov.hu/mediators/name-search" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              https://inyr.im.gov.hu/mediators/name-search
            </a>
          </p>

          <p>
            <strong>Az én IM azonosító számom: T/003362</strong>
          </p>

          <h4>2. Pontos információt nyújt telefonon és az első személyes találkozáskor a felek számára arról, hogy</h4>

          <ul>
            <li>mi a mediáció, mik a szabályok</li>
            <li>mennyi időt vesz igénybe</li>
            <li>mennyibe kerül a mediáció</li>
            <li>mi várható a mediációtól.</li>
          </ul>

          <h4>3. Elérhető a felek számára a megadott időpontokban és elérhetőségeken.</h4>

          <h4>4. Szimpátia - ha a mediátor hiteles (az elképzelt és a valóság találkozik egymással) a felek számára, akkor megbízzák a mediátort a közvetítésre.</h4>

          <h2>Mivel foglalkozom?</h2>

          <ul>
            <li>
              <strong>párkapcsolati mediáció</strong>, hogy újra induljon a 
              normális hangnemben folytatott beszédfolyam a felek között
            </li>
            <li>
              <strong>válási mediáció</strong>, hogy a legkevesebb sérülést 
              okozva a legkedvezőbb megoldásokat tudják megtalálni
            </li>
            <li>
              <strong>szülő-gyermek közti mediáció</strong>, hogy újraépüljön 
              a bizalom légköre a szülő és a gyermek között
            </li>
            <li>
              <strong>munkaügyi mediáció</strong>, hogy megértsék egymás 
              prioritásait és együtt tudjanak egy cél érdekében dolgozni
            </li>
            <li>
              <strong>egyéb polgárjogi mediáció</strong>, hogy a viták ne 
              akadályozzák a felek gazdasági érvényesülését
            </li>
            <li>
              <strong>közösségi mediáció</strong>, hogy a közösségi háló 
              megmaradjon a sokszínű világlátás ellenére is
            </li>
            <li>
              <strong>iskolai mediáció</strong>, hogy a fiatalok megtanulják, 
              hogy az agresszió nem megoldás
            </li>
          </ul>

          <h2>Lépjen velem kapcsolatba</h2>

          <h3>AMIRE NÁLAM BIZTOSAN SZÁMÍTHAT</h3>

          <ul>
            <li>folyamatosan fejlesztett szakmai tudás</li>
            <li>empátia</li>
            <li>koncentrált, személyre szóló figyelem a közös siker érdekében</li>
            <li>diszkréció</li>
          </ul>

          <p>
            <strong>Családunk folyóirat - 2022. december | XXIV. évfolyam 3. szám</strong>ban 
            megjelent az írásom a tanácsadást és tanács elfogadás témakörében.
          </p>

          <p>
            Milyen elemektől kell, hogy egy jó iránymutatás megóvja az embert? 
            Milyen a jó tanács? Ki a jó tanácsadó?
          </p>

          <p>
            <a 
              href="https://veszprem.csaladpasztoracio.hu/csaladunk-magazin-2022-03/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              https://veszprem.csaladpasztoracio.hu/csaladunk-magazin-2022-03/
            </a>
          </p>

          <p>
            <strong>A cikk a 10. -11. oldalon olvasható teljes terjedelemben.</strong>
          </p>

          <p>© 2022 Minden jog fenntartva</p>
        </>
      }

      whenToContact={{
        title: 'Mikor lehet szükség mediációra?',
        items: [
          'párkapcsolati problémák esetén',
          'válás előtt vagy alatt, békés megegyezés érdekében',
          'szülő-gyermek közötti konfliktusok rendezésére',
          'munkahelyi nézeteltérések és prioritások tisztázására',
          'szomszédos viták rendezésére',
          'közösségi konfliktusok kezelésére',
          'iskolai problémák, agresszió megelőzésére',
          'gazdasági érvényesülést akadályozó viták feloldására'
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/kapcsolat'
      }}

      timelineTitle="Hogyan zajlik a mediációs eljárás?"

      timelineSteps={[
        {
          number: 1,
          title: 'Kapcsolatfelvétel',
          description: 'Vegye fel velem a kapcsolatot telefonon vagy e-mailben, és vázolja a helyzetet. Szigorú titoktartás mellett.'
        },
        {
          number: 2,
          title: 'Első konzultáció',
          description: 'Tájékoztatást nyújtok a mediáció szabályairól, időtartamáról, költségeiről és a várható eredményekről.'
        },
        {
          number: 3,
          title: 'Közvetítői ülések',
          description: 'A felek egyenrangú félként, a mediátor segítségével nyugodt keretek között megbeszélik álláspontjukat.'
        },
        {
          number: 4,
          title: 'Egyezség kialakítása',
          description: 'Közösen elfogadható és teljesíthető megoldás kidolgozása, amely mindkét fél számára előnyös.'
        },
        {
          number: 5,
          title: 'Egyezség rögzítése',
          description: 'Az egyezséget írásban rögzítjük, amelyet a felek aláírnak. Az eljárás bizalmas és önkéntes.'
        }
      ]}

      faqTitle="Gyakori kérdések a mediációról"

      faqItems={[
        {
          question: 'Mi az a mediáció?',
          answer: 'A mediáció egy békés vitarendezési eljárás, amelyben egy független, pártatlan közvetítő (mediátor) segíti a vitázó feleket abban, hogy közösen elfogadható megoldást találjanak a konfliktusukra. A mediátor nem hoz döntést, nem ítélkezik, hanem a kommunikációt segíti.'
        },
        {
          question: 'Mennyi ideig tart egy mediációs eljárás?',
          answer: 'A mediáció viszonylag gyors eljárás, általában maximum 4 hónapot vesz igénybe. Az esetek többségében 1-3 találkozási alkalom elegendő a felek egyezségkötéséhez.'
        },
        {
          question: 'Bizalmas a mediáció?',
          answer: 'Igen, a mediáció során elhangzottak szigorúan bizalmas információk. Sem a felek, sem a mediátor nem adhatja ki ezeket senki számára. Ez biztosítja a bizalmas és biztonságos légkört a megbeszélésekhez.'
        },
        {
          question: 'Kötelező a mediáció?',
          answer: 'Nem, a mediáció teljesen önkéntes eljárás. A felek bármikor megszakíthatják és újrakezdhetik a folyamatot. Az ügy urai a felek maradnak.'
        },
        {
          question: 'Mi történik, ha nem születik egyezség?',
          answer: 'Ha a felek nem tudnak egyezségre jutni, a mediáció lezárul. Ilyen esetben a felek más jogi utakat választhatnak (pl. bírósági eljárás). A mediáció során elhangzottak azonban bizalmasak maradnak.'
        },
        {
          question: 'Milyen esetekben nem alkalmazható a mediáció?',
          answer: 'A mediáció nem alkalmazható olyan esetekben, ahol a felek között hatalmi egyensúlytalanság áll fenn (pl. bántalmazás), vagy ahol a jogszabályok kötelező bírósági eljárást írnak elő. Ilyen esetekben más jogi megoldások szükségesek.'
        }
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'Attorney',
          name: 'Dr. Léner Pintér Sára',
          description:
            'Mediáció Veszprémben - békés vitarendezés közvetítői eljárással. Párkapcsolati, válási, munkaügyi, iskolai és közösségi mediáció.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/mediacio',
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
          name: 'Mediációs szolgáltatás Veszprém',
          description:
            'Teljes körű mediációs szolgáltatás Veszprémben: párkapcsolati, válási, munkaügyi, iskolai és közösségi mediáció.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/mediacio',
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
              name: 'Mi az a mediáció?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A mediáció egy békés vitarendezési eljárás, amelyben egy független, pártatlan közvetítő (mediátor) segíti a vitázó feleket abban, hogy közösen elfogadható megoldást találjanak a konfliktusukra.'
              }
            },
            {
              '@type': 'Question',
              name: 'Mennyi ideig tart egy mediációs eljárás?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A mediáció viszonylag gyors eljárás, általában maximum 4 hónapot vesz igénybe. Az esetek többségében 1-3 találkozási alkalom elegendő a felek egyezségkötéséhez.'
              }
            },
            {
              '@type': 'Question',
              name: 'Bizalmas a mediáció?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Igen, a mediáció során elhangzottak szigorúan bizalmas információk. Sem a felek, sem a mediátor nem adhatja ki ezeket senki számára.'
              }
            },
            {
              '@type': 'Question',
              name: 'Kötelező a mediáció?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nem, a mediáció teljesen önkéntes eljárás. A felek bármikor megszakíthatják és újrakezdhetik a folyamatot.'
              }
            }
          ]
        }
      ]}
    />
  )
}