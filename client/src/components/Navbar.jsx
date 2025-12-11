// src/components/Navbar.jsx
// Top navigation bar with custom logo and links

import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Custom logo: simple hexagon-like shape with initials JL */}
        <Link to="/" className="logo">
          <span className="logo-shape">JL</span>
          <span className="logo-text">Jun-You Li Portfolio</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About Me</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
