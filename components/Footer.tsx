import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-heading">Ügyvédi Iroda</h3>
            <p className="footer-text">
              Jogi segítség magánszemélyek és vállalkozások számára
              Veszprémben. Több mint 25 év szakmai tapasztalat.
            </p>
          </div>

<div>
  <h4 className="footer-heading">Szolgáltatások</h4>

  <ul
    className="footer-links"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      columnGap: '1.5rem',
      rowGap: '0.5rem'
    }}
  >
    <li>
      <Link href="/szolgaltatasok/csaladjog">Családjog</Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/ingatlanjog">Ingatlanjog</Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/orokles">Öröklési jog</Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/cegeljarasok">Cégeljárások</Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/munkajog">Munkajog</Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/epitesi-jog">Építési jog</Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/peres-kepviselet">
        Peres képviselet
      </Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/okiratszerkesztes">
        Okiratszerkesztés
      </Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/koveteleservenyesites">
        Követeléskezelés
      </Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/mediacio">Mediáció</Link>
    </li>
    <li>
      <Link href="/szolgaltatasok/partfogo-ugyved">
        Pártfogó ügyvédi képviselet
      </Link>
    </li>
  </ul>
</div>

          <div>
            <h4 className="footer-heading">Hasznos linkek</h4>
            <ul className="footer-links">
              <li>
                <Link href="/#rolam">Rólam</Link>
              </li>
              <li>
                <Link href="/dijszabas">Díjszabás</Link>
              </li>

              <li>
                <Link href="/#kapcsolat">Kapcsolat</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Jogi információk</h4>
            <ul className="footer-links">
              <li>
                <Link href="/adatkezeles">Adatkezelés</Link>
              </li>
              <li>
                <Link href="/impresszum">Impresszum</Link>
              </li>
              <li>
                <Link href="/aszf">ÁSZF</Link>
              </li>
              <li>
                <Link href="/ugyvedi-tajekoztato">
                  Ügyvédi tájékoztató
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider">
          <div className="footer-legal">
            <p className="footer-legal-text">
              <strong>Közvetítői névjegyzék:</strong> dr. Léner-Pintér Sára
              egyéni ügyvéd és mediátor az Igazságügyi Minisztérium által
              vezetett közvetítői névjegyzékben szereplő közvetítő.
              IM azonosító: <strong>T/003362</strong>. A közvetítői névjegyzék
              a közvetítői tevékenységről szóló 2002. évi LV. törvény 5. §-ában
              meghatározott feltételeknek megfelelő közvetítőket tartalmazza.
            </p>

            <p className="footer-legal-text">
              <strong>Jogi tájékoztató:</strong> A weboldalon található
              információk általános tájékoztatást szolgálnak, és nem
              minősülnek egyedi jogi tanácsadásnak. Minden ügy egyedi
              körülményei miatt a konkrét jogi lehetőségek személyes
              konzultáció és az ügy iratainak áttekintése alapján ítélhetők meg.
            </p>

            <p className="footer-legal-text">
              A weboldalon közzétett saját tartalmak szerzői joga kizárólag
              dr. Léner-Pintér Sára egyéni ügyvédet és mediátort illeti meg.
            </p>
          </div>

          <p className="footer-copyright">
            © 2026 dr. Léner-Pintér Sára egyéni ügyvéd és mediátor. Minden jog
            fenntartva.
          </p>
        </div>
      </div>
    </footer>
  )
}