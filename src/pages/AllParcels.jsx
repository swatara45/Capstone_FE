import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);
        const res = await axios.get("http://localhost:3000/api/parcels", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParcels(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching parcels:", err.response?.data || err.message || err);
        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to fetch parcels. Are you logged in as admin?"
        );
      }
    };

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.role !== "admin") {
      navigate("/myparcels");
      return;
    }

    fetchParcels();
  }, [currentUser, navigate]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "sendername", headerName: "Sender Name", width: 150 },
    { field: "recipientname", headerName: "Recipient Name", width: 150 },
    { field: "from", headerName: "From", width: 130 },
    { field: "to", headerName: "To", width: 130 },
    { field: "cost", headerName: "Cost ($)", type: "number", width: 130 },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-[3%] mx-[5%]">
      <div className="bg-white w-full max-w-[70vw] rounded-md p-6 shadow-md">
        <Link to="/" className="text-[#444] text-[18px] m-2 hover:opacity-70 inline-flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        <div className="flex justify-between p-[10px]">
          <h2 className="text-xl font-semibold text-[#444]">All Parcels</h2>
          <span className="text-[#444]">{currentUser?.fullname || "Admin"}</span>
        </div>

        {error && (
          <div className="text-red-600 font-semibold mb-4">{error}</div>
        )}

        <div className="p-3" style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={parcels}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </div>
    </div>
  );
};

export default AllParcels;