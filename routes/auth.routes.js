// routes/auth.routes.js
// Authentication routes: signup, signin, signout, current user

const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  signup,
  signin,
  signout,
  getCurrentUser,
} = require("../controllers/auth.controller");

// Base path: /api/auth

// User signup (register)
router.post("/signup", signup);

// Signin user (Assignment3: POST auth/signin)
router.post("/signin", signin);

// Signout user (Assignment3: GET auth/signout)
router.get("/signout", signout);

// Get current logged-in user (protected)
router.get("/me", protect, getCurrentUser);

module.exports = router;
