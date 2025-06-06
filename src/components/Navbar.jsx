import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      <Link to="/">
        <img
          src="/MJ_truck.png"
          alt="MJ Truck Logo"
        />
      </Link>
      <Link to="/">Home</Link>
      <Link to="/myparcels">My Parcels</Link>
      <Link to="/allparcels">All Parcels</Link>
      <Link to="/order">Order</Link>
      <Link to="/track">Track Parcel</Link>
    </div>
    <div className="dropdown">
  <button className="dropbtn">Menu</button>
  <div className="dropdown-content">
    <a href="/Contact Us">Contact Us</a>
    <a href="/Login">Login</a>
    <a href="/Register">Register</a>
    <a href="/logout">Logout</a>
  </div>
</div>
  
  </nav>
);

export default Navbar;