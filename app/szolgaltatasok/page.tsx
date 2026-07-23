import Link from 'next/link'

export default function Szolgaltatasok() {
  const categories = [
    {
      title: 'Családjog',
      description:
        'Jogi segítség válással, gyermekeket érintő kérdésekkel és házastársi vagyoni ügyekkel kapcsolatban.',
      href: '/szolgaltatasok/csaladjog',
      items: [
        'Válóper',
        'Szülői felügyelet és kapcsolattartás',
        'Gyermektartás és vagyonmegosztás'
      ]
    },
    {
      title: 'Ingatlanjog',
      description:
        'Ingatlanügyletek előkészítése, tulajdoni viszonyok rendezése és földhivatali ügyintézés.',
      href: '/szolgaltatasok/ingatlanjog',
      items: [
        'Ingatlan-adásvétel és ajándékozás',
        'Közös tulajdon és használati megállapodás',
        'Haszonélvezet és földhivatali ügyintézés'
      ]
    },
    {
      title: 'Öröklési jog',
      description:
        'Jogi segítség öröklés, hagyatéki eljárás és végintézkedések készítése során.',
      href: '/szolgaltatasok/orokles',
      items: [
        'Végrendelet és öröklési szerződés',
        'Hagyatéki eljárás',
        'Kötelesrész és öröklési jogvita'
      ]
    },
    {
      title: 'Cégjog',
      description:
        'Jogi közreműködés vállalkozások alapításában, működésében és változásainak bejegyzésében.',
      href: '/szolgaltatasok/cegjog',
      items: [
        'Cégalapítás',
        'Változásbejegyzés',
        'Társasági szerződések és üzletrész-átruházás'
      ]
    },
    {
      title: 'Munkajog',
      description:
        'Jogi tanácsadás és képviselet munkaviszonnyal kapcsolatos vitákban és megállapodásoknál.',
      href: '/szolgaltatasok/munkajog',
      items: [
        'Felmondás és munkaviszony megszüntetése',
        'Munkabér- és egyéb munkajogi követelések',
        'Munkaszerződés és munkaügyi per'
      ]
    },
    {
      title: 'Építési jog',
      description:
        'Jogi segítség kivitelezési szerződések, építési hibák és építésügyi eljárások esetén.',
      href: '/szolgaltatasok/epitesi-jog',
      items: [
        'Építési és kivitelezési szerződések',
        'Kivitelezési hibák és elszámolási viták',
        'Építésügyi hatósági eljárások'
      ]
    },
    {
      title: 'Peres képviselet',
      description:
        'Jogi képviselet polgári jogvitákban, a per előkészítésétől a bírósági eljárás lezárásáig.',
      href: '/szolgaltatasok/peres-kepviselet',
      items: [
        'Polgári perek',
        'Ingatlan- és szerződéses jogviták',
        'Kártérítési perek és peren kívüli egyezség'
      ]
    },
    {
      title: 'Okiratszerkesztés',
      description:
        'Szerződések, megállapodások és jognyilatkozatok elkészítése, ellenőrzése és véleményezése.',
      href: '/szolgaltatasok/okiratszerkesztes',
      items: [
        'Szerződés készítése és véleményezése',
        'Kölcsönszerződés és tartozáselismerés',
        'Megállapodások, meghatalmazások és nyilatkozatok'
      ]
    },
    {
      title: 'Követelésérvényesítés',
      description:
        'Lejárt tartozások jogi érvényesítése felszólítással, fizetési meghagyással vagy peres eljárásban.',
      href: '/szolgaltatasok/koveteleservenyesites',
      items: [
        'Ügyvédi fizetési felszólítás',
        'Fizetési meghagyás',
        'Peres és végrehajtási eljárás'
      ]
    }
  ]

  const specialServices = [
    {
      title: 'Mediáció',
      description:
        'Pártatlan közvetítés családi, vagyoni és más jogviták békés, együttműködésen alapuló rendezéséhez.',
      href: '/szolgaltatasok/mediacio',
      items: [
        'Családi és válási mediáció',
        'Gyermekeket érintő megállapodások',
        'Peren kívüli vitarendezés'
      ]
    },
    {
      title: 'Pártfogó ügyvédi képviselet',
      description:
        'Jogi segítség és képviselet a jogi segítségnyújtási rendszer keretében, a jogszabályi feltételek fennállása esetén.',
      href: '/szolgaltatasok/partfogo-ugyved',
      items: [
        'Jogi tanácsadás',
        'Okiratszerkesztés',
        'Hatósági és bírósági képviselet'
      ]
    }
  ]

  return (
    <main className="bg-white">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-center text-4xl font-bold text-slate-900">
            Ügyvédi szolgáltatások
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
            Jogi segítség magánszemélyek és vállalkozások számára
            Veszprémben, személyes és előzetes egyeztetés alapján online
            konzultáció keretében is.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.title}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="mb-3 text-2xl font-bold text-slate-900">
                  {category.title}
                </h2>

                <p className="mb-5 leading-relaxed text-slate-600">
                  {category.description}
                </p>

                <ul className="mb-6 space-y-2 text-sm text-slate-700">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span
                        aria-hidden="true"
                        className="mr-2 mt-1 text-blue-600"
                      >
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={category.href}
                  className="mt-auto inline-flex items-center font-semibold text-blue-700 transition hover:text-blue-900"
                >
                  Részletek
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900">
              További jogi segítség
            </h2>

            <p className="mx-auto max-w-2xl text-slate-600">
              A hagyományos ügyvédi szolgáltatások mellett alternatív
              vitarendezésre és támogatott jogi segítségre is lehetőség nyílhat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {specialServices.map((service) => (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <h3 className="mb-3 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mb-5 leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <ul className="mb-6 space-y-2 text-sm text-slate-700">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span
                        aria-hidden="true"
                        className="mr-2 mt-1 text-blue-600"
                      >
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="mt-auto inline-flex items-center font-semibold text-blue-700 transition hover:text-blue-900"
                >
                  Részletek
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}