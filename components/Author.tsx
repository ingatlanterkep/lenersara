// components/Author.tsx - RÖVID, ELEGÁNS (Főoldalra)
import Image from 'next/image'
import Link from 'next/link'

export default function Author() {
  return (
    <div className="author">
      <div className="author-inner">
        {/* TARTALOM - BAL OLDALON */}
        <div className="author-content">
          <h2 className="author-name">dr. Léner-Pintér Sára</h2>
          <p className="author-subtitle">Ügyvéd, mediátor Veszprém – Több mint 25 év szakmai tapasztalat</p>

          <div className="author-body">
            <p className="author-description">
              Jogi problémájával nem kell egyedül megbirkóznia. Ügyvédként és mediátorként 
              több mint 25 éve segítem ügyfeleimet abban, hogy a számukra legkedvezőbb jogi 
              megoldást találják meg – legyen szó családjogi ügyekről, ingatlanjogról, 
              öröklési kérdésekről, szerződések készítéséről, követelésérvényesítésről vagy 
              mediációról.
            </p>

            <p className="author-description">
              Az ELTE Állam- és Jogtudományi Karán szerzett jogi végzettségemre és több 
              évtizedes szakmai tapasztalatomra építve minden ügyben személyre szabott, 
              átlátható és érthető jogi segítséget nyújtok. Hiszem, hogy egy jó ügyvéd 
              nem csupán ismeri a jogszabályokat, hanem érthetően elmagyarázza a 
              lehetőségeket, segít a megalapozott döntések meghozatalában, és következetesen 
              képviseli ügyfele érdekeit.
            </p>

            <p className="author-description">
              Munkám során kiemelt területeim a családjog, az ingatlanjog, az öröklési 
              ügyek, a jogi tanácsadás, az okiratszerkesztés, valamint a mediáció, amely 
              számos esetben gyorsabb és költséghatékonyabb alternatívát jelenthet a 
              bírósági eljárással szemben.
            </p>

            <p className="author-description">
              Legyen szó egy szerződés elkészítéséről, ingatlan adásvételéről, válásról, 
              hagyatéki ügyről vagy jogvita rendezéséről, célom minden esetben az, hogy 
              ügyfeleim számára biztonságos, korrekt és hosszú távon is megfelelő 
              megoldást találjak.
            </p>

            <p className="author-description author-closing">
              Forduljon hozzám bizalommal, és beszéljük át, hogyan segíthetek az Ön 
              ügyében.
            </p>

            <div className="author-cta">
              <Link href="/kapcsolat" className="btn btn-accent">
                Kapcsolatfelvétel →
              </Link>
            </div>
          </div>
        </div>

        {/* KÉP - JOBB OLDALON (NAGYOBB) */}
        <div className="author-image-wrapper">
          <Image
            src="/images/dr-léner-pintér-sára-fehér.png"
            alt="dr. Léner-Pintér Sára"
            width={280}
            height={350}
            className="author-image"
            priority
          />
        </div>
      </div>
    </div>
  )
}