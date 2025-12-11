// config/db.js
// MongoDB connection using Mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error("❌ MONGODB_URI is not defined in .env file");
      process.exit(1);
    }

    const conn = await mongoose.connect(uri);

    console.log("✅ MongoDB connected successfully");
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
