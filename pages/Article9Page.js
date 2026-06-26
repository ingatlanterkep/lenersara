// app/blog/[slug]/articles/Article8Page.tsx
'use client';

import React from 'react';
import '../styles/ArticlePage.css';
import '../styles/BlogListPage.css';
import RelatedArticles from '@/components/RelatedArticles';
import FacebookBadge from '@/components/FacebookBadge';

const Article9Page = () => {
  return (
    <>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Ingatlan-Térkép Index 2026. március: Medián négyzetméterárak és változások Budapesten és vármegyénként",
          "description": "Havi ingatlanpiaci index 2026 márciusában: budapesti kerületi és vármegyei medián négyzetméterárak, valamint februári–márciusi időszak ártrendjei. Adatalapú elemzés több ezer hirdetésből.",
          "author": { "@type": "Person", "name": "Morán Raul" },
          "publisher": {
            "@type": "Organization",
            "name": "Ingatlan-Térkép",
            "logo": { "@type": "ImageObject", "url": "https://ingatlan-terkep.hu/logo.png" }
          },
          "datePublished": "2026-03-31",
          "dateModified": "2026-03-31",
          "image": [
            "https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-marcius-budapest-keruletek-nmar-hoterkep.png",
            "https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-marcius-varmegyei-nmar-hoterkep.png"
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://ingatlan-terkep.hu/blog/ingatlan-terkep-index-2026-marcius"
          }
        })}
      </script>

      <div className="article-container">
        <div className="article-wrapper">
          <header className="article-header">
            <h1 className="article-title">
              Ingatlan-Térkép Index 2026. március: Négyzetméterárak és ártrendek Budapesten és vármegyénként
            </h1>
            <p className="article-subtitle">
              Medián négyzetméterárak és februári–márciusi változások – havi ingatlanpiaci index
            </p>
            <p className="article-author">Szerző: Morán Raul | Ingatlan-Térkép, Közzétéve: 2026. március 31.</p>
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
              A 2026. márciusi időszakban az ingatlanpiac <strong>enyhe korrekciót mutatott Budapesten</strong>, míg <strong>vidéken enyhe emelkedés</strong> látható. 
              Budapest medián négyzetméterára <strong>1,40 millió Ft/nm</strong>-re csökkent (<strong>-0,40%</strong>), míg vidéken <strong>0,69 millió Ft/nm</strong>-re nőtt (<strong>+3,98%</strong>). 
              A legdrágább kerület a <strong>I. kerület</strong> (Várkerület, <strong>2,122 millió Ft/nm</strong>), a legolcsóbb a <strong>XXIII. kerület</strong> (0,905 millió Ft/nm). 
              A legerősebben fejlődő részek a külső budapesti kerületek (<strong>XXI. kerület +6,27%</strong>, <strong>I. kerület +6,16%</strong>, <strong>XVII. kerület +4,42%</strong>) és <strong>Somogy vármegye (+6,83%</strong>).
            </p>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-marcius-budapest-keruletek-nmar-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár hőtérkép 2026 március – medián nm-árak kerületenként" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek medián négyzetméterárai – 2026. március</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-marcius-budapest-keruletek-nmar-valtozas-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár változás hőtérkép 2026 februári–márciusi időszak" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek nm-ár változása (%) – februári–márciusi időszak</figcaption>
              </figure>
            </div>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-marcius-varmegyei-nmar-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár hőtérkép 2026 március – medián nm-árak vármegyénként" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi medián négyzetméterárai – 2026. március (Budapesttel)</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-marcius-varmegyei-nmar-valtozas-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár változás hőtérkép 2026 februári–márciusi időszak" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi nm-ár változása (%) – februári–márciusi időszak</figcaption>
              </figure>
            </div>
          </section>

          <section className="article-section">
            <h2>Budapest kerületek – Összehasonlító adatok</h2>
            <p>A táblázatok három oszlopban mutatják a medián négyzetméterárakat, azok változását és a hirdetésszám változását.</p>

            <div className="table-trio">
              <table className="article-table narrow">
                <thead><tr><th>Kerület</th><th>Medián nm-ár<br />(millió Ft/nm)</th></tr></thead>
                <tbody>
                  <tr><td>I. kerület</td><td>2.122</td></tr>
                  <tr><td>V. kerület</td><td>2.090</td></tr>
                  <tr><td>XII. kerület</td><td>1.998</td></tr>
                  <tr><td>II. kerület</td><td>1.774</td></tr>
                  <tr><td>XIII. kerület</td><td>1.763</td></tr>
                  <tr><td>XI. kerület</td><td>1.714</td></tr>
                  <tr><td>VI. kerület</td><td>1.647</td></tr>
                  <tr><td>VII. kerület</td><td>1.511</td></tr>
                  <tr><td>III. kerület</td><td>1.490</td></tr>
                  <tr><td>IX. kerület</td><td>1.481</td></tr>
                  <tr><td>XIV. kerület</td><td>1.411</td></tr>
                  <tr><td>VIII. kerület</td><td>1.386</td></tr>
                  <tr><td>IV. kerület</td><td>1.278</td></tr>
                  <tr><td>XXII. kerület</td><td>1.175</td></tr>
                  <tr><td>XV. kerület</td><td>1.155</td></tr>
                  <tr><td>XIX. kerület</td><td>1.133</td></tr>
                  <tr><td>XVI. kerület</td><td>1.121</td></tr>
                  <tr><td>X. kerület</td><td>1.106</td></tr>
                  <tr><td>XXI. kerület</td><td>1.027</td></tr>
                  <tr><td>XVII. kerület</td><td>1.021</td></tr>
                  <tr><td>XX. kerület</td><td>1.018</td></tr>
                  <tr><td>XVIII. kerület</td><td>1.000</td></tr>
                  <tr><td>XXIII. kerület</td><td>0.905</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Kerület</th><th>Nm-ár változás<br />(%)</th></tr></thead>
                <tbody>
                  <tr><td>XXI. kerület</td><td>+6.27</td></tr>
                  <tr><td>I. kerület</td><td>+6.16</td></tr>
                  <tr><td>XVII. kerület</td><td>+4.42</td></tr>
                  <tr><td>XXII. kerület</td><td>+4.30</td></tr>
                  <tr><td>VI. kerület</td><td>+4.01</td></tr>
                  <tr><td>XVI. kerület</td><td>+3.27</td></tr>
                  <tr><td>IV. kerület</td><td>+2.99</td></tr>
                  <tr><td>XIX. kerület</td><td>+2.63</td></tr>
                  <tr><td>XV. kerület</td><td>+2.23</td></tr>
                  <tr><td>VII. kerület</td><td>+0.72</td></tr>
                  <tr><td>XXIII. kerület</td><td>+0.53</td></tr>
                  <tr><td>II. kerület</td><td>0.00</td></tr>
                  <tr><td>XII. kerület</td><td>0.00</td></tr>
                  <tr><td>XX. kerület</td><td>0.00</td></tr>
                  <tr><td>V. kerület</td><td>-0.03</td></tr>
                  <tr><td>VIII. kerület</td><td>-0.17</td></tr>
                  <tr><td>IX. kerület</td><td>-1.03</td></tr>
                  <tr><td>XIII. kerület</td><td>-1.23</td></tr>
                  <tr><td>III. kerület</td><td>-1.37</td></tr>
                  <tr><td>XVIII. kerület</td><td>-1.53</td></tr>
                  <tr><td>XIV. kerület</td><td>-1.59</td></tr>
                  <tr><td>XI. kerület</td><td>-2.94</td></tr>
                  <tr><td>X. kerület</td><td>-4.74</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Kerület</th><th>Hirdetésszám<br />változás (%)</th></tr></thead>
                <tbody>
                  <tr><td>XXIII. kerület</td><td>+45.71</td></tr>
                  <tr><td>I. kerület</td><td>+34.09</td></tr>
                  <tr><td>IV. kerület</td><td>+33.18</td></tr>
                  <tr><td>X. kerület</td><td>+34.27</td></tr>
                  <tr><td>XIV. kerület</td><td>+31.56</td></tr>
                  <tr><td>XVII. kerület</td><td>+19.34</td></tr>
                  <tr><td>III. kerület</td><td>+18.10</td></tr>
                  <tr><td>XI. kerület</td><td>+33.57</td></tr>
                  <tr><td>XV. kerület</td><td>+27.64</td></tr>
                  <tr><td>VIII. kerület</td><td>+17.80</td></tr>
                  <tr><td>VI. kerület</td><td>+7.46</td></tr>
                  <tr><td>IX. kerület</td><td>+24.85</td></tr>
                  <tr><td>XIX. kerület</td><td>+9.34</td></tr>
                  <tr><td>XXII. kerület</td><td>+5.35</td></tr>
                  <tr><td>XX. kerület</td><td>+32.48</td></tr>
                  <tr><td>XIII. kerület</td><td>+16.39</td></tr>
                  <tr><td>II. kerület</td><td>+14.82</td></tr>
                  <tr><td>VII. kerület</td><td>+14.68</td></tr>
                  <tr><td>XVI. kerület</td><td>+9.32</td></tr>
                  <tr><td>XXI. kerület</td><td>+16.46</td></tr>
                  <tr><td>XVIII. kerület</td><td>+19.46</td></tr>
                  <tr><td>V. kerület</td><td>+18.85</td></tr>
                  <tr><td>XII. kerület</td><td>+18.18</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="article-section">
            <h2>Vármegyék – Összehasonlító adatok (Budapesttel együtt)</h2>

            <div className="table-trio">
              <table className="article-table narrow">
                <thead><tr><th>Helyszín</th><th>Medián nm-ár<br />(millió Ft/nm)</th></tr></thead>
                <tbody>
                  <tr><td>Budapest</td><td>1.398</td></tr>
                  <tr><td>Somogy</td><td>1.094</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>0.847</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>0.808</td></tr>
                  <tr><td>Pest</td><td>0.807</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>0.787</td></tr>
                  <tr><td>Veszprém</td><td>0.764</td></tr>
                  <tr><td>Baranya</td><td>0.743</td></tr>
                  <tr><td>Fejér</td><td>0.675</td></tr>
                  <tr><td>Bács-Kiskun</td><td>0.625</td></tr>
                  <tr><td>Vas</td><td>0.558</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>0.551</td></tr>
                  <tr><td>Zala</td><td>0.500</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>0.485</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>0.446</td></tr>
                  <tr><td>Heves</td><td>0.478</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>0.361</td></tr>
                  <tr><td>Tolna</td><td>0.333</td></tr>
                  <tr><td>Békés</td><td>0.269</td></tr>
                  <tr><td>Nógrád</td><td>0.275</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Helyszín</th><th>Nm-ár változás<br />(%)</th></tr></thead>
                <tbody>
                  <tr><td>Békés</td><td>+8.74</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>+6.96</td></tr>
                  <tr><td>Somogy</td><td>+6.83</td></tr>
                  <tr><td>Fejér</td><td>+6.29</td></tr>
                  <tr><td>Heves</td><td>+6.16</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>+5.81</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>+5.93</td></tr>
                  <tr><td>Bács-Kiskun</td><td>+4.17</td></tr>
                  <tr><td>Tolna</td><td>+4.76</td></tr>
                  <tr><td>Pest</td><td>+3.00</td></tr>
                  <tr><td>Veszprém</td><td>+3.99</td></tr>
                  <tr><td>Nógrád</td><td>+2.30</td></tr>
                  <tr><td>Baranya</td><td>+1.87</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>+0.88</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>+1.11</td></tr>
                  <tr><td>Vas</td><td>+0.09</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>+0.25</td></tr>
                  <tr><td>Zala</td><td>0.00</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>-0.07</td></tr>
                  <tr><td>Budapest</td><td>-0.40</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Helyszín</th><th>Hirdetésszám<br />változás (%)</th></tr></thead>
                <tbody>
                  <tr><td>Bács-Kiskun</td><td>+21.31</td></tr>
                  <tr><td>Baranya</td><td>+23.17</td></tr>
                  <tr><td>Békés</td><td>+28.78</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>+13.93</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>+18.16</td></tr>
                  <tr><td>Fejér</td><td>+21.80</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>+11.40</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>+19.99</td></tr>
                  <tr><td>Heves</td><td>+23.63</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>+27.86</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>+6.74</td></tr>
                  <tr><td>Nógrád</td><td>+19.13</td></tr>
                  <tr><td>Pest</td><td>+22.36</td></tr>
                  <tr><td>Somogy</td><td>+17.84</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>+6.29</td></tr>
                  <tr><td>Tolna</td><td>+17.62</td></tr>
                  <tr><td>Vas</td><td>+5.95</td></tr>
                  <tr><td>Veszprém</td><td>+12.82</td></tr>
                  <tr><td>Zala</td><td>+5.15</td></tr>
                  <tr><td>Budapest</td><td>+22.36</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="article-section">
            <h2>Legerősebben fejlődő kerületek és vármegyék</h2>
            <p>
              Összességében a fejlődést az nm-ár növekedés és hirdetésszám bővülés alapján rangsoroljuk.
            </p>
            <p><strong>Top 5 budapesti kerület:</strong></p>
            <ul>
              <li>1. XXI. kerület (Csepel): +6.27% nm-ár – erős külső kerületi növekedés</li>
              <li>2. I. kerület (Várkerület): +6.16% nm-ár – belvárosi élénkülés</li>
              <li>3. XVII. kerület (Rákosmente): +4.42% nm-ár – külső kerület robbanása</li>
              <li>4. XXII. kerület: +4.30% nm-ár – peremkerületi erősödés</li>
              <li>5. VI. kerület: +4.01% nm-ár – stabil belső kerület</li>
            </ul>
            <p><strong>Top 5 vármegye:</strong></p>
            <ul>
              <li>1. Békés: +8.74% nm-ár – keleti régió kiemelkedése</li>
              <li>2. Hajdú-Bihar: +6.96% nm-ár – erős keleti növekedés</li>
              <li>3. Somogy: +6.83% nm-ár – Balaton-hatás</li>
              <li>4. Fejér: +6.29% nm-ár – Pest-környéki élénkülés</li>
              <li>5. Heves: +6.16% nm-ár – stabil közép-magyarországi trend</li>
            </ul>
          </section>

          <section className="article-section">
            <h2>Következtetés: Hol drágul, hol stagnál 2026 márciusában?</h2>
            <p>
              A 2026. márciusi időszakban Budapest enyhén korrigált (<strong>-0,40%</strong>), de külső kerületek tovább erősödtek (XXI. Csepel +6,27%, I. Várkerület +6,16%, XVII. Rákosmente +4,42%). A belsőbb részeken kisebb korrekció látható. 
            </p>
            <p>
              <strong>Vidéken</strong> az emelkedés folytatódott: Békés (+8,74%), Hajdú-Bihar (+6,96%), Somogy (+6,83%) és Fejér (+6,29%) vezették a mezőnyt. A hirdetésszám szinte mindenhol nőtt – a kínálat bővült.
            </p>
            <p>
              Összességében: aki olcsóbban keres, a külső budapesti kerületekben és a keleti vármegyékben talál lehetőséget. Prémium szegmensben továbbra is a I. és V. kerület, valamint a Balaton-part a nyerő. 
              A havi Ingatlan-Térkép Index folytatódik – kövesd a frissítéseket!
            </p>
          </section>

          <section className="article-section">
            <h2>Vidéki városok trendjei (ABC rendben – teljes lista az Excel alapján)</h2>
            <p>A nagyobb vidéki városok medián négyzetméterárai, azok változása és a hirdetésszám változása (teljes adatbázis alapján, hiánytalanul).</p>
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
                <tr><td>Abádszalók</td><td>0.477</td><td>-37.75</td><td>+27.12</td></tr>
                <tr><td>Abony</td><td>0.401</td><td>+1.91</td><td>+7.32</td></tr>
                <tr><td>Ajka</td><td>0.542</td><td>+2.98</td><td>+31.37</td></tr>
                <tr><td>Albertirsa</td><td>0.681</td><td>+6.11</td><td>+27.81</td></tr>
                <tr><td>Alsónémedi</td><td>0.628</td><td>-4.22</td><td>-3.80</td></tr>
                <tr><td>Alsóörs</td><td>1.500</td><td>-0.85</td><td>+8.47</td></tr>
                <tr><td>Baja</td><td>0.453</td><td>-2.35</td><td>+1.05</td></tr>
                <tr><td>Balatonakarattya</td><td>1.817</td><td>+1.91</td><td>+4.40</td></tr>
                <tr><td>Balatonalmádi</td><td>1.563</td><td>+17.96</td><td>+52.38</td></tr>
                <tr><td>Balatonboglár</td><td>0.977</td><td>-2.03</td><td>+1.47</td></tr>
                <tr><td>Balatonfenyves</td><td>1.313</td><td>0.00</td><td>+16.95</td></tr>
                <tr><td>Balatonföldvár</td><td>1.855</td><td>-3.89</td><td>+9.82</td></tr>
                <tr><td>Balatonfüred</td><td>1.554</td><td>+0.04</td><td>+8.92</td></tr>
                <tr><td>Balatonkenese</td><td>0.738</td><td>+22.69</td><td>+26.03</td></tr>
                <tr><td>Balatonlelle</td><td>1.224</td><td>+2.28</td><td>+15.28</td></tr>
                <tr><td>Balatonmáriafürdő</td><td>1.083</td><td>-3.87</td><td>-6.58</td></tr>
                <tr><td>Balatonszárszó</td><td>1.101</td><td>+14.28</td><td>+10.71</td></tr>
                <tr><td>Balatonszemes</td><td>1.667</td><td>-2.08</td><td>+12.00</td></tr>
                <tr><td>Bátonyterenye</td><td>0.281</td><td>+9.17</td><td>+25.71</td></tr>
                <tr><td>Békéscsaba</td><td>0.444</td><td>+18.51</td><td>+18.12</td></tr>
                <tr><td>Berettyóújfalu</td><td>0.457</td><td>+2.50</td><td>+10.00</td></tr>
                <tr><td>Biatorbágy</td><td>0.842</td><td>+2.33</td><td>+17.11</td></tr>
                <tr><td>Bicske</td><td>0.475</td><td>+17.15</td><td>+4.92</td></tr>
                <tr><td>Budakeszi</td><td>0.875</td><td>+3.24</td><td>+24.24</td></tr>
                <tr><td>Budaörs</td><td>1.045</td><td>-2.43</td><td>+23.08</td></tr>
                <tr><td>Bugyi</td><td>0.800</td><td>0.00</td><td>+33.85</td></tr>
                <tr><td>Cegléd</td><td>0.638</td><td>+5.43</td><td>+8.07</td></tr>
                <tr><td>Cserszegtomaj</td><td>0.864</td><td>-0.34</td><td>+1.82</td></tr>
                <tr><td>Csongrád</td><td>0.314</td><td>-6.67</td><td>+14.05</td></tr>
                <tr><td>Csömör</td><td>0.833</td><td>-7.89</td><td>-3.77</td></tr>
                <tr><td>Dabas</td><td>0.663</td><td>-0.47</td><td>-4.08</td></tr>
                <tr><td>Debrecen</td><td>1.013</td><td>+2.03</td><td>+20.11</td></tr>
                <tr><td>Délegyháza</td><td>0.877</td><td>+17.22</td><td>+23.94</td></tr>
                <tr><td>Diósd</td><td>1.160</td><td>+3.14</td><td>+37.50</td></tr>
                <tr><td>Dömsöd</td><td>0.495</td><td>+13.10</td><td>+12.64</td></tr>
                <tr><td>Dunaharaszti</td><td>1.010</td><td>+0.05</td><td>+23.84</td></tr>
                <tr><td>Dunakeszi</td><td>0.960</td><td>-0.66</td><td>+11.06</td></tr>
                <tr><td>Dunaújváros</td><td>0.559</td><td>+7.93</td><td>+48.65</td></tr>
                <tr><td>Dunavarsány</td><td>0.966</td><td>+0.38</td><td>+27.91</td></tr>
                <tr><td>Eger</td><td>0.803</td><td>+0.31</td><td>+35.15</td></tr>
                <tr><td>Egyek</td><td>0.048</td><td>+607.05</td><td>+16.00</td></tr>
                <tr><td>Érd</td><td>0.934</td><td>+3.45</td><td>+28.02</td></tr>
                <tr><td>Erdőkertes</td><td>0.875</td><td>-0.61</td><td>+36.36</td></tr>
                <tr><td>Esztergom</td><td>0.594</td><td>-0.47</td><td>-3.77</td></tr>
                <tr><td>Fonyód</td><td>1.285</td><td>+21.36</td><td>+2.56</td></tr>
                <tr><td>Fót</td><td>0.950</td><td>+5.36</td><td>+54.67</td></tr>
                <tr><td>Gárdony</td><td>0.848</td><td>-9.31</td><td>+20.25</td></tr>
                <tr><td>Göd</td><td>0.818</td><td>+0.26</td><td>+35.22</td></tr>
                <tr><td>Gödöllő</td><td>0.983</td><td>+11.88</td><td>+20.69</td></tr>
                <tr><td>Gyál</td><td>0.812</td><td>0.00</td><td>+15.96</td></tr>
                <tr><td>Gyömrő</td><td>0.807</td><td>-7.03</td><td>+38.25</td></tr>
                <tr><td>Gyöngyös</td><td>0.500</td><td>+6.34</td><td>+18.75</td></tr>
                <tr><td>Győr</td><td>0.925</td><td>0.00</td><td>+13.98</td></tr>
                <tr><td>Gyula</td><td>0.559</td><td>+8.02</td><td>+135.19</td></tr>
                <tr><td>Hajdúböszörmény</td><td>0.657</td><td>-4.24</td><td>+11.54</td></tr>
                <tr><td>Hajdúsámson</td><td>0.714</td><td>0.00</td><td>+13.13</td></tr>
                <tr><td>Hajdúszoboszló</td><td>0.825</td><td>+8.45</td><td>+48.18</td></tr>
                <tr><td>Halásztelek</td><td>0.958</td><td>-3.01</td><td>+21.53</td></tr>
                <tr><td>Hatvan</td><td>0.639</td><td>+0.11</td><td>+7.61</td></tr>
                <tr><td>Helvécia</td><td>0.609</td><td>0.00</td><td>+11.76</td></tr>
                <tr><td>Hernád</td><td>0.635</td><td>0.00</td><td>0.00</td></tr>
                <tr><td>Hévíz</td><td>1.227</td><td>+0.33</td><td>+3.47</td></tr>
                <tr><td>Inárcs</td><td>0.891</td><td>0.00</td><td>+14.04</td></tr>
                <tr><td>Isaszeg</td><td>0.640</td><td>-7.76</td><td>+1.20</td></tr>
                <tr><td>Jászberény</td><td>0.545</td><td>-5.89</td><td>+10.42</td></tr>
                <tr><td>Kaposvár</td><td>0.600</td><td>+2.86</td><td>+14.56</td></tr>
                <tr><td>Kecskemét</td><td>0.814</td><td>+2.86</td><td>+24.17</td></tr>
                <tr><td>Kerepes</td><td>0.752</td><td>+12.78</td><td>+27.08</td></tr>
                <tr><td>Keszthely</td><td>1.042</td><td>-16.27</td><td>-15.53</td></tr>
                <tr><td>Kiskunfélegyháza</td><td>0.502</td><td>-2.88</td><td>+12.36</td></tr>
                <tr><td>Kiskunlacháza</td><td>0.823</td><td>-0.50</td><td>+9.59</td></tr>
                <tr><td>Kistarcsa</td><td>1.000</td><td>+7.53</td><td>+39.19</td></tr>
                <tr><td>Kisvárda</td><td>0.411</td><td>+8.46</td><td>-7.23</td></tr>
                <tr><td>Kóka</td><td>0.558</td><td>-8.33</td><td>+4.90</td></tr>
                <tr><td>Komárom</td><td>0.727</td><td>-2.79</td><td>+3.06</td></tr>
                <tr><td>Kőszeg</td><td>0.717</td><td>-0.72</td><td>-1.37</td></tr>
                <tr><td>Lajosmizse</td><td>0.605</td><td>+11.45</td><td>+24.44</td></tr>
                <tr><td>Leányfalu</td><td>0.711</td><td>-2.29</td><td>+27.47</td></tr>
                <tr><td>Letenye</td><td>0.292</td><td>+6.03</td><td>-3.77</td></tr>
                <tr><td>Maglód</td><td>0.985</td><td>0.00</td><td>-6.08</td></tr>
                <tr><td>Marcali</td><td>0.445</td><td>+0.63</td><td>+5.08</td></tr>
                <tr><td>Mende</td><td>0.914</td><td>0.00</td><td>+26.23</td></tr>
                <tr><td>Mezőhegyes</td><td>0.188</td><td>+17.42</td><td>-1.10</td></tr>
                <tr><td>Mezőkövesd</td><td>0.373</td><td>-7.11</td><td>+21.21</td></tr>
                <tr><td>Miskolc</td><td>0.604</td><td>+3.67</td><td>+19.12</td></tr>
                <tr><td>Mogyoród</td><td>0.944</td><td>+0.11</td><td>+43.93</td></tr>
                <tr><td>Mohács</td><td>0.476</td><td>0.00</td><td>+14.29</td></tr>
                <tr><td>Monor</td><td>0.824</td><td>+3.34</td><td>+35.82</td></tr>
                <tr><td>Monorierdő</td><td>0.771</td><td>+18.88</td><td>+58.02</td></tr>
                <tr><td>Mosonmagyaróvár</td><td>0.833</td><td>-1.62</td><td>+9.42</td></tr>
                <tr><td>Nagykálló</td><td>0.388</td><td>+7.43</td><td>+15.38</td></tr>
                <tr><td>Nagykanizsa</td><td>0.543</td><td>+1.14</td><td>+11.26</td></tr>
                <tr><td>Nagykáta</td><td>0.470</td><td>-3.61</td><td>+49.32</td></tr>
                <tr><td>Nagykovácsi</td><td>1.194</td><td>-4.52</td><td>-3.77</td></tr>
                <tr><td>Nagykőrös</td><td>0.399</td><td>+6.20</td><td>+10.26</td></tr>
                <tr><td>Nagytarcsa</td><td>0.880</td><td>0.00</td><td>+45.45</td></tr>
                <tr><td>Nyíregyháza</td><td>0.744</td><td>+0.56</td><td>+6.74</td></tr>
                <tr><td>Ócsa</td><td>0.795</td><td>+11.19</td><td>+50.45</td></tr>
                <tr><td>Orosháza</td><td>0.268</td><td>-1.64</td><td>+9.62</td></tr>
                <tr><td>Őrbottyán</td><td>0.972</td><td>-1.01</td><td>+16.54</td></tr>
                <tr><td>Paks</td><td>0.616</td><td>+6.47</td><td>+3.33</td></tr>
                <tr><td>Pápa</td><td>0.518</td><td>+6.73</td><td>+17.48</td></tr>
                <tr><td>Pécel</td><td>0.760</td><td>-3.64</td><td>+19.38</td></tr>
                <tr><td>Pécs</td><td>0.916</td><td>+1.16</td><td>+26.02</td></tr>
                <tr><td>Pilis</td><td>0.592</td><td>-0.10</td><td>+35.00</td></tr>
                <tr><td>Piliscsaba</td><td>0.876</td><td>+7.09</td><td>+8.97</td></tr>
                <tr><td>Pomáz</td><td>0.999</td><td>+5.43</td><td>+57.00</td></tr>
                <tr><td>Poroszló</td><td>0.404</td><td>-0.91</td><td>+17.46</td></tr>
                <tr><td>Ráckeve</td><td>0.708</td><td>-2.12</td><td>-1.38</td></tr>
                <tr><td>Salgótarján</td><td>0.250</td><td>+5.68</td><td>+7.27</td></tr>
                <tr><td>Siófok</td><td>1.405</td><td>+6.54</td><td>+30.51</td></tr>
                <tr><td>Solymár</td><td>1.080</td><td>+12.81</td><td>+1.37</td></tr>
                <tr><td>Sopron</td><td>0.907</td><td>+5.21</td><td>+4.38</td></tr>
                <tr><td>Sülysáp</td><td>0.624</td><td>-1.32</td><td>+32.77</td></tr>
                <tr><td>Szada</td><td>0.766</td><td>+11.28</td><td>+4.35</td></tr>
                <tr><td>Szeged</td><td>0.965</td><td>+0.60</td><td>+24.32</td></tr>
                <tr><td>Székesfehérvár</td><td>0.902</td><td>-1.30</td><td>+19.47</td></tr>
                <tr><td>Szekszárd</td><td>0.471</td><td>0.00</td><td>+15.89</td></tr>
                <tr><td>Szentendre</td><td>1.066</td><td>+3.56</td><td>+19.76</td></tr>
                <tr><td>Szentes</td><td>0.353</td><td>+0.42</td><td>+9.28</td></tr>
                <tr><td>Szigethalom</td><td>0.772</td><td>+0.02</td><td>+20.72</td></tr>
                <tr><td>Szigetszentmiklós</td><td>0.892</td><td>+7.00</td><td>+18.82</td></tr>
                <tr><td>Szolnok</td><td>0.690</td><td>+4.89</td><td>+24.51</td></tr>
                <tr><td>Szombathely</td><td>0.707</td><td>-3.77</td><td>+17.05</td></tr>
                <tr><td>Tahitótfalu</td><td>0.855</td><td>0.00</td><td>+18.68</td></tr>
                <tr><td>Taksony</td><td>1.023</td><td>+10.39</td><td>+5.88</td></tr>
                <tr><td>Tápiószecső</td><td>0.521</td><td>+2.04</td><td>+20.99</td></tr>
                <tr><td>Tápiószele</td><td>0.415</td><td>+2.57</td><td>-10.34</td></tr>
                <tr><td>Tápiószentmárton</td><td>0.449</td><td>0.00</td><td>+18.84</td></tr>
                <tr><td>Tapolca</td><td>0.590</td><td>-4.26</td><td>+7.69</td></tr>
                <tr><td>Tata</td><td>0.654</td><td>-5.36</td><td>+8.93</td></tr>
                <tr><td>Tatabánya</td><td>0.671</td><td>-1.70</td><td>+15.59</td></tr>
                <tr><td>Tiszafüred</td><td>0.488</td><td>+10.39</td><td>+46.61</td></tr>
                <tr><td>Tiszakécske</td><td>0.492</td><td>0.00</td><td>+18.28</td></tr>
                <tr><td>Tiszavasvári</td><td>0.257</td><td>+2.94</td><td>+1.30</td></tr>
                <tr><td>Tóalmás</td><td>0.550</td><td>+1.54</td><td>+20.45</td></tr>
                <tr><td>Tököl</td><td>0.929</td><td>+5.94</td><td>+25.40</td></tr>
                <tr><td>Törökbálint</td><td>0.968</td><td>+0.81</td><td>+11.36</td></tr>
                <tr><td>Tura</td><td>0.584</td><td>+30.85</td><td>+86.89</td></tr>
                <tr><td>Úri</td><td>0.648</td><td>0.00</td><td>+55.56</td></tr>
                <tr><td>Üllő</td><td>0.918</td><td>-1.13</td><td>+35.06</td></tr>
                <tr><td>Üröm</td><td>1.050</td><td>-0.71</td><td>+7.41</td></tr>
                <tr><td>Vác</td><td>0.926</td><td>-4.54</td><td>+20.50</td></tr>
                <tr><td>Vácrátót</td><td>1.071</td><td>0.00</td><td>+49.35</td></tr>
                <tr><td>Vecsés</td><td>0.898</td><td>-2.36</td><td>+22.54</td></tr>
                <tr><td>Velence</td><td>1.030</td><td>-1.18</td><td>+27.27</td></tr>
                <tr><td>Veresegyház</td><td>0.959</td><td>0.00</td><td>+34.58</td></tr>
                <tr><td>Veszprém</td><td>0.852</td><td>0.00</td><td>+31.18</td></tr>
                <tr><td>Zalaegerszeg</td><td>0.611</td><td>+5.36</td><td>+15.06</td></tr>
                <tr><td>Zalakaros</td><td>0.516</td><td>+3.50</td><td>+1.30</td></tr>
                <tr><td>Zamárdi</td><td>1.500</td><td>+4.27</td><td>+53.41</td></tr>
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

export default Article9Page;