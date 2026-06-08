// app/blog/[slug]/articles/Article8Page.tsx
'use client';

import React from 'react';
import '../styles/ArticlePage.css';
import '../styles/BlogListPage.css';
import RelatedArticles from '@/components/RelatedArticles';
import FacebookBadge from '@/components/FacebookBadge';

const Article4Page = () => {
  return (
    <>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Ingatlan-Térkép Index 2026. január: Medián négyzetméterárak és változások Budapesten és vármegyénként",
          "description": "Havi ingatlanpiaci index 2026 januárjában: budapesti kerületi és vármegyei medián négyzetméterárak, valamint a januári eleje-vége időszak ártrendjei. Adatalapú elemzés több ezer hirdetésből.",
          "author": { "@type": "Person", "name": "Morán Raul" },
          "publisher": {
            "@type": "Organization",
            "name": "Ingatlan-Térkép",
            "logo": { "@type": "ImageObject", "url": "https://www.ingatlan-terkep.hu/logo.png" }
          },
          "datePublished": "2026-01-31",
          "dateModified": "2026-01-31",
          "image": [
            "https://www.ingatlan-terkep.hu/ingatlan-terkep-index-2026-januar-budapest-keruletek-nmar-hoterkep.png",
            "https://www.ingatlan-terkep.hu/ingatlan-terkep-index-2026-januar-varmegyei-nmar-hoterkep.png"
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.ingatlan-terkep.hu/blog/ingatlan-terkep-index-2026-januar"
          }
        })}
      </script>

      <div className="article-container">
        <div className="article-wrapper">
          <header className="article-header">
            <h1 className="article-title">
              Ingatlan-Térkép Index 2026. január: Négyzetméterárak és ártrendek Budapesten és vármegyénként
            </h1>
            <p className="article-subtitle">
              Medián négyzetméterárak és januári eleje-vége változások – havi ingatlanpiaci index
            </p>
            <p className="article-author">Szerző: Morán Raul | Ingatlan-Térkép, Közzétéve: 2026. január 31.</p>
                    <FacebookBadge/>
          </header>

          <section className="article-section disclaimer">
            <p>
              <strong>Megjegyzés:</strong> Az Ingatlan-Térkép Index saját belső elemzés több ezer aktív eladó hirdetésből (közös irodák alapján). 
              Nem reprezentatív a teljes piacra, Pest vármegye adatai Budapest nélkül értendők. Célja a hirdetési trendek átlátható bemutatása.
            </p>
          </section>

          <section className="article-section">
            <h2>Összefoglaló</h2>
            <p>
              A 2026. januári időszakban az ingatlanpiac stabil képet mutatott kis változásokkal. 
              Budapest medián négyzetméterára 1,56 millió Ft körül stabilizálódott (+0.17%), míg vidéken enyhe emelkedés látható (+0.66%). 
              A legdrágább kerület a V. kerület (Belváros-Lipótváros, 2,12 millió Ft/nm), a legolcsóbb a XXI. kerület (Csepel, 0,89 millió Ft/nm). 
              A fejlődő részek elsősorban a külső budapesti kerületek (pl. XIX. kerület - Kispest, I. kerület - Várkerület, XV. kerület - Rákospalota) és egyes vármegyék (Veszprém, Bács-Kiskun).
            </p>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-januar-budapest-keruletek-nmar-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár hőtérkép 2026 január – medián nm-árak kerületenként" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek medián négyzetméterárai – 2026. január</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-januar-budapest-keruletek-nmar-valtozas-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár változás hőtérkép 2026 januári eleje-vége" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek nm-ár változása (%) – 2026. januári eleje-vége</figcaption>
              </figure>
            </div>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-januar-varmegyei-nmar-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár hőtérkép 2026 január – medián nm-árak vármegyénként" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi medián négyzetméterárai – 2026. január (Budapesttel)</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-januar-vármegyei-nmar-valtozas-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár változás hőtérkép 2026 januári eleje-vége" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi nm-ár változása (%) – 2026. januári eleje-vége</figcaption>
              </figure>
            </div>
          </section>

          <section className="article-section">
            <h2>Budapest kerületek – Összehasonlító adatok</h2>
            <p>A táblázatok három oszlopban mutatják a medián négyzetméterárakat, azok változását és a hirdetésszám változását.</p>

            <div className="table-trio">
      <table className="article-table narrow">
  <thead>
    <tr><th>Kerület</th><th>Medián nm-ár<br />(millió Ft/nm)</th></tr>
  </thead>

  <tbody>
    <tr><td>V. kerület</td><td>2.118</td></tr>
    <tr><td>XII. kerület</td><td>1.993</td></tr>
    <tr><td>XIII. kerület</td><td>1.917</td></tr>
    <tr><td>I. kerület</td><td>1.846</td></tr>
    <tr><td>III. kerület</td><td>1.796</td></tr>
    <tr><td>XI. kerület</td><td>1.792</td></tr>
    <tr><td>II. kerület</td><td>1.744</td></tr>
    <tr><td>VI. kerület</td><td>1.693</td></tr>
    <tr><td>IX. kerület</td><td>1.599</td></tr>
    <tr><td>VII. kerület</td><td>1.562</td></tr>
    <tr><td>XIV. kerület</td><td>1.547</td></tr>
    <tr><td>VIII. kerület</td><td>1.450</td></tr>
    <tr><td>XIX. kerület</td><td>1.333</td></tr>
    <tr><td>IV. kerület</td><td>1.175</td></tr>
    <tr><td>XV. kerület</td><td>1.113</td></tr>
    <tr><td>XVI. kerület</td><td>1.030</td></tr>
    <tr><td>X. kerület</td><td>0.926</td></tr>
    <tr><td>XX. kerület</td><td>0.923</td></tr>
    <tr><td>XVII. kerület</td><td>0.917</td></tr>
    <tr><td>XVIII. kerület</td><td>0.917</td></tr>
    <tr><td>XXI. kerület</td><td>0.886</td></tr>
    <tr><td>XXII. kerület</td><td>0.884</td></tr>
    <tr><td>XXIII. kerület</td><td>0.730</td></tr>
  </tbody>
