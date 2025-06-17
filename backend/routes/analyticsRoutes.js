const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware"); // Jika ada autentikasi

router.get("/analytics", authMiddleware, analyticsController.getAnalytics);

module.exports = router;
