import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MyParcels from "./pages/MyParcels";
import AllParcels from "./pages/AllParcels";
import { AuthProvider } from "../src/Contexts/AuthContext";
import { ParcelProvider } from '../src/Contexts/ParcelContext';
import Register from "./pages/Register";
import './App.css';
import CreateOrder from "./pages/Order";
import TrackParcel from "./pages/TrackParcel";
import Logout from "./pages/Logout";
import ContactUs from "./pages/ContactUs";
import MainLayout from "../src/components/MainLayout";
import EditParcel from "./pages/EditParcel";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <Homepage />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/Login",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/Register",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <Register />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/myparcels",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <ParcelProvider>
              <MyParcels />
            </ParcelProvider>
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/order",
      element: (
        <MainLayout classname="container">
          <ParcelProvider>
            <CreateOrder />
          </ParcelProvider>
        </MainLayout>
      ),
    },
    {
      path: "/track/:id",
      element: (
        <MainLayout classname="container">
          <ParcelProvider>
            <TrackParcel />
          </ParcelProvider>
        </MainLayout>
      ),
    },
    {
      path: "/allparcels",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <ParcelProvider>
              <AllParcels />
            </ParcelProvider>
          </AuthProvider>
        </MainLayout>
      ),
      errorElement: <div>Page not found</div>,
    },
    {
      path: "/logout",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/ContactUs",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <ContactUs />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path:"/editparcel/:id",
      element: (
        <MainLayout classname="container">
          <AuthProvider>
            <ParcelProvider>
              <EditParcel />
            </ParcelProvider>
          </AuthProvider>
        </MainLayout>
      ),
    }


  ]);

  return <RouterProvider router={router} />;
}

export default App;