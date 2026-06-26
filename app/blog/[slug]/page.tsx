// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

// Blog cikkek listája
const blogPosts = {
  'otthon-start-program-hatasa-ingatlanpiac-2025': () => import('@/pages/ArticlePage'),
  'ingatlan-terkep-index-2025-december': () => import('@/pages/Article2Page'),
  'otthon-start-program-hatasai-magyar-ingatlanpiac-2026': () => import('@/pages/Article3Page'),
  'ingatlan-terkep-index-2026-januar': () => import('@/pages/Article4Page'),
  'kreditrendszer-tajekoztato': () => import('@/pages/Article5Page'),
  'ingatlan-terkep-index-2026-februar': () => import('@/pages/Article6Page'),
  'kozbiztonsag-reteg-ujdonsag': () => import('@/pages/Article7Page'),
  'ai-elemzes-ujdonsag': () => import('@/pages/Article8Page'),
  'ingatlan-terkep-index-2026-marcius': () => import('@/pages/Article9Page'),
  'ingatlan-terkep-index-2026-aprilis': () => import('@/pages/Article10Page'),
};

// Statikus paraméterek generálása
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

// Metadatok generálása minden cikkhez
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Metaadatok gyűjteménye (a Helmet-ekből kigyűjtve)
  const metadataMap: Record<string, any> = {
    'ingatlan-terkep-index-2026-aprilis': {
      title: 'Ingatlan-Térkép Index 2026. április: Négyzetméterárak Budapesten és vármegyénként | Ingatlan-Térkép',
      description: 'Ingatlan-Térkép Index 2026 április: budapesti kerületi és vármegyei medián négyzetméterárak, ártrendek és változások márciusi–áprilisi időszakban. Aktuális ingatlanárak, hőtérkép, ingatlanpiaci elemzés 2026.',
      keywords: 'ingatlan-térkép index 2026, négyzetméterárak 2026 április, budapesti kerületi árak, vármegyei ingatlanárak, ingatlanárak változása 2026, ingatlanpiaci trendek, budapesti ingatlanárak, vidéki ingatlanárak, hőtérkép ingatlanárak, ingatlanpiac 2026',
      openGraph: {
        title: 'Ingatlan-Térkép Index 2026. április: Kerületi és vármegyei négyzetméterárak és ártrendek',
        description: 'Havi ingatlanpiaci index 2026 április: medián négyzetméterárak Budapest kerületeiben és a magyarországi vármegyékben, valamint márciusi–áprilisi változások. Adatalapú hőtérképes elemzés.',
        images: ['https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-aprilis-budapest-keruletek-nmar-hoterkep.png'],
        type: 'article',
      },
    },
    'ingatlan-terkep-index-2026-marcius': {
      title: 'Ingatlan-Térkép Index 2026. március: Négyzetméterárak Budapesten és vármegyénként | Ingatlan-Térkép',
      description: 'Ingatlan-Térkép Index 2026 március: budapesti kerületi és vármegyei medián négyzetméterárak, ártrendek és változások februári–márciusi időszakban. Aktuális ingatlanárak, hőtérkép, ingatlanpiaci elemzés 2026.',
      keywords: 'ingatlan-térkép index 2026, négyzetméterárak 2026 március, budapesti kerületi árak, vármegyei ingatlanárak, ingatlanárak változása 2026, ingatlanpiaci trendek, budapesti ingatlanárak, vidéki ingatlanárak, hőtérkép ingatlanárak, ingatlanpiac 2026',
      openGraph: {
        title: 'Ingatlan-Térkép Index 2026. március: Kerületi és vármegyei négyzetméterárak és ártrendek',
        description: 'Havi ingatlanpiaci index 2026 március: medián négyzetméterárak Budapest kerületeiben és a magyarországi vármegyékben, valamint februári–márciusi változások. Adatalapú hőtérképes elemzés.',
        images: ['https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-marcius-budapest-keruletek-nmar-hoterkep.png'],
        type: 'article',
      },
    },
    'ai-elemzes-ujdonsag': {
      title: 'ÚJ: AI Elemzés az Ingatlan-Térképen – Kérdezd meg a mesterséges intelligenciát a hirdetésről! | Ingatlan-Térkép',
      description: 'Megjelent az AI elemzés funkció az Ingatlan-Térképen! Mostantól bármely hirdetésnél egy kattintással megkérdezheted a mesterséges intelligenciát, hogy mit gondol az adott ingatlanról – árazás, befektetési potenciál, rejtett előnyök és még sok más.',
      keywords: 'AI elemzés, mesterséges intelligencia ingatlan, ingatlan AI, AI hirdetés elemzés, ingatlan-térkép AI, proptech Magyarország, ingatlan befektetés 2026',
      openGraph: {
        title: 'ÚJ FUNKCIÓ: AI Elemzés az Ingatlan-Térképen – Kérdezd meg a MI-t!',
        description: 'Mostantól minden hirdetésnél elérhető az AI elemzés. Egy pillanat alatt megtudhatod, alul- vagy túl van-e árazva az ingatlan, kinek éri meg, megéri-e befektetni és milyen rejtett előnyökkel/hátrányokkal bír.',
        images: ['https://ingatlan-terkep.hu/ai-elemzes-pelda.webp'],
        type: 'article',
      },
    },
    'kozbiztonsag-reteg-ujdonsag': {
      title: 'ÚJ: Közbiztonság réteg az Ingatlan-Térképen – Dönts biztonságosan! | Ingatlan-Térkép',
      description: 'Ismerd meg az Ingatlan-Térkép új közbiztonság rétegét! 2024-es rendőrségi adatok alapján készült hőtérképes megjelenítés segít felmérni a környék biztonságát ingatlanvásárlás előtt.',
      keywords: 'közbiztonság réteg, ingatlan-térkép közbiztonság, bűnügyi hőtérkép, biztonságos környék ingatlan, ingatlan keresés biztonság, proptech újdonság, ingatlanpiac 2026',
      openGraph: {
        title: 'ÚJ FUNKCIÓ: Közbiztonság réteg az Ingatlan-Térképen – 2024-es adatok alapján',
        description: 'Mostantól a térképen láthatod a környék közbiztonsági helyzetét hőtérképes overlay-jel. Segít tudatosabb otthonválasztásban – próbáld ki most!',
        images: ['https://ingatlan-terkep.hu/kozbiztonsag-hoterkep-pelda.png'],
        type: 'article',
      },
    },
    'ingatlan-terkep-index-2026-februar': {
      title: 'Ingatlan-Térkép Index 2026. február: Négyzetméterárak Budapesten és vármegyénként | Ingatlan-Térkép',
      description: 'Ingatlan-Térkép Index 2026 február: budapesti kerületi és vármegyei medián négyzetméterárak, ártrendek és változások. Aktuális ingatlanárak, hőtérkép, ingatlanpiaci elemzés 2026.',
      keywords: 'ingatlan-térkép index 2026, négyzetméterárak 2026 február, budapesti kerületi árak, vármegyei ingatlanárak, ingatlanárak változása 2026, ingatlanpiaci trendek, budapesti ingatlanárak, vidéki ingatlanárak, hőtérkép ingatlanárak, ingatlanpiac 2026',
      openGraph: {
        title: 'Ingatlan-Térkép Index 2026. február: Kerületi és vármegyei négyzetméterárak és ártrendek',
        description: 'Havi ingatlanpiaci index 2026 február: medián négyzetméterárak Budapest kerületeiben és a magyarországi vármegyékben, valamint januári–februári változások. Adatalapú hőtérképes elemzés.',
        images: ['https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-februar-budapest-keruletek-nmar-hoterkep.png'],
        type: 'article',
      },
    },
    'kreditrendszer-tajekoztato': {
      title: 'Kreditrendszer az Ingatlan-Térképen | Kiemelések, arany hirdetések, árak és kedvezmények',
      description: 'Mindent a kreditrendszerről: mire jók a kreditek, mennyibe kerülnek a csomagok, hogyan működik a sima és arany kiemelés, automatikus meghosszabbítás, bevezető kedvezmények 2026 február-május.',
      keywords: 'kreditrendszer, ingatlan kiemelés, arany hirdetés, kredit vásárlás, mennyiségi kedvezmény, ingatlan-térkép kiemelés, térképen előrébb kerülés, automatikus meghosszabbítás',
      openGraph: {
        title: 'Kreditrendszer tájékoztató – Térképen kiemelt hirdetések az Ingatlan-Térképen',
        description: 'Részletes útmutató a kreditcsomagokról, árakról, arany kiemelésről, automatikus meghosszabbításról és a bevezető kedvezményekről 2026-ban.',
        images: ['https://ingatlan-terkep.hu/kiemeles.png'],
        type: 'article',
      },
    },
    'ingatlan-terkep-index-2026-januar': {
      title: 'Ingatlan-Térkép Index 2026. január: Négyzetméterárak Budapesten és vármegyénként | Ingatlan-Térkép',
      description: 'Ingatlan-Térkép Index 2026 január: budapesti kerületi és vármegyei medián négyzetméterárak, ártrendek és változások januári elejétől végéig. Aktuális ingatlanárak, hőtérkép, ingatlanpiaci elemzés 2026.',
      keywords: 'ingatlan-térkép index 2026, négyzetméterárak 2026 január, budapesti kerületi árak, vármegyei ingatlanárak, ingatlanárak változása 2026, ingatlanpiaci trendek, budapesti ingatlanárak, vidéki ingatlanárak, hőtérkép ingatlanárak, ingatlanpiac 2026',
      openGraph: {
        title: 'Ingatlan-Térkép Index 2026. január: Kerületi és vármegyei négyzetméterárak és ártrendek',
        description: 'Havi ingatlanpiaci index: medián négyzetméterárak Budapest kerületeiben és a magyarországi vármegyékben, valamint a januári eleje-vége változások. Adatalapú hőtérképes elemzés.',
        images: ['https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-januar-budapest-keruletek-nmar-hoterkep.png'],
        type: 'article',
      },
    },
    'otthon-start-program-hatasai-magyar-ingatlanpiac-2026': {
      title: 'Az Otthon Start program rövid távú hatásai a magyar ingatlanpiacra 2026 január | Ingatlan-Térkép',
      description: 'Otthon Start program 2025 szeptemberi indulása utáni hatások: Budapesten kínálatszűkülés és árnyomás, vidéken bővülő kínálat és árstabilitás. Lakások és családi házak eltérő reakciói, külterületi kiterjesztés 2026-tól.',
      keywords: 'otthon start program, otthon start hatás ingatlanpiac, fix 3% lakáshitel, első lakásvásárlók, ingatlanárak 2026, budapesti ingatlanpiac, vidéki ingatlanpiac, családi ház árak, lakásárak 2026, külterületi ingatlanok otthon start, ingatlanpiaci elemzés',
      openGraph: {
        title: 'Az Otthon Start program rövid távú hatásai a magyar ingatlanpiacra – Budapest és vidék eltérő reakciói',
        description: '2025 szeptemberétől 2026 januárig tartó időszak elemzése: hogyan alakította át a fix 3%-os lakáshitel program a hirdetési állományt Budapesten és vidéken.',
        images: ['https://ingatlan-terkep.hu/otthon-start-program-hatas-budapest-videk-lakas-haz-2026.png'],
        type: 'article',
      },
    },
    'ingatlan-terkep-index-2025-december': {
      title: 'Ingatlan-Térkép Index 2025. december: Négyzetméterárak Budapesten és vármegyénként | Ingatlan-Térkép',
      description: 'Ingatlan-Térkép Index 2025 december: budapesti kerületi és vármegyei medián négyzetméterárak, ártrendek és változások szeptembertől decemberig. Aktuális ingatlanárak, hőtérkép, ingatlanpiaci elemzés 2025.',
      keywords: 'ingatlan-térkép index 2025, négyzetméterárak 2025 december, budapesti kerületi árak, vármegyei ingatlanárak, ingatlanárak változása 2025, ingatlanpiaci trendek, budapesti ingatlanárak, vidéki ingatlanárak, hőtérkép ingatlanárak, ingatlanpiac 2025',
      openGraph: {
        title: 'Ingatlan-Térkép Index 2025. december: Kerületi és vármegyei négyzetméterárak és ártrendek',
        description: 'Havi ingatlanpiaci index: medián négyzetméterárak Budapest kerületeiben és a magyarországi vármegyékben, valamint a szeptember-decemberi változások. Adatalapú hőtérképes elemzés.',
        images: ['https://ingatlan-terkep.hu/ingatlan-terkep-index-2025-december-budapest-keruletek-nmar-hoterkep.png'],
        type: 'article',
      },
    },
    'otthon-start-program-hatasa-ingatlanpiac-2025': {
      title: 'Otthon Start program hatása az ingatlanpiacra 2025: A piac átstruktúrálódása fix 3%-os lakáshitel mellett | Ingatlan-Térkép',
      description: 'Elemzés a fix 3%-os Otthon Start lakáshitel hatására a hirdetési adatok alapján: kompozíciós hatások, medián árak és kínálat változása 2025 szeptember-december között.',
      keywords: 'otthon start program, otthon start hatás, fix 3% lakáshitel, ingatlanpiac 2025, kínálat változás, lakásárak Budapest, vidéki ingatlanárak, Ingatlan-Térkép elemzés',
      openGraph: {
        title: 'Otthon Start program hatása az ingatlanpiacra 2025: Kompozíciós hatások és árváltozások',
        description: 'Részletes elemzés az Otthon Start program első hónapjainak hatásairól Budapesten és vidéken.',
        images: ['https://ingatlan-terkep.hu/regios-kulcsmutatok-median-ar-negyzetmeterar-kompozicios-hatas-videk-budapest-otthon-start-2025.png'],
        type: 'article',
      },
    },
  };

  const metadata = metadataMap[slug];
  
  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `https://ingatlan-terkep.hu/blog/${slug}`,
    },
    openGraph: {
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      images: metadata.openGraph.images,
      type: metadata.openGraph.type,
      url: `https://ingatlan-terkep.hu/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const getPost = blogPosts[slug as keyof typeof blogPosts];
  
  if (!getPost) {
    notFound();
  }
  
  const { default: PostComponent } = await getPost();
  return <PostComponent />;
}