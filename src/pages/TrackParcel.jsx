import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import axios from "axios";

const TrackParcel = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loadingParcel, setLoadingParcel] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState("");

  // Remove the extra quotes around your real key:
  const OPENWEATHER_API_KEY = "13fee6b66218a021a32d5ae545503994";

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        setLoadingParcel(true);
        // ▶︎ Use the correct “find” endpoint:
        const res = await publicRequest.get(`/parcels/find/${id}`);
        setParcel(res.data);
        setLoadingParcel(false);

        // Only fetch weather if a ZIP code is present:
        if (res.data.destination_zipcode) {
          setLoadingWeather(true);
          fetchWeather(res.data.destination_zipcode);
        }
      } catch (err) {
        console.error("Failed to fetch tracking data:", err);
        setError("Could not load parcel data.");
        setLoadingParcel(false);
        setLoadingWeather(false);
      }
    };

    const fetchWeather = async (zipcode) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);
        setLoadingWeather(false);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setError("Could not load weather data.");
        setLoadingWeather(false);
      }
    };

    fetchParcel();
  }, [id]);

  // Show loading / error states first:
  if (loadingParcel) {
    return <p className="p-6">Loading parcel data…</p>;
  }
  if (error && !parcel) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tracking Parcel</h1>

      <div className="mb-4">
        <p><strong>ID:</strong> {parcel._id}</p>
        <p><strong>Status:</strong> {parcel.status}</p>
        <p><strong>From:</strong> {parcel.from}</p>
        <p><strong>To:</strong> {parcel.to}</p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(parcel.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Destination ZIP:</strong> {parcel.destination_zipcode || "N/A"}
        </p>
      </div>

      {loadingWeather ? (
        <p>Loading weather data…</p>
      ) : weather ? (
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <h2 className="text-lg font-semibold mb-2">
            Weather at Destination (ZIP {parcel.destination_zipcode})
          </h2>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Condition:</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
        </div>
      ) : (
        <p className="text-red-500">{error || "No weather data available."}</p>
      )}
    </div>
  );
};

export default TrackParcel;
