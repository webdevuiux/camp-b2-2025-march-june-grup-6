const db = require("../config/db");

exports.getUserNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      `
        SELECT 
          n.*,
          w.title AS workshop_title,
          w.date AS workshop_date,
          w.time AS workshop_time,
          CASE 
            WHEN n.type = 'forum_reply' THEN u.username 
            ELSE NULL 
          END AS comment_author_name,
          CASE 
            WHEN n.type = 'forum_reply' THEN u.profile_image 
            ELSE NULL 
          END AS profile_image
        FROM notifications n
        LEFT JOIN workshops w ON n.related_id = w.id AND n.type IN ('purchase_confirmation', 'workshop_reminder')
        LEFT JOIN users u ON n.user_id = u.id AND n.type = 'forum_reply'
        WHERE n.user_id = ?
        ORDER BY n.created_at DESC
      `,
      [userId]
    );
    // Debug log untuk memeriksa data yang dikembalikan
    // console.log("Notifications data:", rows);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

exports.markNotificationAsSeen = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE notifications SET is_seen = TRUE WHERE id = ?", [
      id,
    ]);
    res.json({ message: "Notification marked as seen" });
  } catch (err) {
    console.error("Error marking notification as seen:", err);
    res.status(500).json({ message: "Error marking notification as seen" });
  }
};
