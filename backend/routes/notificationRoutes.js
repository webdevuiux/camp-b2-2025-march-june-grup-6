const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/notifications",
  authMiddleware,
  notificationController.getUserNotifications
);
router.put(
  "/notifications/:id/seen",
  authMiddleware,
  notificationController.markNotificationAsSeen
);

module.exports = router;
