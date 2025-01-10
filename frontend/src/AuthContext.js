import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Überprüfe bei der Initialisierung, ob ein Token vorhanden ist
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    // Speichere den Token im localStorage
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Entferne den Token aus dem localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const signupUser = async (email, password) => {
  const response = await fetch('https://soulcare-mu.vercel.app/api/users/signup', { 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
      throw new Error('Failed to signup user');
  }

  return true;
};


export const useAuth = () => useContext(AuthContext);
