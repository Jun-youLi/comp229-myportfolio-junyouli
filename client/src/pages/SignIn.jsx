// client/src/pages/SignIn.jsx

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

    try {
      const response = await fetch(`${apiBase}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signin failed");
        return;
      }

      // Save user and token in the parent component
      onLogin(data.user, data.token);

      setMessage("Signin successful");
      // Redirect after login
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
