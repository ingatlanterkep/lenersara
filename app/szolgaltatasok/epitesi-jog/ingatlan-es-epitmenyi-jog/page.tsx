import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Ingatlan és építményi jog ügyvéd Veszprém',
  description:
    'Jogi segítség telekszerzéshez, ingatlan-nyilvántartási ügyekhez és építményi jog alapításához Veszprémben.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/epitesi-jog/ingatlan-es-epitmenyi-jog',
  },
  openGraph: {
    title: 'Ingatlan és építményi jog ügyvéd Veszprém',
    description:
      'Jogi segítség telekszerzéshez, ingatlan-nyilvántartási ügyekhez és építményi jog alapításához.',
    url: 'https://ugyvedimegoldas.hu/epitesi-jog/ingatlan-es-epitmenyi-jog',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'ingatlan jog, építményi jog, telekszerzés, építési telek, ingatlan-nyilvántartás, szolgalmi jog, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function IngatlanEsEpitmenyiJog() {
  return (
    <ServiceTemplate
      heroTitle="Ingatlan és építményi jog"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Az építkezés első lépése általában a megfelelő telek megszerzése, vagy ha más tulajdonában álló ingatlanon épül a ház, az építményi jog, használati jog alapítása. Jogi segítséget nyújtok a telekszerzés, az ingatlan-nyilvántartási ügyek és az építményi jog alapításának teljes folyamatában."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Építési jog', href: '/epitesi-jog' },
        {
          label: 'Ingatlan és építményi jog',
          href: '/epitesi-jog/ingatlan-es-epitmenyi-jog',
        },
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🏗️', text: 'Építési jogi ügyintézés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🏠', text: 'Ingatlanjogi támogatás' },
      ]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Az építkezés első lépése általában a megfelelő telek megszerzése,
            vagy ha más tulajdonában álló ingatlanon épül a ház, az építményi
            jog, használati jog alapítása. Jogi segítséget nyújtok a
            telekszerzés, az ingatlan-nyilvántartási ügyek és az építményi jog
            alapításának teljes folyamatában.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            <strong>Telekszerzés:</strong> A vásárlás előtt célszerű
            ellenőrizni a telek jogi helyzetét: van-e rajta teher, szolgalmi
            jog, elővásárlási jog, vagy építési tilalom. A tulajdoni lap és a
            helyi építési szabályzat áttekintése segít elkerülni a kellemetlen
            meglepetéseket.
          </p>

          <p>
            <strong>Építményi jog:</strong> Ha valaki más tulajdonában álló
            ingatlanon kíván építkezni, építményi jog alapítására van szükség.
            Az építményi jog jogosultja az ingatlanon épületet létesíthet,
            birtokolhatja, használhatja és szedheti annak hasznait. Az
            építményi jog határozott időre alapítható (maximum 50 év),
            írásbeli szerződést és ingatlan-nyilvántartási bejegyzést igényel.
            Átruházható, örökölhető és zálogjoggal megterhelhető.
          </p>

          <h2>Mire érdemes figyelni?</h2>

          <ul>
            <li>A tulajdoni lap naprakész állapotának ellenőrzése</li>
            <li>A helyi építési szabályzat (HÉSZ) előírásai</li>
            <li>
              Közös tulajdon esetén valamennyi tulajdonostárs hozzájárulása
              szükséges
            </li>
            <li>Fogyasztó a saját ingatlanán nem alapíthat építményi jogot</li>
          </ul>

          <h2>Kapcsolat</h2>

          <p>
            Ha telekszerzéssel vagy építményi joggal kapcsolatos kérdése van,
            keressen bizalommal.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'Építési telket vásárol',
          'Ellenőrizni szeretné a telek jogi helyzetét (terhek, szolgalmak, tilalmak)',
          'Más tulajdonában álló ingatlanon kíván építkezni',
          'Építményi jogot kíván alapítani, átruházni vagy megszüntetni',
          'Közös tulajdonban álló ingatlanon tervez építkezést',
        ],
        ctaText: 'Konzultáció kérése',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Hogyan zajlik az ügyintézés?"

      timelineSteps={[
        {
          number: 1,
          title: 'Telek jogi helyzete',
          description:
            'A vásárlás előtt célszerű ellenőrizni a telek jogi helyzetét: van-e rajta teher, szolgalmi jog, elővásárlási jog, vagy építési tilalom.',
        },
        {
          number: 2,
          title: 'Tulajdoni lap',
          description:
            'A tulajdoni lap és a helyi építési szabályzat áttekintése segít elkerülni a kellemetlen meglepetéseket.',
        },
        {
          number: 3,
          title: 'Építményi jog',
          description:
            'Ha valaki más tulajdonában álló ingatlanon kíván építkezni, építményi jog alapítására van szükség.',
        },
        {
          number: 4,
          title: 'Szerződés',
          description:
            'Az építményi jog határozott időre alapítható (maximum 50 év), írásbeli szerződést és ingatlan-nyilvántartási bejegyzést igényel.',
        },
        {
          number: 5,
          title: 'Ingatlan-nyilvántartás',
          description:
            'Jogi segítséget nyújtok a telekszerzés, az ingatlan-nyilvántartási ügyek és az építményi jog alapításának teljes folyamatában.',
        },
      ]}

      faqTitle="Gyakori kérdések az ingatlan és építményi jogról"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak"
    />
  )
}