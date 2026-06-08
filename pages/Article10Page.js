'use client';

import React from 'react';
import RelatedArticles from '@/components/RelatedArticles';
import FacebookBadge from '@/components/FacebookBadge';
import '../styles/ArticlePage.css';
import '../styles/BlogListPage.css';

const Article10Page = () => {
  return (
    <>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Ingatlan-Térkép Index 2026. április: Medián négyzetméterárak és változások Budapesten és vármegyénként",
          "description": "Havi ingatlanpiaci index 2026 áprilisában: budapesti kerületi és vármegyei medián négyzetméterárak, valamint márciusi–áprilisi időszak ártrendjei. Adatalapú elemzés több ezer hirdetésből.",
          "author": { "@type": "Person", "name": "Morán Raul" },
          "publisher": {
            "@type": "Organization",
            "name": "Ingatlan-Térkép",
            "logo": { "@type": "ImageObject", "url": "https://www.ingatlan-terkep.hu/logo.png" }
          },
          "datePublished": "2026-04-30",
          "dateModified": "2026-04-30",
          "image": [
            "https://www.ingatlan-terkep.hu/ingatlan-terkep-index-2026-aprilis-budapest-keruletek-nmar-hoterkep.png",
            "https://www.ingatlan-terkep.hu/ingatlan-terkep-index-2026-aprilis-varmegyei-nmar-hoterkep.png"
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.ingatlan-terkep.hu/blog/ingatlan-terkep-index-2026-aprilis"
          }
        })}
      </script>

      <div className="article-container">
        <div className="article-wrapper">
          <header className="article-header">
            <h1 className="article-title">
              Ingatlan-Térkép Index 2026. április: Négyzetméterárak és ártrendek Budapesten és vármegyénként
            </h1>
            <p className="article-subtitle">
              Medián négyzetméterárak és márciusi–áprilisi változások – havi ingatlanpiaci index
            </p>
            <p className="article-author">Szerző: Morán Raul | Ingatlan-Térkép, Közzétéve: 2026. április 30.</p>
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
              A 2026. áprilisi időszakban az ingatlanpiac <strong>enyhe csökkenést mutatott Budapesten</strong>, míg <strong>vidéken enyhe emelkedés</strong> folytatódott. 
              Budapest medián négyzetméterára <strong>1,39 millió Ft/nm</strong>-re csökkent (<strong>-0,78%</strong>), míg vidéken <strong>0,70 millió Ft/nm</strong>-re nőtt (<strong>+2,00%</strong>). 
              A legdrágább kerület a <strong>I. kerület</strong> (Várkerület, <strong>1,998 millió Ft/nm</strong>), a legolcsóbb a <strong>XXIII. kerület</strong> (0,905 millió Ft/nm). 
              A legerősebben fejlődő részek a külső kerületek és bizonyos Balaton-környéki települések.
            </p>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-aprilis-budapest-keruletek-nmar-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár hőtérkép 2026 április – medián nm-árak kerületenként" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek medián négyzetméterárai – 2026. április</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-aprilis-budapest-keruletek-nmar-valtozas-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár változás hőtérkép 2026 márciusi–áprilisi időszak" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek nm-ár változása (%) – márciusi–áprilisi időszak</figcaption>
              </figure>
            </div>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-aprilis-varmegyei-nmar-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár hőtérkép 2026 április – medián nm-árak vármegyénként" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi medián négyzetméterárai – 2026. április (Budapesttel)</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-aprilis-varmegyei-nmar-valtozas-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár változás hőtérkép 2026 márciusi–áprilisi időszak" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi nm-ár változása (%) – márciusi–áprilisi időszak</figcaption>
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
                  <tr><td>V. kerület</td><td>2.091</td></tr>
                  <tr><td>I. kerület</td><td>1.998</td></tr>
                  <tr><td>XII. kerület</td><td>1.935</td></tr>
                  <tr><td>XIII. kerület</td><td>1.769</td></tr>
                  <tr><td>II. kerület</td><td>1.744</td></tr>
                  <tr><td>XI. kerület</td><td>1.709</td></tr>
                  <tr><td>VI. kerület</td><td>1.571</td></tr>
                  <tr><td>VII. kerület</td><td>1.514</td></tr>
                  <tr><td>III. kerület</td><td>1.506</td></tr>
                  <tr><td>IX. kerület</td><td>1.468</td></tr>
                  <tr><td>XIV. kerület</td><td>1.402</td></tr>
                  <tr><td>VIII. kerület</td><td>1.330</td></tr>
                  <tr><td>IV. kerület</td><td>1.279</td></tr>
                  <tr><td>XXII. kerület</td><td>1.144</td></tr>
                  <tr><td>XIX. kerület</td><td>1.149</td></tr>
                  <tr><td>XV. kerület</td><td>1.149</td></tr>
                  <tr><td>XVI. kerület</td><td>1.139</td></tr>
                  <tr><td>X. kerület</td><td>1.106</td></tr>
                  <tr><td>XX. kerület</td><td>1.043</td></tr>
                  <tr><td>XVII. kerület</td><td>1.021</td></tr>
                  <tr><td>XXI. kerület</td><td>1.000</td></tr>
                  <tr><td>XVIII. kerület</td><td>0.990</td></tr>
                  <tr><td>XXIII. kerület</td><td>0.905</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Kerület</th><th>Nm-ár változás<br />(%)</th></tr></thead>
                <tbody>
                  <tr><td>XX. kerület</td><td>+2.42</td></tr>
                  <tr><td>XVI. kerület</td><td>+1.59</td></tr>
                  <tr><td>XIX. kerület</td><td>+1.39</td></tr>
                  <tr><td>III. kerület</td><td>+1.05</td></tr>
                  <tr><td>XIII. kerület</td><td>+0.30</td></tr>
                  <tr><td>VII. kerület</td><td>+0.20</td></tr>
                  <tr><td>IV. kerület</td><td>+0.10</td></tr>
                  <tr><td>V. kerület</td><td>+0.03</td></tr>
                  <tr><td>XXIII. kerület</td><td>0.00</td></tr>
                  <tr><td>X. kerület</td><td>0.00</td></tr>
                  <tr><td>XVII. kerület</td><td>0.00</td></tr>
                  <tr><td>XI. kerület</td><td>-0.33</td></tr>
                  <tr><td>XV. kerület</td><td>-0.52</td></tr>
                  <tr><td>XIV. kerület</td><td>-0.62</td></tr>
                  <tr><td>IX. kerület</td><td>-0.87</td></tr>
                  <tr><td>XVIII. kerület</td><td>-1.04</td></tr>
                  <tr><td>II. kerület</td><td>-1.68</td></tr>
                  <tr><td>XXII. kerület</td><td>-2.62</td></tr>
                  <tr><td>XXI. kerület</td><td>-2.65</td></tr>
                  <tr><td>XII. kerület</td><td>-3.16</td></tr>
                  <tr><td>VIII. kerület</td><td>-4.05</td></tr>
                  <tr><td>VI. kerület</td><td>-4.59</td></tr>
                  <tr><td>I. kerület</td><td>-5.84</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Kerület</th><th>Hirdetésszám<br />változás (%)</th></tr></thead>
                <tbody>
                  <tr><td>I. kerület</td><td>+18.98</td></tr>
                  <tr><td>II. kerület</td><td>+21.00</td></tr>
                  <tr><td>III. kerület</td><td>+18.01</td></tr>
                  <tr><td>IV. kerület</td><td>+14.34</td></tr>
                  <tr><td>V. kerület</td><td>+20.86</td></tr>
                  <tr><td>VI. kerület</td><td>+15.76</td></tr>
                  <tr><td>VII. kerület</td><td>+18.42</td></tr>
                  <tr><td>VIII. kerület</td><td>+20.62</td></tr>
                  <tr><td>IX. kerület</td><td>+17.97</td></tr>
                  <tr><td>X. kerület</td><td>+17.58</td></tr>
                  <tr><td>XI. kerület</td><td>+20.16</td></tr>
                  <tr><td>XII. kerület</td><td>+6.53</td></tr>
                  <tr><td>XIII. kerület</td><td>+12.16</td></tr>
                  <tr><td>XIV. kerület</td><td>+29.22</td></tr>
                  <tr><td>XV. kerület</td><td>+18.31</td></tr>
                  <tr><td>XVI. kerület</td><td>+21.02</td></tr>
                  <tr><td>XVII. kerület</td><td>+14.49</td></tr>
                  <tr><td>XVIII. kerület</td><td>+21.36</td></tr>
                  <tr><td>XIX. kerület</td><td>+15.74</td></tr>
                  <tr><td>XX. kerület</td><td>+29.22</td></tr>
                  <tr><td>XXI. kerület</td><td>+37.47</td></tr>
                  <tr><td>XXII. kerület</td><td>+14.59</td></tr>
                  <tr><td>XXIII. kerület</td><td>+24.31</td></tr>
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
                  <tr><td>Budapest</td><td>1.387</td></tr>
                  <tr><td>Somogy</td><td>1.106</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>0.867</td></tr>
                  <tr><td>Pest</td><td>0.823</td></tr>                  
                  <tr><td>Hajdú-Bihar</td><td>0.797</td></tr>
                  <tr><td>Baranya</td><td>0.792</td></tr>
                  <tr><td>Veszprém</td><td>0.788</td></tr>                  
                  <tr><td>Csongrád-Csanád</td><td>0.759</td></tr>
                  <tr><td>Fejér</td><td>0.676</td></tr>
                  <tr><td>Bács-Kiskun</td><td>0.658</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>0.590</td></tr>
                  <tr><td>Vas</td><td>0.558</td></tr>                  
                  <tr><td>Zala</td><td>0.514</td></tr>
                  <tr><td>Heves</td><td>0.495</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>0.465</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>0.439</td></tr>                  
                  <tr><td>Jász-Nagykun-Szolnok</td><td>0.357</td></tr>
                  <tr><td>Tolna</td><td>0.347</td></tr>
                  <tr><td>Békés</td><td>0.283</td></tr>
                  <tr><td>Nógrád</td><td>0.281</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Helyszín</th><th>Nm-ár változás<br />(%)</th></tr></thead>
                <tbody>
                  <tr><td>Komárom-Esztergom</td><td>+7.09</td></tr>
                  <tr><td>Baranya</td><td>+6.70</td></tr>
                  <tr><td>Bács-Kiskun</td><td>+5.24</td></tr>
                  <tr><td>Békés</td><td>+5.06</td></tr>
                  <tr><td>Tolna</td><td>+4.09</td></tr>
                  <tr><td>Heves</td><td>+3.52</td></tr>
                  <tr><td>Veszprém</td><td>+3.20</td></tr>
                  <tr><td>Zala</td><td>+2.89</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>+2.29</td></tr>
                  <tr><td>Nógrád</td><td>+2.03</td></tr>
                  <tr><td>Pest</td><td>+2.02</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>+1.30</td></tr>
                  <tr><td>Somogy</td><td>+1.14</td></tr>
                  <tr><td>Fejér</td><td>+0.19</td></tr>
                  <tr><td>Vas</td><td>+0.09</td></tr>
                  <tr><td>Budapest</td><td>-0.78</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>-1.11</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>-1.41</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>-4.07</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>-6.04</td></tr>                  
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Helyszín</th><th>Hirdetésszám<br />változás (%)</th></tr></thead>
                <tbody>
                  <tr><td>Bács-Kiskun</td><td>+20.55</td></tr>
                  <tr><td>Baranya</td><td>+35.00</td></tr>
                  <tr><td>Békés</td><td>+21.72</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>-3.38</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>+14.63</td></tr>
                  <tr><td>Fejér</td><td>+19.44</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>+7.12</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>+5.04</td></tr>
                  <tr><td>Heves</td><td>+9.78</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>+10.66</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>+16.25</td></tr>
                  <tr><td>Nógrád</td><td>+7.62</td></tr>
                  <tr><td>Pest</td><td>+18.91</td></tr>
                  <tr><td>Somogy</td><td>+2.34</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>+26.07</td></tr>
                  <tr><td>Tolna</td><td>+7.20</td></tr>
                  <tr><td>Vas</td><td>+11.92</td></tr>
                  <tr><td>Veszprém</td><td>+7.16</td></tr>
                  <tr><td>Zala</td><td>+4.39</td></tr>
                  <tr><td>Budapest</td><td>+18.91</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="article-section">
            <h2>Legerősebben fejlődő kerületek és vármegyék</h2>
            <p>
              Összességében a fejlődést az nm-ár növekedés és hirdetésszám bővülés alapján rangsoroljuk.
            </p>
            <p><strong>Top 5 budapesti kerület (nm-ár emelkedés alapján):</strong></p>
            <ul>
              <li>1. XX. kerület: +2.42% nm-ár</li>
              <li>2. XVI. kerület: +1.59% nm-ár</li>
              <li>3. XIX. kerület: +1.39% nm-ár</li>
              <li>4. III. kerület: +1.05% nm-ár</li>
              <li>5. XIII. kerület: +0.30% nm-ár</li>
            </ul>
            <p><strong>Top 5 vármegye:</strong></p>
            <ul>
              <li>1. Baranya: +6.70% nm-ár</li>
              <li>2. Komárom-Esztergom: +7.09% nm-ár</li>
              <li>3. Bács-Kiskun: +5.24% nm-ár</li>
              <li>4. Tolna: +4.09% nm-ár</li>
              <li>5. Heves: +3.52% nm-ár</li>
            </ul>
          </section>

          <section className="article-section">
            <h2>Következtetés: Hol drágul, hol stagnál 2026 áprilisában?</h2>
            <p>
              A 2026. áprilisi időszakban Budapest enyhén korrigált (<strong>-0,78%</strong>), elsősorban a belsőbb és magasabb árkategóriájú kerületekben. A külső kerületek (XVI., XIX., XX.) stabilabbak vagy enyhén erősödtek. 
            </p>
            <p>
              <strong>Vidéken</strong> az emelkedés folytatódott több megyében (Baranya, Komárom-Esztergom, Bács-Kiskun). A hirdetésszám szinte mindenhol nőtt, ami élénkebb kínálatot jelez.
            </p>
            <p>
              Összességében: aki olcsóbban keres, a külső budapesti kerületekben és keleti/dél-dunántúli vármegyékben talál lehetőséget. Prémium szegmensben a I., V. és XII. kerület, valamint a Balaton-part továbbra is erős.
            </p>
          </section>

          <section className="article-section">
            <h2>Vidéki városok trendjei (ABC rendben – teljes lista az Excel alapján)</h2>
            <p>A nagyobb vidéki városok medián négyzetméterárai, azok változása és a hirdetésszám változása (teljes adatbázis alapján).</p>
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
                <tr><td>Abádszalók</td><td>0.645</td><td>+35.18</td><td>-2.67</td></tr>
                <tr><td>Abony</td><td>0.393</td><td>-1.88</td><td>+17.05</td></tr>
                <tr><td>Ajka</td><td>0.621</td><td>+14.44</td><td>+17.91</td></tr>
                <tr><td>Albertirsa</td><td>0.720</td><td>+5.70</td><td>+27.98</td></tr>
                <tr><td>Alsónémedi</td><td>0.653</td><td>+4.05</td><td>-7.89</td></tr>
                <tr><td>Alsóörs</td><td>1.500</td><td>0.00</td><td>-3.13</td></tr>
                <tr><td>Baja</td><td>0.468</td><td>+3.26</td><td>+1.56</td></tr>
                <tr><td>Balatonakarattya</td><td>1.817</td><td>0.00</td><td>-8.42</td></tr>
                <tr><td>Balatonalmádi</td><td>1.561</td><td>-0.16</td><td>+11.46</td></tr>
                <tr><td>Balatonboglár</td><td>0.998</td><td>+2.07</td><td>+4.35</td></tr>
                <tr><td>Balatonfenyves</td><td>1.313</td><td>0.00</td><td>+2.90</td></tr>
                <tr><td>Balatonföldvár</td><td>1.841</td><td>-0.76</td><td>+3.91</td></tr>
                <tr><td>Balatonfüred</td><td>1.550</td><td>-0.26</td><td>+12.50</td></tr>
                <tr><td>Balatonkenese</td><td>0.916</td><td>+24.04</td><td>+19.57</td></tr>
                <tr><td>Balatonlelle</td><td>1.210</td><td>-1.21</td><td>+14.46</td></tr>
                <tr><td>Balatonmáriafürdő</td><td>1.110</td><td>+2.42</td><td>-4.23</td></tr>
                <tr><td>Balatonszárszó</td><td>0.957</td><td>-13.08</td><td>-11.29</td></tr>
                <tr><td>Balatonszemes</td><td>1.667</td><td>0.00</td><td>+1.79</td></tr>
                <tr><td>Bátonyterenye</td><td>0.261</td><td>-7.09</td><td>+7.95</td></tr>
                <tr><td>Békéscsaba</td><td>0.414</td><td>-6.78</td><td>+11.93</td></tr>
                <tr><td>Berettyóújfalu</td><td>0.457</td><td>0.00</td><td>+21.82</td></tr>
                <tr><td>Biatorbágy</td><td>0.876</td><td>+4.08</td><td>+15.73</td></tr>
                <tr><td>Bicske</td><td>0.568</td><td>+19.49</td><td>+12.50</td></tr>
                <tr><td>Budakalász</td><td>1.127</td><td>+5.63</td><td>+20.75</td></tr>
                <tr><td>Budakeszi</td><td>0.875</td><td>0.00</td><td>+18.70</td></tr>
                <tr><td>Budaörs</td><td>1.111</td><td>+6.29</td><td>+31.25</td></tr>
                <tr><td>Bugyi</td><td>0.800</td><td>0.00</td><td>+8.05</td></tr>
                <tr><td>Cegléd</td><td>0.613</td><td>-3.92</td><td>+20.45</td></tr>
                <tr><td>Cserszegtomaj</td><td>0.879</td><td>+1.76</td><td>+1.79</td></tr>
                <tr><td>Csongrád</td><td>0.315</td><td>+0.27</td><td>+13.77</td></tr>
                <tr><td>Csömör</td><td>0.956</td><td>+14.71</td><td>+17.65</td></tr>
                <tr><td>Dabas</td><td>0.750</td><td>+13.13</td><td>+22.13</td></tr>
                <tr><td>Debrecen</td><td>1.025</td><td>+1.17</td><td>+4.84</td></tr>
                <tr><td>Délegyháza</td><td>0.939</td><td>+7.13</td><td>+29.55</td></tr>
                <tr><td>Diósd</td><td>1.135</td><td>-2.12</td><td>+18.83</td></tr>
                <tr><td>Dömsöd</td><td>0.577</td><td>+16.54</td><td>+33.67</td></tr>
                <tr><td>Dunaföldvár</td><td>0.569</td><td>+26.34</td><td>+19.12</td></tr>
                <tr><td>Dunaharaszti</td><td>1.009</td><td>-0.10</td><td>+28.34</td></tr>
                <tr><td>Dunakeszi</td><td>1.000</td><td>+4.14</td><td>+54.79</td></tr>
                <tr><td>Dunaújváros</td><td>0.538</td><td>-3.85</td><td>+22.73</td></tr>
                <tr><td>Dunavarsány</td><td>0.939</td><td>-2.77</td><td>+1.82</td></tr>
                <tr><td>Eger</td><td>0.796</td><td>-0.83</td><td>+18.16</td></tr>
                <tr><td>Egyek</td><td>0.052</td><td>+7.77</td><td>+1.72</td></tr>
                <tr><td>Érd</td><td>0.935</td><td>+0.12</td><td>+16.90</td></tr>
                <tr><td>Erdőkertes</td><td>0.875</td><td>0.00</td><td>+22.78</td></tr>
                <tr><td>Esztergom</td><td>0.644</td><td>+8.31</td><td>+30.07</td></tr>
                <tr><td>Fonyód</td><td>1.296</td><td>+0.81</td><td>-6.25</td></tr>
                <tr><td>Fót</td><td>0.955</td><td>+0.54</td><td>+34.45</td></tr>
                <tr><td>Gárdony</td><td>0.790</td><td>-6.88</td><td>+29.47</td></tr>
                <tr><td>Göd</td><td>0.818</td><td>0.00</td><td>+11.63</td></tr>
                <tr><td>Gödöllő</td><td>1.000</td><td>+1.69</td><td>+21.30</td></tr>
                <tr><td>Gyál</td><td>0.819</td><td>+0.90</td><td>+7.02</td></tr>
                <tr><td>Gyömrő</td><td>0.750</td><td>-7.05</td><td>+15.02</td></tr>
                <tr><td>Gyöngyös</td><td>0.500</td><td>0.00</td><td>+7.02</td></tr>
                <tr><td>Győr</td><td>0.919</td><td>-0.67</td><td>+12.44</td></tr>
                <tr><td>Gyula</td><td>0.567</td><td>+1.37</td><td>+19.69</td></tr>
                <tr><td>Hajdúböszörmény</td><td>0.689</td><td>+4.83</td><td>+2.59</td></tr>
                <tr><td>Hajdúnánás</td><td>0.560</td><td>+30.90</td><td>+24.53</td></tr>
                <tr><td>Hajdúsámson</td><td>0.729</td><td>+2.08</td><td>-6.25</td></tr>
                <tr><td>Hajdúszoboszló</td><td>0.825</td><td>0.00</td><td>+3.07</td></tr>
                <tr><td>Halásztelek</td><td>0.958</td><td>0.00</td><td>+8.00</td></tr>
                <tr><td>Hatvan</td><td>0.658</td><td>+2.99</td><td>+12.12</td></tr>
                <tr><td>Helvécia</td><td>0.593</td><td>-2.67</td><td>+36.84</td></tr>
                <tr><td>Hernád</td><td>0.618</td><td>-2.68</td><td>+9.09</td></tr>
                <tr><td>Hévíz</td><td>1.223</td><td>-0.33</td><td>+6.22</td></tr>
                <tr><td>Hódmezővásárhely</td><td>0.474</td><td>+3.53</td><td>+44.07</td></tr>
                <tr><td>Inárcs</td><td>0.820</td><td>-7.96</td><td>+7.69</td></tr>
                <tr><td>Isaszeg</td><td>0.695</td><td>+8.65</td><td>+16.67</td></tr>
                <tr><td>Jászberény</td><td>0.562</td><td>+2.98</td><td>-5.03</td></tr>
                <tr><td>Jászfényszaru</td><td>0.393</td><td>0.00</td><td>+29.09</td></tr>
                <tr><td>Kaposvár</td><td>0.613</td><td>+2.08</td><td>-7.63</td></tr>
                <tr><td>Kecskemét</td><td>0.815</td><td>+0.20</td><td>+23.89</td></tr>
                <tr><td>Kerepes</td><td>0.752</td><td>0.00</td><td>+1.64</td></tr>
                <tr><td>Keszthely</td><td>1.041</td><td>-0.12</td><td>+9.77</td></tr>
                <tr><td>Kiskunfélegyháza</td><td>0.579</td><td>+15.44</td><td>+33.00</td></tr>
                <tr><td>Kiskunlacháza</td><td>0.826</td><td>+0.39</td><td>+2.50</td></tr>
                <tr><td>Kistarcsa</td><td>0.931</td><td>-6.94</td><td>+20.39</td></tr>
                <tr><td>Kisvárda</td><td>0.444</td><td>+8.11</td><td>+31.17</td></tr>
                <tr><td>Kóka</td><td>0.532</td><td>-4.56</td><td>-3.27</td></tr>
                <tr><td>Komárom</td><td>0.726</td><td>-0.08</td><td>-2.97</td></tr>
                <tr><td>Kőszeg</td><td>0.730</td><td>+1.74</td><td>+8.33</td></tr>
                <tr><td>Lajosmizse</td><td>0.588</td><td>-2.89</td><td>+25.89</td></tr>
                <tr><td>Leányfalu</td><td>0.694</td><td>-2.35</td><td>+6.03</td></tr>
                <tr><td>Maglód</td><td>0.985</td><td>0.00</td><td>+27.65</td></tr>
                <tr><td>Marcali</td><td>0.463</td><td>+3.95</td><td>+4.03</td></tr>
                <tr><td>Mende</td><td>1.011</td><td>+10.58</td><td>+38.96</td></tr>
                <tr><td>Mezőhegyes</td><td>0.191</td><td>+1.75</td><td>+14.44</td></tr>
                <tr><td>Mezőkövesd</td><td>0.398</td><td>+6.86</td><td>+6.25</td></tr>
                <tr><td>Miskolc</td><td>0.608</td><td>+0.71</td><td>-6.00</td></tr>
                <tr><td>Mogyoród</td><td>0.943</td><td>-0.11</td><td>+34.94</td></tr>
                <tr><td>Mohács</td><td>0.483</td><td>+1.39</td><td>+34.72</td></tr>
                <tr><td>Monor</td><td>0.914</td><td>+10.93</td><td>+21.38</td></tr>
                <tr><td>Monorierdő</td><td>0.769</td><td>-0.29</td><td>+25.00</td></tr>
                <tr><td>Mosonmagyaróvár</td><td>0.874</td><td>+4.95</td><td>+13.91</td></tr>
                <tr><td>Nagykálló</td><td>0.370</td><td>-4.56</td><td>+60.00</td></tr>
                <tr><td>Nagykanizsa</td><td>0.562</td><td>+3.41</td><td>+4.60</td></tr>
                <tr><td>Nagykáta</td><td>0.460</td><td>-2.18</td><td>+11.01</td></tr>
                <tr><td>Nagykovácsi</td><td>1.288</td><td>+7.89</td><td>+17.65</td></tr>
                <tr><td>Nagykőrös</td><td>0.394</td><td>-1.26</td><td>+42.64</td></tr>
                <tr><td>Nagytarcsa</td><td>0.975</td><td>+10.80</td><td>+41.07</td></tr>
                <tr><td>Nőtincs</td><td>0.978</td><td>0.00</td><td>+13.21</td></tr>
                <tr><td>Nyíregyháza</td><td>0.755</td><td>+1.37</td><td>+20.76</td></tr>
                <tr><td>Ócsa</td><td>0.795</td><td>0.00</td><td>+5.99</td></tr>
                <tr><td>Orosháza</td><td>0.305</td><td>+13.93</td><td>+13.16</td></tr>
                <tr><td>Őrbottyán</td><td>0.985</td><td>+1.30</td><td>+36.49</td></tr>
                <tr><td>Paks</td><td>0.714</td><td>+15.87</td><td>+2.15</td></tr>
                <tr><td>Pápa</td><td>0.500</td><td>-3.51</td><td>+19.83</td></tr>
                <tr><td>Pécel</td><td>0.808</td><td>+6.28</td><td>+21.99</td></tr>
                <tr><td>Pécs</td><td>0.931</td><td>+1.63</td><td>+41.92</td></tr>
                <tr><td>Pilis</td><td>0.584</td><td>-1.33</td><td>+16.30</td></tr>
                <tr><td>Piliscsaba</td><td>0.876</td><td>0.00</td><td>-2.35</td></tr>
                <tr><td>Pomáz</td><td>0.899</td><td>-10.05</td><td>+17.20</td></tr>
                <tr><td>Poroszló</td><td>0.400</td><td>-0.92</td><td>-1.35</td></tr>
                <tr><td>Pusztaszabolcs</td><td>0.817</td><td>+3.52</td><td>+41.51</td></tr>
                <tr><td>Ráckeve</td><td>0.706</td><td>-0.38</td><td>+7.48</td></tr>
                <tr><td>Salgótarján</td><td>0.250</td><td>+0.18</td><td>+3.39</td></tr>
                <tr><td>Siklós</td><td>0.658</td><td>+3.97</td><td>+9.09</td></tr>
                <tr><td>Siófok</td><td>1.435</td><td>+2.07</td><td>+2.38</td></tr>
                <tr><td>Solymár</td><td>1.012</td><td>-6.33</td><td>+56.76</td></tr>
                <tr><td>Sopron</td><td>0.917</td><td>+1.02</td><td>+27.97</td></tr>
                <tr><td>Sülysáp</td><td>0.611</td><td>-2.16</td><td>+9.36</td></tr>
                <tr><td>Szada</td><td>0.865</td><td>+12.98</td><td>+11.46</td></tr>
                <tr><td>Százhalombatta</td><td>1.009</td><td>+5.76</td><td>+15.38</td></tr>
                <tr><td>Szeged</td><td>0.968</td><td>+0.32</td><td>+10.27</td></tr>
                <tr><td>Székesfehérvár</td><td>0.936</td><td>+3.82</td><td>+16.30</td></tr>
                <tr><td>Szekszárd</td><td>0.472</td><td>+0.33</td><td>+1.71</td></tr>
                <tr><td>Szentendre</td><td>1.059</td><td>-0.67</td><td>+28.25</td></tr>
                <tr><td>Szentes</td><td>0.354</td><td>+0.35</td><td>+26.89</td></tr>
                <tr><td>Szigethalom</td><td>0.780</td><td>+1.14</td><td>+32.09</td></tr>
                <tr><td>Szigetszentmiklós</td><td>0.942</td><td>+5.65</td><td>0.00</td></tr>
                <tr><td>Szolnok</td><td>0.647</td><td>-6.24</td><td>+12.20</td></tr>
                <tr><td>Szombathely</td><td>0.730</td><td>+3.37</td><td>+9.45</td></tr>
                <tr><td>Sződliget</td><td>1.059</td><td>-4.36</td><td>+1.92</td></tr>
                <tr><td>Tahitótfalu</td><td>0.724</td><td>-15.26</td><td>-12.04</td></tr>
                <tr><td>Taksony</td><td>1.018</td><td>-0.44</td><td>+8.33</td></tr>
                <tr><td>Tápiószecső</td><td>0.513</td><td>-1.49</td><td>+12.24</td></tr>
                <tr><td>Tápiószele</td><td>0.473</td><td>+14.15</td><td>+7.69</td></tr>
                <tr><td>Tápiószentmárton</td><td>0.495</td><td>+10.16</td><td>0.00</td></tr>
                <tr><td>Tapolca</td><td>0.553</td><td>-6.35</td><td>-1.79</td></tr>
                <tr><td>Tata</td><td>0.663</td><td>+1.32</td><td>+18.03</td></tr>
                <tr><td>Tatabánya</td><td>0.703</td><td>+4.80</td><td>+5.58</td></tr>
                <tr><td>Tiszafüred</td><td>0.492</td><td>+0.70</td><td>+5.20</td></tr>
                <tr><td>Tiszakécske</td><td>0.511</td><td>+3.77</td><td>+30.00</td></tr>
                <tr><td>Tiszavasvári</td><td>0.211</td><td>-17.93</td><td>+23.08</td></tr>
                <tr><td>Tóalmás</td><td>0.550</td><td>0.00</td><td>+12.26</td></tr>
                <tr><td>Tököl</td><td>0.933</td><td>+0.36</td><td>+32.91</td></tr>
                <tr><td>Törökbálint</td><td>1.179</td><td>+21.71</td><td>+57.14</td></tr>
                <tr><td>Tura</td><td>0.591</td><td>+1.10</td><td>-6.14</td></tr>
                <tr><td>Úri</td><td>0.622</td><td>-4.00</td><td>+27.38</td></tr>
                <tr><td>Üllő</td><td>0.918</td><td>0.00</td><td>+14.42</td></tr>
                <tr><td>Üröm</td><td>0.992</td><td>-5.48</td><td>+25.29</td></tr>
                <tr><td>Vác</td><td>0.996</td><td>+7.52</td><td>+22.87</td></tr>
                <tr><td>Vácrátót</td><td>1.071</td><td>0.00</td><td>+53.91</td></tr>
                <tr><td>Vecsés</td><td>0.893</td><td>-0.57</td><td>+2.43</td></tr>
                <tr><td>Velence</td><td>1.028</td><td>-0.17</td><td>+13.10</td></tr>
                <tr><td>Veresegyház</td><td>1.000</td><td>+4.25</td><td>+37.50</td></tr>
                <tr><td>Veszprém</td><td>0.892</td><td>+4.62</td><td>+18.85</td></tr>
                <tr><td>Zalaegerszeg</td><td>0.613</td><td>+0.32</td><td>+1.29</td></tr>
                <tr><td>Zalakaros</td><td>0.544</td><td>+5.50</td><td>+10.26</td></tr>
                <tr><td>Zamárdi</td><td>1.506</td><td>+0.41</td><td>+6.67</td></tr>
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

export default Article10Page;