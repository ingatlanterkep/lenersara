import Link from 'next/link'

// This is a dynamic route for blog posts
// In a real project, you'd fetch the post content from a CMS or MDX files

export default function BlogPost({ params }: { params: { slug: string } }) {
  const postTitle = params.slug.split('-').join(' ')
  
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            ← Vissza a bloghoz
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4 capitalize">{postTitle}</h1>
        
        <div className="text-gray-500 mb-8">2026. január 15.</div>
        
        <div className="prose max-w-none">
          <p>
            Ez egy példa blogbejegyzés. A valódi tartalomhoz érdemes egy CMS-t 
            (például Sanity, Strapi, vagy Contentful) vagy MDX fájlokat használni.
          </p>
          <p>
            A blogbejegyzések hasznosak az SEO szempontjából, mert friss, 
            releváns tartalmat biztosítanak a weboldalon.
          </p>
          <h2>Hasznos tippek</h2>
          <ul>
            <li>Friss tartalom</li>
            <li>Releváns kulcsszavak</li>
            <li>Belső linkek más oldalakra</li>
            <li>Külső hivatkozások</li>
          </ul>
        </div>
      </div>
    </div>
  )
}