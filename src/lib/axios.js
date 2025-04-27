import axios from 'axios';
import { getCookie, removeCookie } from '@/lib/cookies';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
instance.interceptors.request.use(
  (config) => {
    // Get token from cookies
    const token = getCookie('token');

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear the token
      removeCookie('token');
      
      // Redirect to login page if not already there
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