</table>

<table className="article-table narrow">
  <thead>
    <tr><th>Kerület</th><th>Nm-ár változás<br />(%)</th></tr>
  </thead>
  <tbody>
    <tr><td>XVIII. kerület</td><td>+6.15</td></tr>
    <tr><td>XIX. kerület</td><td>+5.16</td></tr>
    <tr><td>I. kerület</td><td>+0.98</td></tr>
    <tr><td>XV. kerület</td><td>+0.36</td></tr>
    <tr><td>XVII. kerület</td><td>+0.36</td></tr>
    <tr><td>XX. kerület</td><td>+0.17</td></tr>
    <tr><td>XXI. kerület</td><td>0.00</td></tr>
    <tr><td>XXII. kerület</td><td>-0.14</td></tr>
    <tr><td>III. kerület</td><td>-0.15</td></tr>
    <tr><td>V. kerület</td><td>-0.23</td></tr>
    <tr><td>IV. kerület</td><td>-0.34</td></tr>
    <tr><td>II. kerület</td><td>-0.03</td></tr>
    <tr><td>VI. kerület</td><td>-0.03</td></tr>
    <tr><td>VII. kerület</td><td>-0.66</td></tr>
    <tr><td>XIII. kerület</td><td>-0.67</td></tr>
    <tr><td>IX. kerület</td><td>-0.93</td></tr>
    <tr><td>XVI. kerület</td><td>-1.01</td></tr>
    <tr><td>XIV. kerület</td><td>-1.40</td></tr>
    <tr><td>XII. kerület</td><td>-2.38</td></tr>
    <tr><td>X. kerület</td><td>-2.56</td></tr>
    <tr><td>XI. kerület</td><td>-2.58</td></tr>
    <tr><td>VIII. kerület</td><td>-2.70</td></tr>
    <tr><td>XXIII. kerület</td><td>-7.08</td></tr>
  </tbody>
</table>

