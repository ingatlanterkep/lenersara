'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/usersService';
import '@/styles/ProfileLayout.css';
import '@/styles/UploadPage.css';



export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push('/login');
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  const toggleSidebar = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  if (loading) {
    return <div>Betöltés...</div>;
  }

  if (!user) {
    return null;
  }

  const financeMenuName = user?.accountType === 'company'
    ? 'Kreditek és kiemelések'
    : 'Hirdetési csomagok';

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <div className="profile-container">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <nav id="profile-sidebar" className={`profile-sidebar ${isProfileMenuOpen ? 'open' : ''}`}>
        <h3>Profilom</h3>
        <ul>
          <li>
            <Link href="/profile" onClick={() => setIsProfileMenuOpen(false)}>
              Fiók adatai
            </Link>
          </li>
          <li>
            <Link href="/profile/messages" onClick={() => setIsProfileMenuOpen(false)}>
              Üzeneteim
            </Link>
          </li>
          {user?.accountType === 'individual' && (
            <li>
              <Link href="/profile/upload" onClick={() => setIsProfileMenuOpen(false)}>
                Hirdetésfeltöltés
              </Link>
            </li>
          )}
          <li>
            <Link href="/profile/posts" onClick={() => setIsProfileMenuOpen(false)}>
              Hirdetéseim
            </Link>
          </li>
          <li>
            <Link href="/profile/finance" onClick={() => setIsProfileMenuOpen(false)}>
              {financeMenuName}
            </Link>
          </li>
          <li>
            <Link href="/profile/settings" onClick={() => setIsProfileMenuOpen(false)}>
              Beállítások
            </Link>
          </li>
          {user?.isAdmin && (
            <li>
              <Link href="/profile/admin" onClick={() => setIsProfileMenuOpen(false)}>
                Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="profile-content">
        {children}
      </div>
    </div>
  );
}