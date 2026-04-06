import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiUrl } from '../config/env';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      fetchUser(stored);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (t) => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/user/info'), {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        setUser(await res.json());
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    await fetchUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
