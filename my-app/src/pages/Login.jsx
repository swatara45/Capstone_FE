import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { publicRequest } from "../requestMethods"; // Make sure this is set up

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/auth/login", { email, password });
      setMessage("Login successful!");
      navigate("/myparcels"); // or wherever you want to redirect
    } catch (err) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <div className="h-[80vh] flex items-center justify-evenly p-[50px] text-gray-300">
        <div>
          <h2 className="text-[#D9D9D9] font-semibold text-[35px]">
            SendIT Admin
          </h2>
          <img src="/hero.png" alt="" />
        </div>
        <form
          className="h-[450px] w-[450px] bg-[#E9EB77] rounded-md"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            className="flex items-center justify-center bg-[#fff] p-[20px] w-[350px] m-[10%] outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="flex items-center">
            <input
              type="password"
              className="flex items-center justify-center bg-[#fff] p-[20px] w-[350px] ml-[10%] outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#1E1E1E] w-[350px] p-[15px] text-white font-semibold text-[18px] m-[10%]"
          >
            Login
          </button>
          {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;