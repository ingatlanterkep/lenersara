// app/blog/[slug]/articles/Article8Page.tsx
'use client';

import React from 'react';
import '../styles/ArticlePage.css';
import '../styles/BlogListPage.css';
import RelatedArticles from '@/components/RelatedArticles';
import FacebookBadge from '@/components/FacebookBadge';

const Article6Page = () => {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Ingatlan-Térkép Index 2026. február: Medián négyzetméterárak és változások Budapesten és vármegyénként",
          "description": "Havi ingatlanpiaci index 2026 februárjában: budapesti kerületi és vármegyei medián négyzetméterárak, valamint januári–februári időszak ártrendjei. Adatalapú elemzés több ezer hirdetésből.",
          "author": { "@type": "Person", "name": "Morán Raul" },
          "publisher": {
            "@type": "Organization",
            "name": "Ingatlan-Térkép",
            "logo": { "@type": "ImageObject", "url": "https://www.ingatlan-terkep.hu/logo.png" }
          },
          "datePublished": "2026-02-28",
          "dateModified": "2026-02-28",
          "image": [
            "https://www.ingatlan-terkep.hu/ingatlan-terkep-index-2026-februar-budapest-keruletek-nmar-hoterkep.png",
            "https://www.ingatlan-terkep.hu/ingatlan-terkep-index-2026-februar-varmegyei-nmar-hoterkep.png"
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.ingatlan-terkep.hu/blog/ingatlan-terkep-index-2026-februar"
          }
        })}
      </script>

      <div className="article-container">
        <div className="article-wrapper">
          <header className="article-header">
            <h1 className="article-title">
              Ingatlan-Térkép Index 2026. február: Négyzetméterárak és ártrendek Budapesten és vármegyénként
            </h1>
            <p className="article-subtitle">
              Medián négyzetméterárak és januári–februári változások – havi ingatlanpiaci index
            </p>
            <p className="article-author">Szerző: Morán Raul | Ingatlan-Térkép, Közzétéve: 2026. február 28.</p>
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
              A 2026. februári időszakban az ingatlanpiac <strong>enyhe emelkedést mutatott Budapesten</strong>, míg vidéken kissé visszaesett. 
              Budapest medián négyzetméterára <strong>1,60 millió Ft/nm</strong>-re nőtt (<strong>+2.38%</strong>), míg vidéken 0.523 millió Ft/nm-re csökkent (<strong>–2.00%</strong>). 
              A legdrágább kerület a <strong>V. kerület</strong> (Belváros-Lipótváros, <strong>2.180 millió Ft/nm</strong>), a legolcsóbb a <strong>XXI. kerület</strong> (Csepel, <strong>0.659 millió Ft/nm</strong>). 
              A legerősebben fejlődő részek a külső budapesti kerületek (<strong>XIX. kerület +12.69%</strong>, <strong>I. kerület +7.87%</strong>, <strong>XVIII. kerület +7.41%</strong>) és <strong>Veszprém vármegye (+6.58%</strong>).
            </p>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-februar-budapest-keruletek-nmar-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár hőtérkép 2026 február – medián nm-árak kerületenként" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek medián négyzetméterárai – 2026. február</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-februar-budapest-keruletek-nmar-valtozas-hoterkep.png" 
                  alt="Budapest kerületi négyzetméterár változás hőtérkép 2026 februári eleje-vége" 
                  loading="lazy"
                />
                <figcaption>Budapest kerületek nm-ár változása (%) – januári–februári időszak</figcaption>
              </figure>
            </div>

            <div className="image-grid">
              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-februar-varmegyei-nmar-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár hőtérkép 2026 február – medián nm-árak vármegyénként" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi medián négyzetméterárai – 2026. február (Budapesttel)</figcaption>
              </figure>

              <figure className="article-figure">
                <img 
                  src="https://ingatlan-terkep.hu/ingatlan-terkep-index-2026-februar-varmegyei-nmar-valtozas-hoterkep.png" 
                  alt="Magyarország vármegyei négyzetméterár változás hőtérkép 2026 februári eleje-vége" 
                  loading="lazy"
                />
                <figcaption>Magyarország vármegyéi nm-ár változása (%) – januári–februári időszak</figcaption>
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
                  <tr><td>V. kerület</td><td>2.180</td></tr>
                  <tr><td>XII. kerület</td><td>1.976</td></tr>
                  <tr><td>I. kerület</td><td>1.972</td></tr>
                  <tr><td>XIII. kerület</td><td>1.967</td></tr>
                  <tr><td>XI. kerület</td><td>1.840</td></tr>
                  <tr><td>III. kerület</td><td>1.838</td></tr>
                  <tr><td>VI. kerület</td><td>1.755</td></tr>
                  <tr><td>II. kerület</td><td>1.744</td></tr>
                  <tr><td>IX. kerület</td><td>1.628</td></tr>
                  <tr><td>XIV. kerület</td><td>1.581</td></tr>
                  <tr><td>VII. kerület</td><td>1.569</td></tr>
                  <tr><td>VIII. kerület</td><td>1.423</td></tr>
                  <tr><td>XIX. kerület</td><td>1.500</td></tr>
                  <tr><td>IV. kerület</td><td>1.191</td></tr>
                  <tr><td>XV. kerület</td><td>1.058</td></tr>
                  <tr><td>XVIII. kerület</td><td>1.016</td></tr>
                  <tr><td>XVI. kerület</td><td>1.014</td></tr>
                  <tr><td>XVII. kerület</td><td>0.883</td></tr>
                  <tr><td>XXII. kerület</td><td>0.882</td></tr>
                  <tr><td>XXIII. kerület</td><td>0.872</td></tr>
                  <tr><td>XX. kerület</td><td>0.854</td></tr>
                  <tr><td>X. kerület</td><td>0.750</td></tr>
                  <tr><td>XXI. kerület</td><td>0.659</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Kerület</th><th>Nm-ár változás<br />(%)</th></tr></thead>
                <tbody>
                  <tr><td>XIX. kerület</td><td>+12.69</td></tr>
                  <tr><td>XXIII. kerület</td><td>+11.03</td></tr>
                  <tr><td>I. kerület</td><td>+7.87</td></tr>
                  <tr><td>XVIII. kerület</td><td>+7.41</td></tr>
                  <tr><td>III. kerület</td><td>+1.92</td></tr>
                  <tr><td>XIII. kerület</td><td>+1.21</td></tr>
                  <tr><td>IX. kerület</td><td>+0.87</td></tr>
                  <tr><td>IV. kerület</td><td>+0.76</td></tr>
                  <tr><td>XIV. kerület</td><td>+0.74</td></tr>
                  <tr><td>VI. kerület</td><td>+0.29</td></tr>
                  <tr><td>XI. kerület</td><td>+0.01</td></tr>
                  <tr><td>VII. kerület</td><td>-0.04</td></tr>
                  <tr><td>II. kerület</td><td>-0.50</td></tr>
                  <tr><td>V. kerület</td><td>-0.43</td></tr>
                  <tr><td>XXII. kerület</td><td>-0.31</td></tr>
                  <tr><td>XVI. kerület</td><td>-2.55</td></tr>
                  <tr><td>XII. kerület</td><td>-3.28</td></tr>
                  <tr><td>VIII. kerület</td><td>-4.81</td></tr>
                  <tr><td>XV. kerület</td><td>-4.90</td></tr>
                  <tr><td>XX. kerület</td><td>-7.38</td></tr>
                  <tr><td>X. kerület</td><td>-21.06</td></tr>
                  <tr><td>XXI. kerület</td><td>-25.64</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Kerület</th><th>Hirdetésszám<br />változás (%)</th></tr></thead>
                <tbody>
                  <tr><td>XVII. kerület</td><td>+46.15</td></tr>
                  <tr><td>XXII. kerület</td><td>+24.63</td></tr>
                  <tr><td>XIII. kerület</td><td>-13.38</td></tr>
                  <tr><td>XII. kerület</td><td>-22.81</td></tr>
                  <tr><td>XI. kerület</td><td>-23.77</td></tr>
                  <tr><td>III. kerület</td><td>-21.90</td></tr>
                  <tr><td>XIV. kerület</td><td>-20.84</td></tr>
                  <tr><td>V. kerület</td><td>-20.62</td></tr>
                  <tr><td>VI. kerület</td><td>-20.75</td></tr>
                  <tr><td>XIX. kerület</td><td>-26.36</td></tr>
                  <tr><td>I. kerület</td><td>-28.40</td></tr>
                  <tr><td>IV. kerület</td><td>-27.06</td></tr>
                  <tr><td>X. kerület</td><td>-27.05</td></tr>
                  <tr><td>IX. kerület</td><td>-26.94</td></tr>
                  <tr><td>II. kerület</td><td>-27.44</td></tr>
                  <tr><td>VII. kerület</td><td>-27.61</td></tr>
                  <tr><td>VIII. kerület</td><td>-31.58</td></tr>
                  <tr><td>XV. kerület</td><td>-31.58</td></tr>
                  <tr><td>XVI. kerület</td><td>-30.30</td></tr>
                  <tr><td>XX. kerület</td><td>-32.58</td></tr>
                  <tr><td>XXI. kerület</td><td>-46.46</td></tr>
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
                  <tr><td>Budapest</td><td>1.600</td></tr>
                  <tr><td>Somogy</td><td>0.963</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>0.800</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>0.690</td></tr>
                  <tr><td>Veszprém</td><td>0.659</td></tr>
                  <tr><td>Pest</td><td>0.624</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>0.589</td></tr>
                  <tr><td>Fejér</td><td>0.530</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>0.515</td></tr>
                  <tr><td>Baranya</td><td>0.420</td></tr>
                  <tr><td>Bács-Kiskun</td><td>0.408</td></tr>
                  <tr><td>Zala</td><td>0.462</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>0.464</td></tr>
                  <tr><td>Vas</td><td>0.396</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>0.339</td></tr>
                  <tr><td>Tolna</td><td>0.315</td></tr>
                  <tr><td>Heves</td><td>0.276</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>0.248</td></tr>
                  <tr><td>Békés</td><td>0.235</td></tr>
                  <tr><td>Nógrád</td><td>0.213</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Helyszín</th><th>Nm-ár változás<br />(%)</th></tr></thead>
                <tbody>
                  <tr><td>Veszprém</td><td>+6.58</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>+0.70</td></tr>
                  <tr><td>Budapest</td><td>+2.38</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>-0.36</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>-0.72</td></tr>
                  <tr><td>Bács-Kiskun</td><td>-1.05</td></tr>
                  <tr><td>Somogy</td><td>-1.10</td></tr>
                  <tr><td>Heves</td><td>-1.01</td></tr>
                  <tr><td>Nógrád</td><td>-1.01</td></tr>
                  <tr><td>Fejér</td><td>-1.24</td></tr>
                  <tr><td>Tolna</td><td>-1.28</td></tr>
                  <tr><td>Zala</td><td>-2.61</td></tr>
                  <tr><td>Pest</td><td>-3.62</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>-3.44</td></tr>
                  <tr><td>Vas</td><td>-4.19</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>-4.58</td></tr>
                  <tr><td>Komárom-Esztergom</td><td>-7.54</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>-7.51</td></tr>
                  <tr><td>Békés</td><td>-8.34</td></tr>
                  <tr><td>Baranya</td><td>-9.47</td></tr>
                </tbody>
              </table>

              <table className="article-table narrow">
                <thead><tr><th>Helyszín</th><th>Hirdetésszám<br />változás (%)</th></tr></thead>
                <tbody>
                  <tr><td>Komárom-Esztergom</td><td>-4.60</td></tr>
                  <tr><td>XIII. kerület</td><td>-13.38</td></tr>
                  <tr><td>Szabolcs-Szatmár-Bereg</td><td>-13.31</td></tr>
                  <tr><td>Heves</td><td>-12.61</td></tr>
                  <tr><td>Bács-Kiskun</td><td>-12.23</td></tr>
                  <tr><td>Hajdú-Bihar</td><td>-15.60</td></tr>
                  <tr><td>Somogy</td><td>-15.18</td></tr>
                  <tr><td>Baranya</td><td>-16.94</td></tr>
                  <tr><td>Vas</td><td>-16.86</td></tr>
                  <tr><td>Zala</td><td>-16.88</td></tr>
                  <tr><td>Borsod-Abaúj-Zemplén</td><td>-17.80</td></tr>
                  <tr><td>Fejér</td><td>-17.04</td></tr>
                  <tr><td>Csongrád-Csanád</td><td>-19.35</td></tr>
                  <tr><td>Pest</td><td>-19.90</td></tr>
                  <tr><td>Jász-Nagykun-Szolnok</td><td>-20.57</td></tr>
                  <tr><td>Veszprém</td><td>-20.88</td></tr>
                  <tr><td>Nógrád</td><td>-26.16</td></tr>
                  <tr><td>Békés</td><td>-24.39</td></tr>
                  <tr><td>Győr-Moson-Sopron</td><td>-33.05</td></tr>
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
              <li>1. XIX. kerület (Kispest): +12.69% nm-ár – külső kerület robbanása</li>
              <li>2. XXIII. kerület: +11.03% nm-ár – erősödő peremkerület</li>
              <li>3. I. kerület (Várkerület): +7.87% nm-ár – belvárosi növekedés</li>
              <li>4. XVIII. kerület: +7.41% nm-ár – stabil külső emelkedés</li>
              <li>5. XVII. kerület (Rákosmente): +46.15% hirdetés – kínálatbővülés</li>
            </ul>
            <p><strong>Top 5 vármegye:</strong></p>
            <ul>
              <li>1. Veszprém: +6.58% nm-ár – Balaton-hatás</li>
              <li>2. Szabolcs-Szatmár-Bereg: +0.70% nm-ár – keleti élénkülés</li>
              <li>3. Budapest: +2.38% nm-ár – fővárosi stabilitás</li>
              <li>4. Hajdú-Bihar: minimális korrekció, de magas ár</li>
              <li>5. Jász-Nagykun-Szolnok: stabil keleti régió</li>
            </ul>
          </section>

          <section className="article-section">
            <h2>Következtetés: Hol drágul, hol stagnál 2026 februárjában?</h2>
            <p>
              A 2026. februári időszakban Budapest enyhén erősödött (<strong>+2.38%</strong>), elsősorban a külső kerületekben (XIX. Kispest +12.69%, I. Várkerület +7.87%, XVIII. +7.41%). A belsőbb részeken (VIII., X., XXI.) korrekció látható. 
            </p>
            <p>
              Vidéken a <strong>Veszprém vármegye</strong> (+6.58%) emelkedett ki a Balaton-hatásnak köszönhetően, míg a keleti és északi megyékben vegyes a kép. A hirdetésszám szinte mindenhol csökkent – a piac lehűlőben van.
            </p>
            <p>
              Összességében: aki olcsóbban keres, a külső budapesti kerületekben és a keleti vármegyékben talál lehetőséget. Prémium szegmensben továbbra is a V. és XII. kerület, valamint a Balaton-part a nyerő. 
              A havi Ingatlan-Térkép Index folytatódik – kövesd a frissítéseket!
            </p>
          </section>

          <section className="article-section">
            <h2>Vidéki városok trendjei (ABC rendben – kivonat az Excelből)</h2>
            <p>A nagyobb vidéki városok medián négyzetméterárai és változásai (részletes Excelben minden adat megtalálható).</p>
            <table className="article-table">
              <thead>
                <tr>
                  <th>Város</th>
                  <th>Medián nm-ár (millió Ft/nm)</th>
                  <th>Nm-ár változás (%)</th>
                                    <th>Hirdetésszsám változás (%)</th>
                </tr>
              </thead>
          <tbody>
                <tr><td>Balatonföldvár</td><td>1.826</td><td>+1.69</td><td>-3.75</td></tr>
                <tr><td>Balatonfüred</td><td>2.187</td><td>+0.01</td><td>-6.56</td></tr>
                <tr><td>Békéscsaba</td><td>0.280</td><td>-18.54</td><td>-29.33</td></tr>
                <tr><td>Budaörs</td><td>1.046</td><td>+0.00</td><td>-12.12</td></tr>
                <tr><td>Cegléd</td><td>0.396</td><td>-17.27</td><td>-24.34</td></tr>
                <tr><td>Debrecen</td><td>0.958</td><td>+0.75</td><td>-16.94</td></tr>
                <tr><td>Dunakeszi</td><td>0.974</td><td>-0.57</td><td>-24.42</td></tr>
                <tr><td>Érd</td><td>0.860</td><td>+0.88</td><td>-15.65</td></tr>
                <tr><td>Esztergom</td><td>0.417</td><td>-18.49</td><td>-8.54</td></tr>
                <tr><td>Fonyód</td><td>1.293</td><td>-9.92</td><td>-23.46</td></tr>
                <tr><td>Gyöngyös</td><td>0.464</td><td>+4.84</td><td>-4.69</td></tr>
                <tr><td>Győr</td><td>0.879</td><td>-2.31</td><td>-36.49</td></tr>
                <tr><td>Hajdúszoboszló</td><td>0.733</td><td>-2.58</td><td>-15.29</td></tr>
                <tr><td>Hévíz</td><td>1.293</td><td>+7.01</td><td>-15.71</td></tr>
                <tr><td>Jászberény</td><td>0.641</td><td>+0.91</td><td>-12.79</td></tr>
                <tr><td>Kecskemét</td><td>0.574</td><td>-0.06</td><td>-11.70</td></tr>
                <tr><td>Keszthely</td><td>0.750</td><td>-1.12</td><td>-19.32</td></tr>
                <tr><td>Marcali</td><td>0.442</td><td>-1.73</td><td>-12.38</td></tr>
                <tr><td>Miskolc</td><td>0.476</td><td>-6.16</td><td>-25.00</td></tr>
                <tr><td>Nagykanizsa</td><td>0.434</td><td>+2.01</td><td>-12.73</td></tr>
                <tr><td>Nyíregyháza</td><td>0.707</td><td>+0.87</td><td>-14.82</td></tr>
                <tr><td>Paks</td><td>0.557</td><td>-3.20</td><td>-8.64</td></tr>
                <tr><td>Pécs</td><td>0.789</td><td>+0.95</td><td>-18.18</td></tr>
                <tr><td>Siófok</td><td>1.351</td><td>+0.05</td><td>-10.41</td></tr>
                <tr><td>Szeged</td><td>0.943</td><td>-1.02</td><td>-13.24</td></tr>
                <tr><td>Székesfehérvár</td><td>0.875</td><td>-0.61</td><td>-20.21</td></tr>
                <tr><td>Szekszárd</td><td>0.422</td><td>-1.48</td><td>-18.44</td></tr>
                <tr><td>Szentendre</td><td>0.991</td><td>+0.17</td><td>-24.32</td></tr>
                <tr><td>Szolnok</td><td>0.617</td><td>+8.79</td><td>-28.03</td></tr>
                <tr><td>Tatabánya</td><td>0.589</td><td>-10.81</td><td>+6.74</td></tr>
                <tr><td>Vác</td><td>0.737</td><td>-5.05</td><td>-18.80</td></tr>
                <tr><td>Zalaegerszeg</td><td>0.483</td><td>-3.33</td><td>-13.95</td></tr>
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

export default Article6Page;