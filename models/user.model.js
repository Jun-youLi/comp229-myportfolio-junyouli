// models/user.model.js
// User model with role field (user / admin)

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // NEW: role field
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // all new accounts are normal users
    },
  },
  {
    // createdAt, updatedAt
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
