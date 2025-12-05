// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // ✅ undefined = still loading
  const [loading, setLoading] = useState(true);

  // ✅ Load token from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        return res.data.user; // ✅ return user object
      }
      return null;
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      return null;
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        return res.data.user; // ✅ return user object
      }
      return null;
    } catch (err) {
      console.error("Register error:", err.response?.data?.message || err.message);
      return null;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const resetPassword = async (email) => {
    try {
      await axios.post("/api/auth/reset-password", { email });
      alert("Password reset instructions sent to your email.");
    } catch (err) {
      console.error("Reset password error:", err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);















// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // ✅ Load token from localStorage on app start
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       // Optionally fetch user profile
//       axios
//         .get("/api/auth/me")
//         .then((res) => setUser(res.data.user))
//         .catch(() => {
//           // If token invalid, clear it
//           localStorage.removeItem("token");
//           setUser(null);
//         });
//     }
//   }, []);

//   const login = async ({ email, password }) => {
//     const res = await axios.post("/api/auth/login", { email, password });
//     if (res.data.token) {
//       localStorage.setItem("token", res.data.token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
//       setUser(res.data.user);
//     }
//   };

//   const register = async ({ name, email, password }) => {
//     const res = await axios.post("/api/auth/register", { name, email, password });
//     if (res.data.token) {
//       localStorage.setItem("token", res.data.token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
//       setUser(res.data.user);
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post("/api/auth/logout");
//     } catch (err) {
//       console.error("Logout error:", err.message);
//     }
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//     setUser(null);
//   };

//   const resetPassword = async (email) => {
//     await axios.post("/api/auth/reset-password", { email });
//     alert("Password reset instructions sent to your email.");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, register, logout, resetPassword }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);















// // src/context/AuthContext.jsx
// import { createContext, useContext, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const login = async ({ email, password }) => {
//     const res = await axios.post("/api/auth/login", { email, password });
//     setUser(res.data.user);
//   };

//   const register = async ({ name, email, password }) => {
//     const res = await axios.post("/api/auth/register", { name, email, password });
//     setUser(res.data.user);
//   };

//   const logout = async () => {
//     await axios.post("/api/auth/logout");
//     setUser(null);
//   };

//   // ✅ Reset password via backend
//   const resetPassword = async (email) => {
//     await axios.post("/api/auth/reset-password", { email });
//     alert("Password reset instructions sent to your email.");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
