import Link from 'next/link'

export default function Blog() {
  const posts = [
    {
      title: 'Mennyi ideig tart egy válóper?',
      date: '2026. január 15.',
      excerpt: 'A válóper időtartama számos tényezőtől függ. Ez a cikk bemutatja a leggyakoribb időtartamokat és az azokat befolyásoló tényezőket.',
      slug: 'mennyi-ideig-tart-egy-valoper'
    },
    {
      title: 'Mi történik, ha a másik szülő nem fizet gyermektartást?',
      date: '2026. január 10.',
      excerpt: 'A gyermektartás elmaradása súlyos következményekkel járhat. Ismerje meg a jogi lépéseket és a lehetőségeket.',
      slug: 'mi-tortenik-ha-nem-fizet-gyermektartast'
    },
    {
      title: 'Mire figyeljen ingatlan adásvételi szerződés előtt?',
      date: '2026. január 5.',
      excerpt: 'Az ingatlan adásvétele az egyik legfontosabb életünkben. Fontos odafigyelni a szerződés részleteire.',
      slug: 'mire-figyeljen-ingatlan-adasvetel-elott'
    },
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Jogi tudástár</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Hasznos információk és tanácsok jogi ügyekben
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-sm text-gray-500 mb-2">{post.date}</div>
              <h2 className="text-xl font-bold mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Bővebben →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}