import Link from 'next/link'

export default function Mediáció() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/szolgaltatasok" className="text-blue-600 hover:text-blue-800">
            ← Vissza a szolgáltatásokhoz
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-6">Mediáció</h1>
        
        <div className="prose max-w-none mb-8">
          <p className="text-xl text-gray-600">
            A mediáció egy alternatív vitarendezési mód, ahol egy semleges 
            közvetítő segít a feleknek megtalálni a közös megoldást. 
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Miért érdemes a mediációt választani?</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              Gyorsabb és olcsóbb, mint a bírósági eljárás
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              A felek maguk hozzák meg a döntést
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              Bizalmas és diszkrét eljárás
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              Megőrzi a családi kapcsolatokat
            </li>
          </ul>
        </div>

        <Link
          href="/kapcsolat"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
        >
          Érdeklődjön a mediációról
        </Link>
      </div>
    </div>
  )
}