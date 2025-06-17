const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshopController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

// Konfigurasi multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Direktori untuk menyimpan gambar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nama file unik
  },
});

const upload = multer({ storage: storage });

router.get("/workshops", authMiddleware, workshopController.getWorkshops); // Admin view
router.get(
  "/workshops/submissions",
  authMiddleware,
  workshopController.getWorkshopSubmissions
);
router.get("/my", authMiddleware, workshopController.getMyWorkshops);
router.get("/workshops/:id", authMiddleware, workshopController.getWorkshop);
router.get("/user/:id", authMiddleware, workshopController.getWorkshopForUser);
router.post(
  "/workshops/submissions",
  authMiddleware,
  workshopController.createWorkshopSubmission
);
router.put("/workshops/:id", authMiddleware, workshopController.updateWorkshop);
router.delete(
  "/workshops/:id",
  authMiddleware,
  workshopController.deleteWorkshop
);
router.put(
  "/workshops/submissions/:id",
  authMiddleware,
  workshopController.processWorkshopSubmission
);

router.put(
  "/submissions/:submission_id",
  authMiddleware,
  workshopController.updateWorkshopSubmission
);

router.get("/categories", workshopController.getCategories);
router.get(
  "/approved-for-users",
  workshopController.getApprovedWorkshopsForUsers
);

// Rute untuk mengunggah gambar
router.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Respon dengan URL gambar yang disimpan
    const imageUrl = `/uploads/${req.file.filename}`; // Path relatif ke file
    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading image" });
  }
});

module.exports = router;
