import axios from 'axios';

// Alap URL a backendhez - Next.js környezeti változó
const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000'}/api`;

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;