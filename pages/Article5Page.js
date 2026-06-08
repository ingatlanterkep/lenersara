// app/blog/[slug]/articles/Article8Page.tsx
'use client';

import React from 'react';
import '../styles/ArticlePage.css';
import '../styles/BlogListPage.css';
import RelatedArticles from '@/components/RelatedArticles';
import FacebookBadge from '@/components/FacebookBadge';


const Article5Page = () => {
  const CREDIT_PACKAGES = [
    { credits: 20,  pricePerCredit: 250, total:  5000 },
    { credits: 50,  pricePerCredit: 230, total: 11500 },
    { credits: 100, pricePerCredit: 210, total: 21000 },
    { credits: 250, pricePerCredit: 190, total: 47500 },
    { credits: 500, pricePerCredit: 170, total: 85000 },
  ];

  return (
    <>


      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Kreditrendszer az Ingatlan-Térképen – Kiemelések és arany hirdetések 2026",
          "description": "Mire jók a kreditek, hogyan növelheted hirdetéseid láthatóságát a térképen, árak, csomagok, automatikus meghosszabbítás és bevezető kedvezmények.",
          "author": { "@type": "Person", "name": "Morán Raul" },
          "publisher": {
            "@type": "Organization",
            "name": "Ingatlan-Térkép",
            "logo": { "@type": "ImageObject", "url": "https://www.ingatlan-terkep.hu/logo.png" }
          },
          "datePublished": "2026-02-23",
          "dateModified": "2026-02-24",
          "image": "https://ingatlan-terkep.hu/kiemeles.png",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.ingatlan-terkep.hu/blog/kreditrendszer-tajekoztato"
          }
        })}
      </script>

      <div className="article-container">
        <div className="article-wrapper">
          <header className="article-header">
            <h1 className="article-title">
              Kreditrendszer az Ingatlan-Térképen
            </h1>
            <p className="article-subtitle">
              Térképen előrébb kerülés, arany kiemelések, automatikus meghosszabbítás és bevezető kedvezmények – minden, amit tudnod kell
            </p>
                      <FacebookBadge/>
          </header>

          <section className="article-section">
            <h2>Mire jók a kreditek?</h2>
            <p>
              A kreditek segítségével hirdetéseidet <strong>kiemelheted a térképen</strong>, így azok korábban és szélesebb zoom-tartományban jelennek meg a látogatók számára. 
              Alapvetően egyszerre kb. 100 hirdetés látható a térképen – a nem kiemeltek csak nagy zoomolás után bukkannak fel, míg a kiemeltek már messzebbről is láthatóak és előrébb sorolódnak.
            </p>
            <p>
              Kétféle kiemelési szint létezik:
            </p>
            <ul>
              <li><strong>Sima kiemelés</strong>: 1 kredit egy hétre</li>
              <li><strong>Arany kiemelés</strong>: 3 kredit egy hétre, a sima kiemelések fölött jelenik meg, arany színű jelöléssel, sokkal feltűnőbben</li>
            </ul>

<figure className="article-figure">
  <img 
    src="/kiemeles.png" 
    alt="Példa az Ingatlan-Térkép nézetére: arany (sárga/arany) kiemelt hirdetések és sima kiemelések a térképen – az aranyak feltűnőbben, előrébb jelennek meg" 
    loading="lazy"
    width="600"
    height="auto"
    style={{
      border: '4px solid #a5d8ff',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(165, 216, 255, 0.4)', // opcionális kis árnyék a mélységért
      backgroundColor: '#ffffff', // fehér háttér, ha a képnek átlátszó részei vannak
      padding: '4px', // belső tér a keret és kép között
    }}
  />
  <figcaption>Az arany kiemelések (feltűnő sárga/arany jelölés) kiemelkednek a sima kiemeltek közül</figcaption>
