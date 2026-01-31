import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../axios/axiosInstance';
const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};

const login = (userData) => {
  return axiosInstance.post("/login", userData);
};

const getUserEmail = () => {
  const token = getToken();
  if (token) {
    const payLoad = jwtDecode(token);
    return payLoad?.email;
  }
  return null;
};
const getUserphone = () => {
  const token = getToken();
  if (token) {
    const payLoad = jwtDecode(token);
    return payLoad?.phone;
  }
  return null;
};
const getUserRole = () => {
  const token = getToken();
  if (token) {
    const payLoad = jwtDecode(token);
    return payLoad?.role;
  }
  return null;
};

const isLoggedIn = () => {
  const token = getToken();
  if (token) {
    const payLoad = jwtDecode(token);
    const isLogin = Date.now() < payLoad.exp * 1000;
    return isLogin;
  }
};

const logOut = () => {
  localStorage.clear();
};

export const authService = {
  logOut,
  getToken,
  setToken,
  login,
  getUserEmail,
  getUserRole,
  getUserphone,
  isLoggedIn,
};
