// components/Author.tsx - RÖVID, ELEGÁNS (Főoldalra)
import Image from 'next/image'
import Link from 'next/link'

export default function Author() {
  return (
    <div className="author">
      <div className="author-inner">
        {/* TARTALOM - BAL OLDALON */}
        <div className="author-content">
          <h2 className="typo-author-name">dr. Léner-Pintér Sára</h2>
          <p className="typo-author-subtitle">Veszprémi ügyvéd, mediátor – Több mint 25 év szakmai tapasztalattal</p>

          <div className="author-body">
            <p className="typo-author-description">
              Jogi problémájával nem kell egyedül megbirkóznia. Ügyvédként és mediátorként több mint 25 éve segítem ügyfeleimet abban, hogy a számukra legkedvezőbb jogi megoldást találják meg. Legyen szó családjogról, ingatlanügyről, öröklési kérdésekről, szerződésekről vagy mediációról, célom minden esetben a biztonságos és átlátható megoldás.
            </p>

            <p className="typo-author-description">
              Az ELTE Állam- és Jogtudományi Karán szerzett végzettségemre és több évtizedes szakmai tapasztalatomra építve személyre szabott jogi segítséget nyújtok. Fontosnak tartom, hogy ügyfeleim ne csak jogi képviseletet kapjanak, hanem érthető tájékoztatást és valódi támogatást is.
            </p>

            <p className="typo-author-description">
              Kiemelt területeim a családjog, az ingatlanjog, az öröklési ügyek, az okiratszerkesztés, a jogi tanácsadás és a mediáció. Hiszem, hogy minden ügy egyedi, ezért minden esetben az adott élethelyzethez igazodó megoldást keresem.
            </p>

            <p className="typo-author-closing">
              Forduljon hozzám bizalommal, és beszéljük át, hogyan segíthetek az Ön ügyében.
            </p>

            <div className="author-cta">
              <Link href="/kapcsolat" className="btn btn-accent typo-btn">
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