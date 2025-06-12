import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Assuming you have some styles defined here

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
        if (!token) {
          setError("Authentication token missing.");
          return;
        }

        const res = await axios.get(`http://localhost:3000/api/parcels/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched parcel:", res.data);
        const parcel = res.data.parcel ? res.data.parcel : res.data;

        setFormData({
          sendername: parcel.sendername || "",
          recipientname: parcel.recipientname || "",
          from: parcel.from || "",
          to: parcel.to || "",
          cost: parcel.cost || "",
        });
      } catch (err) {
        setError("Failed to load parcel.");
        console.error("Load error:", err.response?.data || err.message || err);
      }
    };

    fetchParcel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cost" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to update a parcel.");
        return;
      }

      console.log("Submitting update for parcel ID:", id);
      console.log("Payload:", formData);

      const res = await axios.put(
        `http://localhost:3000/api/parcels/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Update response:", res.data);

      // Redirect with success message
      navigate("/allparcels", {
        state: { message: "Parcel updated successfully!" },
      });
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message || err);
      setError("Failed to update parcel.");
    }
  };

  const fieldLabels = {
  sendername: "Sender Name",
  recipientname: "Recipient Name",
  from: "From",
  to: "To",
  cost: "Cost",
};

return (
  <div className="container">
    <form onSubmit={handleSubmit} className="form">
      <h2 className="title">Edit Parcel</h2>

      {error && <p className="error">{error}</p>}

      {["sendername", "recipientname", "from", "to", "cost"].map((field) => (
        <div key={field} className="formGroup">
          <label className="label">{fieldLabels[field]}</label>
          <input
            type={field === "cost" ? "number" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      ))}

      <button type="submit" className="button">
        Update Parcel
      </button>
    </form>
  </div>
);
};

export default EditParcel;
