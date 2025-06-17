// backend/controllers/creativeArticleController.js
const db = require("../config/db");

// Get all creative articles (for Creative Corner Articles view)
exports.getCreativeArticles = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ca.*, u.username as author_name, c.name as category_name
      FROM creative_articles ca
      JOIN users u ON ca.author_user_id = u.id
      LEFT JOIN categories c ON ca.category_id = c.id
      ORDER BY ca.created_at DESC
    `); // cite: 1
    res.json(rows); // cite: 1
  } catch (err) {
    console.error("Error fetching creative articles:", err); // cite: 1
    res.status(500).json({ message: "Error fetching creative articles" }); // cite: 1
  }
};

// Get a single creative article
exports.getCreativeArticle = async (req, res) => {
  const articleId = req.params.id; // cite: 1
  try {
    const [rows] = await db.query(`
      SELECT ca.*, u.username as author_name, u.email as author_email, c.name as category_name
      FROM creative_articles ca
      JOIN users u ON ca.author_user_id = u.id
      LEFT JOIN categories c ON ca.category_id = c.id
      WHERE ca.id = ?
    `, [articleId]); // cite: 1

    if (rows.length === 0) {
      return res.status(404).json({ message: "Creative article not found" }); // cite: 1
    }
    res.json(rows[0]); // cite: 1
  } catch (err) {
    console.error("Error fetching single creative article:", err); // cite: 1
    res.status(500).json({ message: "Error fetching creative article" }); // cite: 1
  }
};

// Create a new creative article
exports.createCreativeArticle = async (req, res) => {
  const { title, content, author_user_id, category_id, status } = req.body; // cite: 1
  // author_user_id should come from authenticated user (organizer/admin)

  try {
    const [result] = await db.query(
      `INSERT INTO creative_articles (title, content, author_user_id, category_id, status, publish_date)
       VALUES (?, ?, ?, ?, ?, ?)`, // cite: 1
      [title, content, author_user_id, category_id, status, status === 'published' ? new Date() : null]
    );

    const [newArticle] = await db.query("SELECT * FROM creative_articles WHERE id = ?", [result.insertId]); // cite: 1
    res.status(201).json(newArticle[0]); // cite: 1
  } catch (err) {
    console.error("Error creating creative article:", err); // cite: 1
    res.status(500).json({ message: "Error creating creative article" }); // cite: 1
  }
};

// Update a creative article
exports.updateCreativeArticle = async (req, res) => {
  const articleId = req.params.id; // cite: 1
  const { title, content, category_id, status } = req.body; // cite: 1

  try {
    // Determine publish_date update logic
    let publishDateUpdate = '';
    let publishDateValue = null;
    if (status === 'published') {
      publishDateUpdate = ', publish_date = NOW()';
    } else if (status === 'draft' || status === 'archived') {
      publishDateUpdate = ', publish_date = NULL';
    }

    const [result] = await db.query(
      `UPDATE creative_articles SET title = ?, content = ?, category_id = ?, status = ? ${publishDateUpdate} WHERE id = ?`, // cite: 1
      [title, content, category_id, status, articleId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Creative article not found" }); // cite: 1
    }

    const [updatedArticle] = await db.query("SELECT * FROM creative_articles WHERE id = ?", [articleId]); // cite: 1
    res.json(updatedArticle[0]); // cite: 1
  } catch (err) {
    console.error("Error updating creative article:", err); // cite: 1
    res.status(500).json({ message: "Error updating creative article" }); // cite: 1
  }
};

// Delete a creative article
exports.deleteCreativeArticle = async (req, res) => {
  const articleId = req.params.id; // cite: 1
  try {
    const [result] = await db.query("DELETE FROM creative_articles WHERE id = ?", [articleId]); // cite: 1

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Creative article not found" }); // cite: 1
    }
    res.json({ message: "Creative article deleted successfully" }); // cite: 1
  } catch (err) {
    console.error("Error deleting creative article:", err); // cite: 1
    res.status(500).json({ message: "Error deleting creative article" }); // cite: 1
  }
};