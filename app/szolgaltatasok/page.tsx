import Link from 'next/link'

export default function Szolgaltatasok() {
  const categories = [
    {
      title: 'Családjog',
      description: 'Válóper, gyermektartás, gyermekelhelyezés, szülői felügyelet, vagyonmegosztás és mediáció.',
      href: '/szolgaltatasok/csaladjog',
      items: ['Válóper', 'Gyermektartás', 'Gyermekelhelyezés', 'Szülői felügyelet', 'Vagyonmegosztás']
    },
    {
      title: 'Ingatlanjog',
      description: 'Adásvétel, ajándékozás, közös tulajdon megszüntetése, haszonélvezet és termőföld ügyletek.',
      href: '/szolgaltatasok/ingatlanjog',
      items: ['Adásvételi szerződés', 'Ajándékozási szerződés', 'Közös tulajdon megszüntetése', 'Haszonélvezet']
    },
    {
      title: 'Öröklési ügyek',
      description: 'Végrendelet készítés, hagyatéki eljárás és öröklési okiratok.',
      href: '/szolgaltatasok/orokles',
      items: ['Végrendelet', 'Hagyatéki ügyek', 'Öröklési okiratok']
    },
    {
      title: 'Mediáció',
      description: 'Alternatív vitarendezés és családi közvetítés jogvitákban.',
      href: '/szolgaltatasok/mediacio',
      items: ['Családi mediáció', 'Válási mediáció', 'Gyermekelhelyezési mediáció']
    },
    {
      title: 'Egyéb jogi szolgáltatások',
      description: 'Cégeljárások, követelésbehajtás, fizetési meghagyás és okiratszerkesztés.',
      href: '/szolgaltatasok/egyeb',
      items: ['Cégeljárások', 'Követelésbehajtás', 'Fizetési meghagyás', 'Okiratszerkesztés']
    }
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Szolgáltatások</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Átfogó jogi segítségnyújtás személyes ügyekben, magánszemélyek és vállalkozások számára
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-3">{category.title}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <ul className="mb-4 space-y-1 text-sm text-gray-600">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="text-blue-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={category.href}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Részletek →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}