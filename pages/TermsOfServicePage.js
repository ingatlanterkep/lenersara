'use client';

import React from 'react';
import '../styles/PrivacyPolicyPage.css';

const TermsOfServicePage = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <div className="privacy-policy-header">
          <h1 className="privacy-policy-title">Általános Szerződési Feltételek (ÁSZF)</h1>
          <p className="privacy-policy-subtitle">Hatályos: 2026. február 24-től</p>
        </div>

        <div className="privacy-policy-section">
          <h2>I. A Szolgáltató adatai</h2>
          <p>Morán Raul egyéni vállalkozó</p>
          <table className="policy-table">
            <tbody>
              <tr><td>Székhely</td><td>2251 Tápiószecső, Gergely-kereszt dűlő 1.</td></tr>
              <tr><td>Adószám</td><td>90919457-1-33</td></tr>
              <tr><td>Nyilvántartási szám</td><td>60273219</td></tr>
              <tr><td>E-mail</td><td>kapcsolat@ingatlan-terkep.hu</td></tr>
              <tr><td>Telefon</td><td>+36 20 624 0061</td></tr>
            </tbody>
          </table>
        </div>

        <div className="privacy-policy-section">
          <h2>II. Fogalmak</h2>
          <ul className="supported-systems-list">
            <li><strong>Szolgáltatás</strong>: Az ingatlan-terkep.hu weboldal és kapcsolódó szolgáltatások (hirdetésfeladás, térképes megjelenítés, kiemelések, csomagok, kreditrendszer stb.).</li>
            <li><strong>Felhasználó</strong>: Regisztrált természetes személy (magánszemély) vagy jogi személy/egyéni vállalkozó (iroda).</li>
            <li><strong>Hirdető</strong>: A Felhasználó, aki hirdetést tölt fel.</li>
            <li><strong>Fogyasztó</strong>: A szakmája, önálló foglalkozása vagy üzleti tevékenysége körén kívül eljáró természetes személy.</li>
          </ul>
        </div>

        <div className="privacy-policy-section">
          <h2>III. A szolgáltatás leírása és szerződéskötés</h2>
          <p>Az ingatlan-terkep.hu egy térképalapú ingatlanhirdetési felület. Magánszemélyek és ingatlanközvetítők regisztrálhatnak, hirdetéseket tölthetnek fel, amelyek térképen jelennek meg.</p>
          <p>A Szolgáltatás igénybevétele regisztrációhoz kötött. A regisztrációval, bejelentkezéssel, hirdetésfeladással, csomag/kredit vásárlással, valamint külső ügyviteli rendszerekből (Ingatlanforrás, Házbank, Hirdetéskezelés) történő XML/API áttöltéssel a Felhasználó elfogadja jelen ÁSZF-et és az Adatvédelmi Tájékoztatót. Ez elektronikus úton megkötött szerződésnek minősül.</p>
          <p>A szerződéskötés elektronikus úton történik, a Szolgáltató nem iktatja a szerződést, az utólag nem hozzáférhető. A szerződés tartalma a jelen ÁSZF-ben rögzített feltételek szerint érvényes.</p>
          <p>A Szolgáltató nem közvetítő, nem vállal felelősséget a hirdetések tartalmáért, valóságtartalmáért vagy a felek közötti ügyletért.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>IV. Regisztráció és felhasználói fiók (magánszemélyek)</h2>
          <p>A magánszemélyek (természetes személyek) a weboldalon közvetlenül regisztrálhatnak. A regisztrációhoz valós e-mail cím és egyéb adatok megadása kötelező. A regisztrációval a Felhasználó elfogadja jelen ÁSZF-et és az Adatvédelmi Tájékoztatót.</p>
          <p>Egy magánszemély csak egy fiókot tarthat fenn. A Szolgáltató jogosult a fiókot felfüggeszteni vagy törölni, ha hamis adatok kerültek megadásra, visszaélés történik, vagy jogszabálysértés gyanúja merül fel.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>V. Irodai / közvetítői regisztráció és integráció</h2>
          <p>Ingatlanirodák és ingatlanközvetítők (nem természetes személyek) a regisztrációt jellemzően nem közvetlenül a weboldalon végzik, hanem külső ügyviteli rendszereken keresztül történő XML/API importtal.</p>
          <p>Jelenleg elérhető az áttöltés (automatikus hirdetésfeltöltés és fiókkezelés) a következő ügyviteli rendszerekből:</p>
          <ul className="supported-systems-list">
            <li>Hirdetéskezelés (<a href="https://hirdeteskezeles.hu" target="_blank" rel="noopener">hirdeteskezeles.hu</a>)</li>
            <li>Ingatlanforrás (<a href="https://ingatlanforras.hu" target="_blank" rel="noopener">ingatlanforras.hu</a>)</li>
            <li>Házbank (<a href="https://hazbank.hu" target="_blank" rel="noopener">hazbank.hu</a>)</li>
          </ul>
          <p>Az ilyen import során a rendszer automatikusan létrehozza az irodai fiókot a megadott adatok alapján (pl. e-mail, iroda neve, kapcsolattartó). Az áttöltés első sikeres lépése (XML/API adatfogadás) egyidejűleg az ÁSZF elfogadását és a szerződés elektronikus megkötését jelenti. A Szolgáltató a fiók létrehozásáról e-mailben értesíti a kapcsolattartót, és megküldi a kezdeti belépési adatokat (felhasználónév és ideiglenes jelszó). A belépés után a jelszót azonnal meg kell változtatni.</p>
          <p>Az irodai fiókokhoz tartoznak a kreditrendszeren keresztüli kiemelési lehetőségek (lásd IX. pont). Az importált hirdetések automatikusan kezelődnek és frissülnek a külső rendszerből érkező adatok alapján.</p>
          <p>Ha egy irodának fontos ügyviteli rendszeréből még nem elérhető az áttöltés a portálunkra, jelezze azt az adott ügyviteli rendszer kapcsolattartójának vagy ügyfélszolgálatának. Amennyiben elegendő igény képződik egy új integrációra, a Szolgáltató együttműködik az adott rendszer üzemeltetőjével az XML/API áttöltés kialakításában. Kérjük, ilyen esetben írj nekünk is a kapcsolat@ingatlan-terkep.hu címre, hogy nyomon követhessük az igényeket.</p>
          <p>A Szolgáltató jogosult az irodai fiókot felfüggeszteni vagy törölni, ha a hirdetések nem felelnek meg a szabályoknak, fizetési mulasztás történik, vagy egyéb visszaélés gyanúja merül fel.</p>
          <p>Kérésre a Szolgáltató átállíthat egy magánszemély fiókot irodai fiókká (pl. ha a felhasználó később ingatlanközvetítővé válik). Ehhez írásbeli kérelem (e-mail) szükséges a kapcsolat@ingatlan-terkep.hu címre, valamint az iroda igazolása (pl. adószám, cégkivonat). Az átállítás után a fiókhoz a kreditrendszer és az irodai feltételek kapcsolódnak.</p>
          <p>A külső rendszerekkel való integráció során a Szolgáltató kizárólag a feltöltött adatokat kezeli, azok valóságtartalmáért a Felhasználó / iroda felelős.</p>
        </div>

