import HomePageContent from '@/pages/HomePageContent';
import HomePageSEO from '../components/HomePageSEO';

export default function HomePage() {
  return (
    <>
      {/* A térkép + oldalsáv + smart tools */}
      <HomePageContent 
        listingType="elado" 
        type="lakas" 
        city={null} 
        viewModeDefault="map" 
        serverLocationContent={null}
        serverSeoQuickPosts={[]}
        hideFooter={true}  // ← Kikapcsoljuk a footer-t a HomePageContent-ben
      />
      
      {/* SEO tartalom (footer ELŐTT!) */}
      <HomePageSEO />
      
      {/* Footer - csak egyszer, minden alatt */}
      <footer className="app-footer">
        <div className="footer-main">
          <div className="footer-column logo-column">
            <img src="/barion-logo.png" alt="Barion biztonságos online fizetési logó" className="barion-logo" />
            <img src="/Large-nobg-light.png" alt="Barion elfogadott fizetési kártyák és módszerek logója" className="barion-logo" />
            <p className="footer-tagline">Biztonságos fizetés a Barionnal<br />A bankkártya adatok hozzánk nem jutnak el.</p>
          </div>
          <div className="footer-column">
            <h4>Oldalak</h4>
            <ul><li><a href="/">Kezdőlap</a></li><li><a href="/about">Rólunk</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Kapcsolat</a></li></ul>
          </div>
          <div className="footer-column">
            <h4>Jogi információk</h4>
            <ul><li><a href="/privacy-policy">Adatvédelmi nyilatkozat</a></li><li><a href="/aszf">Általános Szerződési Feltételek</a></li></ul>
          </div>
          <div className="footer-column">
            <h4>Közösség</h4>
            <ul><li><a href="https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/" target="_blank" rel="noopener">Facebook</a></li></ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2026 Ingatlan-Térkép.hu – Minden jog fenntartva</p>
        </div>
      </footer>
    </>
  );
}