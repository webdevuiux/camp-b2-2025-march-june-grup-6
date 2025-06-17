const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Konfigurasi multer untuk menangani upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch((err) => cb(err));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter untuk membatasi tipe file (misalnya, hanya gambar dan video)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|mp4|mov/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(
    new Error("Only images (jpeg, jpg, png) and videos (mp4, mov) are allowed!")
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Batas ukuran file 5MB
});

exports.submitTicket = [
  upload.single("attachment"),
  async (req, res) => {
    try {
      const { problemTitle, description } = req.body;
      const attachmentPath = req.file ? `/uploads/${req.file.filename}` : null;

      // Validasi input
      if (!problemTitle || !description) {
        return res
          .status(400)
          .json({ message: "Problem title and description are required." });
      }

      // Simpan ke database
      const query = `
        INSERT INTO customer_support_tickets (problem_title, description, attachment_path)
        VALUES (?, ?, ?)
      `;
      const [result] = await db.execute(query, [
        problemTitle,
        description,
        attachmentPath,
      ]);

      res.status(201).json({
        message: "Message sent successfully!",
        ticketId: result.insertId,
      });
    } catch (error) {
      console.error("Error submitting ticket:", error);

      // Penanganan error spesifik
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Duplicate entry detected." });
      } else if (error.message.includes("Only images and videos are allowed")) {
        return res.status(400).json({ message: error.message });
      } else if (error.code === "ECONNREFUSED") {
        return res.status(500).json({ message: "Database connection failed." });
      }

      res.status(500).json({ message: "Failed to send message." });
    }
  },
];
