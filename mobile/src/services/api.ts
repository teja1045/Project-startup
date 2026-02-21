import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// Read API URL from environment variable
const API_URL = Config.API_URL || 'https://build-serve-test.preview.emergentagent.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (password: string) => {
    const response = await api.post('/admin/login', { password });
    if (response.data.access_token) {
      await AsyncStorage.setItem('admin_token', response.data.access_token);
    }
    return response.data;
  },
  logout: async () => {
    await AsyncStorage.removeItem('admin_token');
  },
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('admin_token');
    return !!token;
  },
};

export const quotesAPI = {
  create: async (data: any) => {
    const response = await api.post('/quotes', data);
    return response.data;
  },
  getAll: async (limit = 50, skip = 0) => {
    const response = await api.get(`/quotes?limit=${limit}&skip=${skip}`);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/quotes/${id}/status?status=${status}`);
    return response.data;
  },
};

export const consultationsAPI = {
  create: async (data: any) => {
    const response = await api.post('/consultations', data);
    return response.data;
  },
  getAll: async (limit = 50, skip = 0) => {
    const response = await api.get(`/consultations?limit=${limit}&skip=${skip}`);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/consultations/${id}/status?status=${status}`);
    return response.data;
  },
};

export const statsAPI = {
  get: async () => {
    const response = await api.get('/stats');
    return response.data;
  },
};

export default api;