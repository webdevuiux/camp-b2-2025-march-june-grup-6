const db = require("../config/db");

// Upload a review for a workshop
exports.uploadReview = async (req, res) => {
  try {
    const { workshop_id, review_title, review_description, rating } = req.body;
    const userId = req.user.id;
    const media_url = req.file ? `/uploads/${req.file.filename}` : null; // Asumsi file diunggah ke folder uploads

    if (!workshop_id || !review_title || !rating) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const [workshop] = await db.query(
      "SELECT * FROM workshops WHERE id = ? AND status IN ('approved', 'upcoming', 'ongoing')",
      [workshop_id]
    );
    if (!workshop.length) {
      return res
        .status(404)
        .json({ message: "Workshop not found or not eligible for review" });
    }

    const [result] = await db.query(
      `INSERT INTO reviews (workshop_id, user_id, review_title, review_description, media_url, rating)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        workshop_id,
        userId,
        review_title,
        review_description || null,
        media_url,
        rating,
      ]
    );

    const [newReview] = await db.query(
      `SELECT r.*, u.username, w.title as workshop_title
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       JOIN workshops w ON r.workshop_id = w.id
       WHERE r.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newReview[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading review" });
  }
};

// Get all reviews for a workshop (for admin or public view)
exports.getWorkshopReviews = async (req, res) => {
  try {
    const { workshop_id } = req.params;

    const [rows] = await db.query(
      `SELECT r.id, r.review_title, r.review_description, r.media_url, r.rating, r.created_at,
              u.username, u.first_name, u.last_name, u.profile_image
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.workshop_id = ?`,
      [workshop_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};
