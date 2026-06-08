'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCurrentUser } from '../services/usersService';
import { startBarionPayment, checkPaymentStatus } from '../services/financeService';
import apiClient from '../services/apiClient';
import '../styles/UploadPage.css';

import '../styles/layout/DashboardLayout.css';
import '../styles/pages/FinancePage.css';

const BARION_LOGO_COLORED = '/barion-logo.png';
const BARION_LOGO_WHITE = '/barion-white.png';

const PLANS = [
  { 
    id: 'free', 
    name: 'Ingyenes', 
    maxPosts: 1, 
    desc: '1 hirdetés, kép nélkül', 
    className: 'free'
  },
  { 
    id: 'optimum', 
    name: 'Optimum', 
    maxPosts: 5, 
    desc: '5 hirdetés képekkel', 
    className: 'optimum',
    priceOnce: 1990,
    priceRecurring: 1590,
  },
  { 
    id: 'premium', 
    name: 'Prémium', 
    maxPosts: 10, 
    desc: '10 hirdetés képekkel, 3 kiemelés, 1 arany kiemelés', 
    className: 'premium',
    priceOnce: 4990,
    priceRecurring: 3990,
  },
];

const CREDIT_PACKAGES = [
  { credits: 20,  pricePerCredit: 250, total:  5000 },
  { credits: 50,  pricePerCredit: 230, total: 11500 },
  { credits: 100, pricePerCredit: 210, total: 21000 },
  { credits: 250, pricePerCredit: 190, total: 47500 },
  { credits: 500, pricePerCredit: 170, total: 85000 },
];

const getCurrentDiscount = () => {
  const now = new Date();
  const march31 = new Date('2026-03-31T23:59:59');
  const april30 = new Date('2026-04-30T23:59:59');
  const may31  = new Date('2026-05-31T23:59:59');

  if (now <= march31) return { percent: 50, label: '-50% kedvezmény 2026. március 31-ig' };
  if (now <= april30) return { percent: 30, label: 'április végéig' };
  if (now <= may31)  return { percent: 10, label: 'május végéig' };
  return { percent: 0, label: '' };
};

const FinancePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [selectedCredits, setSelectedCredits] = useState(null);
  const [customCredits, setCustomCredits] = useState('');

  const discount = getCurrentDiscount();

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setSelectedPlan(currentUser.subscriptionType || 'free');

        if (searchParams.get('paymentId') || searchParams.has('PaymentRequestId')) {
          setMessage('Fizetés feldolgozása... Frissítjük az egyenleget.');
          const updated = await getCurrentUser();
          setUser(updated);
          setMessage('Sikeres tranzakció! Egyenleg frissítve.');
          router.replace('/profile/finance');
        }
      } catch (err) {
        console.error(err);
        setMessage('Hiba történt.');
      } finally {
        setLoading(false);
      }
    };
    initPage();
  }, [searchParams, router]);

  const handleSubscriptionPayment = async (isRecurring) => {
    if (isProcessing || !['optimum', 'premium'].includes(selectedPlan) || !termsAccepted) {
      setMessage('Kérjük, válaszd ki a csomagot és fogadd el az ÁSZF-et!');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    try {
      const result = await startBarionPayment(selectedPlan, isRecurring);
      
      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        setMessage(result.message || 'Hiba a fizetés indításakor');
      }
    } catch (error) {
      setMessage('Hálózati hiba történt.');
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmCancelSubscription = async () => {
    setIsProcessing(true);
    setMessage('');

    try {
      const res = await apiClient.put('/finance/cancel-subscription');

      if (res.data.success) {
        const updated = await getCurrentUser();
        setUser(updated);

        setMessage(
          `Előfizetés sikeresen lemondva. A csomag érvényes marad ${
            updated.subscriptionEndDate 
              ? new Date(updated.subscriptionEndDate).toLocaleDateString('hu-HU') + '-ig' 
              : 'a lejáratig'
          }. További terhelés nem lesz.`
        );

        setShowCancelConfirm(false);
      } else {
        setMessage(res.data.message || 'Lemondás sikertelen, próbáld újra.');
      }
    } catch (error) {
      console.error('Lemondás API hiba:', error);
      setMessage(
        error.response?.data?.message || 
        'Hiba a lemondás során. Próbáld újra később, vagy vedd fel velünk a kapcsolatot.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateDiscountedPrice = (baseTotal) => {
    if (discount.percent === 0) return baseTotal;
    return Math.round(baseTotal * (1 - discount.percent / 100));
  };

  const calculatePrice = (credits) => {
    if (!credits || credits < 10) return { perCredit: 250, total: 0 };
    if (credits >= 500) return { perCredit: 170, total: credits * 170 };
    if (credits >= 250) return { perCredit: 190, total: credits * 190 };
    if (credits >= 100) return { perCredit: 210, total: credits * 210 };
    if (credits >=  50) return { perCredit: 230, total: credits * 230 };
    return { perCredit: 250, total: credits * 250 };
  };

  const calculateFinalPrice = (baseNetTotal, isCompany = false) => {
    const disc = getCurrentDiscount();
    const discountedNet = Math.round(baseNetTotal * (1 - disc.percent / 100));

    let finalBrutto = discountedNet;
    if (isCompany) {
      finalBrutto = Math.round(discountedNet * 1.27);
    }

    return {
      netOriginal: baseNetTotal,
      netDiscounted: discountedNet,
      bruttoFinal: finalBrutto,
      percent: disc.percent,
      label: disc.label
    };
  };

  const handleBuyCredits = async () => {
    if (!termsAccepted) {
      setMessage('Kérjük fogadd el az ÁSZF-et és az adatvédelmi tájékoztatót!');
      return;
    }

    let creditsToBuy, amountHUF;

    if (selectedCredits) {
      const calc = calculateFinalPrice(selectedCredits.total, true);
      creditsToBuy = selectedCredits.credits;
      amountHUF = calc.bruttoFinal;
    } else if (customCredits && Number(customCredits) >= 10) {
      const baseNet = Number(customCredits) * 250;
      const calc = calculateFinalPrice(baseNet, true);
      creditsToBuy = Number(customCredits);
      amountHUF = calc.bruttoFinal;
    } else {
      setMessage('Válassz csomagot vagy adj meg érvényes kredit mennyiséget (legalább 10)!');
      return;
    }

    setIsProcessing(true);
    setMessage('Fizetési folyamat indítása...');

    try {
      const res = await apiClient.post('/finance/start-payment', {
        type: 'credits',
        credits: creditsToBuy,
        amountHUF: amountHUF,
        autoRenew: false,
      });

      if (res.data.success && res.data.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      } else {
        setMessage(res.data.message || 'Hiba a fizetés indításakor');
      }
    } catch (err) {
      console.error(err);
      setMessage('Hálózati vagy szerver hiba történt.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="loading">Betöltés...</div>;
  if (!user) return <div className="message error">Nem sikerült betölteni a felhasználói adatokat.</div>;

  const isIndividual = user?.accountType === 'individual';
  const isCompany = !isIndividual;
  const isOptimum = user.subscriptionType === 'optimum';
  const isPremium = user.subscriptionType === 'premium';
  const isRecurring = user.autoRenew === true;
  const endDate = user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : null;

  return (
    <div className="profile-card">
      <div className="upload-card">
        <h2>{isIndividual ? 'Hirdetési csomagok' : 'Kreditek és kiemelések'}</h2>

        {discount.percent > 0 && (
          <div className="promo-banner">
            <strong>Bevezető kedvezmény érvényben</strong>
            <span className="period">{discount.label}</span>
          </div>
        )}

        {isCompany && (
          <>
            <fieldset className="upload-fieldset">
              <legend>Aktuális kredit egyenleg</legend>
              <div className="credit-balance-section">
                <div className="balance-column">
                  <div className="balance-display">
                    <div className="balance-amount">
                      {(user.credits || 0).toLocaleString('hu-HU')}
                    </div>
                    <div className="balance-label">rendelkezésre álló kredit</div>
                  </div>
                </div>

                <div className="info-column">
                  <div className="credit-info-box">
                    <h4>Mire jók a kreditek?</h4>
                    <ul>
                      <li><strong>1 kredit</strong> = <strong>1 normál kiemelés</strong> egy hétre</li>
                      <li><strong>3 kredit</strong> = <strong>1 arany kiemelés</strong> egy hétre</li>
                      <li>Egy hirdetést többszörösen is ki lehet emelni, ilyenkor minden további kiemelés +1 hetet ad a lejárati időhöz.</li>
                      <li>A kreditek <strong>nem járnak le</strong>, bármikor, és bármeddig felhasználhatók</li>
                      <li>
                        További információ itt: <a 
                          href="https://ingatlan-terkep.hu/blog/kreditrendszer-tajekoztato" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: '500' }}
                        >
                          Kreditrendszer tájékoztató
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="upload-fieldset">
              <legend>Kredit vásárlása</legend>
              <div className="fieldset-content" style={{ padding: '0 8px' }}>
                <div className="plans-grid">
                  {CREDIT_PACKAGES.map((pkg) => {
                    const isSelected = selectedCredits?.credits === pkg.credits;
                    const discountedTotal = calculateDiscountedPrice(pkg.total);

                    return (
                      <div
                        key={pkg.credits}
                        className={`plan-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedCredits(pkg);
                          setCustomCredits('');
                        }}
                      >
                        <div className="plan-header">
                          <h5>{pkg.credits} kredit</h5>
                        </div>

                        <div className="plan-body">
                          <div className="price-with-vat">
                            {discount.percent > 0 ? (
                              <>
                                <span className="old-price">
                                  {pkg.total.toLocaleString('hu-HU')} Ft
                                </span>
                                <span className="credit-price-main">
                                  {discountedTotal.toLocaleString('hu-HU')} Ft
                                </span>
                              </>
                            ) : (
                              <span className="credit-price-main">
                                {pkg.total.toLocaleString('hu-HU')} Ft
                              </span>
                            )}
                            <span className="vat-small">+ÁFA</span>
                          </div>

                          <div className="credit-per-unit">
                            {Math.round(discountedTotal / pkg.credits)} Ft / kredit
                          </div>

                          {discount.percent > 0 && (
                            <span className="discount-badge">
                              –{discount.percent}% kedvezmény
                            </span>
                          )}

                          {isSelected && <div className="selected-label">Kiválasztva ✓</div>}
                        </div>
                      </div>
                    );
                  })}

                  <div
                    className={`plan-card ${!selectedCredits && customCredits ? 'selected' : ''}`}
                    onClick={() => setSelectedCredits(null)}
                  >
                    <div className="plan-header" style={{ background: 'linear-gradient(135deg, #6b7280, #4b5563)' }}>
                      <h5>Egyedi mennyiség</h5>
                    </div>

                    <div className="plan-body" style={{ padding: '16px' }}>
                      <input
                        type="number"
                        min="10"
                        step="10"
                        placeholder="Pl. 120"
                        value={customCredits}
                        onChange={(e) => {
                          setCustomCredits(e.target.value);
                          setSelectedCredits(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '1.1rem',
                          textAlign: 'center',
                          border: '2px solid #d1d5db',
                          borderRadius: '8px',
                          marginBottom: '12px',
                        }}
                      />

                      {customCredits && Number(customCredits) >= 10 ? (
                        (() => {
                          const baseTotal = Number(customCredits) * 250;
                          const discountedTotal = calculateDiscountedPrice(baseTotal);
                          return (
                            <div className="price-with-vat">
                              {discount.percent > 0 ? (
                                <>
                                  <span className="old-price">
                                    {baseTotal.toLocaleString('hu-HU')} Ft
                                  </span>
                                  <span className="credit-price-main">
                                    {discountedTotal.toLocaleString('hu-HU')} Ft
                                  </span>
                                </>
                              ) : (
                                <span className="credit-price-main">
                                  {baseTotal.toLocaleString('hu-HU')} Ft
                                </span>
                              )}
                              <span className="vat-small">+ÁFA</span>
                              {discount.percent > 0 && (
                                <span className="discount-badge">
                                  –{discount.percent}% kedvezmény
                                </span>
                              )}
                            </div>
                          );
                        })()
                      ) : (
                        <div style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '12px' }}>
                          Legalább 10 kredit
                        </div>
                      )}

                      {!selectedCredits && customCredits && Number(customCredits) >= 10 && (
                        <div className="selected-label" style={{ marginTop: '12px' }}>
                          Kiválasztva ✓
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {(selectedCredits || (customCredits && Number(customCredits) >= 10)) && (
                  <>
                    <div className="purchase-summary">
                      <strong>Választott:</strong> {selectedCredits ? `${selectedCredits.credits} kredit` : `${customCredits} kredit (egyedi)`}
                      <br />
                      <strong>Nettó ár (kedvezménnyel):</strong>{' '}
                      <span className="credit-price-main">
                        {selectedCredits
                          ? calculateFinalPrice(selectedCredits.total, true).netDiscounted.toLocaleString('hu-HU')
                          : calculateFinalPrice(Number(customCredits) * 250, true).netDiscounted.toLocaleString('hu-HU')} Ft
                      </span>
                      <span className="vat-small"> +ÁFA</span>
                      <br />
                      <strong>Fizetendő összeg (bruttó):</strong>{' '}
                      <span className="credit-price-main">
                        {selectedCredits
                          ? calculateFinalPrice(selectedCredits.total, true).bruttoFinal.toLocaleString('hu-HU')
                          : calculateFinalPrice(Number(customCredits) * 250, true).bruttoFinal.toLocaleString('hu-HU')} Ft
                      </span>
                    </div>

                    <div className="terms-checkbox">
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1.05rem' }}>
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          style={{ width: 22, height: 22 }}
                        />
                        Elfogadom az <a href="/aszf" target="_blank">ÁSZF-et</a> és az{' '}
                        <a href="/privacy-policy" target="_blank">adatvédelmi tájékoztatót</a>
                      </label>
                      <div className="button-group">
                        <button
                          onClick={handleBuyCredits}
                          disabled={isProcessing || !termsAccepted}
                          className="profile-button barion-button"
                        >
                          {isProcessing ? 'Feldolgozás...' : 'Tovább a fizetéshez'}
                        </button>
                      </div>
                    </div>

                    {message && (
                      <p className={message.includes('Sikeres') ? 'success-text' : 'error-text'} style={{ marginTop: '24px', fontSize: '1.1rem' }}>
                        {message}
                      </p>
                    )}
                  </>
                )}

                <div style={{ textAlign: 'center', margin: '32px 0 16px 0' }}>
                  <img
                    src="/Large-nobg-light.png"
                    alt="Elfogadott kártyák"
                    style={{ height: '56px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ textAlign: 'center', marginTop: '8px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>
                    Biztonságos bankkártyás fizetés a <strong>Barion</strong> rendszerén keresztül
                  </p>
                  <p style={{ fontSize: '13px', color: '#777', margin: '4px 0 0 0' }}>
                    Adataidat nem tároljuk • SSL titkosítás • PCI DSS tanúsított
                  </p>
                </div>
              </div>
            </fieldset>
          </>
        )}

        {isIndividual && (
          <>
            <fieldset className="upload-fieldset">
              <legend>Aktuális csomagom</legend>
              <div className="fieldset-content" style={{ textAlign: 'center', padding: '20px 10px' }}>
                <p style={{ fontSize: '18px', margin: '0 0 12px 0' }}>
                  <strong>Csomag:</strong>{' '}
                  <span 
                    className={`badge ${isPremium ? 'premium' : isOptimum ? 'optimum' : 'free'}`} 
                    style={{ fontSize: '16px', padding: '6px 14px' }}
                  >
                    {isPremium ? 'Prémium' : isOptimum ? 'Optimum' : 'Ingyenes'}
                  </span>
                  {(isOptimum || isPremium) && isRecurring && (
                    <span style={{ marginLeft: '10px', color: '#28a745', fontWeight: 'bold', fontSize: '16px' }}>
                      Automatikus
                    </span>
                  )}
                </p>

                {(isOptimum || isPremium) && endDate && (
                  <p style={{ color: '#d2691e', fontWeight: 'bold', fontSize: '19px', margin: '12px 0 0 0' }}>
                    Érvényes: {endDate.toLocaleDateString('hu-HU')} -ig
                  </p>
                )}

                {!(isOptimum || isPremium) && (
                  <p style={{ color: '#856404', fontStyle: 'italic', marginTop: '12px' }}>
                    Jelenleg nincs aktív fizetős csomagod.
                  </p>
                )}
              </div>
            </fieldset>

            <fieldset className="upload-fieldset">
              <legend>Előfizetés kiválasztása</legend>
              <div className="fieldset-content">
                <div className="plans-grid">
                  {PLANS.map((plan) => {
                    const disabled = isOptimum && plan.id === 'free';
                    const isSelected = selectedPlan === plan.id;

                    return (
                      <div
                        key={plan.id}
                        className={`plan-card ${plan.className} ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                        onClick={() => !disabled && setSelectedPlan(plan.id)}
                        style={disabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                      >
                        <div className="plan-header" style={{ backgroundColor: plan.color }}>
                          <h5>{plan.name}</h5>
                          {plan.priceOnce > 0 && <div className="price">{plan.priceOnce.toLocaleString('hu-HU')} Ft / 30 nap</div>}
                        </div>
                        <div className="plan-body">
                          <p className="desc" style={{ color: '#8b4513' }}>{plan.desc}</p>
                          <p style={{ color: '#8b4513' }}><strong>Max hirdetések:</strong> {plan.maxPosts}</p>
                          {isSelected && <div className="selected-label" style={{ marginTop: '12px' }}>Kiválasztva ✓</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {['optimum', 'premium'].includes(selectedPlan) && (
                  <>
                    <div className="purchase-summary">
                      <strong>Választott csomag:</strong> {PLANS.find(p => p.id === selectedPlan)?.name}
                      <br />
                      <strong>Ár:</strong>{' '}
                      {isRecurring ? (
                        <>
                          {PLANS.find(p => p.id === selectedPlan)?.priceRecurring.toLocaleString('hu-HU')} Ft / hó
                          <small> (előfizetés)</small>
                          <br />
                          <small style={{ color: '#6b7280' }}>
                            (egyszeri ár: {PLANS.find(p => p.id === selectedPlan)?.priceOnce.toLocaleString('hu-HU')} Ft / 30 nap)
                          </small>
                        </>
                      ) : (
                        <>
                          {PLANS.find(p => p.id === selectedPlan)?.priceOnce.toLocaleString('hu-HU')} Ft / 30 nap
                          <small> (egyszeri)</small>
                          <br />
                          <small style={{ color: '#6b7280' }}>
                            Előfizetéssel: {PLANS.find(p => p.id === selectedPlan)?.priceRecurring.toLocaleString('hu-HU')} Ft / hó
                          </small>
                        </>
                      )}
                    </div>

                    <div className="terms-checkbox">
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14.5px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          style={{ width: '18px', height: '18px', marginRight: '10px' }}
                        />
                        <span>
                          Elfogadom az <a href="/aszf" target="_blank" rel="noopener">ÁSZF-et</a> és az{' '}
                          <a href="/privacy-policy" target="_blank" rel="noopener">Adatvédelmi tájékoztatót</a>{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </span>
                      </label>
                      <div className="button-group">
                        <div className="tooltip-container">
                          <button
                            onClick={() => handleSubscriptionPayment(false)}
                            disabled={isProcessing || !termsAccepted}
                            className="profile-button barion-button"
                            style={{ opacity: !termsAccepted ? 0.6 : 1 }}
                          >
                            <span>Egyszeri vásárlás</span>
                          </button>
                          <span className="tooltip-text">
                            {PLANS.find(p => p.id === selectedPlan)?.priceOnce.toLocaleString('hu-HU')} Ft egyszeri • 
                            30 napig érvényes • Nincs automatikus levonás
                          </span>
                        </div>

                        <div className="tooltip-container">
                          <button
                            onClick={() => handleSubscriptionPayment(true)}
                            disabled={isProcessing || !termsAccepted}
                            className="profile-button"
                            style={{ background: '#28a745', opacity: !termsAccepted ? 0.6 : 1 }}
                          >
                            <span>Előfizetés</span>
                          </button>
                          <span className="tooltip-text">
                            {PLANS.find(p => p.id === selectedPlan)?.priceRecurring.toLocaleString('hu-HU')} Ft/hó • 
                            Minden 30. napon automatikusan levonjuk • Bármikor lemondható
                          </span>
                        </div>
                      </div>
                    </div>

                    {(isOptimum || isPremium) && isRecurring && (
                      <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <button
                          onClick={() => setShowCancelConfirm(true)}
                          disabled={isProcessing}
                          className="profile-button"
                          style={{ background: '#dc3545', color: 'white' }}
                        >
                          {isProcessing ? 'Lemondás folyamatban...' : 'Előfizetés lemondása'}
                        </button>
                        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                          A csomag érvényes marad {endDate ? endDate.toLocaleDateString('hu-HU') + '-ig' : 'a lejáratig'}.
                        </p>
                      </div>
                    )}

                    <div style={{ textAlign: 'center', margin: '32px 0 16px 0' }}>
                      <img
                        src="/Large-nobg-light.png"
                        alt="Elfogadott kártyák"
                        style={{ height: '56px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '8px', marginBottom: '20px' }}>
                      <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>
                        Biztonságos bankkártyás fizetés a <strong>Barion</strong> rendszerén keresztül
                      </p>
                      <p style={{ fontSize: '13px', color: '#777', margin: '4px 0 0 0' }}>
                        Adataidat nem tároljuk • SSL titkosítás • PCI DSS tanúsított
                      </p>
                    </div>

                    {(isOptimum || isPremium) && isRecurring && selectedPlan === user.subscriptionType && (
                      <p style={{ color: '#dc3545', textAlign: 'center', marginTop: '16px' }}>
                        Már aktív {user.subscriptionType === 'optimum' ? 'Optimum' : 'Prémium'} előfizetésed van (automatikus).
                      </p>
                    )}
                  </>
                )}
              </div>
            </fieldset>
          </>
        )}

        {showCancelConfirm && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '440px', padding: '32px' }}>
              <h3>Lemondod az {isOptimum ? 'Optimum' : 'Prémium'} csomagot?</h3>
              <p>A csomagod a lejárati dátumig még aktív marad.<br />A lemondás után nem kerül sor további levonásra.</p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button
                  onClick={confirmCancelSubscription}
                  disabled={isProcessing}
                  className="profile-button"
                  style={{ background: '#dc3545', color: 'white' }}
                >
                  {isProcessing ? 'Feldolgozás...' : 'Igen, lemondom'}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="profile-button btn-secondary"
                >
                  Mégse
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/profile" className="profile-button btn-secondary">Vissza a profilhoz</Link>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;