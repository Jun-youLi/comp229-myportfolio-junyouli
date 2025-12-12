// client/src/components/Navbar.jsx

import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";   // <-- add this line

function Navbar({ currentUser, onLogout }) {
  const isAdmin = currentUser?.role === "admin";

  return (
    <nav className="navbar">
      {/* Left: logo or site name */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          MyPortfolio
        </Link>
      </div>

      {/* Center: navigation links */}
      <div className="navbar-center">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-item">
          About
        </NavLink>
        <NavLink to="/services" className="nav-item">
          Services
        </NavLink>
        <NavLink to="/projects" className="nav-item">
          Projects
        </NavLink>
        <NavLink to="/contact" className="nav-item">
          Contact
        </NavLink>
      </div>

      {/* Right: auth status */}
      <div className="navbar-right">
        {currentUser ? (
          <>
            <span className="nav-username">
              {currentUser.name} ({isAdmin ? "admin" : "user"})
            </span>
            <button className="nav-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signin" className="nav-item">
              Sign In
            </NavLink>
            <NavLink to="/signup" className="nav-item">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
