const db = require("../config/db");

// Submit a refund request
exports.submitRefundRequest = async (req, res) => {
  try {
    const { booking_id, reason } = req.body;
    const userId = req.user.id;

    if (!booking_id || !reason) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const [user] = await db.query(
      "SELECT first_name, last_name, email FROM users WHERE id = ?",
      [userId]
    );
    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const [booking] = await db.query(
      "SELECT b.*, w.title, w.price, p.status as payment_status FROM bookings b JOIN workshops w ON b.workshop_id = w.id JOIN payments p ON b.id = p.booking_id WHERE b.id = ? AND b.user_id = ? AND b.status = 'confirmed' AND p.status = 'confirmed'",
      [booking_id, userId]
    );

    if (!booking.length) {
      return res
        .status(404)
        .json({
          message: "Valid booking not found or not eligible for refund",
        });
    }

    const [result] = await db.query(
      `INSERT INTO refund_requests (booking_id, user_id, reason)
       VALUES (?, ?, ?)`,
      [booking_id, userId, reason]
    );

    const [newRequest] = await db.query(
      `SELECT rr.*, u.first_name, u.last_name, u.email
       FROM refund_requests rr
       JOIN users u ON rr.user_id = u.id
       WHERE rr.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newRequest[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting refund request" });
  }
};

// Get all refund requests (for Refund Request list view)
exports.getRefundRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can view refund requests" });
    }

    const [rows] = await db.query(`
      SELECT rr.id, w.title as workshop_name, c.name as category, w.price,
             CONCAT(u.first_name, ' ', u.last_name) as requested_by, u.email, rr.request_date as date, rr.status
      FROM refund_requests rr
      JOIN bookings b ON rr.booking_id = b.id
      JOIN workshops w ON b.workshop_id = w.id
      JOIN categories c ON w.category_id = c.id
      JOIN users u ON rr.user_id = u.id
      WHERE rr.status = 'pending'
      ORDER BY rr.request_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching refund requests" });
  }
};

// Get a single refund request
exports.getRefundRequest = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can view refund request details" });
    }

    const [rows] = await db.query(
      `SELECT rr.*, b.id as booking_id, w.title as workshop_title, w.price as workshop_price,
              CONCAT(u.first_name, ' ', u.last_name) as user_name, u.email as user_email
       FROM refund_requests rr
       JOIN bookings b ON rr.booking_id = b.id
       JOIN workshops w ON b.workshop_id = w.id
       JOIN users u ON rr.user_id = u.id
       WHERE rr.id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Refund request not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching refund request" });
  }
};

// Process (Approve/Reject) a refund request
exports.processRefundRequest = async (req, res) => {
  try {
    const { status, admin_notes } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be 'approved' or 'rejected'" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can process refund requests" });
    }

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [request] = await connection.query(
        "SELECT * FROM refund_requests WHERE id = ? AND status = 'pending'",
        [req.params.id]
      );

      if (!request.length) {
        await connection.rollback();
        return res
          .status(404)
          .json({ message: "Refund request not found or already processed" });
      }

      const bookingId = request[0].booking_id;

      if (status === "approved") {
        await connection.query(
          "UPDATE bookings SET status = 'refunded' WHERE id = ?",
          [bookingId]
        );
        await connection.query(
          "UPDATE payments SET status = 'refunded' WHERE booking_id = ?",
          [bookingId]
        );
        await connection.query(
          "UPDATE workshops w JOIN bookings b ON w.id = b.workshop_id SET w.current_participants = w.current_participants - 1 WHERE b.id = ?",
          [bookingId]
        );
      }

      await connection.query(
        `UPDATE refund_requests
         SET status = ?, admin_notes = ?, processed_by_admin_id = ?, processed_date = NOW()
         WHERE id = ?`,
        [status, admin_notes || null, req.user.id, req.params.id]
      );

      await connection.commit();
      res.json({ message: `Refund request ${status} successfully` });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing refund request" });
  }
};
