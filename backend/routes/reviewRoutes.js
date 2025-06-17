const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/reviews",
  authMiddleware,
  upload.single("media"),
  reviewController.uploadReview
);
router.get(
  "/workshops/:workshop_id/reviews",
  reviewController.getWorkshopReviews
);

module.exports = router;
