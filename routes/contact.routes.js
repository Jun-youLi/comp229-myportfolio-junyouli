// routes/contact.routes.js
// REST API routes for contacts

const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
  deleteAllContacts,
} = require("../controllers/contact.controller");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Base path: /api/contacts

// Public read
router.get("/", getAllContacts);
router.get("/:id", getContactById);

// Admin-only write
router.post("/", protect, adminOnly, createContact);
router.put("/:id", protect, adminOnly, updateContactById);
router.delete("/:id", protect, adminOnly, deleteContactById);
router.delete("/", protect, adminOnly, deleteAllContacts);

module.exports = router;
