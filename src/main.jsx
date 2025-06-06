import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ParcelProvider } from "./Contexts/ParcelContext";
import { AuthProvider } from "./Contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ParcelProvider>
        <App />
      </ParcelProvider>
    </AuthProvider>
  </React.StrictMode>
);
