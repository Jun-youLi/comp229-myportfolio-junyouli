// client/src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const API_BASE = "http://localhost:5000/api";

function App() {
  // Current logged-in user
  const [currentUser, setCurrentUser] = useState(null);
  // JWT token
  const [token, setToken] = useState("");

  // Load user and token from localStorage when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setCurrentUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Called after successful login or signup
  const handleLogin = (user, tokenFromServer) => {
    setCurrentUser(user);
    setToken(tokenFromServer);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", tokenFromServer);
  };

  // Logout: clear state and localStorage
  const handleLogout = () => {
    setCurrentUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/projects"
          element={
            <Projects
              currentUser={currentUser}
              token={token}
              apiBase={API_BASE}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              currentUser={currentUser}
              token={token}
              apiBase={API_BASE}
            />
          }
        />
        <Route
          path="/signin"
          element={<SignIn apiBase={API_BASE} onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUp apiBase={API_BASE} onLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
