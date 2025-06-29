import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src="/MJ_truck.jpeg" alt="MJ Truck Logo" style={{ height: '40px' }} />
        </Link>

        {/* Hamburger toggle button (visible on small screens) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left nav links */}
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myparcels">My Parcels</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">Order</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allparcels">All Parcels</Link>
            </li>
          </ul>

          {/* Dropdown aligned right */}
          <ul className="navbar-nav mb-2 mb-md-0">
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                id="menuDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="menuDropdown">
                <li><Link className="dropdown-item" to="/ContactUs">Contact Us</Link></li>
                <li><Link className="dropdown-item" to="/Login">Login</Link></li>
                <li><Link className="dropdown-item" to="/Register">Register</Link></li>
                <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

);

export default Navbar;