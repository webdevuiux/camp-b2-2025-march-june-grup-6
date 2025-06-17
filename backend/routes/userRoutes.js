const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");

// Konfigurasi multer untuk unggahan foto
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});
const upload = multer({ storage: storage });

// Rute untuk update profil pengguna
router.put(
  "/profile",
  authenticateToken,
  upload.single("profileImage"),
  userController.updateUserProfile
);

router.get("/me", authenticateToken, userController.getCurrentUser);
router.get("/:id", authenticateToken, userController.getUserProfile);

module.exports = router;
