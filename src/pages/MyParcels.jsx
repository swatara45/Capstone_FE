import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const MyParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchParcels = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); // Or get from your auth context

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await publicRequest.post(
        "/parcels/me",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setParcels(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch parcels.");
    }
  };

  useEffect(() => {
    fetchParcels();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={() => navigate("/order")}
      >
        Create New Order
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {parcels.map((parcel) => (
          <li
            key={parcel._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p><strong>ID:</strong> {parcel._id}</p>
              <p><strong>Status:</strong> {parcel.status}</p>
              <p><strong>Recipient Name:</strong> {parcel.recipientname}</p>
              <p><strong>Recipient Email:</strong> {parcel.recipientemail}</p>
              <p><strong>Dispatch Address:</strong> {parcel.from}</p>
              <p><strong>Destination Address:</strong> {parcel.to}</p>
            </div>
            <button
              onClick={() => navigate(`/track/${parcel._id}`)}
              className="bg-green-600 text-white px-3 py-1 rounded"
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