// backend/controllers/submissionController.js
const db = require("../config/db");

// Get all workshop submissions (for Workshop Submission list view)
exports.getWorkshopSubmissions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ws.*, w.title as workshop_title, u.username as submitter_name,
             pba.username as processed_by_admin_name
      FROM workshop_submissions ws
      JOIN workshops w ON ws.workshop_id = w.id
      JOIN users u ON ws.submitter_user_id = u.id
      LEFT JOIN users pba ON ws.processed_by_admin_id = pba.id
      ORDER BY ws.submission_date DESC
    `); // cite: 1
    res.json(rows); // cite: 1
  } catch (err) {
    console.error("Error fetching workshop submissions:", err); // cite: 1
    res.status(500).json({ message: "Error fetching workshop submissions" }); // cite: 1
  }
};

// Get a single workshop submission
exports.getWorkshopSubmission = async (req, res) => {
  const submissionId = req.params.id; // cite: 1
  try {
    const [rows] = await db.query(`
      SELECT ws.*, w.title as workshop_title, w.description as workshop_description,
             w.price as workshop_price, w.location as workshop_location,
             w.date as workshop_date, w.time as workshop_time,
             w.max_participants as workshop_max_participants, w.image_url as workshop_image_url,
             c.name as category_name, u.username as submitter_name,
             pba.username as processed_by_admin_name
      FROM workshop_submissions ws
      JOIN workshops w ON ws.workshop_id = w.id
      LEFT JOIN categories c ON w.category_id = c.id
      JOIN users u ON ws.submitter_user_id = u.id
      LEFT JOIN users pba ON ws.processed_by_admin_id = pba.id
      WHERE ws.id = ?
    `, [submissionId]); // cite: 1

    if (rows.length === 0) {
      return res.status(404).json({ message: "Workshop submission not found" }); // cite: 1
    }
    res.json(rows[0]); // cite: 1
  } catch (err) {
    console.error("Error fetching single workshop submission:", err); // cite: 1
    res.status(500).json({ message: "Error fetching workshop submission details" }); // cite: 1
  }
};


// Approve or Reject a workshop submission
exports.processWorkshopSubmission = async (req, res) => {
  const submissionId = req.params.id; // cite: 1
  const { status, admin_notes, processed_by_admin_id } = req.body; // status: 'approved' or 'rejected' // cite: 1

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: "Invalid status provided" }); // cite: 1
  }
  // In a real app, processed_by_admin_id should come from authenticated user session
  if (!processed_by_admin_id) {
    return res.status(400).json({ message: "Admin ID is required for processing" }); // cite: 1
  }

  const connection = await db.getConnection(); // Use a transaction for consistency
  try {
    await connection.beginTransaction(); // cite: 1

    // Update submission status
    const [submissionResult] = await connection.query(
      "UPDATE workshop_submissions SET status = ?, admin_notes = ?, processed_by_admin_id = ?, processed_date = NOW() WHERE id = ?", // cite: 1
      [status, admin_notes, processed_by_admin_id, submissionId]
    );

    if (submissionResult.affectedRows === 0) {
      await connection.rollback(); // cite: 1
      return res.status(404).json({ message: "Workshop submission not found" }); // cite: 1
    }

    // If approved, update workshop status
    if (status === 'approved') {
      const [submissionRows] = await connection.query("SELECT workshop_id FROM workshop_submissions WHERE id = ?", [submissionId]); // cite: 1
      const workshopId = submissionRows[0].workshop_id; // cite: 1

      await connection.query("UPDATE workshops SET status = 'upcoming' WHERE id = ?", [workshopId]); // Set to 'upcoming' or 'available' // cite: 1
    } else {
      // If rejected, you might want to mark the workshop as 'cancelled' or allow the organizer to re-submit
      // For now, we just update the submission status
      const [submissionRows] = await connection.query("SELECT workshop_id FROM workshop_submissions WHERE id = ?", [submissionId]); // cite: 1
      const workshopId = submissionRows[0].workshop_id; // cite: 1
      await connection.query("UPDATE workshops SET status = 'cancelled' WHERE id = ?", [workshopId]); // cite: 1
    }

    await connection.commit(); // cite: 1
    res.json({ message: `Workshop submission ${status} successfully` }); // cite: 1

  } catch (err) {
    await connection.rollback(); // cite: 1
    console.error("Error processing workshop submission:", err); // cite: 1
    res.status(500).json({ message: "Error processing workshop submission" }); // cite: 1
  } finally {
    connection.release(); // cite: 1
  }
};