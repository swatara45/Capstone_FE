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


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <AuthProvider>
            <Homepage />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/Login",
      element: (
        <MainLayout>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/Register",
      element: (
        <MainLayout>
          <AuthProvider>
            <Register />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/myparcels",
      element: (
        <MainLayout>
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
        <MainLayout>
          <ParcelProvider>
            <CreateOrder />
          </ParcelProvider>
        </MainLayout>
      ),
    },
    {
      path: "/track/:id",
      element: (
        <MainLayout>
          <ParcelProvider>
            <TrackParcel />
          </ParcelProvider>
        </MainLayout>
      ),
    },
    {
      path: "/allparcels",
      element: (
        <MainLayout>
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
        <MainLayout>
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </MainLayout>
      ),
    },
    {
      path: "/ContactUs",
      element: (
        <MainLayout>
          <AuthProvider>
            <ContactUs />
          </AuthProvider>
        </MainLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;