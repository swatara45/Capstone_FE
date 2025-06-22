import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => (
   <>
   <Navbar/>
  <div className="app-container">
    <div className="main-content">
      {children}
    </div>
    <Footer />
  </div>
</>
);

export default MainLayout;