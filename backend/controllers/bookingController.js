const db = require("../config/db");

// Fungsi untuk menghasilkan kode tiket unik
const generateTicketCode = () => {
  return `MRCE-${Math.floor(10000 + Math.random() * 90000)}`; // Contoh: MRCE-12345
};

// Book a workshop ticket
exports.bookWorkshop = async (req, res) => {
  try {
    const {
      workshop_id,
      quantity,
      first_name,
      last_name,
      email,
      phone_number,
      full_name,
      card_number_last4,
    } = req.body;
    const userId = req.user.id;

    if (
      !workshop_id ||
      !quantity ||
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !full_name ||
      !card_number_last4
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const [workshop] = await db.query(
      "SELECT * FROM workshops WHERE id = ? AND status = 'upcoming'",
      [workshop_id]
    );
    if (!workshop.length) {
      return res
        .status(404)
        .json({ message: "Workshop not found or not available" });
    }

    const workshopData = workshop[0];
    if (
      workshopData.max_participants - workshopData.current_participants <
      quantity
    ) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    const totalAmount = workshopData.price * quantity;
    const accountNumber = "1234-5678-9012-3456"; // Nomor rekening statis untuk contoh
    const ticketCode = generateTicketCode(); // Generate kode tiket

    // Insert booking
    const [bookingResult] = await db.query(
      `INSERT INTO bookings (workshop_id, user_id, booking_date, status)
       VALUES (?, ?, NOW(), 'pending')`,
      [workshop_id, userId]
    );

    // Insert payment dengan full_name, card_number_last4, dan code
    const [paymentResult] = await db.query(
      `INSERT INTO payments (booking_id, user_id, amount, account_number, full_name, card_number_last4, status, code)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingResult.insertId,
        userId,
        totalAmount,
        accountNumber,
        full_name,
        card_number_last4,
        "pending",
        ticketCode,
      ]
    );

    // Update current_participants
    await db.query(
      `UPDATE workshops SET current_participants = current_participants + ? WHERE id = ?`,
      [quantity, workshop_id]
    );

    const [booking] = await db.query(
      `SELECT b.*, w.title, w.price, p.amount, p.account_number, p.full_name, p.card_number_last4, p.code
       FROM bookings b
       LEFT JOIN workshops w ON b.workshop_id = w.id
       LEFT JOIN payments p ON b.id = p.booking_id
       WHERE b.id = ?`,
      [bookingResult.insertId]
    );

    res.status(201).json({
      ...booking[0],
      message: `Please transfer Rp ${totalAmount} to account ${accountNumber}. Payment status will be updated by admin.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error booking workshop" });
  }
};

// Confirm payment by admin
exports.confirmPayment = async (req, res) => {
  try {
    const { payment_id } = req.params;
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can confirm payments" });
    }

    const [result] = await db.query(
      `UPDATE payments SET status = 'confirmed', payment_date = NOW() WHERE id = ? AND status = 'pending'`,
      [payment_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Payment not found or already processed" });
    }

    const [payment] = await db.query(
      `SELECT p.*, b.workshop_id, b.user_id
       FROM payments p
       LEFT JOIN bookings b ON p.booking_id = b.id
       WHERE p.id = ?`,
      [payment_id]
    );

    await db.query(`UPDATE bookings SET status = 'confirmed' WHERE id = ?`, [
      payment[0].booking_id,
    ]);

    // Ambil data workshop untuk notifikasi
    const [workshop] = await db.query(
      "SELECT title, date, time FROM workshops WHERE id = ?",
      [payment[0].workshop_id]
    );

    // Buat notifikasi untuk konfirmasi pembayaran hanya jika status confirmed
    if (workshop.length > 0) {
      await db.query(
        "INSERT INTO notifications (user_id, type, message, related_id, workshop_title, workshop_date, workshop_time) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          payment[0].user_id,
          "purchase_confirmation",
          `Your payment for ${workshop[0].title} on ${workshop[0].date} has been confirmed!`,
          payment[0].workshop_id,
          workshop[0].title,
          workshop[0].date,
          workshop[0].time,
        ]
      );
    }

    res.json({
      message: "Payment confirmed successfully",
      payment: payment[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error confirming payment" });
  }
};

// Reject payment by admin
exports.rejectPayment = async (req, res) => {
  try {
    const { payment_id } = req.params;
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can reject payments" });
    }

    const [payment] = await db.query(
      `SELECT p.*, b.workshop_id, b.user_id
       FROM payments p
       LEFT JOIN bookings b ON p.booking_id = b.id
       WHERE p.id = ? AND p.status = 'pending'`,
      [payment_id]
    );

    if (!payment.length) {
      return res
        .status(404)
        .json({ message: "Payment not found or already processed" });
    }

    const [result] = await db.query(
      `UPDATE payments SET status = 'rejected' WHERE id = ?`,
      [payment_id]
    );

    // Refund logic: Decrease current_participants
    await db.query(
      `UPDATE workshops w
       JOIN bookings b ON w.id = b.workshop_id
       SET w.current_participants = w.current_participants - 1
       WHERE b.id = ?`,
      [payment[0].booking_id]
    );

    await db.query(`DELETE FROM bookings WHERE id = ?`, [
      payment[0].booking_id,
    ]);

    // Buat notifikasi untuk penolakan pembayaran
    const [workshop] = await db.query(
      "SELECT title FROM workshops WHERE id = ?",
      [payment[0].workshop_id]
    );
    await db.query(
      "INSERT INTO notifications (user_id, type, message, related_id) VALUES (?, ?, ?, ?)",
      [
        payment[0].user_id,
        "payment_rejected",
        `Your payment for ${workshop[0].title} has been rejected. Please contact support.`,
        payment[0].workshop_id,
      ]
    );

    res.json({ message: "Payment rejected successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rejecting payment" });
  }
};

// Get all order requests for admin
exports.getOrderRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can view order requests" });
    }

    const [rows] = await db.query(`
      SELECT p.id, w.title as workshop_name, c.name as category, p.amount as price,
             u.username as buyer, p.payment_date as date, p.status,
             b.workshop_id
      FROM payments p
      LEFT JOIN bookings b ON p.booking_id = b.id
      LEFT JOIN workshops w ON b.workshop_id = w.id
      LEFT JOIN categories c ON w.category_id = c.id
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.status = 'pending'
      ORDER BY p.payment_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching order requests" });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const [rows] = await db.query(
      `
        SELECT 
          b.id AS booking_id, b.workshop_id, b.booking_date, b.status,
          w.title, w.description, w.price, w.location, w.date AS workshop_date, w.time, w.end_time,
          w.max_participants, c.name AS category, u.username AS host, w.image_url,
          bu.username AS buyer, bu.profile_image AS buyer_profile_image
        FROM bookings b
        LEFT JOIN workshops w ON b.workshop_id = w.id
        LEFT JOIN categories c ON w.category_id = c.id
        LEFT JOIN users u ON w.instructor_id = u.id
        LEFT JOIN users bu ON b.user_id = bu.id
        WHERE b.user_id = ? AND b.status = 'confirmed'
        ORDER BY w.date DESC
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.json([]); // Kembalikan array kosong jika tidak ada data
    }

    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res
      .status(500)
      .json({ message: "Error fetching user bookings", error: err.message });
  }
};

