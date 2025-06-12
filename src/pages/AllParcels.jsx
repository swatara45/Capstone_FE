import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";
import "../App.css";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch parcels. Are you logged in as admin?");
    }
  };

  const handleSingleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/parcels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(parcels.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete parcel.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editparcel/${id}`);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "sendername", headerName: "Sender Name", width: 150 },
    { field: "recipientname", headerName: "Recipient Name", width: 150 },
    { field: "from", headerName: "From", width: 130 },
    { field: "to", headerName: "To", width: 130 },
    { field: "cost", headerName: "Cost ($)", type: "number", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div className="action-buttons">
          <button
            onClick={() => handleEdit(params.row._id)}
            className="edit-button"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleSingleDelete(params.row._id)}
            className="delete-icon-button"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="allparcels-container">
      <div className="allparcels-box">
        <Link to="/" className="back-link">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        <div className="header-bar">
          <h2 className="header-title">All Parcels</h2>
          <span className="username-label">{currentUser?.fullname || "Admin"}</span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="datagrid-container">
          <DataGrid
            rows={parcels}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </div>
    </div>
  );
};

export default AllParcels;
