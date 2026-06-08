'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfilePage from '@/pages/ProfilePage';
import { getCurrentUser } from '@/services/usersService';

export default function Profile() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    
    getCurrentUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);
  
  if (isAuthenticated === null) return <div>Betöltés...</div>;
  if (!isAuthenticated) return null;
  
  return <ProfilePage />;
}