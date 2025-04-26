import axios from '@/lib/axios';
import { setCookie, getCookie, removeCookie } from '@/utils/cookies';

export const login = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};

export const verify = async (email, code) => {
  const response = await axios.post('/auth/verify', { email, code });
  return response.data;
};

export const setToken = (token, maxAge = 60 * 60 * 24 * 30) => {
  setCookie('token', token, { expires: maxAge / (60 * 60 * 24) }); // Convert seconds to days for js-cookie
};

export const getToken = () => {
  return getCookie('token');
};

export const removeToken = () => {
  removeCookie('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  window.location.href = '/login';
}; 