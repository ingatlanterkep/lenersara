import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../services/usersService';
import '../styles/ProfileLayout.css';

const ProfileLayout = ({ 
  isNavbarMenuOpen, setNavbarMenuOpen, 
  isProfileMenuOpen, setProfileMenuOpen 
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    if (!isProfileMenuOpen && isNavbarMenuOpen) {
      setNavbarMenuOpen(false);
    }
    setProfileMenuOpen((prev) => !prev);
  };

  if (loading) {
    return <div>Betöltés...</div>;
  }

  // Dinamikus pénzügyek menüpont neve
  const financeMenuName = user?.accountType === 'company'
    ? 'Kreditek és kiemelések'
    : 'Hirdetési csomagok';

  // Opcionálisan: különböző útvonalak is lehetnek
  const financePath = user?.accountType === 'company'
    ? '/profile/finance'     // vagy /profile/credits
    : '/profile/finance';   // vagy /profile/packages

  return (
    <div className="profile-container">
      <button className="sidebar-toggle" onClick={toggleSidebar}></button>

      <nav id="profile-sidebar" className={`profile-sidebar ${isProfileMenuOpen ? 'open' : ''}`}>
        <h3>Profilom</h3>
        <ul>
          <li>
            <Link to="/profile" onClick={() => setProfileMenuOpen(false)}>
              Fiók adatai
            </Link>
          </li>

          <li>
  <Link to="/profile/messages" onClick={() => setProfileMenuOpen(false)}>
    Üzeneteim
  </Link>
</li>

          {user?.accountType === 'individual' && (
            <li>
              <Link to="/profile/upload" onClick={() => setProfileMenuOpen(false)}>
                Hirdetésfeltöltés
              </Link>
            </li>
          )}

          <li>
            <Link to="/profile/posts" onClick={() => setProfileMenuOpen(false)}>
              Hirdetéseim
            </Link>
          </li>

          {/* Dinamikus pénzügyek menüpont */}
          <li>
            <Link to={financePath} onClick={() => setProfileMenuOpen(false)}>
              {financeMenuName}
            </Link>
          </li>

          <li>
            <Link to="/profile/settings" onClick={() => setProfileMenuOpen(false)}>
              Beállítások
            </Link>
          </li>

          {user?.isAdmin && (
            <li>
              <Link to="/profile/admin" onClick={() => setProfileMenuOpen(false)}>
                Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;