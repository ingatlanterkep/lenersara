import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Családjogi ügyvéd Veszprém | Ügyvédi Megoldás',
  description: 'Családjogi ügyekben nyújtok segítséget Veszprémben: válóper, gyermektartás, gyermekelhelyezés, szülői felügyelet és mediáció. 25+ év tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog'
  }
}

export default function Csaladjog() {
  return (
    <CategoryTemplate
      heroTitle="Családjogi ügyvéd Veszprém"
      heroSubtitle="Segítek családjogi ügyekben: válóper, gyermektartás, gyermekelhelyezés, szülői felügyelet és mediáció. 25+ év tapasztalattal."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Családjog', href: '/szolgaltatasok/csaladjog' }
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év tapasztalat családjogban' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '📋', text: 'Alapos és körültekintő munka' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' }
      ]}

      content={
        <>
          <h2>A családjog területei</h2>
          <p>
            A családjog a családi kapcsolatokból eredő jogviszonyokkal foglalkozik. 
            Célom, hogy segítsek eligazodni a családjogi ügyek bonyolult világában, 
            és megtaláljuk a megfelelő jogi megoldást az Ön számára.
          </p>
          <p>
            Legyen szó válásról, gyermektartásról, gyermekelhelyezésről vagy vagyonmegosztásról, 
            fontos, hogy szakértő segítséget vegyen igénybe. A családjogi ügyek érzelmileg 
            megterhelőek lehetnek, ezért különösen fontos a szakszerű és empatikus jogi képviselet.
          </p>

          <h2>Milyen családjogi ügyekben tudok segíteni?</h2>
          <ul>
            <li><strong>Válóper</strong> – a teljes eljárás lebonyolítása</li>
            <li><strong>Gyermektartás</strong> – megállapítás, módosítás, behajtás</li>
            <li><strong>Gyermekelhelyezés</strong> – a gyermek érdekének érvényesítése</li>
            <li><strong>Szülői felügyelet</strong> – jogok és kötelezettségek</li>
            <li><strong>Vagyonmegosztás</strong> – a házastársi vagyon rendezése</li>
            <li><strong>Házassági vagyonjogi szerződés</strong> – előre tervezés</li>
            <li><strong>Mediáció</strong> – békés megoldások keresése</li>
          </ul>

          <h2>A konzultáció menete</h2>
          <p>
            Az első konzultáció során áttekintjük az Ön helyzetét, és felvázolom a lehetséges 
            jogi lépéseket. Minden eset más, ezért fontos, hogy személyre szabott megoldást 
            találjunk az Ön problémájára.
          </p>
          <p>
            A konzultáció során részletesen tájékoztatom a jogi lehetőségekről, az eljárás 
            várható időtartamáról és költségeiről. Célom, hogy Ön tájékozottan hozhassa meg 
            a döntéseket.
          </p>
        </>
      }

      subServices={[
        { 
          title: 'Válóper', 
          href: '/szolgaltatasok/csaladjog/valoper',
          description: 'Segítség a válási eljárásban, vagyonmegosztásban és a kapcsolódó kérdésekben.',
          icon: '⚖️'
        },
        { 
          title: 'Gyermektartás', 
          href: '/szolgaltatasok/csaladjog/gyermektartas',
          description: 'Gyermektartás megállapítása, módosítása és behajtása.',
          icon: '📋'
        },
        { 
          title: 'Gyermekelhelyezés', 
          href: '/szolgaltatasok/csaladjog/gyermekelhelyezes',
          description: 'A gyermekelhelyezés szabályai és a legjobb megoldás megtalálása.',
          icon: '👶'
        },
        { 
          title: 'Szülői felügyelet', 
          href: '/szolgaltatasok/csaladjog/szuloi-felugyelet',
          description: 'A szülői felügyelet jogai, kötelezettségei és gyakorlásának módjai.',
          icon: '🤝'
        },
        { 
          title: 'Vagyonmegosztás', 
          href: '/szolgaltatasok/csaladjog/vagyonmegosztas',
          description: 'A házastársi vagyonközösség megszüntetése és a vagyon megosztása.',
          icon: '💰'
        },
        { 
          title: 'Házassági vagyonjogi szerződés', 
          href: '/szolgaltatasok/csaladjog/hazassagi-vagyonjogi-szerzodes',
          description: 'Házassági vagyonjogi szerződés készítése a jövőbeli viták elkerülésére.',
          icon: '📄'
        },
        { 
          title: 'Mediáció családjogi ügyekben', 
          href: '/szolgaltatasok/csaladjog/mediacio-csaladjogi-ugyekben',
          description: 'Alternatív vitarendezés családjogi konfliktusokban.',
          icon: '🤝'
        },
      ]}

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          name: 'Családjogi ügyvéd Veszprém',
          description: 'Családjogi ügyekben nyújtok segítséget Veszprémben: válóper, gyermektartás, gyermekelhelyezés, szülői felügyelet és mediáció.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/csaladjog',
          telephone: '+36 20 123 4567',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Fő utca 1.',
            addressLocality: 'Veszprém',
            postalCode: '8200',
            addressCountry: 'HU'
          },
          areaServed: 'Veszprém',
          priceRange: '$$'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'dr. Léner-Pintér Sára ügyvédi iroda',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Fő utca 1.',
            addressLocality: 'Veszprém',
            postalCode: '8200',
            addressCountry: 'HU'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '47.0933',
            longitude: '17.9108'
          },
          openingHours: 'Mo-Fr 08:00-18:00'
        }
      ]}
    />
  )
}