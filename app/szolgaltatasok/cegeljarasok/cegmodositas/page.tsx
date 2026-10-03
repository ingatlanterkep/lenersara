import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Cégmódosítás ügyvéd Veszprém | Változásbejegyzés',
  description:
    'Cégmódosítás és változásbejegyzés ügyvédi segítséggel Veszprémben. Székhely, ügyvezető, tevékenységi kör, üzletrész-átruházás és társasági szerződés módosítása.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok/cegmodositas',
  },
  openGraph: {
    title: 'Cégmódosítás ügyvéd Veszprém',
    description:
      'Cégmódosítás és változásbejegyzés jogi támogatással, a változások jogi előkészítésétől a cégbírósági bejegyzésig.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok/cegmodositas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'cégmódosítás, változásbejegyzés, társasági szerződés módosítás, székhely módosítás, ügyvezető változás, üzletrész átruházás, cégjog, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function Cegmodositas() {
  return (
    <ServiceTemplate
      heroTitle="Cégmódosítás"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="A vállalkozás működése során természetes, hogy idővel megváltoznak a nyilvántartott adatok (pl. székhely, ügyvezető, tevékenységi kör). A változásokat azonban nem elegendő a gyakorlatban végrehajtani: azokat a társasági dokumentumokban és a cégnyilvántartásban is megfelelően rendezni kell."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Cégjog', href: '/szolgaltatasok/cegeljarasok' },
        {
          label: 'Cégmódosítás',
          href: '/szolgaltatasok/cegeljarasok/cegmodositas',
        },
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🏢', text: 'Cégjogi ügyintézés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🤝', text: 'Személyre szabott jogi támogatás' },
      ]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Egy sikeres vállalkozás életében a változás a fejlődés természetes
            velejárója. Legyen szó új székhelyre költözésről, a vezetőség
            frissítéséről vagy a tulajdonosi kör bővüléséről, ezek a
            mérföldkövek nem csupán üzleti, hanem jelentős jogi döntések is.
          </p>

          <p>
            Engedje meg, hogy tájékoztassam, miért kulcsfontosságú a szakértő
            ügyvédi közreműködés és a gondos ügyvitel ezekben a folyamatokban.
          </p>

          <h2>Cégmódosítás: Jogi útmutató és szakértői támogatás</h2>

          <p>
            A vállalkozás működése során természetes, hogy idővel megváltoznak
            a nyilvántartott adatok (pl. székhely, ügyvezető, tevékenységi
            kör). A változásokat azonban nem elegendő a gyakorlatban
            végrehajtani: azokat a társasági dokumentumokban és a
            cégnyilvántartásban is megfelelően rendezni kell.
          </p>

          <h2>I. Az ügyvédi közreműködés jelentősége</h2>

          <p>
            A cégmódosítási eljárásban a jogi képviselet kötelező. Az ügyvédi
            közreműködés nem csupán a bejegyzési kérelem benyújtását jelenti,
            hanem a változások jogi előkészítését is, amely csökkenti a
            hiánypótlás, a késedelem és a későbbi működési bizonytalanság
            kockázatát.
          </p>

          <ul>
            <li>
              <strong>Gondos ügyvitel:</strong> A vezető tisztségviselők egyik
              legfontosabb kötelezettsége a társaság ügyeinek az elvárható
              fokozott gondossággal történő ellátása. Ebben a folyamatban
              szakértő támogatást nyújtok, hogy a változások minden tekintetben
              megfeleljenek a hatályos jogszabályoknak.
            </li>

            <li>
              <strong>Jogi megfelelés:</strong> A cégnyilvántartás közhiteles,
              ezért a nyilvántartott adatoknak a tényleges állapotot kell
              tükrözniük. A szabálytalan képviseleti módok vagy a bejelentés
              elmulasztása törvényességi felügyeleti eljárást vonhat maga
              után.
            </li>
          </ul>

          <h2>Miért fontos a szakmai precizitás?</h2>

          <p>
            A cégmódosítás nem csupán adminisztratív adatátírás. A
            cégnyilvántartás közhitelessége miatt minden változásnak
            tűpontosan kell tükröznie a valóságot. A jogszabályi előírások
            (Ctv. 32. §) értelmében a változásbejegyzési eljárásban a jogi
            képviselet kötelező, de a szakértelem valódi értéke a megelőzésben
            rejlik.
          </p>

          <p>
            <strong>A gondos ügyvitel jegyében segítek Önnek:</strong>
          </p>

          <ul>
            <li>
              <strong>A kockázatok minimalizálásában:</strong> Megelőzzük a
              hiánypótlási felhívásokat vagy a cégbírósági elutasításokat,
              amelyek hátráltathatják üzleti terveit.
            </li>

            <li>
              <strong>A vezetői felelősség védelmében:</strong> A bírói
              gyakorlat elvárja a vezető tisztségviselőktől a fokozott
              gondosságot. A megfelelően előkészített okiratokkal az Ön vezetői
              döntései jogilag támadhatatlanok maradnak.
            </li>

            <li>
              <strong>Személyre szabott megoldásokban:</strong> Nem sablonokkal
              dolgozunk. A társasági szerződés módosításakor figyelembe vesszük
              az Ön egyedi üzleti érdekeit és a tagok közötti bizalmi viszonyt.
            </li>
          </ul>

          <h2>II. Miben tudok segíteni a cégmódosítás során?</h2>

          <p>A változás jellegétől függően segítséget nyújtok:</p>

          <ul>
            <li>
              A tervezett módosítás jogi feltételeinek áttekintésében.
            </li>
            <li>
              A szükséges társasági határozatok és a létesítő okirat
              módosításának elkészítésében.
            </li>
            <li>
              A változásbejegyzési kérelem benyújtásában és az eljárás nyomon
              követésében.
            </li>
          </ul>

          <h2>Hogyan segíthetem az Ön munkáját?</h2>

          <p>
            A cégmódosítás során leveszem a válláról a jogi adminisztráció
            terhét, hogy Ön az üzletmenetre koncentrálhasson. A folyamat minden
            lépésénél – a tervezéstől a cégbírósági bejegyzésig – számíthat a
            szakmai támogatásomra:
          </p>

          <ul>
            <li>
              Elkészítem a szükséges társasági határozatokat és a módosított
              létesítő okiratot.
            </li>
            <li>
              Gondoskodom az elektronikus cégeljárás gyors és zökkenőmentes
              lefolytatásáról.
            </li>
            <li>
              Tanácsot adok a képviseleti jog és a döntéshozatali rend
              optimális kialakításában.
            </li>
          </ul>

          <p>
            Bízom benne, hogy szakmai tapasztalatommal és gondos ügyvitelemmel
            hozzájárulhatok vállalkozása további sikereihez. Forduljon hozzám
            bizalommal, hogy a tervezett változásokat közösen, a legnagyobb
            jogi biztonság mellett vezessük át.
          </p>
        </>
      }

      whenToContact={{
        title: 'III. Mikor érdemes ügyvédhez fordulni?',
        items: [
          'Több változást kívánnak egyidejűleg átvezetni.',
          'Üzletrész-átruházásra vagy új befektető belépésére kerül sor.',
          'A társasági szerződés egyedi rendelkezéseket tartalmaz.',
          'A módosítás pénzügyi vagy adózási következményekkel járhat.',
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Hogyan segíthetem az Ön munkáját?"

      timelineSteps={[
        {
          number: 1,
          title: 'A tervezett módosítás',
          description:
            'A tervezett módosítás jogi feltételeinek áttekintésében.',
        },
        {
          number: 2,
          title: 'Társasági határozatok',
          description:
            'Elkészítem a szükséges társasági határozatokat és a módosított létesítő okiratot.',
        },
        {
          number: 3,
          title: 'Változásbejegyzési kérelem',
          description:
            'A változásbejegyzési kérelem benyújtásában és az eljárás nyomon követésében.',
        },
        {
          number: 4,
          title: 'Elektronikus cégeljárás',
          description:
            'Gondoskodom az elektronikus cégeljárás gyors és zökkenőmentes lefolytatásáról.',
        },
        {
          number: 5,
          title: 'Képviseleti jog',
          description:
            'Tanácsot adok a képviseleti jog és a döntéshozatali rend optimális kialakításában.',
        },
      ]}

      faqTitle="Gyakori kérdések a cégmódosításról"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}