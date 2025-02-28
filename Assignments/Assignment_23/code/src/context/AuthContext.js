import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiryTime');
  };

  const login = (idToken) => {
    const expiryTime = Date.now() + 5 * 60 * 1000; 
    setToken(idToken);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('expiryTime', expiryTime);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('idToken');
    const storedExpiryTime = localStorage.getItem('expiryTime');

    if (storedToken && storedExpiryTime) {
      const expiry = Number(storedExpiryTime);
      if (Date.now() > expiry) {
        logout();
      } else {
        setToken(storedToken);
        const remainingTime = expiry - Date.now();
        const timer = setTimeout(() => {
          logout();
        }, remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};