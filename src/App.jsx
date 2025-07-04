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
import path from "path";

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
      path: "/Careers",
      element: (
        <MainLayout>
          <div className="careers-simple" style={{ padding: "2rem", textAlign: "center" }}>
            <h2>We're Hiring Drivers!</h2>
            <p>
              Mans Joke Trucking is looking for reliable and professional drivers to join our team. CDL is required.
              If you're interested, please send your resume to:
            </p>
            <p>
              <a href="mailto:careers@mjtruckdelivery.com?subject=Driver%20Application">
                info@mansjoketrucking.com
              </a>
            </p>
          </div>
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
    {
      path:"/editparcel/:id",
      element: (
        <MainLayout>
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