import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Tartásdíj ügyvéd Veszprém',
  description:
    'Jogi segítség gyermektartás, tartásdíj megállapítása, módosítása és az elmaradt tartás érvényesítése ügyében Veszprémben.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/tartasdij',
  },
  openGraph: {
    title: 'Tartásdíj ügyvéd Veszprém',
    description:
      'Jogi segítség gyermektartás, tartásdíj megállapítása, módosítása és az elmaradt tartás érvényesítése ügyében Veszprémben.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/tartasdij',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'tartásdíj, gyermektartás, tartásdíj megállapítása, tartásdíj módosítása, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function Tartasdij() {
  return (
    <ServiceTemplate
      heroTitle="Tartásdíj"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Jogi segítséget nyújtok a tartásdíj megállapításában, módosításában, valamint az elmaradt tartás érvényesítésében."
      heroCtaText="Időpont kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        {
          label: 'Tartásdíj',
          href: '/szolgaltatasok/csaladjog/tartasdij',
        },
      ]}

      trustItems={[]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            A gyermektartás kérdése leggyakrabban válás vagy különköltözés
            után merül fel. Jogi segítséget nyújtok a tartásdíj
            megállapításában, módosításában, valamint az elmaradt tartás
            érvényesítésében. Célom, hogy a gyermek érdekei megfelelően
            érvényesüljenek, miközben Ön számára is átlátható és kiszámítható
            megoldás szülessen.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            A gyermektartás mértékét mindig az egyedi körülmények határozzák
            meg: a gyermek életkora és szükségletei, a szülők jövedelmi és
            vagyoni helyzete, valamint a gondozásban való tényleges részvétel.
            A tartásdíj nem feltétlenül végleges: ha a körülmények lényegesen
            megváltoznak, a korábbi megállapodás vagy bírósági döntés
            módosítható.
          </p>

          <h2>Hogyan zajlik az ügyintézés?</h2>

          <p>
            Az első konzultáción áttekintem az Ön helyzetét és a rendelkezésre
            álló dokumentumokat. Ezt követően segítek a felek közötti egyezség
            előkészítésében, vagy szükség esetén a bírósági eljárás
            megindításában és a teljes képviselet ellátásában.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Ha gyermektartással kapcsolatos kérdése merült fel, keressen
            bizalommal. Az időben kért jogi tanács segíthet megelőzni a későbbi
            vitákat és biztosítani a gyermek érdekeit szolgáló megoldást.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'A szülők nem tudnak megegyezni a tartásdíj összegében',
          'A korábban megállapított összeg már nem felel meg a jelenlegi körülményeknek',
          'Jelentősen megváltozott valamelyik fél jövedelmi helyzete',
          'A kötelezett hosszabb ideje nem fizeti a tartásdíjat',
          'Bírósági eljárás várható vagy már folyamatban van',
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
            'Áttekintem az Ön helyzetét és a rendelkezésre álló dokumentumokat.',
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
            'Szükség esetén segítek a bírósági eljárás megindításában és a teljes képviselet ellátásában.',
        },
      ]}

      faqTitle="Gyakori kérdések"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}