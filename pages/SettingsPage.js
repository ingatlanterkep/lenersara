'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAccount, getCurrentUser } from '../services/usersService';
import { changePassword } from '../services/authService';
import apiClient from '../services/apiClient';
import '../styles/layout/DashboardLayout.css';

const SettingsPage = () => {
  const router = useRouter();

  // Jelszó módosítás állapotok
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Fiók törlés állapotok
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  // Számlázási adatok állapotok
  const [billingData, setBillingData] = useState({
    szamlaNev: '',
    szamlaCim: '',
  });
  const [billingMessage, setBillingMessage] = useState('');
  const [billingSuccess, setBillingSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [billingLoading, setBillingLoading] = useState(true);

  // Számlázási adatok betöltése
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        const details = res.companyDetails || {};
        setBillingData({
          szamlaNev: details.szamlaNev || '',
          szamlaCim: details.szamlaCim || '',
        });
      } catch (err) {
        console.error('Felhasználó adatok betöltése sikertelen:', err);
      } finally {
        setBillingLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Jelszó módosítás kezelése
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage('');

    try {
      const response = await changePassword({ oldPassword, newPassword });

      if (response?.success) {
        setPasswordMessage('A jelszavad sikeresen módosult!');
        setOldPassword('');
        setNewPassword('');
        setTimeout(() => setShowPasswordForm(false), 2000);
      } else {
        setPasswordMessage(response?.message || 'Sikertelen módosítás.');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Hiba történt a jelszó módosításakor. Próbáld újra!';
      setPasswordMessage(errMsg);
    } finally {
      setPasswordLoading(false);
    }
  };

  // Számlázási adatok mentése
  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setBillingMessage('');
    setBillingSuccess(false);

    try {
      const res = await apiClient.patch('/users/billing', billingData);

      if (res.data.success) {
        setBillingSuccess(true);
        setBillingMessage('Számlázási adatok sikeresen frissítve!');
      }
    } catch (err) {
      setBillingMessage(err.response?.data?.message || 'Hiba a mentés során');
    } finally {
      setSaving(false);
    }
  };

  // Fiók törlése
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deletePassword) {
      setDeleteMessage('Add meg a jelszavad!');
      return;
    }

    try {
      const res = await deleteAccount(deletePassword);
      if (res.success) {
        localStorage.removeItem('token');
        setDeleteMessage('Fiók törölve! Átirányítás...');
        setTimeout(() => router.push('/login'), 1500);
      }
    } catch (err) {
      setDeleteMessage(err.response?.data?.message || 'Hiba történt.');
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="upload-card">
      <h2>Beállítások</h2>

      {/* JELSZÓ MÓDOSÍTÁSA */}
      <fieldset className="upload-fieldset">
        <legend>Jelszó módosítása</legend>
        <div className="fieldset-content">
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="profile-button btn-secondary"
            >
              Jelszó módosítása
            </button>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label>Régi jelszó</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="form-input"
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="form-group">
                <label>Új jelszó</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                  type="submit"
                  className="profile-button btn-primary"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? 'Folyamatban...' : 'Módosítás'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordMessage('');
                    setOldPassword('');
                    setNewPassword('');
                  }}
                  className="profile-button btn-secondary"
                >
                  Mégse
                </button>
              </div>

              {passwordMessage && (
                <p
                  className={passwordMessage.includes('sikeresen') ? 'success-text' : 'error-text'}
                  style={{ marginTop: '12px' }}
                >
                  {passwordMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </fieldset>

      {/* SZÁMLÁZÁSI ADATOK */}
      <fieldset className="upload-fieldset">
        <legend>Számlázási adatok</legend>
        <div className="fieldset-content">
          {billingLoading ? (
            <p>Betöltés...</p>
          ) : (
            <form onSubmit={handleBillingSubmit}>
              <div className="form-group">
                <label>Számlázási név *</label>
                <input
                  type="text"
                  name="szamlaNev"
                  value={billingData.szamlaNev}
                  onChange={handleBillingChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Számlázási cím (irányítószám, város, utca, házszám) *</label>
                <input
                  type="text"
                  name="szamlaCim"
                  value={billingData.szamlaCim}
                  onChange={handleBillingChange}
                  className="form-input"
                  placeholder="pl. 1123 Budapest, Példa utca 12."
                  required
                />
              </div>

              <button
                type="submit"
                className="profile-button btn-primary"
                disabled={saving}
                style={{ marginTop: '15px' }}
              >
                {saving ? 'Mentés...' : 'Mentés'}
              </button>

              {billingMessage && (
                <p
                  className={billingSuccess ? 'success-text' : 'error-text'}
                  style={{ marginTop: '12px' }}
                >
                  {billingMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </fieldset>

      {/* FIÓK TÖRLÉSE */}
      <fieldset className="upload-fieldset" style={{ borderColor: '#dc3545' }}>
        <legend style={{ color: '#dc3545' }}>Fiók törlése</legend>
        <div className="fieldset-content">
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Figyelem:</span>
              <span className="info-value" style={{ color: '#dc3545', fontWeight: 'bold' }}>
                Ez végleges művelet!
              </span>
            </div>
          </div>

          {!isDeleting ? (
            <button
              onClick={() => setIsDeleting(true)}
              className="profile-button btn-danger"
            >
              Fiók törlése
            </button>
          ) : (
            <form onSubmit={handleDelete}>
              <div className="form-group">
                <label>Jelszó megerősítése</label>
                <input
                  type="password"
                  placeholder="Jelszó"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="submit" className="profile-button btn-danger">
                  Végleges törlés
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleting(false);
                    setDeleteMessage('');
                    setDeletePassword('');
                  }}
                  className="profile-button btn-secondary"
                >
                  Mégse
                </button>
              </div>

              {deleteMessage && (
                <p
                  className={deleteMessage.includes('törölve') ? 'success-text' : 'error-text'}
                  style={{ marginTop: '12px' }}
                >
                  {deleteMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default SettingsPage;