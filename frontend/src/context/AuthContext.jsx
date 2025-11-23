// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const res = await axios.post("/api/auth/login", { email, password });
    setUser(res.data.user);
  };

  const register = async ({ name, email, password }) => {
    const res = await axios.post("/api/auth/register", { name, email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  // ✅ Reset password via backend
  const resetPassword = async (email) => {
    await axios.post("/api/auth/reset-password", { email });
    alert("Password reset instructions sent to your email.");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
