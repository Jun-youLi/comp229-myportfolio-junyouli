// controllers/project.controller.js
// CRUD operations for Project model

const Project = require("../models/project.model");

const createProject = async (req, res) => {
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

    const project = new Project({
      title,
      firstname,
      lastname,
      email,
      completion,
      description,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ message: "Failed to get projects" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error getting project by id:", error);
    res.status(500).json({ message: "Failed to get project" });
  }
};

const updateProjectById = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

const deleteProjectById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

const deleteAllProjects = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.json({
      message: "All projects deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all projects:", error);
    res.status(500).json({ message: "Failed to delete all projects" });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  deleteAllProjects,
};
