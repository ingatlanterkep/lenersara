import type { Metadata } from 'next'
import ServiceTemplate from '@/components/ServiceTemplate'

export const metadata: Metadata = {
  title: 'Cégalapítás ügyvéd Veszprém | Jogi segítség vállalkozásoknak',
  description:
    'Cégalapítás ügyvédi segítséggel Veszprémben. Cégforma, cégnév, székhely, tevékenységi kör, tulajdoni arányok, vagyoni hozzájárulás és ügyvezetés.',
  alternates: {
    canonical:
      'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok/cegalapitas',
  },
  openGraph: {
    title: 'Cégalapítás ügyvéd Veszprém',
    description:
      'Cégalapítás jogi támogatással. Segítség a cégforma kiválasztásában, a tulajdonosi viszonyok rendezésében és a társasági szerződés elkészítésében.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok/cegalapitas',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'article',
  },
  keywords:
    'cégalapítás, cégalapítás ügyvéd, cégbejegyzés, társasági szerződés, cégjog, vállalkozás alapítás, ügyvéd Veszprém',
  robots: 'index, follow',
  authors: [{ name: 'Dr. Léner Pintér Sára' }],
}

export default function Cegalapitas() {
  return (
    <ServiceTemplate
      heroTitle="Cégalapítás"
      heroSubtitle="Ügyvédi segítség Veszprémben"
      heroDescription="A vállalkozás alapítása nem csupán adminisztratív folyamat, hanem a működési keretek jogi megalapozása. A cégforma, a tulajdoni arányok és a képviseleti szabályok meghatározása hosszú távon kihat a vállalkozás működésére és a tagok felelősségére."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/#kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
        { label: 'Cégjog', href: '/szolgaltatasok/cegeljarasok' },
        {
          label: 'Cégalapítás',
          href: '/szolgaltatasok/cegeljarasok/cegalapitas',
        },
      ]}

      trustItems={[
        { icon: '⚖️', text: '25 év szakmai tapasztalat' },
        { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
        { icon: '🏢', text: 'Cégjogi ügyintézés' },
        { icon: '🎓', text: 'ELTE ÁJK végzettség' },
        { icon: '🤝', text: 'Személyre szabott jogi támogatás' },
      ]}

      content={
        <>
          <h2>Miben segíthetek?</h2>

          <p>
            Nagy örömmel értesültem róla, hogy új vállalkozás indítását
            tervezi. Egy cég alapítása mindig izgalmas mérföldkő, ugyanakkor
            számos olyan jogi döntést igényel, amely hosszú távon meghatározza
            a működés sikerét és biztonságát.
          </p>

          <p>
            Szeretném biztosítani arról, hogy a folyamat során végig szakértő
            támogatást nyújtok Önnek. Az ügyvédi közreműködés a
            cégalapításnál nem csupán törvényi előírás, hanem a gondos
            ügyvitel záloga is: segítek a legmegfelelőbb cégforma
            kiválasztásában, a tulajdonosi viszonyok rendezésében és a vezetői
            felelősség kereteinek pontos kijelölésében.
          </p>

          <p>
            Célom, hogy a jogi háttér ne akadályt, hanem stabil alapot
            jelentsen vállalkozása számára. A dokumentumok előkészítése során
            kiemelt figyelmet fordítok az Ön egyedi üzleti céljaira, hogy a
            társasági szerződés valóban az Ön elképzeléseit tükrözze.
          </p>

          <h2>Cégalapítás: Jogi útmutató és szakértői támogatás</h2>

          <p>
            A vállalkozás alapítása nem csupán adminisztratív folyamat, hanem
            a működési keretek jogi megalapozása. A cégforma, a tulajdoni
            arányok és a képviseleti szabályok meghatározása hosszú távon
            kihat a vállalkozás működésére és a tagok felelősségére.
          </p>

          <h2>I. Az ügyvédi közreműködés jelentősége</h2>

          <p>
            A hatályos magyar jogszabályok értelmében a cégalapítás során az
            ügyvédi közreműködés nem csupán szakmai ajánlás, hanem törvényi
            előírás.
          </p>

          <ul>
            <li>
              <strong>Kötelező jogi képviselet:</strong> A
              cégnyilvánosságról, a bírósági cégeljárásról és a
              végelszámolásról szóló 2006. évi V. törvény (Ctv.) 32. § (4)
              bekezdése kimondja:
              <br />
              32. § (4) A cégbejegyzési (változásbejegyzési) eljárásban a jogi
              képviselet kötelező.
            </li>

            <li>
              <strong>Alaki követelmények:</strong> A Polgári Törvénykönyv
              (Ptk.) 3:95. § (2) bekezdése alapján a társaság létesítő
              okiratát ügyvédi ellenjegyzéssel ellátott magánokiratba kell
              foglalni. Az ügyvédi ellenjegyzés tanúsítja, hogy az okirat
              megfelel a felek akaratának és a jogszabályoknak.
            </li>
          </ul>

          <h2>II. Szakértelem a gondos ügyvitelben</h2>

          <p>
            Az ügyvédi segítség túlmutat a dokumentumok aláírásán. Szakmai
            támogatást nyújtok a gondos ügyvitel alapjainak lefektetésében,
            amely a vezető tisztségviselők egyik legfontosabb kötelezettsége.
          </p>

          <ul>
            <li>
              <strong>Vezetői felelősség:</strong> Hangsúlyozom, hogy a
              hatályos jogszabályok szerint a társaság törvényes
              képviselőjének mindenkor kellő gondossággal kell eljárnia, így
              már az alapításkor körültekintően kell eljárnia. A vezető
              tisztségviselők a társaság ügyvezetését az ilyen tisztséget
              betöltő személyektől elvárható fokozott gondossággal kötelesek
              ellátni.
            </li>

            <li>
              <strong>Kockázatkezelés:</strong> Segítek elkerülni az olyan
              gyakori hibákat, mint a hiányos eltiltási nyilatkozatok vagy a
              szabálytalan képviseleti módok, amelyek a bejegyzési kérelem
              elutasításához vagy későbbi törvényességi felügyeleti
              eljáráshoz vezethetnek.
            </li>
          </ul>

          <h2>III. Döntési pontok az alapítás előtt</h2>

          <p>
            A cégbejegyzéshez szükséges adatokon túl az alábbi tartalmi
            kérdésekben nyújtok segítséget:
          </p>

          <ol>
            <li>
              <strong>Cégnév:</strong> Ellenőrizzük a névvalódiság és
              névszabatosság követelményeit.
            </li>

            <li>
              <strong>Székhely:</strong> Tisztázzuk a használat jogcímét és a
              hivatalos küldemények átvételének rendjét.
            </li>

            <li>
              <strong>Tevékenységi kör:</strong> Meghatározzuk a
              főtevékenységet és a hatósági engedélyhez kötött köröket.
            </li>

            <li>
              <strong>Tulajdoni arányok és vagyoni hozzájárulás:</strong>{' '}
              Kialakítjuk a pénzbeli és nem pénzbeli (apport) hozzájárulások
              ütemezését.
            </li>

            <li>
              <strong>Ügyvezetés:</strong> Meghatározzuk az önálló vagy
              együttes képviseleti jogot, figyelembe véve a tulajdonosi
              kontroll igényét.
            </li>
          </ol>
        </>
      }

      whenToContact={{
        title: 'Miben tudok segíteni?',
        items: [
          'a legmegfelelőbb cégforma kiválasztásában',
          'a tulajdonosi viszonyok rendezésében',
          'a vezetői felelősség kereteinek pontos kijelölésében',
          'a cégnév követelményeinek ellenőrzésében',
          'a székhely használati jogcímének és a hivatalos küldemények átvételének tisztázásában',
          'a tevékenységi körök meghatározásában',
          'a tulajdoni arányok és vagyoni hozzájárulások kialakításában',
          'az ügyvezetés és a képviseleti jog meghatározásában',
        ],
        ctaText: 'Kérjen időpontot konzultációra',
        ctaLink: '/#kapcsolat',
      }}

      timelineTitle="Hogyan zajlik a cégalapítás?"

      timelineSteps={[
        {
          number: 1,
          title: 'Adatok egyeztetése',
          description:
            'Személyes vagy online konzultáció keretében megkezdjük a cégalapításhoz szükséges adatok egyeztetését.',
        },
        {
          number: 2,
          title: 'Döntési pontok áttekintése',
          description:
            'Áttekintjük a cégformát, a cégnevet, a székhelyet, a tevékenységi köröket, a tulajdoni arányokat és az ügyvezetést.',
        },
        {
          number: 3,
          title: 'Dokumentumok előkészítése',
          description:
            'A dokumentumok előkészítése során kiemelt figyelmet fordítok az Ön egyedi üzleti céljaira, hogy a társasági szerződés valóban az Ön elképzeléseit tükrözze.',
        },
        {
          number: 4,
          title: 'Ügyvédi ellenjegyzés',
          description:
            'A társaság létesítő okiratát ügyvédi ellenjegyzéssel ellátott magánokiratba kell foglalni.',
        },
        {
          number: 5,
          title: 'Cégbejegyzési eljárás',
          description:
            'A cégbejegyzési eljárásban a jogi képviselet kötelező.',
        },
      ]}

      faqTitle="Gyakori kérdések a cégalapításról"

      faqItems={[]}

      disclaimer="Az oldalon található információk általános tájékoztatást szolgálnak, és nem minősülnek egyedi jogi tanácsadásnak."
    />
  )
}