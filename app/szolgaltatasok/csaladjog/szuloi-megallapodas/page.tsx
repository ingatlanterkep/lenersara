import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Szülői megállapodás ügyvéd Veszprém',
  description:
    'Jogi segítség különválás esetén szülői megállapodás készítésében, a gyermekkel kapcsolatos kérdések egységes és peren kívüli rendezésében Veszprémben.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-megallapodas',
  },
  openGraph: {
    title: 'Szülői megállapodás ügyvéd Veszprém',
    description:
      'Jogi segítség a gyermekkel kapcsolatos megállapodási pontok rendezésében és egységes szülői megállapodás elkészítésében.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog/szuloi-megallapodas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'szülői megállapodás, szülői egyezség, különválás, kapcsolattartás, szülői felügyelet, tartásdíj, családjogi ügyvéd, Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function SzuloiMegallapodas() {
  return (
    <ServiceTemplate
      heroTitle="Szülői megállapodás"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Jogi segítséget nyújtok a gyermekkel kapcsolatos megállapodási pontok azonosításában, a már kialakított feltételek jogi áttekintésében, valamint az egységes szülői megállapodás elkészítésében."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' },
        {
          label: 'Szülői megállapodás',
          href: '/szolgaltatasok/csaladjog/szuloi-megallapodas',
        },
      ]}

      trustItems={[]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Amikor a szülők különválnak, rendszerint több, egymással összefüggő
            kérdést kell rövid időn belül rendezniük. Jogi segítséget nyújtok a
            gyermekkel kapcsolatos megállapodási pontok azonosításában, a már
            kialakított feltételek jogi áttekintésében, valamint az egységes
            szülői megállapodás elkészítésében. Célom, hogy a megállapodás
            világos, jogilag megfelelő és a család tényleges élethelyzetéhez
            igazodó legyen.
          </p>

          <h2>Mit érdemes tudni?</h2>

          <p>
            A szülői megállapodás célja, hogy a gyermek életét érintő kérdések
            egymással összhangban, egységes keretben kerüljenek rendezésre.
            Nem elegendő az egyes kérdéseket elszigetelten kezelni: a szülői
            felügyelet, a lakóhely, a kapcsolattartás és a tartásdíj egymásra
            is hatással vannak. A jól előkészített megállapodás kellően
            részletes ahhoz, hogy iránymutatást adjon, ugyanakkor nem próbál
            minden jövőbeli helyzetet mereven előre szabályozni.
          </p>

          <h2>Hogyan zajlik az ügyintézés?</h2>

          <p>
            Az első konzultáción áttekintem a család helyzetét, a különválás
            óta kialakult gyakorlatot és a szülők céljait. Ezt követően
            azonosítom a rendezendő kérdéseket, elkészítem a megállapodás
            tervezetét, majd a felek egyeztetése alapján véglegesítem az
            okiratot. Szükség esetén segítek a megállapodás bírósági
            jóváhagyásának előkészítésében is.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Ha a különválással összefüggő gyermekes kérdéseket egyezséggel
            szeretné rendezni, keressen bizalommal. Az időben kért jogi
            segítség hozzájárulhat ahhoz, hogy a megállapodás a család
            mindennapjaiban is működőképes legyen.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'A szülők különköltöznek és szeretnék a gyermekkel kapcsolatos kérdéseket per nélkül rendezni',
          'A fő feltételekben már megállapodtak, de jogilag megfelelő okiratot szeretnének',
          'Nem egyértelmű, milyen kérdésekről szükséges rendelkezni',
          'Több részmegállapodást kell egységes rendszerbe foglalni',
          'Korábbi megállapodást kell felülvizsgálni a megváltozott körülmények miatt',
          'A felek álláspontja közel áll egymáshoz, de egyes részletekben még egyeztetés szükséges',
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
            'Áttekintem a család helyzetét, a különválás óta kialakult gyakorlatot és a szülők céljait.',
        },
        {
          number: 2,
          title: 'A rendezendő kérdések meghatározása',
          description:
            'Azonosítom a gyermekkel kapcsolatban rendezendő kérdéseket.',
        },
        {
          number: 3,
          title: 'Megállapodás elkészítése',
          description:
            'Elkészítem az egységes szülői megállapodás tervezetét.',
        },
        {
          number: 4,
          title: 'Egyeztetés és véglegesítés',
          description:
            'A felek egyeztetése alapján véglegesítem az okiratot.',
        },
        {
          number: 5,
          title: 'Bírósági jóváhagyás',
          description:
            'Szükség esetén segítek a megállapodás bírósági jóváhagyásának előkészítésében is.',
        },
      ]}

      faqTitle="Gyakori kérdések"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}