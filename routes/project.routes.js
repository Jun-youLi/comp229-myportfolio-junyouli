const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  deleteAllProjects,
} = require("../controllers/project.controller");

// Public read
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Protected write
router.post("/", auth, createProject);
router.put("/:id", auth, updateProjectById);
router.delete("/:id", auth, deleteProjectById);
router.delete("/", auth, deleteAllProjects);

module.exports = router;
