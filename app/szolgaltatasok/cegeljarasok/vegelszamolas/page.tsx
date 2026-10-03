import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Cégmegszüntetés és végelszámolás ügyvéd Veszprém',
  description:
    'Cégmegszüntetés és végelszámolás ügyvédi segítséggel Veszprémben. Jogi képviselet, vagyonrendezés, hitelezői igények és a társaság rendezett lezárása.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok/vegelszamolas',
  },
  openGraph: {
    title: 'Cégmegszüntetés és végelszámolás ügyvéd Veszprém',
    description:
      'Jogi segítség cégmegszüntetéshez és végelszámoláshoz, a társaság jogilag rendezett lezárásához.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok/vegelszamolas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'cégmegszüntetés, végelszámolás, cég megszüntetése, végelszámolás ügyvéd, cégjog, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function Cegmegszuntetes() {
  return (
    <ServiceTemplate
      heroTitle="Cégmegszüntetés és végelszámolás"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Egy vállalkozás megszüntetése összetett folyamat, amely során nem elegendő az üzleti tevékenység befejezése. A társaság jogutód nélküli megszűnéséhez rendezni kell a fennálló szerződéseket, követeléseket, kötelezettségeket és a társasági vagyont."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Cégjog', href: '/szolgaltatasok/cegeljarasok' },
        {
          label: 'Cégmegszüntetés és végelszámolás',
          href: '/szolgaltatasok/cegeljarasok/vegelszamolas',
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
            Egy vállalkozás életútjának lezárása ugyanolyan fontos stratégiai
            döntés, mint annak elindítása. Legyen szó a piaci célok
            teljesüléséről, generációváltásról vagy profilváltásról, a társaság
            jogutód nélküli megszüntetése akkor tekinthető sikeresnek, ha az
            minden érintett számára megnyugtatóan, jogilag tisztán és
            kockázatmentesen zárul le.
          </p>

          <p>
            Engedje meg, hogy összefoglaljam, miként segíthetem Önt ebben a
            folyamatban a gondos ügyvitel és a szakmai precizitás jegyében.
          </p>

          <h2>Cégmegszüntetés és végelszámolás: A rendezett lezárás jogi útja</h2>

          <p>
            Egy vállalkozás megszüntetése összetett folyamat, amely során nem
            elegendő az üzleti tevékenység befejezése. A társaság jogutód
            nélküli megszűnéséhez rendezni kell a fennálló szerződéseket,
            követeléseket, kötelezettségeket és a társasági vagyont.
          </p>

          <h2>I. Az ügyvédi közreműködés és a szakértelem szerepe</h2>

          <p>
            A cégmegszüntetési eljárásban a jogi képviselet kötelező. Az
            ügyvédi közreműködés biztosítja, hogy a folyamat ne csupán
            formailag legyen szabályos, hanem tartalmilag is védje a
            tulajdonosok és a végelszámoló érdekeit.
          </p>

          <ul>
            <li>
              <strong>Gondos ügyvitel támogatása:</strong> A végelszámoló a
              társaság ügyvezetését az ilyen tisztséget betöltő személyektől
              elvárható fokozott gondossággal köteles ellátni. Szakmai
              támogatást nyújtok a végelszámoló felelősségi körébe tartozó
              döntések előkészítésében, segítve a jogszabályszerű és
              kockázatmentes eljárást.
            </li>

            <li>
              <strong>Jogi biztonság:</strong> A bírói gyakorlat (pl.
              Gf.40098/2025/6) szigorúan ítéli meg a végelszámolás alatti
              vagyonkimentést vagy a hitelezői érdekek sérelmét. Az ügyvédi
              ellenőrzés garantálja, hogy a vagyonfelosztás és a hitelezők
              kielégítése a törvényi sorrendnek megfelelően történjen.
            </li>
          </ul>

          <h2>II. Mikor indítható végelszámolás?</h2>

          <p>
            A végelszámolás (Ptk. 3:48. §) akkor alkalmazható, ha a társaság
            nem fizetésképtelen, és a tagok döntenek a jogutód nélküli
            megszűnésről.
          </p>

          <ul>
            <li>
              <strong>Fizetőképesség vizsgálata:</strong> Alapvető feltétel,
              hogy a cég vagyona fedezze a tartozásokat. Ha az eljárás során
              kiderül, hogy a vagyon nem elegendő, a végelszámolónak
              haladéktalanul kezdeményeznie kell a felszámolási eljárást.
            </li>

            <li>
              <strong>Rendezett lezárás:</strong> Segítek áttekinteni a tagi
              kölcsönök, a folyamatban lévő perek és a munkavállalói
              kötelezettségek helyzetét még a formális döntés előtt.
            </li>
          </ul>

          <h2>Miért kulcsfontosságú a szakértő irányítás a végelszámolás alatt?</h2>

          <p>
            A végelszámolás nem csupán a tevékenység befejezését jelenti,
            hanem egy szigorúan szabályozott jogi eljárást, ahol a
            végelszámoló felelőssége kiemelt. A bírói gyakorlat elvárja, hogy
            a lezárás során a vezető tisztségviselő a hitelezők és a
            tulajdonosok érdekeit egyaránt szem előtt tartva, fokozott
            gondossággal járjon el.
          </p>

          <p>
            <strong>
              Szakmai támogatásommal Ön az alábbi előnyöket élvezheti:
            </strong>
          </p>

          <ul>
            <li>
              <strong>Jogi biztonság a vagyonfelosztásnál:</strong>{' '}
              Gondoskodom róla, hogy a társasági vagyon felosztása és a
              hitelezők kielégítése a törvényi előírásoknak megfelelően
              történjen, megelőzve ezzel a későbbi kártérítési igényeket vagy
              hatósági vizsgálatokat.
            </li>

            <li>
              <strong>Személyre szabott elszámolási rend:</strong> Segítek a
              tagi kölcsönök, a függő kötelezettségek és a folyamatban lévő
              szerződések precíz rendezésében, hogy a lezárás után ne
              maradjanak „nyitott kérdések”.
            </li>

            <li>
              <strong>Zökkenőmentes hatósági ügyintézés:</strong> Átvállalom a
              cégbírósági és közzétételi feladatok teljes körű menedzselését,
              biztosítva a határidők pontos betartását.
            </li>
          </ul>

          <h2>Hogyan támogatjuk közösen a folyamatot?</h2>

          <p>
            A célom az, hogy a cégmegszüntetés ne teher, hanem egy rendezett
            folyamat legyen az Ön számára. A közös munka során:
          </p>

          <ul>
            <li>
              <strong>Átvilágítjuk a társaság jogi helyzetét:</strong> Még a
              döntés előtt ellenőrizzük, hogy a végelszámolás feltételei
              fennállnak-e.
            </li>

            <li>
              <strong>Összehangoljuk a feladatokat:</strong> Szorosan
              együttműködöm az Ön könyvelőjével, hogy a jogi és a számviteli
              zárás (zárómérleg, adóbevallások) teljes összhangban legyen.
            </li>

            <li>
              <strong>Képviselem a társaságot:</strong> Szükség esetén eljárok
              a hitelezőkkel vagy hatóságokkal szemben, védve a vállalkozás és
              a tulajdonosok érdekeit.
            </li>
          </ul>

          <p>
            A gondos ügyvitel nem csupán a törvényi megfelelésről szól, hanem
            az Ön nyugalmáról is. Bízom benne, hogy szakértelmemmel segíthetek
            abban, hogy vállalkozása történetének utolsó fejezete is
            professzionális és méltó módon záruljon le.
          </p>

          <p>
            Várom megtisztelő megkeresését, hogy egyeztethessük a lezárás
            konkrét lépéseit.
          </p>
        </>
      }

      whenToContact={{
        title: 'Miben tudok segíteni?',
        items: [
          'Átvilágítjuk a társaság jogi helyzetét: még a döntés előtt ellenőrizzük, hogy a végelszámolás feltételei fennállnak-e.',
          'Segítek a tagi kölcsönök, a függő kötelezettségek és a folyamatban lévő szerződések precíz rendezésében.',
          'Gondoskodom róla, hogy a társasági vagyon felosztása és a hitelezők kielégítése a törvényi előírásoknak megfelelően történjen.',
          'Szorosan együttműködöm az Ön könyvelőjével, hogy a jogi és a számviteli zárás teljes összhangban legyen.',
          'Átvállalom a cégbírósági és közzétételi feladatok teljes körű menedzselését.',
          'Szükség esetén eljárok a hitelezőkkel vagy hatóságokkal szemben, védve a vállalkozás és a tulajdonosok érdekeit.',
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="III. A végelszámolás folyamata"

      timelineSteps={[
        {
          number: 1,
          title: 'Előkészítés',
          description:
            'A jogi és pénzügyi helyzet felmérése a könyvelővel szoros együttműködésben.',
        },
        {
          number: 2,
          title: 'Tulajdonosi döntés',
          description:
            'A legfőbb szerv határoz a megszűnésről és kijelöli a végelszámolót.',
        },
        {
          number: 3,
          title: 'Bejelentés',
          description:
            'A végelszámolás megindításának közzététele a Cégközlönyben, a hitelezők felhívása az igények bejelentésére.',
        },
        {
          number: 4,
          title: 'Vagyonrendezés',
          description:
            'Követelések behajtása, tartozások kifizetése, szerződések lezárása.',
        },
        {
          number: 5,
          title: 'Befejezés',
          description:
            'A zárómérleg és a vagyonfelosztási javaslat elfogadása, majd a cég törlése a nyilvántartásból.',
        },
      ]}

      faqTitle="Gyakori kérdések a cégmegszüntetésről és végelszámolásról"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}