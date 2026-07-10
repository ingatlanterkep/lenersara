import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-heading">Ügyvédi Iroda</h3>
            <p className="footer-text">
              Családjogi és ingatlanjogi ügyvéd Veszprémben. Több mint 25 év szakmai tapasztalat.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Szolgáltatások</h4>
            <ul className="footer-links">
              <li><Link href="/szolgaltatasok/csaladjog">Családjog</Link></li>
              <li><Link href="/szolgaltatasok/ingatlanjog">Ingatlanjog</Link></li>
              <li><Link href="/szolgaltatasok/orokles">Öröklési ügyek</Link></li>
              <li><Link href="/szolgaltatasok/mediacio">Mediáció</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Hasznos linkek</h4>
            <ul className="footer-links">
              <li><Link href="/rolam">Rólam</Link></li>
              <li><Link href="/dijszabas">Díjszabás</Link></li>
              <li><Link href="/tudastar">Jogi tudástár</Link></li>
              <li><Link href="/kapcsolat">Kapcsolat</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Jogi információk</h4>
            <ul className="footer-links">
              <li><Link href="/adatkezeles">Adatkezelés</Link></li>
              <li><Link href="/impresszum">Impresszum</Link></li>
              <li><Link href="/aszf">ÁSZF</Link></li>
              <li><Link href="/ugyvedi-tajekoztato">Ügyvédi tájékoztató</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-divider">
          <p className="footer-copyright">© 2026 Ügyvédi Iroda Veszprém. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  )
}