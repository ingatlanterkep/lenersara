// app/blog/[slug]/articles/Article8Page.tsx
'use client';

import React from 'react';
import '../styles/ArticlePage.css';
import '../styles/BlogListPage.css';
import RelatedArticles from '@/components/RelatedArticles';
import FacebookBadge from '@/components/FacebookBadge';

const Article2Page = () => {
  return (
    <>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Ingatlan-Térkép Index 2025. december: Medián négyzetméterárak és változások Budapesten és vármegyénként",
          "description": "Havi ingatlanpiaci index 2025 decemberében: budapesti kerületi és vármegyei medián négyzetméterárak, valamint a szeptember-decemberi időszak ártrendjei. Adatalapú elemzés több ezer hirdetésből.",
          "author": { "@type": "Person", "name": "Morán Raul" },
          "publisher": {
            "@type": "Organization",
            "name": "Ingatlan-Térkép",
            "logo": { "@type": "ImageObject", "url": "https://ingatlan-terkep.hu/logo.png" }
          },
          "datePublished": "2025-12-29",
          "dateModified": "2025-12-29",
          "image": [
            "https://ingatlan-terkep.hu/ingatlan-terkep-index-2025-december-budapest-keruletek-nmar-hoterkep.png",
            "https://ingatlan-terkep.hu/ingatlan-terkep-index-2025-december-varmegyei-nmar-hoterkep.png"
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://ingatlan-terkep.hu/blog/ingatlan-terkep-index-2025-december"
          }
        })}
      </script>

      <div className="article-container">
        <div className="article-wrapper">
          <header className="article-header">
            <h1 className="article-title">
              Ingatlan-Térkép Index 2025. december: Négyzetméterárak és ártrendek Budapesten és vármegyénként
            </h1>
            <p className="article-subtitle">
              Medián négyzetméterárak és szeptember–decemberi változások – havi ingatlanpiaci index
            </p>
            <p className="article-author">Szerző: Morán Raul | Ingatlan-Térkép, Közzétéve: 2025. december 29.</p>
          <FacebookBadge></FacebookBadge>
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
              A 2025. szeptember–decemberi időszakban az ingatlanpiac továbbra is erős regionális eltéréseket mutatott. 
              Budapest medián négyzetméterára 1,55 millió Ft körül stabilizálódott, míg vidéken a keleti vármegyék jelentős drágulást mutattak (akár +35%). 
              A legdrágább kerület a V. (2,12 millió Ft/nm), a legolcsóbb a XXIII. (0,79 millió Ft/nm). 
              A fejlődő részek elsősorban a külső budapesti kerületek (pl. XXI., III., XII.) és a keleti vármegyék (Csongrád-Csanád, Borsod, Szabolcs).
            </p>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2025-december-budapest-keruletek-nmar-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár hőtérkép 2025 december – medián nm-árak kerületenként" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek medián négyzetméterárai – 2025. december</figcaption>
              </figure>

                            <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2025-december-budapest-keruletek-nmar-valtozas-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár változás hőtérkép 2025 szeptember-december" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek nm-ár változása (%) – 2025. szeptember–december</figcaption>
              </figure>


            </div>

            <div className="image-grid">

                              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2025-december-varmegyei-nmar-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár hőtérkép 2025 december – medián nm-árak vármegyénként" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi medián négyzetméterárai – 2025. december (Budapesttel)</figcaption>
              </figure>


              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2025-december-vármegyei-nmar-valtozas-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár változás hőtérkép 2025 szeptember-december" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi nm-ár változása (%) – 2025. szeptember–december</figcaption>
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
                  <tr><td>V. kerület</td><td>2.1229</td></tr>
                  <tr><td>XII. kerület</td><td>2.0435</td></tr>
                  <tr><td>XIII. kerület</td><td>1.9570</td></tr>
                  <tr><td>XI. kerület</td><td>1.8404</td></tr>
                  <tr><td>I. kerület</td><td>1.8263</td></tr>
                  <tr><td>II. kerület</td><td>1.7143</td></tr>
                  <tr><td>III. kerület</td><td>1.7117</td></tr>
                  <tr><td>VI. kerület</td><td>1.6820</td></tr>
                  <tr><td>IX. kerület</td><td>1.6225</td></tr>
                  <tr><td>VII. kerület</td><td>1.5739</td></tr>
                  <tr><td>XIV. kerület</td><td>1.5681</td></tr>
                  <tr><td>VIII. kerület</td><td>1.5000</td></tr>
                  <tr><td>XIX. kerület</td><td>1.2496</td></tr>
                  <tr><td>IV. kerület</td><td>1.1768</td></tr>
                  <tr><td>XV. kerület</td><td>1.1089</td></tr>
                  <tr><td>XVI. kerület</td><td>1.0000</td></tr>
                  <tr><td>X. kerület</td><td>0.9508</td></tr>
                  <tr><td>XVIII. kerület</td><td>0.9426</td></tr>
                  <tr><td>XXI. kerület</td><td>0.9369</td></tr>
                  <tr><td>XX. kerület</td><td>0.9215</td></tr>
                  <tr><td>XVII. kerület</td><td>0.9000</td></tr>
                  <tr><td>XXII. kerület</td><td>0.8851</td></tr>
                  <tr><td>XXIII. kerület</td><td>0.7857</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead>
                  <tr><th>Kerület</th><th>Nm-ár változás<br />(%)</th></tr>
                </thead>
                <tbody>
                  <tr><td>XXI. kerület</td><td>+25.33</td></tr>
                  <tr><td>III. kerület</td><td>+16.67</td></tr>
                  <tr><td>XII. kerület</td><td>+16.40</td></tr>
                  <tr><td>I. kerület</td><td>+10.88</td></tr>
                  <tr><td>XV. kerület</td><td>+9.51</td></tr>
                  <tr><td>X. kerület</td><td>+8.63</td></tr>
                  <tr><td>XX. kerület</td><td>+7.96</td></tr>
                  <tr><td>II. kerület</td><td>+5.82</td></tr>
                  <tr><td>IV. kerület</td><td>+5.79</td></tr>
                  <tr><td>XI. kerület</td><td>+5.18</td></tr>
                  <tr><td>XIV. kerület</td><td>+4.05</td></tr>
                  <tr><td>V. kerület</td><td>+3.79</td></tr>
                  <tr><td>VII. kerület</td><td>+3.42</td></tr>
                  <tr><td>XIII. kerület</td><td>+3.28</td></tr>
                  <tr><td>VIII. kerület</td><td>+3.11</td></tr>
                  <tr><td>XVIII. kerület</td><td>+2.88</td></tr>
                  <tr><td>XVI. kerület</td><td>+2.09</td></tr>
                  <tr><td>XXII. kerület</td><td>-0.62</td></tr>
                  <tr><td>VI. kerület</td><td>-0.78</td></tr>
                  <tr><td>XXIII. kerület</td><td>-2.05</td></tr>
                  <tr><td>XVII. kerület</td><td>-5.08</td></tr>
                  <tr><td>XIX. kerület</td><td>-5.08</td></tr>
                  <tr><td>IX. kerület</td><td>-6.47</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead>
                  <tr><th>Kerület</th><th>Hirdetésszám<br />változás (%)</th></tr>
                </thead>
                <tbody>
                  <tr><td>III. kerület</td><td>+47.28</td></tr>
                  <tr><td>IV. kerület</td><td>+24.29</td></tr>
                  <tr><td>I. kerület</td><td>+22.58</td></tr>
                  <tr><td>XII. kerület</td><td>+20.41</td></tr>
                  <tr><td>XV. kerület</td><td>+20.14</td></tr>
                  <tr><td>XI. kerület</td><td>+17.11</td></tr>
                  <tr><td>XVI. kerület</td><td>+15.24</td></tr>
                  <tr><td>V. kerület</td><td>+14.71</td></tr>
                  <tr><td>VI. kerület</td><td>+12.61</td></tr>
                  <tr><td>XXIII. kerület</td><td>+11.27</td></tr>
                  <tr><td>XXII. kerület</td><td>+7.20</td></tr>
                  <tr><td>XXI. kerület</td><td>+6.19</td></tr>
                  <tr><td>XVIII. kerület</td><td>+3.90</td></tr>
                  <tr><td>VIII. kerület</td><td>+0.59</td></tr>
                  <tr><td>XIX. kerület</td><td>0.00</td></tr>
                  <tr><td>XIII. kerület</td><td>-2.67</td></tr>
                  <tr><td>X. kerület</td><td>-2.92</td></tr>
                  <tr><td>VII. kerület</td><td>-5.75</td></tr>
                  <tr><td>II. kerület</td><td>-7.12</td></tr>
                  <tr><td>XIV. kerület</td><td>-9.03</td></tr>
                  <tr><td>XVII. kerület</td><td>-19.02</td></tr>
                  <tr><td>XX. kerület</td><td>-28.16</td></tr>
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
                  <tr><td>Budapest</td><td>1.5528</td></tr>
                  <tr><td>Somogy</td><td>0.9983</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>0.8383</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>0.6938</td></tr>
                  <tr><td>Pest</td><td>0.6500</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>0.6192</td></tr>
                  <tr><td>Veszprém</td><td>0.6064</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>0.5888</td></tr>
                  <tr><td>Fejér</td><td>0.5385</td></tr>
                  <tr><td>Baranya</td><td>0.4817</td></tr>
                  <tr><td>Zala</td><td>0.4798</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>0.4276</td></tr>
                  <tr><td>Vas</td><td>0.4137</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>0.3496</td></tr>
                  <tr><td>Bács-Kiskun</td><td>0.3455</td></tr>
                  <tr><td>Tolna</td><td>0.3014</td></tr>
                  <tr><td>Heves</td><td>0.2926</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>0.2917</td></tr>
                  <tr><td>Békés</td><td>0.2656</td></tr>
                  <tr><td>Nógrád</td><td>0.2371</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead>
                  <tr><th>Helyszín</th><th>Nm-ár változás<br />(%)</th></tr>
                </thead>
                <tbody>
                  <tr><td>Csongrád-Csanád</td><td>+35.16</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>+34.96</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>+23.81</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>+17.01</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>+16.52</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>+15.14</td></tr>
                  <tr><td>Nógrád</td><td>+12.14</td></tr>
                  <tr><td>Békés</td><td>+11.75</td></tr>
                  <tr><td>Baranya</td><td>+10.10</td></tr>
                  <tr><td>Vas</td><td>+6.38</td></tr>
                  <tr><td>Zala</td><td>+5.56</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>+4.96</td></tr>
                  <tr><td>Pest</td><td>+4.41</td></tr>
                  <tr><td>Budapest</td><td>+3.52</td></tr>
                  <tr><td>Fejér</td><td>+1.09</td></tr>
                  <tr><td>Somogy</td><td>-0.01</td></tr>
                  <tr><td>Veszprém</td><td>-1.45</td></tr>
                  <tr><td>Bács-Kiskun</td><td>-3.25</td></tr>
                  <tr><td>Heves</td><td>-5.93</td></tr>
                  <tr><td>Tolna</td><td>-8.36</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead>
                  <tr><th>Helyszín</th><th>Hirdetésszám<br />változás (%)</th></tr>
                </thead>
                <tbody>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>+32.42</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>+23.56</td></tr>
                  <tr><td>Nógrád</td><td>+16.61</td></tr>
                  <tr><td>Bács-Kiskun</td><td>+13.94</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>+11.41</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>+7.90</td></tr>
                  <tr><td>Békés</td><td>+7.14</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>+7.04</td></tr>
                  <tr><td>Baranya</td><td>+6.65</td></tr>
                  <tr><td>Budapest</td><td>+4.65</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>+3.58</td></tr>
                  <tr><td>Pest</td><td>+3.20</td></tr>
                  <tr><td>Somogy</td><td>+0.00</td></tr>
                  <tr><td>Veszprém</td><td>-0.95</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>-3.10</td></tr>
                  <tr><td>Zala</td><td>-3.45</td></tr>
                  <tr><td>Heves</td><td>-4.60</td></tr>
                  <tr><td>Vas</td><td>-4.71</td></tr>
                  <tr><td>Tolna</td><td>-4.86</td></tr>
                  <tr><td>Fejér</td><td>-7.43</td></tr>
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
              <li>1. III. kerület (Óbuda): +16.67% nm-ár, +47.28% hirdetés – robbanásveszélyes növekedés.</li>
              <li>2. XXI. kerület (Csepel): +25.33% nm-ár, +6.19% hirdetés – extrém árrobbanás.</li>
              <li>3. XII. kerület: +16.40% nm-ár, +20.41% hirdetés – erős bővülés.</li>
              <li>4. XV. kerület: +9.51% nm-ár, +20.14% hirdetés – dinamikus külső kerület.</li>
              <li>5. I. kerület: +10.88% nm-ár, +22.58% hirdetés – a várnegyed se maradhat ki, na!</li>
            </ul>
            <p>
              <strong>Top 5 vármegye:</strong>
            </p>
            <ul>
              <li>1. Csongrád-Csanád: +35.16% nm-ár, -3.10% hirdetés – árvezérelt fejlődés.</li>
              <li>2. Borsod-Abaúj-Zemplén: +34.96% nm-ár, +23.56% hirdetés – teljes élénkülés.</li>
              <li>3. Szabolcs-Szatmár-Bereg: +23.81% nm-ár, +32.42% hirdetés – piacbővülés.</li>
              <li>4. Hajdú-Bihar: +17.01% nm-ár, +3.58% hirdetés – stabil növekedés.</li>
              <li>5. Jász-Nagykun-Szolnok: +16.52% nm-ár, +7.04% hirdetés – keleti élharcos.</li>
            </ul>
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
              <li>1. III. kerület (Óbuda): +16.67% nm-ár, +47.28% hirdetés – robbanásveszélyes növekedés.</li>
              <li>2. XXI. kerület (Csepel): +25.33% nm-ár, +6.19% hirdetés – extrém árrobbanás.</li>
              <li>3. XII. kerület: +16.40% nm-ár, +20.41% hirdetés – erős bővülés.</li>
              <li>4. XV. kerület: +9.51% nm-ár, +20.14% hirdetés – dinamikus külső kerület.</li>
              <li>5. I. kerület: +10.88% nm-ár, +22.58% hirdetés – belvárosi meglepetés.</li>
            </ul>
            <p>
              <strong>Top 5 vármegye:</strong>
            </p>
            <ul>
              <li>1. Csongrád-Csanád: +35.16% nm-ár, -3.10% hirdetés – árvezérelt fejlődés.</li>
              <li>2. Borsod-Abaúj-Zemplén: +34.96% nm-ár, +23.56% hirdetés – teljes élénkülés.</li>
              <li>3. Szabolcs-Szatmár-Bereg: +23.81% nm-ár, +32.42% hirdetés – piacbővülés.</li>
              <li>4. Hajdú-Bihar: +17.01% nm-ár, +3.58% hirdetés – stabil növekedés.</li>
              <li>5. Jász-Nagykun-Szolnok: +16.52% nm-ár, +7.04% hirdetés – keleti élharcos.</li>
            </ul>
          </section>

          <section className="article-section">
            <h2>Következtetés: Hol drágul, hol stagnál 2025 végén?</h2>
            <p>
              A 2025. szeptember–decemberi időszakban az ingatlanpiac erősen polarizálódott. 
              <strong>Budapesten</strong> a medián négyzetméterár 1,55 millió Ft körül stabilizálódott, de a külső kerületek (XXI. - Csepel +25%, III. - Óbuda +47% hirdetés, XII. +16%) jelentős drágulást és kínálatbővülést mutattak, míg a belsőbb részeken (IX., XIX., XVII.) csökkenés látható (-5–6%). 
              A fejlődő budapesti részek egyértelműen a zöldebb, családiabb külső kerületek, mint Csepel, Óbuda és a XII. kerület.
            </p>
            <p>
              <strong>Vidéken</strong> a keleti vármegyék robbantak: Csongrád-Csanád (+35%), Borsod (+35%), Szabolcs (+24%), Hajdú-Bihar (+17%) – ezek jelenleg a legdinamikusabban fejlődő ingatlanpiaci régiók Magyarországon, erős hirdetésszám-növekedéssel (+32% Szabolcs, +24% Borsod). 
              A legdrágabb vármegye Somogy (Balaton-hatás miatt ~1 millió Ft/nm), a legolcsóbb Nógrád (0,24 millió Ft/nm).
            </p>
            <p>
              Összességében: aki olcsóbban keres, a keleti és északi vármegyékben találja a legjobb lehetőségeket, míg a prémium szegmens továbbra is Budapest belső kerületeiben és a Balatonnál koncentrálódik. 
              A havi Ingatlan-Térkép Index folytatódik – kövesd a frissítéseket!
            </p>
            <p>
              <a href="/ingatlan-terkep-index.xlsx" download>Letöltés: Teljes kutatási adatok Excelben</a>
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
                <tr><td>Abony</td><td>0.324864</td><td>-2.15</td><td>-6.33</td></tr>
                <tr><td>Ajka</td><td>0.423164</td><td>0.00</td><td>-5.80</td></tr>
                <tr><td>Albertirsa</td><td>0.403883</td><td>-6.44</td><td>-12.90</td></tr>
                <tr><td>Badacsonytomaj</td><td>0.863462</td><td>-19.43</td><td>-16.88</td></tr>
                <tr><td>Baja</td><td>0.408333</td><td>-0.09</td><td>22.73</td></tr>
                <tr><td>Balatonföldvár</td><td>1.685507</td><td>21.91</td><td>-3.26</td></tr>
                <tr><td>Balatonfüred</td><td>2.186400</td><td>0.78</td><td>4.24</td></tr>
                <tr><td>Balatonkenese</td><td>0.067105</td><td>-58.78</td><td>-4.48</td></tr>
                <tr><td>Balatonlelle</td><td>1.200000</td><td>-8.11</td><td>-26.67</td></tr>
                <tr><td>Balatonmáriafürdő</td><td>1.077947</td><td>11.03</td><td>-12.64</td></tr>
                <tr><td>Balatonszemes</td><td>1.781081</td><td>0.76</td><td>-21.98</td></tr>
                <tr><td>Budakeszi</td><td>1.023810</td><td>3.80</td><td>-4.55</td></tr>
                <tr><td>Budaörs</td><td>0.681373</td><td>-1.97</td><td>-10.53</td></tr>
                <tr><td>Békéscsaba</td><td>0.313793</td><td>4.60</td><td>15.19</td></tr>
                <tr><td>Cegléd</td><td>0.590580</td><td>11.17</td><td>-15.27</td></tr>
                <tr><td>Cserszegtomaj</td><td>0.866000</td><td>4.15</td><td>-22.39</td></tr>
                <tr><td>Dabas</td><td>0.366333</td><td>-22.06</td><td>1.57</td></tr>
                <tr><td>Debrecen</td><td>0.956591</td><td>3.18</td><td>4.38</td></tr>
                <tr><td>Dunakeszi</td><td>0.970006</td><td>3.54</td><td>5.88</td></tr>
                <tr><td>Dömsöd</td><td>0.437500</td><td>0.96</td><td>-1.79</td></tr>
                <tr><td>Egyek</td><td>0.006514</td><td>0.27</td><td>2.33</td></tr>
                <tr><td>Esztergom</td><td>0.523387</td><td>-4.84</td><td>-8.25</td></tr>
                <tr><td>Fonyód</td><td>1.481054</td><td>-5.20</td><td>15.15</td></tr>
                <tr><td>Gyöngyös</td><td>0.438095</td><td>-1.08</td><td>1.69</td></tr>
                <tr><td>Győr</td><td>0.900000</td><td>2.58</td><td>33.45</td></tr>
                <tr><td>Göd</td><td>0.867091</td><td>2.09</td><td>-5.71</td></tr>
                <tr><td>Gödöllő</td><td>0.843460</td><td>8.52</td><td>37.62</td></tr>
                <tr><td>Hajdúszoboszló</td><td>0.752022</td><td>-10.38</td><td>-5.43</td></tr>
                <tr><td>Hajdúsámson</td><td>0.695832</td><td>107.71</td><td>49.09</td></tr>
                <tr><td>Hévíz</td><td>1.208597</td><td>11.73</td><td>6.12</td></tr>
                <tr><td>Jászberény</td><td>0.591290</td><td>11.09</td><td>60.32</td></tr>
                <tr><td>Kecskemét</td><td>0.574074</td><td>1.31</td><td>3.58</td></tr>
                <tr><td>Kerepes</td><td>0.478202</td><td>-9.53</td><td>-8.77</td></tr>
                <tr><td>Keszthely</td><td>0.782601</td><td>5.88</td><td>-18.58</td></tr>
                <tr><td>Komárom</td><td>0.750000</td><td>2.94</td><td>0.00</td></tr>
                <tr><td>Marcali</td><td>0.435185</td><td>-1.95</td><td>-6.41</td></tr>
                <tr><td>Miskolc</td><td>0.507639</td><td>1.91</td><td>46.67</td></tr>
                <tr><td>Mogyoród</td><td>0.950000</td><td>18.27</td><td>-12.50</td></tr>
                <tr><td>Monor</td><td>0.511538</td><td>0.00</td><td>1.30</td></tr>
                <tr><td>Nagykanizsa</td><td>0.400759</td><td>18.57</td><td>-5.15</td></tr>
                <tr><td>Nyíregyháza</td><td>0.712709</td><td>7.29</td><td>48.17</td></tr>
                <tr><td>Paks</td><td>0.575581</td><td>-0.30</td><td>-1.22</td></tr>
                <tr><td>Pilis</td><td>0.280000</td><td>3.05</td><td>-7.14</td></tr>
                <tr><td>Piliscsaba</td><td>0.785667</td><td>18.61</td><td>-5.56</td></tr>
                <tr><td>Pilisvörösvár</td><td>0.850000</td><td>-8.02</td><td>-13.11</td></tr>
                <tr><td>Pomáz</td><td>1.068696</td><td>7.86</td><td>244.23</td></tr>
                <tr><td>Pécel</td><td>0.832558</td><td>31.90</td><td>24.56</td></tr>
                <tr><td>Pécs</td><td>0.840000</td><td>7.93</td><td>5.29</td></tr>
                <tr><td>Ráckeve</td><td>0.681818</td><td>1.21</td><td>0.00</td></tr>
                <tr><td>Révfülöp</td><td>0.039869</td><td>-82.13</td><td>-7.58</td></tr>
                <tr><td>Salgótarján</td><td>0.270588</td><td>15.17</td><td>19.67</td></tr>
                <tr><td>Siófok</td><td>1.340158</td><td>-1.45</td><td>7.38</td></tr>
                <tr><td>Sopron</td><td>0.683092</td><td>-12.77</td><td>-16.13</td></tr>
                <tr><td>Szeged</td><td>0.956118</td><td>8.79</td><td>61.40</td></tr>
                <tr><td>Szekszárd</td><td>0.413043</td><td>4.35</td><td>-10.49</td></tr>
                <tr><td>Szentendre</td><td>0.990214</td><td>7.97</td><td>0.88</td></tr>
                <tr><td>Szigetszentmiklós</td><td>0.717816</td><td>19.41</td><td>-20.62</td></tr>
                <tr><td>Szolnok</td><td>0.566624</td><td>5.44</td><td>22.22</td></tr>
                <tr><td>Szombathely</td><td>0.738636</td><td>23.50</td><td>18.00</td></tr>
                <tr><td>Székesfehérvár</td><td>0.882680</td><td>8.64</td><td>-1.05</td></tr>
                <tr><td>Tatabánya</td><td>0.718000</td><td>32.07</td><td>54.55</td></tr>
                <tr><td>Tiszafüred</td><td>0.350625</td><td>55.05</td><td>-31.71</td></tr>
                <tr><td>Törökbálint</td><td>0.871307</td><td>48.74</td><td>9.80</td></tr>
                <tr><td>Vecsés</td><td>0.725000</td><td>-5.67</td><td>-3.51</td></tr>
                <tr><td>Veresegyház</td><td>0.933333</td><td>14.29</td><td>7.84</td></tr>
                <tr><td>Veszprém</td><td>0.613169</td><td>0.92</td><td>6.00</td></tr>
                <tr><td>Vác</td><td>0.768992</td><td>-1.95</td><td>-4.38</td></tr>
                <tr><td>Zalaegerszeg</td><td>0.500000</td><td>5.12</td><td>-0.57</td></tr>
                <tr><td>Érd</td><td>0.833333</td><td>9.77</td><td>-6.67</td></tr>
              </tbody>
            </table>
          </section>

<RelatedArticles />

          <footer className="article-footer">
            <p className="copyright-notice">
              © 2025 Morán Raul / Ingatlan-Térkép. Minden jog fenntartva. 
              Forrásmegjelöléssel szabadon idézhető és hivatkozható.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Article2Page;