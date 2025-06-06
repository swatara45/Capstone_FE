// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    try {
      setError(null);
      // Replace with your API call
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setCurrentUser(data.user); // or data, depending on API response
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);