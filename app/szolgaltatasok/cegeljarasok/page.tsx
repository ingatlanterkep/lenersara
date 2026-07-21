import type { Metadata } from 'next'
import CategoryTemplate from '@/components/CategoryTemplate'

export const metadata: Metadata = {
  title: 'Cégeljárások és cégjogi ügyintézés Veszprém | dr. Léner-Pintér Sára',
  description:
    'Cégjogi segítség Veszprémben cégalapításhoz, cégmódosításhoz, végelszámoláshoz és egyéb cégbírósági eljárásokhoz. Teljes körű ügyintézés elektronikus cégeljárás keretében. Több mint 25 év szakmai tapasztalat.',
  alternates: {
    canonical: 'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok'
  },
  openGraph: {
    title: 'Cégeljárások és cégjogi ügyintézés Veszprém | dr. Léner-Pintér Sára',
    description:
      'Jogi segítség cégügyekben Veszprémben: cégalapítás, cégmódosítás, végelszámolás, cégbejegyzés és cégbírósági eljárások.',
    url: 'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok',
    siteName: 'Ügyvédi Megoldás',
    locale: 'hu_HU',
    type: 'website'
  }
}

export default function Cegeljarasok() {
  return (
    <CategoryTemplate
      heroTitle="Cégeljárások és cégjogi ügyintézés Veszprém"
      heroSubtitle="Jogi segítség cégalapításhoz, cégmódosításhoz, végelszámoláshoz és egyéb cégbírósági eljárásokhoz. Teljes körű ügyintézés elektronikus cégeljárás keretében."
      heroCtaText="Konzultáció kérése"
      heroCtaLink="/kapcsolat"

      breadcrumbItems={[
        { label: 'Főoldal', href: '/' },
        { label: 'Szolgáltatások', href: '/szolgaltatasok' },
        { label: 'Cégeljárások', href: '/szolgaltatasok/cegeljarasok' }
      ]}

      introTitle="Cégjogi segítség Veszprémben"
      introContent={
        <>
          <p>
            A gazdasági társaságok működése során számos olyan változás következhet be,
            amely jogi közreműködést és cégbírósági bejelentést igényel. Legyen szó új
            vállalkozás alapításáról, a társaság adatainak módosításáról vagy a
            vállalkozás jogszerű megszüntetéséről, fontos, hogy az eljárás megfeleljen a
            hatályos jogszabályoknak és a cégnyilvántartás követelményeinek.
          </p>

          <p>
            Több mint 25 éves szakmai tapasztalattal nyújtok segítséget cégeljárások
            teljes körű lebonyolításában. Célom, hogy ügyfeleim érthető tájékoztatást
            kapjanak a lehetőségeikről, a szükséges dokumentumokról és az eljárás
            várható menetéről. Az alábbi szolgáltatások közül kiválaszthatja az Ön
            ügyéhez kapcsolódó területet.
          </p>
        </>
      }

      subServicesTitle="Cégjogi szolgáltatások"
      subServices={[
        {
          title: 'Cégalapítás',
          href: '/szolgaltatasok/cegeljarasok/cegalapitas',
          description:
            'Segítség korlátolt felelősségű társaság (Kft.), betéti társaság (Bt.) és más gazdasági társaság alapításához, a társasági szerződés elkészítéséhez és a cégbejegyzési eljárás teljes körű lebonyolításához.',
          icon: '/images/cegeljarasok/cegalapitas.png'
        },
        {
          title: 'Cégmódosítás',
          href: '/szolgaltatasok/cegeljarasok/cegmodositas',
          description:
            'Jogi segítség ügyvezető-, tag-, székhely-, telephely-, tevékenységi kör- és egyéb cégadatok módosításához, valamint a szükséges cégbírósági változásbejegyzési eljárások lefolytatásához.',
          icon: '/images/cegeljarasok/cegmodositas.png'
        },
        {
          title: 'Cégmegszüntetés és végelszámolás',
          href: '/szolgaltatasok/cegeljarasok/vegelszamolas',
          description:
            'Segítség a gazdasági társaság jogszerű megszüntetéséhez, végelszámolási eljárás előkészítéséhez és a kapcsolódó cégbírósági ügyintézéshez.',
          icon: '/images/cegeljarasok/vegelszamolas.png'
        }
      ]}

      detailedContent={
        <>
          <h2>Miben segíthet a cégjogi tanácsadás?</h2>

          <p>
            Egy vállalkozás életében számos olyan döntés születhet, amely megfelelő jogi
            előkészítést igényel. Már egy új társaság alapítása során is fontos, hogy a
            társasági szerződés, az alapító okirat és a cég működését meghatározó
            rendelkezések megfeleljenek a hatályos jogszabályoknak és a vállalkozás
            tényleges működésének.
          </p>

          <p>
            A cég működése során bekövetkező változások – például az ügyvezető
            személyének megváltozása, a székhely áthelyezése, a tulajdonosi szerkezet
            módosulása vagy új tevékenységi kör felvétele – rendszerint cégbírósági
            bejelentési kötelezettséggel járnak. A szükséges okiratok megfelelő
            előkészítése hozzájárulhat ahhoz, hogy az eljárás gördülékenyen és
            jogszabályi megfelelés mellett valósuljon meg.
          </p>

          <p>
            A cégjogi segítség magában foglalhatja társasági szerződések és egyéb
            okiratok elkészítését, azok módosítását, a szükséges nyilatkozatok
            megszerkesztését, valamint az elektronikus cégeljárás teljes körű
            lebonyolítását.
          </p>

          <h2>Cégalapítás vagy cégmódosítás?</h2>

          <p>
            Új vállalkozás indításakor célszerű már a kezdetektől átgondolni a
            társasági forma megválasztását, a tulajdonosi viszonyokat, az ügyvezetés
            rendjét és a társaság működésének alapvető szabályait. A megfelelően
            előkészített alapító okirat vagy társasági szerződés hosszú távon is
            biztonságos alapot jelenthet a vállalkozás működéséhez.
          </p>

          <p>
            Már működő vállalkozás esetén a változások jogszerű átvezetése legalább
            ilyen fontos. A cégadatok módosításának elmulasztása vagy késedelmes
            bejelentése jogkövetkezményekkel járhat, ezért célszerű a szükséges
            változásokat időben rendezni.
          </p>

          <h2>Hogyan zajlik az első konzultáció?</h2>

          <p>
            Az első konzultáció során áttekintjük a vállalkozás jelenlegi helyzetét, a
            tervezett változásokat és az elérni kívánt célt. Ennek alapján ismertetem a
            szóba jöhető jogi megoldásokat, az eljárás várható menetét és a szükséges
            dokumentumokat.
          </p>

          <p>
            Cégalapítás esetén áttekintjük többek között a választani kívánt társasági
            formát, a tagok adatait, a székhelyet, a tervezett tevékenységi köröket és a
            működés legfontosabb kérdéseit.
          </p>

          <p>
            Cégmódosítás vagy végelszámolás esetén célszerű előkészíteni a meglévő
            társasági okiratokat, cégkivonatot és minden olyan dokumentumot, amely az
            adott eljáráshoz kapcsolódik.
          </p>

          <h2>Személyre szabott cégjogi segítség</h2>

          <p>
            Minden vállalkozás eltérő működéssel, tulajdonosi háttérrel és gazdasági
            célokkal rendelkezik, ezért a megfelelő jogi megoldás is mindig az adott
            társaság sajátosságaitól függ.
          </p>

          <p>
            Célom, hogy ügyfeleim a vállalkozásuk működéséhez igazodó, jogilag
            megalapozott és gyakorlati szempontból is átlátható megoldást kapjanak. A
            konzultáció során közösen áttekintjük a lehetőségeket, és meghatározzuk az
            ügy biztonságos lebonyolításához szükséges lépéseket.
          </p>
        </>
      }

      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          '@id': 'https://ugyvedimegoldas.hu/#law-office',
          name: 'dr. Léner-Pintér Sára ügyvédi iroda',
          description:
            'Cégjogi segítség Veszprémben cégalapításhoz, cégmódosításhoz, végelszámoláshoz és egyéb cégbírósági eljárásokhoz.',
          url: 'https://ugyvedimegoldas.hu/',
          telephone: '+36204905530',
          email: 'drlpsmobil@gmail.com',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Füredi u. 11.',
            addressLocality: 'Veszprém',
            postalCode: '8200',
            addressCountry: 'HU'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 47.0933,
            longitude: 17.9108
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          openingHours: 'Mo-Fr 09:00-18:00'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id':
            'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok#service',
          name: 'Cégjogi ügyvédi szolgáltatás',
          description:
            'Jogi tanácsadás, okiratszerkesztés és képviselet cégjogi és cégeljárási ügyekben Veszprémben.',
          url: 'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok',
          provider: {
            '@id': 'https://ugyvedimegoldas.hu/#law-office'
          },
          areaServed: {
            '@type': 'City',
            name: 'Veszprém'
          },
          serviceType: 'Cégjogi ügyvédi szolgáltatás'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Főoldal',
              item: 'https://ugyvedimegoldas.hu/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Szolgáltatások',
              item: 'https://ugyvedimegoldas.hu/szolgaltatasok'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Cégeljárások',
              item:
                'https://ugyvedimegoldas.hu/szolgaltatasok/cegeljarasok'
            }
          ]
        }
      ]}
    />
  )
}