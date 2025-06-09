import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // Optionally clear all localStorage:
    // localStorage.clear();

    // Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold mb-4">Logging out...</h2>
    </div>
  );
};

export default Logout;