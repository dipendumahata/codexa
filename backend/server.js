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

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  // "https://code-bazaar-student-project-showcas.vercel.app"
];

// ✅ Proper CORS handling for multiple domains
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Parse cookies
app.use(cookieParser());

// Routes
app.use("/api/photos", require("./router/photoRoute"));
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api", authRoutes);

// ✅ Auth check route
app.get("/api/check-auth-status", auth, (req, res) => {
  res.status(200).json({ isLoggedIn: true, user: req.user });
});

// ✅ Fix for frontend `/api/me`
app.get("/api/me", auth, (req, res) => {
  res.status(200).json(req.user);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
