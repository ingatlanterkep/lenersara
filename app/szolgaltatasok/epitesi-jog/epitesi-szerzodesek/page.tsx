import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Építési szerződések ügyvéd Veszprém | Jogi segítség',
  description:
    'Építési szerződések jogi támogatása Veszprémben. Tervezői és kivitelezői szerződések véleményezése, jogi segítség építkezésekhez.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/epitesi-jog/epitesi-szerzodesek',
  },
  openGraph: {
    title: 'Építési szerződések ügyvéd Veszprém',
    description:
      'Jogi segítség építkezésekhez, tervezői és kivitelezői szerződésekhez, hatósági eljárásokhoz és jogvitákhoz.',
    url: 'https://ugyvedimegoldas.hu/epitesi-jog/epitesi-szerzodesek',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'építési szerződés, kivitelezési szerződés, tervezői szerződés, építési jog, kivitelező ügyvéd, építkezés jogi segítség, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function EpitesiSzerzodesek() {
  return (
    <ServiceTemplate
      heroTitle="Építési szerződések"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="Az építkezés összetett folyamat, amely számos jogi kérdést vet fel: a telekszerzéstől kezdve az engedélyezésen át a kivitelezési szerződésekig. Jogi segítséget nyújtok az építkezés teljes folyamatában, hogy az ügyfelek jogilag megalapozott döntéseket hozhassanak, és elkerülhessék a későbbi vitákat."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Építési jog', href: '/epitesi-jog' },
        {
          label: 'Építési szerződések',
          href: '/epitesi-jog/epitesi-szerzodesek',
        },
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🏗️', text: 'Építési jogi ügyintézés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '📋', text: 'Szerződések jogi támogatása' },
      ]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Az építkezés összetett folyamat, amely számos jogi kérdést vet
            fel: a telekszerzéstől kezdve az engedélyezésen át a kivitelezési
            szerződésekig. Jogi segítséget nyújtok az építkezés teljes
            folyamatában, hogy az ügyfelek jogilag megalapozott döntéseket
            hozhassanak, és elkerülhessék a későbbi vitákat.
          </p>

          <p>
            <strong>Jogi segítséget nyújtok az alábbi területeken:</strong>
          </p>

          <ul>
            <li>Építményi jog alapító szerződés elkészítése</li>
            <li>Ingatlan-nyilvántartási bejegyzés előkészítése</li>
            <li>Képviselet építéshatósági eljárásokban</li>
            <li>Építési engedélyezési ügyek jogi támogatása</li>
            <li>Használatbavételi eljárások</li>
            <li>
              Jogorvoslati eljárások (fellebbezés, bírósági felülvizsgálat)
            </li>
            <li>Tervezői, kivitelezői szerződések véleményezése</li>
            <li>Építési jogviták rendezése</li>
          </ul>

          <h2>Mit érdemes tudni?</h2>

          <p>
            Az építkezéseket több jogszabály is szabályozza. A Polgári
            Törvénykönyv tartalmazza az építményi jogra, a vállalkozási
            szerződésre és a szavatosságra vonatkozó szabályokat. Az
            építésügyi hatósági eljárásokra a magyar építészetről szóló
            törvény és az általános közigazgatási rendtartás rendelkezései
            irányadók.
          </p>

          <h2>Mire érdemes figyelni?</h2>

          <p>
            A szerződéseket célszerű részletesen, egyértelműen megfogalmazni.
            Mind a hatósági eljárásokban, mind a szerződéses jogviszonyokban
            fontos a határidők betartása. Az építkezés során célszerű mindent
            írásban rögzíteni: a megállapodásokat, a módosításokat, a hibákat,
            a reklamációkat.
          </p>

          <h2>Gyakori hibák</h2>

          <ul>
            <li>A felek szóbeli megállapodásra hagyatkoznak</li>
            <li>A szerződés nem tartalmazza a munkák pontos körét</li>
            <li>Nincs egyértelmű fizetési ütemezés</li>
            <li>A határidők és a késedelmi szankciók nincsenek rögzítve</li>
          </ul>

          <h2>Hogyan zajlik az ügyintézés?</h2>

          <p>
            Az első konzultáción áttekintem az ügyfél helyzetét és az
            építkezés jogi vonatkozásait. Ezt követően elkészítem vagy
            véleményezem a szükséges szerződéseket, segítek a hatósági
            eljárásokban, és szükség esetén képviselem az ügyfelet a
            jogvitákban.
          </p>

          <h2>Kapcsolat</h2>

          <p>
            Ha építkezéssel kapcsolatos jogi kérdése van, keressen bizalommal.
          </p>
        </>
      }

      whenToContact={{
        title: 'Mikor érdemes ügyvédhez fordulni?',
        items: [
          'Építési telket vásárol és ellenőrizni szeretné a jogi helyzetét',
          'Építményi jog alapítása vagy megszüntetése előtt',
          'Építési engedély iránti kérelem benyújtásakor',
          'Hatósági határozat elleni jogorvoslat esetén',
          'Szomszédjogi viták, építési tilalom kérdéseiben',
          'Tervezői vagy kivitelezői szerződés megkötésekor',
          'Használatbavételi engedélyezési problémák esetén',
          'A kivitelező nem teljesít határidőre vagy hibásan teljesít',
          'Műszaki átadás-átvétel előtt áll',
        ],
        ctaText: 'Konzultáció kérése',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Hogyan zajlik az ügyintézés?"

      timelineSteps={[
        {
          number: 1,
          title: 'Első konzultáció',
          description:
            'Az első konzultáción áttekintem az ügyfél helyzetét és az építkezés jogi vonatkozásait.',
        },
        {
          number: 2,
          title: 'Szerződések',
          description:
            'Ezt követően elkészítem vagy véleményezem a szükséges szerződéseket.',
        },
        {
          number: 3,
          title: 'Hatósági eljárások',
          description:
            'Segítek a hatósági eljárásokban.',
        },
        {
          number: 4,
          title: 'Jogi képviselet',
          description:
            'Szükség esetén képviselem az ügyfelet a jogvitákban.',
        },
      ]}

      faqTitle="Gyakori kérdések az építési szerződésekről"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}