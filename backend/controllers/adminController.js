const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getAdminAccountSettings = async (req, res) => {
  const adminId = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT id, username, first_name, last_name, email, phone_number, profile_image FROM users WHERE id = ? AND role = 'admin'",
      [adminId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching admin account settings:", err);
    res.status(500).json({ message: "Error fetching admin account settings" });
  }
};

exports.updateAdminAccountSettings = async (req, res) => {
  const adminId = req.params.id;
  const { username, first_name, last_name, email, phone_number } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await db.query(
      "UPDATE users SET username = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?, profile_image = ? WHERE id = ? AND role = 'admin'",
      [
        username,
        first_name,
        last_name,
        email,
        phone_number,
        profileImage,
        adminId,
      ]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Admin not found or no changes made" });
    }

    res.json({
      message: "Admin account settings updated successfully",
      profile_image: profileImage,
    });
  } catch (err) {
    console.error("Error updating admin account settings:", err);
    res.status(500).json({ message: "Error updating admin account settings" });
  }
};

exports.changePassword = async (req, res) => {
  const adminId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT password FROM users WHERE id = ? AND role = 'admin'",
      [adminId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password lama salah" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      "UPDATE users SET password = ? WHERE id = ? AND role = 'admin'",
      [hashedPassword, adminId]
    );

    res.json({ message: "Password berhasil diperbarui" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Error updating password" });
  }
};

exports.resetPassword = async (req, res) => {
  const adminId = req.params.id;
  const { newPassword } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT id FROM users WHERE id = ? AND role = 'admin'",
      [adminId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      "UPDATE users SET password = ? WHERE id = ? AND role = 'admin'",
      [hashedPassword, adminId]
    );

    res.json({ message: "Password berhasil direset" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Error mereset password" });
  }
};
