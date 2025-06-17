// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Pastikan path ke authController sudah benar

// Rute untuk Login User Umum
router.post("/login", authController.loginUser); // cite: authRoutes.js

// Rute untuk Login Admin
router.post("/admin/login", authController.loginAdmin); // cite: authRoutes.js

// Rute untuk Registrasi User Biasa
router.post("/register", authController.registerUser); // cite: authRoutes.js

// Rute untuk Registrasi Organizer
router.post("/register-organizer", authController.registerOrganizer); // cite: authRoutes.js

// Rute untuk Permintaan Reset Password
router.post("/reset-password", authController.resetPassword); // cite: authRoutes.js

// Rute untuk Permintaan Reset Password
router.post("/reset-password-request", authController.resetPasswordRequest); // cite: authRoutes.js

module.exports = router;