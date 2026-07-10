import Link from 'next/link'

export default function Oroklodes() {
  const subServices = [
    { title: 'Végrendelet', href: '/szolgaltatasok/orokles/vegrendelet' },
    { title: 'Hagyatéki ügyek', href: '/szolgaltatasok/orokles/hagyateki-ugyek' },
    { title: 'Öröklési okiratok', href: '/szolgaltatasok/orokles/oroklesi-okiratok' },
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/szolgaltatasok" className="text-blue-600 hover:text-blue-800">
            ← Vissza a szolgáltatásokhoz
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-6">Öröklési ügyek</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-xl text-gray-600">
            Az öröklési jogi kérdések előre tervezhetőek és kezelhetőek. 
            Segítek Önnek a végrendelet elkészítésében, hagyatéki ügyek intézésében 
            és az öröklési okiratok elkészítésében.
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