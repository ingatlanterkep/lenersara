import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Házassági vagyonjogi szerződés ügyvéd Veszprém',
  description:
    'Házassági vagyonjogi szerződés készítése, meglévő megállapodás felülvizsgálata, valamint a különvagyon és közös vagyon kérdéseinek rendezése Veszprémben.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
  },
  openGraph: {
    title: 'Házassági vagyonjogi szerződés ügyvéd Veszprém',
    description:
      'Jogi segítség házassági vagyonjogi szerződés elkészítésében és felülvizsgálatában Veszprémben.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'házassági vagyonjogi szerződés, házassági szerződés, vagyonjogi szerződés, különvagyon, közös vagyon, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function HazassagiVagyonjogiSzerzodes() {
  return (
    <ServiceTemplate
      heroTitle="Házassági vagyonjogi szerződés"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Jogi segítséget nyújtok a szerződés elkészítésében, meglévő megállapodás felülvizsgálatában, valamint a különvagyon és közös vagyon kérdéseinek rendezésében."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        {
          label: 'Házassági vagyonjogi szerződés',
          href: '/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
        },
      ]}

      trustItems={[]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            A házassági vagyonjogi szerződés lehetőséget ad arra, hogy a felek
            előre, átláthatóan rendezzék vagyoni viszonyaikat. Jogi segítséget
            nyújtok a szerződés elkészítésében, meglévő megállapodás
            felülvizsgálatában, valamint a különvagyon és közös vagyon
            kérdéseinek rendezésében. Célom, hogy a megállapodás egyértelműen
            tükrözze a felek akaratát és hosszú távon is biztonságos alapot
            nyújtson.
          </p>

          <p>
            A szerződés megköthető a házasságkötés előtt és a házasság
            fennállása alatt is.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            A szerződésben rendezhető, hogy mely vagyontárgyak tartoznak az
            egyes felekhez, milyen szabályok vonatkoznak a jövőben szerzett
            vagyonra, és hogyan kezelik az egyes ingatlanokat vagy
            vállalkozásokat. A tartalom mindig a felek közös akaratától és
            egyedi körülményeitől függ. Az interneten elérhető minták nem veszik
            figyelembe az egyedi élethelyzetet, ezért ritkán jelentenek
            megfelelő megoldást.
          </p>

          <h2>Hogyan zajlik az ügyintézés?</h2>

          <p>
            Az első konzultáción áttekintem a felek vagyoni helyzetét és
            elképzeléseit. Ezt követően elkészítem a szerződés tervezetét,
            amelyet közösen átnézünk és szükség esetén pontosítunk. A végleges
            szerződés ügyvédi közreműködéssel kerül aláírásra.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Ha házassági vagyonjogi szerződés megkötését tervezi, vagy meglévő
            megállapodását szeretné felülvizsgálni, keressen bizalommal. A
            megfelelő jogi előkészítés segít abban, hogy a vagyoni viszonyok
            átlátható és kiszámítható módon rendeződjenek.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes szerződést kötni?',
        items: [
          'Valamelyik fél már jelentős vagyonnal vagy ingatlannal rendelkezik',
          'Egyikük vállalkozást működtet',
          'Öröklésből származó vagyont szeretnének elkülöníteni',
          'Nagy értékű közös ingatlanvásárlást terveznek',
          'Korábbi házasságból származó gyermekek érdekeit is figyelembe kell venni',
          'Egyik fél jelentősebb hitellel rendelkezik',
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
            'Áttekintem a felek vagyoni helyzetét és elképzeléseit.',
        },
        {
          number: 2,
          title: 'Szerződéstervezet elkészítése',
          description:
            'Elkészítem a szerződés tervezetét a felek egyedi körülményei és elképzelései alapján.',
        },
        {
          number: 3,
          title: 'Közös áttekintés',
          description:
            'A szerződés tervezetét közösen átnézzük és szükség esetén pontosítjuk.',
        },
        {
          number: 4,
          title: 'Szerződés aláírása',
          description:
            'A végleges szerződés ügyvédi közreműködéssel kerül aláírásra.',
        },
      ]}

      faqTitle="Gyakori kérdések"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}