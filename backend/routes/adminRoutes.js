const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/settings/:id")
  .get(adminController.getAdminAccountSettings)
  .put(
    upload.single("profile_image"),
    adminController.updateAdminAccountSettings
  );

router.put("/change-password/:id", adminController.changePassword);
router.put("/reset-password/:id", adminController.resetPassword);

module.exports = router;
