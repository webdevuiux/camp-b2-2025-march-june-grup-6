const db = require("../config/db");

// Get all workshops for admin (approved/upcoming/ongoing)
exports.getWorkshops = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT w.id, w.title as topic, c.name as category, w.price,
             w.max_participants as quantity, w.status,
             u.username as host
      FROM workshops w
      LEFT JOIN categories c ON w.category_id = c.id
      LEFT JOIN users u ON w.instructor_id = u.id
      WHERE w.status IN ('approved', 'upcoming', 'ongoing')
      ORDER BY w.date ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching workshops" });
  }
};

// Get all workshop submissions for admin (pending approval)
exports.getWorkshopSubmissions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ws.id as submission_id, w.id as workshop_id, w.title as topic, c.name as category, w.price,
             w.max_participants as quantity, ws.status,
             u.username as host, w.date
      FROM workshop_submissions ws
      LEFT JOIN workshops w ON ws.workshop_id = w.id
      LEFT JOIN categories c ON w.category_id = c.id
      LEFT JOIN users u ON ws.submitter_user_id = u.id
      WHERE ws.status = 'pending'
      ORDER BY ws.submission_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching workshop submissions" });
  }
};

// Get single workshop (for admin to view/edit)
exports.getWorkshop = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT w.title as topic, w.description, w.price, w.location, w.date, w.time, w.end_time,
              w.max_participants as quantity, c.name as category, u.username as host, w.image_url
       FROM workshops w
       LEFT JOIN categories c ON w.category_id = c.id
       LEFT JOIN users u ON w.instructor_id = u.id
       WHERE w.id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching workshop" });
  }
};

