// routes/user.routes.js
// REST API routes for users

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

// Base path: /api/users

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.delete("/", deleteAllUsers);

module.exports = router;
