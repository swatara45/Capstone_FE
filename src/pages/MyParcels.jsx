import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const MyParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

const fetchParcels = async () => {
  const email = localStorage.getItem("email");
  if (!email) {
    navigate("/login");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // <-- Add this line
    const res = await publicRequest.post(
      "/parcels/me",
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Fetched parcels:", res.data); 
    setParcels(res.data);
  } catch (err) {
    console.error(err);
    setError("Failed to fetch parcels.");
  }
};

 useEffect(() => {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    navigate("/allparcels"); // Redirect admins away
    return;
  }
  fetchParcels();
}, []);

  return (
  <div className="myparcels-container">
    <h1 className="myparcels-heading">My Parcels</h1>
    <button
      className="create-order-button"
      onClick={() => navigate("/order")}
    >
      Create New Order
    </button>
    {error && <p className="error-text">{error}</p>}
    <ul className="parcel-list">
      {parcels.map((parcel) => (
        <li key={parcel._id} className="parcel-card">
          <div className="parcel-details">
            <p><strong>ID:</strong> {parcel._id}</p>
            <p><strong>Status:</strong> {parcel.status}</p>
            <p><strong>Recipient Name:</strong> {parcel.recipientname}</p>
            <p><strong>Recipient Email:</strong> {parcel.recipientemail}</p>
            <p><strong>Dispatch Address:</strong> {parcel.from}</p>
            <p><strong>Destination Address:</strong> {parcel.to}</p>
          </div>
          <button
            onClick={() => navigate(`/track/${parcel._id}`)}
            className="track-button"
          >
            Track
          </button>
        </li>
      ))}
    </ul>
  </div>
);
};

export default MyParcels;