<table className="article-table narrow">
  <thead>
    <tr><th>Kerület</th><th>Hirdetésszám<br />változás (%)</th></tr>
  </thead>
  <tbody>
    <tr><td>XVII. kerület</td><td>+81.51</td></tr>
    <tr><td>XXII. kerület</td><td>+44.03</td></tr>
    <tr><td>IV. kerület</td><td>-0.57</td></tr>
    <tr><td>XIV. kerület</td><td>-1.58</td></tr>
    <tr><td>XIII. kerület</td><td>-1.79</td></tr>
    <tr><td>VI. kerület</td><td>-2.89</td></tr>
    <tr><td>XIX. kerület</td><td>-4.39</td></tr>
    <tr><td>XII. kerület</td><td>-4.60</td></tr>
    <tr><td>III. kerület</td><td>-5.60</td></tr>
    <tr><td>II. kerület</td><td>-6.61</td></tr>
    <tr><td>IX. kerület</td><td>-6.79</td></tr>
    <tr><td>XI. kerület</td><td>-6.97</td></tr>
    <tr><td>I. kerület</td><td>-7.41</td></tr>
    <tr><td>XV. kerület</td><td>-7.51</td></tr>
    <tr><td>X. kerület</td><td>-7.58</td></tr>
    <tr><td>V. kerület</td><td>-7.64</td></tr>
    <tr><td>XX. kerület</td><td>-8.89</td></tr>
    <tr><td>VII. kerület</td><td>-9.07</td></tr>
    <tr><td>XVI. kerület</td><td>-9.70</td></tr>
    <tr><td>VIII. kerület</td><td>-12.68</td></tr>
    <tr><td>XXI. kerület</td><td>-23.76</td></tr>
    <tr><td>XVIII. kerület</td><td>-63.23</td></tr>
    <tr><td>XXIII. kerület</td><td>-76.25</td></tr>
  </tbody>
