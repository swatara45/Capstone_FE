import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Radar from 'radar-sdk-js';
import '../App.css'; // Ensure you have the correct path to your CSS file

Radar.initialize('prj_live_pk_e2ce7863e2539cbb7bc2a9adf274abf6d0e8648d');

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
    cost: "",
  });

  // This holds the calculated cost separately
  const [cost, setCost] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setCost(null);  // reset cost if relevant inputs change
    setMessage("");
    setError("");
  };

  // Calculate cost using Radar API based on from, to and weight
  const calculateCost = async () => {
    setError("");
    setMessage("");
    setCost(null);

    const { from, to, weight } = form;

    if (!from || !to || !weight) {
      setError("Please enter pickup, drop-off locations and weight first.");
      return;
    }

    setLoadingQuote(true);

    try {
      // Geocode pickup location
      const pickupResult = await Radar.forwardGeocode({ query: from });
      if (!pickupResult.addresses.length) {
        setError("Pickup location not found.");
        setLoadingQuote(false);
        return;
      }
      const pickupCoords = pickupResult.addresses[0].geometry.coordinates;

      // Geocode dropoff location
      const dropoffResult = await Radar.forwardGeocode({ query: to });
      if (!dropoffResult.addresses.length) {
        setError("Drop-off location not found.");
        setLoadingQuote(false);
        return;
      }
      const dropoffCoords = dropoffResult.addresses[0].geometry.coordinates;

      // Calculate distance
      const distanceResult = await Radar.distance({
        origin: { latitude: pickupCoords[1], longitude: pickupCoords[0] },
        destination: { latitude: dropoffCoords[1], longitude: dropoffCoords[0] },
        modes: ['car'],
        units: 'imperial',
      });

      // Convert meters to miles
      const distanceInMiles = distanceResult.routes.car.distance.value / 1609.34;

      // Pricing calculation
      const baseRate = 5;
      const perMileRate = 0.2;
      const perKgRate = 0.10;

      const distanceCharge = distanceInMiles * perMileRate;
      const weightCharge = parseFloat(weight) * perKgRate;
      const price = baseRate + distanceCharge + weightCharge;

      // Save calculated cost in state
      setCost(price.toFixed(2));
    } catch (err) {
      console.error(err);
      setError("Failed to calculate cost. Please try again.");
    } finally {
      setLoadingQuote(false);
    }
  };

  // Submit the form including the calculated cost
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cost) {
      setError("Please calculate the cost before submitting the order.");
      return;
    }

    try {
      // Include cost with form data
      await publicRequest.post("/parcels/", { ...form, cost });
      setMessage("Order created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Failed to create order.");
    }
  };

  return (
    <div className="create-order-container">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit} className="create-order-form">
        <label>
          From (Origin)
          <input
            name="from"
            value={form.from}
            onChange={handleChange}
            required
            placeholder="Origin address/city"
          />
        </label>

        <label>
          To (Destination)
          <input
            name="to"
            value={form.to}
            onChange={handleChange}
            required
            placeholder="Destination address/city"
          />
        </label>

        <label>
          Destination Zipcode
          <input
            type="text"
            name="destination_zipcode"
            value={form.destination_zipcode}
            onChange={handleChange}
            required
            placeholder="Zipcode"
            
          />
        </label>

        <label>
          Sender Name
          <input
            name="sendername"
            value={form.sendername}
            onChange={handleChange}
            required
            placeholder="Sender's name"
          />
        </label>

        <label>
          Sender Email
          <input
            type="email"
            name="senderemail"
            value={form.senderemail}
            onChange={handleChange}
            required
            placeholder="Sender's email"
          />
        </label>

        <label>
          Recipient Name
          <input
            name="recipientname"
            value={form.recipientname}
            onChange={handleChange}
            required
            placeholder="Recipient's name"
          />
        </label>

        <label>
          Recipient Email
          <input
            type="email"
            name="recipientemail"
            value={form.recipientemail}
            onChange={handleChange}
            required
            placeholder="Recipient's email"
          />
        </label>

        <label>
          Weight (kg)
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            required
            placeholder="e.g. 2.5"
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Note
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Any special instructions?"
            rows="2"
          />
        </label>

        {/* Button to calculate cost */}
        <button type="button" onClick={calculateCost} disabled={loadingQuote}>
          {loadingQuote ? "Calculating..." : "Calculate Cost"}
        </button>

        {/* Show estimated cost */}
        {cost && <p>Estimated Cost: <strong>${cost}</strong></p>}

        {/* Submit button disabled until cost is calculated */}
        <button type="submit" disabled={!cost}>
          Submit Order
        </button>

        {/* Show messages */}
        {(message || error) && (
          <p className={`message ${message ? "success" : "error"}`}>
            {message || error}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateOrder;
