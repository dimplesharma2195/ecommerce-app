import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('idToken') || null);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || null);

  const login = (idToken, email) => {
    setToken(idToken);
    setUserEmail(email);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('idToken');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};