<div className="privacy-policy-section">
  <h2>VI. Hirdetési szabályok és moderálás</h2>
  <p>A Hirdető kizárólagos felelőssége a hirdetés tartalmának valóságtartalma, jogszerűsége és pontossága. Tiltott:</p>
  <ul className="supported-systems-list">
    <li>hamis, megtévesztő adatok,</li>
    <li>duplikált hirdetések ugyanarról az ingatlanról,</li>
    <li>jogellenes képek (nem saját szerzői jog), diszkriminatív, sértő tartalom,</li>
    <li>spam, reklám más szolgáltatásokra,</li>
    <li>automatizált feltöltés, botok használata.</li>
  </ul>
  <p>A Szolgáltató jogosult előmoderálni vagy utólag eltávolítani/szerkeszteni a hirdetést indoklás nélkül is, különösen jogsértés esetén. A Hirdető értesítést kap, ha lehetséges.</p>

  {/* ÚJ ALPONTOK – PROMÓCIÓS ÉS STATISZTIKAI FELHASZNÁLÁS */}
  <h3>VI/A. Hirdetések promóciós és marketing célú felhasználása</h3>
  <p>A Hirdető a hirdetés feltöltésével (beleértve a közvetlen feltöltést vagy XML/API importot külső rendszereken keresztül) kifejezetten hozzájárul ahhoz, hogy a Szolgáltató a feltöltött hirdetést – beleértve a szöveges leírást, képeket, videókat, árakat és egyéb nyilvános adatokat – promóciós és marketing célokra felhasználja. Ez magában foglalja különösen:</p>
  <ul className="supported-systems-list">
    <li>a hirdetés bemutatását a Szolgáltató közösségi média felületein (Facebook, Instagram, TikTok stb.),</li>
    <li>a Szolgáltató saját weboldalán, blogján vagy hírlevelében való publikálást példaként,</li>
    <li>remarketing kampányokban, hirdetésekben vagy promóciós anyagokban való felhasználást (anonimizált vagy álnevesített formában is),</li>
    <li>a hirdetés tartalmának felhasználását a Szolgáltatás népszerűsítésére.</li>
  </ul>
  <p>A hozzájárulás önkéntes, de a hirdetés feltöltésének feltétele. A Hirdető a hozzájárulást bármikor visszavonhatja írásban a kapcsolat@ingatlan-terkep.hu e-mail címen. A visszavonás a jövőbeli felhasználást érinti, a visszavonás előtti felhasználás jogszerűségét nem érinti. A Szolgáltató törekszik arra, hogy a marketing célú felhasználás során a személyes adatokat (pl. telefonszám, pontos cím) szükség szerint anonimizálja vagy álnevesítse, kivéve ha a Hirdető kifejezetten kéri a teljes megjelenítést.</p>

  <h3>VI/B. Hirdetések statisztikai célú felhasználása</h3>
  <p>A Szolgáltató jogos érdeke alapján (GDPR 6. cikk (1) bek. f) pont) a feltöltött hirdetéseket és azokhoz kapcsolódó adatokat (pl. megtekintések száma, kattintások, interakciók) statisztikai és elemzési célokra felhasználhatja. Ez magában foglalja különösen:</p>
  <ul className="supported-systems-list">
    <li>az összesített nézettségi és konverziós statisztikák készítését,</li>
    <li>a hirdetések teljesítményének elemzését (pl. mely típusú hirdetések népszerűek),</li>
    <li>trendek, piaci riportok készítését (anonimizált, összesített formában).</li>
  </ul>
  <p>A statisztikai adatkezelés során a Szolgáltató kizárólag anonimizált vagy álnevesített adatokat használ, amelyek nem alkalmasak egyedi Hirdető vagy ingatlan azonosítására. A jogos érdek mérlegelése során a Szolgáltató figyelembe vette, hogy az adatkezelés nem sérti súlyosan a Hirdető alapvető jogait és szabadságait, mivel csak összesített, nem személyhez köthető elemzések készülnek.</p>