// Get booking detail by booking_id
exports.getBookingDetail = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    // console.log("Received bookingId:", bookingId);
    // console.log("User ID from token:", userId);

    const [rows] = await db.query(
      `
        SELECT 
          b.id AS booking_id, b.workshop_id, b.booking_date, b.status,
          w.title, w.description, w.price, w.location, w.date AS workshop_date, w.time, w.end_time,
          w.max_participants, w.image_url,
          u.id AS user_id, u.first_name, u.last_name, u.email, u.phone,
          p.code
        FROM bookings b
        LEFT JOIN workshops w ON b.workshop_id = w.id
        LEFT JOIN users u ON b.user_id = u.id
        LEFT JOIN payments p ON b.id = p.booking_id
        WHERE b.id = ? AND b.user_id = ? AND b.status = 'confirmed'
      `,
      [bookingId, userId]
    );

    if (rows.length === 0) {
      console.log(
        "No rows found for bookingId:",
        bookingId,
        "and userId:",
        userId
      );
      return res
        .status(404)
        .json({ message: "Booking not found or access denied" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res
      .status(500)
      .json({ message: "Error fetching booking detail", error: err.message });
  }
};

// Tambahkan fungsi untuk reminder workshop
exports.checkWorkshopReminders = async () => {
  try {
    const [workshops] = await db.query(
      "SELECT id, title, date, time, user_id FROM workshops WHERE status = 'upcoming' AND date > NOW() AND date < DATE_ADD(NOW(), INTERVAL 1 DAY)"
    );
    for (const workshop of workshops) {
      const workshopDateTime = new Date(`${workshop.date} ${workshop.time}`);
      const now = new Date();
      if (workshopDateTime - now < 24 * 60 * 60 * 1000) {
        await db.query(
          "INSERT INTO notifications (user_id, type, message, related_id) VALUES (?, ?, ?, ?)",
          [
            workshop.user_id,
            "workshop_reminder",
            `Reminder: ${workshop.title} starts tomorrow at ${workshop.time} on ${workshop.date}.`,
            workshop.id,
          ]
        );
      }
    }
  } catch (err) {
    console.error("Error checking workshop reminders:", err);
  }
};
