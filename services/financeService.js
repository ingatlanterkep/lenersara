// services/financeService.js
import apiClient from './apiClient';

export const startBarionPayment = async (plan, isRecurring = false) => {
  try {
    const response = await apiClient.post('/finance/start-payment', {
      plan,
      autoRenew: isRecurring // ← ez megy a backendnek
    });
    return response.data;
  } catch (error) {
    console.error('Barion fizetés indítása sikertelen:', error);
    throw error.response?.data || { message: 'Hiba a fizetés indításakor' };
  }
};

export const checkPaymentStatus = async (paymentId) => {
  try {
    const response = await apiClient.get(`/finance/payment-status/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Státusz lekérése sikertelen' };
  }
};