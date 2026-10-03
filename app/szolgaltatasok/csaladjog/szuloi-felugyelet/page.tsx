import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Szülői felügyelet és gyermek lakóhelye ügyvéd Veszprém',
  description:
    'Jogi segítség szülői felügyeleti jogok tisztázásában, a gyermek lakóhelyének meghatározásában és a szülők közötti megállapodás előkészítésében Veszprémben.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-felugyelet',
  },
  openGraph: {
    title: 'Szülői felügyelet és gyermek lakóhelye ügyvéd Veszprém',
    description:
      'Jogi segítség szülői felügyeleti jogok tisztázásában, a gyermek lakóhelyének meghatározásában és a szülők közötti megállapodás előkészítésében.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-felugyelet',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'szülői felügyelet, gyermek lakóhelye, gyermekelhelyezés, közös felügyelet, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function SzuloiFelugyelet() {
  return (
    <ServiceTemplate
      heroTitle="Szülői felügyelet és gyermek lakóhelye"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Jogi segítséget nyújtok a szülői felügyeleti jogok tisztázásában, a gyermek lakóhelyének meghatározásában, valamint a szülők közötti megállapodás előkészítésében."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        {
          label: 'Szülői felügyelet',
          href: '/szolgaltatasok/csaladjog/szuloi-felugyelet',
        },
      ]}

      trustItems={[]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Amikor a szülők különválnak, a legfontosabb kérdés a gyermek
            mindennapjainak és jövőjének biztonságos rendezése. Jogi segítséget
            nyújtok a szülői felügyeleti jogok tisztázásában, a gyermek
            lakóhelyének meghatározásában, valamint a szülők közötti
            megállapodás előkészítésében. Célom, hogy a gyermek érdekeit szem
            előtt tartva, kiszámítható és stabil kereteket alakítsunk ki.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            A szülői felügyelet nem csupán azt jelenti, hogy a gyermek kivel
            él, hanem a neveléssel, oktatással, egészségüggyel és a gyermek
            vagyonának kezelésével kapcsolatos fontos döntések meghozatalát is
            magában foglalja. A lakóhely meghatározása pedig a mindennapi élet
            megszervezésére, az iskolaválasztásra és a kapcsolattartásra is
            hatással van. A cél minden esetben a gyermek kiegyensúlyozott
            fejlődésének biztosítása.
          </p>

          <h2>Hogyan zajlik az ügyintézés?</h2>

          <p>
            Az első konzultáción áttekintem a család helyzetét és a gyermek
            érdekeit. Ezt követően segítek a szülők közötti egyezség
            előkészítésében, vagy szükség esetén a bírósági eljárás
            megindításában és a jogi képviselet ellátásában.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Ha szülői felügyelettel vagy a gyermek lakóhelyének rendezésével
            kapcsolatban segítségre van szüksége, keressen bizalommal. A
            megfelelő jogi előkészítés hozzájárulhat ahhoz, hogy a döntések
            átgondolt, a gyermek érdekeit szem előtt tartó és jogilag rendezett
            keretek között szülessenek meg.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'A szülők nem tudnak megegyezni a gyermek lakóhelyében',
          'Vita alakult ki a szülői felügyelet gyakorlásáról',
          'Az egyik szülő más településre vagy külföldre költözne',
          'A korábbi megállapodás már nem felel meg a gyermek igényeinek',
          'A gyermek életkörülményeiben jelentős változás következett be',
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
            'Áttekintem a család helyzetét és a gyermek érdekeit.',
        },
        {
          number: 2,
          title: 'Egyezség előkészítése',
          description:
            'Segítek a szülők közötti egyezség előkészítésében.',
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