import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Házastársi vagyonmegosztás ügyvéd Veszprém',
  description:
    'Jogi segítség házastársi vagyonmegosztásban, a közös és különvagyon elhatárolásában, megállapodás készítésében és bírósági képviseletben Veszprémben.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/vagyonmegosztas',
  },
  openGraph: {
    title: 'Házastársi vagyonmegosztás ügyvéd Veszprém',
    description:
      'Jogi segítség a közös és különvagyon elhatárolásában, vagyonmegosztási megállapodás készítésében és szükség esetén bírósági képviseletben.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/vagyonmegosztas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'házastársi vagyonmegosztás, közös vagyon, különvagyon, vagyonmegosztási megállapodás, vagyonmegosztási per, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function Vagyonmegosztas() {
  return (
    <ServiceTemplate
      heroTitle="Házastársi vagyonmegosztás"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Jogi segítséget nyújtok a vagyoni helyzet áttekintésében, a közös és különvagyon elhatárolásában, a vagyonmegosztási megállapodás elkészítésében, valamint szükség esetén a bírósági eljárásban történő képviseletben."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        {
          label: 'Vagyonmegosztás',
          href: '/szolgaltatasok/csaladjog/vagyonmegosztas',
        },
      ]}

      trustItems={[]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            A házasság megszűnése után a közös vagyon megosztása az egyik
            legösszetettebb kérdés. Jogi segítséget nyújtok a vagyoni helyzet
            áttekintésében, a közös és különvagyon elhatárolásában, a
            vagyonmegosztási megállapodás elkészítésében, valamint szükség
            esetén a bírósági eljárásban történő képviseletben. Célom, hogy a
            vagyon rendezése átlátható, méltányos és jogilag megfelelő legyen.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            A házasság megszűnése önmagában nem rendezi automatikusan a vagyoni
            viszonyokat. A közös vagyon megosztásáról külön megállapodás vagy
            bírósági döntés rendelkezhet. A vagyonmegosztás során nemcsak az
            ingatlanok és megtakarítások, hanem a hitelek, vállalkozások és
            egyéb vagyoni értékű jogok is felmerülhetnek. A teljes vagyon
            pontos feltérképezése az egyik legfontosabb lépés, mert sok vita
            abból ered, hogy valamely vagyontárgy vagy tartozás kimarad az
            egyeztetésből.
          </p>

          <h2>Hogyan zajlik az ügyintézés?</h2>

          <p>
            Az első konzultáción áttekintem a felek vagyoni helyzetét és
            elképzeléseit. Ezt követően feltérképezem a vagyonelemeket és
            tartozásokat, majd elkészítem a vagyonmegosztási megállapodás
            tervezetét. Ha a felek között van együttműködési szándék, a peren
            kívüli rendezésre törekszem, de szükség esetén vállalom a bírósági
            képviseletet is.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Ha házastársi vagyonmegosztással kapcsolatban szeretné áttekinteni
            lehetőségeit, keressen bizalommal. A korai jogi előkészítés
            hozzájárulhat ahhoz, hogy a vagyon rendezése kiszámíthatóbb legyen
            és csökkenjen a későbbi viták kialakulásának esélye.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'Válás vagy különköltözés előtt állnak és szeretnék a vagyoni kérdéseket rendezni',
          'Jelentős értékű ingatlan, megtakarítás vagy vállalkozás tartozik a közös vagyonba',
          'Közös hitel vagy jelzálog terheli a vagyont',
          'Nem egyértelmű, mely vagyontárgyak minősülnek közös vagyonnak',
          'Örökség vagy ajándék kérdése merül fel',
          'A felek szeretnének peren kívül megállapodni',
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
          title: 'A vagyon feltérképezése',
          description:
            'Feltérképezem a vagyonelemeket és tartozásokat.',
        },
        {
          number: 3,
          title: 'Megállapodás előkészítése',
          description:
            'Elkészítem a vagyonmegosztási megállapodás tervezetét.',
        },
        {
          number: 4,
          title: 'Peren kívüli rendezés vagy képviselet',
          description:
            'Együttműködési szándék esetén a peren kívüli rendezésre törekszem, szükség esetén pedig vállalom a bírósági képviseletet is.',
        },
      ]}

      faqTitle="Gyakori kérdések"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}