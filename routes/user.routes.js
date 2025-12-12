// routes/user.routes.js
// REST API routes for users (admin only)

const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteAllUsers,
} = require("../controllers/user.controller");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Base path: /api/users

router.get("/", protect, adminOnly, getAllUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.post("/", protect, adminOnly, createUser);
router.put("/:id", protect, adminOnly, updateUserById);
router.delete("/:id", protect, adminOnly, deleteUserById);
router.delete("/", protect, adminOnly, deleteAllUsers);

module.exports = router;
