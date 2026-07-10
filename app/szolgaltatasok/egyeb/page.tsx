import Link from 'next/link'

export default function Egyeb() {
  const subServices = [
    { title: 'Cégeljárások', href: '/szolgaltatasok/egyeb/cegeljarasok' },
    { title: 'Követelésbehajtás', href: '/szolgaltatasok/egyeb/kovetelesbehajtas' },
    { title: 'Fizetési meghagyás', href: '/szolgaltatasok/egyeb/fizetesi-meghagyas' },
    { title: 'Okiratszerkesztés', href: '/szolgaltatasok/egyeb/okiratszerkesztes' },
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/szolgaltatasok" className="text-blue-600 hover:text-blue-800">
            ← Vissza a szolgáltatásokhoz
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-6">Egyéb jogi szolgáltatások</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-xl text-gray-600">
            További jogi szolgáltatások, amelyekkel segíthetek Önnek ügyei intézésében.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subServices.map((service) => (
            <div key={service.href} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                Részletes információ a {service.title.toLowerCase()} témában
              </p>
              <Link
                href={service.href}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                További információ →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}