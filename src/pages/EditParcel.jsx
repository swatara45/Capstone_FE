import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sendername: "",
    recipientname: "",
    from: "",
    to: "",
    cost: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/parcels/find/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        setError("Failed to load parcel.");
      }
    };

    fetchParcel();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/parcels/find/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/allparcels");
    } catch (err) {
      setError("Failed to update parcel.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Parcel</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {["sendername", "recipientname", "from", "to", "cost"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 mb-1 capitalize">{field}</label>
            <input
              type={field === "cost" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Parcel
        </button>
      </form>
    </div>
  );
};

export default EditParcel;
