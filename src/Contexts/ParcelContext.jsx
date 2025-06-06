// ParcelContext.jsx
import { createContext, useContext, useState } from "react";

const ParcelContext = createContext();

export const ParcelProvider = ({ children }) => {
  const [parcels, setParcels] = useState([]);

  const addParcel = (newParcel) => setParcels((prev) => [...prev, newParcel]);

  return (
    <ParcelContext.Provider value={{ parcels, setParcels, addParcel }}>
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcel = () => useContext(ParcelContext);
