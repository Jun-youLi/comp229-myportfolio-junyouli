// client/src/pages/SignUp.jsx

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

    try {
      const response = await fetch(`${apiBase}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      // Treat signup as a login: save user and token
      onLogin(data.user, data.token);

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
