// controllers/qualification.controller.js
// CRUD operations for Qualification model

const Qualification = require("../models/qualification.model");

const createQualification = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } =
      req.body;

    if (
      !title ||
      !firstname ||
      !lastname ||
      !email ||
      !completion ||
      !description
    ) {
      return res.status(400).json({
        message:
          "title, firstname, lastname, email, completion and description are required",
      });
    }

    const qualification = new Qualification({
      title,
      firstname,
      lastname,
      email,
      completion,
      description,
    });

    const savedQualification = await qualification.save();
    res.status(201).json(savedQualification);
  } catch (error) {
    console.error("Error creating qualification:", error);
    res.status(500).json({ message: "Failed to create qualification" });
  }
};

const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (error) {
    console.error("Error getting qualifications:", error);
    res.status(500).json({ message: "Failed to get qualifications" });
  }
};

const getQualificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const qualification = await Qualification.findById(id);

    if (!qualification) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    res.json(qualification);
  } catch (error) {
    console.error("Error getting qualification by id:", error);
    res.status(500).json({ message: "Failed to get qualification" });
  }
};

const updateQualificationById = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Qualification.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating qualification:", error);
    res.status(500).json({ message: "Failed to update qualification" });
  }
};

const deleteQualificationById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Qualification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    res.json({ message: "Qualification deleted successfully" });
  } catch (error) {
    console.error("Error deleting qualification:", error);
    res.status(500).json({ message: "Failed to delete qualification" });
  }
};

const deleteAllQualifications = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    res.json({
      message: "All qualifications deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all qualifications:", error);
    res.status(500).json({ message: "Failed to delete all qualifications" });
  }
};

module.exports = {
  createQualification,
  getAllQualifications,
  getQualificationById,
  updateQualificationById,
  deleteQualificationById,
  deleteAllQualifications,
};
