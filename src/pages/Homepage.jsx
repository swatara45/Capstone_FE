import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Radar from 'radar-sdk-js';

Radar.initialize('prj_live_pk_e2ce7863e2539cbb7bc2a9adf274abf6d0e8648d');

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [weight, setWeight] = useState("");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

 const handleQuote = async (e) => {
  e.preventDefault();
  setQuote(null);
  setError("");

  if (!pickup || !dropoff || !weight) {
    setError("Please enter both pickup and drop-off locations and package weight.");
    return;
  }

  try {
    // Geocode pickup address
    const pickupResult = await Radar.forwardGeocode({ query: pickup });
    if (!pickupResult.addresses.length) {
      setError("Pickup location not found.");
      return;
    }
    const pickupCoords = pickupResult.addresses[0].geometry.coordinates;

    // Geocode dropoff address
    const dropoffResult = await Radar.forwardGeocode({ query: dropoff });
    if (!dropoffResult.addresses.length) {
      setError("Drop-off location not found.");
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

    const distance = distanceResult.routes.car.distance.text;
    const duration = distanceResult.routes.car.duration.text;

    // Updated pricing model
    const distanceInMiles = distanceResult.routes.car.distance.value / 1609.34;
    const baseRate = 5; // Base fee
    const perMileRate = 0.2; // Adjusted per mile rate
    const perPoundRate = 0.10; // Adjusted per pound rate

    const distanceCharge = distanceInMiles * perMileRate;
    const weightCharge = weight * perPoundRate;
    const price = baseRate + distanceCharge + weightCharge;

    setQuote(`Distance: ${distance} | Time: ${duration} | Weight: ${weight} kg | Estimated Price: $${price.toFixed(1)}`);
  } catch (err) {
    console.error(err);
    setError("Network error. Please try again.");
  }
};


// ...existing code...
 return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section">
        <div className="hero-text">
          <h1>SIMPLE, FAST & RELIABLE DELIVERY</h1>
          <p>Move your packages with confidence. Nationwide coverage. Real-time updates. Instant quotes.</p>
          <form className="quote-form" onSubmit={handleQuote}>
            <div className="input-group">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
            <div className="input-group">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                placeholder="Drop-off Location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </div>
            <input
              type="number"
              placeholder="Package Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
            />
            <button type="submit">Get a Quote <FaArrowRight /></button>
            {error && <p className="error">{error}</p>}
            {quote && <p className="quote">{quote}</p>}
          </form>
        </div>
        <img src="/delivery.webp" alt="Delivery Hero" className="hero-image" />
      </div>

      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>“Super fast and reliable! My package arrived earlier than expected. Highly recommend.”</p>
            <span>— Alex J.</span>
          </div>
          <div className="testimonial">
            <p>“The real-time tracking gave me peace of mind. Excellent service and support!”</p>
            <span>— Priya S.</span>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-text">
          <h2>Ready to move your package?</h2>
          <p>Join thousands of happy customers and experience hassle-free delivery today.</p>
        </div>
        <img src="/cta.jpg" alt="Delivery Woman" className="cta-image" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;

  
