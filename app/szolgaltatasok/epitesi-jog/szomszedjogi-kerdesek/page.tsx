import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Szomszédjogi kérdések építkezéseknél | Ügyvéd Veszprém',
  description:
    'Jogi segítség építkezéssel kapcsolatos szomszédjogi kérdésekben Veszprémben. Telekhatár, szolgalmi jog, zajterhelés, kilátás és benapozás.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/epitesi-jog/szomszedjogi-kerdesek',
  },
  openGraph: {
    title: 'Szomszédjogi kérdések építkezéseknél',
    description:
      'Jogi segítség szomszédjogi viták megelőzésében és rendezésében, szolgalmi jogok alapításában, valamint peres és peren kívüli eljárásokban.',
    url: 'https://ugyvedimegoldas.hu/epitesi-jog/szomszedjogi-kerdesek',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'szomszédjog, szomszédjogi vita, építkezés szomszédjog, telekhatár vita, szolgalmi jog, benapozás, zajterhelés, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function SzomszedjogiKerdesek() {
  return (
    <ServiceTemplate
      heroTitle="Szomszédjogi kérdések építkezéseknél"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Az építkezések gyakran érintenek szomszédjogi kérdéseket. Jogi segítséget nyújtok a szomszédjogi viták megelőzésében és rendezésében, a szolgalmi jogok alapításában, valamint a peres és peren kívüli eljárásokban."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Építési jog', href: '/epitesi-jog' },
        {
          label: 'Szomszédjogi kérdések',
          href: '/epitesi-jog/szomszedjogi-kerdesek',
        },
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🏗️', text: 'Építési jogi ügyintézés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🤝', text: 'Peres és peren kívüli képviselet' },
      ]}

      content={
        <>
            <h2>Miben segíthetek?</h2>

          <p>
            Az építkezések gyakran érintenek szomszédjogi kérdéseket. Jogi
            segítséget nyújtok a szomszédjogi viták megelőzésében és
            rendezésében, a szolgalmi jogok alapításában, valamint a peres és
            peren kívüli eljárásokban.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            A Polgári Törvénykönyv szerint a tulajdonos a dolog használata
            során köteles tartózkodni minden olyan magatartástól, amellyel
            másokat, különösen a szomszédokat szükségtelenül zavarná. A
            szomszédjogi szabályok célja az ingatlanok zavartalan
            használatának biztosítása.
          </p>

          <p>
            A szolgalmi jog alapján az ingatlan mindenkori tulajdonosa más
            ingatlanát meghatározott terjedelemben használhatja (például
            átjárás, vezeték elhelyezése). A szolgalmi jog szerződéssel vagy
            bírósági határozattal jön létre, és az ingatlan-nyilvántartásba
            bejegyzendő.
          </p>

          <h2>Mire érdemes figyelni?</h2>

          <ul>
            <li>Az építési szabályok betartása (távolságok, magasság)</li>
            <li>A szomszédok előzetes tájékoztatása</li>
            <li>A viták lehetőség szerinti peren kívüli rendezése</li>
            <li>A szolgalmi jogok pontos rögzítése</li>
          </ul>

          <h2>Kapcsolat</h2>

          <p>
            Ha szomszédjogi kérdésben jogi segítségre van szüksége, keressen
            bizalommal.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'A szomszéd kifogásolja az építkezést',
          'Vita van a telekhatárról',
          'Szolgalmi jog (átjárás, vezetékjog) alapítása szükséges',
          'A szomszéd építkezése zavarja az ingatlana használatát',
          'Kilátás, benapozás vagy zajterhelés miatti vita merül fel',
        ],
        ctaText: 'Konzultáció kérése',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Hogyan segíthetek?"

      timelineSteps={[
        {
          number: 1,
          title: 'Szomszédjogi kérdés',
          description:
            'Az építkezések gyakran érintenek szomszédjogi kérdéseket.',
        },
        {
          number: 2,
          title: 'Szomszédjogi vita',
          description:
            'Jogi segítséget nyújtok a szomszédjogi viták megelőzésében és rendezésében.',
        },
        {
          number: 3,
          title: 'Szolgalmi jog',
          description:
            'Jogi segítséget nyújtok a szolgalmi jogok alapításában.',
        },
        {
          number: 4,
          title: 'Peren kívüli rendezés',
          description:
            'A viták lehetőség szerinti peren kívüli rendezése.',
        },
        {
          number: 5,
          title: 'Jogi képviselet',
          description:
            'Jogi segítséget nyújtok a peres és peren kívüli eljárásokban.',
        },
      ]}

      faqTitle="Gyakori kérdések a szomszédjogról"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}