</table>
            </div>
          </section>

          <section className="article-section">
            <h2>Vármegyék – Összehasonlító adatok (Budapesttel együtt)</h2>

            <div className="table-trio">
              <table className="article-table narrow">
                <thead>
                  <tr><th>Helyszín</th><th>Medián nm-ár<br />(millió Ft/nm)</th></tr>
                </thead>
                <tbody>
                  <tr><td>Budapest</td><td>1.561</td></tr>
                  <tr><td>Somogy</td><td>0.960</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>0.825</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>0.698</td></tr>
                  <tr><td>Pest</td><td>0.650</td></tr>
                  <tr><td>Veszprém</td><td>0.652</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>0.600</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>0.535</td></tr>
                  <tr><td>Fejér</td><td>0.539</td></tr>
                  <tr><td>Baranya</td><td>0.462</td></tr>
                  <tr><td>Zala</td><td>0.467</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>0.472</td></tr>
                  <tr><td>Vas</td><td>0.400</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>0.346</td></tr>
                  <tr><td>Bács-Kiskun</td><td>0.422</td></tr>
                  <tr><td>Tolna</td><td>0.319</td></tr>
                  <tr><td>Heves</td><td>0.276</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>0.265</td></tr>
                  <tr><td>Békés</td><td>0.235</td></tr>
                  <tr><td>Nógrád</td><td>0.214</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead>
                  <tr><th>Helyszín</th><th>Nm-ár változás<br />(%)</th></tr>
                </thead>
                <tbody>
                  <tr><td>Veszprém</td><td>+5.43</td></tr>
                  <tr><td>Bács-Kiskun</td><td>+2.37</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>+1.54</td></tr>
                  <tr><td>Fejér</td><td>+1.41</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>+0.98</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>+0.77</td></tr>
                  <tr><td>Budapest</td><td>+0.17</td></tr>
                  <tr><td>Tolna</td><td>-0.10</td></tr>
                  <tr><td>Pest</td><td>-0.45</td></tr>
                  <tr><td>Nógrád</td><td>-0.80</td></tr>
                  <tr><td>Heves</td><td>-1.01</td></tr>
                  <tr><td>Baranya</td><td>-1.03</td></tr>
                  <tr><td>Somogy</td><td>-1.08</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>-1.13</td></tr>
                  <tr><td>Zala</td><td>-1.46</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>-1.63</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>-1.62</td></tr>
                  <tr><td>Vas</td><td>-3.23</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>-5.18</td></tr>
                  <tr><td>Békés</td><td>-8.34</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead>
                  <tr><th>Helyszín</th><th>Hirdetésszám<br />változás (%)</th></tr>
                </thead>
                <tbody>
                  <tr><td>Komárom-Esztergom</td><td>+8.18</td></tr>
                  <tr><td>Heves</td><td>-1.11</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>-3.01</td></tr>
                  <tr><td>Bács-Kiskun</td><td>-3.78</td></tr>
                  <tr><td>Budapest</td><td>-3.85</td></tr>
                  <tr><td>Tolna</td><td>-3.18</td></tr>
                  <tr><td>Fejér</td><td>-4.75</td></tr>
                  <tr><td>Vas</td><td>-5.23</td></tr>
                  <tr><td>Somogy</td><td>-5.36</td></tr>
                  <tr><td>Baranya</td><td>-5.36</td></tr>
                  <tr><td>Pest</td><td>-5.45</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>-5.65</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>-5.68</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>-5.70</td></tr>
                  <tr><td>Zala</td><td>-6.35</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>-7.20</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>-9.93</td></tr>
                  <tr><td>Nógrád</td><td>-10.00</td></tr>
                  <tr><td>Veszprém</td><td>-10.04</td></tr>
                  <tr><td>Békés</td><td>-15.24</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="article-section">
            <h2>Legerősebben fejlődő kerületek és vármegyék</h2>
            <p>
              Összességében a fejlődést az nm-ár növekedés és hirdetésszám bővülés alapján rangsoroljuk.
            </p>
            <p>
              <strong>Top 5 budapesti kerület:</strong>
            </p>
            <ul>
              <li>1. XIX. kerület (Kispest): +5.16% nm-ár, -4.39% hirdetés – enyhe drágulás külső kerületben.</li>
              <li>2. I. kerület (Várkerület): +0.98% nm-ár, -7.41% hirdetés – stabil belvárosi növekedés.</li>
              <li>3. XV. kerület (Rákospalota): +0.36% nm-ár, -7.51% hirdetés – kis pozitív változás.</li>
              <li>4. XVII. kerület (Rákosmente): +0.36% nm-ár, +81.51% hirdetés – jelentős kínálatbővülés.</li>
              <li>5. XX. kerület (Pesterzsébet): +0.17% nm-ár, -8.89% hirdetés – minimális emelkedés.</li>
            </ul>
            <p>
              <strong>Top 5 vármegye:</strong>
            </p>
            <ul>
              <li>1. Veszprém: +5.43% nm-ár, -10.04% hirdetés – Balaton-hatás miatti drágulás.</li>
              <li>2. Bács-Kiskun: +2.37% nm-ár, -3.78% hirdetés – enyhe növekedés.</li>
              <li>3. Jász-Nagykun-Szolnok: +1.54% nm-ár, -5.70% hirdetés – stabil keleti régió.</li>
              <li>4. Fejér: +1.41% nm-ár, -4.75% hirdetés – kis pozitív trend.</li>
              <li>5. Szabolcs-Szatmár-Bereg: +0.98% nm-ár, -3.01% hirdetés – enyhe élénkülés.</li>
            </ul>
          </section>

          <section className="article-section">
            <h2>Következtetés: Hol drágul, hol stagnál 2026 elején?</h2>
            <p>
              A 2026. januári időszakban az ingatlanpiac stabil maradt kis változásokkal. 
              <strong>Budapesten</strong> a medián négyzetméterár 1,56 millió Ft körül stabilizálódott (+0.17%), de néhány külső kerületben enyhe drágulás látható (XIX. kerület - Kispest +5.16%, XV. kerület - Rákospalota +0.36%, XVII. kerület - Rákosmente +0.36%), míg a belsőbb részeken korrekció (VIII. kerület - Józsefváros -2.70%, XI. kerület - Újbuda -2.58%, X. kerület - Kőbánya -2.56%). 
              A fejlődő budapesti részek a külső kerületek, mint Kispest, Rákospalota és Rákosmente.
            </p>
            <p>
              <strong>Vidéken</strong> enyhe emelkedés: Veszprém (+5.43%), Bács-Kiskun (+2.37%), míg keleti régiókban vegyes (Békés -8.34%, Borsod-Abaúj-Zemplén -1.13%). 
              A legdrágább vármegye Somogy (Balaton miatt ~0.96 millió Ft/nm), a legolcsóbb Nógrád (0.21 millió Ft/nm).
            </p>
            <p>
              Összességében: a piac lehűlőben, kevesebb hirdetéssel. Aki olcsóbban keres, a keleti vármegyékben talál lehetőségeket, míg prémium szegmens Budapest belső kerületeiben (pl. V. kerület - Belváros-Lipótváros, XII. kerület - Hegyvidék) és Balatonnál marad. 
              A havi Ingatlan-Térkép Index folytatódik – kövesd a frissítéseket!
            </p>

          </section>

          <section className="article-section">
            <h2>Vidéki városok trendjei (ABC rendben)</h2>
            <p>A nagyobb vidéki városok medián négyzetméterárai, azok változása és a hirdetésszám változása.</p>

            <table className="article-table">
              <thead>
                <tr>
                  <th>Város</th>
                  <th>Medián nm-ár (millió Ft/nm)</th>
                  <th>Nm-ár változás (%)</th>
                  <th>Hirdetésszám változás (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Abony</td><td>0.313</td><td>-5.87</td><td>-25.97</td></tr>
                <tr><td>Albertirsa</td><td>0.420</td><td>+3.99</td><td>+1.85</td></tr>
                <tr><td>Badacsonytomaj</td><td>0.886</td><td>+2.66</td><td>-16.92</td></tr>
                <tr><td>Balatonföldvár</td><td>1.797</td><td>+0.08</td><td>+1.25</td></tr>
                <tr><td>Balatonfüred</td><td>2.187</td><td>+0.01</td><td>-6.56</td></tr>
                <tr><td>Balatonkenese</td><td>0.061</td><td>-9.81</td><td>-3.13</td></tr>
                <tr><td>Balatonlelle</td><td>1.203</td><td>+0.14</td><td>-1.72</td></tr>
                <tr><td>Balatonmáriafürdő</td><td>1.116</td><td>+2.51</td><td>-3.80</td></tr>
                <tr><td>Balatonszemes</td><td>1.717</td><td>-3.58</td><td>-15.49</td></tr>
                <tr><td>Békéscsaba</td><td>0.312</td><td>-9.10</td><td>-17.33</td></tr>
                <tr><td>Budaörs</td><td>1.042</td><td>-0.39</td><td>-1.52</td></tr>
                <tr><td>Cegléd</td><td>0.537</td><td>+9.15</td><td>-9.15</td></tr>
                <tr><td>Cserszegtomaj</td><td>0.867</td><td>+0.24</td><td>0.00</td></tr>
                <tr><td>Dabas</td><td>0.250</td><td>-30.20</td><td>-1.56</td></tr>
                <tr><td>Debrecen</td><td>0.969</td><td>+1.87</td><td>-5.18</td></tr>
                <tr><td>Dömsöd</td><td>0.400</td><td>+9.80</td><td>+3.92</td></tr>
                <tr><td>Dunaharaszti</td><td>0.999</td><td>+4.74</td><td>-1.92</td></tr>
                <tr><td>Dunakeszi</td><td>0.981</td><td>+0.10</td><td>-6.82</td></tr>
                <tr><td>Egyek</td><td>0.007</td><td>+0.02</td><td>0.00</td></tr>
                <tr><td>Érd</td><td>0.853</td><td>+0.38</td><td>-6.08</td></tr>
                <tr><td>Esztergom</td><td>0.544</td><td>+5.03</td><td>0.00</td></tr>
                <tr><td>Fonyód</td><td>1.293</td><td>-9.92</td><td>-23.46</td></tr>
                <tr><td>Göd</td><td>0.833</td><td>-4.01</td><td>-11.29</td></tr>
                <tr><td>Gödöllő</td><td>0.738</td><td>-9.89</td><td>-9.84</td></tr>
                <tr><td>Gyöngyös</td><td>0.443</td><td>0.00</td><td>+4.69</td></tr>
                <tr><td>Győr</td><td>0.905</td><td>+0.54</td><td>-6.76</td></tr>
                <tr><td>Hajdúsámson</td><td>0.685</td><td>-1.13</td><td>-3.70</td></tr>
                <tr><td>Hajdúszoboszló</td><td>0.751</td><td>-0.07</td><td>-3.53</td></tr>
                <tr><td>Hévíz</td><td>1.222</td><td>+1.13</td><td>-4.29</td></tr>
                <tr><td>Jászberény</td><td>0.635</td><td>+0.03</td><td>+2.33</td></tr>
                <tr><td>Kaposvár</td><td>0.643</td><td>-0.78</td><td>-1.54</td></tr>
                <tr><td>Kecskemét</td><td>0.583</td><td>+1.53</td><td>-2.63</td></tr>
                <tr><td>Kerepes</td><td>0.478</td><td>-6.62</td><td>-5.66</td></tr>
                <tr><td>Keszthely</td><td>0.768</td><td>+1.29</td><td>-6.82</td></tr>
                <tr><td>Komárom</td><td>0.750</td><td>0.00</td><td>-7.58</td></tr>
                <tr><td>Marcali</td><td>0.456</td><td>-1.74</td><td>-2.80</td></tr>
                <tr><td>Miskolc</td><td>0.490</td><td>-3.47</td><td>-9.87</td></tr>
                <tr><td>Mogyoród</td><td>0.955</td><td>+0.86</td><td>-5.06</td></tr>
                <tr><td>Monor</td><td>0.513</td><td>+0.25</td><td>-3.75</td></tr>
                <tr><td>Nagykanizsa</td><td>0.459</td><td>+7.94</td><td>-4.55</td></tr>
                <tr><td>Nyíregyháza</td><td>0.697</td><td>-0.49</td><td>-2.86</td></tr>
                <tr><td>Paks</td><td>0.564</td><td>-1.95</td><td>-3.70</td></tr>
                <tr><td>Pécel</td><td>0.793</td><td>0.00</td><td>-3.23</td></tr>
                <tr><td>Pécs</td><td>0.830</td><td>+6.55</td><td>-5.42</td></tr>
                <tr><td>Pilis</td><td>0.308</td><td>+9.43</td><td>-16.67</td></tr>
                <tr><td>Piliscsaba</td><td>0.775</td><td>-1.42</td><td>0.00</td></tr>
                <tr><td>Pilisvörösvár</td><td>0.906</td><td>+2.55</td><td>0.00</td></tr>
                <tr><td>Ráckeve</td><td>0.682</td><td>0.00</td><td>-2.20</td></tr>
                <tr><td>Révfülöp</td><td>0.040</td><td>+0.18</td><td>-3.64</td></tr>
                <tr><td>Salgótarján</td><td>0.233</td><td>-13.53</td><td>-8.57</td></tr>
                <tr><td>Siófok</td><td>1.330</td><td>-1.49</td><td>-4.12</td></tr>
                <tr><td>Szada</td><td>0.710</td><td>-1.23</td><td>+1.85</td></tr>
                <tr><td>Szeged</td><td>0.954</td><td>+0.12</td><td>-2.94</td></tr>
                <tr><td>Székesfehérvár</td><td>0.876</td><td>-0.53</td><td>-4.26</td></tr>
                <tr><td>Szekszárd</td><td>0.429</td><td>0.00</td><td>0.00</td></tr>
                <tr><td>Szentendre</td><td>0.996</td><td>+0.73</td><td>-8.11</td></tr>
                <tr><td>Szigetszentmiklós</td><td>0.622</td><td>0.00</td><td>-2.13</td></tr>
                <tr><td>Szolnok</td><td>0.599</td><td>+5.58</td><td>-7.64</td></tr>
                <tr><td>Tatabánya</td><td>0.627</td><td>-4.97</td><td>+23.60</td></tr>
                <tr><td>Tiszafüred</td><td>0.364</td><td>-1.88</td><td>0.00</td></tr>
                <tr><td>Törökbálint</td><td>0.818</td><td>-4.80</td><td>0.00</td></tr>
                <tr><td>Vác</td><td>0.754</td><td>-2.89</td><td>-3.01</td></tr>
                <tr><td>Vecsés</td><td>0.769</td><td>+8.48</td><td>-5.36</td></tr>
                <tr><td>Veresegyház</td><td>0.941</td><td>+0.78</td><td>0.00</td></tr>
                <tr><td>Veszprém</td><td>0.608</td><td>0.00</td><td>-3.85</td></tr>
                <tr><td>Zalaegerszeg</td><td>0.505</td><td>+0.91</td><td>-3.49</td></tr>
              </tbody>
            </table>
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

export default Article4Page;