</div>

        <div className="privacy-policy-section">
          <h2>VII. Elérhető csomagok és kiemelési lehetőségek magánszemélyek számára</h2>
          <p>A magánszemélyek (természetes személyek) az alábbi csomagok közül választhatnak. A csomagok tartalmazzák a hirdetések számát, képek lehetőségét, valamint a Prémium csomagban kiemelési jogosultságokat is.</p>
          <table className="policy-table">
            <thead>
              <tr>
                <th>Csomag</th>
                <th>Hirdetések száma</th>
                <th>Képek</th>
                <th>Kiemelések</th>
                <th>Ár (bruttó)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ingyenes</td>
                <td>1 db</td>
                <td>Nincs kép</td>
                <td>Nincs</td>
                <td>0 Ft</td>
              </tr>
              <tr>
                <td>Optimum</td>
                <td>5 db</td>
                <td>Van kép</td>
                <td>Nincs</td>
                <td>1.990 Ft / 30 nap</td>
              </tr>
              <tr>
                <td>Prémium</td>
                <td>10 db</td>
                <td>Van kép</td>
                <td>1 db arany kiemelés + 3 db sima kiemelés (a csomag időtartamára)</td>
                <td>4.990 Ft / 30 nap</td>
              </tr>
            </tbody>
          </table>
          <p>A csomagok 30 napos időtartamra szólnak, és előfizetés esetén a díj minden 30. napon automatikusan terhelésre kerül. A Prémium csomagban szereplő kiemelések a csomag aktív időtartamára érvényesek, és a csomag lejáratával egyidejűleg járnak le. A kiemelések részletes szabályait lásd a VIII. pontban.</p>
          <p>A csomagok meghosszabbíthatók, előfizetés lemondható a profil → Pénzügyek oldalon.</p>

          <p><strong>Ajánlói rendszer magánszemélyek számára:</strong></p>
          <ul className="supported-systems-list">
            <li>Minden regisztrált magánszemély kap egyedi ajánlói kódot, amely a profiljában megtekinthető.</li>
            <li>Ha egy új felhasználó az ajánlói kóddal regisztrál, mind az ajánló, mind az ajánlott felhasználó jutalmat kap.</li>
            <li>Az ajánlott új felhasználó (aki a kóddal érkezik) a regisztrációkor automatikusan <strong>Prémium csomagot</strong> kap <strong>30 napos időtartammal</strong> (ingyenesen).</li>
            <li>Az ajánló felhasználó az új felhasználó sikeres fiókjóváhagyása (email ellenőrzés / verification code elfogadása) után szintén <strong>+30 nap Prémium csomagot</strong> kap (ha korábban nem volt aktív Prémium csomagja, akkor Prémiumra vált; ha már aktív volt, a meglévő lejárati időhöz +30 nap hozzáadódik).</li>
            <li>Egy ajánlói kód maximálisan <strong>2 alkalommal</strong> használható fel (azaz egy felhasználó maximum 2 új embert ajánlhat sikeresen).</li>
            <li>Az ajánlói jutalom kizárólag magánszemélyekre vonatkozik, irodai fiókokra nem érvényesíthető. A jutalom nem készpénzben, kizárólag Prémium időszak hozzáadásával realizálódik.</li>
            <li>A jutalom érvényessége: a +30 napos Prémium időszak a regisztráció / jóváhagyás napjától számítódik, és nem hosszabbítható más módon (kivéve ha a felhasználó fizetős csomagot vásárol utána).</li>
            <li>A Szolgáltató fenntartja a jogot az ajánlói program módosítására, felfüggesztésére vagy megszüntetésére, 30 napos előzetes értesítéssel a Weboldalon és/vagy e-mailben.</li>
          </ul>

          <p>Az ajánlói rendszerrel kapcsolatos kérdésekkel fordulhat a <a href="mailto:kapcsolat@ingatlan-terkep.hu">kapcsolat@ingatlan-terkep.hu</a> címhez.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>VIII. Kiemelési rendszer</h2>
          <p>A hirdetések láthatóságát kiemelési szolgáltatásokkal lehet növelni. Kétféle kiemelési típus érhető el:</p>
          <ul className="supported-systems-list">
            <li><strong>Sima kiemelés</strong>: A kiemelt hirdetés a normál (nem kiemelt) hirdetések fölött, előtt jelenik meg a listában, de vizuálisan ugyanúgy néz ki. A sima kiemelések egymáshoz képest random sorrendben jelennek meg, a sorrend minden reggel automatikusan megváltozik az igazságos láthatóság érdekében.</li>
            <li><strong>Arany kiemelés</strong>: A hirdetés arany színű jelölőt kap a térképen (a normál és sima kiemelt hirdetések kék jelölőt használnak). Az arany kiemelések mindig a sima kiemelések és normál hirdetések fölött jelennek meg. Az arany kiemelések egymáshoz képest is random sorrendben látszanak. Egy adott zoom szinten / területen egyszerre legfeljebb 5 arany kiemelt hirdetés jelenik meg; nagyobb nagyítás (zoom) esetén további arany kiemelések válnak láthatóvá.</li>
          </ul>
          <p>Magánszemélyek a Prémium csomag részeként kapnak 1 arany és 3 sima kiemelést a 30 napos ciklusra. Irodák (nem magánszemélyek) a kreditrendszeren keresztül vehetnek kiemeléseket (lásd IX. pont).</p>
        </div>

        <div className="privacy-policy-section">
          <h2>IX. Irodáknak szóló kreditrendszer</h2>
          <p>Ingatlanirodák (nem természetes személyek) krediteket vásárolhatnak mennyiségi kedvezménnyel, amelyekkel kiemelési szolgáltatásokat aktiválhatnak hirdetéseikhez. A kreditek nettó áron kerülnek felszámításra, +ÁFA fizetendő.</p>
          <table className="policy-table">
            <thead>
              <tr>
                <th>Kreditek száma</th>
                <th>Ár / kredit (nettó)</th>
                <th>Teljes ár (nettó)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>20 kredit</td><td>250 Ft</td><td>5.000 Ft</td></tr>
              <tr><td>50 kredit</td><td>230 Ft</td><td>11.500 Ft</td></tr>
              <tr><td>100 kredit</td><td>210 Ft</td><td>21.000 Ft</td></tr>
              <tr><td>250 kredit</td><td>190 Ft</td><td>47.500 Ft</td></tr>
              <tr><td>500 kredit</td><td>170 Ft</td><td>85.000 Ft</td></tr>
            </tbody>
          </table>
          <p>A kreditek felhasználása:</p>
          <ul className="supported-systems-list">
            <li>1 kredit = 1 hét sima kiemelés egy adott hirdetésre</li>
            <li>3 kredit = 1 hét arany kiemelés egy adott hirdetésre</li>
          </ul>
          <p>Egy hirdetésre több kiemelést is lehet vásárolni / aktiválni, minden további kreditfelhasználás +1 hetet ad a kiemelés időtartamához. A kreditek nem járnak le, amíg fel nem használják őket.</p>
          <p>A kreditek kizárólag kiemelési szolgáltatások aktiválására használhatók fel, készpénzre nem válthatók vissza, más felhasználóra nem ruházhatók át. A kreditek felhasználásának nyilvántartása a Felhasználó fiókjában történik, a Szolgáltató nem vállal felelősséget a felhasználás helyességéért vagy elírásáért.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>X. Fizetés</h2>
          <p>A fizetés kizárólag a Barion Payment Zrt. biztonságos rendszerén keresztül történik bankkártyával (Visa, MasterCard, Maestro) vagy Barion egyenlegről. A magánszemélyek csomagjai (Ingyenes, Optimum, Prémium) bruttó árakon jelennek meg, ÁFA-mentesek. Az irodáknak szóló kreditcsomagok nettó árakon + ÁFA fizetendők.</p>
          <p><strong>Az online bankkártyás és egyéb fizetési módok a Barion rendszerén keresztül valósulnak meg. A bankkártya, illetve egyéb fizetéssel kapcsolatos adatok a kereskedőhöz nem jutnak el. A szolgáltatást nyújtó Barion Payment Zrt. a Magyar Nemzeti Bank felügyelete alatt álló intézmény, engedélyének száma: H-EN-I-1064/2013.</strong></p>
          <p>A Barion ÁSZF-je: <a href="https://www.barion.com/hu/aszf" target="_blank" rel="noopener">https://www.barion.com/hu/aszf</a></p>
          <p>A bankkártyaadatokat nem tároljuk, azokat a Barion PCI DSS tanúsított rendszere kezeli.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XI. Elállási jog kizárása</h2>
          <p>A fogyasztót a távollevők között kötött szerződésekre vonatkozó 45/2014. (II. 26.) Korm. rendelet 20. §-a alapján megilleti az indokolás nélküli elállási jog, kivéve a rendelet 29. § (1) bekezdésében foglalt eseteket.</p>
          <p><strong>Az Optimum és Prémium csomagok, valamint a kreditrendszeren keresztül vásárolt kreditek esetében az elállási jog kizárt</strong> a 45/2014. (II. 26.) Korm. rendelet 29. § (1) m) pontja alapján, mivel ezek nem tárgyi adathordozón nyújtott digitális szolgáltatást / digitális tartalmat jelentenek, és a vásárlás (fizetés) után a szolgáltatás teljesítése <strong>azonnal megkezdődik</strong>.</p>
          <p>A csomag vagy kredit vásárlása során a Felhasználó a fizetési folyamat részeként (a „Fizetés” / „Megrendelés elküldése” gomb megnyomásával) kifejezetten hozzájárul ahhoz, hogy a Szolgáltató a teljesítést azonnal megkezdje, és <strong>tudomásul veszi</strong>, hogy a teljesítés megkezdését követően elveszíti az indokolás nélküli elállási jogát.</p>
          <p>Ez azt jelenti, hogy:</p>
          <ul className="supported-systems-list">
            <li>az Optimum/Prémium csomag aktiválása után azonnal elérhetővé válnak a csomagban foglalt extra funkciók (több hirdetés, képek, kiemelések),</li>
            <li>a kredit vásárlása után a kreditek azonnal jóváíródnak a fiókba és felhasználhatók kiemelésre,</li>
            <li>ezért a vásárlás utáni visszatérítés / elállás nem lehetséges.</li>
          </ul>
          <p>A Szolgáltató a vásárlás előtt egyértelműen feltünteti ezt a tájékoztatást a fizetési oldalon / kosár oldalon, és a „Fizetés” gomb megnyomása egyben a beleegyezés és a tudomásul vétel kifejezett nyilatkozatának minősül.</p>
          <p><strong>Magánszemélyek (természetes személyek / fogyasztók) esetén</strong> a fogyasztóvédelmi szabályok érvényesek. Irodák / vállalkozások (nem fogyasztók) esetén az elállási jog eleve nem illeti meg a Felhasználót.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XII. Előfizetés lemondása</h2>
          <p>Az előfizetést bármikor, indoklás nélkül lemondhatja a profil → Pénzügyek oldalon. A lemondás után az automatikus terhelés megszűnik, a már megkezdett 30 napos ciklus végéig a csomag marad aktív. A lemondás nem érinti a már kifizetett időszakot, és nem jár visszatérítéssel.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XIII. Emlékeztető e-mailek és számlázás</h2>
          <p>A csomag lejárata előtt 7 és 2 nappal emlékeztető e-mailt küldünk. A sikeres fizetésekről elektronikus számlát állítunk ki, amelyet e-mailben küldünk meg. A számlák az ÁFA-törvény szerint kerülnek kiállításra.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XIV. Digitális Szolgáltatások Törvénye (DSA) tájékoztatás</h2>
          <p>A Szolgáltatás digitális platformként működik, így a (EU) 2022/2065 rendelet (DSA) hatálya alá tartozik. Illegális tartalom vagy jogsértő hozzászólás bejelenthető a kapcsolat@ingatlan-terkep.hu címen. A bejelentés feldolgozási ideje legfeljebb 30 nap. A panaszkezelés a XVII. pont szerint történik. Átláthatósági jelentés igény szerint elérhető. További információ: <a href="https://digital-services-act.ec.europa.eu" target="_blank" rel="noopener">DSA hivatalos oldala</a>.</p>
        </div>

