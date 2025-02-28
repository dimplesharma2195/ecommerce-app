import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('idToken') || null);

  const login = (idToken) => {
    setToken(idToken);
    localStorage.setItem('idToken', idToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('idToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
