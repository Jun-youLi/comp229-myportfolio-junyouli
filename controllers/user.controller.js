// controllers/user.controller.js
// CRUD operations for User model

const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// Create a new user (register)
const createUser = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};

    const name = body.name;
    const email = body.email;
    const password = body.password;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Do not return password hash
    const userObj = savedUser.toObject();
    delete userObj.password;

    res.status(201).json(userObj);
  } catch (error) {
    console.error("Error creating user:", error);

    // 如果是重复 email 的 Mongo 错误
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 为了 debug，可以临时把 error.message 也返回，后面交作业前可以去掉
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body || {};

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (body.name !== undefined) user.name = body.name;
    if (body.email !== undefined) user.email = body.email;

    if (body.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(body.password, salt);
    }

    const savedUser = await user.save();
    const userObj = savedUser.toObject();
    delete userObj.password;

    res.json(userObj);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.json({
      message: "All users deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({ message: "Failed to delete all users" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteAllUsers,
};
