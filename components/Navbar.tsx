// components/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import '../styles/Navbar.css';
import { getFavoritePosts } from '../utils/favoritePosts';

interface NavbarProps {
  cookiesAccepted: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  isNavbarMenuOpen: boolean;
  setNavbarMenuOpen: (value: boolean) => void;
  showFilterSidebar: boolean;
  setShowFilterSidebar: (value: boolean) => void;
  showLayerSidebar: boolean;
  setShowLayerSidebar: (value: boolean) => void;
  isNavbarCollapsed: boolean;
  setIsNavbarCollapsed: (value: boolean) => void;
  isStreetViewMode: boolean;
  setIsStreetViewMode: (value: boolean) => void;
  viewMode: string;
  setViewMode: (value: string) => void;
}

const Navbar = ({ 
  cookiesAccepted,
  isLoggedIn, 
  onLogout, 
  isNavbarMenuOpen, 
  setNavbarMenuOpen,
  showFilterSidebar, 
  setShowFilterSidebar,
  showLayerSidebar, 
  setShowLayerSidebar,
  isNavbarCollapsed,
  setIsNavbarCollapsed,
  isStreetViewMode,
  setIsStreetViewMode,
  viewMode,
  setViewMode
}: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setFavoriteCount(getFavoritePosts().size);
    };
    updateCount();
    window.addEventListener('favoritesUpdated', updateCount);
    return () => window.removeEventListener('favoritesUpdated', updateCount);
  }, []);

  // 🔴 JAVÍTÁS: Használj null-coalescing operátort, hogy mindig string legyen
  const currentPath = pathname ?? '/';
  
  const isHomePage = 
    currentPath === '/' || 
    /^\/(elado|kiado)\/[^/]+(\/[^/]+)?(\/lista)?$/.test(currentPath) ||
    currentPath === '/lista';

  const toggleMenu = () => setNavbarMenuOpen(!isNavbarMenuOpen);
  const handleLinkClick = () => setNavbarMenuOpen(false);
  const toggleFilter = () => setShowFilterSidebar(!showFilterSidebar);
  const toggleLayers = () => setShowLayerSidebar(!showLayerSidebar);
  
  const toggleStreetView = () => {
    const newValue = !isStreetViewMode;
    if (cookiesAccepted && window.gtag) {
      window.gtag('event', 'toggle_street_view', {
        enabled: newValue,
        page_type: 'homepage'
      });
    }
    setIsStreetViewMode(newValue);
  };

  const handleViewModeToggle = () => {
    const isCurrentlyList = currentPath.endsWith('/lista');
    let newPath = currentPath;
    
    if (isCurrentlyList) {
      newPath = newPath.replace(/\/lista$/, '') || '/';
    } else {
      newPath = newPath.endsWith('/') ? `${newPath}lista` : `${newPath}/lista`;
    }
    
    if (cookiesAccepted && window.gtag) {
      window.gtag('event', isCurrentlyList ? 'switch_to_map_view' : 'switch_to_list_view', {
        from_view: isCurrentlyList ? 'list' : 'map',
        to_view: isCurrentlyList ? 'map' : 'list',
        source: 'navbar'
      });
    }
    
    router.push(newPath);
  };

  return (
    <nav className={`navbar ${isNavbarCollapsed ? 'collapsed' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-branding" onClick={handleLinkClick}>
          <img src="/logo.webp" alt="Ingatlan-Térkép logó" className="navbar-branding-logo" />
          <span className="navbar-branding-name">Ingatlan-Térkép</span>
        </Link>

        <div className="navbar-right-actions">
          <div className="navbar-controls">
            {isHomePage && (
              <button className="navbar-icon-button view-mode-toggle" onClick={handleViewModeToggle}>
                {currentPath.endsWith('/lista') ? (
                  <img src="/terkepnezet.png" alt="Térkép nézet" style={{ width: 24, height: 24 }} />
                ) : (
                  <img src="/listanezet.png" alt="Lista nézet" style={{ width: 24, height: 24 }} />
                )}
              </button>
            )}

            {isHomePage && (
              <button className="navbar-icon-button" onClick={toggleFilter} title="Szűrők">
                <img src="/search-icon.webp" alt="Szűrők" className="navbar-button-icon" />
              </button>
            )}

            {isHomePage && viewMode === 'map' && (
              <>
                <button className="navbar-icon-button" onClick={toggleLayers} title="Rétegek">
                  <img src="/layers-icon.webp" alt="Rétegek" className="navbar-button-icon" />
                </button>
                <button 
                  className={`navbar-icon-button streetview-button ${isStreetViewMode ? 'active' : ''}`}
                  onClick={toggleStreetView}
                  title="Street View mód"
                >
                  <img src="/pegman.png" alt="Street View" className="navbar-button-icon" />
                </button>
              </>
            )}

            <Link href="/kedvencek" className="navbar-icon-button favorites-button mobile-only" onClick={handleLinkClick}>
              <img src="/heart-filled.png" alt="Kedvenceim" className="navbar-button-icon" />
              {favoriteCount > 0 && <span className="favorites-badge">{favoriteCount}</span>}
            </Link>
          </div>

          <button className="navbar-icon-button hamburger-menu" onClick={toggleMenu}>☰</button>
        </div>

        <ul className={`menu ${isNavbarMenuOpen ? 'open' : ''}`}>
          {!isHomePage && (
            <li><Link href="/" onClick={handleLinkClick}>Főoldal</Link></li>
          )}
          <li className="menu-item-with-badge">
            <Link href="/kedvencek" onClick={handleLinkClick}>
              Kedvenceim
              {favoriteCount > 0 && <span className="news-badge">{favoriteCount}</span>}
            </Link>
          </li>
          <li><Link href="/about" onClick={handleLinkClick}>Rólunk</Link></li>
          <li><Link href="/contact" onClick={handleLinkClick}>Kapcsolat</Link></li>
          <li className="menu-item-with-badge">
            <Link href="/blog" onClick={handleLinkClick}>
              Hírek
              <span className="news-badge">1</span>
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li><Link href="/login" onClick={handleLinkClick}>Bejelentkezés</Link></li>
              <li><Link href="/signup" onClick={handleLinkClick}>Regisztráció</Link></li>
            </>
          ) : (
            <>
              <li><Link href="/profile" onClick={handleLinkClick}>Fiókom</Link></li>
              <li><button className="logout-button" onClick={onLogout}>Kilépés</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;