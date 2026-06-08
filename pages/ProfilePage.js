'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateSubscription } from '../services/usersService';
import '../styles/ProfilePage.css';
import '../styles/layout/DashboardLayout.css';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [isUpdatingSubscription, setIsUpdatingSubscription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User data not available');
        setUser(currentUser);
        // NEM kérjük le a hirdetésszámot!
      } catch (error) {
        console.error('Error fetching data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubscriptionChange = async () => {
    if (isUpdatingSubscription || user.accountType !== 'individual') return;

    setIsUpdatingSubscription(true);
    setSubscriptionMessage('');

    const types = ['free', 'optimum', 'premium'];
    const currentIndex = types.indexOf(user.subscriptionType);
    const nextType = types[(currentIndex + 1) % types.length];

    try {
      const response = await updateSubscription(nextType);
      if (response.success) {
        setUser(response.user);
        setSubscriptionMessage(`Csomag váltva: ${getPlanName(nextType)}`);
        setTimeout(() => setSubscriptionMessage(''), 3000);
      }
    } catch (error) {
      setSubscriptionMessage(error.response?.data?.message || 'Hiba a csomagváltáskor!');
    } finally {
      setIsUpdatingSubscription(false);
    }
  };

  const getPlanName = (type) => {
    switch (type) {
      case 'free': return 'Ingyenes';
      case 'optimum': return 'Optimum';
      case 'premium': return 'Prémium';
      default: return type || 'Nincs csomag';
    }
  };

  const getMaxPosts = () => {
    switch (user?.subscriptionType) {
      case 'free': return 1;
      case 'optimum': return 5;
      case 'premium': return 10;
      default: return 1;
    }
  };

  if (loading) return <div className="loading">Betöltés...</div>;
  if (!user) return <div>Hiba: A felhasználói adatok nem érhetők el.</div>;

  const isCompany = user.accountType === 'company';
  const companyDetails = user.companyDetails || {};

  return (
    <div className="upload-card">
      <h2>Üdv újra, {isCompany ? companyDetails.name : user.firstName}!</h2>

      {isCompany && companyDetails.logo && (
        <div className="company-logo-container" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <img
            src={companyDetails.logo}
            alt={`${companyDetails.name} logó`}
            style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      <fieldset className="upload-fieldset">
        <legend>{isCompany ? 'Cégadatok' : 'Személyes adatok'}</legend>
        <div className="fieldset-content">
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">E-mail:</span>
              <span className="info-value">{user.email}</span>
            </div>

            {isCompany ? (
              <>
                <div className="info-row">
                  <span className="info-label">Cég neve:</span>
                  <span className="info-value">{companyDetails.name}</span>
                </div>
                {companyDetails.contactPhone && (
                  <div className="info-row">
                    <span className="info-label">Telefon:</span>
                    <span className="info-value">{companyDetails.contactPhone}</span>
                  </div>
                )}
                {companyDetails.website && (
                  <div className="info-row">
                    <span className="info-label">Weboldal:</span>
                    <span className="info-value">
                      <a href={companyDetails.website.startsWith('http') ? companyDetails.website : `https://${companyDetails.website}`} target="_blank" rel="noopener noreferrer" className="profile-link">
                        {companyDetails.website}
                      </a>
                    </span>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-label">Számlázási név:</span>
                  <span className="info-value">{user.szamlaNev || companyDetails.name || 'Nincs megadva'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Számlázási cím:</span>
                  <span className="info-value">{user.szamlaCim || companyDetails.headquarters || 'Nincs megadva'}</span>
                </div>
              </>
            ) : (
              <>
                <div className="info-row">
                  <span className="info-label">Név:</span>
                  <span className="info-value">{user.firstName} {user.lastName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Telefon:</span>
                  <span className="info-value">{user.phone || 'N/A'}</span>
                </div>
              </>
            )}
          </div>

          <div className="button-group" style={{ marginTop: '1.5rem' }}>
            <Link href="/profile/settings" className="profile-button btn-secondary">
              Adatok módosítása
            </Link>
          </div>
        </div>
      </fieldset>

      {isCompany && (
        <fieldset className="upload-fieldset">
          <legend>Kredit egyenleg & feltöltés</legend>
          <div className="fieldset-content">
            <div className="info-grid">
              <div className="info-row">
                <span className="info-label">Aktuális egyenleg:</span>
                <span className="info-value highlight-credit">{user.credits ?? 0} kredit</span>
              </div>
            </div>
            <div className="button-group" style={{ marginTop: '1rem' }}>
              <Link href="/profile/finance" className="profile-button btn-primary">Kredit vásárlása</Link>
            </div>
          </div>
        </fieldset>
      )}

      {!isCompany && (
        <>
          <fieldset className="upload-fieldset">
            <legend>Előfizetésed</legend>
            <div className="fieldset-content">
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">Csomag:</span>
                  <span className="info-value">
                    <span className={`badge ${user.subscriptionType || 'free'}`}>
                      {getPlanName(user.subscriptionType)}
                    </span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Hirdetések:</span>
                  <span className="info-value">{postCount} / {getMaxPosts()}</span>
                </div>
                {(user.subscriptionType === 'optimum' || user.subscriptionType === 'premium') && user.subscriptionEndDate && (
                  <div className="info-row">
                    <span className="info-label">Érvényes:</span>
                    <span className="info-value" style={{ color: '#d2691e', fontWeight: 'bold' }}>
                      {new Date(user.subscriptionEndDate).toLocaleDateString('hu-HU')} -ig
                    </span>
                  </div>
                )}
              </div>
              <div className="button-group">
                <button onClick={handleSubscriptionChange} disabled={isUpdatingSubscription} className="profile-button">
                  {isUpdatingSubscription ? 'Váltás...' : 'Csomag váltása'}
                </button>
              </div>
              {subscriptionMessage && (
                <p className={subscriptionMessage.includes('váltva') ? 'success-text' : 'info-text'} style={{ marginTop: '8px' }}>
                  {subscriptionMessage}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className="upload-fieldset">
            <legend>Ajánlói program</legend>
            <div className="fieldset-content">
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">Saját ajánlói kódod:</span>
                  <span className="info-value"><code className="info-code">{user.referralCode || '—'}</code></span>
                </div>
                <div className="info-row">
                  <span className="info-label">Még küldhető meghívó:</span>
                  <span className="info-value">{2 - (user.referralCodeUses || 0)} db</span>
                </div>
              </div>
              <div className="referral-info" style={{ marginTop: '16px', fontSize: '14px', color: '#444', lineHeight: '1.5' }}>
                <p>
                  <strong>Hogyan működik?</strong><br />
                  Maximum <strong>2 kódot</strong> tudsz elküldeni ingatlanhirdető ismerőseidnek. Minden egyes sikeres meghívás után (ha az illető regisztrál a kódoddal) Te kapsz <strong>+1 hónap Prémium</strong> előfizetést ingyen.
                </p>
                <p>
                  Ha Te magad kód használatával regisztrálsz, szintén kapsz <strong>1 hónap Prémiumot</strong>. Így összesen akár <strong>3 hónap ingyen Prémiumot</strong> is szerezhetsz (2 meghívott + saját regisztráció).
                </p>
                <p style={{ color: '#0066cc', fontWeight: '500' }}>
                  Oszd meg a kódodat ingatlanhirdető barátokkal, ismerősökkel – hogy tovább maradj Prémium!
                </p>
              </div>
            </div>
          </fieldset>
        </>
      )}

      <div className="button-group horizontal-buttons">
        {!isCompany && <Link href="/profile/upload" className="profile-button btn-primary">+ Új hirdetés</Link>}
        <Link href="/profile/posts" className="profile-button">Hirdetéseim</Link>
        <Link href="/profile/settings" className="profile-button">Beállítások</Link>
      </div>
    </div>
  );
};

export default ProfilePage;