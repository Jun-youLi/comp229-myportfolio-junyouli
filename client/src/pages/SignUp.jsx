// client/src/pages/SignUp.jsx
import { API_BASE } from "../apiBase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ apiBase, onLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const baseUrl = (apiBase || API_BASE || "").replace(/\/$/, "");

    // Make signup compatible with backends that want firstname/lastname
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const firstname = parts[0] || name.trim();
    const lastname = parts.slice(1).join(" ") || "User";

    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          firstname,
          lastname,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      const token = data.token || data.accessToken || data.jwt;
      const user = data.user || data;

      if (token && typeof onLogin === "function") {
        onLogin(user, token);
      }

      setMessage("Signup successful");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            placeholder="Your full name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="At least 6 characters"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default SignUp;
