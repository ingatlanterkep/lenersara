import apiClient from './apiClient';

// src/services/authService.js

// src/services/authService.js

export const signup = async (data) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      referralCode
    } = data; // MOST már biztosan van benne!

    const emailString = typeof email === 'object' ? email.email : email;
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Ismeretlen Felhasználó';

    const response = await apiClient.post('/auth/signup', {
      email: emailString,
      password,
      accountType: 'individual',
      companyDetails: {
        name: fullName,
        contactPhone: phone,
        taxNumber: '',
        website: '',
        headquarters: '',
        companyType: '',
        companyNumber: ''
      },
      referralCode: referralCode || ''
    });

    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error);
    throw error;
  }
};
  

// Bejelentkezés
export const login = async (email, password) => {  // ← VÁLTOZTASD EZZÉ!
  try {
    const response = await apiClient.post('/auth/signin', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Verifikáló kód küldése
export const sendVerificationCode = async (email) => {
  try {
    const response = await apiClient.patch('/auth/send-verification-code', { email });
    return response.data;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

// Verifikáló kód ellenőrzése
export const verifyVerificationCode = async (email, providedCode) => {
  try {
    const response = await apiClient.patch('/auth/verify-verification-code', {
      email,
      providedCode,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying verification code:', error);
    throw error;
  }
};

// Elfelejtett jelszó kód küldése
export const sendForgotPasswordCode = async (email) => {
  try {
    const response = await apiClient.patch('/auth/send-forgot-password-code', { email });
    return response.data;  // Visszaadja az API válaszát
  } catch (error) {
    console.error('Error sending forgot password code:', error);
    throw error;
  }
};

// Elfelejtett jelszó kód ellenőrzése és új jelszó beállítása
export const verifyForgotPasswordCode = async ({ email, providedCode, newPassword }) => {
    try {
      const response = await apiClient.patch('/auth/verify-forgot-password-code', {
        email,
        providedCode, // A kód
        newPassword,  // Az új jelszó
      });
      return response.data;  // Visszaadja az API válaszát
    } catch (error) {
      console.error('Error verifying forgot password code:', error);
      throw error;
    }
  };

  // Jelszó módosítása
export const changePassword = async ({ oldPassword, newPassword }) => {
    try {
      const response = await apiClient.patch('/auth/change-password', {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }; 

export const deleteAccount = async (password) => {
  try {
    const response = await apiClient.delete('/auth/delete-account', {
      data: { password }, // A jelszót a kérés törzsében küldjük
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};