'use client';

import React from 'react';
import '../styles/PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <div className="privacy-policy-header">
          <h1 className="privacy-policy-title">Adatvédelmi Tájékoztató</h1>
          <p className="privacy-policy-subtitle">Hatályos: 2026. február 13-tól (frissítve Google Analytics hozzáadásával)</p>
        </div>

        <div className="privacy-policy-section">
          <h2>1. Milyen alapelveket követek?</h2>
          <p>Egyéni vállalkozóként az adatkezelés során a GDPR és az Infotv. előírásait tartom be (jogszerűség, tisztességes eljárás, átláthatóság, célhoz kötöttség, adattakarékosság, pontosság, korlátozott tárolhatóság, integritás és bizalmas jelleg).</p>
        </div>

        <div className="privacy-policy-section">
          <h2>2. Ki vagyok én?</h2>
          <p>Morán Raul egyéni vállalkozó</p>
          <table className="policy-table">
            <tbody>
              <tr><td>Székhely</td><td>2251 Tápiószecső, Gergely-kereszt dűlő 1.</td></tr>
              <tr><td>Adószám</td><td>90919457-1-33</td></tr>
              <tr><td>Nyilvántartási szám</td><td>60273219</td></tr>
              <tr><td>E-mail</td><td>kapcsolat@ingatlan-terkep.hu</td></tr>
              <tr><td>Telefon</td><td>+36 20 624 0061</td></tr>
              <tr><td>Weboldal</td><td>https://ingatlan-terkep.hu</td></tr>
            </tbody>
          </table>
          <p>Nem vagyok köteles adatvédelmi tisztviselőt kinevezni.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>3. Adatfeldolgozók</h2>
          <table className="policy-table">
            <thead><tr><th>Cég</th><th>Cím</th><th>Tevékenység</th></tr></thead>
            <tbody>
              <tr><td>Vercel Inc.</td><td>USA</td><td>Hosting és analitika</td></tr>
              <tr><td>MongoDB Inc.</td><td>USA</td><td>Adatbázis</td></tr>
              <tr><td>ImageKit.io</td><td>Szingapúr / EU</td><td>Képoptimalizálás és -tárolás</td></tr>
              <tr><td>Zoho Corporation</td><td>USA</td><td>E-mail szolgáltatás</td></tr>
              <tr><td>Meta Platforms Inc.</td><td>USA</td><td>Meta Pixel (marketing)</td></tr>
              <tr><td>Barion Payment Zrt.</td><td>1117 Budapest, Infopark sétány 1.</td><td>Bankkártyás fizetés feldolgozása és Barion Pixel (konverziókövetés, csalásmegelőzés)</td></tr>
              <tr><td>Google Ireland Limited / Google LLC</td><td>Írország / USA</td><td>Google Analytics 4 (látogatottsági analitika, Consent Mode v2 támogatással)</td></tr>
            </tbody>
          </table>
          <p>Az adatfeldolgozók GDPR-kompatibilis szerződéssel rendelkeznek (Google Ads / Analytics Adatfeldolgozási feltételek elfogadva).</p>
        </div>

        <div className="privacy-policy-section">
          <h2>4. Kezelt adatok és jogalapok</h2>
          <table className="policy-table">
            <thead><tr><th>Cél</th><th>Jogalap</th><th>Adatok</th><th>Tárolási idő</th></tr></thead>
            <tbody>
              <tr><td>Honlap működése</td><td>Jogos érdek</td><td>IP, böngésző adatok</td><td>max. 150 nap</td></tr>
              <tr><td>Regisztráció, fiókkezelés</td><td>Hozzájárulás/szerződés teljesítése</td><td>E-mail, jelszó (hash), név</td><td>Fiók törléséig</td></tr>
              <tr><td>Hirdetésfeltöltés</td><td>Szerződés teljesítése</td><td>Hirdetés adatai, képek, házszám (opcionális)</td><td>Hirdetés törléséig</td></tr>
              <tr><td>Optimum csomag megvásárlása</td><td>Szerződés teljesítése</td><td>Név, e-mail, tranzakciós adatok (Barion)</td><td>Számlázási kötelezettség szerint (8 év)</td></tr>
              <tr><td>Marketing (Meta Pixel, Google Analytics)</td><td>Hozzájárulás</td><td>Böngészési események, oldalnézetek, események, vásárlási konverzió (Google Analytics 4)</td><td>Hozzájárulás visszavonásáig (max. 14 hónap GA4 event adat retention, cookie-k 2 évig)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="privacy-policy-section">
  <h2>4.5. AI alapú elemzések és marketing célú megkeresések</h2>
  
  <p>Amikor a Felhasználó az ingatlan részletes oldalán AI elemzést kér, és megadja az email címét a teljes elemzés megküldéséhez, az alábbi adatokat kezeljük:</p>
  
  <table className="policy-table">
    <thead><tr><th>Cél</th><th>Jogalap</th><th>Kezelt adatok</th><th>Tárolási idő</th></tr></thead>
    <tbody>
      <tr>
        <td>Az AI elemzés elkészítése és emailben történő elküldése</td>
        <td>Hozzájárulás + szerződés teljesítése</td>
        <td>Email cím, a kért elemzés típusa, az elemzés tartalma</td>
        <td>Az elemzés elküldéséig + legfeljebb 3 év (marketing célokra)</td>
      </tr>
      <tr>
        <td>Marketing kommunikáció (hírlevél, promóciós ajánlatok, kedvezmények, új szolgáltatások ismertetése)</td>
        <td>Hozzájárulás</td>
        <td>Email cím</td>
        <td>Hozzájárulás visszavonásáig (legfeljebb 5 év)</td>
      </tr>
    </tbody>
  </table>

  <p>Az email cím megadásával a Felhasználó kifejezetten hozzájárul ahhoz, hogy az Ingatlan-Térkép a megadott email címre marketing tartalmú leveleket küldjön (hírlevél, kedvezményes ajánlatok, új funkciókról szóló értesítések).</p>

  <p>Ez a hozzájárulás önkéntes, és a „Teljes elemzést kérek emailben” gomb melletti jelölőnégyzet elfogadásával történik. A hozzájárulást a Felhasználó bármikor visszavonhatja a kapcsolat@ingatlan-terkep.hu címre küldött kéréssel. A visszavonás nem érinti a korábban történt adatkezelés jogszerűségét.</p>
