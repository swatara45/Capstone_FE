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
    const perMileRate = 0.50; // Adjusted per mile rate
    const perPoundRate = 0.10; // Adjusted per pound rate

    const distanceCharge = distanceInMiles * perMileRate;
    const weightCharge = weight * perPoundRate;
    const price = baseRate + distanceCharge + weightCharge;

    setQuote(`Distance: ${distance} | Time: ${duration} | Weight: ${weight} kg | Estimated Price: $${price.toFixed(2)}`);
  } catch (err) {
    console.error(err);
    setError("Network error. Please try again.");
  }
};


return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-600 via-green-500 to-green-400">
    <Navbar />
      <div className="space-y-[10px] max-w-3xl">
  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
    SIMPLE, FAST & RELIABLE DELIVERY
  </h1>
  <p className="text-lg md:text-xl drop-shadow-sm">
    Move your packages with confidence. Nationwide coverage. Real-time updates. Instant quotes.
  </p>
</div>
    <div className="flex flex-col items-center justify-center mt-10">

      <div className="bg-white text-green-700 mt-10 px-6 py-6 rounded-2xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Get a Quote</h2>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleQuote}>
          <div className="relative w-full">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="relative w-full">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              placeholder="Drop-off Location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="w-full">
            <input
              type="number"
              placeholder="Package Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="pl-4 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              min="1"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Get Quote <FaArrowRight />
          </button>
        </form>
        {/* Testimonials Section */}
      <div className="w-full bg-green-100 py-10 mt-10 rounded-2xl shadow max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 gap-2 px-4">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="italic text-gray-700">“Super fast and reliable! My package arrived earlier than expected. Highly recommend.”</p>
            <div className="mt-4 text-green-800 font-bold">— Alex J.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="italic text-gray-700">“The real-time tracking gave me peace of mind. Excellent service and support!”</p>
            <div className="mt-4 text-green-800 font-bold">— Priya S.</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full bg-green-700 py-10 mt-10 rounded-2xl shadow max-w-2xl mx-auto">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to move your package?</h2>
          <p className="mb-6">Join thousands of happy customers and experience hassle-free delivery today.</p>
        
         
        </div>
      </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {quote && <p className="text-green-800 mt-4 font-semibold">{quote}</p>}
        

        
      </div>
    </div>
    <Footer />
  </div>

  );
};

export default Home;
