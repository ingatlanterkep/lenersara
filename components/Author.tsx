// components/Author.tsx - SZAKMAI TAPASZTALAT ÁTHELYEZVE A RÖVID RÉSZBE
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Author() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="author">
      <div className="author-inner">
        {/* CÍM ÉS ALCÍM - TELJES SZÉLESSÉGBEN */}
        <div className="author-header-full">
          <h2 className="typo-author-name">dr. Léner-Pintér Sára</h2>
          <p className="typo-author-subtitle">Veszprémi ügyvéd, mediátor – Több mint 25 év szakmai tapasztalattal</p>
        </div>

        {/* RÖVID RÉSZ - FLEXBOX: SZÖVEG + KÉP EGYMÁS MELLETT (KÉP JOBB OLDALON) */}
        <div className="author-short-flex">
          {/* RÖVID SZÖVEG - BAL OLDALON */}
          <div className="author-short-text">
            <p className="typo-author-description">
              Több mint 25 év tapasztalattal az Ön jogi problémájának megoldásáért. Ügyvédként és mediátorként több mint 25 éve segítem ügyfeleimet abban, hogy jogi ügyeikre a lehető legbiztonságosabb és legkedvezőbb megoldást találják meg. Veszprémi ügyvédként elsődleges célom, hogy ügyfeleim ne csupán jogi képviseletet kapjanak, hanem olyan szakmai támogatást is, amely érthető, átlátható és valóban az érdekeiket szolgálja.
            </p>

            <p className="typo-author-description">
              Hiszem, hogy minden ügy mögött egy emberi történet áll. Ezért minden megbízás során személyre szabott megoldásra törekszem, legyen szó családjogi vitáról, ingatlanügyről, öröklési kérdésekről, szerződések elkészítéséről vagy mediációról.
            </p>

            {/* SZAKMAI TAPASZTALAT - CSAK NYITOTT ÁLLAPOTBAN JELENIK MEG */}
            {isExpanded && (
              <>
          <h3 className="author-expanded-title">Szakmai tapasztalatom:</h3>

                <p className="typo-author-description">
                  Az ELTE Állam- és Jogtudományi Karán szereztem jogi diplomát. Pályafutásom során a biztosítási jog, a közbeszerzési jog, a civil szervezetek és vállalkozások jogi ügyei, a munkajog, valamint a közigazgatási és önkormányzati jog területén is széles körű szakmai tapasztalatot szereztem. Az évek során érdeklődésem egyre inkább a polgári jog, a családjog, az ingatlanjog és a mediáció felé fordult, amelyek ma is ügyvédi tevékenységem meghatározó területei.
                </p>
                <p className="typo-author-description">
                  Veszprémi ügyvédi irodámban elsősorban családjogi ügyekben, ingatlanjogi kérdésekben, öröklési ügyekben, okiratszerkesztésben, jogi tanácsadásban, mediációban, valamint polgári peres képviselet során állok ügyfeleim rendelkezésére.
                </p>
              </>
            )}

            {/* EZ A RÉSZ ELTŰNIK, HA KI VAN BŐVÍTVE */}
            {!isExpanded && (
              <>
                <p className="typo-author-description">
                  Hiszek a megegyezés erejében, és fontosnak tartom, hogy a jogi segítség ne csak szakszerű, hanem érthető és emberközeli is legyen.
                </p>
              </>
            )}

            {/* ZÁRÓ SZÖVEG - CSAK A RÖVID VÁLTOZATBAN (NYITOTT ÁLLAPOTBAN IS) */}
            {!isExpanded && (
              <>
                <p className="typo-author-closing-short">
                  Forduljon hozzám bizalommal, és beszéljük át, hogyan segíthetek az Ön ügyében.
                </p>

                {/* CTA GOMB - CSAK A RÖVID VÁLTOZATBAN */}
                <div className="author-cta-short">
                  <Link href="/kapcsolat" className="btn btn-accent typo-btn">
                    Kapcsolatfelvétel →
                  </Link>
                </div>
              </>
            )}

            {/* NYITOTT ÁLLAPOTBAN A ZÁRÓ RÉSZ A HOSSZÚBAN VAN, ITT NINCS */}

            {/* TOVÁBB OLVASOM / KEVESEBBET MUTATOK GOMB */}
            <button 
              className="author-read-more-btn"
              onClick={toggleExpand}
            >
              {isExpanded ? 'Kevesebbet mutatok ↑' : 'Tovább olvasom ↓'}
            </button>
          </div>

          {/* KÉP - JOBB OLDALON */}
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

        {/* BŐVÍTETT TARTALOM - TELJES SZÉLESSÉGBEN, A RÖVID RÉSZ ALATT */}
        <div className={`author-expanded-content ${isExpanded ? 'open' : ''}`}>
          
          {/* MIÉRT LETTEM JOGÁSZ? */}
          <h3 className="author-expanded-title">Miért lettem jogász?</h3>

          <p className="typo-author-description">
            Gyermekkorom óta fontosnak tartottam, hogy segítsek másoknak érdekeik érvényesítésében. Ezért választottam a jogi pályát, és ezért fordítottam éveket a szakmai tudás és tapasztalat megszerzésére. Hiszek abban, hogy a jog nem öncélú szabályrendszer, hanem olyan eszköz, amely biztonságot teremthet az emberek életében.
          </p>

          <p className="typo-author-description">
            Munkám során mindig arra törekszem, hogy a bonyolult jogi kérdéseket közérthetően magyarázzam el. Fontos számomra az a szemlélet, hogy a jogászhoz a jog nyelvén, az ügyfélhez pedig az ügyfél nyelvén kell szólni.
          </p>

          {/* HISZEK A MEGEGYEZÉS EREJÉBEN */}
          <h3 className="author-expanded-title">Hiszek a megegyezés erejében</h3>

          <p className="typo-author-description">
            Nem minden jogvita vezet szükségszerűen bíróságra. Mediátorként célom, hogy ahol lehetséges, a felek közösen találjanak olyan megoldást, amely hosszú távon is működőképes. A mediáció gyakran gyorsabb, költséghatékonyabb és kevésbé megterhelő, mint egy elhúzódó peres eljárás. Amennyiben azonban a per elkerülése már nem lehetséges, ügyfeleim érdekeit határozottan képviselem a bíróság előtt is.
          </p>

          {/* MIBEN TUDOK SEGÍTENI? */}
          <h3 className="author-expanded-title">Miben tudok segíteni?</h3>

          <p className="typo-author-description">
            Tevékenységem során többek között az alábbi ügyekben nyújtok segítséget:
          </p>

          <ul className="author-service-list">
            <li>családjogi ügyek és válóper</li>
            <li>gyermekelhelyezés, szülői felügyelet és gyermektartás</li>
            <li>házassági és élettársi vagyonjogi szerződések</li>
            <li>ingatlan adásvételi és ajándékozási szerződések</li>
            <li>termőfölddel kapcsolatos ügyek</li>
            <li>társasházi alapító okiratok készítése és módosítása</li>
            <li>közös tulajdon megszüntetése</li>
            <li>öröklési és hagyatéki ügyek</li>
            <li>ingatlan-nyilvántartási ügyintézés</li>
            <li>okiratszerkesztés</li>
            <li>követeléskezelés és fizetési meghagyás</li>
            <li>jogi tanácsadás és mediáció</li>
          </ul>

          {/* MÁSODIK KÉP - BAL OLDALRA ÚSZTATVA A BŐVÍTETT TARTALOMBAN */}
          <div className="author-expanded-image-float-left">
            <Image
              src="/images/dr-léner-pintér-sára-iroda.jpg"
              alt="dr. Léner-Pintér Sára az irodájában"
              width={400}
              height={300}
              className="author-expanded-image"
            />
          </div>

          {/* MIÉRT FORDULNAK HOZZÁM? */}
          <h3 className="author-expanded-title">Miért fordulnak hozzám ügyfeleim?</h3>

          <ul className="author-reason-list">
            <li>✔ Több mint 25 év szakmai tapasztalat</li>
            <li>✔ ELTE Állam- és Jogtudományi Kar</li>
            <li>✔ Ügyvéd és mediátor egy személyben</li>
            <li>✔ Személyes, közvetlen ügyfélkapcsolat</li>
            <li>✔ Érthető jogi tájékoztatás</li>
            <li>✔ Precíz okiratszerkesztés</li>
            <li>✔ Gyors és hatékony ügyintézés</li>
            <li>✔ Békés megoldások keresése, amikor lehetséges</li>
            <li>✔ Határozott jogi képviselet, amikor szükséges</li>
          </ul>

          {/* ZÁRÓ SZÖVEG - CSAK A HOSSZÚ VÁLTOZATBAN */}
          <h3 className="author-expanded-title">Forduljon hozzám bizalommal!</h3>

          <p className="typo-author-description">
            Akár egy szerződés elkészítéséről, családjogi problémáról, ingatlanügyről vagy öröklési kérdésről van szó, minden ügyben arra törekszem, hogy ügyfeleim számára biztonságos, átlátható és hosszú távon is megfelelő jogi megoldást találjak.
          </p>

          <p className="typo-author-description">
            Ha bizonytalan a lehetőségeiben, vagy szeretné átbeszélni ügyét egy tapasztalt veszprémi ügyvéddel, keressen bizalommal – személyes konzultáció során közösen megtaláljuk az Ön számára legjobb megoldást.
          </p>

          {/* CTA GOMB - CSAK A HOSSZÚ VÁLTOZATBAN */}
          <div className="author-cta-expanded">
            <Link href="/kapcsolat" className="btn btn-accent typo-btn">
              Kapcsolatfelvétel →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}