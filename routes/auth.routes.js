// routes/auth.routes.js
// Authentication routes: login, logout, current user

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { login, logout, getCurrentUser } = require("../controllers/auth.controller");

// Base path: /api/auth

// Login and get JWT token
router.post("/login", login);

// Logout (client should delete token)
router.post("/logout", logout);

// Get current logged-in user (protected)
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
