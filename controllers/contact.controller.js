// controllers/contact.controller.js
// CRUD operations for Contact model

const Contact = require("../models/contact.model");

// Create and save a new contact
const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(400).json({
        message: "firstname, lastname and email are required",
      });
    }

    const contact = new Contact({ firstname, lastname, email });
    const savedContact = await contact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

// Retrieve all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({ message: "Failed to get contacts" });
  }
};

// Retrieve a single contact by id
const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Error getting contact by id:", error);
    res.status(500).json({ message: "Failed to get contact" });
  }
};

// Update a contact by id
const updateContactById = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Failed to update contact" });
  }
};

// Delete a contact by id
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

// Delete all contacts
const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    res.json({
      message: "All contacts deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all contacts:", error);
    res.status(500).json({ message: "Failed to delete all contacts" });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
  deleteAllContacts,
};
