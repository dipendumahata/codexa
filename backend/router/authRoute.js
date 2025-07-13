const express = require("express");
const router = express.Router();
const { Signup, signin, Logout } = require("../controllers/AuthController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/signup", upload.single("profilePicture"), Signup);
router.post("/signin", signin);
router.get("/logout", Logout);

module.exports = router;
