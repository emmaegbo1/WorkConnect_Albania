import { createContext, useContext, useEffect, useState } from 'react';
import { api, attachTokenInterceptor } from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const getToken = () => accessToken;

  useEffect(() => {
    attachTokenInterceptor(getToken, async (token) => setAccessToken(token));
  }, []);

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    setAccessToken(null);
  };

  const value = { user, accessToken, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
