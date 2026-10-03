import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Építési jogviták ügyvéd Veszprém | Jogi képviselet',
  description:
    'Építési jogviták jogi támogatása Veszprémben. Szerződési viták, pótmunka, többletmunka, késedelem, átadás-átvétel, rejtett hibák és jótállási igények.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/epitesi-jog/epitesi-jogvitak',
  },
  openGraph: {
    title: 'Építési jogviták ügyvéd Veszprém',
    description:
      'Jogi támogatás építési jogvitákban a szerződések véleményezésétől a peren kívüli egyezségeken át a bírósági képviseletig.',
    url: 'https://ugyvedimegoldas.hu/epitesi-jog/epitesi-jogvitak',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'építési jogviták, építési jogvita ügyvéd, kivitelezési vita, pótmunka, többletmunka, átadás átvétel, rejtett hiba, jótállás, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function EpitesiJogvitak() {
  return (
    <ServiceTemplate
      heroTitle="Építési jogviták"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Az építkezés során felmerülő viták alapvetően négy szakaszra oszthatók: a szerződéskötést és tervezést érintő megkezdés előtti, a kivitelezési folyamat alatti közbeni, a lezárást jelentő átadás-átvételi, valamint az utólag jelentkező garanciális vitákra."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Építési jog', href: '/epitesi-jog' },
        {
          label: 'Építési jogviták',
          href: '/epitesi-jog/epitesi-jogvitak',
        },
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🏗️', text: 'Építési jogi ügyintézés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🤝', text: 'Peren kívüli és peres képviselet' },
      ]}

      content={
        <>
          <h2>Tipikus építési jogviták</h2>

          <p>
            Az építkezés során felmerülő viták alapvetően négy szakaszra
            oszthatók: a szerződéskötést és tervezést érintő megkezdés előtti,
            a kivitelezési folyamat alatti közbeni, a lezárást jelentő
            átadás-átvételi, valamint az utólag jelentkező garanciális vitákra.
          </p>

          <h2>1. Építkezés megkezdése előtti viták</h2>

          <ul>
            <li>
              <strong>Szerződési hiányosságok:</strong> A műszaki tartalom
              vagy a fizetési ütemezés pontatlan meghatározása.
            </li>
            <li>
              <strong>Tervezői felelősség:</strong> Hibás statikai számítások
              vagy a helyi építési szabályoknak nem megfelelő tervek.
            </li>
            <li>
              <strong>Engedélyezési akadályok:</strong> A szomszédok kifogásai
              vagy hatósági elutasítás az engedélyezési szakaszban.
            </li>
          </ul>

          <h2>2. Építkezés közbeni viták</h2>

          <ul>
            <li>
              <strong>Pótmunka és többletmunka:</strong> Vita arról, hogy egy
              feladat a fix díjas szerződés része-e, vagy külön fizetendő.
            </li>
            <li>
              <strong>Határidő-csúszás:</strong> A kivitelező késedelme és az
              ebből eredő kötbérigények érvényesítése.
            </li>
            <li>
              <strong>Tervtől való eltérés:</strong> Nem a jóváhagyott
              terveknek megfelelő anyagok vagy technológiák alkalmazása.
            </li>
            <li>
              <strong>Alvállalkozói lánc:</strong> A fővállalkozó és az
              alvállalkozók közötti elszámolási viták hatása a projektre.
            </li>
          </ul>

          <h2>3. Átadás-átvételi viták</h2>

          <ul>
            <li>
              <strong>Átvétel megtagadása:</strong> Vita arról, hogy a
              fennmaradó hibák akadályozzák-e a rendeltetésszerű használatot.
            </li>
            <li>
              <strong>Jegyzőkönyvezési viták:</strong> Ha a kivitelező nem
              ismeri el a megrendelő által jelzett hibákat és hiányosságokat.
            </li>
            <li>
              <strong>Visszatartási jog:</strong> A vállalkozói díj utolsó
              részletének visszatartása a hibák kijavításáig.
            </li>
          </ul>

          <h2>4. Átadás utáni (garanciális) viták</h2>

          <ul>
            <li>
              <strong>Rejtett hibák:</strong> Az átvételkor nem látható, de
              később jelentkező szerkezeti vagy gépészeti hibák.
            </li>
            <li>
              <strong>Jótállási igények:</strong> A kötelező garanciális
              javítások elvégzésének megtagadása a kivitelező részéről.
            </li>
            <li>
              <strong>Tervezői vs. kivitelezői felelősség:</strong> Vita
              arról, hogy a hiba a rossz kivitelezés vagy a hibás terv
              eredménye.
            </li>
          </ul>

          <h2>Miben segíthetek?</h2>

          <p>
            Jogi támogatást nyújtok a szerződések véleményezésétől kezdve a
            peren kívüli egyezségeken át a bírósági képviseletig, hogy az
            építkezés ne jogi tehertétel, hanem sikeres beruházás legyen.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Amennyiben a fentiekkel kapcsolatos kérdése van, keressen
            bizalommal.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'A műszaki tartalom vagy a fizetési ütemezés pontatlan meghatározása.',
          'Vita arról, hogy egy feladat a fix díjas szerződés része-e, vagy külön fizetendő.',
          'A kivitelező késedelme és az ebből eredő kötbérigények érvényesítése.',
          'Ha a kivitelező nem ismeri el a megrendelő által jelzett hibákat és hiányosságokat.',
          'A vállalkozói díj utolsó részletének visszatartása a hibák kijavításáig.',
          'Az átvételkor nem látható, de később jelentkező szerkezeti vagy gépészeti hibák.',
          'A kötelező garanciális javítások elvégzésének megtagadása a kivitelező részéről.',
        ],
        ctaText: 'Konzultáció kérése',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Az építési jogviták szakaszai"

      timelineSteps={[
        {
          number: 1,
          title: 'Építkezés megkezdése előtti viták',
          description:
            'Szerződési hiányosságok, tervezői felelősség és engedélyezési akadályok.',
        },
        {
          number: 2,
          title: 'Építkezés közbeni viták',
          description:
            'Pótmunka és többletmunka, határidő-csúszás, tervtől való eltérés és alvállalkozói lánc.',
        },
        {
          number: 3,
          title: 'Átadás-átvételi viták',
          description:
            'Átvétel megtagadása, jegyzőkönyvezési viták és visszatartási jog.',
        },
        {
          number: 4,
          title: 'Átadás utáni (garanciális) viták',
          description:
            'Rejtett hibák, jótállási igények, tervezői vs. kivitelezői felelősség.',
        },
      ]}

      faqTitle="Gyakori kérdések az építési jogvitákról"

      faqItems={[]}
    />
  )
}