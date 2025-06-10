import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });

      const role = localStorage.getItem("role");

      if (role === "admin") {
        navigate("/allparcels");
      } else {
        navigate("/myparcels");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input"
        autoComplete="current-password"
      />
      <button type="submit" className="login-button">
        Login
      </button>
      {(message || error) && (
        <p className="login-message">{message || error}</p>
      )}
    </form>
  );
};

export default Login;
