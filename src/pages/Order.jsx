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
    cost: "",
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
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Create New Order</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">From (Origin)</label>
          <input name="from" value={form.from} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Origin address/city" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">To (Destination)</label>
          <input name="to" value={form.to} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Destination address/city" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Destination Zipcode</label>
          <input name="destination_zipcode" value={form.zipcode} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Zipcode" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Sender Name</label>
          <input name="sendername" value={form.sendername} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Sender's name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Sender Email</label>
          <input type="email" name="senderemail" value={form.senderemail} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Sender's email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Recipient Name</label>
          <input name="recipientname" value={form.recipientname} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Recipient's name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Recipient Email</label>
          <input type="email" name="recipientemail" value={form.recipientemail} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Recipient's email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Weight (kg)</label>
          <input type="number" name="weight" value={form.weight} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. 2.5" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Cost ($)</label>
          <input type="number" name="cost" value={form.cost} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. 20" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Note</label>
          <textarea name="note" value={form.note} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Any special instructions?" rows="2" />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Submit Order
        </button>
        {message && (
          <p className={`mt-4 text-center font-semibold ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateOrder;