// client/src/pages/SignIn.jsx
import { API_BASE } from "../apiBase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ apiBase, onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const baseUrl = (apiBase || API_BASE || "").replace(/\/$/, "");

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setMessage(data.message || "Signin failed");
        return;
      }

      const token = data.token || data.accessToken || data.jwt;
      const user = data.user || data;

      if (!token) {
        setMessage("Signin succeeded but no token returned from server.");
        return;
      }

      if (typeof onLogin === "function") {
        onLogin(user, token);
      }

      setMessage("Signin successful");
      navigate("/");
    } catch (error) {
      console.error("Signin error:", error);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            placeholder="admin@admin.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Sign In</button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default SignIn;
