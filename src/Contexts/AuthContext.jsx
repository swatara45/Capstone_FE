// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  // Load from localStorage on app start
  useEffect(() => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const fullname = localStorage.getItem("fullname");

    if (email && role) {
      setCurrentUser({ email, role, fullname });
    }
  }, []);

  // Called from Login.jsx after successful login
  const login = async ({ email, password }) => {
    try {
      setError(null);
      const res = await fetch("https://capstone-be-1-sqdu.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token and user info to localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("fullname", data.fullname || "");

      // Update context
      setCurrentUser({
        email: data.email,
        role: data.role,
        fullname: data.fullname || "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
