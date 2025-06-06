import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MyParcels from "./pages/MyParcels";
import Parcels from "./pages/Parcels";
import { AuthProvider } from "../src/Contexts/AuthContext";
import { ParcelProvider } from '../src/Contexts/ParcelContext';
import Register from "./pages/Register";
import './App.css';
import CreateOrder from "./pages/Order";
import TrackParcel from "./pages/TrackParcel";




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <Homepage />
        </AuthProvider>
      ),
    },
    {
      path: "/Login",
      element: (
        <AuthProvider>
          <Login />
        </AuthProvider>
      ),
    },
     {
      path: "/Register",
      element: (
        <AuthProvider>
          <Register />
        </AuthProvider>
      ),
    },
    {
      path: "/myparcels",
      element: (
        <AuthProvider>
          <ParcelProvider>
            <MyParcels />
          </ParcelProvider>
        </AuthProvider>
      ),
    },
       {
      path: "/order",
      element: (
        <ParcelProvider>
          <CreateOrder />
        </ParcelProvider>
      ),
    },
   {
     path: "/track/:id",
     element: (
    <ParcelProvider>
      <TrackParcel />
    </ParcelProvider>
   ),
},
    {
      path: "/allparcels",
      element: (
        <AuthProvider>
          <ParcelProvider>
            <Parcels />
          </ParcelProvider>
        </AuthProvider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;