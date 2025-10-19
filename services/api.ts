import { UserResponse } from '@/store/session/useSignin';
import { storage } from '@/utils/storage';
import axios, { AxiosRequestHeaders } from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '1233',
  },
});

api.interceptors.request.use((config) => {
  const accountJson = storage.getString('account');
  if (accountJson) {
    const account: UserResponse = JSON.parse(accountJson);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${account.accessToken}`,
    } as AxiosRequestHeaders;
  }
  return config;
});

export default api;