</div>

        <div className="privacy-policy-section">
          <h2>5. Sütik és követők</h2>
          <table className="policy-table">
            <thead><tr><th>Típus</th><th>Név</th><th>Hozzájárulás</th><th>Cél</th><th>Érvényesség</th></tr></thead>
            <tbody>
              <tr><td>Szükséges</td><td>ingatlanTerkepCookieConsent</td><td>Nem kell</td><td>Hozzájárulás tárolása</td><td>150 nap</td></tr>
              <tr><td>Szükséges</td><td>Barion Pixel (_barion_*)</td><td>Nem kell</td><td>Barion konverziókövetés és csalásmegelőzés</td><td>1 év</td></tr>
              <tr><td>Analitika</td><td>_vercel_insights</td><td>Igen</td><td>Látogatottsági statisztika</td><td>max. 150 nap</td></tr>
              <tr><td>Analitika</td><td>_ga, _ga_*, _gid</td><td>Igen</td><td>Google Analytics 4: egyedi látogatók azonosítása, sessionök, oldalhasználat elemzése (Consent Mode v2-vel)</td><td>_ga: 2 év, _gid: 24 óra, _ga_*: 2 év</td></tr>
              <tr><td>Marketing</td><td>fbq, _fbp</td><td>Igen</td><td>Meta hirdetések követése</td><td>90–150 nap</td></tr>
            </tbody>
          </table>
          <p>A marketing és analitikai sütik (beleértve a Google Analytics-t) csak a sütik elfogadása után aktiválódnak. A Google Analytics Consent Mode v2 implementálva van, így a hozzájárulás hiányában korlátozott (modellezett) adatgyűjtés történik. A sütik részletes kezelésére a cookie banner szolgál, ahol külön-külön is dönthetsz.</p>
        </div>

        <div className="privacy-policy-section">
          <h2>6. Jogai és elérhetőség</h2>
          <p>Tájékoztatást, helyesbítést, törlést, korlátozást, adathordozhatóságot, tiltakozást kérhet. Kérelmét a kapcsolat@ingatlan-terkep.hu címre küldheti, 1 hónapon belül válaszolok.</p>
          <p>Panaszával a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, 1055 Budapest, Falk Miksa utca 9-11., ugyfelszolgalat@naih.hu) vagy bírósághoz fordulhat.</p>
          <p>Az adatkezelési tájékoztatót bármikor egyoldalúan módosíthatom, a jelentős változásokról e-mailben értesítem a regisztrált felhasználókat.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;