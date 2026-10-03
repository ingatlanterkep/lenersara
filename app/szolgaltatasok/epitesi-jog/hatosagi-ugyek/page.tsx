import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Építéshatósági ügyek ügyvéd Veszprém | Jogi képviselet',
  description:
    'Építéshatósági ügyek jogi támogatása Veszprémben. Építési engedélyezés, használatbavételi eljárás, fennmaradási engedély, hiánypótlás és jogorvoslat.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/epitesi-jog/hatosagi-ugyek',
  },
  openGraph: {
    title: 'Építéshatósági ügyek ügyvéd Veszprém',
    description:
      'Jogi segítség építési engedélyezés, használatbavételi eljárás és egyéb építéshatósági ügyek során.',
    url: 'https://ugyvedimegoldas.hu/epitesi-jog/hatosagi-ugyek',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'építéshatósági ügyek, építési engedély, használatbavételi eljárás, fennmaradási engedély, építési hatóság, jogorvoslat, építési jog, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function HatosagiUgyek() {
  return (
    <ServiceTemplate
      heroTitle="Építéshatósági eljárások"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Az építési engedélyezés, a használatbavételi eljárás és egyéb hatósági ügyek során ügyvédként képviselhetem az ügyfelet. Segítek a kérelmek előkészítésében, a hiánypótlások teljesítésében és a jogorvoslati eljárásokban."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Építési jog', href: '/epitesi-jog' },
        {
          label: 'Építéshatósági ügyek',
          href: '/epitesi-jog/hatosagi-ugyek',
        },
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🏗️', text: 'Építési jogi ügyintézés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '📋', text: 'Hatósági eljárások jogi támogatása' },
      ]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Az építési engedélyezés, a használatbavételi eljárás és egyéb
            hatósági ügyek során ügyvédként képviselhetem az ügyfelet.
            Segítek a kérelmek előkészítésében, a hiánypótlások teljesítésében
            és a jogorvoslati eljárásokban.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            Az építésügyi hatósági eljárásokra a 2023. évi C. törvény
            (a magyar építészetről, Méptv.) és az általános közigazgatási
            rendtartásról szóló 2016. évi CL. törvény (Ákr.) rendelkezései
            irányadók. Az ügyfél helyett meghatalmazott ügyvéd is eljárhat a
            hatóság előtt. A képviselő átveheti az iratokat, beadványokat
            nyújthat be, és jogorvoslatot kezdeményezhet.
          </p>

          <h2>Mire érdemes figyelni?</h2>

          <ul>
            <li>A kérelmek és mellékletek formai követelményei</li>
            <li>A hatósági határidők betartása</li>
            <li>A jogorvoslati határidők (fellebbezés általában 15 nap)</li>
            <li>A szomszédok és egyéb érdekeltek bevonása az eljárásba</li>
          </ul>

          <h2>Kapcsolat</h2>

          <p>
            Ha építéshatósági ügyben jogi segítségre van szüksége, keressen
            bizalommal.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'Építési engedély iránti kérelmet nyújt be',
          'A hatóság hiánypótlásra szólította fel',
          'Az engedélykérelmet elutasították',
          'Használatbavételi eljárás előtt áll',
          'Fennmaradási engedélyt kell kérnie',
          'Jogorvoslattal kíván élni hatósági döntés ellen',
        ],
        ctaText: 'Konzultáció kérése',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Hogyan zajlik az ügyintézés?"

      timelineSteps={[
        {
          number: 1,
          title: 'Kérelem előkészítése',
          description:
            'Segítek a kérelmek előkészítésében.',
        },
        {
          number: 2,
          title: 'Hiánypótlás',
          description:
            'Segítek a hiánypótlások teljesítésében.',
        },
        {
          number: 3,
          title: 'Hatósági képviselet',
          description:
            'Az ügyfél helyett meghatalmazott ügyvéd is eljárhat a hatóság előtt.',
        },
        {
          number: 4,
          title: 'Beadványok',
          description:
            'A képviselő átveheti az iratokat, beadványokat nyújthat be.',
        },
        {
          number: 5,
          title: 'Jogorvoslat',
          description:
            'A képviselő jogorvoslatot kezdeményezhet.',
        },
      ]}

      faqTitle="Gyakori kérdések az építéshatósági ügyekről"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}