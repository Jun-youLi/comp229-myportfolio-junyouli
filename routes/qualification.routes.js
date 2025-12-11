const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createQualification,
  getAllQualifications,
  getQualificationById,
  updateQualificationById,
  deleteQualificationById,
  deleteAllQualifications,
} = require("../controllers/qualification.controller");

// Public read
router.get("/", getAllQualifications);
router.get("/:id", getQualificationById);

// Protected write
router.post("/", auth, createQualification);
router.put("/:id", auth, updateQualificationById);
router.delete("/:id", auth, deleteQualificationById);
router.delete("/", auth, deleteAllQualifications);

module.exports = router;
