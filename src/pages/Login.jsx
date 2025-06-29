import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear old messages

    try {
      await login({ email, password });

      const role = localStorage.getItem("role");

      if (role === "admin") {
        navigate("/allparcels");
      } else {
        navigate("/myparcels");
      }
    } catch (err) {
      console.log("Caught error:", err);
      setMessage(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setMessage("");
        }}
        required
        className="login-input"
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setMessage("");
        }}
        required
        className="login-input"
        autoComplete="current-password"
      />
      <button type="submit" className="login-button">
        Login
      </button>
      {message && <p className="login-message">{message}</p>}
    </form>
  );
};

export default Login;
