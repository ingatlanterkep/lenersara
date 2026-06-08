'use client';

import React, { useState } from 'react';
import '../styles/ArticlePage.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('users');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="article-container">
      <div className="article-wrapper">
        {/* Fejléc kártya – bemutatkozás és alapötlet */}
        <header className="article-header">
          <h1 className="article-title">Rólunk:</h1>
          <p className="article-subtitle">
            Fedezd fel az ingatlanpiacot új szemszögből
          </p>
        </header>
        
        <section className="article-section">
          <p style={{ fontSize: '1.1rem', color: '#8b4513', marginTop: '30px', lineHeight: '1.7' }}>
            Az Ingatlan-Térkép abból a felismerésből született, hogy az ingatlankeresés ma is gyakran széttöredezett és nehezen átlátható folyamat. 
            Úgy láttuk, hogy egy térképalapú megközelítéssel valódi hozzáadott értéket tudunk nyújtani mindazoknak, akik otthont keresnek, mind pedig a hirdetőknek.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#8b4513', marginTop: '20px', lineHeight: '1.7' }}>
            Platformunk modern technológiával és innovatív megoldásokkal teszi egyszerűbbé, átláthatóbbá és hatékonyabbá az ingatlanpiacot. 
            Célunk, hogy az otthonkeresés gyorsabb és kényelmesebb legyen, miközben a ingatlanközvetítők számára is jobb elérést biztosítunk.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#8b4513', marginTop: '20px', lineHeight: '1.7', fontWeight: '500' }}>
            Míg a legtöbb ingatlanportál listákban gondolkodik, mi a térben. 
            A vizuális, térképalapú szemlélet áll a középpontban, ami természetesebb és intuitívabb döntéshozatalt tesz lehetővé.
          </p>
        </section>

        {/* Célzott tartalom */}
        <section className="article-section">
          <>
            <h2>Találd meg álmaid otthonát gyorsan és egyszerűen</h2>
            <p>
              Képzeld el, hogy egyetlen átlátható térképen egyszerre látod mindazt, ami egy új otthon kiválasztásához fontos:
            </p>
            <ul>
              <li><strong>Térképalapú átláthatóság:</strong> Az összes elérhető ingatlant egy pillantással áttekintheted, árakkal jelölve és részletes szűrőkkel.</li>
              <li><strong>Minden információ egy helyen:</strong> Az ingatlanok mellett a környék is látható – tömegközlekedés, iskolák, egészségügyi intézmények, bevásárlóközpontok –, testreszabható rétegekkel.</li>
              <li><strong>Testreszabható szűrők:</strong> Ár, méret, szobaszám, energetikai besorolás – csak a számodra releváns ajánlatok jelennek meg.</li>
              <li><strong>Utcai nézet (Street View):</strong> Közvetlenül a térképről bekukkanthatsz az utcákba, így már otthonról érezheted a környék hangulatát és valósághű képet kaphatsz a helyszínről.</li>
              <li><strong>Mobilbarát felület:</strong> Bárhol, bármikor böngészhetsz, így egyetlen lehetőség sem kerüli el a figyelmedet.</li>
            </ul>
          </>
        </section>

        {/* Legfontosabb jellemző */}
        <section className="article-section">
          <h2>A legfontosabb érték: térképalapú döntéstámogatás</h2>
          <p>
            A platform szívét a térképalapú keresés és szűrés adja. 
            Ez nem csupán paraméterek szerinti válogatást tesz lehetővé, hanem az ingatlanokat valós kontextusban mutatja meg.
          </p>
          <p>
            A különböző rétegek – közlekedés, szolgáltatások, műholdas nézet és egyebek – kombinálásával gyorsan felmérheted, hogy egy adott otthon valóban megfelel-e az életvitelednek. 
            Ez időt takarít meg, csökkenti a bizonytalanságot és magabiztosabb döntést eredményez.
          </p>
        </section>

        {/* Felhasználói élmény */}
        <section className="article-section">
          <h2>Emlékezetes felhasználói élmény</h2>
          <p>
            Különösen nagy figyelmet fordítottunk az egyszerűségre és az átláthatóságra. 
            Azt szerettük volna elérni, hogy az oldalt ne kelljen "megtanulni" – használata ösztönös és természetes legyen.
          </p>
          <p>
            Az interaktív térkép, a villámgyors szűrés, a letisztult vizuális megjelenés és a logikus működés együtt olyan élményt nyújt, amely nem terheli a felhasználót. 
            Az igazi különlegesség azonban az, hogy nem csupán információkat kínálunk, hanem segítünk megérteni a várost és az ingatlanpiacot.
          </p>
        </section>

        {/* Jövőbeli tervek */}
        <section className="article-section">
          <h2>Jövőbeli terveink: Együtt fejlődünk tovább</h2>
          <p>
            Rövid távon a meglévő funkciók finomhangolása, a teljesítmény további javítása és a felhasználói visszajelzések beépítése áll a fókuszban. 
            Célunk, hogy a platform gyors, stabil és minden eszközön kényelmesen használható legyen.
          </p>
          <p>
            Hosszú távon egy átfogó döntéstámogató rendszerré szeretnénk fejleszteni az Ingatlan-Térképet, 
            amely nem csak bemutatja az ingatlanokat, hanem valódi segítséget nyújt az összehasonlításban, a környék elemzésében és a tudatos választásban.
          </p>
          <p>
            Országos lefedettséggel, folyamatosan bővülő rétegekkel (zajszint-, közbiztonság-térképek stb.), 
            mentett keresésekkel, egyedi értesítésekkel és saját mobilalkalmazással tervezzük gazdagítani az élményt. 
            A térképalapú gondolkodásban még számos lehetőség rejlik – ezeket lépésről lépésre, a Ti visszajelzéseitek alapján valósítjuk meg.
          </p>

          <h2>Miért válassz minket?</h2>
          <ul>
            <li><strong>Felhasználóbarát:</strong> Intuitív és átlátható felület mindenki számára.</li>
            <li><strong>Innovatív:</strong> Térképalapú technológiával új szintre emeljük az ingatlanpiacot.</li>
          </ul>

          <h2>Csatlakozz hozzánk!</h2>
          <p>
            Legyen szó otthonkeresésről vagy hirdetésről, platformunk gyors, egyszerű és hatékony megoldást kínál. 
            Fedezd fel az Ingatlan-Térképet, és tapasztald meg, hogyan tehetjük átláthatóbbá és kényelmesebbé az ingatlanpiacot. 
          </p>
        </section>

        {/* Footer */}
        <footer className="article-footer">
          <p className="copyright-notice">
            © 2026 Ingatlan-Térkép. Minden jog fenntartva.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;