// Create workshop submission (by user)
exports.createWorkshopSubmission = async (req, res) => {
  try {
    const {
      title,
      description,
      category_id,
      instructor_id,
      price,
      location,
      date,
      time,
      end_time,
      max_participants,
      image_url,
      start_date,
      end_date,
      sale_start_time,
      sale_end_time,
    } = req.body;
    const userId = req.user.id;

    // console.log("createWorkshopSubmission received data:", req.body);

    if (
      !title ||
      !description ||
      !category_id ||
      !instructor_id ||
      !location ||
      !date ||
      !time ||
      !end_time ||
      !start_date ||
      !end_date ||
      !sale_start_time ||
      !sale_end_time
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if category_id and instructor_id exist
    const [category] = await db.query(
      "SELECT id FROM categories WHERE id = ?",
      [category_id]
    );
    if (!category.length) {
      return res.status(400).json({ message: "Invalid category_id" });
    }
    const [instructor] = await db.query("SELECT id FROM users WHERE id = ?", [
      instructor_id,
    ]);
    if (!instructor.length) {
      return res.status(400).json({ message: "Invalid instructor_id" });
    }

    // Insert into workshops as draft
    const [workshopResult] = await db.query(
      `INSERT INTO workshops
       (title, description, category_id, instructor_id, price, location, date, time, end_time,
        max_participants, image_url, status, start_date, end_date, sale_start_time, sale_end_time)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?)`,
      [
        title,
        description,
        category_id,
        instructor_id,
        price || 0,
        location,
        date,
        time,
        end_time,
        max_participants || 0,
        image_url || null,
        start_date,
        end_date,
        sale_start_time,
        sale_end_time,
      ]
    );

    // Insert into workshop_submissions
    const [submissionResult] = await db.query(
      `INSERT INTO workshop_submissions (workshop_id, submitter_user_id)
       VALUES (?, ?)`,
      [workshopResult.insertId, userId]
    );

    const [newSubmission] = await db.query(
      `SELECT ws.*, w.*
       FROM workshop_submissions ws
       LEFT JOIN workshops w ON ws.workshop_id = w.id
       WHERE ws.id = ?`,
      [submissionResult.insertId]
    );

    res.status(201).json(newSubmission[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating workshop submission" });
  }
};

// Update workshop submission (by user)
exports.updateWorkshopSubmission = async (req, res) => {
  try {
    const {
      submission_id,
      title,
      description,
      category_id,
      instructor_id,
      price,
      location,
      date,
      time,
      end_time,
      max_participants,
      image_url,
      start_date,
      end_date,
      sale_start_time,
      sale_end_time,
    } = req.body;
    const userId = req.user.id;

    // console.log("updateWorkshopSubmission received data:", req.body);

    if (!submission_id) {
      return res.status(400).json({ message: "Submission ID is required" });
    }

    // Verifikasi bahwa pengguna adalah pemilik submission
    const [submission] = await db.query(
      `SELECT * FROM workshop_submissions WHERE id = ? AND submitter_user_id = ?`,
      [submission_id, userId]
    );
    if (!submission.length) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this submission" });
    }

    // Validasi field wajib
    if (
      !title ||
      !description ||
      !category_id ||
      !instructor_id ||
      !location ||
      !date ||
      !time ||
      !end_time ||
      !start_date ||
      !end_date ||
      !sale_start_time ||
      !sale_end_time
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Perbarui workshop terkait
    const [result] = await db.query(
      `UPDATE workshops
       SET title = ?, description = ?, category_id = ?, instructor_id = ?,
           price = ?, location = ?, date = ?, time = ?, end_time = ?,
           max_participants = ?, image_url = ?, status = 'draft',
           start_date = ?, end_date = ?, sale_start_time = ?, sale_end_time = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [
        title,
        description,
        category_id,
        instructor_id,
        price || 0,
        location,
        date,
        time,
        end_time,
        max_participants || 0,
        image_url || null,
        start_date,
        end_date,
        sale_start_time,
        sale_end_time,
        submission[0].workshop_id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Perbarui workshop_submissions
    await db.query(
      `UPDATE workshop_submissions
       SET status = 'pending'
       WHERE id = ?`,
      [submission_id]
    );

    const [updatedSubmission] = await db.query(
      `SELECT ws.*, w.*
       FROM workshop_submissions ws
       LEFT JOIN workshops w ON ws.workshop_id = w.id
       WHERE ws.id = ?`,
      [submission_id]
    );

    res.json(updatedSubmission[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating workshop submission" });
  }
};

// Update workshop (admin only)
exports.updateWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const { max_participants } = req.body; // Hanya ambil max_participants

    const [result] = await db.query(
      "UPDATE workshops SET max_participants = ? WHERE id = ?",
      [max_participants, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    const [updatedWorkshop] = await db.query(
      "SELECT id, title as topic, category_id as category, price, max_participants FROM workshops WHERE id = ?",
      [id]
    );

    res.json(updatedWorkshop[0]);
  } catch (err) {
    console.error("Error updating workshop:", err);
    res.status(500).json({ message: "Error updating workshop" });
  }
};

// Delete workshop (admin only)
exports.deleteWorkshop = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can delete workshops" });
    }

    const [result] = await db.query("DELETE FROM workshops WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.json({ message: "Workshop deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting workshop" });
  }
};

// Process workshop submission (approve/reject by admin)
exports.processWorkshopSubmission = async (req, res) => {
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
        .json({ message: "Only admin can process workshop submissions" });
    }

    const [submission] = await db.query(
      "SELECT * FROM workshop_submissions WHERE id = ?",
      [req.params.id]
    );

    if (!submission.length) {
      return res.status(404).json({ message: "Workshop submission not found" });
    }

    const workshopId = submission[0].workshop_id;

    if (status === "approved") {
      await db.query("UPDATE workshops SET status = 'upcoming' WHERE id = ?", [
        workshopId,
      ]);
      await db.query(
        "UPDATE workshop_submissions SET status = 'approved' WHERE id = ?",
        [req.params.id]
      );
    } else {
      await db.query("UPDATE workshops SET status = 'cancelled' WHERE id = ?", [
        workshopId,
      ]);
      await db.query(
        "UPDATE workshop_submissions SET status = 'rejected' WHERE id = ?",
        [req.params.id]
      );
    }

    const [result] = await db.query(
      `UPDATE workshop_submissions
       SET status = ?, admin_notes = ?, processed_by_admin_id = ?, processed_date = NOW()
       WHERE id = ?`,
      [status, admin_notes || null, req.user.id, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Workshop submission not found" });
    }

    res.json({ message: `Workshop submission ${status} successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing workshop submission" });
  }
};

// Get all workshops created by the authenticated user
exports.getMyWorkshops = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { status } = req.query;
    let query = `
         SELECT ws.id as submission_id, w.id as workshop_id, w.title as topic, c.name as category, w.price,
                w.max_participants as quantity, ws.status as submission_status, w.status as workshop_status, u.username as host,
                DATE_FORMAT(w.date, '%Y-%m-%d') as date, w.description, w.image_url, w.location,
                TIME_FORMAT(w.time, '%H:%i') as time,
                TIME_FORMAT(w.end_time, '%H:%i') as end_time,
                DATE_FORMAT(w.start_date, '%Y-%m-%d') as start_date,
                DATE_FORMAT(w.end_date, '%Y-%m-%d') as end_date,
                TIME_FORMAT(w.sale_start_time, '%H:%i') as sale_start_time,
                TIME_FORMAT(w.sale_end_time, '%H:%i') as sale_end_time
         FROM workshop_submissions ws
         LEFT JOIN workshops w ON ws.workshop_id = w.id
         LEFT JOIN categories c ON w.category_id = c.id
         LEFT JOIN users u ON ws.submitter_user_id = u.id
         WHERE ws.submitter_user_id = ?
       `;

    const queryParams = [userId];
    if (status) {
      if (status === "upcoming") {
        query += " AND w.status = ?";
        queryParams.push("upcoming");
      } else if (status === "pending") {
        query += " AND ws.status = ?";
        queryParams.push("pending");
      }
    }

    query += " ORDER BY w.date ASC";

    const [rows] = await db.query(query, queryParams);

    if (!rows.length) {
      return res
        .status(404)
        .json({ message: "No workshops found for this user" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Error in getMyWorkshops:", err);
    res.status(500).json({ message: "Error fetching user workshops" });
  }
};

// Get all categories (new endpoint)
exports.getCategories = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, name
      FROM categories
      ORDER BY name ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error in getCategories:", err);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

//Get workshop untuk user
exports.getApprovedWorkshopsForUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        w.id, 
        w.title as topic, 
        c.name as category, 
        w.price,
        w.max_participants as quantity, 
        w.status,
        u.username as host, 
        u.profile_image, 
        w.date, 
        w.location, 
        w.time, 
        w.end_time,
        w.description,
        w.image_url,
        COALESCE(b.participant_count, 0) as participants
      FROM workshops w
      LEFT JOIN categories c ON w.category_id = c.id
      LEFT JOIN users u ON w.instructor_id = u.id
      LEFT JOIN (
        SELECT workshop_id, COUNT(*) as participant_count
        FROM bookings
        GROUP BY workshop_id
      ) b ON w.id = b.workshop_id
      WHERE w.status IN ('approved', 'upcoming', 'ongoing')
      ORDER BY w.date ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching approved workshops for users:", err);
    res.status(500).json({ message: "Error fetching approved workshops" });
  }
};

//Get workshop detail untuk user
exports.getWorkshopForUser = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT w.id, w.title as topic, w.description, w.price, w.location, w.date, w.time, w.end_time,
              w.max_participants as quantity, c.name as category, u.username as host, u.profile_image,
              w.image_url, COALESCE(b.participant_count, 0) as participants
       FROM workshops w
       LEFT JOIN categories c ON w.category_id = c.id
       LEFT JOIN users u ON w.instructor_id = u.id
       LEFT JOIN (
         SELECT workshop_id, COUNT(*) as participant_count
         FROM bookings
         GROUP BY workshop_id
       ) b ON w.id = b.workshop_id
       WHERE w.id = ? AND w.status IN ('approved', 'upcoming', 'ongoing')`,
      [req.params.id]
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ message: "Workshop not found or not accessible" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching workshop for user:", err);
    res.status(500).json({ message: "Error fetching workshop" });
  }
};
