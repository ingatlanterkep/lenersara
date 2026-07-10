export default function Dijszabas() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Díjszabás</h1>
        
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Általános információk</h2>
          <p className="text-gray-600 mb-4">
            A díjszabás az ügy bonyolultságától és időigényétől függ. 
            Az alábbiakban tájékoztató jellegű árakat talál:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Konzultáció</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Első konzultáció: 30.000 Ft/óra</li>
              <li>• Továbbá: 25.000 Ft/óra</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Okiratszerkesztés</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Egyszerű szerződések: 50.000 Ft-tól</li>
              <li>• Összetett szerződések: 100.000 Ft-tól</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Képviselet</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Bírósági képviselet: 150.000 Ft-tól</li>
              <li>• Hatósági eljárás: 100.000 Ft-tól</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Mediáció</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Mediációs ülés: 40.000 Ft/alkalom</li>
              <li>• Teljes mediációs folyamat: 200.000 Ft-tól</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <p className="text-gray-700">
            💡 <strong>Fontos:</strong> A fenti árak tájékoztató jellegűek. 
            Pontos árajánlatot az ügy megismerése után tudok adni.
          </p>
        </div>
      </div>
    </div>
  )
}