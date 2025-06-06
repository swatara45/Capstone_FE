import { useState } from "react";
import { publicRequest } from "../requestMethods"; // Axios instance with baseURL

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    age: "",
    country: "",
    address: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/auth/register", form);
      setMessage("Registration successful! You can now log in.");
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 20,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <h2>Register</h2>
      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={form.fullname}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          background: "#21b134",
          color: "#fff",
          border: "none",
          borderRadius: 4,
        }}
      >
        Register
      </button>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </form>
  );
};

export default Register;