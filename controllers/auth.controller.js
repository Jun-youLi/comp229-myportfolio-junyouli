// controllers/auth.controller.js
// Authentication: login using email and password

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const email = body.email;
    const password = body.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      message: "Login successful",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Simple logout (client should delete token)
const logout = (req, res) => {
  res.json({ message: "Logout successful (delete token on client side)" });
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Failed to get current user" });
  }
};

module.exports = {
  login,
  logout,
  getCurrentUser,
};
