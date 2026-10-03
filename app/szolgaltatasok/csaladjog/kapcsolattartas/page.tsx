import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Kapcsolattartás ügyvéd Veszprém | Gyermek láthatása',
  description:
    'Jogi segítség kapcsolattartási megállapodás előkészítésében, meglévő rend felülvizsgálatában és a kapcsolattartás akadályozásával összefüggő ügyekben Veszprémben.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/kapcsolattartas',
  },
  openGraph: {
    title: 'Kapcsolattartás ügyvéd Veszprém | Gyermek láthatása',
    description:
      'Jogi segítség a gyermekkel való kapcsolattartás rendezésében, felülvizsgálatában és a kapcsolattartás akadályozásával összefüggő ügyekben.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/kapcsolattartas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'kapcsolattartás, gyermek láthatása, láthatási jog, kapcsolattartás rendezése, kapcsolattartás módosítása, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function Kapcsolattartas() {
  return (
    <ServiceTemplate
      heroTitle="Kapcsolattartás"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Jogi segítséget nyújtok a kapcsolattartási megállapodás előkészítésében, meglévő rend felülvizsgálatában, valamint a kapcsolattartás akadályozásával összefüggő ügyekben."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        {
          label: 'Kapcsolattartás',
          href: '/szolgaltatasok/csaladjog/kapcsolattartas',
        },
      ]}

      trustItems={[]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Amikor a szülők külön élnek, a gyermekkel való kapcsolattartás
            gyakran válik bizonytalanság és vita forrásává. Jogi segítséget
            nyújtok a kapcsolattartási megállapodás előkészítésében, meglévő
            rend felülvizsgálatában, valamint a kapcsolattartás akadályozásával
            összefüggő ügyekben. Célom, hogy a szabályok egyértelműek,
            végrehajthatók és a gyermek élethelyzetéhez igazodók legyenek.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            A kapcsolattartás célja, hogy a gyermek a külön élő szülővel is
            rendszeres személyes kapcsolatot tarthasson fenn. A szabályozás
            kiterjedhet a személyes találkozások időpontjára, az ünnepek és
            iskolai szünetek beosztására, a telefonos kapcsolattartásra,
            valamint a gyermek átadásának módjára. Minél pontosabban kerülnek
            meghatározásra ezek a kérdések, annál kisebb eséllyel alakul ki
            később vita.
          </p>

          <h2>Hogyan zajlik az ügyintézés?</h2>

          <p>
            Az első konzultáción áttekintem az ügy körülményeit és a korábbi
            megállapodásokat. Ezt követően segítek az egyezség
            előkészítésében, vagy szükség esetén a bírósági eljárás
            megindításában és a jogi képviselet ellátásában.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Ha a gyermekkel való kapcsolattartás rendezésével kapcsolatban
            segítségre van szüksége, keressen bizalommal. Az időben kért jogi
            tanács segíthet megelőzni a későbbi vitákat és a gyermek érdekeit
            szolgáló megoldást kialakítani.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'A szülők nem tudnak megegyezni a kapcsolattartás rendjében',
          'A korábbi megállapodás már nem felel meg a jelenlegi élethelyzetnek',
          'Valamelyik fél nem tartja be a kapcsolattartás szabályait',
          'A kapcsolattartás rendszeresen meghiúsul',
          'A gyermek életkora vagy körülményei jelentősen megváltoztak',
          'Külföldre költözés miatt új szabályozásra van szükség',
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Hogyan zajlik az ügyintézés?"

      timelineSteps={[
        {
          number: 1,
          title: 'Első konzultáció',
          description:
            'Áttekintem az ügy körülményeit és a korábbi megállapodásokat.',
        },
        {
          number: 2,
          title: 'Egyezség előkészítése',
          description:
            'Segítek a felek közötti egyezség előkészítésében.',
        },
        {
          number: 3,
          title: 'Bírósági eljárás',
          description:
            'Szükség esetén segítek a bírósági eljárás megindításában és a jogi képviselet ellátásában.',
        },
      ]}

      faqTitle="Gyakori kérdések"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}