const express = require("express");
const router = express.Router();

const {
  createQualification,
  getAllQualifications,
  getQualificationById,
  updateQualificationById,
  deleteQualificationById,
  deleteAllQualifications,
} = require("../controllers/qualification.controller");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public read
router.get("/", getAllQualifications);
router.get("/:id", getQualificationById);

// Admin-only write
router.post("/", protect, adminOnly, createQualification);
router.put("/:id", protect, adminOnly, updateQualificationById);
router.delete("/:id", protect, adminOnly, deleteQualificationById);
router.delete("/", protect, adminOnly, deleteAllQualifications);

module.exports = router;
