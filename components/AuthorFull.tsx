// components/AuthorFull.tsx - TELJES, RÉSZLETES (Dedikált oldalra)
import Image from 'next/image'
import Link from 'next/link'

export default function AuthorFull() {
  return (
    <div className="author author-full-version">
      {/* FEJLÉC */}
      <div className="author-header">
        <div className="author-image-wrapper">
          <Image
            src="/images/dr-léner-pintér-sára.png"
            alt="dr. Léner-Pintér Sára"
            width={180}
            height={180}
            className="author-image"
            priority
          />
        </div>
        <div>
          <h2 className="author-name">dr. Léner-Pintér Sára</h2>
          <p className="author-subtitle">Ügyvéd, mediátor – Veszprém</p>
        </div>
      </div>

      <div className="author-body">
        {/* BEVEZETŐ SZÖVEG */}
        <p className="author-description">
          A legtöbben akkor fordulnak ügyvédhez, amikor egy fontos élethelyzetben bizonytalanok, 
          döntést kell hozniuk, vagy szeretnék megvédeni saját és családjuk érdekeit. Ilyenkor 
          nem csupán jogi ismeretekre van szükség, hanem olyan szakemberre is, aki érthetően 
          kommunikál, átlátja a lehetőségeket, és valódi megoldást keres.
        </p>

        <p className="author-description">
          Ügyvédként és mediátorként több mint 25 éve dolgozom azon, hogy ügyfeleim számára a 
          lehető legbiztonságosabb, legátláthatóbb és leghatékonyabb jogi megoldást találjam meg. 
          Hiszem, hogy minden ügy mögött emberek, családok és élethelyzetek állnak, ezért minden 
          megbízást személyesen, odafigyeléssel és felelősséggel kezelek.
        </p>

        {/* SZAKMAI TAPASZTALAT */}
        <h3 className="author-section-title">Szakmai tapasztalatom</h3>

        <p className="author-description">
          Az ELTE Állam- és Jogtudományi Karán szereztem jogi diplomát. Pályafutásom során a 
          biztosítási jog, a közbeszerzési jog, a civil szervezetek és vállalkozások jogi ügyei, 
          a munkajog, valamint a közigazgatási és önkormányzati jog területén is széles körű 
          szakmai tapasztalatot szereztem.
        </p>

        <p className="author-description">
          Az évek során érdeklődésem egyre inkább a polgári jog, a családjog, az ingatlanjog, 
          valamint a mediáció felé fordult. Ezeken a területeken ma is nap mint nap segítem 
          ügyfeleimet jogi tanácsadással, szerződések elkészítésével, képviselettel és vitás 
          helyzetek rendezésével.
        </p>

        {/* MILYEN ÜGYEKBEN TUDOK SEGÍTENI? */}
        <h3 className="author-section-title">Milyen ügyekben tudok segíteni?</h3>

        <p className="author-description">
          Ügyvédi tevékenységem során elsősorban az alábbi területekkel foglalkozom:
        </p>

        <ul className="author-service-list">
          <li>családjogi ügyek</li>
          <li>válás és házassági vagyonjogi kérdések</li>
          <li>gyermekelhelyezés és szülői felügyelet</li>
          <li>tartásdíjjal kapcsolatos ügyek</li>
          <li>öröklési és hagyatéki ügyek</li>
          <li>ingatlan adásvételi és ajándékozási szerződések</li>
          <li>termőföld adásvétele és földforgalmi ügyek</li>
          <li>közös tulajdon megszüntetése</li>
          <li>társasházi alapító okiratok készítése és módosítása</li>
          <li>ingatlan-nyilvántartási ügyek</li>
          <li>fizetési meghagyásos eljárások</li>
          <li>követeléskezelés</li>
          <li>polgári peres képviselet</li>
          <li>jogi tanácsadás</li>
          <li>okiratszerkesztés</li>
          <li>mediáció</li>
        </ul>

        <p className="author-description">
          Minden ügy egyedi, ezért a személyes konzultáció során mindig az adott élethelyzethez 
          igazodó megoldási lehetőségeket ismertetem.
        </p>

        {/* MIÉRT FONTOS SZÁMOMRA A MEDIÁCIÓ? */}
        <h3 className="author-section-title">Miért fontos számomra a mediáció?</h3>

        <p className="author-description">
          Nem minden jogvita vezet szükségszerűen bíróságra.
        </p>

        <p className="author-description">
          Mediátorként abban segítem a feleket, hogy közösen találjanak olyan megállapodást, 
          amely hosszú távon is működőképes. A közvetítői eljárás számos esetben gyorsabb, 
          költséghatékonyabb és kevésbé megterhelő, mint egy több évig tartó peres eljárás.
        </p>

        <p className="author-description">
          <strong>Különösen eredményes lehet:</strong>
        </p>

        <ul className="author-service-list">
          <li>családi konfliktusokban,</li>
          <li>válási ügyekben,</li>
          <li>öröklési vitákban,</li>
          <li>gazdasági jogvitákban,</li>
          <li>szomszédjogi konfliktusokban,</li>
          <li>közös tulajdonnal kapcsolatos vitákban.</li>
        </ul>

        <p className="author-description">
          Amennyiben a békés megoldás már nem lehetséges, természetesen ügyfeleim érdekeit 
          határozottan képviselem a bíróság előtt is.
        </p>

        {/* MIBEN HISZEK? */}
        <h3 className="author-section-title">Miben hiszek?</h3>

        <p className="author-description">
          Hiszem, hogy a jog nem lehet öncélú.
        </p>

        <p className="author-description">
          Az ügyfélnek nem jogszabályokat kell ismernie, hanem értenie kell, milyen lehetőségei 
          vannak, milyen kockázatokkal kell számolnia, és melyik megoldás szolgálja legjobban az 
          érdekeit.
        </p>

        <p className="author-description">
          Ezért munkám során fontos számomra az őszinte kommunikáció, a közérthető tájékoztatás 
          és a korrekt együttműködés.
        </p>

        <p className="author-description">
          A célom nem csupán egy jogi ügy lezárása, hanem az, hogy ügyfeleim biztonságban 
          érezzék magukat a teljes folyamat során.
        </p>

        {/* MIÉRT FORDULNAK HOZZÁM? */}
        <h3 className="author-section-title">Miért fordulnak hozzám ügyfeleim?</h3>

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

        {/* ZÁRÓ SZÖVEG + CTA */}
        <h3 className="author-section-title">Forduljon hozzám bizalommal!</h3>

        <p className="author-description">
          Akár egy szerződés elkészítéséről, családjogi kérdésről, ingatlanügyről, öröklési 
          problémáról vagy mediációról van szó, minden ügyben arra törekszem, hogy ügyfeleim 
          számára a lehető legbiztonságosabb és legkedvezőbb megoldást találjam meg.
        </p>

        <p className="author-description">
          Keressen bizalommal, és beszéljük át, hogyan tudok segíteni az Ön ügyében.
        </p>

        <div className="author-cta">
          <Link href="/kapcsolat" className="btn btn-accent">
            Kapcsolatfelvétel →
          </Link>
        </div>
      </div>
    </div>
  )
}