<div className="privacy-policy-section">
          <h2>XV. Szolgáltató felelősségének korlátozása</h2>
          <p>A Szolgáltató nem garantálja a Szolgáltatás hibátlan, megszakítás nélküli működését, a hirdetések láthatóságát vagy sikerességét. Nem felelős harmadik fél károkáért, elmaradt haszonért, adatvesztésért vagy indirekt károkért.</p>
          <p>A Szolgáltató felelőssége maximálisan a Felhasználó által az utolsó 12 hónapban fizetett díjak összegére korlátozódik. A Szolgáltató nem közvetítő, nem vizsgálja a hirdetések valóságtartalmát.</p>
        </div>

        {/* ÚJ BEillesztett pont – AI elemzések */}
        <div className="privacy-policy-section">
          <h2>XV/A. Mesterséges intelligencia alapú elemzések</h2>
          <p>A Weboldalon egyes ingatlanokhoz mesterséges intelligencia (AI) által generált elemzések érhetők el (például árazottság vizsgálata, befektetési potenciál, rejtett előnyök/hátrányok stb.).</p>
          
          <p><strong>Fontos figyelmeztetés:</strong></p>
          <p>Ezek az elemzések <strong>kizárólag tájékoztató jellegűek</strong>, automatikusan generáltak, és <strong>nem minősülnek szakvéleménynek, hivatalos értékbecslésnek, ingatlanpiaci szakértői jelentésnek vagy ajánlattételnek</strong>.</p>
          
          <p>Az AI elemzések nem rendelkeznek valós idejű, teljes körű piaci információval, nem helyettesítik a független ingatlanértékbecslő, ügyvéd, energetikai szakértő vagy egyéb szakember véleményét. Az ingatlanpiaci adatok gyorsan változhatnak, ezért az elemzések pontossága nem garantálható.</p>
          
          <p>A Felhasználó az AI elemzéseket <strong>saját felelősségére</strong> használja. A Szolgáltató semmilyen felelősséget nem vállal semmilyen közvetlen vagy közvetett kárért, elmaradt haszonért, vagy egyéb hátrányért, amely az AI elemzések alapján hozott döntésekből eredhet.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XVI. Kellékszavatosság</h2>
          <p>A szolgáltatás hibája esetén a Felhasználó a Polgári Törvénykönyv (2013. évi V. törvény) szerinti kellékszavatossági jogokat érvényesítheti. A Szolgáltató a hibás teljesítésért fennálló felelősségét a törvényes keretek között korlátozza. A fogyasztók számára a kellékszavatossági igények a fogyasztóvédelmi szabályok szerint érvényesíthetők.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XVII. Adatvédelem</h2>
          <p>Az adatkezelés részletei külön <a href="/privacy-policy">Adatvédelmi Tájékoztatóban</a> találhatóak.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XVIII. Panaszkezelés és jogvita</h2>
          <p>Panaszát a kapcsolat@ingatlan-terkep.hu címen vagy telefonon (+36 20 624 0061) teheti meg, amelyet 30 napon belül kivizsgálunk és megválaszolunk.</p>
          <p>Amennyiben a panasz nem kerül megnyugtató rendezésre, fogyasztói jogvita esetén a lakóhelye szerint illetékes békéltető testülethez fordulhat (elérhetőségek: <a href="https://bekeltetes.hu" target="_blank" rel="noopener">https://bekeltetes.hu</a>), vagy bírósághoz fordulhat. Online vitarendezési platform: <a href="https://ec.europa.eu/odr" target="_blank" rel="noopener">https://ec.europa.eu/odr</a>.</p>
          <p>A jogvitákra a magyar jog az irányadó, kizárólagos illetékességű bíróság a szolgáltató székhelye szerinti bíróság.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XIX. Egyéb rendelkezések</h2>
          <p>A Szolgáltató egyoldalúan módosíthatja az ÁSZF-et, a változásokat a Weboldalon közzéteszi, jelentős változás esetén e-mailben értesít (30 napos előzetes hatállyal).</p>
          <p>A Szolgáltató nem vállal felelősséget a Weboldal hibátlan és folyamatos működéséért, illetve a rajta elhelyezett hirdetések tartalmáért.</p>
          <p>Jelen ÁSZF 2026. február 24-től hatályos, és a Weboldalon való közzététellel lép életbe. Korábbi verziók elérhetőek kérésre.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>XX. Szerződéskötés részletei</h2>
          <p>A szerződés elektronikus úton jön létre a Felhasználó ÁSZF elfogadásával (regisztráció, bejelentkezés, fizetés, XML/API import első sikeres lépése). A szerződés nem iktatásra kerül, utólag nem hozzáférhető. A szerződés nyelve magyar. A Szolgáltató nem alkalmaz magatartási kódexet.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;