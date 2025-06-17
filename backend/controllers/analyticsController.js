const db = require("../config/db");

exports.getAnalytics = async (req, res) => {
  try {
    // Total orders dan pending dari tabel payments
    const [payments] = await db.query(
      "SELECT COUNT(*) as total_orders, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_orders FROM payments"
    );

    // Total users (kecuali role admin)
    const [users] = await db.query(
      "SELECT COUNT(*) as total_users FROM users WHERE role != 'admin'"
    );

    // Total forum topics
    const [forumTopics] = await db.query(
      "SELECT COUNT(*) as total_forum_posts FROM forum_topics"
    );

    res.json({
      orders: payments[0].total_orders || 0,
      pending: payments[0].pending_orders || 0,
      users: users[0].total_users || 0,
      forumPosts: forumTopics[0].total_forum_posts || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching analytics" });
  }
};
