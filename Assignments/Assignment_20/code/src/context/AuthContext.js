import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('idToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
