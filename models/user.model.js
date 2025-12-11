// models/user.model.js
// Simple Mongoose model for users collection

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
  },
  {
    // createdAt, updatedAt
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
