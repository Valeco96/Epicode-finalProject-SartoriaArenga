import { createContext, useEffect, useState } from "react";
import { login as loginUser } from "../data/auth";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // Carica utente e token dal localStorage all'avvio
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Funzione di login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      localStorage.setItem("token", data.token);

      // Decodifica user dal JWT
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const userData = {
        id: payload.id,
        email: payload.email,
        isAdmin: payload.isAdmin,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Funzione di logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


