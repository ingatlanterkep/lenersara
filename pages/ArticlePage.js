'use client';

import React from 'react';
import Link from 'next/link';
import '../styles/ArticlePage.css';
import '../styles/BlogListPage.css';
import RelatedArticles from '../components/RelatedArticles';
import FacebookBadge from '../components/FacebookBadge';

const ArticlePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Otthon Start program hatása az ingatlanpiacra 2025: A piac átstruktúrálódása fix 3%-os lakáshitel mellett",
            "description": "Elemzés a fix 3%-os Otthon Start lakáshitel hatására a hirdetési adatok alapján: kompozíciós hatások, medián árak és kínálat változása 2025 szeptember-december között.",
            "author": { "@type": "Person", "name": "Morán Raul" },
            "publisher": {
              "@type": "Organization",
              "name": "Ingatlan-Térkép",
              "logo": { "@type": "ImageObject", "url": "https://www.ingatlan-terkep.hu/logo.png" }
            },
            "datePublished": "2025-12-27",
            "dateModified": "2025-12-27",
            "image": "https://www.ingatlan-terkep.hu/regios-kulcsmutatok-median-ar-negyzetmeterar-kompozicios-hatas-videk-budapest-otthon-start-2025.png",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.ingatlan-terkep.hu/blog/otthon-start-program-hatasa-ingatlanpiac-2025"
            }
          })
        }}
      />

      <div className="article-container">
        <div className="article-wrapper">
          <header className="article-header">
            <h1 className="article-title">
              Otthon Start program hatása az ingatlanpiacra 2025: A piac átstruktúrálódása
            </h1>
            <p className="article-subtitle">
              Kompozíciós hatások az ingatlanhirdetésekben (2025. szeptember–december)
            </p>
            <p className="article-author">Szerző: Morán Raul | Ingatlan-Térkép, Közzétéve: 2025. december 27.</p>
            <FacebookBadge />
          </header>

          <section className="article-section disclaimer">
            <p>
              <strong>Megjegyzés:</strong> Jelen elemzés politikamentes, nem reprezentatív belső kutatás az Ingatlan-Térkép által. 
              Az eredmények kizárólag a platformon elérhető hirdetési adatokra támaszkodnak, nem tükrözik a teljes magyar ingatlanpiacot, és nem tartalmaznak hivatalos állami vagy piaci statisztikákat. 
              Célja kizárólag a hirdetési trendek bemutatása a <a href="https://startolj-ra.hu/" rel="nofollow">fix 3%-os Otthon Start lakáshitel program</a> indulását követő időszakban.
            </p>
          </section>

          <section className="article-section">
            <h2>Bevezetés</h2>
            <p>
              Az <strong>Otthon Start program</strong> (fix 3%-os lakáshitel) 2025. szeptember 1-jén indult Magyarországon, kifejezetten a fiatalok és családok lakáshoz jutását segítő támogatási forma. 
              A konstrukció árplafonokkal, jogosultsági feltételekkel és kedvezményes hitelkamattal működik, így elsősorban az alsó és alsó-közép árszegmensben fejti ki hatását. 
              A bevezetés egy amúgy is visszafogott ingatlanpiaci környezetben történt: alacsony tranzakciószám, erős regionális eltérések (Budapest vs. vidék) és szegmentált kereslet jellemezte a piacot.
            </p>
            <p>
              Ez az elemzés azt vizsgálja, hogyan befolyásolta az <strong>Otthon Start program</strong> az ingatlanárakat és a kínálatot rövid távon, az indulástól számított időszakban. 
              A fókusz a 2025. szeptember–decemberi időszakon van - adatok: 2025. szeptember 18. – december 27.
              Az adatok hirdetési adatbázisból származnak (több mint 22 ezer hirdetés, 133 ingatlaniroda szintjén), és empirikus összehasonlításon alapulnak: medián árak, négyzetméterárak (Ft/m²), hirdetésszámok és speciális mutatók (pl. kompozíciós hatás és targeting index) elemzése.
            </p>

            <p><strong>Fontosabb fogalmak magyarázata:</strong></p>
            <ul>
              <li>
                <strong>Kompozíciós hatás</strong> (composition effect): Azt mutatja, mennyire torzítja a kínálat összetételének változása az aggregált mutatókat (pl. medián ár). 
                Ha negatív, akkor több alacsonyabb árú ingatlan került a piacra.
              </li>
              <li>
                <strong>Targeting index</strong>: Az alsó árszegmens (legolcsóbb 30%) célzott árváltozását méri – magas értéke jelzi, hogy a támogatás kifejezetten ott élénkített keresletet.
              </li>
            </ul>
          </section>

          <section className="article-section">
            <h2>A szerkezeti változások fő jellemzői</h2>
            <p>
              Az Otthon Start program hatása nem általános áremelkedésben, hanem heterogén, összetételi jellegű átrendeződésben mutatkozott meg. 
              A piac nem egységesen mozdult, hanem „széthúzódott”: vidéken erősebb reakciók, Budapesten stabilitás dominált.
            </p>

            <div className="text-with-image">
              <div className="text-block">
                <h3>Medián ár vs. négyzetméterár: a kompozíciós hatás ereje</h3>
                <p>
                  A medián kínálati árak sok helyen emelkedtek, de a négyzetméterárak (azaz az egységárak) nagyrészt stagnáltak. 
                  Ez klasszikus kompozíciós hatás: a drágulás látszata nem valódi inflációból, hanem abból fakad, hogy több támogatásra jogosult, alacsonyabb összértékű, de jobb minőségű lakás került a kínálatba.
                </p>
                <p>
                  Vidéken a medián ár +6,85%-kal nőtt (56 millió Ft → 59,825 millió Ft), a négyzetméterár +6,80%-kal. 
                  Budapesten a medián ár kissé csökkent (-2,54%), a négyzetméterár +3,53%-kal emelkedett. 
                  Az irodák szintjén az átlagos négyzetméterár-változás vidéken +13,78%, Budapesten csupán +1,03%. 
                  A kompozíciós hatás vidéken -2,41% (több olcsóbb ingatlan a kínálatban), Budapesten +6,13%.
                </p>
                
                <p>
                  Ez egyértelműen mutatja: vidéken az Otthon Start lakáshitel és támogatás élénkítette a kínálatot az alsóbb szegmensekben.
                </p>
              </div>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/regios-kulcsmutatok-median-ar-negyzetmeterar-kompozicios-hatas-videk-budapest-otthon-start-2025.png" 
                  alt="Régiós kulcsmutatók összehasonlítása: medián ár, négyzetméterár és kompozíciós hatás változása vidéken vs. Budapesten a fix 3%-os Otthon Start program hatására 2025-ben" 
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <figcaption>Régiós kulcsmutatók összehasonlítása (vidék vs. Budapest)</figcaption>
              </figure>
            </div>

            <div className="text-with-image reverse">
              <div className="text-block">
                <h3>Az alsó árszegmens stabilizálódása</h3>
                <p>
                  A program ott hatott legerősebben, ahol elérhető: az alsó és alsó-közép kategóriákban. 
                  A targeting index vidéken átlag +27,64%, Budapesten magasabb, de outlier-ektől torzított. 
                  Az alsó szegmensben a hirdetésszám nem zuhant tovább, a medián árak stabilizálódtak vagy enyhén nőttek.
                </p>
                <p>
                  Például vidéken a 30–50 millió Ft kategóriában +2,38% több hirdetés jelent meg, medián stabil. 
                  Az 50–100 millió Ft sávban +7,67% növekedés, medián +0,14%. 
                  Budapesten az alsó kategóriákban csökkenés látható, a felsőbbekben enyhe élénkülés.
                </p>

                <p>
                  Az alsó szegmens „felszívása” különösen vidéken látható – itt az Otthon Start 2025 folytatása további stabilizációt hozhat.
                </p>
              </div>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/hirdetesszam-valtozasa-arkategoriak-szerint-videk-budapest-fix-3-szazalekos-lakashitel-2025.png" 
                  alt="Hirdetésszám változása árkategóriánként vidéken és Budapesten a fix 3%-os Otthon Start lakáshitel indulása után 2025-ben" 
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <figcaption>Hirdetésszám változás árkategóriánként (vidék vs. Budapest)</figcaption>
              </figure>
            </div>

            <h3>Növekvő szóródás és piaci széttöredezettség</h3>
            <p>
              A szóródás (volatilitás) jelentősen nőtt, ami tipikus egy célzott támogatási programnál. 
              Vidéken az interkvartilis tartomány változása átlag +1823%, Budapesten csupán +5,45%. 
              Az irodák reakciója is eltérő: vidéken 35 iroda mutatott drágulást, 43 stagnálást, 18 csökkenést; Budapesten 7 drágult, 23 stagnált, 7 csökkent.
            </p>

            <table className="article-table">
              <thead>
                <tr>
                  <th>Irány</th>
                  <th>Vidék (irodák száma)</th>
                  <th>Budapest (irodák száma)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Drágult</td>
                  <td>35</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>Stagnált</td>
                  <td>43</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td>Csökkent</td>
                  <td>18</td>
                  <td>7</td>
                </tr>
              </tbody>
            </table>

            <p>
              Ez aláhúzza: az Otthon Start program nem egységes fellendülést, hanem lokális, szegmensspecifikus mozgásokat hozott.
            </p>
          </section>

          <section className="article-section">
            <h2>Következtetés</h2>
            <p>
              Az elemzett adatok alapján az Otthon Start program rövid távú hatása nem általános árnövekedésben, hanem strukturális és kompozíciós változásokban jelent meg az ingatlanpiacon. Összefoglalva:
            </p>
            <ul>
              <li><strong>Heterogén ármozgások:</strong> Régiónként, árkategóriánként és hirdetőnként eltérő irányú mozgások figyelhetők meg, ami kizárja az „általános piaci növekedés” lehetőségét.</li>
              <li><strong>Medián ár emelkedik, nm-ár stagnál:</strong> A medián kínálati ár sok esetben emelkedik, de az egységárak nem mutatnak széles körű növekedést – ez kizárólag kompozíciós változással magyarázható.</li>
              <li><strong>Alsó szegmens „felszívása”:</strong> Az alsó ársávban a kínálat nem esik vissza, a medián ár stabil marad vagy enyhén nő, miközben a felsőbb szegmensekben stagnálás vagy gyengülés figyelhető meg. Ez tipikus célzott keresleti hatás, amely pontosan megfelel a program konstrukciójának.</li>
              <li><strong>Növekvő szóródás, széttöredezett piac:</strong> A piaci szóródás növekedése (régiók, irodák és árkategóriák között) arra utal, hogy az árak nem együtt mozdulnak, hanem a piac szerkezetileg szétesik – lokális és szegmensspecifikus reakciókat vált ki.</li>
            </ul>
            <p>
              Az adatok alapján az Otthon Start hatása elsősorban kompozíciós jellegű: a támogatás-kompatibilis, alacsonyabb árú ingatlanok aránya nőtt a kínálatban és az érdeklődésben, ami több szegmensben a medián ár emelkedését eredményezte anélkül, hogy az egységárak széles körben növekedtek volna. 
              Az adatokkal összhangban álló értelmezés szerint az alsó árszegmensben nőtt a kisebb, támogatás-kompatibilis ingatlanok aránya. Ezek az ingatlanok ugyan alacsonyabb összértékűek, azonban az adott szegmens korábbi kínálatához képest magasabb minőséget és árat képviselnek, ami az alsó sávon belüli árfelfelé tolódást eredményezte anélkül, hogy az aggregált mediánok vagy az egységárak jelentősen elmozdultak volna.
            </p>
            <p>
              Ez a belső kutatás kizárólag a hirdetési adatokra épül, és nem célja politikai állásfoglalás, hanem a megfigyelt trendek bemutatása.
            </p>
          </section>


<RelatedArticles />
<footer className="article-footer">
  <p className="copyright-notice">
    © 2025 Morán Raul / Ingatlan-Térkép. Minden jog fenntartva. 
    A cikk az Ingatlan-Térkép szellemi tulajdona. Forrásmegjelöléssel szabadon idézhető és hivatkozható.
  </p>
</footer>
        </div>
      </div>
    </>
    
  );
};

export default ArticlePage;