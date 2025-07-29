const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const Project = require("../models/project/project");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload to Cloudinary from buffer
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ✅ GET all projects
router.get("/getallprojects", async (req, res) => {
  try {
    const projects = await Project.find().populate("owner", "username profilePicture").sort({ _id: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// ✅ GET single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// ✅ POST new project with two images
// router.post(
//   "/uploadproject",
//   upload.fields([{ name: "coverImage" }, { name: "logoImage" }]),
//   async (req, res) => {
//     try {
//       if (!req.files.coverImage || !req.files.logoImage) {
//         return res.status(400).json({ message: "Both images are required" });
//       }

//       const coverImageUrl = await uploadToCloudinary(req.files.coverImage[0].buffer);
//       const logoUrl = await uploadToCloudinary(req.files.logoImage[0].buffer);

//       const newProject = new Project({
//       title: req.body.title,
//         description: req.body.description,
//         logoUrl,
//         coverImageUrl,
//         price: req.body.price,
//         owner: req.body.owner,
//         tags: req.body.tags ? req.body.tags.split(",") : [],
//         learning: req.body.learning ? req.body.learning.split(",") : [],
//         stars: req.body.stars || 0,
//         likes: [], // default empty
//         Comment: [], //
//       });

//       await newProject.save();
//       res.status(201).json(newProject);
//     } catch (error) {
//       console.error("Upload error:", error);
//       res.status(500).json({ error: "Upload failed" });
//     }
//   }
// );
// POST - Upload Project
router.post(
  "/uploadproject",
  upload.fields([{ name: "coverImage" }, { name: "logoImage" }]),
  async (req, res) => {
    try {
      const { title, description, price, owner, tags, learning, stars } = req.body;

      if (!req.files.coverImage || !req.files.logoImage) {
        return res.status(400).json({ message: "Both images are required" });
      }

      // Validate owner (convert to ObjectId if your schema expects it)
      let ownerId = owner;
      if (mongoose.Types.ObjectId.isValid(owner)) {
        ownerId = new mongoose.Types.ObjectId(owner);
      }

      // Upload images
      const coverImageUrl = await uploadToCloudinary(req.files.coverImage[0].buffer);
      const logoUrl = await uploadToCloudinary(req.files.logoImage[0].buffer);

      const newProject = new Project({
        title,
        description,
        logoUrl,
        coverImageUrl,
        price,
        owner: ownerId, // Ensure valid ObjectId
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        learning: learning ? learning.split(",").map((l) => l.trim()) : [],
        stars: stars || 0,
        likes: [],
        comments: [], // Correct field name
      });

      await newProject.save();
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Upload error details:", error);
      res.status(500).json({ message: error.message, stack: error.stack });
    }
  }
);


module.exports = router;
