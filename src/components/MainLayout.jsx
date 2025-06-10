import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div style={{ minHeight: "80vh" }}>{children}</div>
    <Footer />
  </>
);

export default MainLayout;