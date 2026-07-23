// app/page.tsx
import HomeTemplate from '@/components/HomeTemplate'

export default function Home() {
  const services = [
    {
      title: 'Családjog',
      description:
        'Válóper, szülői felügyelet és gyermektartással kapcsolatos ügyek.',
      href: '/szolgaltatasok/csaladjog',
      icon: '/images/csaladjog/családjog.png'
    },
    {
      title: 'Ingatlanjog',
      description:
        'Ingatlan-adásvétel, közös tulajdon rendezése és földhivatali ügyintézés.',
      href: '/szolgaltatasok/ingatlanjog',
      icon: '/images/ingatlanjog/ingatlanjog.png'
    },
    {
      title: 'Öröklési jog',
      description:
        'Végrendelet, hagyatéki eljárás és öröklési jogviták.',
      href: '/szolgaltatasok/orokles',
      icon: '/images/orokles/öröklés.png'
    },
    {
      title: 'Cégjog',
      description:
        'Cégalapítás, változásbejegyzés és társasági szerződések készítése.',
      href: '/szolgaltatasok/cegjog',
      icon: '/images/cegeljaras/cégeljárás.png'
    },
    {
      title: 'Munkajog',
      description:
        'Felmondás, munkaszerződés és munkabér-követelések.',
      href: '/szolgaltatasok/munkajog',
      icon: '/images/munkajog/munkajog.png'
    },
    {
      title: 'Építési jog',
      description:
        'Kivitelezési szerződések, építési hibák és hatósági eljárások.',
      href: '/szolgaltatasok/epitesi-jog',
      icon: '/images/epitesi-jog/epitesi-jog.png'
    },
    {
      title: 'Peres képviselet',
      description:
        'Polgári perek, szerződéses jogviták és ingatlanperek.',
      href: '/szolgaltatasok/peres-kepviselet',
      icon: '/images/peres-kepviselet/peres-kepviselet.png'
    },
    {
      title: 'Okiratszerkesztés',
      description:
        'Szerződések, megállapodások és jogi nyilatkozatok elkészítése.',
      href: '/szolgaltatasok/okiratszerkesztes',
      icon: '/images/okirat/okirat.png'
    },
    {
      title: 'Követeléskezelés',
      description:
        'Fizetési felszólítás, fizetési meghagyás és végrehajtási ügyek.',
      href: '/szolgaltatasok/koveteleservenyesites',
      icon: '/images/koveteles/koveteleskezeles.png'
    }
  ]

  const specialServices = [
    {
      title: 'Mediáció',
      subtitle: 'Megállapodás közös döntéssel',
      description:
        'A mediáció lehetőséget biztosít arra, hogy a felek egy hosszadalmas jogvita helyett közösen alakítsanak ki mindkettőjük számára elfogadható megoldást. Családi, válási és egyéb polgári jogviták békés rendezésében nyújtok segítséget.',
      href: '/szolgaltatasok/mediacio',
      ctaText: 'Mediáció részletei',
      icon: '/images/mediacio/mediáció.png'
    },
    {
      title: 'Pártfogó ügyvédi képviselet',
      subtitle: 'Jogi segítség támogatott formában',
      description:
        'A jogi segítségnyújtási rendszer keretében, a jogszabályi feltételek fennállása esetén pártfogó ügyvédi képviselet is igénybe vehető. Segítséget nyújtok az ügy áttekintésében és a szükséges jogi képviselet ellátásában.',
      href: '/szolgaltatasok/partfogo-ugyved',
      ctaText: 'Pártfogó ügyvédi segítség',
      icon: '/images/partfogo-ugyved/partfogo-ugyved.png'
    }
  ]

  const trustItems = [
    { icon: '⚖️', text: 'Több mint 25 év szakmai tapasztalat' },
    { icon: '🎓', text: 'ELTE ÁJK végzettség' },
    { icon: '📍', text: 'Veszprémi ügyvédi iroda' },
    { icon: '🤝', text: 'Mediátori végzettség' }
  ]

  const faqItems = [
    {
      question: 'Mennyi ideig tart egy válóper?',
      answer:
        'A válóper időtartama az ügy körülményeitől és a felek együttműködésétől függ. Megegyezés esetén az eljárás általában gyorsabban lezárható, vitás kérdések esetén azonban hosszabb időt is igénybe vehet.'
    },
    {
      question: 'Mennyibe kerül az első konzultáció?',
      answer:
        'Az első konzultáció díja 30 000 Ft óránként. A konzultáció során áttekintjük az ügy körülményeit, a rendelkezésre álló iratokat és a lehetséges jogi megoldásokat.'
    },
    {
      question: 'Mikor szükséges ügyvéd ingatlan-adásvételhez?',
      answer:
        'Az ingatlan-adásvételi szerződést ügyvéd által ellenjegyzett okiratba kell foglalni. Az ügyvéd ellenőrzi az ingatlan jogi helyzetét, elkészíti a szerződést, és közreműködik a földhivatali ügyintézésben.'
    },
    {
      question: 'Van lehetőség online konzultációra?',
      answer:
        'Igen. Előzetes egyeztetés alapján online konzultációra is lehetőség van, ha a személyes megjelenés nehezen megoldható.'
    },
    {
      question: 'Mikor lehet előnyös a mediáció?',
      answer:
        'A mediáció akkor lehet különösen hasznos, ha a felek szeretnék elkerülni vagy lerövidíteni a jogvitát, és nyitottak egy közösen kialakított, mindkét fél számára elfogadható megállapodásra.'
    }
  ]

  const testimonials = [
    {
      rating: 5,
      text:
        'Az Ügyvédnő gyors, precíz és a szabályok mentén ügyfélbarát megoldást javasolt az eddig felmerült kérdésekben. Akinek eddig ajánlottam, még egy személy sem csalódott benne.',
      author: 'K. Plébánia Balatonedericsi R.'
    },
    {
      rating: 5,
      text:
        'Rendkívül alapos, empatikus, az ügyfél és az ügy teljes figyelmét élvezi. Tökéletesen átlát minden helyzetet, melyeket kellő higgadtsággal, megfontoltan és szakszerűen kezel.',
      author: 'Judit'
    },
    {
      rating: 5,
      text:
        'Maximális elégedettségem mellett jó szívvel ajánlom mindenkinek, akinek jogban járatos személy segítségére van szüksége. Figyelmes, lehetőségekhez mérten gyors ügyintézés garantált.',
      author: 'Dezső'
    },
    {
      rating: 5,
      text:
        'Gondos munkájának köszönhetően már sokféle ügyes-bajos esetem megoldódott. Mindenkinek csak ajánlani tudom.',
      author: 'Teréz'
    },
    {
      rating: 5,
      text:
        'Szuper szakmai felkészültség, gyors és hatékony ügyintézés.',
      author: 'L. Balázs'
    }
  ]

  return (
    <HomeTemplate
      services={services}
      specialServices={specialServices}
      trustItems={trustItems}
      faqItems={faqItems}
      testimonials={testimonials}
    />
  )
}