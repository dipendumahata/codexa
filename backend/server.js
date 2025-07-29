const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./router/authRoute");
const hackathonRoutes = require("./router/hackathonRoutes");
const ProjectRoutes = require("./router/projectRoutes");
const connectDb = require("./db/db");

// Auth middleware
const auth = require("./middleware/auth");

const app = express();
connectDb();
app.use(express.json());

// ✅ Allowed Origins (Local + Production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://code-bazaar-student-project-showcas.vercel.app"
];

// ✅ CORS Config
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

// ✅ Parse cookies
app.use(cookieParser());

// API Routes
app.use("/api/photos", require("./router/photoRoute"));
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api", authRoutes);

// ✅ Check auth status
app.get("/api/check-auth-status", auth, (req, res) => {
  res.status(200).json({ isLoggedIn: true, user: req.user });
});

// ✅ Logged-in user info (fix for 404 in frontend)
app.get("/api/me", auth, (req, res) => {
  res.status(200).json(req.user);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
