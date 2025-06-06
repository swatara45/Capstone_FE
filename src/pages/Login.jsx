import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await publicRequest.post("/auth/login", { email, password });

    // Store token securely
    localStorage.setItem("token", res.data.token); // Ensure your backend returns { token: '...' }
    localStorage.setItem("email", res.data.email); // Do this after login/register

    setMessage("Login successful!");
    navigate("/myparcels");
  } catch (err) {
    console.error(err);
    setMessage("Login failed. Please check your credentials.");
  }
};


  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: "2rem auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={{ display: "block", marginBottom: 10, width: "100%" }} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={{ display: "block", marginBottom: 10, width: "100%" }} />
      <button type="submit" style={{ padding: "8px 16px", background: "#21b134", color: "#fff", border: "none", borderRadius: 4 }}>Login</button>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </form>
  );
};

export default Login;