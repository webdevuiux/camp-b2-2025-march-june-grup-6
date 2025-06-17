const db = require("../config/db");

// Get all forum topics (for Forum List view)
exports.getForumTopics = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ft.id, ft.title, ft.content, ft.created_at,
             u.username AS author_name, u.profile_image AS avatar,
             (SELECT COUNT(fc.id) FROM forum_comments fc WHERE fc.topic_id = ft.id) AS comments_count
      FROM forum_topics ft
      JOIN users u ON ft.user_id = u.id
      ORDER BY ft.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching forum topics:", err);
    res.status(500).json({ message: "Error fetching forum topics" });
  }
};

// Get a single forum topic and its comments
exports.getForumTopicAndComments = async (req, res) => {
  const topicId = req.params.id;
  try {
    const [topicRows] = await db.query(
      `
      SELECT ft.id, ft.title, ft.content, ft.created_at,
             u.username AS author_name, u.email AS author_email, u.profile_image AS avatar
      FROM forum_topics ft
      JOIN users u ON ft.user_id = u.id
      WHERE ft.id = ?
    `,
      [topicId]
    );

    if (topicRows.length === 0) {
      return res.status(404).json({ message: "Forum topic not found" });
    }

    const [commentsRows] = await db.query(
      `
      SELECT fc.id, fc.content, fc.created_at,
             u.username AS comment_author_name, u.profile_image AS avatar
      FROM forum_comments fc
      JOIN users u ON fc.user_id = u.id
      WHERE fc.topic_id = ?
      ORDER BY fc.created_at ASC
    `,
      [topicId]
    );

    res.json({
      topic: topicRows[0],
      comments: commentsRows,
    });
  } catch (err) {
    console.error("Error fetching forum topic and comments:", err);
    res
      .status(500)
      .json({ message: "Error fetching forum topic and comments" });
  }
};

// Create a new forum topic
exports.createForumTopic = async (req, res) => {
  const { title, content, category } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO forum_topics (user_id, title, content, category) VALUES (?, ?, ?, ?)",
      [userId, title, content, category || "general"]
    );
    const [newTopic] = await db.query(
      "SELECT * FROM forum_topics WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(newTopic[0]);
  } catch (err) {
    console.error("Error creating forum topic:", err);
    res.status(500).json({ message: "Error creating forum topic" });
  }
};

// Delete a forum topic (with ON DELETE CASCADE handling comments)
exports.deleteForumTopic = async (req, res) => {
  const topicId = req.params.id;
  const userId = req.user.id;

  try {
    const [topic] = await db.query(
      "SELECT user_id FROM forum_topics WHERE id = ?",
      [topicId]
    );
    if (topic.length === 0) {
      return res.status(404).json({ message: "Forum topic not found" });
    }
    if (topic[0].user_id !== userId && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this topic" });
    }

    const [result] = await db.query("DELETE FROM forum_topics WHERE id = ?", [
      topicId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Forum topic not found" });
    }
    res.json({ message: "Forum topic deleted successfully" });
  } catch (err) {
    console.error("Error deleting forum topic:", err);
    res.status(500).json({ message: "Error deleting forum topic" });
  }
};

// Create a new forum comment
exports.createForumComment = async (req, res) => {
  const topicId = req.params.topicId;
  const { content } = req.body; // Ambil content dari req.body
  const userId = req.user.id;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const [topic] = await db.query(
      "SELECT id, user_id, title FROM forum_topics WHERE id = ?", // Tambahkan 'title'
      [topicId]
    );
    if (topic.length === 0) {
      return res.status(404).json({ message: "Forum topic not found" });
    }

    const [result] = await db.query(
      "INSERT INTO forum_comments (topic_id, user_id, content) VALUES (?, ?, ?)",
      [topicId, userId, content]
    );
    const commentId = result.insertId;

    // Ambil data pengguna termasuk username dan profile_image
    const [user] = await db.query(
      "SELECT username AS comment_author_name, profile_image AS avatar FROM users WHERE id = ?",
      [userId]
    );

    // Kembalikan data komentar lengkap
    const newComment = {
      id: commentId,
      content,
      created_at: new Date(),
      comment_author_name: user[0].comment_author_name,
      avatar: user[0].avatar ? `/uploads/${user[0].avatar}` : null,
    };

    // Buat notifikasi untuk pemilik topik jika bukan pengguna yang sama
    if (topic[0].user_id !== userId) {
      await db.query(
        "INSERT INTO notifications (user_id, type, message, related_id, content, topic_title) VALUES (?, ?, ?, ?, ?, ?)",
        [
          topic[0].user_id,
          "forum_reply",
          `${user[0].comment_author_name} replied to your topic "${topic[0].title}".`,
          topicId,
          content, // Simpan isi komentar
          topic[0].title, // Simpan judul topik
        ]
      );
    }

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating forum comment:", err);
    res.status(500).json({ message: "Error creating forum comment" });
  }
};

// Delete a forum comment
exports.deleteForumComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  try {
    const [comment] = await db.query(
      "SELECT user_id FROM forum_comments WHERE id = ?",
      [commentId]
    );
    if (comment.length === 0) {
      return res.status(404).json({ message: "Forum comment not found" });
    }
    if (comment[0].user_id !== userId && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });
    }

    const [result] = await db.query("DELETE FROM forum_comments WHERE id = ?", [
      commentId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Forum comment not found" });
    }
    res.json({ message: "Forum comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting forum comment:", err);
    res.status(500).json({ message: "Error deleting forum comment" });
  }
};

// Get total forum replies for a user
exports.getUserForumReplies = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      `
      SELECT COUNT(id) AS forumReplies
      FROM forum_comments
      WHERE user_id = ?
    `,
      [userId]
    );
    res.json({ forumReplies: rows[0].forumReplies || 0 });
  } catch (err) {
    console.error("Error fetching user forum replies:", err);
    res.status(500).json({ message: "Error fetching user forum replies" });
  }
};
