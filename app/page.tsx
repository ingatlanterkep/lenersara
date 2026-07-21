// app/page.tsx
import HomeTemplate from '@/components/HomeTemplate'

export default function Home() {
  const services = [
    {
      title: 'Családjog',
      description: 'Válóper, gyermektartás, gyermekelhelyezés, szülői felügyelet és vagyonmegosztás.',
      href: '/szolgaltatasok/csaladjog',
      icon: '/images/csaladjog/családjog.png'
    },
    {
      title: 'Ingatlanjog',
      description: 'Adásvétel, ajándékozás, közös tulajdon megszüntetése, haszonélvezet.',
      href: '/szolgaltatasok/ingatlanjog',
      icon: '/images/ingatlanjog/ingatlanjog.png'
    },
    {
      title: 'Mediáció',
      description: 'Alternatív vitarendezés és családi közvetítés jogvitákban.',
      href: '/szolgaltatasok/mediacio',
      icon: '/images/mediacio/mediáció.png'
    },
    {
      title: 'Öröklési ügyek',
      description: 'Végrendelet készítés, hagyatéki eljárás és öröklési okiratok.',
      href: '/szolgaltatasok/orokles',
      icon: '/images/orokles/öröklés.png'
    },
    {
      title: 'Cégeljárások',
      description: 'Cégalapítás, cégátírás, cégbejegyzés és cégjogi tanácsadás.',
      href: '/szolgaltatasok/cegeljarasok',
      icon: '/images/cegeljaras/cégeljárás.png'
    },
    {
      title: 'Okiratszerkesztés',
      description: 'Szerződések, nyilatkozatok és jogi okiratok elkészítése.',
      href: '/szolgaltatasok/okiratszerkesztes',
      icon: '/images/okirat/okirat.png'
    }
  ]

  const trustItems = [
    { icon: '⚖️', text: '25 év szakmai tapasztalat' },
    { icon: '🎓', text: 'ELTE ÁJK végzettség' },
    { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
    { icon: '🤝', text: 'Mediátori végzettség' }
  ]

  const faqItems = [
    {
      question: 'Mennyi ideig tart egy válóper?',
      answer: 'A válóper időtartama az ügy bonyolultságától és a felek együttműködésétől függ. Általában 3-12 hónap között mozog, de közös megegyezés esetén gyorsabb is lehet.'
    },
    {
      question: 'Mennyibe kerül az első konzultáció?',
      answer: 'Az első konzultáció díja 30.000 Ft/óra, amely tartalmazza a helyzet felmérését és a jogi lehetőségek áttekintését.'
    },
    {
      question: 'Mikor indokolt ügyvédet fogadni ingatlan adásvételhez?',
      answer: 'Ingatlan adásvételnél erősen ajánlott ügyvéd segítsége, mert a szerződésnek számos jogi feltételnek kell megfelelnie. Az ügyvéd ellenőrzi a tulajdoni lapot és felhívja a figyelmet a rejtett kockázatokra.'
    },
    {
      question: 'Biztosított-e online konzultáció?',
      answer: 'Igen, lehetőség van online konzultációra videóhívás keretében, ha távol él vagy nehezen tud személyesen megjelenni.'
    },
    {
      question: 'Meddig jár gyermektartás?',
      answer: 'Alapesetben a gyermek nagykorúságáig, 18 éves koráig. Felsőoktatási tanulmányok esetén a 25. életév betöltéséig meghosszabbítható.'
    }
  ]

const testimonials = [
  {
    rating: 5,
    text: "Az Ügyvédnő gyors, precíz és a szabályok mentén ügyfélbarát megoldást javasolt az eddig felmerült kérdésekben. Akinek eddig ajánlottam, még egy személy sem csalódott benne.",
    author: "K. Plébánia Balatonedericsi R."
  },
  {
    rating: 5,
    text: "Rendkívül alapos, empatikus, az ügyfél és az ügy teljes figyelmét élvezi. Tökéletesen átlát minden helyzetet, melyeket kellő higgadtsággal, megfontoltan és szakszerűen kezel.",
    author: "Judit"
  },
  {
    rating: 5,
    text: "Maximális elégedettségem mellett jó szívvel ajánlom mindenkinek, akinek jogban járatos személy segítségére van szüksége. Figyelmes, lehetőségekhez mérten gyors ügyintézés garantált.",
    author: "Dezső"
  },
  {
    rating: 5,
    text: "Gondos munkájának köszönhetően már sokféle ügyes bajos esetem megoldódott. Mindenkinek csak ajánlani tudom.",
    author: "Teréz"
  },
  {
    rating: 5,
    text: "Szuper szakmai felkészültség, gyors és hatékony ügyintézés.",
    author: "LBALÁZS"
  }
]

  return <HomeTemplate services={services} trustItems={trustItems} faqItems={faqItems} testimonials={testimonials} />
}