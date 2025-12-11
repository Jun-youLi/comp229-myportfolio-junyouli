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

// Base path: /api/contacts

// Get all contacts
router.get("/", getAllContacts);

// Get a single contact by id
router.get("/:id", getContactById);

// Create a new contact
router.post("/", createContact);

// Update a contact by id
router.put("/:id", updateContactById);

// Delete a contact by id
router.delete("/:id", deleteContactById);

// Delete all contacts
router.delete("/", deleteAllContacts);

module.exports = router;
