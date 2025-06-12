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

  const OPENWEATHER_API_KEY = "13fee6b66218a021a32d5ae545503994";

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        setLoadingParcel(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/api/parcels/find/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setParcel(res.data);
        setLoadingParcel(false);

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

  if (loadingParcel) {
    return <p className="trackparcel-loading">Loading parcel data…</p>;
  }
  if (error && !parcel) {
    return <p className="trackparcel-error">{error}</p>;
  }

  return (
    <div className="trackparcel-container">
      <h1 className="trackparcel-title">Tracking Parcel</h1>

      <div className="trackparcel-details">
        <p><strong>ID:</strong> {parcel._id}</p>
        <p><strong>Status:</strong> {parcel.status}</p>
        <p><strong>From:</strong> {parcel.from}</p>
        <p><strong>To:</strong> {parcel.to}</p>
        <p><strong>Date:</strong> {new Date(parcel.date).toLocaleDateString()}</p>
        <p><strong>Destination ZIP:</strong> {String(parcel.destination_zipcode).padStart(5, "0")}</p>
      </div>

      {loadingWeather ? (
        <p className="trackparcel-weather-loading">Loading weather data…</p>
      ) : weather ? (
        <div className="trackparcel-weather">
          <h2>Weather at Destination (ZIP {parcel.destination_zipcode})</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        </div>
      ) : (
        <p className="trackparcel-error">{error || "No weather data available."}</p>
      )}
    </div>
  );
};

export default TrackParcel;
