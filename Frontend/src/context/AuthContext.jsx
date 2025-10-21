import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null);

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (error) {
      console.error("Errore nel decodificare il token:", error);
      return null;
    }
  };

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);

    const decoded = decodeToken(token);
    setUser(decoded); //es. {email, isAdmin, id}};
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(false);
    localStorage.removeItem("token");
  };

  //Al primo caricamento controlla se esiste un token nel localStorage
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setUser(decoded);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
