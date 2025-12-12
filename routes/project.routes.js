// routes/project.routes.js
// REST API routes for projects

const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  deleteAllProjects,
} = require("../controllers/project.controller");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Base path: /api/projects

// Public read
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin-only write
router.post("/", protect, adminOnly, createProject);
router.put("/:id", protect, adminOnly, updateProjectById);
router.delete("/:id", protect, adminOnly, deleteProjectById);
router.delete("/", protect, adminOnly, deleteAllProjects);

module.exports = router;
