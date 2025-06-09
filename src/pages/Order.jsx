import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const CreateOrder = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    destination_zipcode: "",
    sendername: "",
    recipientname: "",
    senderemail: "",
    recipientemail: "",
    weight: "",
    date: "",
    note: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/parcels/", form);
      setMessage("Order created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage("Failed to create order.");
    }
  };

  return (
    <div className="create-order-container">
      <h2 className="create-order-heading">Create New Order</h2>
      <form onSubmit={handleSubmit} className="create-order-form">
        <div className="form-group">
          <label>From (Origin)</label>
          <input name="from" value={form.from} onChange={handleChange} required placeholder="Origin address/city" />
        </div>
        <div className="form-group">
          <label>To (Destination)</label>
          <input name="to" value={form.to} onChange={handleChange} required placeholder="Destination address/city" />
        </div>
        <div className="form-group">
          <label>Destination Zipcode</label>
          <input name="destination_zipcode" value={form.destination_zipcode} onChange={handleChange} required placeholder="Zipcode" />
        </div>
        <div className="form-group">
          <label>Sender Name</label>
          <input name="sendername" value={form.sendername} onChange={handleChange} required placeholder="Sender's name" />
        </div>
        <div className="form-group">
          <label>Sender Email</label>
          <input type="email" name="senderemail" value={form.senderemail} onChange={handleChange} required placeholder="Sender's email" />
        </div>
        <div className="form-group">
          <label>Recipient Name</label>
          <input name="recipientname" value={form.recipientname} onChange={handleChange} required placeholder="Recipient's name" />
        </div>
        <div className="form-group">
          <label>Recipient Email</label>
          <input type="email" name="recipientemail" value={form.recipientemail} onChange={handleChange} required placeholder="Recipient's email" />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input type="number" name="weight" value={form.weight} onChange={handleChange} required placeholder="e.g. 2.5" />
        </div>
  
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Note</label>
          <textarea name="note" value={form.note} onChange={handleChange} placeholder="Any special instructions?" rows="2" />
        </div>
        <button type="submit" className="submit-button">Submit Order</button>
        {message && (
          <p className={`message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateOrder;