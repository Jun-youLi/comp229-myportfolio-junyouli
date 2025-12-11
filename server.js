// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/project.routes");
const qualificationRoutes = require("./routes/qualification.routes");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/authMiddleware");
const userRoutes = require("./routes/user.routes");

// Load env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// === 1) Middlewares  ===
app.use(cors());
app.use(express.json()); 

// === 2) Import routes ===
const contactRoutes = require("./routes/contact.routes");

// === 3) use routes ===
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send(
    "<h1>Portfolio Backend is running</h1>" +
      "<p>Student: <strong>Jun-You Li</strong></p>" +
      "<p>Student ID: <strong>301443909</strong></p>"
  );
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
