// services/usersService.js
import apiClient from './apiClient';

export const updateSubscription = async (newSubscriptionType) => {
  try {
    const response = await apiClient.put('/users/update-subscription', { subscriptionType: newSubscriptionType });
    return response.data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error.response?.data || error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users/all-users');
    return response.data.users || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error.response?.data || error;
  }
};

// 🔥 JAVÍTVA - CSAK EZ A FÜGGVÉNY VÁLTOZOTT
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/users/current-user');
    return response.data;
  } catch (error) {
    // 🔥 NE DOBJUK TOVÁBB A HIBÁT, HANEM LOGOLJUK ÉS TÉRJÜNK VISSZA NULL-LAL
    console.warn('[usersService] Felhasználó lekérdezése sikertelen:', error.response?.status || error.message);
    return null; // ← VISSZATÉRÉS NULL-LAL
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/delete-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error.response?.data || error;
  }
};

export const deleteAccount = async (password) => {
  try {
    const response = await apiClient.delete('/auth/delete-account', { data: { password } });
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};