</figure>

            <p>
              Fontos részlet: az arany és sima kiemelések sorrendje <strong>minden reggel randomizálódik</strong> az adott napra – így mindenki kap esélyt a jobb pozícióra, teljesen igazságosan.
            </p>
            <p>
              Egy időben max <strong>5 arany kiemelés</strong> látható egyszerre az aktuálisan látható térképrészleten – ez biztosítja az arany hirdetések különlegességét a látogatók számára.
            </p>
          </section>

          <section className="article-section">
            <h2>Árak és mennyiségi kedvezmények</h2>
            <p>
              Minél nagyobb csomagban vásárolsz, annál kedvezőbb az egységár. Íme a jelenlegi csomagok:
            </p>

            <table className="article-table">
              <thead>
                <tr>
                  <th>Kredit mennyisége</th>
                  <th>Egységár (Ft/kredit)</th>
                  <th>Teljes ár (Ft)</th>
                </tr>
              </thead>
              <tbody>
                {CREDIT_PACKAGES.map(pkg => (
                  <tr key={pkg.credits}>
                    <td>{pkg.credits} kredit</td>
                    <td>{pkg.pricePerCredit.toLocaleString('hu-HU')} Ft</td>
                    <td><strong>{pkg.total.toLocaleString('hu-HU')} Ft</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Bevezető kedvezmények – érdemes most kezdeni</h3>
            <ul>
              <li><strong>Febr/Márc</strong>: <strong>50% kedvezmény</strong> minden csomag árából</li>
              <li><strong>Április</strong>: <strong>30% kedvezmény</strong></li>
              <li><strong>Május</strong>: <strong>10% kedvezmény</strong></li>
            </ul>
            <p>
              Példa: a 100 kredit csomag normál ára 21 000 Ft – márciusban már csak 10 500 Ft-ért szerezheted meg. Érdemes kihasználni az első hónapokat!
            </p>
          </section>

          <section className="article-section">
            <h2>Hogyan használd fel a krediteket?</h2>
            <p>
              A krediteket a <strong>Profil → Hirdetéseim</strong> menüpont alatt tudod hozzárendelni egy-egy hirdetéshez. Itt aktiválhatod a sima vagy arany kiemelést.
            </p>
            <ul>
              <li>1 sima kiemelés = 1 kredit → +1 hét láthatóság</li>
              <li>1 arany kiemelés = 3 kredit → +1 hét, de felülírja a sima kiemelést, ha az már aktiválva lett (nem adódik hozzá)</li>
              <li>Több kiemelés ugyanarra a hirdetésre → minden újabb kredit / aranyozás +1 héttel tolja ki a lejáratot</li>
            </ul>

            <h3>Automatikus meghosszabbítás – soha ne vesszen el a kiemelés</h3>
            <p>
              Ha nem akarod, hogy a hirdetésed kiemelése lejárjon, bekapcsolhatod az <strong>automatikus meghosszabbítást</strong>. 
              Ez a funkció a <strong>Hirdetéseim</strong> oldalon, a már <strong>kiemelt</strong> hirdetéseknél jelenik meg (egy gomb formájában).
            </p>
            <p>
              Ha be van kapcsolva:
            </p>
            <ul>
              <li>Amikor a kiemelés lejár (az 1 hét elteltével), a rendszer <strong>automatikusan levonja a szükséges krediteket</strong> (1 sima, 3 arany esetén)</li>
              <li>A hirdetés +1 héttel meghosszabbodik, és a kiemelés típusa megmarad</li>
              <li>Ez addig megy, amíg az ingatlan el nem kerül (pl. értékesítve), vagy amíg ki nem kapcsolod a gombot</li>
              <li>Nem kell aggódnod, hogy elfelejted meghosszabbítani – a rendszer figyeli, és csak akkor von le kreditet, ha valóban lejár a jelenlegi időszak</li>
            </ul>
            <p>
              <strong>Fontos:</strong> csak akkor működik, ha van elegendő kredit az egyenlegeden. Ha elfogyna, a meghosszabbítás nem történik meg, de a gomb bekapcsolva marad – később, ha feltöltesz kreditet, újra elindul a folyamat.
            </p>

            <p>
              <strong>A megvásárolt kreditek soha nem járnak le!</strong> Amíg fel nem használod őket (kiemelésre vagy automatikus meghosszabbításra), addig az egyenlegeden maradnak – akár évekig is. Nincs időkorlát, nincs elveszett kredit. Ez azt jelenti, hogy nyugodtan vehetsz nagyobb csomagot most, a bevezető kedvezménnyel, és később, amikor szükséged van rá, akkor használod fel – olcsóbban, mint később tennéd.
            </p>
          </section>

          <section className="article-section">
            <h2>Összefoglalva – miért éri meg?</h2>
            <p>
              Ha szeretnéd, hogy hirdetésed ne vesszen el a térképen, a kreditrendszer egy egyszerű és hatékony eszköz erre. 
              Az automatikus meghosszabbítással pedig még kényelmesebb: bekapcsolod, és a hirdetés kiemelése addig tart, amíg az ingatlan el nem kerül – anélkül, hogy neked kellene figyelned a lejáratot.
            </p>
            <p>
              A bevezető kedvezményekkel most különösen jó időzítésű a kezdés – minél előbb kezded, annál olcsóbban tudsz hosszabb távon kiemelni.
            </p>
          </section>

          <section className="article-section disclaimer">
            <p>
              <strong>Fontos tudnivaló:</strong> A kreditrendszer és az automatikus meghosszabbítás 2026. február 24-től érhető el. Az árak és kedvezmények az induláskor érvényesek, később módosulhatnak. 
              A kiemelések kizárólag a térképen növelik a láthatóságot (priorítás, zoom-szint), nem befolyásolják a keresési találatokat más platformokon.
            </p>
          </section>

          <RelatedArticles />

          <footer className="article-footer">
            <p className="copyright-notice">
              © 2026 Morán Raul / Ingatlan-Térkép. Minden jog fenntartva. 
              Forrásmegjelöléssel szabadon idézhető és hivatkozható.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Article5Page;