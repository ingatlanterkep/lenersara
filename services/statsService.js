import apiClient from './apiClient';

// Marker megjelenések naplózása
export const logMarkerViews = async (postIds, filters) => {
  try {
    const response = await apiClient.post('/stats/log-markers', { postIds, filters });
    return response.data;
  } catch (error) {
    console.error('Error logging marker views:', error);
    throw error.response?.data || error;
  }
};

// Esemény naplózása (popup_open, details_view)
export const logEvent = async (postId, eventType, filters) => {
  try {
    const response = await apiClient.post('/stats/log-event', { postId, eventType, filters });
    return response.data;
  } catch (error) {
    console.error(`Error logging ${eventType} event:`, error);
    throw error.response?.data || error;
  }
};

// Hirdetés statisztikáinak lekérdezése
export const getPostStats = async (postId, timeRange) => {
  try {
    const response = await apiClient.get(`/stats/post/${postId}`, { params: { timeRange } });
    return response.data.stats;
  } catch (error) {
    console.error('Error fetching post stats:', error);
    throw error.response?.data || error;
  }
};

// Felhasználó statisztikáinak lekérdezése
export const getUserStats = async (timeRange) => {
  try {
    const response = await apiClient.get('/stats/user', { params: { timeRange } });
    return response.data.stats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error.response?.data || error;
  }
};